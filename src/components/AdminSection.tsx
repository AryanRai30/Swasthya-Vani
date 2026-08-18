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
  Sparkles,
  HelpCircle,
  Search,
  Filter,
  Check,
  Building2,
  AlertCircle,
  Lock,
  ArrowRight
} from 'lucide-react';
import { HealthAlert, Disease, UserProfile } from '../types';
import { DISEASES_DATA } from '../data/diseases';

interface AdminSectionProps {
  alerts: HealthAlert[];
  user?: UserProfile | null;
  onAddAlert: (newAlert: HealthAlert) => void;
  onToggleAlertStatus: (id: string) => void;
  onSwitchToAdmin?: () => void;
  onReturnHome?: () => void;
}

export const AdminSection: React.FC<AdminSectionProps> = ({
  alerts,
  user,
  onAddAlert,
  onToggleAlertStatus,
  onSwitchToAdmin,
  onReturnHome
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'analytics' | 'alerts' | 'knowledge' | 'faqs' | 'queries'>('analytics');
  
  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Health Alert Management
  const [alertList, setAlertList] = useState<HealthAlert[]>(alerts);
  const [isCreatingAlert, setIsCreatingAlert] = useState(false);
  const [editingAlertId, setEditingAlertId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDisease, setNewDisease] = useState('Dengue & Chikungunya');
  const [newSeverity, setNewSeverity] = useState<HealthAlert['severity']>('Warning');
  const [newRegion, setNewRegion] = useState('Northern & Western States');
  const [newSummary, setNewSummary] = useState('');
  const [newPrecautions, setNewPrecautions] = useState('1. Observe Sunday Dry Day to clear standing water.\n2. Apply mosquito repellent cream during daylight hours.\n3. Avoid self-medicating with Aspirin or Brufen.');

  // Knowledge base list state
  const [diseaseList, setDiseaseList] = useState<Disease[]>(DISEASES_DATA);
  const [diseaseSearch, setDiseaseSearch] = useState('');
  const [isAddingDisease, setIsAddingDisease] = useState(false);
  const [editingDiseaseId, setEditingDiseaseId] = useState<string | null>(null);

  // Disease Form state
  const [dName, setDName] = useState('');
  const [dHindiName, setDHindiName] = useState('');
  const [dCategory, setDCategory] = useState<Disease['category']>('Vector-Borne');
  const [dSummary, setDSummary] = useState('');
  const [dEarlySymptoms, setDEarlySymptoms] = useState('High fever, Intense headache, Joint pain');
  const [dSevereSymptoms, setDSevereSymptoms] = useState('Severe abdominal pain, Persistent vomiting, Bleeding');
  const [dPrevention, setDPrevention] = useState('Eliminate stagnant water, Wear protective clothing, Use repellents');
  const [dWarningSigns, setDWarningSigns] = useState('Extreme lethargy, Bleeding gums, Platelets below 50,000');
  const [dSources, setDSources] = useState('WHO Guidelines, ICMR Protocol, MoHFW National Guidelines');

  // FAQs management state
  const [faqList, setFaqList] = useState<{ id: string; disease: string; question: string; answer: string }[]>([
    {
      id: 'faq-1',
      disease: 'Dengue',
      question: 'Why should Aspirin and Brufen NEVER be taken during suspected Dengue?',
      answer: 'Dengue causes temporary suppression of bone marrow and platelet drop. NSAIDs like Aspirin, Ibuprofen, and Brufen act as anti-platelet blood thinners, dangerously escalating internal gastric hemorrhage risk.'
    },
    {
      id: 'faq-2',
      disease: 'Tuberculosis',
      question: 'Is TB treatment completely free in all Government hospitals in India?',
      answer: 'Yes. Under the National Tuberculosis Elimination Program (NTEP), all sputum tests (CBNAAT) and 6-month Fixed-Dose Combination (FDC) medicines are 100% free, plus patients receive ₹500/month nutritional support (Ni-kshay Poshan Yojana).'
    },
    {
      id: 'faq-3',
      disease: 'Rabies',
      question: 'What is the immediate first-aid step after a dog or animal bite?',
      answer: 'Immediately wash the bite wound with running tap water and alkaline soap continuously for 15 minutes. Do NOT apply chili powder, lime, or bandage. Immediately visit a hospital for Anti-Rabies Vaccine (ARV) and Immunoglobulin (RIG).'
    },
    {
      id: 'faq-4',
      disease: 'Malaria',
      question: 'What is the difference between Dengue mosquito and Malaria mosquito?',
      answer: 'Dengue is transmitted by female Aedes mosquitoes that bite predominantly during daylight hours and breed in clean stored water. Malaria is transmitted by female Anopheles mosquitoes that bite mainly from dusk to dawn.'
    }
  ]);
  const [isAddingFaq, setIsAddingFaq] = useState(false);
  const [newFaqDisease, setNewFaqDisease] = useState('Dengue');
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');

  // Sample analytics stats
  const stats = {
    totalUsers: '48,290',
    totalQueries: '134,812',
    activeAlerts: alertList.filter(a => a.active).length,
    totalDiseases: diseaseList.length,
    aiSatisfaction: '98.8%',
    topDiseases: [
      { name: 'Dengue Fever', queries: 41200, percent: 32 },
      { name: 'Malaria (P. vivax / P. falciparum)', queries: 28400, percent: 22 },
      { name: 'Tuberculosis (NTEP)', queries: 23100, percent: 18 },
      { name: 'Typhoid (Enteric Fever)', queries: 19500, percent: 15 },
      { name: 'Rabies & Post-Exposure Prophylaxis', queries: 12600, percent: 13 }
    ],
    symptomTrends: [
      { symptom: 'High Fever & Retro-orbital Eye Pain', percentage: 38 },
      { symptom: 'Chronic Cough Exceeding 2 Weeks', percentage: 24 },
      { symptom: 'Acute Watery Diarrhea & Dehydration', percentage: 19 },
      { symptom: 'Severe Joint Inflammation & Rash', percentage: 19 }
    ]
  };

  // Alert Creation / Update Handler
  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newSummary) return;

    if (editingAlertId) {
      // Update existing
      const updated = alertList.map(a => a.id === editingAlertId ? {
        ...a,
        title: newTitle,
        disease: newDisease,
        severity: newSeverity,
        region: newRegion,
        summary: newSummary,
        precautions: newPrecautions.split('\n').filter(p => p.trim().length > 0)
      } : a);
      setAlertList(updated);
      setEditingAlertId(null);
      showToast(`Health Advisory "${newTitle}" successfully updated.`);
    } else {
      // Create new
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
      setAlertList([alertObj, ...alertList]);
      showToast(`New Public Health Advisory broadcasted to citizen portal.`);
    }

    setIsCreatingAlert(false);
    setNewTitle('');
    setNewSummary('');
  };

  const handleEditAlert = (al: HealthAlert) => {
    setEditingAlertId(al.id);
    setNewTitle(al.title);
    setNewDisease(al.disease);
    setNewSeverity(al.severity);
    setNewRegion(al.region);
    setNewSummary(al.summary);
    setNewPrecautions(al.precautions.join('\n'));
    setIsCreatingAlert(true);
  };

  const handleDeleteAlert = (id: string) => {
    setAlertList(alertList.filter(a => a.id !== id));
    showToast('Health alert removed from surveillance registry.');
  };

  // Disease Creation / Update Handler
  const handleDiseaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dName || !dSummary) return;

    if (editingDiseaseId) {
      // Update existing disease
      const updated = diseaseList.map(d => d.id === editingDiseaseId ? {
        ...d,
        name: dName,
        hindiName: dHindiName || d.hindiName,
        category: dCategory,
        summary: dSummary,
        earlySymptoms: dEarlySymptoms.split(',').map(s => s.trim()),
        severeSymptoms: dSevereSymptoms.split(',').map(s => s.trim()),
        prevention: dPrevention.split(',').map(s => s.trim()),
        warningSigns: dWarningSigns.split(',').map(s => s.trim()),
        sources: dSources.split(',').map(s => s.trim())
      } : d);
      setDiseaseList(updated);
      setEditingDiseaseId(null);
      showToast(`Disease profile "${dName}" updated in knowledgebase.`);
    } else {
      // Add new disease
      const newObj: Disease = {
        id: `disease-${Date.now()}`,
        name: dName,
        hindiName: dHindiName,
        category: dCategory,
        summary: dSummary,
        causes: ['Etiological pathogen under national surveillance'],
        transmission: ['Direct droplet contact, vector transmission, or contaminated water'],
        earlySymptoms: dEarlySymptoms.split(',').map(s => s.trim()),
        severeSymptoms: dSevereSymptoms.split(',').map(s => s.trim()),
        riskFactors: ['High density population', 'Immunocompromised individuals'],
        warningSigns: dWarningSigns.split(',').map(s => s.trim()),
        whenToSeekMedicalHelp: ['Symptoms persisting beyond 48 hours or red flags observed'],
        prevention: dPrevention.split(',').map(s => s.trim()),
        vaccinationAvailable: false,
        faqs: [{ question: 'Is this condition treatable?', answer: 'Yes, with timely professional clinical care at Primary Health Centres.' }],
        mythsVsFacts: [],
        sources: dSources.split(',').map(s => s.trim()),
        riskLevel: 'Moderate',
        endemicRegions: 'Regional endemic belts in India',
        iconName: 'Activity'
      };
      setDiseaseList([newObj, ...diseaseList]);
      showToast(`New disease "${dName}" added to verified knowledge registry.`);
    }

    setIsAddingDisease(false);
    resetDiseaseForm();
  };

  const handleEditDisease = (d: Disease) => {
    setEditingDiseaseId(d.id);
    setDName(d.name);
    setDHindiName(d.hindiName || '');
    setDCategory(d.category);
    setDSummary(d.summary);
    setDEarlySymptoms(d.earlySymptoms.join(', '));
    setDSevereSymptoms(d.severeSymptoms.join(', '));
    setDPrevention(d.prevention.join(', '));
    setDWarningSigns(d.warningSigns.join(', '));
    setDSources(d.sources.join(', '));
    setIsAddingDisease(true);
  };

  const handleDeleteDisease = (id: string) => {
    setDiseaseList(diseaseList.filter(d => d.id !== id));
    showToast('Disease record removed from clinical index.');
  };

  const resetDiseaseForm = () => {
    setEditingDiseaseId(null);
    setDName('');
    setDHindiName('');
    setDSummary('');
    setDEarlySymptoms('High fever, Intense headache, Joint pain');
    setDSevereSymptoms('Severe abdominal pain, Persistent vomiting, Bleeding');
    setDPrevention('Eliminate stagnant water, Wear protective clothing, Use repellents');
    setDWarningSigns('Extreme lethargy, Bleeding gums, Platelets below 50,000');
    setDSources('WHO Guidelines, ICMR Protocol, MoHFW National Guidelines');
  };

  // FAQ Add Handler
  const handleFaqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaqQ || !newFaqA) return;

    const newFaq = {
      id: `faq-${Date.now()}`,
      disease: newFaqDisease,
      question: newFaqQ,
      answer: newFaqA
    };

    setFaqList([newFaq, ...faqList]);
    setIsAddingFaq(false);
    setNewFaqQ('');
    setNewFaqA('');
    showToast('Public Health FAQ published.');
  };

  const handleDeleteFaq = (id: string) => {
    setFaqList(faqList.filter(f => f.id !== id));
    showToast('FAQ deleted.');
  };

  const handleExportReport = () => {
    const reportData = {
      project: 'SwasthyaVani Public Health Platform',
      exportTime: new Date().toISOString(),
      surveillanceMetrics: stats,
      activeAdvisories: alertList,
      indexedKnowledgeBaseCount: diseaseList.length,
      faqsCount: faqList.length,
      protocolCompliance: '100% Verified (WHO/ICMR/MoHFW Grounded)'
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SwasthyaVani-PublicHealth-Report-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    showToast('Surveillance audit report exported as JSON.');
  };

  // Security Gate: Ensure only ADMIN or Epidemiologist roles can access
  if (user?.role !== 'ADMIN') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6" id="admin-security-gate">
        <div className="w-16 h-16 rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600 shadow-sm">
          <Lock className="w-8 h-8" />
        </div>
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 inline-block mb-3">
            Protected Health Authority Portal
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Restricted Surveillance Access
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-lg mx-auto">
            The Public Health Administration & Surveillance Portal is reserved for State Epidemiologists, District Surveillance Officers (IDSP), and Ministry Officials.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 text-left max-w-md mx-auto space-y-3 shadow-xs">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Current Session:</span>
            <span className="font-bold text-slate-800">{user?.name || 'Anonymous Visitor'} ({user?.role || 'GUEST'})</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Required Privilege:</span>
            <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">ADMIN / HEALTH_OFFICER</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {onSwitchToAdmin && (
            <button
              onClick={onSwitchToAdmin}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Login with Demo Epidemiologist ID</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
          {onReturnHome && (
            <button
              onClick={onReturnHome}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
            >
              Return to Public Portal
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="admin-portal-root">
      
      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white text-xs font-semibold shadow-2xl flex items-center gap-3 border border-teal-500/30 animate-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Public Health Nodal Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Surveillance & Knowledge Administration
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Monitor real-time citizen triage queries, broadcast verified outbreak health advisories, and curate the clinical disease knowledge base.
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
          { id: 'alerts', label: `📢 Outbreak Advisories (${alertList.length})` },
          { id: 'knowledge', label: `📚 Disease Knowledgebase (${diseaseList.length})` },
          { id: 'faqs', label: `❓ Public Health FAQs (${faqList.length})` },
          { id: 'queries', label: '💬 Citizen Query Logs & Safety' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as any)}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition whitespace-nowrap ${
              activeAdminTab === tab.id
                ? 'border-teal-600 text-teal-700 bg-teal-50/50'
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
              <p className="text-[11px] text-teal-600 font-medium mt-1">99.8% Safety adherence</p>
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
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-0.5">Indexed Diseases</div>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">WHO / ICMR grounded</p>
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
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Live Public Health Advisories ({alertList.length})
              </h3>
              <p className="text-xs text-slate-500">
                Verified administrative alerts broadcast to all citizen dashboards.
              </p>
            </div>
            <button
              onClick={() => {
                setEditingAlertId(null);
                setNewTitle('');
                setNewSummary('');
                setIsCreatingAlert(true);
              }}
              className="px-4 py-2 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Broadcast New Advisory</span>
            </button>
          </div>

          {/* New / Edit Alert Form Drawer */}
          {isCreatingAlert && (
            <form onSubmit={handleAlertSubmit} className="p-6 rounded-3xl bg-teal-50/70 border border-teal-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-teal-950">
                  {editingAlertId ? 'Edit Health Advisory' : 'Publish New Outbreak Advisory'}
                </h4>
                <button type="button" onClick={() => setIsCreatingAlert(false)} className="text-teal-400 hover:text-teal-700">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Advisory Headline</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Monsoon Vector-Borne Advisory: Dengue Spike"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Severity Level</label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900"
                  >
                    <option value="Critical">🔴 Critical Alert</option>
                    <option value="Warning">🟡 Warning Notice</option>
                    <option value="Advisory">🔵 Advisory Bulletin</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Disease / Vector Condition</label>
                  <input
                    type="text"
                    value={newDisease}
                    onChange={(e) => setNewDisease(e.target.value)}
                    placeholder="e.g. Dengue & Chikungunya"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Affected Geographical Region</label>
                  <input
                    type="text"
                    value={newRegion}
                    onChange={(e) => setNewRegion(e.target.value)}
                    placeholder="e.g. Northern States (Delhi-NCR, UP, Punjab)"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Epidemiological Summary</label>
                <textarea
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  rows={2}
                  placeholder="Context on recent clinical cases, vector density, or transmission triggers..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Citizen Precautions (One per line)</label>
                <textarea
                  value={newPrecautions}
                  onChange={(e) => setNewPrecautions(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingAlert(false)}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs"
                >
                  {editingAlertId ? 'Update Advisory' : 'Broadcast to Portal'}
                </button>
              </div>
            </form>
          )}

          {/* List of Alerts */}
          <div className="space-y-3">
            {alertList.map((al) => (
              <div key={al.id} className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      al.severity === 'Critical' ? 'bg-rose-100 text-rose-800' :
                      al.severity === 'Warning' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {al.severity}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{al.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500">
                    📍 {al.region} • Disease: <strong>{al.disease}</strong> • Date: {al.date}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-1">{al.summary}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      const updated = alertList.map(a => a.id === al.id ? { ...a, active: !a.active } : a);
                      setAlertList(updated);
                      onToggleAlertStatus(al.id);
                      showToast(`Advisory status toggled to ${!al.active ? 'Active' : 'Archived'}.`);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      al.active 
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {al.active ? '🟢 Active' : '⚪ Archived'}
                  </button>

                  <button
                    onClick={() => handleEditAlert(al)}
                    className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition"
                    title="Edit Alert"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDeleteAlert(al.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                    title="Delete Alert"
                  >
                    <Trash2 className="w-4 h-4" />
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
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Disease Clinical Knowledge Documents ({diseaseList.length})
              </h3>
              <p className="text-xs text-slate-500">
                Ground truth disease profiles used by the RAG search and AI triage engine.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search diseases..."
                  value={diseaseSearch}
                  onChange={(e) => setDiseaseSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white"
                />
              </div>

              <button
                onClick={() => {
                  resetDiseaseForm();
                  setIsAddingDisease(true);
                }}
                className="px-4 py-2 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-xs shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Disease Guide</span>
              </button>
            </div>
          </div>

          {/* Add / Edit Disease Form Drawer */}
          {isAddingDisease && (
            <form onSubmit={handleDiseaseSubmit} className="p-6 rounded-3xl bg-teal-50/70 border border-teal-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-teal-950">
                  {editingDiseaseId ? 'Edit Clinical Disease Profile' : 'Add New Disease to RAG Knowledgebase'}
                </h4>
                <button type="button" onClick={() => setIsAddingDisease(false)} className="text-teal-400 hover:text-teal-700">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Disease Name (English)</label>
                  <input
                    type="text"
                    value={dName}
                    onChange={(e) => setDName(e.target.value)}
                    placeholder="e.g. Japanese Encephalitis"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Name in Hindi (हिन्दी)</label>
                  <input
                    type="text"
                    value={dHindiName}
                    onChange={(e) => setDHindiName(e.target.value)}
                    placeholder="e.g. जापानी एन्सेफलाइटिस"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={dCategory}
                    onChange={(e) => setDCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold"
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
                  value={dSummary}
                  onChange={(e) => setDSummary(e.target.value)}
                  rows={2}
                  placeholder="Overview of epidemiology, etiology, and clinical significance..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Early Symptoms (Comma separated)</label>
                  <input
                    type="text"
                    value={dEarlySymptoms}
                    onChange={(e) => setDEarlySymptoms(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Severe Symptoms / Red Flags</label>
                  <input
                    type="text"
                    value={dSevereSymptoms}
                    onChange={(e) => setDSevereSymptoms(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Prevention Guidelines</label>
                  <input
                    type="text"
                    value={dPrevention}
                    onChange={(e) => setDPrevention(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Verified Sources (WHO/ICMR/MoHFW)</label>
                  <input
                    type="text"
                    value={dSources}
                    onChange={(e) => setDSources(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
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
                  {editingDiseaseId ? 'Update Knowledge Record' : 'Save to Knowledgebase'}
                </button>
              </div>
            </form>
          )}

          {/* List of Diseases */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {diseaseList
              .filter(d => !diseaseSearch || d.name.toLowerCase().includes(diseaseSearch.toLowerCase()) || d.category.toLowerCase().includes(diseaseSearch.toLowerCase()))
              .map((d) => (
                <div key={d.id} className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between gap-3 shadow-2xs hover:border-teal-300 transition">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        {d.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        Ref: {d.id.toUpperCase()}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {d.name} {d.hindiName && <span className="text-slate-500 font-normal text-xs">({d.hindiName})</span>}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2">{d.summary}</p>
                    
                    <div className="pt-2 text-[11px] text-teal-800 space-y-1">
                      <div><strong>Early:</strong> {d.earlySymptoms.slice(0, 3).join(', ')}</div>
                      <div><strong>Sources:</strong> {d.sources.slice(0, 2).join(' • ')}</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEditDisease(d)}
                      className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-800 text-xs font-semibold flex items-center gap-1 transition"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteDisease(d.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                      title="Delete disease record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
          </div>

        </div>
      )}

      {/* TAB 4: FAQS MANAGEMENT */}
      {activeAdminTab === 'faqs' && (
        <div className="space-y-6 animate-in fade-in">
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Public Health FAQs & Awareness Content ({faqList.length})
              </h3>
              <p className="text-xs text-slate-500">
                Curated question and answer pairs for community health education and misconception busting.
              </p>
            </div>
            <button
              onClick={() => setIsAddingFaq(true)}
              className="px-4 py-2 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add New FAQ</span>
            </button>
          </div>

          {/* New FAQ Form */}
          {isAddingFaq && (
            <form onSubmit={handleFaqSubmit} className="p-6 rounded-3xl bg-teal-50/70 border border-teal-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-teal-950">Add Public Health FAQ</h4>
                <button type="button" onClick={() => setIsAddingFaq(false)} className="text-teal-400 hover:text-teal-700">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Disease / Topic</label>
                  <input
                    type="text"
                    value={newFaqDisease}
                    onChange={(e) => setNewFaqDisease(e.target.value)}
                    placeholder="e.g. Dengue Fever"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Question</label>
                  <input
                    type="text"
                    value={newFaqQ}
                    onChange={(e) => setNewFaqQ(e.target.value)}
                    placeholder="e.g. What are the common myths about TB transmission?"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Verified Clinical Answer</label>
                <textarea
                  value={newFaqA}
                  onChange={(e) => setNewFaqA(e.target.value)}
                  rows={3}
                  placeholder="Accurate, jargon-free answer referencing government guidelines..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs"
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingFaq(false)}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs"
                >
                  Publish FAQ
                </button>
              </div>
            </form>
          )}

          {/* List of FAQs */}
          <div className="space-y-3">
            {faqList.map((faq) => (
              <div key={faq.id} className="p-5 rounded-3xl bg-white border border-slate-200 space-y-2 shadow-2xs">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800">
                      {faq.disease}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{faq.question}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>

                  <button
                    onClick={() => handleDeleteFaq(faq.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition shrink-0"
                    title="Delete FAQ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 5: CITIZEN QUERY LOGS & AI SAFETY AUDIT */}
      {activeAdminTab === 'queries' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Bot className="w-4 h-4 text-teal-600" />
              Recent AI Chatbot Interactions & Triage Audit
            </h3>
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Verified Safe (No Diagnostic Prescriptions)
            </span>
          </div>

          <div className="space-y-3">
            {[
              { query: 'What are early symptoms of Dengue?', time: '2 mins ago', lang: 'English', rating: '5★ Helpful', safe: true },
              { query: 'Dog bite on leg without bleeding what to do?', time: '8 mins ago', lang: 'English', rating: 'Emergency Escalated', safe: true },
              { query: 'टीबी का इलाज क्या सरकारी अस्पताल में फ्री है?', time: '15 mins ago', lang: 'Hindi', rating: '5★ Helpful', safe: true },
              { query: 'How to prepare home ORS for diarrhea in child?', time: '22 mins ago', lang: 'English', rating: '5★ Helpful', safe: true },
              { query: 'High BP headache warning signs', time: '34 mins ago', lang: 'English', rating: '5★ Helpful', safe: true },
              { query: 'Can I take aspirin for dengue fever?', time: '45 mins ago', lang: 'English', rating: 'Safe Caution Refusal', safe: true },
              { query: 'क्या मलेरिया में ठंड लगकर तेज बुखार आता है?', time: '52 mins ago', lang: 'Hindi', rating: '5★ Helpful', safe: true }
            ].map((log, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs hover:bg-slate-100/70 transition">
                <div className="space-y-1">
                  <p className="font-semibold text-slate-800">"{log.query}"</p>
                  <p className="text-[11px] text-slate-500">{log.time} • Language: <strong>{log.lang}</strong></p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800">
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
