import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { 
  detectEmergencyRedFlags, 
  detectPromptInjection, 
  retrieveDiseaseKnowledge 
} from './src/lib/ragEngine';
import { INITIAL_HEALTH_ALERTS } from './src/data/healthAlerts';
import { DISEASES_DATA } from './src/data/diseases';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    } catch (err) {
      console.warn('Failed to initialize Gemini client:', err);
    }
  }
  return aiClient;
}

// Public Health Fallback Knowledge Base Engine (when offline or before API key setup)
function generateKnowledgeBasedResponse(userQuery: string, language: string = 'en') {
  const query = userQuery.toLowerCase().trim();
  const isHindi = language.toLowerCase().includes('hi') || /[\u0900-\u097F]/.test(userQuery) || query.includes('kaise') || query.includes('kya') || query.includes('bache');
  
  // 1. Unrelated non-health questions
  if (
    query.includes('movie') || query.includes('cricket') || query.includes('stock market') || 
    query.includes('weather forecast') || query.includes('write code') || query.includes('python') || 
    query.includes('javascript') || query.includes('recipe for cake') || query.includes('song')
  ) {
    return {
      text: isHindi
        ? `### ℹ️ जन स्वास्थ्य सहायता केंद्र (Public Health Assistant)

**उत्तर (Answer):**
मैं **स्वास्थ्यवाणी (SwasthyaVani)**, एक सार्वजनिक स्वास्थ्य जागरूकता और रोग निवारण सहायक हूँ। मैं केवल स्वास्थ्य, संक्रामक एवं गैर-संक्रामक रोगों, रोकथाम, और प्राथमिक स्वास्थ्य मार्गदर्शन से जुड़े प्रश्नों के उत्तर देने के लिए समर्पित हूँ। मैं गैर-स्वास्थ्य विषयों पर जानकारी प्रदान नहीं करता।

**आगे क्या करें (What to do next):**
* कृपया डेंगू, मलेरिया, टीबी, उच्च रक्तचाप, पोषण, या टीकाकरण से संबंधित स्वास्थ्य प्रश्न पूछें।

**चिकित्सा अस्वीकरण (Medical Disclaimer):**
*यह जानकारी स्वास्थ्य जागरूकता के लिए है और यह चिकित्सीय निदान या डॉक्टर की सलाह का विकल्प नहीं है।*`
        : `### ℹ️ Public Health Assistant Scope

**Answer:**
I am **SwasthyaVani**, an AI Public Health Awareness Assistant dedicated specifically to disease education, symptom awareness, hygiene, and preventive healthcare. I do not provide answers to non-health topics such as coding, entertainment, or general knowledge.

**What to Do Next:**
* Please feel free to ask about vector-borne diseases (Dengue, Malaria), respiratory infections (TB, Flu), chronic conditions (Diabetes, Hypertension), or vaccination guidelines.

**Medical Disclaimer:**
*This information is for health awareness and does not constitute a medical diagnosis or replace professional medical advice.*`,
      sources: ['National Public Health Education Guidelines'],
      knowledgeBaseRef: 'SwasthyaVani Public Health Directory',
      warningLevel: 'normal',
      suggestedQuestions: [
        'What are the symptoms of dengue?',
        'How can I prevent malaria?',
        'What is hypertension?'
      ]
    };
  }

  // 2. Prescription / Drug dosage inquiry
  if (query.includes('dosage') || query.includes('dose') || query.includes('how many mg') || query.includes('prescribe') || query.includes('which antibiotic') || query.includes('dawa ki dose')) {
    return {
      text: isHindi
        ? `### ⚠️ दवा की खुराक एवं डॉक्टरी परामर्श नियम

**उत्तर (Answer):**
एक सार्वजनिक स्वास्थ्य जागरूकता सहायक के रूप में, मैं किसी भी दवा की खुराक (Dosage) या विशिष्ट एंटीबायोटिक/स्टेरॉयड दवाएं **निर्धारित नहीं कर सकता**। दवा की सही खुराक मरीज की आयु, वजन, गुर्दे/लिवर की स्थिति और चिकित्सकीय जांच पर निर्भर करती है।

**मुख्य बिंदु (Key Points):**
* **स्व-दवा (Self-Medication) से बचें:** बिना डॉक्टर के पर्चे के एंटीबायोटिक्स लेने से एंटीमाइक्रोबियल रेजिस्टेंस (दवा का बेअसर होना) का गंभीर खतरा बढ़ जाता है।
* **डेंगू/बुखार में सावधानी:** डॉक्टर की सलाह के बिना कभी भी एस्पिरिन (Aspirin) या इबुप्रोफेन (Ibuprofen) न लें, क्योंकि ये रक्तस्राव (Bleeding) का खतरा बढ़ा सकते हैं।

**आगे क्या करें (What to do next):**
* अपने नजदीकी प्राथमिक स्वास्थ्य केंद्र (PHC) या योग्य पंजीकृत चिकित्सक (MBBS/MD) से संपर्क करें और उचित पर्चा प्राप्त करें।

**स्रोत (Sources):**
* स्वास्थ्य एवं परिवार कल्याण मंत्रालय (MoHFW), भारतीय आयुर्विज्ञान अनुसंधान परिषद (ICMR)

**चिकित्सा अस्वीकरण (Medical Disclaimer):**
*यह जानकारी स्वास्थ्य जागरूकता के लिए है और यह चिकित्सीय निदान या डॉक्टर की सलाह का विकल्प नहीं है।*`
        : `### ⚠️ Medication & Dosage Safety Guidance

**Answer:**
As an AI Public Health Awareness Assistant, I **cannot prescribe medications or specify drug dosages**. Prescribing medication requires an in-person clinical assessment by a registered medical practitioner, taking into account patient age, weight, medical history, and organ function.

**Key Points:**
* **Avoid Self-Medication:** Taking over-the-counter antibiotics or steroids without prescription leads to dangerous Antimicrobial Resistance (AMR).
* **Fever Precaution:** In unexplained fever or suspected Dengue, strictly avoid NSAIDs like Aspirin or Ibuprofen, as they increase internal bleeding risks. Use only physician-approved supportive care.

**What to Do Next:**
* Visit your nearest Primary Health Centre (PHC), Community Health Centre (CHC), or consult a qualified doctor for an official prescription and dosage schedule.

**Sources & References:**
* Ministry of Health and Family Welfare (MoHFW) Rational Drug Use Guidelines, ICMR, WHO

**Medical Disclaimer:**
*This information is for health awareness and does not constitute a medical diagnosis or replace professional medical advice.*`,
      sources: ['MoHFW Rational Drug Use Guidelines', 'Indian Council of Medical Research (ICMR)'],
      knowledgeBaseRef: 'National Essential Medicines & Rational Drug Protocol',
      warningLevel: 'caution',
      suggestedQuestions: [
        'Why should antibiotics not be taken without a prescription?',
        'What safe supportive care helps fever recovery?',
        'What are the warning signs of dengue?'
      ]
    };
  }

  // 3. Asking for a definitive personal diagnosis
  if ((query.includes('do i have') || query.includes('diagnose me') || query.includes('mujhe kya hua hai') || query.includes('kya mujhe')) && (query.includes('dengue') || query.includes('malaria') || query.includes('tb') || query.includes('fever') || query.includes('disease'))) {
    return {
      text: isHindi
        ? `### 🩺 रोग लक्षण जागरूकता एवं नैदानिक परामर्श

**उत्तर (Answer):**
मैं आपका व्यक्तिगत चिकित्सकीय निदान (Clinical Diagnosis) नहीं कर सकता। बुखार, बदन दर्द और सिरदर्द जैसे लक्षण कई प्रकार के वायरल संक्रमणों, डेंगू, मलेरिया या टाइफाइड में समान हो सकते हैं। केवल रक्त परीक्षण (Lab Tests) और डॉक्टर की जांच से ही सटीक निदान संभव है।

**मुख्य बिंदु (Key Points):**
* **आवश्यक नैदानिक जांच:** डेंगू के लिए NS1/IgM एंटीजन टेस्ट, मलेरिया के लिए ब्लड स्मीयर/RDT, और कम्प्लीट ब्लड काउंट (CBC/प्लेटलेट्स)।
* **सुरक्षित देखभाल:** भरपूर तरल पदार्थ (ORS, नारियल पानी, दाल का पानी) पिएं और पर्याप्त आराम करें।

**चेतावनी के संकेत (Warning Signs - तत्काल अस्पताल जाएं):**
* लगातार उल्टियां होना या पेट में तेज दर्द।
* मसूड़ों, नाक से खून आना या त्वचा पर लाल चकत्ते।
* अत्यधिक सुस्ती, चक्कर आना या सांस लेने में तकलीफ।

**आगे क्या करें (What to do next):**
* तुरंत नजदीकी सरकारी अस्पताल या स्वास्थ्य केंद्र जाकर खून की जांच करवाएं।

**स्रोत (Sources):**
* राष्ट्रीय वेक्टर जनित रोग नियंत्रण कार्यक्रम (NVBDCP), ICMR

**चिकित्सा अस्वीकरण (Medical Disclaimer):**
*यह जानकारी केवल स्वास्थ्य जागरूकता के लिए है और यह चिकित्सीय निदान या डॉक्टर की सलाह का विकल्प नहीं है।*`
        : `### 🩺 Symptom Differentiation & Clinical Triage

**Answer:**
I cannot provide a definitive medical diagnosis for your condition. Common symptoms such as fever, headache, body aches, and fatigue overlap significantly across viral fevers, Dengue, Malaria, Typhoid, and respiratory illnesses. A confirmed diagnosis requires laboratory blood testing and clinical examination by a licensed medical practitioner.

**Key Points:**
* **Laboratory Investigations Required:** Complete Blood Count (CBC) with platelet count, Dengue NS1 Antigen / IgM antibody, or Malaria Peripheral Blood Smear / RDT.
* **Supportive Care:** Maintain high hydration with Oral Rehydration Salts (ORS), fresh fluids, and complete physical rest.

**Warning Signs (Red Flags - Seek Emergency Care):**
* Persistent continuous vomiting or severe abdominal pain
* Spontaneous bleeding from gums, nose, or dark stools
* Extreme lethargy, restlessness, or shortness of breath

**What to Do Next:**
* Visit your local Primary Health Centre (PHC) or hospital for a professional diagnostic evaluation and laboratory blood work.

**Sources & References:**
* National Vector Borne Disease Control Programme (NVBDCP), ICMR, WHO

**Medical Disclaimer:**
*This information is for health awareness and does not constitute a medical diagnosis or replace professional medical advice.*`,
      sources: ['NVBDCP Public Health Guidelines', 'Indian Council of Medical Research (ICMR)'],
      knowledgeBaseRef: 'National Vector-Borne Disease Control Guidelines (NVBDCP-2024)',
      warningLevel: 'caution',
      suggestedQuestions: [
        'What blood tests confirm Dengue or Malaria?',
        'What are the critical warning signs of severe dengue?',
        'How to maintain hydration during fever?'
      ]
    };
  }

  // 4. Check RAG Retrieval
  const ragResult = retrieveDiseaseKnowledge(userQuery);
  if (ragResult.found && ragResult.matchedDisease) {
    if (ragResult.matchedDisease.toLowerCase().includes('dengue')) {
      return {
        text: isHindi
          ? `### 🦟 डेंगू बुखार: लक्षण, रोकथाम एवं महत्वपूर्ण सावधानियां

**उत्तर (Answer):**
डेंगू एक वायरल संक्रमण है जो मुख्य रूप से दिन के समय काटने वाले *एडीज एजिप्टी (Aedes aegypti)* मच्छर के जरिए फैलता है। इसे "हड्डी तोड़ बुखार" भी कहा जाता है क्योंकि इसमें मांसपेशियों और जोड़ों में तीव्र दर्द होता है।

**मुख्य बिंदु (Key Points):**
* **प्रमुख लक्षण:** अचानक तेज बुखार (103°F-104°F), आंखों के पीछे तेज दर्द (Retro-orbital pain), गंभीर सिरदर्द, जोड़ों और मांसपेशियों में दर्द, तथा त्वचा पर लाल चकत्ते।
* **संक्रमण का समय:** मच्छर के काटने के 4 से 10 दिनों बाद लक्षण प्रकट होते हैं।
* **रोकथाम:** घरों में और आसपास रुके हुए पानी (कूलर, गमले, टायर) को हर हफ्ते साफ करें ("रविवार ड्राई डे") और दिन में मच्छर विकर्षक (Repellent) का उपयोग करें।

**चेतावनी के संकेत (Warning Signs - तत्काल आपातकालीन देखभाल):**
* बुखार उतरने के समय (दिन 3–7) अत्यधिक पेट दर्द और लगातार उल्टियां।
* मसूड़ों, नाक से खून आना या मल में खून आना।
* प्लेटलेट काउंट का तेजी से 50,000 से नीचे गिरना।
* अत्यधिक कमजोरी या सांस फूलना।

**आगे क्या करें (What to do next):**
* ORS, नारियल पानी, और ताजे तरल पदार्थों से शरीर में पानी की कमी न होने दें।
* डॉक्टर की सलाह के बिना एस्पिरिन/इबुप्रोफेन कभी न लें। केवल पैरासिटामोल लें।
* प्लेटलेट और हीमोग्लोबिन स्तर की निगरानी के लिए डॉक्टर से सीबीसी जांच कराएं।

**स्रोत (Sources):**
* राष्ट्रीय वेक्टर जनित रोग नियंत्रण कार्यक्रम (NVBDCP), विश्व स्वास्थ्य संगठन (WHO)

**चिकित्सा अस्वीकरण (Medical Disclaimer):**
*यह जानकारी स्वास्थ्य जागरूकता के लिए है और यह चिकित्सीय निदान या डॉक्टर की सलाह का विकल्प नहीं है।*`
          : `### 🦟 Dengue Fever Awareness & Protocol

**Answer:**
Dengue fever is an acute viral infection caused by the Dengue virus (DENV 1–4) and transmitted to humans through the bites of infected female *Aedes aegypti* mosquitoes, which bite predominantly during daytime hours.

**Key Points:**
* **Classic Symptoms:** Sudden onset of high fever (103–104°F), intense retro-orbital (behind the eye) pain, severe muscle and joint aches ("breakbone fever"), nausea, and maculopapular rash appearing around Days 3–5.
* **Transmission Vector:** Domestic clean stagnant water containers (coolers, flower pots, stored buckets, discarded tyres).
* **Prevention Measures:** Eliminate standing water weekly ("Dry Day" habit), wear protective full-sleeve clothing, and use DEET or Picaridin mosquito repellents.

**Warning Signs (Red Flags - Immediate Hospitalization):**
* Severe continuous abdominal tenderness or persistent vomiting (>3 episodes)
* Mucosal bleeding (bleeding gums, nosebleeds, blood in vomit/stool)
* Extreme lethargy, restlessness, or altered mental status
* Rapid decline in platelet counts (<50,000/μL) with hemoconcentration

**What to Do Next:**
* Prioritize aggressive oral hydration with Oral Rehydration Salts (ORS), coconut water, and clean fluids.
* **Medication Caution:** Use only Paracetamol under medical guidance. **NEVER take NSAIDs (Aspirin, Ibuprofen, Brufen)** due to hemorrhage risk.
* Consult a doctor at your Primary Health Centre for Dengue NS1/IgM testing and daily platelet monitoring.

**Sources & References:**
* National Vector Borne Disease Control Programme (NVBDCP), Ministry of Health and Family Welfare (MoHFW), WHO

**Medical Disclaimer:**
*This information is for health awareness and does not constitute a medical diagnosis or replace professional medical advice.*`,
        sources: ragResult.sources,
        knowledgeBaseRef: ragResult.knowledgeBaseRef,
        warningLevel: 'normal',
        suggestedQuestions: [
          'What should I do if platelets drop below 50,000?',
          'How does Dengue differ from Malaria?',
          'What are the best mosquito repellent measures for children?'
        ]
      };
    }

    if (ragResult.matchedDisease.toLowerCase().includes('malaria')) {
      return {
        text: isHindi
          ? `### 🦠 मलेरिया: लक्षण, रोकथाम एवं उपचार दिशा-निर्देश

**उत्तर (Answer):**
मलेरिया *प्लाज्मोडियम (Plasmodium)* परजीवी के कारण होने वाला एक संक्रामक रोग है, जो संक्रमित मादा *एनोफिलीज़ (Anopheles)* मच्छर के रात में काटने से फैलता है।

**मुख्य बिंदु (Key Points):**
* **लक्षणों का 3-चरणीय चक्र:**
  1. **शीत अवस्था (Cold Stage):** दांत किटकिटाने वाली तेज कंपकंपी और अत्यधिक ठंड लगना।
  2. **उष्ण अवस्था (Hot Stage):** तेज बुखार (103°F-105°F), तेज सिरदर्द और उल्टी।
  3. **स्वेद अवस्था (Sweating Stage):** अत्यधिक पसीना आकर बुखार का अचानक उतरना और कमजोरी।
* **रोकथाम:** कीटनाशक युक्त मच्छरदानी (LLIN) में सोएं, घर की खिड़कियों पर जाली लगाएं, और आसपास पानी जमा न होने दें।

**चेतावनी के संकेत (Warning Signs):**
* अत्यधिक पीलिया (त्वचा/आंखों का पीला पड़ना), बेहोशी, दौरे आना, या पेशाब का रंग गहरा काला होना (सेरेब्रल या फाल्सीपेरम मलेरिया का संकेत)।

**आगे क्या करें (What to do next):**
* नजदीकी सरकारी स्वास्थ्य केंद्र पर जाकर तुरंत खून की जांच (RDT या ब्लड स्मीयर) कराएं।
* यदि मलेरिया की पुष्टि होती है, तो डॉक्टर द्वारा दी गई क्लोरोक्वीन या ACT दवा का **पूरा कोर्स** अवश्य समाप्त करें।

**स्रोत (Sources):**
* राष्ट्रीय वेक्टर जनित रोग नियंत्रण कार्यक्रम (NVBDCP), ICMR

**चिकित्सा अस्वीकरण (Medical Disclaimer):**
*यह जानकारी स्वास्थ्य जागरूकता के लिए है और यह चिकित्सीय निदान या डॉक्टर की सलाह का विकल्प नहीं है।*`
          : `### 🦠 Malaria Awareness & Treatment Guidelines

**Answer:**
Malaria is a life-threatening parasitic disease caused by *Plasmodium* parasites (*P. falciparum* and *P. vivax*), transmitted through the nocturnal bites of infected female *Anopheles* mosquitoes.

**Key Points:**
* **Classic 3-Stage Paroxysm:**
  1. **Cold Stage:** Sudden intense shivering, cold sensation, and teeth chattering (15–60 mins).
  2. **Hot Stage:** High burning fever (103°F–105°F), severe headache, and vomiting (2–6 hours).
  3. **Sweating Stage:** Profuse perspiration, rapid drop in temperature, and exhaustion (2–4 hours).
* **Prevention Pillars:** Sleep under Long-Lasting Insecticide-treated Nets (LLINs), apply indoor residual sprays, and prevent puddles of stagnant water.

**Warning Signs (Severe / Cerebral Malaria):**
* Confusion, loss of consciousness, repeated seizures, severe jaundice, or dark tea-colored urine (*P. falciparum* complication requiring ICU admission).

**What to Do Next:**
* Get a rapid blood smear or Rapid Diagnostic Test (RDT) at the nearest Primary Health Centre.
* Complete the full prescribed course of Artemisinin-based Combination Therapy (ACT) or Chloroquine/Primaquine.

**Sources & References:**
* National Vector Borne Disease Control Programme (NVBDCP), MoHFW, WHO

**Medical Disclaimer:**
*This information is for health awareness and does not constitute a medical diagnosis or replace professional medical advice.*`,
        sources: ragResult.sources,
        knowledgeBaseRef: ragResult.knowledgeBaseRef,
        warningLevel: 'normal',
        suggestedQuestions: [
          'Why must antimalarial medicines be taken for the full course?',
          'How do I protect my child from mosquito bites during sleep?',
          'What is the difference between P. vivax and P. falciparum?'
        ]
      };
    }

    if (ragResult.matchedDisease.toLowerCase().includes('tuberculosis')) {
      return {
        text: isHindi
          ? `### 🫁 तपेदिक (Tuberculosis - TB): लक्षण, रोकथाम और सरकारी सुविधाएं

**उत्तर (Answer):**
तपेदिक (टीबी) *माइकोबैक्टीरियम ट्यूबरकुलोसिस (Mycobacterium tuberculosis)* जीवाणु के कारण होने वाला संक्रामक रोग है। यह मुख्य रूप से फेफड़ों को प्रभावित करता है और रोगी के खांसने, छींकने या थूकने से हवा के माध्यम से फैलता है।

**मुख्य बिंदु (Key Points):**
* **प्रमुख लक्षण:** **2 सप्ताह या उससे अधिक समय तक लगातार खांसी**, शाम के समय हल्का बुखार, रात में पसीना आना, भूख में कमी, और बिना कारण वजन घटना।
* **सरकारी निशुल्क सेवाएं:** राष्ट्रीय क्षय रोग उन्मूलन कार्यक्रम (**NTEP / निक्षय**) के तहत सभी सरकारी अस्पतालों में CBNAAT/TrueNat जांच और पूरी 6 महीने की DOTS दवाएं **100% निशुल्क** उपलब्ध हैं।
* **पोषण सहायता:** *निक्षय पोषण योजना* के तहत मरीज को उपचार के दौरान ₹500/माह डीबीटी के माध्यम से बैंक खाते में दिया जाता है।
* **टीबी 100% साध्य (Curable) है** यदि दवा का पूरा कोर्स बिना रुके पूरा किया जाए।

**चेतावनी के संकेत (Warning Signs):**
* बलगम में खून आना (Hemoptysis), सीने में तेज दर्द, या सांस लेने में भारी कठिनाई।

**आगे क्या करें (What to do next):**
* यदि खांसी 2 हफ्ते से ज्यादा है, तो तुरंत नजदीकी सरकारी डिस्पेंसरी या DOTS सेंटर पर जाकर बलगम की जांच कराएं।
* खांसते समय रुमाल का उपयोग करें और खुले में कभी न थूकें।

**स्रोत (Sources):**
* राष्ट्रीय क्षय रोग उन्मूलन कार्यक्रम (NTEP), MoHFW, WHO

**चिकित्सा अस्वीकरण (Medical Disclaimer):**
*यह जानकारी स्वास्थ्य जागरूकता के लिए है और यह चिकित्सीय निदान या डॉक्टर की सलाह का विकल्प नहीं है।*`
          : `### 🫁 Tuberculosis (TB) Awareness & Public Health Guidance

**Answer:**
Tuberculosis (TB) is a contagious bacterial disease caused by *Mycobacterium tuberculosis*. It predominantly affects the lungs (pulmonary TB) and spreads through the air when an individual with active disease coughs, sneezes, or spits.

**Key Points:**
* **Cardinal Symptoms:** Persistent cough lasting **2 weeks or longer**, low-grade evening fever, drenching night sweats, unexplained weight loss, and fatigue.
* **100% Free Diagnostics & Treatment:** Under India's **National TB Elimination Program (NTEP / Ni-kshay)**, rapid molecular CBNAAT/TrueNat testing and 6-month fixed-dose DOTS medications are completely free at all government dispensaries.
* **Nutritional Benefit:** Patients receive ₹500/month directly into their bank accounts via the *Ni-kshay Poshan Yojana*.
* **Curability:** TB is completely curable when the full prescribed antibiotic regimen is adhered to strictly without interruption.

**Warning Signs (Red Flags):**
* Coughing up blood (Hemoptysis), acute breathlessness, or severe localized chest pain.

**What to Do Next:**
* Visit your nearest Primary Health Centre or DOTS clinic for immediate free sputum examination and chest X-ray.
* Practice respiratory hygiene: cover coughs and sneezes with a tissue or elbow, and avoid spitting in public spaces.

**Sources & References:**
* National TB Elimination Programme (NTEP), Ministry of Health & Family Welfare, WHO

**Medical Disclaimer:**
*This information is for health awareness and does not constitute a medical diagnosis or replace professional medical advice.*`,
        sources: ragResult.sources,
        knowledgeBaseRef: ragResult.knowledgeBaseRef,
        warningLevel: 'normal',
        suggestedQuestions: [
          'How to access free TB testing at government clinics in India?',
          'What is the difference between latent TB infection and active TB disease?',
          'How does the BCG vaccine protect infants?'
        ]
      };
    }
  }

  // 5. Question Not Covered in Verified Knowledge Base
  return {
    text: isHindi
      ? `### ℹ️ ज्ञानकोष संदर्भ सूचना (Knowledge Base Notice)

**उत्तर (Answer):**
आपके द्वारा पूछे गए विषय **"${userQuery.trim()}"** के संबंध में हमारे वर्तमान सत्यापित राष्ट्रीय जन स्वास्थ्य ज्ञानकोष (Verified Public Health Knowledge Base) में आधिकारिक प्रलेखित जानकारी उपलब्ध नहीं है।

**मुख्य बिंदु (Key Points):**
* स्वास्थ्य सुरक्षा नियमों के तहत, हम अपुष्ट या काल्पनिक चिकित्सा जानकारी प्रदान नहीं करते हैं।
* संक्रामक रोगों, दुर्लभ सिंड्रोम या विशिष्ट चिकित्सा स्थितियों के लिए हमेशा अधिकृत सार्वजनिक स्वास्थ्य पोर्टल्स पर भरोसा करें।

**आगे क्या करें (What to do next):**
* सटीक नैदानिक मूल्यांकन और सलाह के लिए अपने नजदीकी प्राथमिक स्वास्थ्य केंद्र (PHC), जिला अस्पताल या पंजीकृत चिकित्सक से परामर्श लें।
* राष्ट्रीय स्वास्थ्य हेल्पलाइन नंबर **1075** या आपातकालीन नंबर **108** पर संपर्क करें।

**स्रोत (Sources):**
* स्वास्थ्य एवं परिवार कल्याण मंत्रालय (MoHFW)

**चिकित्सा अस्वीकरण (Medical Disclaimer):**
*यह जानकारी स्वास्थ्य जागरूकता के लिए है और यह चिकित्सीय निदान या डॉक्टर की सलाह का विकल्प नहीं है।*`
      : `### ℹ️ Knowledge Base Notice: Verified Data Unavailable

**Answer:**
Reliable verified public health documentation for **"${userQuery.trim()}"** is not currently available in our indexed national disease knowledge base. 

**Key Points:**
* Under our clinical safety guidelines, SwasthyaVani does not fabricate medical facts or cite unverified claims.
* For rare conditions, non-indexed disorders, or novel health queries, evidence-based verification from specialized medical authorities is required.

**What to Do Next:**
* Please consult an appropriate healthcare professional or general physician at your local Primary Health Centre (PHC) for clinical assessment.
* You may contact the National Health Helpline at **1075** or emergency services at **108** for verified public health assistance.

**Sources & References:**
* Ministry of Health and Family Welfare (MoHFW), WHO Guidelines

**Medical Disclaimer:**
*This information is for health awareness and does not constitute a medical diagnosis or replace professional medical advice.*`,
    sources: ['Ministry of Health and Family Welfare (MoHFW)', 'World Health Organization (WHO)'],
    knowledgeBaseRef: 'SwasthyaVani Public Health Registry',
    warningLevel: 'normal',
    suggestedQuestions: [
      'What are the symptoms of dengue?',
      'How can I prevent malaria?',
      'What is hypertension?'
    ]
  };
}

