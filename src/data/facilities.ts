export interface HealthFacility {
  id: string;
  name: string;
  type: 'Primary Health Centre (PHC)' | 'Community Health Centre (CHC)' | 'District Government Hospital' | 'TB DOTS & Molecular Lab' | 'Vector Testing Centre';
  state: string;
  city: string;
  address: string;
  helpline: string;
  timing: string;
  services: string[];
  isEmergency24x7: boolean;
  governmentAffiliation: string;
}

export const HEALTH_FACILITIES: HealthFacility[] = [
  {
    id: 'fac-1',
    name: 'All India Institute of Medical Sciences (AIIMS) - Apex Centre',
    type: 'District Government Hospital',
    state: 'Delhi NCR',
    city: 'New Delhi',
    address: 'Sri Aurobindo Marg, Ansari Nagar, New Delhi - 110029',
    helpline: '011-26588500 / 108',
    timing: '24 Hours Open (Casualty & Emergency)',
    services: [
      '24x7 Emergency Trauma & Resuscitation',
      'Free Dengue NS1 & RT-PCR Testing',
      'High-Dependency Platelet Transfusion Unit',
      'National Anti-Rabies ARV/RIG Immunization',
      'Central TB CBNAAT Molecular Lab'
    ],
    isEmergency24x7: true,
    governmentAffiliation: 'Ministry of Health and Family Welfare (MoHFW)'
  },
  {
    id: 'fac-2',
    name: 'Model Primary Health Centre (PHC) - Urban Health Post',
    type: 'Primary Health Centre (PHC)',
    state: 'Uttar Pradesh',
    city: 'Noida (Gautam Buddha Nagar)',
    address: 'Sector 39, Near District Hospital, Noida - 201301',
    helpline: '0120-2578912',
    timing: '8:00 AM - 4:00 PM (Mon-Sat)',
    services: [
      'Free Rapid Malaria Smear / RDT Examination',
      'Free Essential Medicine Dispensary (MoHFW/EDL)',
      'Universal Child Immunization (Mission Indradhanush)',
      'Free ORS & Zinc Diarrheal Kits Distribution',
      'Basic Antenatal & Maternal Checkups'
    ],
    isEmergency24x7: false,
    governmentAffiliation: 'National Health Mission (NHM Uttar Pradesh)'
  },
  {
    id: 'fac-3',
    name: 'District Civil Hospital & Vector Control Unit',
    type: 'District Government Hospital',
    state: 'Maharashtra',
    city: 'Mumbai / Thane',
    address: 'Court Road, Near Central Railway Station, Thane - 400601',
    helpline: '022-25471800 / 108',
    timing: '24 Hours Open (Emergency Care)',
    services: [
      '24x7 Casualty & Critical Care',
      'Free Dengue / Malaria Serology Testing',
      'Automated Complete Blood Count (CBC) with Platelet Count',
      'Isolation Ward for Vector-Borne & Infectious Illnesses',
      'National Tuberculosis Elimination Program (NTEP) Clinic'
    ],
    isEmergency24x7: true,
    governmentAffiliation: 'Directorate of Health Services (Maharashtra)'
  },
  {
    id: 'fac-4',
    name: 'Community Health Centre (CHC) & 24x7 Maternity Care',
    type: 'Community Health Centre (CHC)',
    state: 'Rajasthan',
    city: 'Jaipur (Sanganer)',
    address: 'Near Bus Stand, Sanganer Road, Jaipur - 302029',
    helpline: '0141-2731102 / 108',
    timing: '24 Hours Emergency & Outpatient 9 AM - 3 PM',
    services: [
      'Emergency Stabilization & IV Hydration Center',
      'Free Malaria Chloroquine & ACT Drug Dispensary',
      'Free Anti-Rabies Vaccination (Intradermal ARV)',
      'Digital X-Ray & Sputum Microscopy for TB',
      'Chief Medical Officer Triage Desk'
    ],
    isEmergency24x7: true,
    governmentAffiliation: 'Rajasthan State Health Mission'
  },
  {
    id: 'fac-5',
    name: 'National TB Institute & Ni-kshay Sputum Diagnostics Lab',
    type: 'TB DOTS & Molecular Lab',
    state: 'Karnataka',
    city: 'Bengaluru',
    address: '8, Bellary Road, Near Mekhri Circle, Bengaluru - 560003',
    helpline: '080-23441192 / 1800-11-6666',
    timing: '9:00 AM - 5:00 PM (Mon-Sat)',
    services: [
      '100% Free CBNAAT / TrueNat Rapid TB Molecular Testing',
      'Drug-Resistant TB (MDR/XDR-TB) Specialized Diagnostics',
      'Free 6-Month Fixed-Dose Combination (FDC) DOTS Medicines',
      'Direct Benefit Transfer (Ni-kshay Poshan Yojana ₹500/mo Enrollment)',
      'Free Contact Screening & Family Preventive Therapy'
    ],
    isEmergency24x7: false,
    governmentAffiliation: 'Central TB Division, MoHFW'
  },
  {
    id: 'fac-6',
    name: 'Vector-Borne Disease Regional Diagnostic Laboratory (ICMR-NIV)',
    type: 'Vector Testing Centre',
    state: 'West Bengal',
    city: 'Kolkata (Salt Lake)',
    address: 'Sector IV, Beliaghata Main Road, Kolkata - 700010',
    helpline: '033-23701176',
    timing: '9:00 AM - 5:30 PM (Mon-Sat)',
    services: [
      'Confirmatory ELISA Testing for Dengue, Chikungunya & Zika',
      'Japanese Encephalitis (JE) Regional Reference Testing',
      'Microbiological Culture for Waterborne Cholera & Typhoid',
      'Epidemiological Outbreak Surveillance Cell',
      'Vector Larval Bio-Assay Guidance'
    ],
    isEmergency24x7: false,
    governmentAffiliation: 'Indian Council of Medical Research (ICMR)'
  }
];
