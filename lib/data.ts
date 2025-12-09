// A comprehensive dataset for the Medical Training Library
export const MEDICAL_CATEGORIES = [
  // --- A ---
  { id: 'allergy', title: 'Allergy & Immunology', icon: '🤧', count: 12, status: 'completed' },
  { id: 'anatomy', title: 'Anatomy (General)', icon: '💀', count: 45, status: 'in-progress' },
  { id: 'anesthesiology', title: 'Anesthesiology', icon: '💉', count: 8, status: 'locked' },
  
  // --- C ---
  { id: 'cardiology', title: 'Cardiology', icon: '🫀', count: 24, status: 'in-progress', isNew: true },
  { id: 'critical', title: 'Critical Care', icon: '🏥', count: 15, status: 'locked' },
  
  // --- D ---
  { id: 'dermatology', title: 'Dermatology', icon: '🧖', count: 30, status: 'not-started' },
  { id: 'diagnostics', title: 'Diagnostics', icon: '🧪', count: 50, status: 'in-progress' },
  
  // --- E ---
  { id: 'emergency', title: 'Emergency Med', icon: '🚑', count: 18, status: 'in-progress' },
  { id: 'endocrinology', title: 'Endocrinology', icon: '🧬', count: 10, status: 'not-started' },
  
  // --- G ---
  { id: 'gastro', title: 'Gastroenterology', icon: '🤢', count: 14, status: 'not-started' },
  { id: 'genetics', title: 'Genetics', icon: '🧬', count: 5, status: 'locked' },
  { id: 'geriatrics', title: 'Geriatrics', icon: '👵', count: 9, status: 'not-started' },
  
  // --- N ---
  { id: 'neurology', title: 'Neurology', icon: '🧠', count: 22, status: 'completed' },
  { id: 'neurosurgery', title: 'Neurosurgery', icon: '🔪', count: 7, status: 'locked' },
  
  // --- O ---
  { id: 'obgyn', title: 'OB/GYN', icon: '🤰', count: 16, status: 'in-progress' },
  { id: 'oncology', title: 'Oncology', icon: '🎗️', count: 11, status: 'not-started' },
  { id: 'orthopedics', title: 'Orthopedics', icon: '🦴', count: 20, status: 'completed' },
  
  // --- P ---
  { id: 'pain', title: 'Pain Management', icon: '💊', count: 6, status: 'in-progress', isNew: true },
  { id: 'pediatrics', title: 'Pediatrics', icon: '👶', count: 25, status: 'in-progress' },
  { id: 'pharmacy', title: 'Pharmacology', icon: '💊', count: 40, status: 'completed' },
  { id: 'psychiatry', title: 'Psychiatry', icon: '🛋️', count: 13, status: 'not-started' },
  { id: 'pulmonology', title: 'Pulmonology', icon: '🫁', count: 12, status: 'in-progress' },
  
  // --- S ---
  { id: 'safety', title: 'Safety (Code Red)', icon: '🧯', count: 4, status: 'not-started' },
  { id: 'soft_skills', title: 'Soft Skills', icon: '🗣️', count: 8, status: 'in-progress' },
  { id: 'surgery', title: 'Surgery', icon: '😷', count: 35, status: 'locked' },
  
  // --- T ---
  { id: 'trauma', title: 'Trauma', icon: '🤕', count: 19, status: 'in-progress', isNew: true },
  
  // --- U ---
  { id: 'urology', title: 'Urology', icon: '💧', count: 8, status: 'not-started' },
  
  // (Adding duplicates to simulate 50+ scale for scrolling)
  { id: 'vascular', title: 'Vascular Surgery', icon: '🩺', count: 5, status: 'locked' },
  { id: 'virology', title: 'Virology', icon: '🦠', count: 12, status: 'completed' },
  { id: 'wound', title: 'Wound Care', icon: '🩹', count: 15, status: 'not-started' },
  { id: 'xray', title: 'X-Ray Tech', icon: '☢️', count: 10, status: 'in-progress' },
];