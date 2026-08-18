import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  PhoneCall, 
  Clock, 
  Search, 
  ShieldCheck, 
  Filter, 
  CheckCircle2, 
  Sparkles,
  ExternalLink,
  Bot,
  AlertCircle
} from 'lucide-react';
import { HEALTH_FACILITIES, HealthFacility } from '../data/facilities';

interface HealthFacilitiesSectionProps {
  onAskAi: (prompt: string) => void;
  onOpenEmergency: () => void;
}

export const HealthFacilitiesSection: React.FC<HealthFacilitiesSectionProps> = ({
  onAskAi,
  onOpenEmergency
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [only24x7, setOnly24x7] = useState(false);

  const facilityTypes = [
    'All',
    'Primary Health Centre (PHC)',
    'Community Health Centre (CHC)',
    'District Government Hospital',
    'TB DOTS & Molecular Lab',
    'Vector Testing Centre'
  ];

  const filteredFacilities = HEALTH_FACILITIES.filter(fac => {
    const matchesSearch = 
      fac.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fac.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fac.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fac.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = selectedType === 'All' || fac.type === selectedType;
    const matchesEmergency = !only24x7 || fac.isEmergency24x7;

    return matchesSearch && matchesType && matchesEmergency;
  });

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6" id="health-facilities-root">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Building2 className="w-4 h-4" />
            <span>Public Healthcare Infrastructure</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Verified Government Health Facilities
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Locate Primary Health Centres (PHCs), District Hospitals, TB Ni-kshay DOTS Centres, and Vector Testing Labs offering free government diagnostics and essential care.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenEmergency}
            className="px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 transition flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>National Helplines (108 / 1075)</span>
          </button>
        </div>
      </div>

      {/* Free Services Highlight Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-900 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-teal-300" />
          </div>
          <div>
            <h4 className="text-sm font-bold">100% Free Essential Care at Government Facilities</h4>
            <p className="text-xs text-slate-300">
              Free Dengue NS1 & Malaria testing, free 6-month TB DOTS medications, free child vaccines under UIP.
            </p>
          </div>
        </div>
        <div className="text-xs font-semibold text-teal-300 bg-teal-950/60 px-3 py-1.5 rounded-xl border border-teal-800 shrink-0 text-center">
          National Health Mission (NHM) Protocol
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by city (e.g. Noida, Mumbai), disease test (e.g. Dengue, TB, Malaria), or facility name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition"
            />
          </div>

          <button
            onClick={() => setOnly24x7(!only24x7)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
              only24x7 
                ? 'bg-rose-50 border-rose-300 text-rose-800 ring-2 ring-rose-500/20' 
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>24x7 Emergency Only</span>
          </button>
        </div>

        {/* Type Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-bold text-[11px] mr-1 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Facility Type:
          </span>
          {facilityTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition text-xs ${
                selectedType === type
                  ? 'bg-teal-600 text-white shadow-2xs font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Facilities Cards Grid */}
      {filteredFacilities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredFacilities.map((fac) => (
            <div
              key={fac.id}
              className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 hover:border-teal-300 shadow-xs hover:shadow-md transition space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                    fac.isEmergency24x7
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-teal-50 text-teal-700 border-teal-200'
                  }`}>
                    {fac.type}
                  </span>

                  {fac.isEmergency24x7 && (
                    <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[9px] font-bold">
                      24x7 Casualty
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base text-slate-900 leading-snug">
                  {fac.name}
                </h3>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{fac.address}, <strong>{fac.city}, {fac.state}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{fac.timing}</span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-teal-800 font-bold">
                    <PhoneCall className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{fac.helpline}</span>
                  </div>
                </div>

                {/* Services List */}
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Key Free Public Health Services:
                  </div>
                  <div className="space-y-1">
                    {fac.services.map((srv, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{srv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <a
                  href={`tel:${fac.helpline.split('/')[0].trim()}`}
                  className="flex-1 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 text-xs font-bold transition flex items-center justify-center gap-1.5 border border-teal-200"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-teal-700" />
                  <span>Call Facility</span>
                </a>

                <button
                  onClick={() => onAskAi(`Tell me about the free diagnostic and treatment services available at government health facility: ${fac.name} (${fac.type}) in ${fac.city}.`)}
                  className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition flex items-center gap-1 shrink-0"
                  title="Ask AI Assistant about this facility"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Ask AI</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-3">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Facilities Match Your Filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search keywords or switching the facility type filter to "All".
          </p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedType('All'); setOnly24x7(false); }}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
