"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCompareStore } from "@/store/useCompareStore";
import { Button } from "@/components/ui/button";
import { ArrowRight, X } from "lucide-react";

export default function CompareBar() {
  const [mounted, setMounted] = useState(false);
  const { projects, removeProject } = useCompareStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || projects.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card/95 backdrop-blur shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <p className="text-sm font-semibold">
              В сравнении: <span className="text-primary">{projects.length}/5</span>
            </p>
            <div className="hidden md:flex items-center gap-2">
              {projects.map((project) => (
                <div
                  key={project.slug}
                  className="flex items-center gap-1 bg-accent px-3 py-1.5 rounded-full text-xs"
                >
                  <span className="max-w-[120px] truncate">{project.title}</span>
                  <button
                    onClick={() => removeProject(project.slug)}
                    className="hover:text-destructive transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Link href="/compare">
            <Button size="sm" className="rounded-full">
              Перейти к сравнению
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
