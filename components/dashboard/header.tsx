"use client"

import { Button } from "@/components/ui/button";
import { Brain, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";

export function DashboardHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center space-x-2">
          <Brain className="h-6 w-6" />
          <Link href="/dashboard" className="font-semibold">
            Knowledge Base
          </Link>
        </div>

        <div className="flex-1" />

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/settings">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </Button>
          <ModeToggle />
          <Button asChild>
            <Link href="/concepts/new">
              <Plus className="h-4 w-4 mr-2" />
              New Concept
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}