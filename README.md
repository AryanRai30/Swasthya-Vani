# 🏥 AI-Driven Public Health Chatbot for Disease Awareness

> **An AI-powered, multilingual public-health awareness platform that provides verified disease information, non-diagnostic symptom risk assessment, emergency warning detection, health alerts, and trusted health resources using Generative AI and Retrieval-Augmented Generation (RAG).**

---

## 📌 Project Overview

The **AI-Driven Public Health Chatbot for Disease Awareness** is an intelligent public-health information platform designed to help citizens access **reliable, understandable, and accessible disease-awareness information** through a conversational AI assistant.

Many people search for health information online but face several problems:

* Information is scattered across multiple websites.
* Medical information can be difficult to understand.
* Users may encounter misinformation or misleading health claims.
* Language barriers can prevent people from accessing useful information.
* People may not know when symptoms require professional medical attention.
* Rural and low-literacy users may face difficulties using conventional text-based platforms.
* Generic AI chatbots can produce inaccurate or hallucinated medical information.

This project addresses these challenges by combining:

* **Generative AI**
* **Retrieval-Augmented Generation (RAG)**
* **Verified health knowledge**
* **Multilingual interaction**
* **Non-diagnostic symptom risk assessment**
* **Emergency/red-flag detection**
* **Disease awareness resources**
* **Public-health alerts**
* **Administrative analytics**

The system is designed as a **health-awareness and decision-support platform**, not as a replacement for doctors or qualified healthcare professionals.

---

# 🎯 Problem Statement

## AI-Driven Public Health Chatbot for Disease Awareness

Citizens often struggle to obtain reliable, understandable, and timely information about diseases, symptoms, prevention methods, and public-health advisories.

Existing health information systems may be:

* difficult to navigate,
* language-specific,
* fragmented,
* inaccessible to low-literacy users,
* difficult to understand,
* or vulnerable to misinformation.

At the same time, general-purpose AI chatbots can generate confident but unsupported medical responses.

Therefore, there is a need for a **safe, multilingual, AI-driven public-health assistant** that can provide awareness information from verified sources, help users understand symptoms and warning signs without making a diagnosis, identify potentially urgent situations, and connect citizens with relevant health resources.

---

# 💡 Proposed Solution

We propose an **AI-Driven Public Health Chatbot for Disease Awareness** that acts as a centralized digital health-awareness assistant.

The platform allows users to:

1. Ask health and disease-awareness questions.
2. Receive AI-generated explanations based on verified health information.
3. Search a structured disease-awareness library.
4. Understand symptoms, transmission, prevention, and warning signs.
5. Perform a non-diagnostic symptom risk assessment.
6. Receive urgent warnings when potentially serious red-flag symptoms are detected.
7. Interact in English and Hindi (and regional languages).
8. View health alerts and public-health information.
9. Access trusted health resources and national hotlines (108, 1075).
10. Provide feedback on AI responses.

The platform also provides an **administrative dashboard** for managing health information, alerts, knowledge documents, and usage analytics.

---

# ⭐ Key Innovation

The core innovation is not simply "using an AI chatbot."

The project combines:

```text
Verified Health Knowledge
          ↓
       RAG System
          ↓
      Gemini AI
          ↓
    Safety Layer
          ↓
  Public Health Response
```

This architecture reduces the dependence on the model's general knowledge and helps prevent unsupported medical claims.

The platform also separates:

### AI-generated awareness
from
### Rule-based safety decisions

This is particularly important in a health-related application.

---

# 🚀 Major Features

## 1. 🤖 AI Health Chatbot

Users can interact with the platform using natural language.

Example questions:

```text
What are the symptoms of dengue?

How can I prevent malaria?

What causes tuberculosis?

What are the warning signs of dengue?

How does chikungunya spread?
```

The chatbot provides:

* Simple explanations
* Key points
* Prevention guidance
* Warning signs
* Relevant health information
* Sources
* Medical safety disclaimer

---

# 2. 🌐 Multilingual Support

The platform supports:

* English
* Hindi
* Basic Hinglish understanding

Examples:

```text
English:
"What are the symptoms of dengue?"

Hindi:
"डेंगू के लक्षण क्या हैं?"

Hinglish:
"Dengue se kaise bach sakte hain?"
```

The goal is to make health information more accessible to users who may not be comfortable communicating in English.

---

# 3. 📚 Disease Awareness Library

The application contains structured information about important diseases.

Initial disease coverage includes:

* Dengue
* Malaria
* Tuberculosis
* Chikungunya
* Typhoid
* Influenza
* Cholera
* Hepatitis
* Diabetes
* Hypertension
* Rabies
* Nutritional Anemia

Each disease record contains:

```text
Overview & Summary
Etiology & Causes
Symptoms Spectrum (Early vs Severe)
Transmission Modes & Vectors
Risk Factors & Vulnerable Groups
Prevention & Vaccination
Warning Signs (Emergency Red Flags)
When to Seek Professional Medical Help
FAQs
Myths vs Facts
Authoritative Sources (WHO, ICMR, MoHFW, CDC)
```

