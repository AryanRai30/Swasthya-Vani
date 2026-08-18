import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  User, 
  Sparkles, 
  Globe, 
  Trash2, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Mic,
  MicOff
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
      text: `### 🩺 SwasthyaVani Public Health Assistant

**Answer:**
Namaste! I am your AI Public Health Awareness Assistant for **disease education, symptom awareness, and preventive health guidance**, synthesized from official **ICMR, MoHFW, and WHO** protocols.

**Key Points:**
* I can help explain diseases, transmission vectors, prevention steps, and warning signs.
* I support inquiries in **English**, **हिंदी (Hindi)**, and **Hinglish**.
* I **do not** provide medical diagnoses or prescribe prescription drug dosages.

**What to Do Next:**
* Choose a quick topic from below or type your health question in the input field.

**Sources & References:**
* Ministry of Health & Family Welfare (MoHFW), Indian Council of Medical Research (ICMR), WHO

**Medical Disclaimer:**
*This information is for health awareness and does not constitute a medical diagnosis or replace professional medical advice.*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: ['Ministry of Health & Family Welfare (MoHFW)', 'Indian Council of Medical Research (ICMR)', 'World Health Organization (WHO)'],
      suggestedQuestions: [
        'What are the symptoms of dengue?',
        'How can I prevent malaria?',
        'डेंगू से कैसे बचें?',
        'TB kaise spread hota hai?',
        'What is hypertension?'
      ]
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastFailedPrompt, setLastFailedPrompt] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const handleToggleVoiceInput = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser window. You can type your query in the input bar.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = selectedLanguage === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputMessage(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition notice:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error('Failed to start voice input:', e);
      setIsListening(false);
    }
  };

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];

  const suggestedPrompts = [
    'What are the symptoms of dengue?',
    'How can I prevent malaria?',
    'डेंगू से कैसे बचें?',
    'TB kaise spread hota hai?',
    'What is hypertension?',
    'What medicine dosage should I take for fever?',
    'Do I have malaria if I have chills and fever?'
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

    setLastFailedPrompt(null);

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
          history: messages.slice(-6).map(m => ({ 
            role: m.sender === 'user' ? 'user' : 'model', 
            text: m.text 
          }))
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
        knowledgeBaseRef: data.knowledgeBaseRef,
        warningLevel: data.warningLevel || 'normal',
        suggestedQuestions: data.suggestedQuestions
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      setLastFailedPrompt(text);
      
      const errorAiMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: `### ⚠️ Connection Notice

We encountered a temporary network delay in contacting the health assistant. 

**What to Do Next:**
* Please click the **Retry Question** button below to resend your query.
* If you or a family member is in immediate medical distress, call **108** for ambulance support or visit your nearest hospital emergency ward.

