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
  HelpCircle, 
  Sparkles, 
  Activity, 
  Users, 
  FileText, 
  Flame,
  Globe,
  Info
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
    <div className="space-y-16 pb-12" id="home-section-root">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 sm:pt-12">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-teal-50/80 via-emerald-50/40 to-transparent -z-10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Outbreak / Advisory Ticker */}
          {activeAlerts.length > 0 && (
            <div 
              onClick={() => setActiveTab('health-alerts')}
              className="mb-8 p-2.5 sm:p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 flex items-center justify-between gap-3 cursor-pointer hover:bg-amber-500/15 transition group shadow-xs"
              id="hero-alert-ticker"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500 text-white uppercase tracking-wider shrink-0 flex items-center gap-1">
                  <Flame className="w-3 h-3" /> Live Alert
                </span>
                <p className="text-xs font-semibold truncate text-slate-800">
                  <span className="font-bold text-amber-950">{activeAlerts[0].title}:</span> {activeAlerts[0].summary}
                </p>
              </div>
              <span className="text-xs font-bold text-amber-700 shrink-0 flex items-center gap-1 group-hover:translate-x-0.5 transition">
                View Advisory <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          )}

          {/* Hero Header */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>National Public Health & Community Disease Awareness</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight sm:leading-none">
              AI-Driven Public Health for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-800">
                Disease Awareness
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Empowering citizens across India with verified disease education, interactive multilingual symptom checking, outbreak advisories, and immediate first-aid guidance based on ICMR and WHO protocols.
            </p>

            {/* Quick Action CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                id="hero-ask-ai-btn"
                onClick={() => setActiveTab('chat')}
                className="px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm transition shadow-lg shadow-teal-600/25 flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Bot className="w-5 h-5" />
                <span>Ask AI Health Assistant</span>
              </button>

              <button
                id="hero-check-symptoms-btn"
                onClick={() => setActiveTab('symptom-checker')}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm transition shadow-xs flex items-center gap-2 hover:-translate-y-0.5"
              >
                <Stethoscope className="w-5 h-5 text-teal-600" />
                <span>Check Symptoms</span>
              </button>

              <button
                id="hero-explore-diseases-btn"
                onClick={() => setActiveTab('disease-library')}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm transition shadow-xs flex items-center gap-2 hover:-translate-y-0.5"
              >
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <span>Explore Diseases</span>
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>ICMR & MoHFW Verified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-teal-600" />
                <span>8+ Regional Indian Languages</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>No Prescription Sales / 100% Educational</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-teal-300 transition">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">28+</div>
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-0.5">Diseases Documented</div>
            <p className="text-[11px] text-slate-500 mt-1">Vector-borne, waterborne, respiratory & chronic conditions.</p>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-teal-300 transition">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <Globe className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">8+</div>
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-0.5">Indian Languages</div>
            <p className="text-[11px] text-slate-500 mt-1">Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati & more.</p>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-teal-300 transition">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">{activeAlerts.length} Active</div>
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-0.5">Outbreak Advisories</div>
            <p className="text-[11px] text-slate-500 mt-1">Monsoon vector alerts, seasonal flu, water safety notices.</p>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-teal-300 transition">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center mb-3">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">24/7 SOS</div>
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-0.5">National Helplines</div>
            <p className="text-[11px] text-slate-500 mt-1">Direct linkage to 108, 112, 104 & Tele-MANAS.</p>
          </div>

        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            How SwasthyaVani Protects Your Family
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            A three-step triage and awareness pipeline designed for high accuracy and citizen safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-3xl bg-white border border-slate-200 relative overflow-hidden shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white font-black text-sm flex items-center justify-center mb-4">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Ask in Your Natural Language
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Chat naturally with the AI health assistant in Hindi, English, Bengali, or Tamil about symptoms, home care hydration, or vaccine schedules.
            </p>
            <div className="p-3 rounded-xl bg-teal-50 border border-teal-100 text-[11px] text-teal-900 font-medium">
              "What are early warning signs of Dengue during monsoon?"
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 relative overflow-hidden shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center mb-4">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Interactive Symptom Triage
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Run structured multi-factor risk assessments taking age, duration, severity, and red flags into consideration for immediate clarity.
            </p>
            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-[11px] text-indigo-900 font-medium">
              Evaluates risk level (Low, Moderate, High, Emergency)
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 relative overflow-hidden shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center mb-4">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Actionable Care & Verification
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Receive verified prevention advice, questions to ask your doctor at the Primary Health Centre, and rapid 108 emergency dialer links.
            </p>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-[11px] text-emerald-900 font-medium">
              Backed by WHO, ICMR, and MoHFW protocols
            </div>
          </div>

        </div>
      </section>

      {/* 4. FEATURED DISEASE SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
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
            className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1.5 group"
          >
            <span>View All 28+ Diseases in Library</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredDiseases.map((d) => (
            <div
              key={d.id}
              onClick={() => {
                onSelectDisease(d.id);
                setActiveTab('disease-library');
              }}
              className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
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

      {/* 5. DEBUNKING COMMON MYTHS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
          
          <div className="max-w-2xl mb-8">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase tracking-wide">
              Public Health Fact Check
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
              Debunking Dangerous Health Myths
            </h2>
            <p className="text-xs text-slate-300 mt-2">
              Misinformation can cost lives. Here is what science and public health evidence say about common ailments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs mb-1">
                <ShieldAlert className="w-4 h-4" />
                <span>MYTH: "Papaya juice completely cures severe Dengue"</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                <strong className="text-teal-300 font-semibold">FACT:</strong> While home hydration is beneficial, papaya extract does not prevent plasma leakage. Delaying hospital care during the critical defervescent phase can lead to fatal Dengue Shock Syndrome.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs mb-1">
                <ShieldAlert className="w-4 h-4" />
                <span>MYTH: "Antibiotics are required for common cold or viral flu"</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                <strong className="text-teal-300 font-semibold">FACT:</strong> Antibiotics kill only bacteria. Viral fevers like influenza require hydration, rest, and symptomatic care. Inappropriate antibiotic use causes dangerous superbug resistance.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs mb-1">
                <ShieldAlert className="w-4 h-4" />
                <span>MYTH: "Puppy scratches without blood don't need rabies shots"</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                <strong className="text-teal-300 font-semibold">FACT:</strong> Any minor skin abrasion or saliva contact from an animal requires immediate 15-minute soap washing and Anti-Rabies Vaccine (ARV) series. Once symptoms appear, rabies is 100% fatal.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs mb-1">
                <ShieldAlert className="w-4 h-4" />
                <span>MYTH: "Tuberculosis is an incurable hereditary disease"</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                <strong className="text-teal-300 font-semibold">FACT:</strong> TB is a bacterial infection and is 100% curable. Testing and complete DOTS medications are provided 100% free across India under the Ni-kshay program.
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