// Chat Endpoint with RAG + Safety Layers + Gemini API
app.post('/api/chat', async (req, res) => {
  try {
    const { message, language = 'en', history = [], context = '' } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message text is required.' });
    }

    // Step 1: Emergency & Red-Flag Interceptor (Absolute Priority)
    const emergencyCheck = detectEmergencyRedFlags(message, language);
    if (emergencyCheck.isEmergency) {
      return res.json({
        text: emergencyCheck.emergencyText,
        sources: ['National Emergency Medical Services (108/112 Protocol)', 'Directorate General of Health Services (DGHS)'],
        knowledgeBaseRef: 'Emergency Triage & Red-Flag Critical Alert',
        warningLevel: 'emergency',
        suggestedQuestions: [
          'What is the emergency helpline number in India (108)?',
          'What immediate first aid should be given for breathlessness?'
        ]
      });
    }

    // Step 2: Prompt Injection Interceptor
    const injectionCheck = detectPromptInjection(message, language);
    if (injectionCheck.isInjection) {
      return res.json({
        text: injectionCheck.safeResponse,
        sources: ['SwasthyaVani Public Health Safety Architecture'],
        knowledgeBaseRef: 'AI Clinical Safety & Ethics Protocols',
        warningLevel: 'normal',
        suggestedQuestions: [
          'What are the symptoms of dengue?',
          'How can I prevent malaria?',
          'What is hypertension?'
        ]
      });
    }

    // Step 3: Lightweight RAG - Retrieve Verified Knowledge Base
    const ragResult = retrieveDiseaseKnowledge(message);

    const gemini = getGeminiClient();

    if (gemini) {
      try {
        let systemInstruction = `You are "SwasthyaVani", a trusted, empathetic, and evidence-grounded AI Public Health Awareness Assistant for disease education, symptom awareness, hygiene, and preventive public health.
You adhere strictly to guidelines from the World Health Organization (WHO), Indian Council of Medical Research (ICMR), and India's Ministry of Health and Family Welfare (MoHFW).

ROLE & CORE BOUNDARIES:
* You provide public health awareness, explain disease biology, transmission vectors, preventive measures, warning signs, and triage advice.
* You are NOT a doctor. You NEVER diagnose a user, you NEVER claim certainty about a patient's illness, and you NEVER prescribe drugs or state dosages.

RAG & KNOWLEDGE GROUNDING RULES:
1. PREFER VERIFIED KNOWLEDGE: If verified knowledge context is provided below, ground your answer strictly in that verified information.
2. IF INFORMATION IS NOT IN KNOWLEDGE BASE: If the user asks about a condition/claim for which verified public health data is absent or unindexed, DO NOT fabricate facts or sources. Clearly admit that reliable verified information is unavailable in the database and advise consulting a qualified physician or National Health Helpline (1075).
3. SAFETY SAFEGUARDS:
   - NEVER diagnose ("Do I have dengue?" -> Explain that fever has many causes and only laboratory blood tests like CBC/NS1 can confirm).
   - NEVER prescribe or state medication dosages (e.g. antibiotic or painkiller doses).
   - Always encourage professional medical consultation.
4. MULTILINGUAL & HINGLISH:
   - If the user asks in Hindi, reply in clear, respectful Hindi.
   - If the user asks in Hinglish (e.g. "TB kaise spread hota hai?"), reply with clear awareness guidance (in simple Hindi or clear English).
   - If in English, reply in English.

RESPONSE STRUCTURE:
### [Topic / Disease Title]

**Answer:**
[Direct, clear, plain-language explanation]

**Key Points:**
* [Causes, transmission, or key facts]
* [Core preventive and hygiene measures]

**Warning Signs (Red Flags):** *(Include if relevant)*
* [Danger signs requiring urgent hospital care]

**What to Do Next:**
* [Actionable next steps: PHC consultation, lab tests to request, hydration]

**Sources & References:**
* [Cite verified sources]

**Medical Disclaimer:**
*This information is for health awareness and does not constitute a medical diagnosis or replace professional medical advice.*`;

        // Format conversation history for Gemini multi-turn format
        const formattedContents: any[] = [];

        if (Array.isArray(history) && history.length > 0) {
          for (const item of history.slice(-6)) {
            if (item && item.text && (item.role === 'user' || item.role === 'model')) {
              formattedContents.push({
                role: item.role,
                parts: [{ text: item.text }]
              });
            }
          }
        }

        // Build prompt with RAG grounding
        let promptPayload = '';
        if (ragResult.found) {
          promptPayload += `[RETRIEVED VERIFIED KNOWLEDGE CONTEXT]:\n${ragResult.extractedContext}\n\n`;
        } else {
          promptPayload += `[NOTICE]: No specific indexed record found for this disease in the verified local knowledge base. If this is an unverified/rare medical query, explicitly state that reliable information is not in the knowledge base and direct to a physician.\n\n`;
        }

        promptPayload += `User Query: ${message}\nLanguage: ${language}`;

        formattedContents.push({
          role: 'user',
          parts: [{ text: promptPayload }]
        });

        const response = await gemini.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: formattedContents,
          config: {
            systemInstruction,
            temperature: 0.2,
          }
        });

        const replyText = response.text || 'I could not generate a response. Please try again.';
        
        const lowerReply = replyText.toLowerCase();
        const isCaution = lowerReply.includes('warning') || lowerReply.includes('consult a doctor') || lowerReply.includes('red flag');

        return res.json({
          text: replyText,
          sources: ragResult.found ? ragResult.sources : ['Ministry of Health & Family Welfare (MoHFW)', 'World Health Organization (WHO)'],
          knowledgeBaseRef: ragResult.knowledgeBaseRef,
          warningLevel: isCaution ? 'caution' : 'normal',
          suggestedQuestions: [
            'What are the key prevention steps for this condition?',
            'When should I visit a primary health centre?',
            'What laboratory tests confirm this illness?'
          ]
        });
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, falling back to verified knowledge engine:', geminiError?.message || geminiError);
        const fallback = generateKnowledgeBasedResponse(message, language);
        return res.json(fallback);
      }
    } else {
      // Fallback knowledge engine
      const fallback = generateKnowledgeBasedResponse(message, language);
      return res.json(fallback);
    }
  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({
      error: 'An internal server error occurred while processing health query.',
      text: 'Our health assistant encountered a temporary connectivity issue. Please ensure you seek advice from a licensed medical professional for urgent health concerns.'
    });
  }
});

