import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="flex items-center space-x-2">
            <Brain className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold">Knowledge Base</h1>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-2xl">
            A modern knowledge management system that helps you organize, discover, and share your ideas effectively.
          </p>

          <div className="flex space-x-4">
            <Button asChild size="lg">
              <Link href="/dashboard">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <FeatureCard
              title="Organize"
              description="Create and manage your knowledge with an intuitive interface"
            />
            <FeatureCard
              title="Discover"
              description="Powerful search and filtering to find what you need quickly"
            />
            <FeatureCard
              title="Share"
              description="Collaborate with others by sharing your knowledge"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 rounded-lg border bg-card">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}