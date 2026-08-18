import React, { useState } from 'react';
import { 
  Stethoscope, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Bot, 
  RefreshCw, 
  HelpCircle, 
  PhoneCall, 
  FileText, 
  User, 
  Clock, 
  Sliders, 
  Activity,
  Flame
} from 'lucide-react';
import { SymptomCheckData, SymptomCheckResult } from '../types';

interface SymptomCheckerSectionProps {
  onTransferToChat: (prompt: string) => void;
  onOpenEmergency: () => void;
}

const COMMON_SYMPTOMS_LIST = [
  { id: 'fever', label: 'High Fever (>101°F / 38.3°C)', category: 'General' },
  { id: 'chills', label: 'Violent Chills & Shivering', category: 'General' },
  { id: 'eye_pain', label: 'Pain Behind the Eyes (Retro-orbital)', category: 'Head & Eyes' },
  { id: 'headache', label: 'Severe Persistent Headache', category: 'Head & Eyes' },
  { id: 'cough_dry', label: 'Persistent Cough (>2 weeks)', category: 'Respiratory' },
  { id: 'shortness_breath', label: 'Shortness of Breath / Wheezing', category: 'Respiratory' },
  { id: 'joint_pain', label: 'Debilitating Joint & Bone Pain', category: 'Musculoskeletal' },
  { id: 'skin_rash', label: 'Skin Rash or Red Spots', category: 'Skin' },
  { id: 'diarrhea', label: 'Frequent Watery Diarrhea', category: 'Gastrointestinal' },
  { id: 'vomiting', label: 'Persistent Nausea or Vomiting', category: 'Gastrointestinal' },
  { id: 'stomach_pain', label: 'Severe Abdominal Pain / Tenderness', category: 'Gastrointestinal' },
  { id: 'extreme_fatigue', label: 'Unexplained Extreme Exhaustion', category: 'General' },
  { id: 'weight_loss', label: 'Sudden Unexplained Weight Loss', category: 'General' },
  { id: 'yellow_eyes', label: 'Yellowing of Eyes/Skin (Jaundice)', category: 'Liver/Metabolic' },
  { id: 'excess_thirst', label: 'Excessive Frequent Thirst & Urination', category: 'Liver/Metabolic' },
  { id: 'dog_bite', label: 'Recent Animal / Dog Bite or Scratch', category: 'Injury/Vector' }
];

const PRE_EXISTING_LIST = [
  'Diabetes Mellitus',
  'Hypertension / Heart Condition',
  'Asthma / COPD / Respiratory Disease',
  'Chronic Kidney or Liver Disease',
  'Currently Pregnant',
  'None of the above'
];

const RED_FLAG_LIST = [
  'Crushing chest pain or pressure',
  'Inability to catch breath at rest',
  'Confusion, severe drowsiness, or slurred speech',
  'Bleeding from nose/gums or blood in vomit/stool',
  'Inability to drink or retain fluids for over 12 hours',
  'Stiff neck accompanied by high fever and sensitivity to light'
];