// Non-Diagnostic Symptom Risk Assessment Endpoint
app.post('/api/symptom-check', (req, res) => {
  try {
    const data = req.body;
    const { 
      primarySymptoms = [], 
      duration = '1-3 days', 
      severity = 5, 
      redFlags = [], 
      ageGroup = 'Adult (20-59)' 
    } = data;

    let calculatedRiskLevel: '🟢 Low concern' | '🟡 Medical consultation recommended' | '🔴 Urgent medical attention recommended' = '🟢 Low concern';
    const matchingDiseases: any[] = [];
    const recommendations: string[] = [];
    const questionsForDoctor: string[] = [];

    // Transparent Rule-Based Logic for Red Flags & Triage
    const hasEmergencyRedFlags = redFlags && redFlags.length > 0;
    const isSevereRating = Number(severity) >= 8;
    const isChronicOrProlonged = duration === 'More than 2 weeks' || duration === '1-2 weeks';
    const isModerateRating = Number(severity) >= 5 || primarySymptoms.length >= 3;

    if (hasEmergencyRedFlags || isSevereRating) {
      calculatedRiskLevel = '🔴 Urgent medical attention recommended';
    } else if (isModerateRating || isChronicOrProlonged) {
      calculatedRiskLevel = '🟡 Medical consultation recommended';
    } else {
      calculatedRiskLevel = '🟢 Low concern';
    }

    const symptomsLower = primarySymptoms.map((s: string) => s.toLowerCase());

    // Evaluate matching patterns for public health awareness
    if (symptomsLower.some((s: string) => s.includes('fever') || s.includes('high fever'))) {
      if (symptomsLower.some((s: string) => s.includes('joint') || s.includes('eye pain') || s.includes('rash'))) {
        matchingDiseases.push({
          diseaseName: 'Vector-Borne Febrile Pattern (Dengue / Chikungunya Spectrum)',
          confidence: 84,
          keyMatch: 'High fever accompanied by retro-orbital pain, severe joint aches, or skin rash.',
          riskCategory: 'High'
        });
      }
      if (symptomsLower.some((s: string) => s.includes('chill') || s.includes('shivering'))) {
        matchingDiseases.push({
          diseaseName: 'Parasitic Febrile Pattern (Malaria Spectrum)',
          confidence: 80,
          keyMatch: 'Periodic high fever with violent shivering, chills, and sweating cycles.',
          riskCategory: 'High'
        });
      }
      if (symptomsLower.some((s: string) => s.includes('stomach') || s.includes('step-ladder'))) {
        matchingDiseases.push({
          diseaseName: 'Enteric Febrile Pattern (Typhoid Spectrum)',
          confidence: 72,
          keyMatch: 'Gradual step-ladder fever paired with gastrointestinal discomfort.',
          riskCategory: 'Moderate'
        });
      }
    }

    if (symptomsLower.some((s: string) => s.includes('cough') || s.includes('breath'))) {
      if (isChronicOrProlonged) {
        matchingDiseases.push({
          diseaseName: 'Chronic Respiratory Pattern (Tuberculosis / Bronchial Spectrum)',
          confidence: 78,
          keyMatch: 'Persistent cough exceeding 2 weeks with evening fever or weight loss.',
          riskCategory: 'Severe'
        });
      } else {
        matchingDiseases.push({
          diseaseName: 'Acute Viral Respiratory Pattern (Influenza / Seasonal Viral)',
          confidence: 75,
          keyMatch: 'Acute onset cough, sore throat, and generalized body aches.',
          riskCategory: 'Moderate'
        });
      }
    }

    if (symptomsLower.some((s: string) => s.includes('diarrhea') || s.includes('vomit') || s.includes('loose stool'))) {
      matchingDiseases.push({
        diseaseName: 'Acute Waterborne / Gastroenteritis Pattern',
        confidence: 82,
        keyMatch: 'Frequent loose watery stools and nausea/vomiting risking dehydration.',
        riskCategory: severity > 6 ? 'Severe' : 'Moderate'
      });
    }

    // Default match if generic
    if (matchingDiseases.length === 0) {
      matchingDiseases.push({
        diseaseName: 'General Acute Febrile or Viral Syndrome',
        confidence: 65,
        keyMatch: 'Non-specific systemic symptoms requiring clinical observation.',
        riskCategory: 'Moderate'
      });
    }

    // Transparent Recommendations based on risk
    if (calculatedRiskLevel === '🔴 Urgent medical attention recommended') {
      recommendations.push('🚨 Immediate Clinical Evaluation: Proceed to the nearest hospital Emergency Department (Casualty/ICU) or call 108.');
      recommendations.push('Do NOT delay care or attempt unverified home remedies.');
      recommendations.push('Keep the patient in a comfortable resting position and monitor breathing rate.');
    } else if (calculatedRiskLevel === '🟡 Medical consultation recommended') {
      recommendations.push('Visit your local Primary Health Centre (PHC) or consulting physician within 24–48 hours.');
      recommendations.push('Maintain strict oral fluid hydration (ORS, boiled water, coconut water).');
      recommendations.push('Avoid NSAIDs (Aspirin/Brufen) without medical advice.');
      recommendations.push('Rest in a mosquito-free, well-ventilated environment.');
    } else {
      recommendations.push('Ensure adequate rest, hydration, and light nutritious meals.');
      recommendations.push('Monitor temperature twice daily with a digital thermometer.');
      recommendations.push('If symptoms persist beyond 3 days or worsen, schedule a physician visit.');
    }

    questionsForDoctor.push('Should I undergo laboratory blood investigations (CBC, Platelets, Dengue NS1, Malaria Smear)?');
    questionsForDoctor.push('What specific red flag warning signs should prompt emergency hospital admission?');
    questionsForDoctor.push('Are there specific dietary guidelines or fluid intake targets for my condition?');

    return res.json({
      riskLevel: calculatedRiskLevel,
      matchingDiseases,
      recommendations,
      questionsForDoctor,
      emergencyAdvice: calculatedRiskLevel === '🔴 Urgent medical attention recommended' 
        ? 'Red flag danger signs detected. Call 108 / 112 immediately or proceed to the nearest emergency room.' 
        : undefined,
      disclaimer: 'This automated symptom risk assessment is for public health education and preliminary triage guidance only. It is NOT a disease prediction or clinical diagnosis. Always consult a certified healthcare professional.'
    });
  } catch (err: any) {
    console.error('Symptom checker error:', err);
    res.status(500).json({ error: 'Failed to process symptom evaluation.' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'SwasthyaVani Public Health AI Backend (RAG & Safety Layer)',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    version: '2.0.0'
  });
});

// Outbreak Health Alerts endpoint
app.get('/api/alerts', (req, res) => {
  const { severity, activeOnly } = req.query;
  let results = [...INITIAL_HEALTH_ALERTS];
  if (activeOnly === 'true') {
    results = results.filter(a => a.active);
  }
  if (severity && typeof severity === 'string') {
    results = results.filter(a => a.severity.toLowerCase() === severity.toLowerCase());
  }
  res.json({
    count: results.length,
    alerts: results,
    verifiedAuthoritySource: 'Integrated Disease Surveillance Programme (IDSP) & MoHFW'
  });
});

// Verified Diseases Knowledge Base endpoint
app.get('/api/diseases', (req, res) => {
  const { category, search } = req.query;
  let results = [...DISEASES_DATA];
  if (category && typeof category === 'string' && category !== 'All') {
    results = results.filter(d => d.category.toLowerCase() === category.toLowerCase());
  }
  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    results = results.filter(d => 
      d.name.toLowerCase().includes(q) || 
      (d.hindiName && d.hindiName.toLowerCase().includes(q)) || 
      d.category.toLowerCase().includes(q) ||
      d.earlySymptoms.some(s => s.toLowerCase().includes(q)) ||
      d.severeSymptoms.some(s => s.toLowerCase().includes(q))
    );
  }
  res.json({
    count: results.length,
    diseases: results
  });
});

// Start Express Server with Vite middleware in development or static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SwasthyaVani Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
