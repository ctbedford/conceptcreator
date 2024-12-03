import { Concept, ConceptFormData } from "@/types/concept";

// Client-side storage using localStorage
const STORAGE_KEY = 'knowledge_base_concepts';
let nextId = 1;

function getStoredConcepts(): Concept[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  const concepts = stored ? JSON.parse(stored) : [];
  nextId = Math.max(...concepts.map((c: Concept) => c.id), 0) + 1;
  return concepts;
}

function storeConcepts(concepts: Concept[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(concepts));
}

export function searchConcepts(query?: string): Concept[] {
  const concepts = getStoredConcepts();
  if (!query) return concepts;
  
  return concepts.filter(concept =>
    concept.title.toLowerCase().includes(query.toLowerCase()) ||
    concept.content.toLowerCase().includes(query.toLowerCase()) ||
    concept.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
}

export function createConcept(data: ConceptFormData): Concept {
  const concepts = getStoredConcepts();
  const concept: Concept = {
    id: nextId++,
    ...data,
    attachments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  concepts.push(concept);
  storeConcepts(concepts);
  return concept;
}

export function addAttachment(conceptId: number, attachment: any): void {
  const concepts = getStoredConcepts();
  const concept = concepts.find(c => c.id === conceptId);
  if (concept) {
    concept.attachments = [...concept.attachments, attachment];
    concept.updatedAt = new Date().toISOString();
    storeConcepts(concepts);
  }
}