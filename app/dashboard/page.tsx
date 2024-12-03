import { DashboardHeader } from "@/components/dashboard/header";
import { ConceptList } from "@/components/dashboard/concept-list";
import { SearchBar } from "@/components/dashboard/search-bar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <SearchBar />
        </div>
        <ConceptList />
      </main>
    </div>
  );
}