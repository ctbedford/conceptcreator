export interface Concept {
  id: number;
  title: string;
  content: string;
  tags: string[];
  attachments: Attachment[];
  createdAt: string;
  updatedAt: string;
}

export interface Attachment {
  id: number;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface ConceptFormData {
  title: string;
  content: string;
  tags: string[];
}