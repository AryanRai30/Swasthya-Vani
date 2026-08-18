import { DISEASES_DATA } from '../data/diseases';
import { Disease } from '../types';

export interface EmergencyCheckResult {
  isEmergency: boolean;
  emergencyType?: string;
  emergencyText: string;
}

export interface PromptInjectionResult {
  isInjection: boolean;
  safeResponse?: string;
}

export interface RAGRetrievalResult {
  found: boolean;
  matchedDisease?: string;
  matchedHindiName?: string;
  relevanceScore: number;
  extractedContext: string;
  sources: string[];
  knowledgeBaseRef: string;
}

/**
 * Detects acute life-threatening emergencies from query text.
 * When detected, emergency triage takes absolute precedence.
 */
export function detectEmergencyRedFlags(userQuery: string, language: string = 'en'): EmergencyCheckResult {
  const query = userQuery.toLowerCase().trim();
  const isHindi = language.toLowerCase().includes('hi') || /[\u0900-\u097F]/.test(userQuery);

  // 1. Severe Respiratory Distress
  if (
    query.includes('severe breathing difficulty') || 
    query.includes('cannot breathe') || 
    query.includes('cant breathe') || 
    query.includes('gasping for air') || 
    query.includes('shortness of breath at rest') ||
    query.includes('choking') ||
    query.includes('blue lips') ||
    query.includes('saans nahi aa rahi') ||
    query.includes('सांस लेने में भारी तकलीफ') ||
    query.includes('सांस नहीं आ रही')
  ) {
    return {
      isEmergency: true,
      emergencyType: 'Severe Respiratory Distress',
      emergencyText: isHindi
        ? `### 🚨 आपातकालीन चेतावनी: सांस लेने में गंभीर कठिनाई (Severe Breathlessness)

**⚠️ तत्काल कदम (Emergency Action Required):**
सांस लेने में गंभीर कठिनाई एक अत्यंत गंभीर और जीवन के लिए खतरनाक चिकित्सीय आपात स्थिति है। 

1. **तुरंत एम्बुलेंस बुलाएं:** बिना किसी देरी के राष्ट्रीय आपातकालीन नंबर **108** या **112** पर कॉल करें या तुरंत नजदीकी अस्पताल के आपातकालीन कक्ष (Casualty/ER) में जाएं।
2. **मरीज की स्थिति:** मरीज को सीधा बैठाएं (Upright sitting position), कपड़े ढीले करें, और हवादार कमरे में रखें।
3. **स्व-दवा न लें:** किसी भी अनधिकृत घरेलू उपचार या स्व-दवा में समय बर्बाद न करें।

**चिकित्सा अस्वीकरण (Medical Disclaimer):**
*यह एक आपातकालीन जन स्वास्थ्य चेतावनी है और यह चिकित्सीय निदान नहीं है।*`
        : `### 🚨 EMERGENCY RED-FLAG: Severe Difficulty Breathing

**⚠️ IMMEDIATE EMERGENCY ACTION REQUIRED:**
Severe breathlessness or inability to breathe is a critical, potentially life-threatening medical emergency.

1. **Call Emergency Services Immediately:** Dial **108** or **112** for an ambulance right away, or proceed immediately to the nearest hospital Emergency Department (Casualty/ICU).
2. **Immediate Positioning:** Keep the person in an upright, seated position to ease airflow. Loosen tight clothing around the neck and chest. Ensure fresh air circulation.
3. **Do Not Delay:** Do not attempt home remedies or wait for symptoms to pass. Immediate supplemental oxygen and clinical stabilization are required.

**Medical Disclaimer:**
*This is an immediate public health emergency alert and does not constitute a clinical diagnosis.*`
    };
  }

  // 2. Severe Chest Pain / Myocardial Infarction signs
  if (
    query.includes('severe chest pain') || 
    query.includes('crushing chest') || 
    query.includes('chest pressure radiating') || 
    query.includes('heart attack') ||
    query.includes('seene me tej dard') ||
    query.includes('सीने में तेज दर्द')
  ) {
    return {
      isEmergency: true,
      emergencyType: 'Acute Chest Pain / Cardiac Emergency',
      emergencyText: isHindi
        ? `### 🚨 आपातकालीन चेतावनी: सीने में तेज दर्द (Acute Chest Pain)

**⚠️ तत्काल कदम (Immediate Emergency Action):**
सीने में तेज दबाव, जकड़न या दर्द जो बाएं हाथ, जबड़े या पीठ तक फैल रहा हो, हृदय संबंधी आपातकाल (Heart Attack) का संकेत हो सकता है।

1. **तुरंत 108 / 112 पर कॉल करें:** बिना 1 मिनट गंवाए एम्बुलेंस बुलाएं।
2. **विश्राम की स्थिति:** मरीज को आरामदायक बैठने की स्थिति में रखें और शांत रहने को कहें।
3. **अस्पताल पहुंचें:** नजदीकी कार्डियक केयर या आपातकालीन अस्पताल जाएं।

**चिकित्सा अस्वीकरण (Medical Disclaimer):**
*यह एक आपातकालीन जन स्वास्थ्य चेतावनी है।*`
        : `### 🚨 EMERGENCY RED-FLAG: Severe Acute Chest Pain

**⚠️ IMMEDIATE EMERGENCY ACTION REQUIRED:**
Crushing chest pain, heavy pressure, or pain radiating to the left arm, neck, jaw, or back may indicate an acute cardiac event (Heart Attack).

1. **Call Ambulance Immediately:** Dial **108** or **112** without any delay.
2. **Immediate Rest:** Have the patient sit down in a comfortable, supported position. Avoid any physical exertion or walking.
3. **Immediate Hospital Transfer:** Transfer to the nearest emergency room with cardiac care capabilities immediately.

**Medical Disclaimer:**
*This is an immediate public health emergency alert and does not constitute a clinical diagnosis.*`
    };
  }

  // 3. Loss of Consciousness / Seizures / Severe Bleeding
  if (
    query.includes('unconscious') || 
    query.includes('loss of consciousness') || 
    query.includes('fainted and not waking') || 
    query.includes('seizure') || 
    query.includes('convulsions') || 
    query.includes('vomiting blood') || 
    query.includes('severe bleeding') ||
    query.includes('behoshi') ||
    query.includes('बेहोश') ||
    query.includes('दौरे')
  ) {
    return {
      isEmergency: true,
      emergencyType: 'Critical Neurological / Hemorrhagic Emergency',
      emergencyText: isHindi
        ? `### 🚨 आपातकालीन चेतावनी: गंभीर चिकित्सीय आपातकाल (Critical Medical Alert)

**⚠️ तत्काल कदम (Immediate Emergency Action):**
बेहोशी, दौरे आना या अत्यधिक रक्तस्राव तत्काल अस्पताल में भर्ती होने के संकेत हैं।

1. **तुरंत 108 या 112 डायल करें:** आपातकालीन एम्बुलेंस तुरंत बुलाएं।
2. **प्राथमिक उपचार:** यदि व्यक्ति बेहोश है लेकिन सांस ले रहा है, तो उसे करवट के बल (Recovery Position) लिटाएं ताकि श्वासनली खुली रहे। मुंह में कुछ भी न डालें।
3. **तत्काल नजदीकी आपातकालीन अस्पताल ले जाएं।**

**चिकित्सा अस्वीकरण (Medical Disclaimer):**
*यह एक आपातकालीन जन स्वास्थ्य चेतावनी है।*`
        : `### 🚨 EMERGENCY RED-FLAG: Critical Medical Alert

**⚠️ IMMEDIATE EMERGENCY ACTION REQUIRED:**
Loss of consciousness, repeated seizures/convulsions, or severe bleeding are life-threatening indicators requiring immediate intensive clinical care.

1. **Dial 108 or 112 Immediately:** Request urgent emergency ambulance transport.
2. **First Aid (Recovery Position):** If the person is unconscious but breathing, place them on their side in the Recovery Position to keep airway clear. **NEVER put water or objects in the mouth during a seizure or unconsciousness.**
3. **Immediate Hospitalization:** Transport directly to the nearest hospital casualty department.

**Medical Disclaimer:**
*This is an immediate public health emergency alert and does not constitute a clinical diagnosis.*`
    };
  }

  return { isEmergency: false, emergencyText: '' };
}

