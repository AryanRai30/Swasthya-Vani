import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Bot, 
  BookOpen, 
  AlertTriangle, 
  Plus, 
  Download, 
  CheckCircle2, 
  Activity, 
  TrendingUp, 
  Trash2, 
  Edit, 
  Save, 
  X,
  FileText,
  Radio,
  Sparkles
} from 'lucide-react';
import { HealthAlert, Disease } from '../types';
import { DISEASES_DATA } from '../data/diseases';

interface AdminSectionProps {
  alerts: HealthAlert[];
  onAddAlert: (newAlert: HealthAlert) => void;
  onToggleAlertStatus: (id: string) => void;
}

export const AdminSection: React.FC<AdminSectionProps> = ({
  alerts,
  onAddAlert,
  onToggleAlertStatus
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'analytics' | 'alerts' | 'knowledge' | 'queries'>('analytics');
  
  // New Alert Form state
  const [isCreatingAlert, setIsCreatingAlert] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDisease, setNewDisease] = useState('Dengue');
  const [newSeverity, setNewSeverity] = useState<HealthAlert['severity']>('Warning');
  const [newRegion, setNewRegion] = useState('Pan-India');
  const [newSummary, setNewSummary] = useState('');
  const [newPrecautions, setNewPrecautions] = useState('1. Empty standing water coolers weekly.\n2. Use mosquito repellent creams.\n3. Avoid self-medicating with NSAIDs.');

  // Knowledge base list state
  const [diseaseList, setDiseaseList] = useState<Disease[]>(DISEASES_DATA);
  const [isAddingDisease, setIsAddingDisease] = useState(false);
  const [newDiseaseName, setNewDiseaseName] = useState('');
  const [newDiseaseCat, setNewDiseaseCat] = useState<Disease['category']>('Vector-Borne');
  const [newDiseaseSummary, setNewDiseaseSummary] = useState('');

  // Sample analytics stats
  const stats = {
    totalUsers: '48,290',
    totalQueries: '134,812',
    activeAlerts: alerts.filter(a => a.active).length,
    totalDiseases: diseaseList.length,
    aiSatisfaction: '98.6%',
    topDiseases: [
      { name: 'Dengue Fever', queries: 41200, percent: 32 },
      { name: 'Malaria', queries: 28400, percent: 22 },
      { name: 'Tuberculosis', queries: 23100, percent: 18 },
      { name: 'Typhoid', queries: 19500, percent: 15 },
      { name: 'Rabies Emergency', queries: 12600, percent: 13 }
    ],
    symptomTrends: [
      { symptom: 'High Fever & Chills', percentage: 38 },
      { symptom: 'Persistent Cough > 2 Weeks', percentage: 24 },
      { symptom: 'Acute Watery Diarrhea', percentage: 19 },
      { symptom: 'Severe Joint / Eye Pain', percentage: 19 }
    ]
  };

  const handleCreateAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newSummary) return;

    const alertObj: HealthAlert = {
      id: `alert-${Date.now()}`,
      title: newTitle,
      disease: newDisease,
      severity: newSeverity,
      region: newRegion,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      source: 'State Public Health Surveillance Cell & MoHFW',
      summary: newSummary,
      precautions: newPrecautions.split('\n').filter(p => p.trim().length > 0),
      active: true
    };

    onAddAlert(alertObj);
    setIsCreatingAlert(false);
    setNewTitle('');
    setNewSummary('');
  };

  const handleAddDiseaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiseaseName || !newDiseaseSummary) return;

    const newObj: Disease = {
      id: `disease-${Date.now()}`,
      name: newDiseaseName,
      category: newDiseaseCat,
      summary: newDiseaseSummary,
      causes: ['Pathogen or environmental factors under investigation'],
      transmission: ['Direct droplet transmission or vector contact'],
      earlySymptoms: ['Fever', 'Body aches', 'Fatigue'],
      severeSymptoms: ['High fever', 'Respiratory distress'],
      riskFactors: ['Immunocompromised individuals', 'Elderly population'],
      warningSigns: ['Severe breathlessness', 'Chest pain'],
      whenToSeekMedicalHelp: ['Persistent symptoms exceeding 48 hours'],
      prevention: ['Maintain hygiene', 'Seek early doctor consultation'],
      vaccinationAvailable: false,
      faqs: [{ question: 'Is this treatable?', answer: 'Yes, with prompt clinical medical care.' }],
      mythsVsFacts: [],
      sources: ['National Public Health Surveillance Protocol'],
      riskLevel: 'Moderate',
      endemicRegions: 'Regional clusters',
      iconName: 'Activity'
    };

    setDiseaseList([newObj, ...diseaseList]);
    setIsAddingDisease(false);
    setNewDiseaseName('');
    setNewDiseaseSummary('');
  };

  const handleExportReport = () => {
    const reportData = {
      project: 'SwasthyaVani Public Health Platform',
      exportTime: new Date().toISOString(),
      metrics: stats,
      activeAdvisories: alerts,
      knowledgeBaseCount: diseaseList.length
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SwasthyaVani-Health-Report-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8" id="admin-portal-root">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Public Health Nodal Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Surveillance & Knowledge Administration
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Monitor real-time citizen triage queries, broadcast outbreak health advisories, and curate the clinical knowledge base.
          </p>
        </div>

        <button
          onClick={handleExportReport}
          className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition flex items-center gap-2 shrink-0 shadow-xs"
        >
          <Download className="w-4 h-4" />
          <span>Export Surveillance Report</span>
        </button>
      </div>

      {/* Admin Subtabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto scrollbar-none">
        {[
          { id: 'analytics', label: '📊 Surveillance Analytics' },
          { id: 'alerts', label: `📢 Outbreak Advisories (${alerts.length})` },
          { id: 'knowledge', label: `📚 Disease Knowledgebase (${diseaseList.length})` },
          { id: 'queries', label: '💬 Citizen Query Logs & Safety' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as any)}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition whitespace-nowrap ${
              activeAdminTab === tab.id
                ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: SURVEILLANCE ANALYTICS */}
      {activeAdminTab === 'analytics' && (
        <div className="space-y-8 animate-in fade-in">
          
          {/* 4 Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">{stats.totalUsers}</div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-0.5">Citizen Reach</div>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">↑ +14.2% this week</p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                <Bot className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">{stats.totalQueries}</div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-0.5">Chatbot Triage Queries</div>
              <p className="text-[11px] text-teal-600 font-medium mt-1">99.4% Protocol adherence</p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">{stats.activeAlerts} Active</div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-0.5">Outbreak Bulletins</div>
              <p className="text-[11px] text-amber-600 font-medium mt-1">Monitored 24/7</p>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">{stats.totalDiseases} Verified</div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-0.5">Diseases Documented</div>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">WHO / ICMR indexed</p>
            </div>
          </div>

          {/* Charts & Trends Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Top Searched Conditions */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-teal-600" />
                  Most Queried Conditions (Epidemic Surveillance)
                </h3>
                <span className="text-xs text-slate-400">Past 30 Days</span>
              </div>

              <div className="space-y-3">
                {stats.topDiseases.map((d, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>{d.name}</span>
                      <span>{d.queries.toLocaleString()} queries ({d.percent}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-teal-600 h-full rounded-full"
                        style={{ width: `${d.percent * 2.5}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Symptom Frequency Distribution */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-600" />
                  Chief Complaint Symptom Distribution
                </h3>
                <span className="text-xs text-slate-400">Triage Ticker</span>
              </div>

              <div className="space-y-3">
                {stats.symptomTrends.map((s, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>{s.symptom}</span>
                      <span>{s.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-indigo-600 h-full rounded-full"
                        style={{ width: `${s.percentage * 2.2}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: OUTBREAK ADVISORIES MANAGER */}
      {activeAdminTab === 'alerts' && (
        <div className="space-y-6 animate-in fade-in">
          
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Live Public Health Alerts ({alerts.length})
            </h3>
            <button
              onClick={() => setIsCreatingAlert(true)}
              className="px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Broadcast New Advisory</span>
            </button>
          </div>

          {/* New Alert Form Modal / Drawer */}
          {isCreatingAlert && (
            <form onSubmit={handleCreateAlertSubmit} className="p-6 rounded-3xl bg-indigo-50/70 border border-indigo-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-indigo-950">Publish New Health Advisory</h4>
                <button type="button" onClick={() => setIsCreatingAlert(false)} className="text-indigo-400 hover:text-indigo-700">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Advisory Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Seasonal Monsoon Dengue Surge Alert"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Severity</label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold"
                  >
                    <option value="Critical">Critical (Red)</option>
                    <option value="Warning">Warning (Amber)</option>
                    <option value="Advisory">Advisory (Blue)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Affected Region(s)</label>
                <input
                  type="text"
                  value={newRegion}
                  onChange={(e) => setNewRegion(e.target.value)}
                  placeholder="e.g. Northern & Western Districts"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Summary / Context</label>
                <textarea
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  rows={2}
                  placeholder="Brief epidemiological context and reason for alert..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Precaution Bullet Points (One per line)</label>
                <textarea
                  value={newPrecautions}
                  onChange={(e) => setNewPrecautions(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingAlert(false)}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
                >
                  Publish to Citizen App
                </button>
              </div>
            </form>
          )}

          {/* List of Alerts */}
          <div className="space-y-3">
            {alerts.map((al) => (
              <div key={al.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                      al.severity === 'Critical' ? 'bg-rose-100 text-rose-800' :
                      al.severity === 'Warning' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {al.severity}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{al.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    📍 {al.region} • Issued: {al.date}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onToggleAlertStatus(al.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                      al.active 
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {al.active ? 'Active' : 'Archived'}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 3: KNOWLEDGEBASE MANAGER */}
      {activeAdminTab === 'knowledge' && (
        <div className="space-y-6 animate-in fade-in">
          
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Disease Clinical Library Articles ({diseaseList.length})
            </h3>
            <button
              onClick={() => setIsAddingDisease(true)}
              className="px-4 py-2 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Disease Guide</span>
            </button>
          </div>

          {/* Add Disease Form */}
          {isAddingDisease && (
            <form onSubmit={handleAddDiseaseSubmit} className="p-6 rounded-3xl bg-teal-50/70 border border-teal-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-teal-950">Add Disease Guide</h4>
                <button type="button" onClick={() => setIsAddingDisease(false)} className="text-teal-400 hover:text-teal-700">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Disease Name</label>
                  <input
                    type="text"
                    value={newDiseaseName}
                    onChange={(e) => setNewDiseaseName(e.target.value)}
                    placeholder="e.g. Japanese Encephalitis"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newDiseaseCat}
                    onChange={(e) => setNewDiseaseCat(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                  >
                    <option value="Vector-Borne">Vector-Borne</option>
                    <option value="Water & Foodborne">Water & Foodborne</option>
                    <option value="Respiratory & Airborne">Respiratory & Airborne</option>
                    <option value="Chronic & Lifestyle">Chronic & Lifestyle</option>
                    <option value="Viral & Zoonotic">Viral & Zoonotic</option>
                    <option value="Nutritional & Deficiency">Nutritional & Deficiency</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Clinical Summary</label>
                <textarea
                  value={newDiseaseSummary}
                  onChange={(e) => setNewDiseaseSummary(e.target.value)}
                  rows={2}
                  placeholder="Overview of nature, etiology, and clinical presentation..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingDisease(false)}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs"
                >
                  Save to Library
                </button>
              </div>
            </form>
          )}

          {/* List of Diseases */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {diseaseList.map((d) => (
              <div key={d.id} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start justify-between gap-3 shadow-2xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {d.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{d.name}</h4>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{d.summary}</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-800 shrink-0">
                  {d.riskLevel}
                </span>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 4: CITIZEN QUERY LOGS & AI SAFETY */}
      {activeAdminTab === 'queries' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Bot className="w-4 h-4 text-teal-600" />
              Recent AI Chatbot Interactions & Triage Audit
            </h3>
            <span className="text-xs text-emerald-600 font-bold">100% Verified Safe</span>
          </div>

          <div className="space-y-3">
            {[
              { query: 'What are early symptoms of Dengue?', time: '2 mins ago', lang: 'English', rating: '5★ Helpful', safe: true },
              { query: 'Dog bite on leg without bleeding what to do?', time: '8 mins ago', lang: 'English', rating: 'Emergency Escalated', safe: true },
              { query: 'टीबी का इलाज क्या सरकारी अस्पताल में फ्री है?', time: '15 mins ago', lang: 'Hindi', rating: '5★ Helpful', safe: true },
              { query: 'How to prepare home ORS for diarrhea in child?', time: '22 mins ago', lang: 'English', rating: '5★ Helpful', safe: true },
              { query: 'High BP headache warning signs', time: '34 mins ago', lang: 'English', rating: '5★ Helpful', safe: true }
            ].map((log, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <p className="font-semibold text-slate-800">"{log.query}"</p>
                  <p className="text-[11px] text-slate-400">{log.time} • Language: {log.lang}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800">
                    {log.rating}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
