import { Concept, ConceptFormData } from "@/types/concept";
import { searchConcepts as search, createConcept as create, addAttachment } from "./storage";

export async function searchConcepts(query: string): Promise<Concept[]> {
  console.log('[API] Searching concepts with query:', query);
  try {
    const results = search(query);
    console.log('[API] Search results:', results);
    return results;
  } catch (error) {
    console.error('[API] Search failed:', error);
    throw new Error("Failed to search concepts");
  }
}

export async function createConcept(data: ConceptFormData): Promise<Concept> {
  console.log('[API] Creating concept with data:', data);
  try {
    const concept = create(data);
    console.log('[API] Concept created successfully:', concept);
    return concept;
  } catch (error) {
    console.error('[API] Create concept failed:', error);
    throw new Error("Failed to create concept");
  }
}

export async function uploadAttachment(conceptId: number, file: File): Promise<void> {
  console.log('[API] Uploading attachment for concept:', conceptId, 'file:', file.name);
  try {
    // For static export, we'll store file metadata only
    const attachment = {
      id: Date.now(),
      name: file.name,
      url: URL.createObjectURL(file), // Create a local URL for the file
      type: file.type,
      size: file.size,
    };
    
    addAttachment(conceptId, attachment);
    console.log('[API] Attachment uploaded successfully');
  } catch (error) {
    console.error('[API] Upload attachment failed:', error);
    throw new Error("Failed to upload attachment");
  }
}