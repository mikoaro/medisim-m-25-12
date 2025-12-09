export interface User {
  name: string;
  streak: number;
  cardsDue: number;
  role: string;
}

export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export interface DialogueOption {
  text: string;
  next?: string;
  score?: number;
}

export interface DialogueStep {
  npcText: string;
  emotion?: string;
  options?: DialogueOption[];
  isEnd?: boolean;
  success?: boolean;
}

export interface DialogueTree {
  [key: string]: DialogueStep;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  vitals: {
    hr: number;
    bp: string;
    spo2: number;
    rr: number;
    temp: number;
  };
  history: string;
  allergies: string[];
}

export interface Drug {
  id: string;
  name: string;
  class?: string;
  dose: string;
  route: string;
}

export interface ScriptLine {
  sender: 'patient' | 'doctor';
  text: string;
}

// --- SHARED USER DATA ---
export const USER: User = {
  name: "Dr. User",
  streak: 12,
  cardsDue: 20,
  role: "Attending Physician"
};

// --- MOBILE FEATURES DATA ---
export const FLASHCARDS: Flashcard[] = [
  {
    id: 1,
    question: "What is the primary contraindication for an Interscalene Nerve Block?",
    answer: "Contralateral Phrenic Nerve Palsy / Severe COPD",
    category: "Anesthesiology"
  },
  {
    id: 2,
    question: "Which local anesthetic has the highest risk of cardiotoxicity?",
    answer: "Bupivacaine",
    category: "Pharmacology"
  },
  {
    id: 3,
    question: "Identify the landmark often used for the Femoral Nerve Block.",
    answer: "Femoral Artery (NAVEL mnemonic)",
    category: "Anatomy"
  }
];

export const DIALOGUE_TREE: DialogueTree = {
  start: {
    npcText: "I'm really scared about the needles. Will I be asleep during the block?",
    emotion: "😰 Anxious",
    options: [
      { text: "Don't worry, it's fast.", next: 'dismissive', score: 0 },
      { text: "We can give you sedation to relax, but you'll be awake to help us.", next: 'empathetic', score: 10 },
      { text: "You have to be awake so you don't get hurt.", next: 'blunt', score: 0 }
    ]
  },
  empathetic: {
    npcText: "Okay, that helps. I just don't want to feel pain. Will it hurt?",
    emotion: "😌 Relieved",
    options: [
      { text: "We use numbing medicine first. You'll only feel a small pinch.", next: 'end_success', score: 10 },
      { text: "Yes, it hurts a bit.", next: 'blunt', score: 0 }
    ]
  },
  dismissive: {
    npcText: "Fast? But does it hurt? You aren't listening to me!",
    emotion: "😡 Upset",
    options: [
      { text: "I'm sorry. Let me explain the sedation options.", next: 'empathetic', score: 5 },
      { text: "Please calm down.", next: 'end_fail', score: 0 }
    ]
  },
  blunt: {
    npcText: "That sounds terrifying! I don't want to do this anymore.",
    emotion: "😱 Panicked",
    options: [
      { text: "It's necessary for the surgery.", next: 'end_fail', score: 0 },
      { text: "Let's take a moment. I can explain why safety is our priority.", next: 'empathetic', score: 5 }
    ]
  },
  end_success: { npcText: "Thank you, doctor. I'm ready.", isEnd: true, success: true },
  end_fail: { npcText: "I want to speak to your attending.", isEnd: true, success: false }
};

// --- DESKTOP SIMULATION DATA ---
export const PATIENTS: Patient[] = [
  {
    id: 'p1',
    name: 'Sarah Thompson',
    age: 20,
    gender: 'Female',
    condition: 'Abdominal Pain',
    vitals: { hr: 88, bp: '118/76', spo2: 98, rr: 18, temp: 37.2 },
    history: '2 day history of dull abdominal ache. Worsened by eating.',
    allergies: ['None'],
  },
  {
    id: 'p2',
    name: 'Robert Chen',
    age: 67,
    gender: 'Male',
    condition: 'SVT (Supraventricular Tachycardia)',
    vitals: { hr: 145, bp: '90/60', spo2: 94, rr: 24, temp: 37.5 },
    history: 'History of HTN. Palpitations started 1 hour ago.',
    allergies: ['Penicillin'],
  },
];

export const DRUGS: Drug[] = [
  { id: 'd1', name: 'Adenosine', class: 'Antiarrhythmic', dose: '6mg', route: 'IV Push' },
  { id: 'd2', name: 'Amiodarone', class: 'Antiarrhythmic', dose: '150mg', route: 'IV Piggyback' },
  { id: 'd3', name: 'Metoprolol', class: 'Beta Blocker', dose: '5mg', route: 'IV Slow' },
  { id: 'd4', name: 'Epinephrine', class: 'Vasopressor', dose: '1mg', route: 'IV Push' },
  { id: 'd5', name: 'Aspirin', class: 'Antiplatelet', dose: '324mg', route: 'PO' },
];

export const DIALOGUE_SCRIPT: ScriptLine[] = [
  { sender: 'patient', text: "It started about 2 days ago. Just a dull ache." },
  { sender: 'doctor', text: "Does anything make it better or worse?" },
  { sender: 'patient', text: "Eating makes it worse. Especially spicy food." },
  { sender: 'doctor', text: "Have you experienced any nausea?" },
  { sender: 'patient', text: "A little bit this morning, yes." },
];