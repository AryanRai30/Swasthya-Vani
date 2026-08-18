export type DiseaseCategory = 
  | 'All'
  | 'Vector-Borne'
  | 'Water & Foodborne'
  | 'Respiratory & Airborne'
  | 'Chronic & Lifestyle'
  | 'Viral & Zoonotic'
  | 'Nutritional & Deficiency';

export type AlertSeverity = 'Critical' | 'Warning' | 'Advisory';

export interface FAQ {
  question: string;
  answer: string;
}

export interface MythFact {
  myth: string;
  fact: string;
  explanation: string;
}

export interface Disease {
  id: string;
  name: string;
  hindiName?: string;
  scientificName?: string;
  category: DiseaseCategory;
  summary: string;
  causes: string[];
  transmission: string[];
  earlySymptoms: string[];
  severeSymptoms: string[];
  riskFactors: string[];
  prevention: string[];
  warningSigns: string[]; // Immediate emergency red flags
  whenToSeekMedicalHelp: string[]; // Clinical triggers for in-person consultation
  faqs: FAQ[];
  mythsVsFacts: MythFact[];
  sources: string[]; // Official public health reference sources (WHO, ICMR, MoHFW, CDC)
  whoReference?: string;
  vaccinationAvailable: boolean;
  vaccineDetails?: string;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Severe';
  endemicRegions: string;
  iconName: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: string;
  sources?: string[];
  warningLevel?: 'normal' | 'caution' | 'emergency';
  language?: string;
  suggestedQuestions?: string[];
}

export interface HealthAlert {
  id: string;
  title: string;
  disease: string;
  severity: AlertSeverity;
  region: string;
  date: string;
  source: string;
  summary: string;
  precautions: string[];
  active: boolean;
}

export interface SymptomCheckData {
  ageGroup: 'Infant (0-2)' | 'Child (3-12)' | 'Teen (13-19)' | 'Adult (20-59)' | 'Senior (60+)';
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  isPregnant?: boolean;
  primarySymptoms: string[];
  duration: 'Less than 24 hours' | '1-3 days' | '4-7 days' | '1-2 weeks' | 'More than 2 weeks';
  severity: number; // 1 to 10
  preExistingConditions: string[];
  redFlags: string[];
}

export interface DiseaseMatch {
  diseaseName: string;
  confidence: number; // percentage 0-100
  keyMatch: string;
  riskCategory: 'Low' | 'Moderate' | 'High' | 'Severe';
}

export interface SymptomCheckResult {
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Emergency';
  matchingDiseases: DiseaseMatch[];
  recommendations: string[];
  emergencyAdvice?: string;
  questionsForDoctor: string[];
  disclaimer: string;
}

export type UserRole = 'USER' | 'ADMIN';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  preferredLanguage: string;
  bookmarkedDiseaseIds: string[];
  savedAssessmentsCount: number;
}
