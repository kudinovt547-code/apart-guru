"use client";

import { useEffect, useState } from "react";
import { MessageSquare, ExternalLink, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TelegramPost {
  text: string;
  date: string;
  url: string;
  channel: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ProjectMentions({ slug }: { slug: string }) {
  const [posts, setPosts] = useState<TelegramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/project-mentions/${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data: TelegramPost[]) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageSquare className="h-4 w-4" />
            Упоминания в Telegram
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Загружаю...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (posts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageSquare className="h-4 w-4" />
            Упоминания в Telegram
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground py-2">
            Упоминаний в мониторинге пока не найдено — данные обновляются автоматически каждые 6 часов.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <MessageSquare className="h-4 w-4" />
          Упоминания в Telegram
          <span className="ml-auto text-xs font-normal text-muted-foreground">
            {posts.length} {posts.length === 1 ? "пост" : posts.length < 5 ? "поста" : "постов"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {posts.map((post, idx) => (
          <div
            key={idx}
            className="border border-border/50 rounded-lg p-4 space-y-2 hover:border-border transition-colors"
          >
            <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
              <span className="font-medium">{post.channel}</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <p className="text-sm leading-relaxed line-clamp-5 whitespace-pre-line">
              {post.text}
            </p>
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline underline-offset-4"
            >
              Читать в Telegram
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
