import { ConceptEditor } from "@/components/concepts/concept-editor";
import { DashboardHeader } from "@/components/dashboard/header";

export default function NewConceptPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create New Concept</h1>
          <ConceptEditor />
        </div>
      </main>
    </div>
  );
}