import { Disease, DiseaseCategory } from '../types';

export const DISEASE_CATEGORIES: DiseaseCategory[] = [
  'All',
  'Vector-Borne',
  'Water & Foodborne',
  'Respiratory & Airborne',
  'Chronic & Lifestyle',
  'Viral & Zoonotic',
  'Nutritional & Deficiency'
];

export const DISEASES_DATA: Disease[] = [
  {
    id: 'dengue',
    name: 'Dengue Fever',
    hindiName: 'डेंगू बुखार (हड्डी तोड़ बुखार)',
    scientificName: 'Dengue virus (Flaviviridae / DENV 1-4)',
    category: 'Vector-Borne',
    summary: 'A mosquito-borne viral infection caused by four serotypes of the Dengue virus (DENV 1-4) transmitted by infected female Aedes mosquitoes. Characterized by sudden high fever, excruciating joint/muscle aches, and retro-orbital headaches.',
    causes: [
      'Infection by Dengue virus serotypes (DENV-1, DENV-2, DENV-3, DENV-4)',
      'Primary vector: Aedes aegypti mosquito; secondary vector: Aedes albopictus',
      'Viral replication triggering capillary permeability, plasma leakage, and thrombocytopenia (platelet reduction)'
    ],
    transmission: [
      'Bite of infected female Aedes aegypti and Aedes albopictus mosquitoes',
      'Daytime biting peak: early morning (after sunrise) and late afternoon (before sunset)',
      'Mosquitoes breed in clean, artificial stagnant water containers (coolers, roof tanks, tires, flower vases)',
      'Non-contagious: Cannot be transmitted directly from person-to-person through touch or saliva'
    ],
    earlySymptoms: [
      'Sudden onset of high fever (104°F / 40°C)',
      'Severe headache and excruciating retro-orbital pain (pain behind the eyes)',
      'Severe muscle, bone, and joint aches ("Breakbone fever")',
      'Nausea, persistent loss of appetite, and vomiting',
      'Maculopapular skin rash appearing 2 to 5 days after fever onset'
    ],
    severeSymptoms: [
      'Severe persistent abdominal pain and continuous vomiting',
      'Mucosal bleeding (bleeding gums, epistaxis/nosebleeds, hematuria)',
      'Fluid accumulation in lungs (pleural effusion) or abdomen (ascites)',
      'Marked thrombocytopenia (platelet count dropping below 50,000/μL)',
      'Dengue Shock Syndrome (DSS): weak rapid pulse, narrow pulse pressure, cold clammy extremities'
    ],
    riskFactors: [
      'Secondary infection with a different DENV serotype (greatly increases risk of Severe Dengue)',
      'Living in or traveling to tropical and subtropical urban/semi-urban areas',
      'Open water storage and lack of weekly container cleaning',
      'Infants, young children, pregnant women, and elderly individuals with chronic co-morbidities'
    ],
    prevention: [
      'Implement "Dry Day" weekly: empty, scrub, and dry all water coolers, buckets, and plant saucers',
      'Apply DEET (20-30%) or Picaridin-based insect repellent to exposed skin',
      'Wear light-colored, full-sleeve shirts and long trousers',
      'Install fine wire-mesh screens on all windows and doors',
      'Avoid NSAIDs (Aspirin, Ibuprofen, Diclofenac) which worsen bleeding; use Paracetamol only under medical advice'
    ],
    warningSigns: [
      'Persistent vomiting (inability to tolerate oral fluids)',
      'Severe abdominal pain or tenderness',
      'Spontaneous bleeding from gums, nose, or blood in stool/vomit',
      'Rapid breathing or shortness of breath',
      'Extreme fatigue, restlessness, or sudden drop in body temperature (hypothermia)'
    ],
    whenToSeekMedicalHelp: [
      'Day 3 to 7 of illness when fever starts dropping (the critical phase for plasma leakage)',
      'Platelet count dropping below 100,000/μL or hematocrit rising by >20%',
      'Inability to drink oral fluids, leading to severe dehydration (sunken eyes, no urination)',
      'Presence of any warning red flag signs warrants immediate casualty/emergency hospital admission'
    ],
    faqs: [
      {
        question: 'Does every dengue patient require a platelet transfusion?',
        answer: 'No. Clinical guidelines from WHO and ICMR state that prophylactic platelet transfusion is NOT required unless counts fall below 10,000-20,000/μL or there is active mucosal bleeding. Hydration is the primary life-saving intervention.'
      },
      {
        question: 'Can I get dengue more than once?',
        answer: 'Yes. There are 4 distinct viral serotypes. Recovery from one provides lifelong immunity to that specific serotype, but only temporary cross-immunity to others. Secondary infection with another serotype carries higher risk of severe dengue.'
      },
      {
        question: 'Is papaya leaf extract a scientifically proven cure for dengue?',
        answer: 'While small studies show papaya leaf extract may modestly stimulate platelet production, it does NOT eliminate the virus or prevent plasma leakage. It must never replace clinical hydration monitoring and medical supervision.'
      }
    ],
    mythsVsFacts: [
      {
        myth: 'Dengue mosquitoes breed in dirty sewer drains.',
        fact: 'Aedes mosquitoes prefer clean, stagnant artificial water collections like flowerpot trays, AC trays, discarded tires, and domestic water tanks.',
        explanation: 'Culex mosquitoes breed in dirty drains, while Aedes aegypti (dengue vector) specifically thrives in clean stagnant domestic water.'
      },
      {
        myth: 'Taking Aspirin or Brufen is safe for quick dengue fever relief.',
        fact: 'Aspirin, Ibuprofen, and other NSAIDs are strictly contraindicated in dengue as they inhibit platelet aggregation and cause gastric bleeding.',
        explanation: 'Only Paracetamol should be used in recommended doses under a doctor’s guidance.'
      }
    ],
    sources: [
      'World Health Organization (WHO) - Dengue and Severe Dengue Factsheet',
      'National Center for Vector Borne Diseases Control (NCVBDC), Ministry of Health and Family Welfare, India',
      'Indian Council of Medical Research (ICMR) - Clinical Management Protocol for Dengue Fever'
    ],
    whoReference: 'WHO Factsheet on Dengue / NCVBDC National Guidelines 2024',
    vaccinationAvailable: false,
    vaccineDetails: 'Dengvaxia and Qdenga are approved in select international territories with strict pre-screening; vector control and early fluid management remain universal standards in India.',
    riskLevel: 'High',
    endemicRegions: 'All states across India, with peak transmission during and post-monsoon (July - November)',
    iconName: 'Bug'
  },
  {
    id: 'malaria',
    name: 'Malaria',
    hindiName: 'मलेरिया (शीत ज्वर)',
    scientificName: 'Plasmodium vivax & Plasmodium falciparum',
    category: 'Vector-Borne',
    summary: 'A life-threatening protozoan parasitic infection transmitted through the bite of infected female Anopheles mosquitoes. Known for its cyclical paroxysms of violent shivering chills, burning high fever, and drenching sweats.',
    causes: [
      'Infection by Plasmodium protozoan parasites (mainly P. vivax and P. falciparum in India)',
      'Female Anopheles mosquito vector inoculating sporozoites into the bloodstream',
      'Parasite invasion and replication within liver hepatocytes followed by rupture of red blood cells (erythrocytes)'
    ],
    transmission: [
      'Bite of infected female Anopheles mosquitoes, primarily active from dusk to dawn (night biting)',
      'Mosquitoes breed in clean natural water bodies, slow-moving streams, irrigation ditches, and paddy fields',
      'Rarely transmitted via blood transfusion, organ transplant, or congenital mother-to-child transmission'
    ],
    earlySymptoms: [
      'Paroxysms of shivering chills (teeth-chattering cold stage)',
      'High-grade fever (103°F - 105°F) with intense headache and vomiting (hot stage)',
      'Profuse, drenching perspiration as the temperature plummets, causing extreme exhaustion (sweating stage)',
      'Generalized myalgia, backache, and profound fatigue'
    ],
    severeSymptoms: [
      'Cerebral Malaria (P. falciparum): altered sensorium, seizures, confusion, coma',
      'Severe hemolytic anemia (hemoglobin < 5 g/dL)',
      'Acute kidney injury, metabolic acidosis, and jaundice (yellow eyes/skin)',
      'Blackwater fever (dark cola-colored urine due to intravascular hemolysis)',
      'Acute Respiratory Distress Syndrome (ARDS) and pulmonary edema'
    ],
    riskFactors: [
      'Living in or traveling to forested, tribal, or rural regions with high mosquito density',
      'Pregnant women (increased risk of maternal anemia, miscarriage, and low birth weight)',
      'Children under 5 years of age with incomplete immunity',
      'Individuals lacking bed net protection or sleeping outdoors in endemic zones'
    ],
    prevention: [
      'Sleep under Long-Lasting Insecticidal Nets (LLINs) every night',
      'Indoor Residual Spraying (IRS) of walls with approved insecticides',
      'Use biological control agents (Gambusia / Guppy fish) in water bodies to feed on mosquito larvae',
      'Take physician-prescribed chemoprophylaxis (e.g. Doxycycline / Mefloquine) when visiting high-risk endemic areas',
      'Eliminate standing water and clear vegetation around living premises'
    ],
    warningSigns: [
      'Inability to sit, stand, or feed due to extreme weakness',
      'Persistent vomiting and intolerance of oral antimalarial medication',
      'Confusion, hallucinations, fits (seizures), or unresponsiveness',
      'Passing dark red/black urine or yellowish skin and sclera'
    ],
    whenToSeekMedicalHelp: [
      'Any unexplained fever with chills in an endemic area warrants immediate blood smear or Rapid Diagnostic Test (RDT)',
      'Within 24 hours of fever onset to prevent progression to complicated falciparum malaria',
      'Immediately if pregnant or treating a child under 5 with fever'
    ],
    faqs: [
      {
        question: 'Why is it mandatory to complete the entire course of antimalarial drugs?',
        answer: 'Stopping medications prematurely once fever subsides leaves dormant hypnozoite parasites in the liver (especially in P. vivax), causing relapses weeks later and accelerating drug-resistant parasite strains.'
      },
      {
        question: 'How does malaria differ from dengue?',
        answer: 'Malaria is caused by a parasite transmitted by night-biting Anopheles mosquitoes and responds directly to antimalarial drugs. Dengue is viral, transmitted by daytime-biting Aedes mosquitoes, and is managed primarily through fluid replenishment.'
      }
    ],
    mythsVsFacts: [
      {
        myth: 'Malaria is caused by breathing bad air or foul odors from garbage.',
        fact: 'Malaria is strictly caused by microscopic Plasmodium parasites transmitted through female Anopheles mosquito bites.',
        explanation: 'The historical name "mal-aria" originated from the ancient belief in "bad air", which was disproven by modern bacteriology and parasitology.'
      },
      {
        myth: 'If fever disappears after two doses of medication, treatment can be stopped.',
        fact: 'The full prescribed course of ACT or Chloroquine/Primaquine must be completed to eradicate dormant liver stages and prevent relapse.',
        explanation: 'Incomplete therapy fuels drug resistance and severe secondary relapses.'
      }
    ],
    sources: [
      'World Health Organization (WHO) - World Malaria Report & Treatment Guidelines',
      'National Vector Borne Disease Control Programme (NVBDCP), MoHFW India',
      'ICMR - National Institute of Malaria Research (NIMR) Technical Protocols'
    ],
    whoReference: 'WHO Malaria Guidelines 2024 / MoHFW Malaria National Elimination Strategic Plan',
    vaccinationAvailable: true,
    vaccineDetails: 'WHO-recommended RTS,S/AS01 and R21/Matrix-M vaccines are rolling out in select high-burden African nations; targeted vector control and prompt ACT diagnosis remain India’s cornerstone.',
    riskLevel: 'High',
    endemicRegions: 'Odisha, Chhattisgarh, Jharkhand, Madhya Pradesh, North-Eastern states, and coastal belt clusters',
    iconName: 'ShieldAlert'
  },
  {
    id: 'tuberculosis',
    name: 'Tuberculosis (TB)',
    hindiName: 'क्षय रोग / टीबी (तपेदिक)',
    scientificName: 'Mycobacterium tuberculosis',
    category: 'Respiratory & Airborne',
    summary: 'A bacterial infectious disease caused by Mycobacterium tuberculosis that primarily attacks the lungs (pulmonary TB) but can affect any organ. It is airborne, fully curable with timely DOTS treatment, and supported by 100% free government diagnostics across India.',
    causes: [
      'Infection by the acid-fast rod-shaped bacterium Mycobacterium tuberculosis',
      'Inhalation of microscopic airborne droplet nuclei (1-5 microns) into lung alveoli',
      'Progression from latent TB infection to active disease due to weakened cell-mediated immunity'
    ],
    transmission: [
      'Airborne droplet transmission when a person with active pulmonary TB coughs, sneezes, speaks, or spits',
      'Droplets remain suspended in indoor air for several hours in poorly ventilated rooms',
      'Not transmitted by sharing utensils, touching clothes, shaking hands, or sharing food'
    ],
    earlySymptoms: [
      'Persistent cough lasting for 2 weeks or longer',
      'Low-grade evening fever with drenching night sweats',
      'Unexplained weight loss, chronic fatigue, and anorexia (loss of appetite)',
      'Chest pain and discomfort during deep breathing or coughing'
    ],
    severeSymptoms: [
      'Hemoptysis (coughing up blood or blood-streaked sputum)',
      'Progressive breathlessness and respiratory insufficiency',
      'Pleural effusion, lung cavitations, or pneumothorax',
      'Extrapulmonary TB manifestations (meningitis, spinal deformities/Pott disease, enlarged lymph nodes)'
    ],
    riskFactors: [
      'Immunocompromised states (HIV infection, uncontrolled diabetes, organ transplant, chemotherapy)',
      'Malnutrition and low Body Mass Index (BMI < 18.5)',
      'Tobacco smoking and heavy alcohol consumption',
      'Living in crowded, poorly ventilated slums, prisons, or dormitories'
    ],
    prevention: [
      'BCG (Bacille Calmette-Guérin) vaccination administered to all newborns under the Universal Immunization Programme (UIP)',
      'Practicing respiratory hygiene: covering mouth and nose with handkerchief or elbow when coughing',
      'Ensuring cross-ventilation in rooms and maximizing natural sunlight exposure',
      'Preventive therapy (TPT - TB Preventive Treatment) for household contacts of active TB patients',
      'Avoiding public spitting'
    ],
    warningSigns: [
      'Coughing up copious amounts of fresh red blood',
      'Sudden onset severe chest pain and severe breathlessness',
      'High fever with stiff neck, severe headache, or confusion (suspected TB meningitis)',
      'Extreme emaciation and inability to consume meals'
    ],
    whenToSeekMedicalHelp: [
      'Any cough persisting for more than 14 days warrants free CBNAAT/TrueNat testing at the nearest PHC/Dispensary',
      'Presence of unexplained weight loss accompanied by low-grade evening fever',
      'Household members living with an actively diagnosed TB patient'
    ],
    faqs: [
      {
        question: 'Is TB treatment really 100% free in India?',
        answer: 'Yes. Under the National TB Elimination Programme (NTEP) / Ni-kshay initiative, state-of-the-art molecular diagnostics (CBNAAT/TrueNat) and complete 6-month anti-TB medications are provided free of cost at all public health facilities.'
      },
      {
        question: 'What is Ni-kshay Poshan Yojana?',
        answer: 'It is a Direct Benefit Transfer (DBT) scheme where all registered TB patients receive financial assistance (₹500-1000/month) directly in their bank accounts for the duration of treatment to support high-protein nutritional needs.'
      },
      {
        question: 'What causes Multi-Drug Resistant TB (MDR-TB)?',
        answer: 'MDR-TB occurs when patients interrupt their treatment, take irregular doses, or are prescribed incorrect regimens, allowing bacteria to develop resistance to primary drugs (Isoniazid and Rifampicin).'
      }
    ],
    mythsVsFacts: [
      {
        myth: 'TB is an incurable genetic disease passed down through bloodlines.',
        fact: 'TB is NOT hereditary. It is an airborne bacterial infection that is 100% curable with a full course of anti-TB medications.',
        explanation: 'Mycobacterium tuberculosis is killed by antibiotics over a 6 to 9-month standardized regimen.'
      },
      {
        myth: 'You can catch TB by sharing food plates or shaking hands with a patient.',
        fact: 'TB is strictly airborne. It cannot spread through touch, cutlery, food, or casual non-respiratory contact.',
        explanation: 'Only airborne droplet nuclei inhaled into lungs can cause pulmonary infection.'
      }
    ],
    sources: [
      'Central TB Division, Ministry of Health and Family Welfare, Government of India (NTEP)',
      'World Health Organization (WHO) - Global Tuberculosis Report 2024',
      'Indian Council of Medical Research (ICMR) - Guidelines on TB Diagnosis and Management'
    ],
    whoReference: 'WHO Global Tuberculosis Report / NTEP Guidelines India',
    vaccinationAvailable: true,
    vaccineDetails: 'BCG vaccine is given universally at birth; prevents severe disseminated TB and TB meningitis in infants and young children.',
    riskLevel: 'High',
    endemicRegions: 'Pan-India, with surveillance focus on densely populated urban settlements and industrial areas',
    iconName: 'Activity'
  },
  {
    id: 'chikungunya',
    name: 'Chikungunya',
    hindiName: 'चिकनगुनिया (जोड़ों का सूजन व दर्द)',
    scientificName: 'Chikungunya virus (CHIKV / Togaviridae)',
    category: 'Vector-Borne',
    summary: 'A viral disease transmitted to humans by infected mosquitoes. It is characterized by acute high fever and severe, debilitating joint pain (arthralgia) that can persist for weeks or months.',
    causes: [
      'Infection by Chikungunya virus (CHIKV), an alphavirus of the family Togaviridae',
      'Transmitted by Aedes aegypti and Aedes albopictus mosquitoes',
      'Viral replication inside synovial tissues and joint capsules, causing severe inflammatory arthritis'
    ],
    transmission: [
      'Bite of infected female Aedes mosquitoes (same vector as Dengue and Zika)',
      'Mosquitoes bite aggressively during daylight hours (early morning and late afternoon)',
      'Cannot spread from person to person through casual contact'
    ],
    earlySymptoms: [
      'Abrupt high-grade fever accompanied by chills',
      'Severe, disabling polyarthralgia (multiple joint pains) predominantly affecting hands, wrists, ankles, and feet',
      'Joint swelling, stiffness, and periarticular edema',
      'Diffuse maculopapular rash on trunk and limbs within 2 to 5 days',
      'Headache, photophobia, and extreme muscle weakness'
    ],
    severeSymptoms: [
      'Chronic persistent inflammatory arthritis lasting months to years',
      'Bullous skin eruptions and hyperpigmentation (especially over the nasal bridge - "Chikungunya nose")',
      'Neurological complications (meningoencephalitis, Guillain-Barré syndrome) in rare cases',
      'Cardiovascular decompensation in elderly patients with pre-existing heart disease'
    ],
    riskFactors: [
      'Living in areas with high Aedes mosquito proliferation',
      'Elderly individuals (>65 years) and newborns (highest risk for severe atypical manifestations)',
      'Individuals with underlying rheumatoid arthritis or chronic joint disorders'
    ],
    prevention: [
      'Empty and clean water-holding containers (coolers, flower pots, tires) every 7 days',
      'Use mosquito repellent lotions containing DEET, Picaridin, or Oil of Lemon Eucalyptus',
      'Sleep under mosquito nets and screen doors/windows',
      'Wear protective full-length clothing',
      'Support community vector control and fogging during outbreak seasons'
    ],
    warningSigns: [
      'Severe lethargy, delirium, or inability to walk due to joint swelling',
      'Decreased urine output or persistent vomiting',
      'Shortness of breath or chest pain in elderly patients',
      'High fever unresponsive to standard antipyretics'
    ],
    whenToSeekMedicalHelp: [
      'High fever accompanied by intense joint pain making walking impossible',
      'Suspected Chikungunya in newborns, pregnant mothers, or elderly individuals',
      'Joint pain persisting beyond 2 weeks after the fever resolves'
    ],
    faqs: [
      {
        question: 'Why does joint pain last so long after Chikungunya fever resolves?',
        answer: 'While the fever typically subsides within 7-10 days, viral antigens can trigger long-lasting inflammatory immune responses in the synovium of joints, leading to post-viral arthropathy that may last several months.'
      },
      {
        question: 'Is Chikungunya fatal?',
        answer: 'Chikungunya is rarely fatal on its own, but the joint pain is intensely debilitating. In frail elderly patients with co-morbidities, it can trigger secondary complications requiring hospital care.'
      }
    ],
    mythsVsFacts: [
      {
        myth: 'Chikungunya and Dengue cannot happen at the same time.',
        fact: 'Co-infection is possible because both viruses are carried and transmitted by the exact same Aedes mosquito species.',
        explanation: 'Patients in endemic areas can be bitten by a mosquito carrying both viruses or receive separate bites during outbreaks.'
      },
      {
        myth: 'Steroids should be started on Day 1 for joint pain relief.',
        fact: 'Systemic corticosteroids should NOT be used in the acute phase as they suppress natural viral clearance and cause rebound inflammation.',
        explanation: 'Supportive paracetamol, physiotherapy, and doctor-prescribed mild analgesics are recommended.'
      }
    ],
    sources: [
      'World Health Organization (WHO) - Chikungunya Factsheet',
      'National Center for Vector Borne Diseases Control (NCVBDC), India',
      'Centers for Disease Control and Prevention (CDC) - Chikungunya Clinical Guidance'
    ],
    whoReference: 'WHO Factsheet on Chikungunya Virus / NCVBDC Protocols',
    vaccinationAvailable: true,
    vaccineDetails: 'Ixchiq (live attenuated CHIKV vaccine) received FDA/EMA approvals for adults in high-risk zones; global public health deployment is expanding.',
    riskLevel: 'Moderate',
    endemicRegions: 'Southern, Western, and Central Indian states, with seasonal post-monsoon outbreaks',
    iconName: 'Zap'
  },
  {
    id: 'typhoid',
    name: 'Typhoid (Enteric Fever)',
    hindiName: 'टाइफाइड (मोतीझरा / मियादी बुखार)',
    scientificName: 'Salmonella enterica serovar Typhi',
    category: 'Water & Foodborne',
    summary: 'A systemic bacterial infection caused by Salmonella Typhi, transmitted through contaminated food or drinking water. Manifests as a prolonged step-ladder fever, abdominal discomfort, coated tongue, and rose-colored spots.',
    causes: [
      'Ingestion of food or water contaminated with Salmonella enterica serovar Typhi bacteria',
      'Bacterial invasion of intestinal mucosa, Peyer patches, and dissemination into the bloodstream and reticuloendothelial system'
    ],
    transmission: [
      'Fecal-oral route: consuming water or food contaminated with feces of an infected person or chronic carrier',
      'Inadequate handwashing after using the toilet or before cooking/eating',
      'Flies transferring bacteria from feces to uncovered food items',
      'Consuming street food washed with untreated tap water or contaminated ice'
    ],
    earlySymptoms: [
      'Step-ladder fever (rising progressively higher each day, reaching 103°F - 104°F)',
      'Persistent dull headache and generalized body weakness',
      'Coated white tongue with red edges',
      'Abdominal pain, bloating, and constipation (often in adults) or loose pea-soup diarrhea (common in young children)'
    ],
    severeSymptoms: [
      'Rose spots (faint pink macular rash on chest and abdomen)',
      'Hepatosplenomegaly (enlarged liver and spleen) with abdominal tenderness',
      'Intestinal perforation or severe gastrointestinal bleeding (usually in week 3 of untreated illness)',
      'Typhoid encephalopathy: muttering delirium, stupor, and confusion ("typhoid state")'
    ],
    riskFactors: [
      'Lack of access to safe treated drinking water and sanitary toilet facilities',
      'Eating raw, unwashed vegetables or street food prepared in unhygienic conditions',
      'Close contact with known typhoid chronic carriers (e.g. food handlers)',
      'Children and young adults living in crowded urban settlements'
    ],
    prevention: [
      'Drink only boiled, filtered, or certified bottled drinking water',
      'Wash hands thoroughly with soap and water before preparing meals and after using the toilet',
      'Eat freshly cooked, piping-hot food and avoid raw/unpeeled fruits from road stalls',
      'Avoid ice cubes unless made from purified water',
      'Administer Typhoid Conjugate Vaccine (TCV) to infants and children (provides long-lasting protection)'
    ],
    warningSigns: [
      'Sudden sharp, severe abdominal pain with rigid abdomen (sign of intestinal perforation)',
      'Coughing up blood or passing dark black/tarry stools (melena)',
      'Extreme drowsiness, confusion, or inability to respond to family members',
      'Persistent high fever lasting more than 5 days without response to initial medicines'
    ],
    whenToSeekMedicalHelp: [
      'Fever lasting more than 3 consecutive days with headache and gastrointestinal distress',
      'Blood culture or Widal/TyphiDot test positive under doctor’s requisition',
      'Immediately if signs of abdominal guarding or severe prostration develop'
    ],
    faqs: [
      {
        question: 'Is the Widal test 100% accurate for diagnosing typhoid?',
        answer: 'No. The Widal test has high false-positive rates due to cross-reactivity and prior exposures. Blood culture in the first week remains the gold standard for definitive confirmation and antibiotic sensitivity testing.'
      },
      {
        question: 'Can someone spread typhoid even after feeling completely recovered?',
        answer: 'Yes. Up to 3-5% of untreated patients become asymptomatic chronic carriers (bacteria reside in the gallbladder) and can unknowingly shed bacteria in their stool for months or years.'
      }
    ],
    mythsVsFacts: [
      {
        myth: 'Typhoid is caused by heavy weather changes or seasonal rain directly.',
        fact: 'Typhoid is strictly a bacterial infection caused by Salmonella Typhi ingested through fecal-contaminated food or water.',
        explanation: 'Monsoon flooding often breaches sewage lines into drinking water supplies, creating the illusion that rain itself causes the fever.'
      },
      {
        myth: 'A strict starvation diet of only sago/water is necessary during typhoid.',
        fact: 'Starvation weakens the patient. A high-calorie, easily digestible soft diet (khichdi, curd, bananas, boiled eggs, soups) is essential to maintain nutrition and intestinal healing.',
        explanation: 'Patients need balanced caloric support to fight the bacterial infection.'
      }
    ],
    sources: [
      'World Health Organization (WHO) - Typhoid Fever Factsheet & Vaccine Position Paper',
      'Indian Academy of Pediatrics (IAP) - Advisory Committee on Vaccines & Infectious Diseases',
      'Ministry of Health and Family Welfare (MoHFW) - Guidelines for Enteric Fever Management'
    ],
    whoReference: 'WHO Typhoid Factsheet / IAP National Immunization Guidelines',
    vaccinationAvailable: true,
    vaccineDetails: 'Typhoid Conjugate Vaccine (TCV) is highly effective and approved for children aged 6 months and older, offering >5 years of durable immunity.',
    riskLevel: 'Moderate',
    endemicRegions: 'Urban and semi-urban districts across all Indian states with seasonal spikes during monsoons',
    iconName: 'AlertCircle'
  },
  {
    id: 'influenza',
    name: 'Influenza (Seasonal Flu / H1N1)',
    hindiName: 'इन्फ्लूएंजा (मौसमी फ्लू / स्वाइन फ्लू)',
    scientificName: 'Influenza virus types A (H1N1, H3N2) and B',
    category: 'Respiratory & Airborne',
    summary: 'An acute, highly contagious viral respiratory infection caused by Influenza viruses (Types A and B). Spreads rapidly through respiratory droplets and causes sudden fever, severe body aches, cough, and throat irritation.',
    causes: [
      'Infection by Influenza type A or B viruses',
      'Rapid viral replication in respiratory epithelial cells lining the nose, throat, and bronchi',
      'Frequent antigenic drift resulting in new seasonal strains requiring updated vaccines'
    ],
    transmission: [
      'Airborne droplet spread when an infected person coughs, sneezes, or talks within a distance of 1 to 2 meters',
      'Direct contact with contaminated surfaces (fomites like doorknobs, phones) followed by touching eyes, nose, or mouth',
      'Crowded indoor spaces with poor air exchange'
    ],
    earlySymptoms: [
      'Sudden onset of high fever (101°F - 104°F) with shaking chills',
      'Severe generalized muscle aches (myalgia), especially in back and legs',
      'Dry, hacking cough and painful sore throat',
      'Intense headache and retro-orbital pressure',
      'Runny or stuffy nose and profound fatigue'
    ],
    severeSymptoms: [
      'Severe shortness of breath, rapid breathing, and hypoxia (SpO2 < 94%)',
      'Cyanosis (bluish tint on lips, face, or fingernails)',
      'Persistent chest pain or feeling of heaviness',
      'Secondary bacterial pneumonia with productive purulent sputum',
      'Confusion, severe dizziness, or worsening of chronic lung/heart disease'
    ],
    riskFactors: [
      'Pregnant women in any trimester and postpartum mothers',
      'Children under 5 years (especially under 2 years)',
      'Elderly individuals aged 65 years and older',
      'Individuals with underlying asthma, COPD, diabetes, chronic kidney disease, or cardiovascular disorders'
    ],
    prevention: [
      'Receive the annual seasonal influenza quadrivalent vaccine before peak winter or monsoon flu seasons',
      'Wash hands frequently with soap and water or use 70% alcohol hand sanitizer',
      'Practice cough etiquette: cover mouth with elbow or tissue paper when sneezing',
      'Wear a well-fitted 3-ply surgical or N95 mask in crowded indoor places during outbreaks',
      'Stay home when symptomatic to prevent infecting schoolmates or coworkers'
    ],
    warningSigns: [
      'Difficulty breathing, grunting, or chest retractions in young children',
      'Fever or cough that improves but then returns with higher severity (sign of secondary bacterial pneumonia)',
      'Inability to drink or keep liquids down, leading to dehydration',
      'Altered mental status or unresponsiveness'
    ],
    whenToSeekMedicalHelp: [
      'Any high-risk individual (pregnant, elderly, diabetic) with sudden flu symptoms within 48 hours for antiviral assessment (e.g. Oseltamivir)',
      'Oxygen saturation (SpO2) dropping below 94% on pulse oximeter',
      'Persistent fever lasting more than 4 days without signs of recovery'
    ],
    faqs: [
      {
        question: 'How is the seasonal flu different from a common cold?',
        answer: 'A common cold develops gradually with mild runny nose and sneezing without severe prostration. Influenza hits abruptly with high fever, severe muscle aches, intense headache, and debilitating fatigue.'
      },
      {
        question: 'Do I need a flu shot every year?',
        answer: 'Yes. Influenza viruses undergo frequent antigenic mutations (drifts). The WHO updates vaccine strains annually to match currently circulating global variants.'
      }
    ],
    mythsVsFacts: [
      {
        myth: 'Taking antibiotics will immediately cure the flu.',
        fact: 'Antibiotics kill bacteria and have ZERO effect on influenza viruses.',
        explanation: 'Overusing antibiotics for viral flu creates dangerous drug-resistant bacteria and damages gut health. Only antivirals (like Oseltamivir) under medical prescription work on influenza.'
      },
      {
        myth: 'The flu vaccine can give you the actual flu.',
        fact: 'Inactivated injectable flu vaccines contain dead viruses that cannot cause an infection.',
        explanation: 'Mild arm soreness or a low 1-day immune reaction is normal and represents the immune system generating protective antibodies.'
      }
    ],
    sources: [
      'World Health Organization (WHO) - Influenza (Seasonal) Factsheet',
      'Ministry of Health and Family Welfare (MoHFW) - Guidelines on Clinical Management of Seasonal Influenza A (H1N1)',
      'Centers for Disease Control and Prevention (CDC) - Seasonal Flu Guidelines'
    ],
    whoReference: 'WHO Global Influenza Programme / MoHFW H1N1 Clinical Management Guidelines',
    vaccinationAvailable: true,
    vaccineDetails: 'Annual Quadrivalent Inactivated Influenza Vaccine is strongly recommended for high-risk groups, pregnant women, elderly, and healthcare workers.',
    riskLevel: 'Moderate',
    endemicRegions: 'Seasonal pan-India peaks during winter (Dec-Feb) and monsoon rains (July-Sept)',
    iconName: 'Wind'
  },
  {
    id: 'cholera',
    name: 'Cholera',
    hindiName: 'हैजा (विषाक्त दस्त व निर्जलीकरण)',
    scientificName: 'Vibrio cholerae (serogroups O1 and O139)',
    category: 'Water & Foodborne',
    summary: 'An acute, potentially fatal diarrheal infection caused by ingestion of food or water contaminated with the bacterium Vibrio cholerae. Known for profuse, painless "rice-water" stools leading to rapid, severe dehydration within hours.',
    causes: [
      'Ingestion of water or food contaminated with the bacterium Vibrio cholerae',
      'Production of cholera enterotoxin (choleragen) in the small intestine, causing hypersecretion of water and chloride ions'
    ],
    transmission: [
      'Drinking water contaminated with sewage or human feces',
      'Eating food washed with or cooked in contaminated water',
      'Consuming raw or undercooked seafood harvested from contaminated estuaries or coastal waters',
      'Lack of sanitation and open defecation near public water sources'
    ],
    earlySymptoms: [
      'Sudden onset of massive, painless, watery diarrhea ("Rice-water stools")',
      'Profuse vomiting without significant nausea',
      'Rapid onset of extreme thirst (polydipsia) and dry mucous membranes',
      'Leg cramps caused by rapid potassium and electrolyte loss'
    ],
    severeSymptoms: [
      'Severe dehydration: sunken eyes, wrinkled "washerwoman hands", loss of skin turgor (skin tenting)',
      'Hypovolemic shock: undetectable or feeble peripheral pulse, severe hypotension, cold extremities',
      'Anuria (complete cessation of urine output) and acute renal failure',
      'Metabolic acidosis and Kussmaul breathing'
    ],
    riskFactors: [
      'Natural disasters, floods, or humanitarian crises causing disruption of water and sanitation systems',
      'Urban slums and rural communities lacking piped chlorination facilities',
      'Individuals with low stomach acid (achlorhydria or using antacids)',
      'Individuals with Blood Group O (higher susceptibility to severe disease)'
    ],
    prevention: [
      'Drink only boiled water or water disinfected with chlorine tablets (minimum 0.5 mg/L free residual chlorine)',
      'Thorough handwashing with soap before eating and after using the toilet',
      'Eat food that has been thoroughly cooked and served hot',
      'Avoid unpasteurized milk, raw salads, and ice made from unverified water',
      'Administer Oral Cholera Vaccine (OCV) in outbreak zones and high-risk endemic areas'
    ],
    warningSigns: [
      'Extreme lethargy, unresponsiveness, or coma',
      'Inability to drink oral rehydration fluids due to altered consciousness',
      'Skin pinch retracts very slowly (>2 seconds)',
      'Rapid, feeble pulse and cold clammy skin'
    ],
    whenToSeekMedicalHelp: [
      'Immediately at the first appearance of profuse watery diarrhea in an outbreak setting',
      'Immediate emergency IV fluid (Ringer Lactate) administration required for severe dehydration',
      'If vomiting prevents retaining oral fluids'
    ],
    faqs: [
      {
        question: 'What is the single most critical first-aid treatment for cholera?',
        answer: 'Immediate oral hydration with standard WHO Oral Rehydration Solution (ORS). Over 80% of cholera cases can be successfully treated with prompt ORS alone. Severe cases require urgent intravenous Ringer Lactate.'
      },
      {
        question: 'How fast can cholera cause death if untreated?',
        answer: 'In severe cases, massive fluid loss (up to 1 liter per hour) can produce fatal hypovolemic shock and acute renal failure within 6 to 12 hours of symptom onset.'
      }
    ],
    mythsVsFacts: [
      {
        myth: 'Stopping all water and fluids is the best way to control watery diarrhea.',
        fact: 'Withholding fluids is fatal. The body is losing vital water and electrolytes rapidly; continuous replacement with ORS is the only way to sustain life.',
        explanation: 'Dehydration, not the bacterium itself, is the direct cause of cholera mortality.'
      },
      {
        myth: 'Only strong antibiotics can cure cholera.',
        fact: 'Aggressive rehydration (ORS / IV fluids) cures cholera; antibiotics merely shorten diarrhea duration by 1-2 days in severe cases.',
        explanation: 'Rehydration restores hemodynamics while the body naturally clears the vibrios.'
      }
    ],
    sources: [
      'World Health Organization (WHO) - Cholera Factsheet & Global Task Force on Cholera Control (GTFCC)',
      'National Centre for Disease Control (NCDC), MoHFW India - Cholera Surveillance Guidelines',
      'UNICEF - Water, Sanitation and Hygiene (WASH) Cholera Protocols'
    ],
    whoReference: 'WHO Cholera Factsheet / GTFCC Roadmap for Ending Cholera 2030',
    vaccinationAvailable: true,
    vaccineDetails: 'WHO-prequalified Oral Cholera Vaccines (Dukoral, Shanchol, Euvichol-Plus) provide 65-80% protection for 2-3 years in endemic zones.',
    riskLevel: 'Severe',
    endemicRegions: 'Flood-prone river basins, coastal regions, and urban areas during monsoon flooding',
    iconName: 'Droplets'
  },
  {
    id: 'hepatitis',
    name: 'Viral Hepatitis (A, B, C, E)',
    hindiName: 'वायरल हेपेटाइटिस (पीलिया / यकृत शोथ)',
    scientificName: 'Hepatitis viruses (HAV, HBV, HCV, HEV)',
    category: 'Water & Foodborne',
    summary: 'An inflammatory infection of the liver caused by one of the five viral strains (A, B, C, D, E). Types A and E spread through contaminated food/water (fecal-oral), while Types B and C spread through blood and body fluids and can cause chronic liver cirrhosis and cancer.',
    causes: [
      'Hepatitis A & E: Ingestion of water or food contaminated with feces of an infected person (fecal-oral)',
      'Hepatitis B & C: Blood-to-blood contact, unsafe injections, contaminated surgical/tattoo needles, unprotected sexual intercourse, or perinatal transmission from mother to baby at birth',
      'Viral-mediated destruction of hepatocytes (liver cells) causing liver inflammation and elevated bilirubin'
    ],
    transmission: [
      'HAV & HEV: Enteric transmission through contaminated drinking water, ice, street juices, and unwashed raw foods',
      'HBV & HCV: Parenteral transmission through unsterilized needles, reused syringes, contaminated blood transfusions, unprotected sex, and childbirth',
      'HEV: Particularly hazardous to pregnant women in their third trimester'
    ],
    earlySymptoms: [
      'Jaundice (yellow discoloration of the sclera/eyes, skin, and dark yellow mustard-colored urine)',
      'Extreme fatigue, malaise, and generalized body weakness',
      'Loss of appetite (anorexia), aversion to oily foods, and nausea/vomiting',
      'Dull aching pain in the right upper abdomen (liver quadrant)',
      'Clay-colored (pale whitish) stools'
    ],
    severeSymptoms: [
      'Acute Liver Failure (Fulminant Hepatitis): hepatic encephalopathy, confusion, flapping tremors (asterixis)',
      'Chronic Hepatitis (HBV/HCV): progressive liver cirrhosis, ascites (fluid in belly), esophageal varices bleeding',
      'Hepatocellular Carcinoma (liver cancer) developing after decades of chronic infection',
      'Severe coagulopathy (easy bruising, uncontrolled bleeding due to lack of liver clotting factors)'
    ],
    riskFactors: [
      'Drinking untreated municipal/well water during monsoons (HAV / HEV)',
      'Pregnancy in third trimester (HEV carries a 20-25% case fatality rate in pregnant women)',
      'Healthcare workers exposed to accidental needle-stick injuries',
      'Undergoing hemodialysis, tattoos, or unsterile dental procedures in non-accredited centers',
      'Infants born to Hepatitis B-positive mothers'
    ],
    prevention: [
      'Administer Hepatitis B birth dose vaccine within 24 hours of birth followed by primary series (under UIP India)',
      'Drink clean, boiled, or purified water; avoid unpeeled street fruits and sugarcane juice crushed in unhygienic conditions',
      'Ensure single-use disposable syringes and screened blood transfusions',
      'Avoid sharing toothbrushes, razors, or nail clippers',
      'Hepatitis A vaccine is available for children and travelers'
    ],
    warningSigns: [
      'Altered mental state, personality changes, slurred speech, or deep drowsiness (hepatic encephalopathy)',
      'Vomiting blood (hematemesis) or passing black tarry stools (variceal bleeding)',
      'Rapid worsening of jaundice accompanied by abdominal distension',
      'Uncontrolled bleeding from minor cuts or gum bleeding'
    ],
    whenToSeekMedicalHelp: [
      'Any appearance of dark yellow urine and yellow eyes warrants liver function testing (Serum Bilirubin, SGPT/ALT, SGOT/AST)',
      'Pregnant women showing any signs of jaundice need emergency obstetric and hepatology evaluation',
      'Individuals with known chronic Hepatitis B or C require periodic viral load (HBV DNA / HCV RNA) monitoring'
    ],
    faqs: [
      {
        question: 'Is Hepatitis C completely curable now?',
        answer: 'Yes! Modern Direct-Acting Antiviral (DAA) oral medications (e.g. Sofosbuvir + Velpatasvir) achieve a cure rate of over 95% within 12 weeks of once-daily oral pills, provided under India’s National Viral Hepatitis Control Program (NVHCP).'
      },
      {
        question: 'Can someone with Hepatitis B live a normal healthy life?',
        answer: 'Yes. With regular viral monitoring and antiviral therapy (such as Tenofovir/Entecavir) when indicated, liver disease progression can be completely suppressed.'
      },
      {
        question: 'Why is Hepatitis E especially dangerous during pregnancy?',
        answer: 'In pregnant women, especially during the third trimester, Hepatitis E can cause acute liver failure with high maternal and fetal mortality rates (up to 20-25%). Strict boiled water consumption is crucial.'
      }
    ],
    mythsVsFacts: [
      {
        myth: 'A jaundice patient must strictly eat only boiled tasteless food with zero turmeric and fat forever.',
        fact: 'While heavy greasy meals cause nausea during acute jaundice, balanced calorie and protein intake is required for liver tissue regeneration.',
        explanation: 'Extreme dietary starvation delays recovery; easily digestible carbohydrates and proteins should be maintained.'
      },
      {
        myth: 'Hepatitis B spreads through sharing meals, hugging, or coughing.',
        fact: 'Hepatitis B cannot spread through casual touch, hugs, sneezing, or sharing eating utensils.',
        explanation: 'It is transmitted exclusively through blood, unprotected sexual fluids, or from an infected mother to child at birth.'
      }
    ],
    sources: [
      'National Viral Hepatitis Control Program (NVHCP), Ministry of Health & Family Welfare, India',
      'World Health Organization (WHO) - Global Hepatitis Report & Guidelines',
      'Indian National Association for Study of the Liver (INASL) Clinical Consensus'
    ],
    whoReference: 'WHO Hepatitis Factsheets / NVHCP National Operational Guidelines',
    vaccinationAvailable: true,
    vaccineDetails: 'Hepatitis B vaccine is part of India’s Universal Immunization Programme (UIP - Birth dose + 6, 10, 14 weeks). Hepatitis A vaccines are also widely available.',
    riskLevel: 'High',
    endemicRegions: 'Pan-India, with waterborne HAV/HEV outbreaks during floods and monsoons',
    iconName: 'ShieldAlert'
  },
  {
    id: 'diabetes',
    name: 'Type 2 Diabetes Mellitus',
    hindiName: 'मधुमेह / टाइप 2 डायबिटीज (शुगर की बीमारी)',
    scientificName: 'Type 2 Diabetes Mellitus (ICD-11: 5A11)',
    category: 'Chronic & Lifestyle',
    summary: 'A chronic metabolic disorder characterized by persistent hyperglycemia (high blood glucose) resulting from progressive insulin resistance and relative insulin deficiency. Leading cause of heart disease, kidney failure, blindness, and nerve damage.',
    causes: [
      'Cellular insulin resistance combined with progressive failure of pancreatic beta-cell insulin secretion',
      'Visceral adiposity (abdominal fat) releasing inflammatory adipokines and free fatty acids',
      'Genetic predisposition interacting with sedentary lifestyle and high-refined-carbohydrate diets'
    ],
    transmission: [
      'Non-communicable disease (NCD): Cannot spread from person to person',
      'Complex polygenic inheritance: having first-degree relatives with diabetes substantially increases risk'
    ],
    earlySymptoms: [
      'Frequent urination, especially waking up multiple times at night (Polyuria)',
      'Excessive, unquenchable thirst (Polydipsia)',
      'Increased hunger even after meals (Polyphagia)',
      'Unexplained weight loss despite normal or increased food intake',
      'Chronic tiredness, lack of energy, and blurred vision'
    ],
    severeSymptoms: [
      'Diabetic Foot Ulcers: non-healing foot wounds due to peripheral neuropathy and vascular disease',
      'Diabetic Retinopathy: progressive vision loss, floaters, and blindness',
      'Diabetic Nephropathy: chronic kidney disease, proteinuria, and end-stage renal failure',
      'Cardiovascular Disease: 2-4x higher risk of silent myocardial infarction (heart attack) and stroke',
      'Hyperosmolar Hyperglycemic State (HHS): severe dehydration, confusion, and blood glucose > 600 mg/dL'
    ],
    riskFactors: [
      'Overweight or obesity, especially abdominal waist circumference (>90 cm in Asian Indian men, >80 cm in women)',
      'Sedentary lifestyle with less than 150 minutes of physical activity per week',
      'Family history of diabetes (parents or siblings)',
      'History of gestational diabetes during pregnancy or polycystic ovary syndrome (PCOS)',
      'High consumption of refined grains (white rice, maida), sugar-sweetened beverages, and ultra-processed foods'
    ],
    prevention: [
      'Engage in at least 150 minutes of moderate-intensity aerobic exercise (brisk walking, cycling, swimming, yoga) every week',
      'Adopt a balanced plate: 50% vegetables/salad, 25% protein (dal, paneer, eggs, fish), 25% whole grains (millets, oats, brown rice)',
      'Eliminate refined sugars, sugary sodas, sweets, and packaged ultra-processed snacks',
      'Maintain healthy body weight (aim for 5-7% weight reduction if overweight)',
      'Undergo annual fasting blood sugar and HbA1c screening after age 30 (or earlier if high risk)'
    ],
    warningSigns: [
      'Deep, rapid breathing with fruity-smelling breath, confusion, and persistent vomiting (Diabetic Ketoacidosis)',
      'Hypoglycemia signs (Blood sugar < 70 mg/dL): sudden sweating, shakiness, dizziness, hunger, rapid heartbeat, confusion',
      'Blackish discoloration, blistering, or painless open sores on toes or feet',
      'Sudden loss of vision or dark curtains appearing in visual field'
    ],
    whenToSeekMedicalHelp: [
      'Fasting blood sugar >= 126 mg/dL or HbA1c >= 6.5% on two separate laboratory tests',
      'Any non-healing cut, blister, or ulcer on the feet requires urgent podiatric/medical care to prevent amputation',
      'Blood sugar reading > 300 mg/dL accompanied by nausea and drowsiness'
    ],
    faqs: [
      {
        question: 'Can Type 2 Diabetes be reversed or put into remission?',
        answer: 'Yes. In early stages (first few years), significant weight loss (10-15 kg) achieved through medically structured low-calorie nutrition and exercise can restore normal insulin sensitivity and achieve diabetes remission without medications.'
      },
      {
        question: 'What is the "Rule of 15" for managing sudden low blood sugar (Hypoglycemia)?',
        answer: 'If blood sugar drops below 70 mg/dL: consume 15 grams of fast-acting carbohydrate (3 teaspoons of sugar or honey, 1/2 cup fruit juice), wait 15 minutes, and recheck blood sugar. Repeat if still below 70 mg/dL.'
      },
      {
        question: 'Does eating bitter gourd (Karela) or fenugreek replace prescription diabetes medicines?',
        answer: 'No. While bitter gourd and methi have mild glycemic benefits, they cannot replace prescribed oral hypoglycemic agents or insulin. Discontinuing prescribed medicines leads to dangerous microvascular complications.'
      }
    ],
    mythsVsFacts: [
      {
        myth: 'Only obese people get Type 2 Diabetes.',
        fact: 'The "Thin-Fat Indian Phenotype" means South Asians often develop diabetes at normal BMIs due to higher visceral fat and lower muscle mass.',
        explanation: 'Abdominal fat around the liver and pancreas triggers insulin resistance even in individuals who appear slim.'
      },
      {
        myth: 'Once started on insulin, it means your diabetes is terminal and you are addicted.',
        fact: 'Insulin is a natural, life-saving hormone that protects kidneys and eyes when oral drugs are insufficient.',
        explanation: 'Insulin is not addictive; it simply replaces what the pancreas can no longer produce.'
      }
    ],
    sources: [
      'Indian Council of Medical Research (ICMR) - Guidelines for Management of Type 2 Diabetes 2023',
      'World Health Organization (WHO) - Global Report on Diabetes',
      'American Diabetes Association (ADA) - Standards of Care in Diabetes 2024'
    ],
    whoReference: 'WHO Diabetes Factsheet / ICMR Guidelines for Type 2 Diabetes in India',
    vaccinationAvailable: false,
    vaccineDetails: 'No vaccine exists for diabetes. Annual influenza and pneumococcal vaccines are strongly recommended for diabetic patients to prevent secondary infections.',
    riskLevel: 'Moderate',
    endemicRegions: 'Affects over 101 million citizens across all urban and rural districts of India',
    iconName: 'Heart'
  },
  {
    id: 'hypertension',
    name: 'Hypertension (High Blood Pressure)',
    hindiName: 'उच्च रक्तचाप (हाई ब्लड प्रेशर / हाइपरटेंशन)',
    scientificName: 'Essential Hypertension (ICD-11: BA00)',
    category: 'Chronic & Lifestyle',
    summary: 'A chronic medical condition where systemic arterial blood pressure is persistently elevated (>= 140/90 mmHg). Known as the "Silent Killer" because it rarely produces symptoms in early stages while silently damaging the heart, brain, kidneys, and blood vessels.',
    causes: [
      'Increased systemic vascular resistance and arterial stiffness',
      'High dietary sodium (salt) intake leading to fluid retention and vascular remodeling',
      'Chronic overactivity of the sympathetic nervous system and Renin-Angiotensin-Aldosterone System (RAAS)',
      'Genetic susceptibility combined with age-related vascular calcification'
    ],
    transmission: [
      'Non-communicable disease (NCD): Cannot be transmitted between individuals',
      'Familial clustering: strong hereditary component influenced by shared lifestyle factors'
    ],
    earlySymptoms: [
      'Often completely asymptomatic in early stages ("The Silent Killer")',
      'Occasional early morning occipital headaches (back of the head)',
      'Mild dizziness, lightheadedness, or feeling of head fullness',
      'Occasional spontaneous nosebleeds (epistaxis) or blurred vision'
    ],
    severeSymptoms: [
      'Hypertensive Crisis (BP >= 180/120 mmHg): severe crushing chest pain, dyspnea, and visual disturbances',
      'Ischemic Heart Disease and Myocardial Infarction (Heart Attack)',
      'Cerebrovascular Accident (Ischemic or Hemorrhagic Stroke): facial drooping, arm weakness, slurred speech',
      'Chronic Kidney Disease (Hypertensive Nephrosclerosis) requiring dialysis',
      'Hypertensive Encephalopathy: severe headache, confusion, seizures, or coma'
    ],
    riskFactors: [
      'High salt intake (> 5 grams or 1 level teaspoon of salt per day; average Indian intake is 9-12 g/day)',
      'Lack of regular physical exercise and chronic psychological stress',
      'Tobacco consumption (smoking or chewing khaini/gutkha) and heavy alcohol use',
      'Overweight and obesity (BMI > 23 kg/m² for Asian Indians)',
      'Advancing age (vascular stiffness increases after age 45)'
    ],
    prevention: [
      'Limit dietary salt intake to strictly under 5 grams (< 1 level teaspoon per day) across all cooked meals, pickles, and snacks',
      'Adopt the DASH (Dietary Approaches to Stop Hypertension) diet: rich in fruits, green leafy vegetables, potassium, nuts, and low-fat dairy',
      'Engage in 30-45 minutes of brisk walking or aerobic exercise at least 5 days a week',
      'Strictly avoid all forms of tobacco and restrict alcohol consumption',
      'Practice stress management techniques: daily deep diaphragmatic breathing, meditation, and yoga (Pranayama)',
      'Measure blood pressure at least once every 6 months after age 30'
    ],
    warningSigns: [
      'Blood pressure reading >= 180/120 mmHg on two readings taken 5 minutes apart',
      'Crushing central chest pain, radiating to left arm or jaw with cold sweating (Heart Attack warning)',
      'Sudden numbness or weakness in face, arm, or leg (Stroke warning - FAST protocol)',
      'Severe sudden "thunderclap" headache with nausea or visual loss'
    ],
    whenToSeekMedicalHelp: [
      'Consistently elevated readings above 140/90 mmHg recorded on multiple separate occasions',
      'Immediate emergency hospital care (call 108) if BP >= 180/120 mmHg with chest pain, shortness of breath, or neurological deficits',
      'Never stop taking prescribed antihypertensive medicines without consulting your treating doctor'
    ],
    faqs: [
      {
        question: 'Why do I need to take BP medicine if I feel completely fine?',
        answer: 'High blood pressure rarely causes symptoms until vital organs (heart, brain, kidneys) suffer irreversible damage. Antihypertensive medications act like an internal cushion, keeping vascular pressure safe and preventing sudden heart attacks and strokes.'
      },
      {
        question: 'Can I stop taking BP medicines once my reading normalizes?',
        answer: 'No. The blood pressure is normal precisely BECAUSE the medication is working. Stopping abruptly often causes a dangerous "rebound hypertension" spike that can trigger a stroke.'
      },
      {
        question: 'What is the ideal blood pressure target?',
        answer: 'Ideal normal blood pressure is less than 120/80 mmHg. Pre-hypertension is 120-139 / 80-89 mmHg. Stage 1 hypertension begins at 140/90 mmHg.'
      }
    ],
    mythsVsFacts: [
      {
        myth: 'You only have high blood pressure if you are tense, anxious, or sweating.',
        fact: 'Hypertension is a chronic vascular condition, not a temporary emotional state. Many calm, relaxed individuals have dangerously high BP.',
        explanation: 'The only reliable way to know your blood pressure is to measure it with a calibrated sphygmomanometer/BP monitor.'
      },
      {
        myth: 'Switching from white table salt to pink Himalayan rock salt allows you to eat as much salt as you want.',
        fact: 'Pink salt, sea salt, and rock salt contain approximately the same amount of sodium chloride as regular salt and elevate blood pressure identically.',
        explanation: 'Total sodium reduction (< 5g total salt/day) is what protects blood vessels, regardless of salt color.'
      }
    ],
    sources: [
      'India Hypertension Control Initiative (IHCI) - MoHFW, ICMR, and WHO India',
      'World Health Organization (WHO) - Global Report on Hypertension: The Race Against a Silent Killer',
      'Cardiological Society of India (CSI) - Clinical Practice Guidelines for Management of Hypertension'
    ],
    whoReference: 'WHO Hypertension Factsheet / India Hypertension Control Initiative (IHCI) Protocol',
    vaccinationAvailable: false,
    vaccineDetails: 'No vaccine exists for hypertension. Lifestyle modification and daily compliance with prescribed antihypertensives are primary lifelong defenses.',
    riskLevel: 'Moderate',
    endemicRegions: 'Affects 1 in every 4 adults in India, across both rural and metropolitan communities',
    iconName: 'Activity'
  },
  {
    id: 'rabies',
    name: 'Rabies (Hydrophobia)',
    hindiName: 'रेबीज (अलर्क रोग / जलभीति)',
    scientificName: 'Rabies lyssavirus (Rhabdoviridae)',
    category: 'Viral & Zoonotic',
    summary: 'A preventable zoonotic viral disease caused by the Rabies lyssavirus, transmitted through the saliva of infected mammals (primarily stray dogs). Once clinical neurological symptoms appear, rabies is nearly 100% fatal, but it is 100% preventable with immediate wound washing and post-exposure prophylaxis (PEP).',
    causes: [
      'Infection by Rabies lyssavirus, a neurotropic RNA virus',
      'Retrograde axonal transport along peripheral nerves toward the spinal cord and brain',
      'Acute, progressive, fatal encephalomyelitis'
    ],
    transmission: [
      'Bites, deep scratches, or direct saliva contact on broken skin or mucous membranes from infected mammals (dogs, cats, monkeys, bats, foxes)',
      'Over 97% of human rabies cases in India are caused by stray dog bites',
      'Cannot be transmitted through casual petting of an intact animal or contact with blood/urine/feces'
    ],
    earlySymptoms: [
      'Tingling, severe pain, or unexplained burning/itching sensation at the bite site (paresthesia)',
      'Flu-like fever, headache, generalized malaise, and fatigue',
      'Anxiety, irritability, insomnia, and apprehension'
    ],
    severeSymptoms: [
      'Furious Rabies (80% of cases): extreme agitation, hyperactivity, hallucinations, hydrophobia (fear of water due to painful laryngeal spasms), and aerophobia (fear of drafts of air)',
      'Paralytic Rabies (20% of cases): progressive muscle weakness ascending from the bite site, quadriplegia, and respiratory paralysis',
      'Autonomic instability: excessive salivation (frothing at the mouth), hyperpyrexia, and cardiac arrest'
    ],
    riskFactors: [
      'Exposure to stray or unvaccinated domestic animals in endemic regions',
      'Children under 15 years (often sustain bites to head, face, or neck and may not report animal scratches to parents)',
      'Veterinarians, animal handlers, and forest workers without pre-exposure vaccination',
      'Failure to immediately wash bite wounds with soap and running water'
    ],
    prevention: [
      'Immediate Wound Washing (Life-Saving): Wash the animal bite wound vigorously with running tap water and soap for at least 15 minutes',
      'Apply povidone-iodine (Betadine) or alcohol antiseptic to the wound',
      'NEVER apply chili powder, turmeric, lime, leaves, or tie tight tourniquets on bite wounds',
      'Do not suture the wound immediately unless medically essential with prior Rabies Immunoglobulin (RIG)',
      'Vaccinate all pet dogs and cats against rabies annually',
      'Receive prompt Post-Exposure Prophylaxis (PEP): Anti-Rabies Vaccine (ARV) series on Days 0, 3, 7, and 28'
    ],
    warningSigns: [
      'Any bite or scratch from a stray animal that broke skin or drew blood (Category II or III exposure)',
      'Deep bleeding wounds near the face, neck, or fingertips (high nerve density)',
      'Animal that bit was acting unusually aggressive, salivating excessively, or died within 10 days'
    ],
    whenToSeekMedicalHelp: [
      'IMMEDIATELY on the same day of any animal bite or scratch — proceed to the nearest government dispensary or hospital',
      'Anti-rabies vaccines are provided 100% FREE at all government health facilities in India',
      'Category III severe bites require Rabies Immunoglobulin (RIG) infiltration into the wound on Day 0'
    ],
    faqs: [
      {
        question: 'Are modern rabies injections still given in the stomach?',
        answer: 'NO! The old 14-injection stomach vaccines are completely obsolete. Modern cell-culture rabies vaccines are given in the upper arm (deltoid muscle) or as painless intradermal micro-doses (0.1 mL in both arms).'
      },
      {
        question: 'If a puppy scratches me without drawing blood, do I still need the vaccine?',
        answer: 'Yes. Minor scratches or abrasions without bleeding are classified as Category II exposure and require a full course of anti-rabies vaccination.'
      },
      {
        question: 'Can someone survive rabies once hydrophobia starts?',
        answer: 'Clinical rabies has a case-fatality rate approaching 100%. Less than 20 documented cases of survival exist worldwide. Immediate post-exposure vaccination BEFORE symptoms appear is the only proven defense.'
      }
    ],
    mythsVsFacts: [
      {
        myth: 'Applying red chili powder or lime paste to a dog bite will burn out the rabies virus.',
        fact: 'Applying irritants like chili powder or turmeric severely damages tissue, accelerates viral entry into exposed nerve endings, and introduces deadly tetanus infection.',
        explanation: 'Only washing with running soap water for 15 minutes physically flushes out the fatty envelope virus.'
      },
      {
        myth: 'If the biting dog looks healthy, we can wait 10 days before starting the vaccine.',
        fact: 'NEVER delay vaccination. PEP must begin immediately on Day 0. If the offending animal remains healthy and alive after 10 days of veterinary observation, remaining doses may be re-evaluated by a doctor.',
        explanation: 'The rabies incubation period can be unpredictable; waiting for animal symptoms before starting post-exposure prophylaxis can lead to fatal untreated infection.'
      }
    ],
    sources: [
      'National Rabies Control Programme (NRCP), Ministry of Health & Family Welfare, India',
      'World Health Organization (WHO) - Rabies Factsheet & PEP Guidelines',
      'Association for Prevention and Control of Rabies in India (APCRI)'
    ],
    whoReference: 'WHO Rabies Guidelines / National Rabies Control Programme (NRCP) Protocols',
    vaccinationAvailable: true,
    vaccineDetails: 'Highly effective Modern Cell Culture Vaccines (CCV) are administered post-exposure (Days 0, 3, 7, 28) and are available free across Indian government hospitals.',
    riskLevel: 'Severe',
    endemicRegions: 'Endemic across India (except Andaman & Nicobar and Lakshadweep islands)',
    iconName: 'AlertTriangle'
  },
  {
    id: 'anemia',
    name: 'Nutritional Anemia (Iron Deficiency)',
    hindiName: 'रक्तअल्पता / एनीमिया (खून की कमी)',
    scientificName: 'Iron Deficiency Anemia (ICD-11: 3A00)',
    category: 'Nutritional & Deficiency',
    summary: 'A condition characterized by an insufficient quantity of healthy red blood cells or hemoglobin (Hb < 12 g/dL in women, < 13 g/dL in men, < 11 g/dL in pregnancy), primarily caused by inadequate dietary iron intake, poor absorption, or blood loss.',
    causes: [
      'Inadequate dietary intake of bioavailable iron, folic acid, and Vitamin B12',
      'Chronic blood loss from gastrointestinal bleeding, heavy menstrual cycles, or hookworm infestation',
      'Increased physiological demands during pregnancy, lactation, and rapid adolescent growth spurts',
      'Poor iron absorption due to celiac disease, H. pylori, or high intake of tea/coffee containing tannins immediately with meals'
    ],
    transmission: [
      'Non-communicable nutritional disorder: Cannot spread from person to person',
      'High community prevalence due to dietary habits and socioeconomic factors'
    ],
    earlySymptoms: [
      'Persistent tiredness, chronic weakness, and lethargy',
      'Pale skin, pale conjunctiva (inside lower eyelids), and pale nail beds',
      'Shortness of breath and rapid heartbeat during mild physical exertion or climbing stairs',
      'Dizziness, lightheadedness, and cold hands and feet',
      'Brittle spoon-shaped nails (Koilonychia) and hair loss'
    ],
    severeSymptoms: [
      'Pica: abnormal craving to eat non-food substances like raw chalk, clay, ice, or uncooked rice',
      'Glossitis (smooth, swollen, painful red tongue) and stomatitis (cracks at corners of mouth)',
      'High-output heart failure and cardiomegaly in severe longstanding anemia (Hb < 5-6 g/dL)',
      'Adverse pregnancy outcomes: preterm labor, low birth weight babies, and postpartum hemorrhage risk'
    ],
    riskFactors: [
      'Women of reproductive age (15-49 years) experiencing regular menstrual blood loss',
      'Pregnant and lactating mothers with high fetal iron demands',
      'Infants, young children, and adolescents during rapid growth phases',
      'Individuals consuming strictly cereal-based diets without legumes, leafy vegetables, or animal proteins',
      'Populations in areas with high soil-transmitted helminth (intestinal worm) burdens'
    ],
    prevention: [
      'Consume iron-rich foods daily: green leafy vegetables (spinach, methi, moringa/drumstick leaves), legumes, jaggery, beetroot, and eggs/meat',
      'Pair iron-rich meals with Vitamin C (lemon juice, amla/Indian gooseberry, oranges, tomatoes) to multiply iron absorption by 3-4x',
      'Avoid drinking tea, coffee, or milk within 1 hour of meals, as tannins and calcium inhibit iron absorption',
      'Take bi-annual deworming tablets (Albendazole 400 mg) under the National Deworming Day initiative',
      'Take government-distributed Iron and Folic Acid (IFA) tablets under the Anemia Mukt Bharat programme'
    ],
    warningSigns: [
      'Hemoglobin level dropping below 7.0 g/dL (Severe Anemia requiring urgent medical evaluation)',
      'Severe breathlessness, chest pain, or fainting spells while resting',
      'Palpitations and swelling in feet/ankles (signs of cardiac strain)'
    ],
    whenToSeekMedicalHelp: [
      'Routine Complete Blood Count (CBC) showing Hemoglobin below age/gender reference ranges',
      'Pregnant women must have Hb checked at every antenatal care (ANC) checkup',
      'Presence of severe fatigue or pica cravings warrants serum ferritin and iron profile testing'
    ],
    faqs: [
      {
        question: 'What is the Anemia Mukt Bharat initiative?',
        answer: 'It is a flagship Government of India program providing age-appropriate Iron and Folic Acid (IFA) supplementation, bi-annual deworming, testing, and dietary counseling to children, adolescent girls, and pregnant women across all Anganwadi and school centers.'
      },
      {
        question: 'Why should I take iron tablets with lemon water instead of milk or tea?',
        answer: 'Vitamin C in lemon water converts plant-based ferric iron into easily absorbable ferrous iron. In contrast, calcium in milk and polyphenols/tannins in tea bind with iron and block its absorption in the gut.'
      }
    ],
    mythsVsFacts: [
      {
        myth: 'Eating an apple a day provides all the iron you need because apples turn brown when cut.',
        fact: 'Apples turning brown is due to oxidation of enzymes (polyphenol oxidase), not high iron. Green leafy vegetables, moringa, sprouted pulses, and jaggery contain far higher bioavailable iron.',
        explanation: 'Enzymatic browning is a biochemical reaction unrelated to nutritional iron content.'
      },
      {
        myth: 'Iron tablets cause permanent dark skin or digestive damage.',
        fact: 'Iron tablets do not darken skin tone. They may harmlessly turn stools dark green/black and occasionally cause mild constipation, which is easily managed by drinking plenty of water and eating fiber.',
        explanation: 'Dark stools are simply unabsorbed iron passing through the gastrointestinal tract.'
      }
    ],
    sources: [
      'Anemia Mukt Bharat - Ministry of Health and Family Welfare (MoHFW), Government of India',
      'Indian Council of Medical Research (ICMR) - Dietary Guidelines for Indians',
      'World Health Organization (WHO) - Global Nutrition Targets: Anemia Policy Brief'
    ],
    whoReference: 'WHO Guidelines on Hemoglobin Concentrations / MoHFW Anemia Mukt Bharat',
    vaccinationAvailable: false,
    vaccineDetails: 'Not applicable. Prevention relies on dietary diversity, Iron Folic Acid (IFA) supplementation, and regular deworming.',
    riskLevel: 'Low',
    endemicRegions: 'Affects over 50% of women and children across India according to NFHS-5 data',
    iconName: 'Heart'
  }
];
