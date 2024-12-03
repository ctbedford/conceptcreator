import { useQuery } from "@tanstack/react-query";
import { searchConcepts } from "@/lib/api";
import { useState } from "react";
import { useDebounce } from "./use-debounce";

export function useSearch() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const { data: concepts, isLoading } = useQuery({
    queryKey: ["concepts", debouncedQuery],
    queryFn: () => debouncedQuery ? searchConcepts(debouncedQuery) : Promise.resolve([]),
    enabled: debouncedQuery.length > 0,
  });

  return {
    query,
    setQuery,
    concepts,
    isLoading,
  };
}