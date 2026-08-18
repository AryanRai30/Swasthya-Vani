import React from 'react';
import { 
  Bot, 
  Stethoscope, 
  BookOpen, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  PhoneCall, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Activity, 
  Flame,
  Globe,
  Award
} from 'lucide-react';
import { DISEASES_DATA } from '../data/diseases';
import { HealthAlert } from '../types';

interface HomeSectionProps {
  setActiveTab: (tab: string) => void;
  onOpenEmergency: () => void;
  onSelectDisease: (diseaseId: string) => void;
  alerts: HealthAlert[];
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  setActiveTab,
  onOpenEmergency,
  onSelectDisease,
  alerts
}) => {
  const activeAlerts = alerts.filter(a => a.active);
  const featuredDiseases = DISEASES_DATA.slice(0, 4);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 w-full max-w-full overflow-hidden" id="home-section-root">
      
      {/* ========================================================= */}
      {/* 1. HERO & NATIONAL TRIAGE SECTION */}
      {/* ========================================================= */}
      <section className="relative pt-4 sm:pt-6 lg:pt-8 w-full">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Outbreak / Advisory Live Ticker Banner */}
          {activeAlerts.length > 0 && (
            <div 
              onClick={() => setActiveTab('health-alerts')}
              className="mb-6 sm:mb-8 p-3 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 cursor-pointer hover:bg-amber-500/15 transition group shadow-2xs"
              id="hero-alert-ticker"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-500 text-white uppercase tracking-wider shrink-0 flex items-center gap-1.5 shadow-xs">
                  <Flame className="w-3.5 h-3.5 animate-pulse" /> Live Alert
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                  <span className="font-bold text-amber-950">{activeAlerts[0].title}:</span> {activeAlerts[0].summary}
                </p>
              </div>
              <span className="text-xs font-bold text-amber-800 shrink-0 flex items-center gap-1 group-hover:translate-x-1 transition self-end sm:self-auto">
                <span>View Advisory</span> <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          )}

          {/* Hero Content: 2-Column Desktop Grid / 1-Column Mobile Stack */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT (Desktop lg:col-span-7): Heading, Description, CTA Buttons, Trust Indicators */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
              
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-900 text-xs font-bold shadow-2xs">
                <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
                <span>National Public Health & Disease Triage</span>
              </div>

              {/* Responsive Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-5xl font-black text-slate-900 tracking-tight leading-[1.18]">
                AI-Driven Public Health for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-800">
                  Disease Awareness
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                Empowering citizens across India with verified disease education, interactive multilingual symptom checking, outbreak advisories, and immediate first-aid guidance based on ICMR and WHO protocols.
              </p>

              {/* Action CTA Buttons (Stacked on Mobile, Row on Desktop) */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  id="hero-ask-ai-btn"
                  onClick={() => setActiveTab('chat')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-extrabold text-xs sm:text-sm transition shadow-md shadow-teal-600/20 flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Bot className="w-4 h-4 shrink-0" />
                  <span>Ask AI Health Assistant</span>
                </button>

                <div className="grid grid-cols-2 sm:flex items-center gap-2.5 sm:gap-3">
                  <button
                    id="hero-check-symptoms-btn"
                    onClick={() => setActiveTab('symptom-checker')}
                    className="w-full sm:w-auto px-4 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs sm:text-sm transition shadow-2xs flex items-center justify-center gap-1.5 active:scale-95 min-h-[44px]"
                  >
                    <Stethoscope className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Check Symptoms</span>
                  </button>

                  <button
                    id="hero-explore-diseases-btn"
                    onClick={() => setActiveTab('disease-library')}
                    className="w-full sm:w-auto px-4 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs sm:text-sm transition shadow-2xs flex items-center justify-center gap-1.5 active:scale-95 min-h-[44px]"
                  >
                    <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Diseases</span>
                  </button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ICMR & MoHFW Aligned</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>8+ Regional Indian Languages</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>100% Free & Educational</span>
                </div>
              </div>

              {/* Visual Card on Mobile (Renders in requested position: after Trust indicators) */}
              <div className="block lg:hidden pt-4">
                <div className="w-full p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white shadow-xl border border-teal-800/40 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs font-bold text-teal-300">Live Surveillance & Triage</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-semibold">ICMR Verified</span>
                  </div>
                  <div 
                    onClick={() => setActiveTab('chat')}
                    className="p-3.5 rounded-2xl bg-white/10 border border-white/10 text-xs flex items-center justify-between gap-2 cursor-pointer hover:bg-white/15 transition"
                  >
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-teal-300 shrink-0" />
                      <span className="font-medium text-slate-200">Ask in Hindi, English or Hinglish</span>
                    </div>
                    <span className="text-[10px] font-bold text-teal-300 bg-teal-900/60 px-2 py-0.5 rounded-md">8+ Langs</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-center text-xs">
                    <div 
                      onClick={() => setActiveTab('facilities')}
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10 font-bold text-teal-300 cursor-pointer"
                    >
                      Govt Health Centres
                    </div>
                    <div 
                      onClick={onOpenEmergency}
                      className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/30 font-bold text-rose-300 cursor-pointer"
                    >
                      Emergency 108
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN (DESKTOP lg:col-span-5): Showcase Hub Card */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="w-full p-6 xl:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white shadow-xl border border-teal-800/40 space-y-5">
                
                {/* Hub Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-wider text-teal-300">
                      National Surveillance Hub
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    Active 24x7
                  </span>
                </div>

                {/* Live Outbreak Notice */}
                <div 
                  onClick={() => setActiveTab('health-alerts')}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer space-y-1.5 group"
                >
                  <div className="flex items-center justify-between text-[11px] text-amber-300 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      Monsoon Vector Alert (Dengue & Malaria)
                    </span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition text-slate-300" />
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Elevated risk reported across Northern & Western states. Observe weekly dry days and avoid aspirin self-medication.
                  </p>
                </div>

                {/* Multi-language Triage Feature */}
                <div 
                  onClick={() => setActiveTab('chat')}
                  className="p-4 rounded-2xl bg-teal-900/40 border border-teal-500/30 hover:bg-teal-900/60 transition cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-teal-300" />
                      <span className="text-xs font-bold text-teal-100">Interactive Health Assistant</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">RAG Enabled</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/60 text-xs text-slate-300 font-medium italic border border-white/5">
                    "डेंगू के लक्षण क्या हैं और डॉक्टर के पास कब जाना चाहिए?"
                  </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div 
                    onClick={() => setActiveTab('facilities')}
                    className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center cursor-pointer hover:bg-white/10 transition"
                  >
                    <div className="text-lg font-black text-teal-300">100% Free</div>
                    <div className="text-[10px] font-semibold text-slate-300">Govt Diagnostic Tests</div>
                  </div>
                  <div 
                    onClick={onOpenEmergency}
                    className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center cursor-pointer hover:bg-rose-500/20 transition"
                  >
                    <div className="text-lg font-black text-rose-300">108 / 112</div>
                    <div className="text-[10px] font-semibold text-slate-300">Emergency SOS Line</div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. STATISTICS SECTION (4 cols desktop, 2x2 tablet, 1 col mobile) */}
      {/* ========================================================= */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs hover:border-teal-300 transition flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="text-3xl font-black text-slate-900">28+</div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-1">Diseases Documented</div>
            </div>
            <p className="text-xs text-slate-500 mt-2">Vector-borne, waterborne, respiratory & chronic conditions.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs hover:border-teal-300 transition flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                <Globe className="w-5 h-5" />
              </div>
              <div className="text-3xl font-black text-slate-900">8+</div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-1">Indian Languages</div>
            </div>
            <p className="text-xs text-slate-500 mt-2">Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati & more.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs hover:border-teal-300 transition flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="text-3xl font-black text-slate-900">{activeAlerts.length} Active</div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-1">Outbreak Advisories</div>
            </div>
            <p className="text-xs text-slate-500 mt-2">Monsoon vector alerts, seasonal flu, water safety notices.</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs hover:border-teal-300 transition flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center mb-3">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div className="text-3xl font-black text-slate-900">24/7 SOS</div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-1">National Helplines</div>
            </div>
            <p className="text-xs text-slate-500 mt-2">Direct linkage to 108, 112, 104 & Tele-MANAS.</p>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. HOW IT WORKS */}
      {/* ========================================================= */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            How SwasthyaVani Protects Your Family
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            A three-step triage and awareness pipeline designed for high accuracy and citizen safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-3 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white font-black text-sm flex items-center justify-center mb-3">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Ask in Your Natural Language
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Chat naturally with the AI health assistant in Hindi, English, Bengali, or Tamil about symptoms, home care hydration, or vaccine schedules.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-teal-50 border border-teal-100 text-xs text-teal-900 font-medium mt-4">
              "What are early warning signs of Dengue during monsoon?"
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-3 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center mb-3">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Interactive Symptom Triage
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Run structured multi-factor risk assessments taking age, duration, severity, and red flags into consideration for immediate clarity.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-900 font-medium mt-4">
              Evaluates risk level (Low, Moderate, High, Emergency)
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-3 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center mb-3">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Actionable Care & Verification
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Receive verified prevention advice, questions to ask your doctor at the Primary Health Centre, and rapid 108 emergency dialer links.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-900 font-medium mt-4">
              Backed by WHO, ICMR, and MoHFW protocols
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. FEATURED DISEASE SPOTLIGHT */}
      {/* ========================================================= */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">
              Public Health Knowledge Base
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Featured Disease Awareness Guides
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('disease-library')}
            className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1.5 group self-start sm:self-auto"
          >
            <span>View All 28+ Diseases in Library</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredDiseases.map((d) => (
            <div
              key={d.id}
              onClick={() => {
                onSelectDisease(d.id);
                setActiveTab('disease-library');
              }}
              className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-teal-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 group-hover:bg-teal-50 group-hover:text-teal-800 transition">
                    {d.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                    d.riskLevel === 'Severe' ? 'bg-rose-100 text-rose-800' :
                    d.riskLevel === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {d.riskLevel} Risk
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition">
                  {d.name}
                </h3>
                {d.hindiName && (
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{d.hindiName}</p>
                )}

                <p className="text-xs text-slate-600 line-clamp-3 mt-2 leading-relaxed">
                  {d.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-600 group-hover:text-teal-800">
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. DEBUNKING COMMON MYTHS */}
      {/* ========================================================= */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white shadow-xl">
          
          <div className="max-w-2xl mb-6 sm:mb-8">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase tracking-wide">
              Public Health Fact Check
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
              Debunking Dangerous Health Myths
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Misinformation can cost lives. Here is what science and public health evidence say about common ailments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs sm:text-sm mb-1">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>MYTH: "Papaya juice completely cures severe Dengue"</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                <strong className="text-teal-300 font-semibold">FACT:</strong> While home hydration is beneficial, papaya extract does not prevent plasma leakage. Delaying hospital care during the critical defervescent phase can lead to fatal Dengue Shock Syndrome.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs sm:text-sm mb-1">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>MYTH: "Antibiotics are required for common cold or viral flu"</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                <strong className="text-teal-300 font-semibold">FACT:</strong> Antibiotics kill only bacteria. Viral fevers like influenza require hydration, rest, and symptomatic care. Inappropriate antibiotic use causes dangerous superbug resistance.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs sm:text-sm mb-1">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>MYTH: "Puppy scratches without blood don't need rabies shots"</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                <strong className="text-teal-300 font-semibold">FACT:</strong> Any minor skin abrasion or saliva contact from an animal requires immediate 15-minute soap washing and Anti-Rabies Vaccine (ARV) series. Once symptoms appear, rabies is 100% fatal.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs sm:text-sm mb-1">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>MYTH: "Tuberculosis is an incurable hereditary disease"</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                <strong className="text-teal-300 font-semibold">FACT:</strong> TB is a bacterial infection and is 100% curable. Testing and complete DOTS medications are provided 100% free across India under the Ni-kshay program.
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
