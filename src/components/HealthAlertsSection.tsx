import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Bell, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Info, 
  ExternalLink, 
  Filter,
  Flame,
  Radio,
  X
} from 'lucide-react';
import { HealthAlert } from '../types';
import { REGIONAL_ZONES } from '../data/healthAlerts';

interface HealthAlertsSectionProps {
  alerts: HealthAlert[];
  onSelectDiseaseTab: () => void;
}

export const HealthAlertsSection: React.FC<HealthAlertsSectionProps> = ({
  alerts,
  onSelectDiseaseTab
}) => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [activeAlertDetail, setActiveAlertDetail] = useState<HealthAlert | null>(null);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribedMsg, setSubscribedMsg] = useState(false);

  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = selectedSeverity === 'All' || alert.severity === selectedSeverity;
    const matchesRegion = selectedRegion === 'All Regions' || alert.region.toLowerCase().includes(selectedRegion.toLowerCase().replace(' states', '').replace(' india', ''));
    return matchesSeverity && matchesRegion;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribeEmail.includes('@')) {
      setSubscribedMsg(true);
      setSubscribeEmail('');
      setTimeout(() => setSubscribedMsg(false), 5000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8" id="health-alerts-root">
      
      {/* Header & Notification Sub Box */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
            <Radio className="w-4 h-4 animate-pulse text-rose-600" />
            <span>Integrated Disease Surveillance System (IDSP)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            National Public Health Outbreak Advisories
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Real-time disease surveillance advisories, seasonal spike notices, and preventive public health bulletins issued by MoHFW, ICMR, and State Health Missions.
          </p>
        </div>

        {/* Subscribe Card */}
        <div className="p-4 rounded-3xl bg-slate-900 text-white shadow-md max-w-md w-full">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-slate-200">Outbreak SMS / Email Broadcast</span>
          </div>
          {subscribedMsg ? (
            <div className="p-2 rounded-xl bg-teal-900/60 border border-teal-500/50 text-teal-300 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Subscribed to regional health advisories!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                placeholder="Enter mobile or email..."
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-hidden focus:border-teal-400"
                required
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs shrink-0 transition"
              >
                Alert Me
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        
        {/* Severity Filters */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
            Severity:
          </span>
          {['All', 'Critical', 'Warning', 'Advisory'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSelectedSeverity(sev)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedSeverity === sev
                  ? sev === 'Critical' ? 'bg-rose-600 text-white' :
                    sev === 'Warning' ? 'bg-amber-600 text-white' :
                    sev === 'Advisory' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>

        {/* Region Filter */}
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-teal-600" />
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 rounded-xl px-3 py-1.5 outline-hidden cursor-pointer"
          >
            {REGIONAL_ZONES.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Alerts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            id={`alert-card-${alert.id}`}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  alert.severity === 'Critical' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                  alert.severity === 'Warning' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                  'bg-blue-100 text-blue-800 border border-blue-200'
                }`}>
                  {alert.severity} Priority
                </span>

                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{alert.date}</span>
                </div>
              </div>

              {/* Title & Disease */}
              <h3 className="text-base font-bold text-slate-900">
                {alert.title}
              </h3>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-700 mt-1 mb-3">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{alert.region}</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {alert.summary}
              </p>

              {/* Actionable precautions preview */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Mandated Public Precautions:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {alert.precautions.slice(0, 2).map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer with Source & Expand */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-medium truncate max-w-[200px]">
                Authority: {alert.source}
              </span>
              <button
                onClick={() => setActiveAlertDetail(alert)}
                className="font-bold text-teal-600 hover:text-teal-800 flex items-center gap-1"
              >
                <span>Read Full Directive</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Alert Detail Modal */}
      {activeAlertDetail && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            
            <div className={`p-6 text-white ${
              activeAlertDetail.severity === 'Critical' ? 'bg-rose-700' :
              activeAlertDetail.severity === 'Warning' ? 'bg-amber-700' : 'bg-slate-900'
            }`}>
              <button
                onClick={() => setActiveAlertDetail(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-white/20">
                  {activeAlertDetail.severity} Directive
                </span>
                <span className="text-xs text-white/80">{activeAlertDetail.date}</span>
              </div>
              <h2 className="text-xl font-bold text-white">{activeAlertDetail.title}</h2>
              <p className="text-xs text-white/80 mt-1">📍 {activeAlertDetail.region}</p>
            </div>

            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Official Public Health Advisory Context
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  {activeAlertDetail.summary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Mandated Prevention & Protection Protocol
                </h4>
                <ul className="space-y-2.5">
                  {activeAlertDetail.precautions.map((prec, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs text-slate-700 bg-teal-50/50 p-3 rounded-xl border border-teal-100">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{prec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                <strong>Issuing Authority:</strong> {activeAlertDetail.source}
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveAlertDetail(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Close Directive
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
