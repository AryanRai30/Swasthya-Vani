import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  User, 
  Sparkles, 
  Globe, 
  ShieldAlert, 
  Trash2, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  Info, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { ChatMessage } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/translations';

interface ChatbotSectionProps {
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

export const ChatbotSection: React.FC<ChatbotSectionProps> = ({
  selectedLanguage,
  setSelectedLanguage,
  initialPrompt,
  onClearInitialPrompt
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'ai',
      text: `Namaste & Welcome to **SwasthyaVani Public Health Assistant**. 

I am your dedicated AI guide for **disease awareness, symptom triage education, and preventive healthcare**, synthesizing official protocols from **ICMR, MoHFW, and WHO**.

*You can ask me questions such as:*
* 🦟 *"What are the critical warning signs of Dengue during monsoon?"*
* 🦠 *"How does Malaria spread and how can I protect my children?"*
* 🫁 *"What are the key symptoms of Tuberculosis and how to access free DOTS treatment?"*
* 💧 *"What is the standard Oral Rehydration Salt (ORS) recipe for acute diarrhea?"*
* 🐕 *"What is the immediate emergency first-aid for an animal scratch or dog bite?"*

*Please select your preferred language above or type your health question below.*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: ['Ministry of Health & Family Welfare (MoHFW)', 'Indian Council of Medical Research (ICMR)', 'World Health Organization (WHO)'],
      suggestedQuestions: [
        'What are the warning signs of Dengue?',
        'How to prevent Malaria during monsoon?',
        'Is Tuberculosis completely curable?',
        'What is the immediate first aid for dog bites?'
      ]
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];

  const suggestedPrompts = [
    'What are the 3 distinct phases of Dengue fever?',
    'How does Malaria spread and how to use bed nets properly?',
    'What are early signs of Tuberculosis & is testing free?',
    'What should I do immediately for a stray dog bite or scratch?',
    'How do I prepare home ORS solution for watery diarrhea?',
    'Why is high blood pressure called the "Silent Killer"?'
  ];

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // If passed an initial prompt from another section (e.g. Disease library or Symptom checker)
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim().length > 0) {
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: selectedLanguage
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language: currentLang.name,
          history: messages.slice(-4).map(m => ({ role: m.sender === 'user' ? 'user' : 'model', text: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.text || 'I could not retrieve an answer. Please try rephrasing your question.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: data.sources || ['Indian Council of Medical Research (ICMR)', 'World Health Organization (WHO)'],
        warningLevel: data.warningLevel || 'normal',
        suggestedQuestions: data.suggestedQuestions
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      // Fallback message
      const errorAiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `### ℹ️ Public Health Information

Thank you for your question regarding **"${text}"**.

**General Healthcare Recommendations:**
* If you or your family member are experiencing acute symptoms like fever over 101°F, persistent cough >2 weeks, severe headache, or gastrointestinal distress, visit your nearest **Primary Health Centre (PHC)** or government hospital for clinical evaluation.
* **Stay Hydrated:** Drink plenty of boiled clean water and Oral Rehydration Salts (ORS) for fluid replenishment.
* **Avoid Self-Medication:** Do not consume prescription antibiotics without a doctor's prescription.

*Always dial **108** for immediate emergency ambulance services.*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: ['Ministry of Health & Family Welfare (MoHFW)'],
        warningLevel: 'normal'
      };
      setMessages(prev => [...prev, errorAiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text: string, id: string) => {
    if ('speechSynthesis' in window) {
      if (speakingId === id) {
        window.speechSynthesis.cancel();
        setSpeakingId(null);
        return;
      }
      window.speechSynthesis.cancel();
      // Strip markdown symbols for speech
      const cleanText = text.replace(/[#*`_]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);
      setSpeakingId(id);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to reset the conversation?')) {
      setMessages([
        {
          id: 'welcome-reset',
          sender: 'ai',
          text: 'Conversation reset. How can I assist your health and disease awareness questions today?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sources: ['Ministry of Health & Family Welfare (MoHFW)']
        }
      ]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4" id="chatbot-section-root">
      
      {/* Top Banner with Title, Language & Clear Controls */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">AI Public Health Assistant</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-200">
                Verified Medical Protocol
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Guidance grounded in ICMR, MoHFW, and WHO public health standards
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          
          {/* Language Selector */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <Globe className="w-3.5 h-3.5 text-teal-600" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-transparent font-semibold text-slate-800 outline-hidden cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
          </div>

          {/* Clear Chat Button */}
          <button
            onClick={handleClearChat}
            id="clear-chat-btn"
            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition"
            title="Reset Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>

        </div>

      </div>


      {/* Suggested Question Chips */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
          Quick Topics & Common Inquiries
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="shrink-0 px-3 py-1.5 rounded-xl bg-white hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-xs font-medium text-slate-700 hover:text-teal-800 transition shadow-2xs text-left"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs min-h-[420px] max-h-[560px] overflow-y-auto space-y-6" id="chat-messages-box">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {/* AI Avatar */}
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              {/* Message Bubble */}
              <div className={`max-w-[85%] sm:max-w-[75%] space-y-2 ${isUser ? 'items-end' : 'items-start'}`}>
                
                <div
                  className={`p-4 sm:p-5 rounded-3xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-teal-600 text-white rounded-tr-xs shadow-md shadow-teal-600/10'
                      : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-xs'
                  } ${
                    msg.warningLevel === 'emergency' 
                      ? 'border-rose-300 bg-rose-50/90 text-rose-950' 
                      : msg.warningLevel === 'caution'
                      ? 'border-amber-300 bg-amber-50/80 text-amber-950' : ''
                  }`}
                >
                  {/* Formatted Markdown Content */}
                  <div className="space-y-2 whitespace-pre-wrap">
                    {msg.text.split('\n').map((line, lIdx) => {
                      if (line.startsWith('### ')) {
                        return <h4 key={lIdx} className="font-extrabold text-sm sm:text-base text-slate-900 mt-2 mb-1">{line.replace('### ', '')}</h4>;
                      }
                      if (line.startsWith('* **') || line.startsWith('- **')) {
                        const parts = line.split('**');
                        return (
                          <div key={lIdx} className="flex items-start gap-1.5 ml-2">
                            <span className="text-teal-600 font-bold">•</span>
                            <span><strong>{parts[1]}</strong>{parts.slice(2).join('')}</span>
                          </div>
                        );
                      }
                      if (line.startsWith('* ') || line.startsWith('- ')) {
                        return (
                          <div key={lIdx} className="flex items-start gap-1.5 ml-2">
                            <span className="text-teal-600">•</span>
                            <span>{line.substring(2)}</span>
                          </div>
                        );
                      }
                      return <p key={lIdx}>{line}</p>;
                    })}
                  </div>

                  {/* Sources Tag */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-200/80 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                      <span className="font-bold text-slate-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                        Verified Sources:
                      </span>
                      {msg.sources.map((src, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 text-[10px] font-medium">
                          {src}
                        </span>
                      ))}
                    </div>
                  )}

                </div>

                {/* Message Meta & Utilities */}
                <div className={`flex items-center gap-2 px-1 text-[11px] text-slate-400 ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <>
                      <span>•</span>
                      <button
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className="hover:text-slate-700 transition flex items-center gap-1"
                        title="Copy message"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                      </button>
                      <span>•</span>
                      <button
                        onClick={() => handleSpeak(msg.text, msg.id)}
                        className="hover:text-slate-700 transition flex items-center gap-1"
                        title="Read aloud"
                      >
                        {speakingId === msg.id ? <VolumeX className="w-3 h-3 text-rose-600" /> : <Volume2 className="w-3 h-3" />}
                        <span>{speakingId === msg.id ? 'Stop' : 'Listen'}</span>
                      </button>
                    </>
                  )}
                </div>

                {/* Follow-up question chips */}
                {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {msg.suggestedQuestions.map((q, qIdx) => (
                      <button
                        key={qIdx}
                        onClick={() => handleSendMessage(q)}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 transition text-left flex items-center gap-1"
                      >
                        <span>{q}</span>
                        <ArrowRight className="w-2.5 h-2.5 text-teal-600" />
                      </button>
                    ))}
                  </div>
                )}

              </div>

              {/* User Avatar */}
              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading / Generating State */}
        {isLoading && (
          <div className="flex gap-3 sm:gap-4 justify-start animate-in fade-in">
            <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-1 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2 rounded-tl-xs">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-teal-600 animate-spin" />
                <span className="font-semibold text-slate-800">Synthesizing verified public health advice...</span>
              </div>
              <p className="text-[11px] text-slate-500 italic">
                Cross-checking clinical protocols (WHO, ICMR, MoHFW guidelines)...
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="relative flex items-center gap-2"
        id="chat-input-form"
      >
        <div className="relative flex-1">
          <input
            type="text"
            id="chat-input-field"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`Ask a question in ${currentLang.nativeName} about fever, dengue, malaria, vaccines...`}
            className="w-full py-3.5 pl-4 pr-12 rounded-2xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-xs transition placeholder:text-slate-400"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          id="chat-send-btn"
          disabled={!inputMessage.trim() || isLoading}
          className="p-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:hover:bg-teal-600 text-white font-bold transition shadow-md shadow-teal-600/20 active:scale-95 shrink-0"
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

    </div>
  );
};
