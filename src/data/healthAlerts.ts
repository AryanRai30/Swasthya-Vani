import { HealthAlert } from '../types';

export const INITIAL_HEALTH_ALERTS: HealthAlert[] = [
  {
    id: 'alert-1',
    title: 'Monsoon Vector-Borne Advisory: Dengue & Chikungunya Spike',
    disease: 'Dengue & Chikungunya',
    severity: 'Critical',
    region: 'Northern & Western States (Delhi-NCR, Maharashtra, Gujarat, Uttar Pradesh)',
    date: 'August 15, 2026',
    source: 'National Vector Borne Disease Control Programme (NVBDCP) & MoHFW',
    summary: 'Heavy monsoon showers have led to localized water accumulation in residential coolers, rooftops, and construction zones, causing a noticeable rise in Aedes mosquito breeding and reported fever cases.',
    precautions: [
      'Observe weekly Sunday "Dry Day" - empty, clean, and dry all domestic water containers and plant trays',
      'Use mosquito repellent lotions (DEET/Picaridin) and sleep inside mosquito nets',
      'Wear long-sleeved light clothing when stepping outdoors during early morning and late evening',
      'Seek prompt medical testing at primary health centers for high fever (>102°F) lasting over 48 hours; do NOT self-medicate with Aspirin or Brufen'
    ],
    active: true
  },
  {
    id: 'alert-2',
    title: 'Seasonal Waterborne Alert: Acute Diarrheal Disease & Typhoid Precautions',
    disease: 'Cholera, Typhoid & Gastroenteritis',
    severity: 'Warning',
    region: 'Eastern & Flood-Prone Districts (Bihar, Assam, West Bengal, Odisha)',
    date: 'August 10, 2026',
    source: 'Integrated Disease Surveillance Programme (IDSP) & State Health Mission',
    summary: 'Elevated river water levels and flood inundation have raised the risk of water supply cross-contamination. Communities are advised to take strict water purification measures.',
    precautions: [
      'Drink strictly boiled water (boiled vigorously for at least 1-2 minutes) or chlorinate using government-distributed Halazone tablets',
      'Wash hands thoroughly with soap before preparing or consuming food and after using latrines',
      'Avoid unpeeled raw fruits and roadside street food/ice exposed to flies',
      'Keep Oral Rehydration Salts (ORS) packets ready at home and begin immediate fluid replenishment at the first sign of loose stools'
    ],
    active: true
  },
  {
    id: 'alert-3',
    title: 'Seasonal Respiratory Health Notice: Influenza H3N2 & Air Quality Caution',
    disease: 'Influenza H3N2 & Bronchitis',
    severity: 'Advisory',
    region: 'Major Metros & Industrial Corridors (Delhi NCR, Mumbai, Bengaluru, Kolkata)',
    date: 'August 05, 2026',
    source: 'Indian Council of Medical Research (ICMR)',
    summary: 'Climatic fluctuations have triggered an increase in viral upper respiratory tract infections with prolonged cough and body aches. Vulnerable groups should observe standard respiratory hygiene.',
    precautions: [
      'High-risk groups (elderly, diabetics, asthmatics, pregnant women) should consider annual flu vaccination',
      'Wear protective triple-layer masks in overcrowded indoor gatherings or public transit',
      'Practice warm water salt gargles and steam inhalation for mild throat discomfort',
      'Avoid taking antibiotics for viral cough and cold unless explicitly prescribed by a certified doctor after clinical evaluation'
    ],
    active: true
  },
  {
    id: 'alert-4',
    title: 'Intensified Mission Indradhanush: Universal Childhood Immunization Drive',
    disease: 'Measles, Rubella, Polio & TB',
    severity: 'Advisory',
    region: 'Pan-India (All Districts)',
    date: 'August 01, 2026',
    source: 'Ministry of Health and Family Welfare (MoHFW)',
    summary: 'Special outreach camps are operating across all Anganwadi and Primary Health Centres to vaccinate pregnant mothers and children under 5 who missed regular immunization cycles.',
    precautions: [
      'Check your child’s Mother and Child Protection (MCP) card for any missed doses',
      'Visit your nearest government health centre or ASHA worker for free vaccines',
      'All government immunization services under UIP are 100% free of charge'
    ],
    active: true
  }
];

export const REGIONAL_ZONES = [
  'All Regions',
  'Northern States',
  'Southern States',
  'Eastern & North-East',
  'Western States',
  'Central India'
];
