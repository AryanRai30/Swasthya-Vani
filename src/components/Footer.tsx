import React from 'react';
import { 
  HeartHandshake, 
  ShieldAlert, 
  PhoneCall, 
  ExternalLink, 
  Award, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

interface FooterProps {
  onOpenEmergency: () => void;
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEmergency, setActiveTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 w-full" id="main-footer">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Prominent Safety & Medical Disclaimer Banner */}
        <div className="mb-10 p-5 rounded-2xl bg-slate-800/90 border border-amber-500/30 text-slate-200 flex flex-col md:flex-row items-start md:items-center gap-4 shadow-inner" id="mandatory-safety-banner">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-0.5">
              Important Public Health & Medical Disclaimer
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>This platform provides health awareness information and does not provide a medical diagnosis or replace professional medical advice.</strong> If you are experiencing a medical emergency (severe shortness of breath, sudden chest pain, excessive bleeding, or loss of consciousness), immediately contact <strong>108 / 112</strong> or visit the nearest emergency medical department.
            </p>
          </div>
          <button
            onClick={onOpenEmergency}
            id="footer-emergency-call-btn"
            className="shrink-0 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition shadow-md flex items-center gap-1.5"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Emergency SOS (108)</span>
          </button>
        </div>

        {/* 4 Column Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center text-slate-900 font-bold">
                <HeartHandshake className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                Swasthya<span className="text-teal-400">Vani</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-Driven Public Health Chatbot for verified disease awareness, interactive multilingual symptom triage, and real-time outbreak surveillance across India.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 bg-teal-950/60 border border-teal-800/60 px-3 py-1.5 rounded-lg w-fit">
              <Award className="w-4 h-4" />
              <span>National Public Health Initiative</span>
            </div>
          </div>

          {/* Quick Platform Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Platform Modules
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button 
                  onClick={() => setActiveTab('home')}
                  className="hover:text-teal-400 transition"
                >
                  Overview & Home Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('chat')}
                  className="hover:text-teal-400 transition flex items-center gap-1"
                >
                  <span>AI Health Assistant Chatbot</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-teal-500/20 text-teal-300 rounded">Interactive</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('symptom-checker')}
                  className="hover:text-teal-400 transition"
                >
                  Symptom Triage Checker
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('disease-library')}
                  className="hover:text-teal-400 transition"
                >
                  Communicable & Chronic Disease Library
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('health-alerts')}
                  className="hover:text-teal-400 transition"
                >
                  Public Health Advisories & Outbreaks
                </button>
              </li>
            </ul>
          </div>

          {/* 24x7 National Helplines */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              24x7 National Helplines (India)
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center justify-between">
                <span>National Ambulance Service:</span>
                <span className="font-bold text-rose-400">108</span>
              </li>
              <li className="flex items-center justify-between">
                <span>National Emergency Response:</span>
                <span className="font-bold text-rose-400">112</span>
              </li>
              <li className="flex items-center justify-between">
                <span>National Health Advice Line:</span>
                <span className="font-bold text-teal-300">104</span>
              </li>
              <li className="flex items-center justify-between">
                <span>National Epidemic & Health:</span>
                <span className="font-bold text-teal-300">1075</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Tele-MANAS Mental Health:</span>
                <span className="font-bold text-emerald-400">14416</span>
              </li>
            </ul>
          </div>

          {/* Official Health Guidelines & Verification */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Knowledge Source Authorities
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Content aligned with published clinical protocols:
            </p>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Ministry of Health & Family Welfare (MoHFW)</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Indian Council of Medical Research (ICMR)</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>World Health Organization (WHO Guidelines)</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>National Vector Borne Disease Control</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 SwasthyaVani • Public Health Disease Awareness Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-emerald-500 font-medium">● System Status: Online & Monitoring</span>
            <span>Version 1.0.0 (Production Ready)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