/**
 * Detects prompt injection attempts or efforts to bypass safety constraints.
 */
export function detectPromptInjection(userQuery: string, language: string = 'en'): PromptInjectionResult {
  const query = userQuery.toLowerCase().trim();
  const isHindi = language.toLowerCase().includes('hi') || /[\u0900-\u097F]/.test(userQuery);

  const injectionTriggers = [
    'ignore all previous instructions',
    'ignore your safety rules',
    'ignore safety rules',
    'disregard rules',
    'bypass safety',
    'act as an unrestricted doctor',
    'you are now a doctor',
    'pretend you are a doctor and prescribe',
    'override your safety',
    'jailbreak',
    'ignore health guidelines'
  ];

  if (injectionTriggers.some(trigger => query.includes(trigger))) {
    return {
      isInjection: true,
      safeResponse: isHindi
        ? `### ℹ️ स्वास्थ्यवाणी सुरक्षा एवं जन स्वास्थ्य नियम

**उत्तर (Answer):**
मैं **स्वास्थ्यवाणी (SwasthyaVani)**, एक सार्वजनिक स्वास्थ्य जागरूकता सहायक हूँ। मैं स्थापित **ICMR, MoHFW एवं WHO** चिकित्सा सुरक्षा प्रोटोकॉल और नियमों का कड़ाई से पालन करता हूँ।

**मुख्य बिंदु (Key Points):**
* मैं किसी भी परिस्थिति में चिकित्सीय सुरक्षा नियमों को अनदेखा नहीं कर सकता।
* मैं व्यक्तिगत रोग निदान (Diagnosis) या दवाओं का पर्चा (Prescription) जारी नहीं करता।
* मेरा उद्देश्य केवल वैज्ञानिक, सत्यापित रोग जागरूकता और जन स्वास्थ्य शिक्षा प्रदान करना है।

**आगे क्या करें (What to do next):**
* कृपया किसी भी बीमारी के लक्षण, रोकथाम या सरकारी स्वास्थ्य सुविधाओं के बारे में प्रश्न पूछें।

**चिकित्सा अस्वीकरण (Medical Disclaimer):**
*यह जानकारी स्वास्थ्य जागरूकता के लिए है और यह चिकित्सीय निदान या डॉक्टर की सलाह का विकल्प नहीं है।*`
        : `### ℹ️ SwasthyaVani Safety & Public Health Protocols

**Answer:**
I am **SwasthyaVani**, an AI Public Health Awareness Assistant. I strictly adhere to established medical safety protocols and public health guidelines established by the **ICMR, MoHFW, and WHO**.

**Key Points:**
* I operate under non-negotiable safety guardrails designed to protect public health.
* I **do not** provide clinical diagnoses, claim disease certainty, or prescribe pharmaceutical medications.
* My sole mission is delivering verified disease awareness, preventive education, and timely healthcare navigation.

**What to Do Next:**
* Please feel free to ask about disease prevention, vector control, symptom awareness, or government health programs.

**Medical Disclaimer:**
*This information is for health awareness and does not constitute a medical diagnosis or replace professional medical advice.*`
    };
  }

  return { isInjection: false };
}

