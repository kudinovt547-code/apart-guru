"use client";

import { useEffect, useState } from "react";
import { FileText, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResearchNote {
  id: string;
  slug: string;
  title: string;
  source: string;
  content: string;
  addedAt: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function NoteCard({ note }: { note: ResearchNote }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border/50 rounded-lg overflow-hidden hover:border-border transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="space-y-0.5">
          <p className="font-medium text-sm">{note.title}</p>
          <p className="text-xs text-muted-foreground">
            {note.source && <span className="mr-2">{note.source}</span>}
            {formatDate(note.addedAt)}
          </p>
        </div>
        {open ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0 ml-4" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 ml-4" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-border/30">
          <p className="text-sm leading-relaxed whitespace-pre-line pt-4 text-foreground/90">
            {note.content}
          </p>
        </div>
      )}
    </div>
  );
}

export default function ProjectResearch({ slug }: { slug: string }) {
  const [notes, setNotes] = useState<ResearchNote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/project-mentions/${encodeURIComponent(slug)}?research=1`)
      .catch(() => null)
      .finally(() => {});

    // Fetch research notes via the admin endpoint (public read)
    fetch(`/api/project-research/${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data: ResearchNote[]) =>
        setNotes(Array.isArray(data) ? data : [])
      )
      .catch(() => setNotes([]))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4" />
            Исследования
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Загружаю...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (notes.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <FileText className="h-4 w-4" />
          Исследования
          <span className="ml-auto text-xs font-normal text-muted-foreground">
            {notes.length}{" "}
            {notes.length === 1 ? "документ" : notes.length < 5 ? "документа" : "документов"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </CardContent>
    </Card>
  );
}
