import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Bot, 
  Share2, 
  Bookmark, 
  BookmarkCheck, 
  X, 
  ArrowRight,
  ExternalLink,
  Info
} from 'lucide-react';
import { DISEASES_DATA, DISEASE_CATEGORIES } from '../data/diseases';
import { Disease, DiseaseCategory } from '../types';

interface DiseaseLibrarySectionProps {
  selectedDiseaseId?: string | null;
  onAskAi: (prompt: string) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
}

export const DiseaseLibrarySection: React.FC<DiseaseLibrarySectionProps> = ({
  selectedDiseaseId,
  onAskAi,
  bookmarkedIds,
  onToggleBookmark
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DiseaseCategory>('All');
  const [activeModalDisease, setActiveModalDisease] = useState<Disease | null>(
    selectedDiseaseId ? (DISEASES_DATA.find(d => d.id === selectedDiseaseId) || null) : null
  );
  const [activeDetailTab, setActiveDetailTab] = useState<'overview' | 'symptoms' | 'risk-prevention' | 'clinical-guidance' | 'faqs' | 'myths'>('overview');

  // Filter diseases based on search and category
  const filteredDiseases = DISEASES_DATA.filter((disease) => {
    const matchesCategory = selectedCategory === 'All' || disease.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesName = disease.name.toLowerCase().includes(query);
    const matchesHindi = disease.hindiName?.toLowerCase().includes(query);
    const matchesScientific = disease.scientificName?.toLowerCase().includes(query);
    const matchesSummary = disease.summary.toLowerCase().includes(query);
    const matchesSymptoms = disease.earlySymptoms.some(s => s.toLowerCase().includes(query)) ||
                            disease.severeSymptoms.some(s => s.toLowerCase().includes(query));

    return matchesCategory && (matchesName || matchesHindi || matchesScientific || matchesSummary || matchesSymptoms);
  });

  const handleOpenDetail = (disease: Disease) => {
    setActiveModalDisease(disease);
    setActiveDetailTab('overview');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8" id="disease-library-root">
      
      {/* Header & Search */}
      <div className="space-y-4">
        <div>
          <div className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">
            Clinical Public Health Knowledgebase
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            National Communicable & Chronic Disease Library
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            Explore comprehensive clinical guides, transmission vectors, early detection criteria, government vaccination schedules, and debunked public health myths.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <input
            type="text"
            id="disease-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by disease name (e.g. Dengue, TB), symptoms (e.g. fever, joint pain, cough), or Hindi terms..."
            className="w-full py-3.5 pl-11 pr-4 rounded-2xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-xs placeholder:text-slate-400"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3.5 text-xs text-slate-400 hover:text-slate-600 font-semibold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
              selectedCategory === 'All'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            All Conditions ({DISEASES_DATA.length})
          </button>
          {DISEASE_CATEGORIES.map((cat) => {
            const count = DISEASES_DATA.filter(d => d.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Disease Cards Grid */}
      {filteredDiseases.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No matching diseases found</h3>
          <p className="text-xs text-slate-500">
            Try searching for another symptom or switch category filter to "All Conditions".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiseases.map((disease) => {
            const isBookmarked = bookmarkedIds.includes(disease.id);
            return (
              <div
                key={disease.id}
                id={`disease-card-${disease.id}`}
                className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-lg transition-all flex flex-col justify-between group relative"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 group-hover:bg-teal-50 group-hover:text-teal-800 transition">
                      {disease.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                        disease.riskLevel === 'Severe' ? 'bg-rose-100 text-rose-800' :
                        disease.riskLevel === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {disease.riskLevel} Risk
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(disease.id);
                        }}
                        className="p-1 text-slate-400 hover:text-teal-600 rounded-lg transition"
                        title={isBookmarked ? 'Remove Bookmark' : 'Save Bookmark'}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-4 h-4 text-teal-600" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Title & Scientific */}
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-teal-700 transition">
                    {disease.name}
                  </h3>
                  {disease.hindiName && (
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">{disease.hindiName}</p>
                  )}
                  {disease.scientificName && (
                    <p className="text-[11px] italic text-slate-400 mt-0.5">{disease.scientificName}</p>
                  )}

                  {/* Summary */}
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-3">
                    {disease.summary}
                  </p>

                  {/* Early Symptoms Snippet */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Common Early Indicators:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {disease.earlySymptoms.slice(0, 3).map((sym, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-[10px] text-slate-700 truncate max-w-full">
                          • {sym.split(':')[0]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleOpenDetail(disease)}
                    id={`view-guide-btn-${disease.id}`}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onAskAi(`Explain in detail the prevention, warning signs, and management for ${disease.name}.`)}
                    className="p-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 transition"
                    title="Ask AI Assistant about this condition"
                  >
                    <Bot className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Disease Detail Modal */}
      {activeModalDisease && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8" id="disease-detail-modal">
            
            {/* Modal Header */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white relative">
              <button
                onClick={() => setActiveModalDisease(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  {activeModalDisease.category}
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {activeModalDisease.riskLevel} Public Health Priority
                </span>
                {activeModalDisease.vaccinationAvailable && (
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Vaccine Preventable
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {activeModalDisease.name}
              </h2>
              {activeModalDisease.hindiName && (
                <p className="text-sm text-teal-300 font-medium">{activeModalDisease.hindiName}</p>
              )}
              {activeModalDisease.scientificName && (
                <p className="text-xs italic text-slate-400">{activeModalDisease.scientificName}</p>
              )}
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 px-6 bg-slate-50 border-b border-slate-200 overflow-x-auto scrollbar-none">
              {[
                { id: 'overview', label: 'Overview & Causes' },
                { id: 'symptoms', label: 'Symptoms Spectrum' },
                { id: 'risk-prevention', label: 'Risk Factors & Prevention' },
                { id: 'clinical-guidance', label: '⚠️ When to Seek Help & Red Flags' },
                { id: 'faqs', label: 'FAQs' },
                { id: 'myths', label: 'Myths vs Facts' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveDetailTab(tab.id as any)}
                  className={`py-3 px-4 text-xs font-bold border-b-2 transition whitespace-nowrap ${
                    activeDetailTab === tab.id
                      ? 'border-teal-600 text-teal-700 bg-white'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6">
              
              {/* TAB 1: OVERVIEW & CAUSES */}
              {activeDetailTab === 'overview' && (
                <div className="space-y-6 animate-in fade-in">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Clinical Description & Summary
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      {activeModalDisease.summary}
                    </p>
                  </div>

                  {activeModalDisease.causes && activeModalDisease.causes.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Etiology & Biological Causes
                      </h4>
                      <ul className="space-y-2">
                        {activeModalDisease.causes.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-teal-50/40 p-2.5 rounded-xl border border-teal-100">
                            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Transmission Modes & Vectors
                    </h4>
                    <ul className="space-y-2">
                      {activeModalDisease.transmission.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Endemic Region & Seasonality in India
                    </h4>
                    <p className="text-xs text-slate-600 bg-teal-50/50 p-3 rounded-xl border border-teal-100">
                      📍 {activeModalDisease.endemicRegions}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: SYMPTOMS SPECTRUM */}
              {activeDetailTab === 'symptoms' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                      <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wide">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>Common / Early Symptoms</span>
                      </div>
                      <ul className="space-y-2 text-xs text-amber-950">
                        {activeModalDisease.earlySymptoms.map((sym, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-600 font-bold">•</span>
                            <span>{sym}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
                      <div className="flex items-center gap-2 text-rose-900 font-bold text-xs uppercase tracking-wide">
                        <ShieldAlert className="w-4 h-4 text-rose-600" />
                        <span>Severe / Complicated Symptoms</span>
                      </div>
                      <ul className="space-y-2 text-xs text-rose-950">
                        {activeModalDisease.severeSymptoms.map((sym, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-rose-600 font-bold">•</span>
                            <span>{sym}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 3: RISK FACTORS & PREVENTION */}
              {activeDetailTab === 'risk-prevention' && (
                <div className="space-y-6 animate-in fade-in">
                  
                  {activeModalDisease.riskFactors && activeModalDisease.riskFactors.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                        Risk Factors & High-Risk Vulnerable Groups
                      </h4>
                      <ul className="space-y-2">
                        {activeModalDisease.riskFactors.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-xs text-slate-700 bg-amber-50/40 p-3 rounded-xl border border-amber-100">
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeModalDisease.vaccineDetails && (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                      <div className="flex items-center gap-2 font-bold text-xs text-emerald-900">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Universal Immunization & Vaccination Info</span>
                      </div>
                      <p className="text-xs text-emerald-900 leading-relaxed">
                        {activeModalDisease.vaccineDetails}
                      </p>
                    </div>
                  )}

                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Verified Preventative Actions & Hygiene Measures
                    </h4>
                    <ul className="space-y-2.5">
                      {activeModalDisease.prevention.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              )}

              {/* TAB 4: WHEN TO SEEK HELP & RED FLAGS */}
              {activeDetailTab === 'clinical-guidance' && (
                <div className="space-y-6 animate-in fade-in">
                  
                  {/* When to Seek Help */}
                  {activeModalDisease.whenToSeekMedicalHelp && activeModalDisease.whenToSeekMedicalHelp.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                        When Professional Medical Help Should Be Sought
                      </h4>
                      <ul className="space-y-2">
                        {activeModalDisease.whenToSeekMedicalHelp.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-xs text-slate-800 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Immediate Emergency Red Flags */}
                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950">
                      <div className="flex items-center gap-2 font-bold text-sm text-rose-900 mb-1">
                        <AlertTriangle className="w-5 h-5 text-rose-600" />
                        <span>Immediate Critical Red Flags (Emergency Admission)</span>
                      </div>
                      <p className="text-xs text-rose-900">
                        If the patient develops ANY of the following signs, proceed to the nearest emergency hospital casualty department or call <strong>108 / 112</strong> immediately.
                      </p>
                    </div>

                    <div className="space-y-2">
                      {activeModalDisease.warningSigns.map((warn, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-white border border-rose-200 text-xs font-bold text-rose-900 flex items-center gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0" />
                          <span>{warn}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 5: FAQS */}
              {activeDetailTab === 'faqs' && (
                <div className="space-y-4 animate-in fade-in">
                  {activeModalDisease.faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-teal-600 shrink-0" />
                        <span>{faq.question}</span>
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed pl-6">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 6: MYTHS VS FACTS */}
              {activeDetailTab === 'myths' && (
                <div className="space-y-4 animate-in fade-in">
                  {activeModalDisease.mythsVsFacts.map((item, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="text-xs text-rose-800 font-bold bg-rose-100/70 p-2.5 rounded-xl border border-rose-200 flex items-start gap-2">
                        <span className="font-extrabold uppercase shrink-0">MYTH:</span>
                        <span>"{item.myth}"</span>
                      </div>
                      <div className="text-xs text-emerald-900 font-bold bg-emerald-100/70 p-2.5 rounded-xl border border-emerald-200 flex items-start gap-2">
                        <span className="font-extrabold uppercase shrink-0">FACT:</span>
                        <span>{item.fact}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 italic pl-1">
                        <strong>Public Health Context:</strong> {item.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Authoritative Sources Attribution Block */}
              {activeModalDisease.sources && activeModalDisease.sources.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    <span>Verified Public Health Knowledge Sources:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 pl-1">
                    {activeModalDisease.sources.map((src, idx) => (
                      <li key={idx}>{src}</li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-[11px] text-slate-500">
                Educational awareness guide only • Not a medical prescription
              </p>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    const dName = activeModalDisease.name;
                    setActiveModalDisease(null);
                    onAskAi(`I want to learn more about ${dName}. What should I know about symptoms, tests, and home care?`);
                  }}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5"
                >
                  <Bot className="w-4 h-4" />
                  <span>Ask AI Assistant about this</span>
                </button>
                <button
                  onClick={() => setActiveModalDisease(null)}
                  className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs transition"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
