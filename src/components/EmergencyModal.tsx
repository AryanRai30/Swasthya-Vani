import React from 'react';
import { 
  X, 
  PhoneCall, 
  AlertTriangle, 
  ShieldAlert, 
  HeartHandshake, 
  Clock, 
  MapPin, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const helplines = [
    {
      number: '108',
      title: 'National Ambulance Emergency',
      subtitle: 'For trauma, severe breathlessness, heart attack, obstetric emergencies, unconsciousness',
      bgColor: 'bg-rose-50 border-rose-200 text-rose-900',
      badgeColor: 'bg-rose-600 text-white',
      badge: 'Immediate Dispatch'
    },
    {
      number: '112',
      title: 'All-in-One National Emergency',
      subtitle: 'Unified emergency response support (Police, Fire, Medical, Disaster Relief)',
      bgColor: 'bg-red-50 border-red-200 text-red-900',
      badgeColor: 'bg-red-600 text-white',
      badge: 'Unified 24/7'
    },
    {
      number: '104',
      title: 'National Health Advice & Guidance Line',
      subtitle: 'Medical counseling, health scheme inquiries, local hospital bed availability, doctor advice',
      bgColor: 'bg-teal-50 border-teal-200 text-teal-900',
      badgeColor: 'bg-teal-600 text-white',
      badge: 'Medical Guidance'
    },
    {
      number: '1075',
      title: 'National Epidemic & Public Health Helpline',
      subtitle: 'MoHFW Central helpline for communicable outbreaks, quarantine, and health advisories',
      bgColor: 'bg-blue-50 border-blue-200 text-blue-900',
      badgeColor: 'bg-blue-600 text-white',
      badge: 'MoHFW Central'
    },
    {
      number: '14416',
      title: 'Tele-MANAS Mental Health Helpline',
      subtitle: 'Toll-free 24/7 psychological support and crisis counseling by licensed counselors in multiple regional languages',
      bgColor: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      badgeColor: 'bg-emerald-600 text-white',
      badge: 'Mental Wellness'
    },
    {
      number: '1800-180-1104',
      title: 'National Blood Bank / NACO Helpline',
      subtitle: 'Blood requirement queries, emergency blood component availability, and donor connections',
      bgColor: 'bg-amber-50 border-amber-200 text-amber-900',
      badgeColor: 'bg-amber-600 text-white',
      badge: 'Toll Free'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8" id="emergency-modal-content">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-rose-700 via-red-600 to-rose-800 p-6 text-white relative">
          <button
            onClick={onClose}
            id="emergency-modal-close-btn"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            aria-label="Close emergency modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-xs">
              <PhoneCall className="w-6 h-6 text-white animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-white text-rose-800 uppercase tracking-wide">
                  Emergency Medical Hub
                </span>
                <span className="text-xs text-rose-100 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 24x7 Toll Free
                </span>
              </div>
              <h2 className="text-xl font-black tracking-tight text-white mt-1">
                National Emergency & Health Helplines
              </h2>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Red Flag Warning Box */}
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 flex items-start gap-3.5">
            <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <strong className="font-bold text-rose-900 block mb-1">
                Immediate Critical Red Flags (Do NOT wait):
              </strong>
              <p>
                Crushing chest pain, severe difficulty breathing, sudden face drooping or speech slurring (stroke), profuse bleeding, seizures/convulsions, severe animal bites, or loss of responsiveness. Dial <strong>108 / 112</strong> immediately.
              </p>
            </div>
          </div>

          {/* Helpline Cards */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              One-Tap Direct Helplines (India)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {helplines.map((item) => (
                <a
                  key={item.number}
                  href={`tel:${item.number}`}
                  className={`p-4 rounded-2xl border transition-all hover:scale-[1.02] hover:shadow-md flex flex-col justify-between ${item.bgColor}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                      <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                        Tap to Call <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                    <div className="text-2xl font-black tracking-tight mb-1">
                      {item.number}
                    </div>
                    <h4 className="text-xs font-bold leading-tight mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] opacity-80 leading-snug">
                      {item.subtitle}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Bystander Action Protocol */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-teal-600" />
              What to tell the 108 Emergency Operator:
            </h4>
            <ol className="list-decimal list-inside text-xs text-slate-600 space-y-1.5 leading-relaxed">
              <li><strong>Exact Location:</strong> Landmark, street name, house/building number, and district.</li>
              <li><strong>Patient State:</strong> Age, gender, conscious or unconscious, breathing status.</li>
              <li><strong>Chief Complaint:</strong> Chest pain, heavy bleeding, accident, snake/dog bite, or high fever with fits.</li>
              <li><strong>Stay on the line:</strong> Do not hang up until the dispatcher confirms dispatch.</li>
            </ol>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Services managed by MoHFW & State Emergency Response Services.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