Users can search and browse diseases without interacting with the AI.

---

# 4. 🩺 Non-Diagnostic Symptom Risk Assessment

The platform provides a structured symptom assessment feature.

Users can enter information such as:

* Age group
* Symptoms
* Duration
* Severity
* Relevant follow-up information

The system provides an awareness-oriented result such as:

### 🟢 Low Concern
General health awareness information.

### 🟡 Medical Consultation Recommended
The user may benefit from consulting a qualified healthcare professional.

### 🔴 Urgent Medical Attention Recommended
Potentially serious warning signs have been identified.

### Important
The system does **not diagnose diseases**. The symptom assessment is intended only for awareness, early risk recognition, and guidance about seeking professional medical care.

---

# 5. 🚨 Emergency / Red-Flag Detection

The platform includes a safety layer for potentially urgent situations.

Examples of potentially serious symptoms include:

* Severe difficulty breathing
* Severe chest pain
* Loss of consciousness
* Seizures
* Severe bleeding
* Severe confusion
* Other clearly urgent warning signs

When such information is detected, the platform prioritizes an urgent safety message instead of giving a lengthy generic response.

Example:

> ⚠️ These symptoms may require urgent medical attention. Please seek immediate professional medical care or call 108 immediately.

The system does not attempt to determine the exact disease causing the emergency.

---

# 6. 📖 Retrieval-Augmented Generation (RAG)

RAG is one of the core technologies of the project.

Instead of allowing Gemini to answer entirely from general model knowledge, the platform retrieves relevant information from a verified health knowledge base.

### Basic flow

```text
User Question
      ↓
Question Processing
      ↓
Knowledge Retrieval
      ↓
Relevant Verified Documents
      ↓
Gemini
      ↓
Safety Validation
      ↓
Final Response
```

This allows the application to provide more grounded answers.

---

# 7. 🔗 Source Transparency

Health-related AI responses should be trustworthy.

Therefore, where applicable, the platform displays:

* Source name
* Knowledge document
* Relevant reference information (e.g. WHO, ICMR, MoHFW, NCDC)

The system should never invent a source. If reliable information cannot be retrieved, the system communicates uncertainty instead of generating unsupported claims.

---

# 8. 🔔 Public Health Alerts

The platform provides a section for public-health alerts.

An alert can contain:

```text
Disease
Region
Severity
Description
Date
Source
Status
```

Example:

```text
🚨 Dengue Awareness Alert

Region: High Risk Surveillance Zones
Severity: High
Information: Increased vector control and prevention measures are recommended.
Source: Verified public-health surveillance data
```

---

# 9. 📊 Admin Dashboard

The administrative dashboard allows authorized administrators to manage the platform.

Possible dashboard metrics include:

```text
Total Users
Total Chatbot Queries
Popular Diseases
Most Asked Topics
Health Alerts
Knowledge Documents
User Feedback
```

Administrators can manage:

* Diseases
* FAQs
* Knowledge documents
* Health alerts
* Awareness content
* Basic analytics

---

# 10. 🎤 Voice & Multimodal Interaction

The system supports voice-assisted workflows:

```text
Microphone (Speech Input)
    ↓
Speech-to-Text
    ↓
AI Chatbot / RAG Retrieval
    ↓
Response Generation
    ↓
Text-to-Speech (Audio Voice Response)
```

Voice interaction improves accessibility for:

* Elderly users
* Low-literacy users
* Users uncomfortable with typing
* Users who prefer speaking in regional languages

---

# 🛡️ Medical Safety Principles

Because this is a healthcare-related project, safety is a core design requirement.

The platform must:

### ✅ Do
* Provide health-awareness information.
* Use verified knowledge where possible.
* Display sources and references.
* Encourage professional medical consultation.
* Identify potentially urgent warning signs.
* Clearly communicate uncertainty.
* Protect API credentials via server-side routes.
* Minimize unnecessary personal data collection.

### ❌ Do Not
* Diagnose a disease.
* Claim certainty about a user's medical condition.
* Prescribe medication or dosage.
* Replace doctors.
* Invent health information or public-health outbreaks.
* Invent citations.
* Tell users to ignore serious symptoms.

---

# ⚠️ Medical Disclaimer

The application clearly communicates:

> **This platform is designed for health awareness and educational purposes only. It does not provide medical diagnosis, treatment, or professional medical advice. Users should consult qualified healthcare professionals for medical concerns. In emergencies, seek immediate professional medical care (Call 108 / 112).**

---

# 🧠 AI Architecture

The AI system is divided into multiple layers:

```text
                    USER
                      │
                      ▼
              ┌───────────────┐
              │ React Frontend│
              └───────┬───────┘
                      │
                      ▼
             ┌─────────────────┐
             │ Application API │
             └───────┬─────────┘
                     │
           ┌─────────┴─────────┐
           │                   │
           ▼                   ▼
    Symptom Safety        AI Chat System
        Engine                  │
           │                    ▼
           │             ┌──────────────┐
           │             │ RAG Retrieval│
           │             └──────┬───────┘
           │                    │
           │                    ▼
           │             Verified Knowledge
           │                    │
           │                    ▼
           │               Gemini AI
           │                    │
           └──────────┬─────────┘
                      ▼
                Safety Filter
                      │
                      ▼
               Final Response
```

