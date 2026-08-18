import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (err) {
      console.warn('Failed to initialize Gemini client:', err);
    }
  }
  return aiClient;
}

// Public Health Fallback Knowledge Base Engine
function generateKnowledgeBasedResponse(userQuery: string, language: string = 'en') {
  const query = userQuery.toLowerCase();
  
  if (query.includes('dengue') || query.includes('platelet') || query.includes('breakbone')) {
    return {
      text: `### 🦟 Dengue Fever Awareness & Protocol

**Key Highlights:**
* **Nature:** Viral infection transmitted primarily by daytime-biting *Aedes aegypti* mosquitoes.
* **Classic Signs:** Sudden high-grade fever (103-104°F), severe retro-orbital eye pain, intense muscle/joint pain ("breakbone fever"), and characteristic rash around Day 3-5.
* **Critical Phase (Days 3–7):** When fever begins to subside, monitor closely for plasma leakage and platelet drops.

**Crucial Warning Signs (Seek Emergency Care Immediately):**
1. Persistent severe abdominal pain and continuous vomiting
2. Bleeding from gums, nose, or blood in stool/vomit
3. Extreme drowsiness, confusion, or restlessness
4. Rapid drop in platelets (<50,000/μL)

**Management & Prevention:**
* **Hydration First:** Drink plenty of fluids—Oral Rehydration Salts (ORS), coconut water, clear broths, and clean water.
* **Medication Caution:** Use only Paracetamol for fever relief under medical advice. **NEVER take Aspirin, Ibuprofen, or Brufen** as they increase bleeding risks.
* **Eliminate Stagnant Water:** Empty coolers, flowerpot trays, and open containers weekly ("Sunday Dry Day").

*Source: WHO & NVBDCP Public Health Guidelines*`,
      sources: ['National Vector Borne Disease Control Programme (NVBDCP)', 'World Health Organization (WHO)'],
      warningLevel: query.includes('bleed') || query.includes('platelet') ? 'caution' : 'normal',
      suggestedQuestions: [
        'How does Dengue differ from Malaria?',
        'What should I do if platelets drop below 50,000?',
        'What are the best mosquito repellent measures?'
      ]
    };
  }

  if (query.includes('malaria') || query.includes('shivering') || query.includes('chills') || query.includes('anopheles')) {
    return {
      text: `### 🦠 Malaria Awareness & Treatment Guidelines

**Key Highlights:**
* **Nature:** Parasitic infection caused by *Plasmodium* parasites (*P. vivax* and *P. falciparum*), transmitted through night-biting female *Anopheles* mosquitoes.
* **3-Stage Symptom Cycle:**
  1. **Cold Stage:** Violent shivering, teeth chattering, and feeling intensely cold.
  2. **Hot Stage:** High fever (103°F-105°F), severe headache, and vomiting.
  3. **Sweating Stage:** Profuse sweating as fever breaks, leaving the patient fatigued.

**Critical Public Health Actions:**
* **Accurate Testing:** Get a Rapid Diagnostic Test (RDT) or peripheral blood smear examination done at the nearest Primary Health Centre.
* **Complete the Full Course:** Always finish the entire course of prescribed Artemisinin-based Combination Therapy (ACT) or Chloroquine/Primaquine to prevent relapse and drug resistance.
* **Prevention:** Sleep under Long-Lasting Insecticide-treated Nets (LLINs) and eliminate puddles around the home.

*Source: National Vector Borne Disease Control Programme (MoHFW)*`,
      sources: ['NVBDCP - Ministry of Health and Family Welfare', 'WHO Malaria Factsheet'],
      warningLevel: 'normal',
      suggestedQuestions: [
        'Why must antimalarial medicines be taken for the full course?',
        'How do I protect my child from mosquito bites during sleep?',
        'What is cerebral malaria?'
      ]
    };
  }

  if (query.includes('tuberculosis') || query.includes('tb') || query.includes('cough') || query.includes('nikshay')) {
    return {
      text: `### 🫁 Tuberculosis (TB) Awareness & Government Support

**Key Facts:**
* **Airborne Bacteria:** Caused by *Mycobacterium tuberculosis*, spreading when a person with active pulmonary TB coughs, sneezes, or spits.
* **Classic Symptoms:**
  * Persistent cough lasting **2 weeks or more**
  * Low-grade fever, especially in late afternoons and evenings
  * Unexplained weight loss and night sweats
  * Blood-tinged sputum (Hemoptysis) in advanced stages

**Important Public Health Support in India:**
* **100% Free Diagnostics & Medicines:** Under the **National TB Elimination Program (NTEP / Ni-kshay)**, state-of-the-art CBNAAT/TrueNat tests and full 6-month DOTS medications are provided free at every government dispensary.
* **Direct Benefit Transfer (DBT):** Patients receive ₹500/month for nutritional support under *Ni-kshay Poshan Yojana*.
* **100% Curable:** TB is completely curable if the full treatment is completed without interruption.

*Source: National TB Elimination Programme (NTEP), MoHFW*`,
      sources: ['NTEP - Ministry of Health & Family Welfare', 'WHO Global TB Programme'],
      warningLevel: query.includes('blood') ? 'caution' : 'normal',
      suggestedQuestions: [
        'How to access free TB testing at government clinics?',
        'What is the difference between latent TB and active TB?',
        'How does BCG vaccine protect infants?'
      ]
    };
  }

  if (query.includes('rabies') || query.includes('dog bite') || query.includes('animal bite') || query.includes('scratch')) {
    return {
      text: `### ⚠️ Rabies Emergency Protocol & Bite Care

**CRITICAL EMERGENCY FIRST-AID:**
If you or someone was bitten or scratched by a stray dog, cat, monkey, or wild animal:

1. **WASH IMMEDIATELY (Life-Saving Step):**
   * Wash the wound vigorously with running tap water and soap for **at least 15 continuous minutes**.
   * Apply povidone-iodine (Betadine) antiseptic.
   * **DO NOT** apply chili powder, turmeric, lime, leaves, or band-aids to the bite wound.

2. **GO TO THE NEAREST HOSPITAL TODAY:**
   * Receive the **Anti-Rabies Vaccine (ARV)** series (Day 0, 3, 7, 28).
   * For deep bites with bleeding (Category III), **Rabies Immunoglobulin (RIG)** must be infiltrated around the wound on Day 0.
   * *Anti-rabies vaccines are provided FREE at government hospitals across India.*

**Remember:** Rabies is nearly 100% fatal once clinical symptoms appear, but **100% preventable** with immediate wound washing and prompt post-exposure vaccination!

*Source: National Rabies Control Programme (NRCP) & WHO*`,
      sources: ['National Rabies Control Programme', 'World Health Organization (WHO)'],
      warningLevel: 'emergency',
      suggestedQuestions: [
        'Do I need injections if the puppy did not draw blood?',
        'Are modern rabies injections given in the stomach or arm?',
        'How soon must the first dose of rabies vaccine be given?'
      ]
    };
  }

  if (query.includes('diarrhea') || query.includes('cholera') || query.includes('vomit') || query.includes('ors') || query.includes('hydration')) {
    return {
      text: `### 💧 Diarrhea, Cholera & Dehydration First-Aid

**Immediate Triage Protocol:**
* **Prevent Dehydration First:** The single most important treatment for acute diarrhea and vomiting is immediate fluid and electrolyte replenishment.
* **Standard ORS Recipe:**
  * Mix 1 standard packet of WHO-formula **Oral Rehydration Salts (ORS)** in **1 Litre of clean, boiled and cooled drinking water**.
  * Sip continuously after every loose stool.
  * **Homemade Emergency ORS:** 6 level teaspoons of sugar + 1/2 level teaspoon of salt in 1 litre of clean water.
* **Zinc Supplementation:** Give Zinc (20mg/day for 14 days) to children under 5 to accelerate gut healing.

**Red Flag Danger Signs (Visit Hospital Immediately):**
* Sunken eyes, extreme thirst, dry tongue, or lethargy
* Inability to drink or keep any fluids down
* Blood in stools
* No urination for more than 6-8 hours

*Source: WHO / UNICEF Acute Diarrhea Management Guidelines*`,
      sources: ['WHO Diarrheal Disease Guidelines', 'MoHFW Child Health Division'],
      warningLevel: 'normal',
      suggestedQuestions: [
        'How to purify drinking water at home during monsoon floods?',
        'When should a child with diarrhea receive antibiotics?',
        'What foods are easiest to digest during stomach infections?'
      ]
    };
  }

  if (query.includes('diabetes') || query.includes('sugar') || query.includes('bp') || query.includes('hypertension') || query.includes('blood pressure')) {
    return {
      text: `### ❤️ Chronic Lifestyle Health: Diabetes & Blood Pressure Management

**Key Preventive Pillars:**
* **Dietary Sodium Reduction:** Limit daily salt to less than **5 grams (<1 level teaspoon per day)** to prevent hypertension and stroke.
* **Balanced Nutrition:** Emphasize high-fiber whole grains (millets, brown rice, oats), legumes, fresh leafy greens; minimize refined sugar, maida, and deep-fried snacks.
* **Physical Activity:** Aim for at least **150 minutes of moderate aerobic exercise** (brisk walking, cycling, yoga) every week.
* **Regular Health Screenings:**
  * Fasting Blood Sugar (<100 mg/dL normal; >126 mg/dL indicative of diabetes)
  * HbA1c (<5.7% normal; >6.5% diabetic)
  * Blood Pressure (<120/80 mmHg ideal; >140/90 mmHg requires medical attention)

**Important Rule:** Never discontinue prescribed hypertension or diabetes medications abruptly without consulting your physician.

*Source: Indian Council of Medical Research (ICMR) & India Hypertension Control Initiative (IHCI)*`,
      sources: ['ICMR Guidelines for Management of Type 2 Diabetes', 'India Hypertension Control Initiative (IHCI)'],
      warningLevel: 'normal',
      suggestedQuestions: [
        'What are the early subtle symptoms of Type 2 Diabetes?',
        'Why is high blood pressure called the "Silent Killer"?',
        'How does walking 30 minutes daily help regulate blood sugar?'
      ]
    };
  }

  // General comprehensive health assistant fallback
  return {
    text: `### 🩺 SwasthyaVani Public Health Guidance

Thank you for your question regarding **"${userQuery.trim()}"**.

**General Public Health Principles:**
1. **Early Medical Attention:** If you are experiencing concerning physical symptoms such as unexplained high fever, persistent cough, localized pain, or digestive changes lasting more than 48 hours, consult a qualified medical practitioner at your local Primary Health Centre (PHC) or Community Health Centre (CHC).
2. **Hygiene & Sanitation:** Wash hands frequently with soap, drink clean boiled or filtered water, and ensure food is freshly prepared.
3. **Avoid Self-Medication:** Never take over-the-counter antibiotics or steroid medications without a doctor's formal prescription. Misuse leads to dangerous antimicrobial resistance.
4. **Vaccination & Prevention:** Stay up-to-date with national immunization schedules and seasonal advisories issued by the Ministry of Health and Family Welfare (MoHFW).

**Emergency Red Flag Signs:**
If you notice severe shortness of breath, sudden crushing chest pain, high fever with stiff neck/confusion, or uncontrollable bleeding, call **108 / 112** immediately for ambulance assistance.

*How else can I assist you with disease information, symptom checking, or preventive health tips?*`,
    sources: ['Ministry of Health and Family Welfare (MoHFW)', 'Indian Council of Medical Research (ICMR)', 'World Health Organization (WHO)'],
    warningLevel: 'normal',
    suggestedQuestions: [
      'What are the most common vector-borne diseases in India?',
      'How does the National Immunization Programme protect children?',
      'What precautions should I take during seasonal monsoon changes?'
    ]
  };
}

