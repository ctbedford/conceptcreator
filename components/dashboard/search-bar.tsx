"use client"

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSearch } from "@/hooks/use-search";

export function SearchBar() {
  const { query, setQuery } = useSearch();

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search concepts..."
        className="pl-9"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}