---

# 🏗️ System Architecture

```text
┌─────────────────────────────────────────────┐
│                 USER                        │
│        Web / Mobile Responsive UI           │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────┐
│             REACT FRONTEND                  │
│                                             │
│ Chat │ Diseases │ Symptoms │ Alerts │ Admin │
└──────────────────────┬──────────────────────┘
                       │
                       │ REST API (/api/*)
                       ▼
┌─────────────────────────────────────────────┐
│             APPLICATION BACKEND             │
│                                             │
│ Auth │ Chat │ Disease │ Symptoms │ Alerts   │
└─────────────┬───────────────────┬───────────┘
              │                   │
              ▼                   ▼
        ┌───────────┐       ┌───────────────┐
        │ Database  │       │   Gemini AI   │
        └───────────┘       └───────┬───────┘
                                    │
                                    ▼
                            ┌───────────────┐
                            │ RAG / Knowledge│
                            │     Base       │
                            └───────────────┘
```

---

# 🛠️ Technology Stack

## Frontend
* **React 18** with **TypeScript**
* **Vite** (Build Tool & Dev Server)
* **Tailwind CSS** (Styling & Responsive Utility Engine)
* **Lucide React** (Medical & UI Icons)
* **Web Speech API** (Voice Input & Text-to-Speech Output)

## Backend & API
* **Node.js** & **Express**
* **Google GenAI SDK** (`@google/genai`)
* **Server-side API Proxy** (`/api/*`) for Gemini API key security

## Artificial Intelligence
* **Google Gemini API** (`gemini-2.5-flash`)
* **Retrieval-Augmented Generation (RAG)**
* **Prompt Engineering** with Medical Safety System Instructions
* **Heuristic Rule-Based Emergency & Red-Flag Evaluator**

---

# 📂 Repository Structure

```text
.
├── src/
│   ├── components/
│   │   ├── AdminSection.tsx            # Surveillance analytics & management
│   │   ├── AuthModal.tsx               # Authentication & evaluation login modal
│   │   ├── ChatbotSection.tsx          # Conversational RAG AI assistant & voice
│   │   ├── DiseaseLibrarySection.tsx   # Verified disease guides & modal details
│   │   ├── EmergencyModal.tsx          # Quick-dial emergency hotline overlays
│   │   ├── Footer.tsx                  # Public health credits & disclaimers
│   │   ├── HealthAlertsSection.tsx     # Active outbreak & advisory feed
│   │   ├── HomeSection.tsx             # Main dashboard & triage entry points
│   │   ├── Navbar.tsx                  # Multilingual selector & navigation
│   │   └── SymptomCheckerSection.tsx   # Multi-step non-diagnostic triage engine
│   ├── data/
│   │   ├── diseases.ts                 # Authoritative disease knowledge base
│   │   ├── healthAlerts.ts             # Active public health advisories
│   │   └── translations.ts             # Multilingual localization dictionaries
│   ├── types/
│   │   └── index.ts                    # Global TypeScript interfaces & schemas
│   ├── App.tsx                         # Root application component & routing state
│   ├── main.tsx                        # React application DOM entry point
│   └── index.css                       # Tailwind CSS global styling
├── server.ts                           # Express server & Gemini API RAG routes
├── package.json                        # Project dependencies and npm scripts
├── tsconfig.json                       # TypeScript compiler configuration
├── vite.config.ts                      # Vite build configuration
├── metadata.json                       # Applet configuration & capabilities
└── README.md                           # Project documentation
```

---

# 🔐 Security & Environment Variables

Create a `.env` file in the root directory (never commit this file to public version control):

```env
# Gemini API Key (accessed server-side only)
GEMINI_API_KEY=your_gemini_api_key_here
```

A template is provided in `.env.example`:

```env
GEMINI_API_KEY=
```

---

# 💻 Quick Start / Local Development

### Prerequisites
* **Node.js** (v18 or higher)
* **npm** (v9 or higher)
* A valid **Google Gemini API Key** from [Google AI Studio](https://aistudio.google.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/AI-Driven-Public-Health-Chatbot.git
cd AI-Driven-Public-Health-Chatbot
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
cp .env.example .env
# Edit .env and paste your GEMINI_API_KEY
```

### 4. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 5. Production Build
```bash
npm run build
npm start
```

---

# 🤝 Contributing

Contributions, bug reports, and feature suggestions are welcome!

1. Fork the repository
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

# 📜 License & Medical Disclaimer

This project is licensed under the **MIT License**.

> **Disclaimer**: This software is intended strictly for public health education, disease awareness, and preliminary decision support. It is not a certified medical device and does not provide formal medical diagnoses or prescriptions. Always consult a qualified medical doctor or emergency services in health emergencies.
