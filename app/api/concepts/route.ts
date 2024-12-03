import { NextResponse } from "next/server";
import type { ConceptFormData } from "@/types/concept";

// In-memory storage for demo purposes
// In production, use a proper database
let concepts: any[] = [];
let nextId = 1;

export async function GET(request: Request) {
  console.log('[Server] GET /api/concepts');
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase();

  if (!query) {
    console.log('[Server] Returning all concepts');
    return NextResponse.json(concepts);
  }

  console.log('[Server] Searching concepts with query:', query);
  const filtered = concepts.filter(
    concept =>
      concept.title.toLowerCase().includes(query) ||
      concept.content.toLowerCase().includes(query) ||
      concept.tags.some((tag: string) => tag.toLowerCase().includes(query))
  );
  
  console.log('[Server] Found', filtered.length, 'concepts');
  return NextResponse.json(filtered);
}

export async function POST(request: Request) {
  console.log('[Server] POST /api/concepts');
  try {
    const data: ConceptFormData = await request.json();
    console.log('[Server] Received concept data:', data);
    
    const concept = {
      id: nextId++,
      ...data,
      attachments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    concepts.push(concept);
    console.log('[Server] Created new concept:', concept);

    return NextResponse.json(concept);
  } catch (error) {
    console.error('[Server] Error creating concept:', error);
    return NextResponse.json(
      { error: "Failed to create concept", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 400 }
    );
  }
}