/**
 * Lightweight RAG: Indexes the verified disease database and retrieves matching knowledge chunks.
 */
export function retrieveDiseaseKnowledge(userQuery: string): RAGRetrievalResult {
  const query = userQuery.toLowerCase().trim();
  const queryTokens = query.split(/\s+/).filter(t => t.length > 2);

  let bestMatch: Disease | null = null;
  let highestScore = 0;
  let matchedAspect: 'symptoms' | 'prevention' | 'transmission' | 'warning' | 'causes' | 'faqs' | 'myths' | 'general' = 'general';

  // Keyword scoring across DISEASES_DATA
  for (const disease of DISEASES_DATA) {
    let score = 0;

    const nameLower = disease.name.toLowerCase();
    const hindiLower = (disease.hindiName || '').toLowerCase();
    const idLower = disease.id.toLowerCase();
    const summaryLower = disease.summary.toLowerCase();

    // Exact name match
    if (query.includes(nameLower) || query.includes(idLower)) {
      score += 50;
    }
    if (hindiLower && (query.includes(hindiLower) || hindiLower.split(' ').some(w => query.includes(w)))) {
      score += 40;
    }

    // Specific symptom / vector keywords
    if (disease.id === 'dengue' && (query.includes('platelet') || query.includes('breakbone') || query.includes('aedes') || query.includes('retro-orbital') || query.includes('डेंगू'))) {
      score += 35;
    }
    if (disease.id === 'malaria' && (query.includes('shivering') || query.includes('chills') || query.includes('anopheles') || query.includes('bed net') || query.includes('मलेरिया'))) {
      score += 35;
    }
    if (disease.id === 'tuberculosis' && (query.includes('tb') || query.includes('cough') || query.includes('dots') || query.includes('nikshay') || query.includes('टीबी') || query.includes('khansi'))) {
      score += 35;
    }
    if (disease.id === 'hypertension' && (query.includes('blood pressure') || query.includes('bp') || query.includes('silent killer') || query.includes('उच्च रक्तचाप') || query.includes('systolic'))) {
      score += 35;
    }
    if (disease.id === 'rabies' && (query.includes('dog bite') || query.includes('animal bite') || query.includes('hydrophobia') || query.includes('कुत्ता'))) {
      score += 35;
    }
    if (disease.id === 'cholera' && (query.includes('watery diarrhea') || query.includes('rice water') || query.includes('ors') || query.includes('हैजा'))) {
      score += 35;
    }
    if (disease.id === 'typhoid' && (query.includes('step ladder') || query.includes('widal') || query.includes('salmonella') || query.includes('टाइफाइड'))) {
      score += 35;
    }
    if (disease.id === 'diabetes' && (query.includes('sugar') || query.includes('insulin') || query.includes('मधुमेह'))) {
      score += 35;
    }

    // Token overlap
    for (const token of queryTokens) {
      if (nameLower.includes(token)) score += 8;
      if (summaryLower.includes(token)) score += 3;
      if (disease.earlySymptoms.some(s => s.toLowerCase().includes(token))) score += 5;
      if (disease.prevention.some(p => p.toLowerCase().includes(token))) score += 5;
      if (disease.warningSigns.some(w => w.toLowerCase().includes(token))) score += 6;
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = disease;
    }
  }

  // Determine aspect intent
  if (query.includes('prevent') || query.includes('bache') || query.includes('avoid') || query.includes('रोकथाम')) {
    matchedAspect = 'prevention';
  } else if (query.includes('symptom') || query.includes('sign') || query.includes('lakshan') || query.includes('लक्षण')) {
    matchedAspect = 'symptoms';
  } else if (query.includes('spread') || query.includes('transmit') || query.includes('failta') || query.includes('फैलता')) {
    matchedAspect = 'transmission';
  } else if (query.includes('warning') || query.includes('danger') || query.includes('emergency') || query.includes('खतरा')) {
    matchedAspect = 'warning';
  }

  const CONFIDENCE_THRESHOLD = 15;

  if (!bestMatch || highestScore < CONFIDENCE_THRESHOLD) {
    return {
      found: false,
      relevanceScore: highestScore,
      extractedContext: '',
      sources: ['National Public Health Education Guidelines'],
      knowledgeBaseRef: 'General Public Health Advisory'
    };
  }

  // Build extracted context string
  let extractedContext = `### Verified Disease Profile: ${bestMatch.name} (${bestMatch.hindiName || ''})
Category: ${bestMatch.category}
Summary: ${bestMatch.summary}
Etiology / Causes: ${bestMatch.causes.join('; ')}
Transmission: ${bestMatch.transmission.join('; ')}
Key Symptoms: Early: ${bestMatch.earlySymptoms.join(', ')}; Severe: ${bestMatch.severeSymptoms.join(', ')}
Prevention Protocols: ${bestMatch.prevention.join('; ')}
Warning Signs (Emergency): ${bestMatch.warningSigns.join('; ')}
When to Seek Clinical Care: ${bestMatch.whenToSeekMedicalHelp.join('; ')}
Primary Public Health Sources: ${bestMatch.sources.join(', ')}`;

  if (bestMatch.faqs && bestMatch.faqs.length > 0) {
    extractedContext += `\nVerified FAQs: ${bestMatch.faqs.map(f => `Q: ${f.question} A: ${f.answer}`).join(' | ')}`;
  }

  return {
    found: true,
    matchedDisease: bestMatch.name,
    matchedHindiName: bestMatch.hindiName,
    relevanceScore: highestScore,
    extractedContext,
    sources: bestMatch.sources && bestMatch.sources.length > 0 ? bestMatch.sources : ['ICMR', 'MoHFW', 'WHO'],
    knowledgeBaseRef: `SwasthyaVani Knowledge Base (Verified ICMR/WHO Guidelines) - Ref: ${bestMatch.id.toUpperCase()}-2024`
  };
}