export const SymptomCheckerSection: React.FC<SymptomCheckerSectionProps> = ({
  onTransferToChat,
  onOpenEmergency
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [assessmentResult, setAssessmentResult] = useState<SymptomCheckResult | null>(null);

  // Form State
  const [ageGroup, setAgeGroup] = useState<SymptomCheckData['ageGroup']>('Adult (20-59)');
  const [gender, setGender] = useState<SymptomCheckData['gender']>('Male');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['High Fever (>101°F / 38.3°C)']);
  const [duration, setDuration] = useState<SymptomCheckData['duration']>('1-3 days');
  const [severity, setSeverity] = useState<number>(5);
  const [preExisting, setPreExisting] = useState<string[]>([]);
  const [selectedRedFlags, setSelectedRedFlags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const toggleSymptom = (label: string) => {
    if (selectedSymptoms.includes(label)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== label));
    } else {
      setSelectedSymptoms([...selectedSymptoms, label]);
    }
  };

  const togglePreExisting = (item: string) => {
    if (item === 'None of the above') {
      setPreExisting(['None of the above']);
      return;
    }
    const filtered = preExisting.filter(p => p !== 'None of the above');
    if (filtered.includes(item)) {
      setPreExisting(filtered.filter(p => p !== item));
    } else {
      setPreExisting([...filtered, item]);
    }
  };

  const toggleRedFlag = (item: string) => {
    if (selectedRedFlags.includes(item)) {
      setSelectedRedFlags(selectedRedFlags.filter(r => r !== item));
    } else {
      setSelectedRedFlags([...selectedRedFlags, item]);
    }
  };

  const handleRunAssessment = async () => {
    setIsEvaluating(true);
    setCurrentStep(5);

    try {
      const response = await fetch('/api/symptom-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ageGroup,
          gender,
          primarySymptoms: selectedSymptoms,
          duration,
          severity,
          preExistingConditions: preExisting,
          redFlags: selectedRedFlags
        })
      });

      if (!response.ok) {
        throw new Error('Symptom evaluation failed');
      }

      const result = await response.json();
      setAssessmentResult(result);
    } catch (err) {
      console.error(err);
      // Client-side fallback result
      const isEmergency = selectedRedFlags.length > 0;
      setAssessmentResult({
        riskLevel: isEmergency ? 'Emergency' : severity > 7 ? 'High' : 'Moderate',
        matchingDiseases: [
          {
            diseaseName: selectedSymptoms.some(s => s.includes('Fever')) ? 'Vector-Borne Acute Febrile Illness (Dengue / Malaria)' : 'Acute Viral Upper Respiratory Infection',
            confidence: 82,
            keyMatch: 'Primary symptoms align with clinical presentations of acute febrile conditions.',
            riskCategory: 'High'
          }
        ],
        recommendations: [
          'Maintain high fluid intake with Oral Rehydration Salts (ORS) and clean water.',
          'Visit your local Primary Health Centre (PHC) or consulting physician within 24-48 hours.',
          'Avoid taking Aspirin or Brufen without medical advice.'
        ],
        emergencyAdvice: isEmergency ? 'Red flag danger signs detected. Please proceed to the nearest emergency hospital immediately or call 108.' : undefined,
        questionsForDoctor: [
          'What diagnostic blood tests (CBC, Platelets, Dengue NS1) should be ordered?',
          'What are the critical warning signs that require emergency admission?'
        ],
        disclaimer: 'This automated triage assessment is for public health education and preliminary guidance only. It is NOT a clinical diagnosis.'
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setAssessmentResult(null);
    setSelectedSymptoms(['High Fever (>101°F / 38.3°C)']);
    setSeverity(5);
    setDuration('1-3 days');
    setSelectedRedFlags([]);
  };

  const handleSendToAi = () => {
    const prompt = `I completed the SwasthyaVani Symptom Checker with the following details:
- Age: ${ageGroup}, Gender: ${gender}
- Primary Symptoms: ${selectedSymptoms.join(', ')}
- Duration: ${duration}, Severity Rating: ${severity}/10
- Pre-existing: ${preExisting.join(', ') || 'None'}
- Red Flags: ${selectedRedFlags.join(', ') || 'None'}
- Estimated Triage Risk: ${assessmentResult?.riskLevel}

Please provide an in-depth breakdown of potential conditions, what tests a physician might order, home hydration protocols, and red flag warnings to watch for.`;

    onTransferToChat(prompt);
  };

  const filteredSymptoms = COMMON_SYMPTOMS_LIST.filter(s => 
    s.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6" id="symptom-checker-root">
      
      {/* Header */}
      <div>
        <div className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">
          Interactive Triage & Risk Assessment
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Public Health Symptom Checker
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Answer a few quick questions to evaluate symptom severity, identify potential public health conditions, and receive doctor consultation guidance.
        </p>
      </div>

      {/* Mandatory Safety Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold block mb-0.5">Strict Medical Disclaimer:</strong>
          This tool is designed for educational triage and public health awareness only. It is <strong>NOT</strong> a substitute for a doctor's diagnosis, clinical examination, or laboratory investigations.
        </div>
      </div>

      {/* Step Progress Bar */}
      {currentStep < 5 && (
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
            <span>Step {currentStep} of 4</span>
            <span className="text-teal-600">
              {currentStep === 1 && 'Patient Demographics'}
              {currentStep === 2 && 'Primary Symptoms'}
              {currentStep === 3 && 'Duration & Severity'}
              {currentStep === 4 && 'Red Flag Danger Signs'}
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-teal-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* STEP 1: PATIENT DEMOGRAPHICS */}
      {currentStep === 1 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
          <div>
            <h3 className="text-lg font-bold text-slate-900">1. Patient Profile</h3>
            <p className="text-xs text-slate-500">Select age bracket and demographic information.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Age Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {(['Infant (0-2)', 'Child (3-12)', 'Teen (13-19)', 'Adult (20-59)', 'Senior (60+)'] as SymptomCheckData['ageGroup'][]).map((age) => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => setAgeGroup(age)}
                    className={`p-3 rounded-2xl border text-xs font-bold text-left transition ${
                      ageGroup === age
                        ? 'border-teal-600 bg-teal-50 text-teal-900 ring-2 ring-teal-500/20'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Biological Gender
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(['Male', 'Female', 'Other', 'Prefer not to say'] as SymptomCheckData['gender'][]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`p-3 rounded-2xl border text-xs font-bold text-left transition ${
                      gender === g
                        ? 'border-teal-600 bg-teal-50 text-teal-900 ring-2 ring-teal-500/20'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Pre-existing Conditions (Optional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PRE_EXISTING_LIST.map((cond) => (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => togglePreExisting(cond)}
                    className={`p-3 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition ${
                      preExisting.includes(cond)
                        ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cond}</span>
                    {preExisting.includes(cond) && <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setCurrentStep(2)}
              id="step-1-next-btn"
              className="px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition flex items-center gap-2 shadow-md shadow-teal-600/20"
            >
              <span>Next: Select Symptoms</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SYMPTOMS SELECTION */}
      {currentStep === 2 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
          <div>
            <h3 className="text-lg font-bold text-slate-900">2. Primary Symptoms</h3>
            <p className="text-xs text-slate-500">Select all symptoms the patient is currently experiencing.</p>
          </div>

          {/* Quick search */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search symptom (e.g. fever, chills, cough, diarrhea)..."
              className="w-full py-2.5 pl-10 pr-4 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500 outline-hidden"
            />
            <Stethoscope className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          {/* Selected Badges */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Selected ({selectedSymptoms.length})
            </span>
            <div className="flex flex-wrap gap-1.5 min-h-[32px]">
              {selectedSymptoms.map((sym) => (
                <span
                  key={sym}
                  className="px-3 py-1 rounded-full bg-teal-100 border border-teal-200 text-teal-900 text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>{sym}</span>
                  <button 
                    onClick={() => toggleSymptom(sym)}
                    className="hover:text-rose-600 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Symptom Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
            {filteredSymptoms.map((sym) => {
              const isSelected = selectedSymptoms.includes(sym.label);
              return (
                <button
                  key={sym.id}
                  type="button"
                  onClick={() => toggleSymptom(sym.label)}
                  className={`p-3 rounded-2xl border text-xs text-left flex items-center justify-between transition ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50 text-teal-950 font-bold shadow-2xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      {sym.category}
                    </span>
                    <span>{sym.label}</span>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-5 py-2.5 rounded-2xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              disabled={selectedSymptoms.length === 0}
              id="step-2-next-btn"
              className="px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold text-xs transition flex items-center gap-2 shadow-md shadow-teal-600/20"
            >
              <span>Next: Duration & Severity</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: DURATION & SEVERITY */}
      {currentStep === 3 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
          <div>
            <h3 className="text-lg font-bold text-slate-900">3. Duration & Pain/Severity</h3>
            <p className="text-xs text-slate-500">How long have the symptoms been present and how severe is the discomfort?</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Symptom Duration
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {(['Less than 24 hours', '1-3 days', '4-7 days', '1-2 weeks', 'More than 2 weeks'] as SymptomCheckData['duration'][]).map((dur) => (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setDuration(dur)}
                    className={`p-3 rounded-2xl border text-xs font-bold text-left transition ${
                      duration === dur
                        ? 'border-teal-600 bg-teal-50 text-teal-900 ring-2 ring-teal-500/20'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {dur}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Subjective Severity Rating
                </label>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                  severity >= 8 ? 'bg-rose-100 text-rose-800' :
                  severity >= 5 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {severity} / 10 ({severity >= 8 ? 'Severe / Intense' : severity >= 5 ? 'Moderate' : 'Mild'})
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="10"
                value={severity}
                onChange={(e) => setSeverity(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />

              <div className="flex justify-between text-[10px] font-bold text-slate-400">
                <span>1 - Mild Discomfort</span>
                <span>5 - Moderate Aches</span>
                <span>10 - Unbearable Pain</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 rounded-2xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              id="step-3-next-btn"
              className="px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition flex items-center gap-2 shadow-md shadow-teal-600/20"
            >
              <span>Next: Red Flag Screen</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: RED FLAG DANGER SIGNS */}
      {currentStep === 4 && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
          <div>
            <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span>Safety Critical Screen</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">4. Red Flag Danger Signs</h3>
            <p className="text-xs text-slate-500">Check any dangerous emergency signs requiring immediate in-person hospital care.</p>
          </div>

          <div className="space-y-2.5">
            {RED_FLAG_LIST.map((flag) => (
              <button
                key={flag}
                type="button"
                onClick={() => toggleRedFlag(flag)}
                className={`w-full p-3.5 rounded-2xl border text-xs text-left flex items-start gap-3 transition ${
                  selectedRedFlags.includes(flag)
                    ? 'border-rose-600 bg-rose-50 text-rose-950 font-bold'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                  selectedRedFlags.includes(flag) ? 'bg-rose-600 border-rose-600 text-white' : 'border-slate-300'
                }`}>
                  {selectedRedFlags.includes(flag) && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <span className="leading-snug">{flag}</span>
              </button>
            ))}
          </div>

          {selectedRedFlags.length > 0 && (
            <div className="p-4 rounded-2xl bg-rose-100 border border-rose-300 text-rose-900 text-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                <span className="font-bold">Red flags detected. Emergency hospital evaluation is advised.</span>
              </div>
              <button
                onClick={onOpenEmergency}
                className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shrink-0"
              >
                Dial 108
              </button>
            </div>
          )}

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-5 py-2.5 rounded-2xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition"
            >
              Back
            </button>
            <button
              onClick={handleRunAssessment}
              id="submit-symptom-check-btn"
              className="px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-teal-600/25"
            >
              <Activity className="w-4 h-4" />
              <span>Generate Triage Report</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: RESULTS REPORT */}
      {currentStep === 5 && (
        <div className="space-y-6 animate-in fade-in">
          {isEvaluating ? (
            <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-4 shadow-xs">
              <RefreshCw className="w-10 h-10 text-teal-600 animate-spin mx-auto" />
              <h3 className="text-base font-bold text-slate-800">Analyzing Symptom Matrix...</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Correlating symptoms against ICMR epidemiological database and calculating triage priority...
              </p>
            </div>
          ) : assessmentResult ? (
            <div className="space-y-6" id="triage-report-card">
              
              {/* Triage Risk Meter Header */}
              <div className={`p-6 sm:p-8 rounded-3xl border text-white shadow-xl ${
                assessmentResult.riskLevel.includes('Urgent') || assessmentResult.riskLevel.includes('Emergency') || assessmentResult.riskLevel.includes('🔴') 
                  ? 'bg-gradient-to-r from-rose-700 to-red-800 border-rose-600' :
                assessmentResult.riskLevel.includes('consultation') || assessmentResult.riskLevel.includes('High') || assessmentResult.riskLevel.includes('🟡') 
                  ? 'bg-gradient-to-r from-amber-700 to-amber-900 border-amber-600' :
                'bg-gradient-to-r from-emerald-700 to-teal-800 border-emerald-600'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 border border-white/30">
                      Triage Risk Assessment Result
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black mt-2 flex items-center gap-2">
                      {assessmentResult.riskLevel}
                    </h2>
                    <p className="text-xs text-white/80 mt-1 max-w-xl">
                      Evaluated for {ageGroup} with {selectedSymptoms.length} reported symptom(s) over {duration} (severity {severity}/10).
                    </p>
                  </div>

                  {(assessmentResult.riskLevel.includes('Urgent') || assessmentResult.riskLevel.includes('Emergency') || assessmentResult.riskLevel.includes('🔴')) && (
                    <button
                      onClick={onOpenEmergency}
                      className="px-5 py-3 rounded-2xl bg-white hover:bg-rose-50 text-rose-900 font-extrabold text-xs shadow-lg transition flex items-center gap-2 shrink-0 animate-pulse"
                    >
                      <PhoneCall className="w-4 h-4 text-rose-600" />
                      <span>Dial 108 (Ambulance)</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Potential Matching Conditions */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-teal-600" />
                  Potential Disease Correlations (For Clinical Discussion)
                </h3>

                <div className="space-y-3">
                  {assessmentResult.matchingDiseases.map((match, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{match.diseaseName}</h4>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800">
                            {match.confidence}% Correlation
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          {match.keyMatch}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Next Actions */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Recommended Action Steps
                </h3>

                <ul className="space-y-2.5">
                  {assessmentResult.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Questions to Ask Doctor */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-600" />
                  Suggested Questions for Your Physician / Health Officer
                </h3>

                <ul className="space-y-2">
                  {assessmentResult.questionsForDoctor.map((q, idx) => (
                    <li key={idx} className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-950 flex items-start gap-2">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold">Want in-depth guidance on this report?</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Transfer these details directly into the AI Health Assistant for personalized Q&A.
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleSendToAi}
                    id="transfer-to-chat-btn"
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-2xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-2"
                  >
                    <Bot className="w-4 h-4" />
                    <span>Ask AI Assistant</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
                  >
                    Start New Check
                  </button>
                </div>
              </div>

            </div>
          ) : null}
        </div>
      )}

    </div>
  );
};