**Medical Disclaimer:**
*This information is for health awareness and does not constitute a medical diagnosis or replace professional medical advice.*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: ['Ministry of Health & Family Welfare (MoHFW)'],
        warningLevel: 'caution'
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
      // Clean markdown characters for pleasant speech
      const cleanText = text
        .replace(/###/g, '')
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/`/g, '')
        .replace(/_/g, '');
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
          text: `### 🩺 SwasthyaVani Public Health Assistant

**Answer:**
Conversation reset. How can I assist your health and disease awareness questions today?

**What to Do Next:**
* You can ask about dengue warning signs, malaria prevention, TB DOTS treatment, blood pressure regulation, or vaccine schedules.

**Medical Disclaimer:**
*This information is for health awareness and does not constitute a medical diagnosis or replace professional medical advice.*`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sources: ['Ministry of Health & Family Welfare (MoHFW)']
        }
      ]);
      setLastFailedPrompt(null);
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4" id="chatbot-section-root">
      <div className="max-w-4xl mx-auto space-y-4">
        
        {/* Top Banner with Title, Language & Clear Controls */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">AI Public Health Assistant</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-200 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-teal-700" />
                Verified Guidelines
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Evidence-based public health guidance aligned with ICMR, MoHFW, and WHO
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
          Suggested Inquiries & Verification Queries
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
              <div className={`max-w-[88%] sm:max-w-[80%] space-y-2 ${isUser ? 'items-end' : 'items-start'}`}>
                
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
                      if (line.startsWith('**Answer:**') || line.startsWith('**उत्तर (Answer):**')) {
                        return (
                          <div key={lIdx} className="mt-2 mb-1">
                            <span className="font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/60 text-xs">
                              {line.includes('उत्तर') ? 'उत्तर (Answer)' : 'Answer'}
                            </span>
                          </div>
                        );
                      }
                      if (line.startsWith('**Key Points:**') || line.startsWith('**मुख्य बिंदु (Key Points):**')) {
                        return (
                          <div key={lIdx} className="mt-3 mb-1 font-bold text-slate-900 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                            {line.includes('मुख्य') ? 'मुख्य बिंदु (Key Points):' : 'Key Points:'}
                          </div>
                        );
                      }
                      if (line.startsWith('**Warning Signs') || line.startsWith('**चेतावनी के संकेत')) {
                        return (
                          <div key={lIdx} className="mt-3 mb-1 font-bold text-rose-800 flex items-center gap-1.5 bg-rose-50 px-2 py-1 rounded-lg border border-rose-200">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                            {line.replace(/\*\*/g, '')}
                          </div>
                        );
                      }
                      if (line.startsWith('**What to Do Next:**') || line.startsWith('**आगे क्या करें (What to do next):**')) {
                        return (
                          <div key={lIdx} className="mt-3 mb-1 font-bold text-slate-900 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                            {line.includes('आगे क्या करें') ? 'आगे क्या करें (What to do next):' : 'What to Do Next:'}
                          </div>
                        );
                      }
                      if (line.startsWith('**Sources & References:**') || line.startsWith('**स्रोत (Sources):**')) {
                        return (
                          <div key={lIdx} className="mt-3 text-[11px] font-bold text-slate-500">
                            {line.includes('स्रोत') ? 'सत्यापित स्रोत (Sources):' : 'Verified Sources & References:'}
                          </div>
                        );
                      }
                      if (line.startsWith('**Medical Disclaimer:**') || line.startsWith('**चिकित्सा अस्वीकरण (Medical Disclaimer):**') || line.startsWith('*This information is for health awareness') || line.startsWith('*यह जानकारी स्वास्थ्य जागरूकता')) {
                        return (
                          <div key={lIdx} className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] text-slate-500 italic">
                            {line.replace(/\*\*/g, '')}
                          </div>
                        );
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

                  {/* Source Transparency & Knowledge Base Reference */}
                  {((msg.sources && msg.sources.length > 0) || msg.knowledgeBaseRef) && (
                    <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-1.5 text-[11px] text-slate-500">
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="font-bold text-slate-600 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                            Verified Sources:
                          </span>
                          {msg.sources.map((src, sIdx) => (
                            <span key={sIdx} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[10px] font-medium shadow-2xs">
                              {src}
                            </span>
                          ))}
                        </div>
                      )}
                      {msg.knowledgeBaseRef && (
                        <div className="text-[10px] text-slate-400 font-mono">
                          📁 <span className="font-semibold text-slate-500">KB Reference:</span> {msg.knowledgeBaseRef}
                        </div>
                      )}
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

        {/* Retry Button if last message failed */}
        {lastFailedPrompt && !isLoading && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between gap-2 text-xs text-amber-900">
            <span>Query failed to send: <strong>"{lastFailedPrompt}"</strong></span>
            <button
              onClick={() => handleSendMessage(lastFailedPrompt)}
              className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retry Question
            </button>
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
            placeholder={isListening ? '🎙️ Listening... speak your question clearly...' : `Ask in ${currentLang.nativeName} about dengue symptoms, malaria prevention, TB, hypertension...`}
            className={`w-full py-3.5 pl-4 pr-12 rounded-2xl border bg-white text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-xs transition placeholder:text-slate-400 ${
              isListening ? 'border-rose-400 ring-2 ring-rose-400/30 bg-rose-50/20' : 'border-slate-300'
            }`}
            disabled={isLoading}
          />
        </div>

        {/* Optional Voice Speech-to-Text Input Button */}
        <button
          type="button"
          onClick={handleToggleVoiceInput}
          id="chat-voice-btn"
          disabled={isLoading}
          className={`p-3.5 rounded-2xl border transition shadow-xs flex items-center justify-center shrink-0 ${
            isListening 
              ? 'bg-rose-600 border-rose-600 text-white animate-pulse shadow-md shadow-rose-600/30 ring-4 ring-rose-300' 
              : 'bg-white border-slate-300 hover:bg-slate-50 text-slate-700 hover:text-teal-700'
          }`}
          title={isListening ? 'Stop recording voice' : 'Click to speak question via microphone'}
          aria-label="Voice input"
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

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

    </div>
  );
};
