"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "@/hooks/use-search";
import { formatDistanceToNow } from "date-fns";

export function ConceptList() {
  const { concepts, isLoading } = useSearch();

  if (isLoading) {
    return <ConceptListSkeleton />;
  }

  if (!concepts?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No concepts found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {concepts.map((concept) => (
        <Card key={concept.id} className="hover:bg-accent/50 cursor-pointer transition-colors">
          <CardHeader>
            <CardTitle className="line-clamp-1">{concept.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {concept.content.replace(/<[^>]*>/g, '')}
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              {concept.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Updated {formatDistanceToNow(new Date(concept.updatedAt))} ago
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ConceptListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}