// API Routes
app.post('/api/chat', async (req, res) => {
  try {
    const { message, language = 'en', history = [], context = '' } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message text is required.' });
    }

    const gemini = getGeminiClient();

    if (gemini) {
      try {
        const systemInstruction = `You are "SwasthyaVani", an empathetic, authoritative, and medically grounded AI Public Health Assistant for verified disease awareness, symptom triage, and preventive education.
Your purpose is to promote disease awareness, explain symptoms, outline verified prevention and hygiene measures, debunk myths, and provide triage guidance in accordance with WHO, ICMR, and India's Ministry of Health and Family Welfare (MoHFW) standards.

MANDATORY RULES:
1. ALWAYS maintain a supportive, objective, and clear healthcare tone.
2. NEVER prescribe specific prescription medications (e.g. specific doses of antibiotics, steroids, prescription antihypertensives).
3. ALWAYS emphasize safe supportive care: hydration (ORS when appropriate), rest, nutrition, cooling measures for fever, and mosquito prevention.
4. For dangerous signs (e.g. chest pain, severe breathlessness, animal bites, continuous vomiting, bleeding, sudden neurological deficits), immediately highlight RED FLAG WARNINGS and advise urgent in-person medical or emergency hospital evaluation (Ambulance 108 / 112).
5. Format your answer with clear Markdown headings, bullet points, and highlight key terms.
6. Provide citations to verified public health authorities (e.g., [WHO], [ICMR], [MoHFW], [NVBDCP]).
7. Respond in the user's requested language (${language || 'English'}). If the query is in Hindi, reply in clear, respectful Hindi. If in English, reply in English.
8. End with a polite reminder that this is for public health education, not a definitive clinical diagnosis.`;

        const response = await gemini.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `${context ? `[Context: ${context}]\n` : ''}User Query: ${message}\nLanguage: ${language}`
                }
              ]
            }
          ],
          config: {
            systemInstruction,
            temperature: 0.3,
          }
        });

        const replyText = response.text || 'I could not generate a response. Please try again.';
        
        return res.json({
          text: replyText,
          sources: ['Indian Council of Medical Research (ICMR)', 'Ministry of Health and Family Welfare (MoHFW)', 'World Health Organization (WHO)'],
          warningLevel: replyText.toLowerCase().includes('emergency') || replyText.toLowerCase().includes('immediate hospital') ? 'caution' : 'normal',
          suggestedQuestions: [
            'What are the key prevention steps for this condition?',
            'When is it necessary to visit a primary health center?',
            'What diet or lifestyle changes support recovery?'
          ]
        });
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, falling back to verified knowledge engine:', geminiError?.message || geminiError);
        const fallback = generateKnowledgeBasedResponse(message, language);
        return res.json(fallback);
      }
    } else {
      // Fallback knowledge engine if no Gemini API Key is set
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

// Symptom Triage Assessment Endpoint
app.post('/api/symptom-check', (req, res) => {
  try {
    const data = req.body;
    const { primarySymptoms = [], duration = '1-3 days', severity = 5, redFlags = [], ageGroup = 'Adult (20-59)' } = data;

    let calculatedRiskLevel: 'Low' | 'Moderate' | 'High' | 'Emergency' = 'Low';
    const matchingDiseases: any[] = [];
    const recommendations: string[] = [];
    const questionsForDoctor: string[] = [];

    // Red flag trigger
    if (redFlags && redFlags.length > 0) {
      calculatedRiskLevel = 'Emergency';
    } else if (severity >= 8 || duration === 'More than 2 weeks') {
      calculatedRiskLevel = 'High';
    } else if (severity >= 5 || primarySymptoms.length >= 3) {
      calculatedRiskLevel = 'Moderate';
    } else {
      calculatedRiskLevel = 'Low';
    }

    const symptomsLower = primarySymptoms.map((s: string) => s.toLowerCase());

    // Evaluate matching patterns
    if (symptomsLower.some((s: string) => s.includes('fever') || s.includes('high fever'))) {
      if (symptomsLower.some((s: string) => s.includes('joint') || s.includes('eye pain') || s.includes('rash'))) {
        matchingDiseases.push({
          diseaseName: 'Dengue Fever / Vector-Borne Viral Illness',
          confidence: 84,
          keyMatch: 'Fever paired with retro-orbital eye pain, joint ache, or rash',
          riskCategory: 'High'
        });
      }
      if (symptomsLower.some((s: string) => s.includes('chill') || s.includes('shivering'))) {
        matchingDiseases.push({
          diseaseName: 'Malaria (Plasmodium Infection)',
          confidence: 80,
          keyMatch: 'Periodic high fever with intense shivering and sweating cycle',
          riskCategory: 'High'
        });
      }
      if (symptomsLower.some((s: string) => s.includes('stomach') || s.includes('step-ladder'))) {
        matchingDiseases.push({
          diseaseName: 'Typhoid (Enteric Fever)',
          confidence: 72,
          keyMatch: 'Gradual step-ladder fever with abdominal discomfort and coated tongue',
          riskCategory: 'Moderate'
        });
      }
    }

    if (symptomsLower.some((s: string) => s.includes('cough') || s.includes('breath'))) {
      if (duration === 'More than 2 weeks' || duration === '1-2 weeks') {
        matchingDiseases.push({
          diseaseName: 'Tuberculosis / Chronic Respiratory Infection',
          confidence: 78,
          keyMatch: 'Persistent cough exceeding 2 weeks with evening fever or weight loss',
          riskCategory: 'Severe'
        });
      } else {
        matchingDiseases.push({
          diseaseName: 'Seasonal Viral Respiratory Infection / Influenza',
          confidence: 75,
          keyMatch: 'Acute cough, sore throat, and generalized body aches',
          riskCategory: 'Moderate'
        });
      }
    }

    if (symptomsLower.some((s: string) => s.includes('diarrhea') || s.includes('vomit') || s.includes('loose stool'))) {
      matchingDiseases.push({
        diseaseName: 'Acute Gastroenteritis / Waterborne Infection',
        confidence: 82,
        keyMatch: 'Frequent loose watery stools and nausea/vomiting',
        riskCategory: severity > 6 ? 'Severe' : 'Moderate'
      });
    }

    // Default match if generic
    if (matchingDiseases.length === 0) {
      matchingDiseases.push({
        diseaseName: 'General Acute Febrile or Viral Illness',
        confidence: 65,
        keyMatch: 'Non-specific systemic symptoms requiring observation',
        riskCategory: 'Moderate'
      });
    }

    // Recommendations based on triage
    if (calculatedRiskLevel === 'Emergency') {
      recommendations.push('🚨 Immediate Hospital Evaluation: Proceed to the nearest emergency department or call ambulance 108.');
      recommendations.push('Do not attempt home remedies or unverified self-medication.');
      recommendations.push('Keep patient in a comfortable, seated or recovery position and monitor breathing.');
    } else if (calculatedRiskLevel === 'High') {
      recommendations.push('Visit your local Primary Health Centre (PHC) or consulting physician within the next 24 hours.');
      recommendations.push('Maintain strict oral fluid hydration (ORS, clean boiled water, coconut water).');
      recommendations.push('Avoid non-steroidal anti-inflammatory drugs (NSAIDs like Ibuprofen/Brufen) until dengue is ruled out.');
      recommendations.push('Rest in a well-ventilated room with mosquito net protection.');
    } else {
      recommendations.push('Ensure adequate rest, hydration, and easily digestible nutritious meals.');
      recommendations.push('Monitor body temperature with a thermometer twice daily.');
      recommendations.push('If symptoms persist beyond 3 days or worsen, schedule a routine consultation with a general physician.');
    }

    questionsForDoctor.push('Should I undergo blood investigations (e.g. Complete Blood Count, Platelets, Dengue NS1/IgM, Malaria Smear)?');
    questionsForDoctor.push('What warning signs should prompt immediate emergency hospital admission?');
    questionsForDoctor.push('Are there specific dietary restrictions or fluids recommended for my current state?');

    return res.json({
      riskLevel: calculatedRiskLevel,
      matchingDiseases,
      recommendations,
      questionsForDoctor,
      emergencyAdvice: calculatedRiskLevel === 'Emergency' ? 'Red flag symptoms detected. Call 108 / 112 immediately or proceed to the nearest emergency casualty ward.' : undefined,
      disclaimer: 'This automated triage assessment is for public health education and preliminary guidance only. It is NOT a clinical diagnosis or medical treatment plan. Always consult a certified healthcare professional.'
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
    service: 'SwasthyaVani Public Health AI Backend',
    version: '1.0.0'
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
