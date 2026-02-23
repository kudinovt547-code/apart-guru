"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, Trash2, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const CATEGORIES = [
  "Рынок",
  "Анализ",
  "Проекты",
  "Законы",
  "Инвестиции",
  "Ипотека",
  "Регионы",
];

type Status = "idle" | "loading" | "success" | "error";

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Рынок");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  function checkAuth() {
    // Simple local check — server will validate the real secret
    if (secret.length > 8) {
      setAuthed(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  }

  async function publish() {
    if (!title.trim() || !content.trim()) {
      setMessage("Заголовок и текст обязательны");
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify({ title, content, excerpt, category }),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setMessage(`✓ Опубликовано: ${data.slug}`);
        setStatus("success");
        setTitle("");
        setContent("");
        setExcerpt("");
        setCategory("Рынок");
      } else {
        setMessage(data.error ?? "Ошибка публикации");
        setStatus("error");
      }
    } catch {
      setMessage("Ошибка сети");
      setStatus("error");
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-bold text-center">Apart Guru Admin</h1>
          <div className="space-y-3">
            <input
              type="password"
              placeholder="Секретный ключ"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && checkAuth()}
              className="w-full px-4 py-2 rounded-md border border-input bg-transparent text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
            {authError && (
              <p className="text-sm text-destructive">Неверный ключ</p>
            )}
            <button
              onClick={checkAuth}
              className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Публикация материала</h1>
          <Link
            href="/news"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            → Страница новостей
          </Link>
        </div>

        <div className="space-y-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Категория</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    category === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Заголовок <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: Рынок апартаментов СПб: итоги февраля 2026"
              className="w-full px-4 py-2 rounded-md border border-input bg-transparent text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Лид / краткое описание{" "}
              <span className="text-muted-foreground text-xs">
                (если пусто — первые 300 символов текста)
              </span>
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Короткий анонс материала для карточки..."
              rows={2}
              className="w-full px-4 py-2 rounded-md border border-input bg-transparent text-sm resize-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Текст статьи <span className="text-destructive">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Полный текст материала..."
              rows={16}
              className="w-full px-4 py-2 rounded-md border border-input bg-transparent text-sm resize-y focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {content.length} символов
            </p>
          </div>

          {/* Status */}
          {status !== "idle" && (
            <div
              className={`flex items-center gap-2 p-3 rounded-md text-sm ${
                status === "success"
                  ? "bg-green-900/20 text-green-400"
                  : status === "error"
                  ? "bg-red-900/20 text-red-400"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {status === "loading" && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              {status === "success" && <CheckCircle className="h-4 w-4" />}
              {status === "error" && <AlertCircle className="h-4 w-4" />}
              <span>{status === "loading" ? "Публикую..." : message}</span>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={publish}
            disabled={status === "loading"}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            Опубликовать
          </button>
        </div>

        {/* Quick tools */}
        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-lg font-semibold mb-4">Инструменты</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={async () => {
                const res = await fetch("/api/research/fetch-news");
                const d = await res.json();
                alert(`Новости обновлены: ${d.total} статей`);
              }}
              className="px-4 py-2 rounded-md bg-muted text-sm hover:bg-muted/80 transition-colors"
            >
              Обновить RSS-новости ({">"}fetch-news)
            </button>
            <button
              onClick={async () => {
                const res = await fetch(
                  "/api/research/fetch-project-mentions"
                );
                const d = await res.json();
                alert(`Упоминания обновлены: ${d.totalMentions} совпадений из ${d.totalPosts} постов`);
              }}
              className="px-4 py-2 rounded-md bg-muted text-sm hover:bg-muted/80 transition-colors"
            >
              Обновить упоминания проектов
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
