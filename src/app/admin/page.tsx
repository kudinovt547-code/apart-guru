"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle, AlertCircle, Loader2, FileText, Building2, Wrench, BookOpen } from "lucide-react";

const CATEGORIES = ["Рынок", "Анализ", "Проекты", "Законы", "Инвестиции", "Ипотека", "Регионы"];
const FORMATS = ["apart-hotel", "apartment", "hotel", "hostel"];
const FORMAT_LABELS: Record<string, string> = { "apart-hotel": "Апарт-отель", apartment: "Апартаменты", hotel: "Отель", hostel: "Хостел" };
const STATUSES = ["active", "construction", "planning"];
const STATUS_LABELS: Record<string, string> = { active: "Активный", construction: "Строится", planning: "Планируется" };

type Status = "idle" | "loading" | "success" | "error";
type Tab = "article" | "research" | "project" | "tools";

const INPUT = "w-full px-4 py-2 rounded-md border border-input bg-transparent text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";
const BTN_PRIMARY = "flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:opacity-90 transition-opacity disabled:opacity-50";

function useFormStatus() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  function ok(msg: string) { setMessage(msg); setStatus("success"); }
  function err(msg: string) { setMessage(msg); setStatus("error"); }
  function loading() { setStatus("loading"); }
  function reset() { setStatus("idle"); setMessage(""); }
  return { status, message, ok, err, loading, reset };
}

function StatusBar({ status, message }: { status: Status; message: string }) {
  if (status === "idle") return null;
  return (
    <div className={`flex items-center gap-2 p-3 rounded-md text-sm ${
      status === "success" ? "bg-green-900/20 text-green-400"
      : status === "error" ? "bg-red-900/20 text-red-400"
      : "bg-muted text-muted-foreground"
    }`}>
      {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
      {status === "success" && <CheckCircle className="h-4 w-4" />}
      {status === "error" && <AlertCircle className="h-4 w-4" />}
      <span>{status === "loading" ? "Сохраняю..." : message}</span>
    </div>
  );
}

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [tab, setTab] = useState<Tab>("article");

  // --- Article state ---
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Рынок");
  const articleStatus = useFormStatus();

  // --- Research state ---
  const [rSlug, setRSlug] = useState("");
  const [rTitle, setRTitle] = useState("");
  const [rSource, setRSource] = useState("");
  const [rContent, setRContent] = useState("");
  const researchStatus = useFormStatus();

  // --- Project state ---
  const [pTitle, setPTitle] = useState("");
  const [pCity, setPCity] = useState("");
  const [pCountry, setPCountry] = useState("Россия");
  const [pFormat, setPFormat] = useState("apart-hotel");
  const [pStatus, setPStatus] = useState("active");
  const [pDeveloper, setPDeveloper] = useState("");
  const [pPrice, setPPrice] = useState("");
  const [pArea, setPArea] = useState("");
  const [pSummary, setPSummary] = useState("");
  const [pLink, setPLink] = useState("");
  const projectStatus = useFormStatus();

  function checkAuth() {
    if (secret.length > 8) { setAuthed(true); setAuthError(false); }
    else setAuthError(true);
  }

  async function publishArticle() {
    if (!title.trim() || !content.trim()) { articleStatus.err("Заголовок и текст обязательны"); return; }
    articleStatus.loading();
    try {
      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-secret": secret },
        body: JSON.stringify({ title, content, excerpt, category }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        articleStatus.ok(`✓ Опубликовано: ${data.slug}`);
        setTitle(""); setContent(""); setExcerpt(""); setCategory("Рынок");
      } else articleStatus.err(data.error ?? "Ошибка публикации");
    } catch { articleStatus.err("Ошибка сети"); }
  }

  async function saveResearch() {
    if (!rSlug.trim() || !rTitle.trim() || !rContent.trim()) {
      researchStatus.err("Slug проекта, заголовок и текст обязательны");
      return;
    }
    researchStatus.loading();
    try {
      const res = await fetch("/api/admin/project-research", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-secret": secret },
        body: JSON.stringify({ slug: rSlug.trim(), title: rTitle, source: rSource, content: rContent }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        researchStatus.ok(`✓ Исследование добавлено к проекту «${rSlug}»`);
        setRTitle(""); setRSource(""); setRContent("");
      } else researchStatus.err(data.error ?? "Ошибка");
    } catch { researchStatus.err("Ошибка сети"); }
  }

  async function addProject() {
    if (!pTitle.trim() || !pCity.trim() || !pSummary.trim()) {
      projectStatus.err("Название, город и описание обязательны");
      return;
    }
    projectStatus.loading();
    try {
      const res = await fetch("/api/admin/add-project", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-secret": secret },
        body: JSON.stringify({
          title: pTitle, city: pCity, country: pCountry,
          format: pFormat, status: pStatus,
          developer: pDeveloper || undefined,
          price: pPrice ? parseInt(pPrice) : 0,
          area: pArea ? parseInt(pArea) : 0,
          summary: pSummary,
          link: pLink || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        projectStatus.ok(`✓ Проект добавлен: /projects/extra/${data.slug}`);
        setPTitle(""); setPCity(""); setPDeveloper(""); setPPrice(""); setPArea(""); setPSummary(""); setPLink(""); setPCountry("Россия");
      } else projectStatus.err(data.error ?? "Ошибка");
    } catch { projectStatus.err("Ошибка сети"); }
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
              className={INPUT}
            />
            {authError && <p className="text-sm text-destructive">Неверный ключ</p>}
            <button onClick={checkAuth} className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
              Войти
            </button>
          </div>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "article", label: "Статья", icon: BookOpen },
    { id: "research", label: "Исследование", icon: FileText },
    { id: "project", label: "Проект", icon: Building2 },
    { id: "tools", label: "Инструменты", icon: Wrench },
  ];

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Apart Guru Admin</h1>
          <div className="flex gap-3 text-sm text-muted-foreground">
            <Link href="/news" className="hover:text-primary transition-colors">Новости →</Link>
            <Link href="/projects" className="hover:text-primary transition-colors">База →</Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-border">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                tab === id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab: Article */}
        {tab === "article" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Категория</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button key={cat} onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${category === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Заголовок <span className="text-destructive">*</span></label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Рынок апартаментов СПб: итоги февраля 2026" className={INPUT} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Лид <span className="text-muted-foreground text-xs">(если пусто — первые 300 символов текста)</span></label>
              <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Короткий анонс для карточки..." rows={2} className={`${INPUT} resize-none`} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Текст статьи <span className="text-destructive">*</span></label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Полный текст материала..." rows={16}
                className={`${INPUT} resize-y font-mono`} />
              <p className="text-xs text-muted-foreground mt-1">{content.length} символов</p>
            </div>
            <StatusBar {...articleStatus} />
            <button onClick={publishArticle} disabled={articleStatus.status === "loading"} className={BTN_PRIMARY}>
              <Send className="h-4 w-4" />
              Опубликовать
            </button>
          </div>
        )}

        {/* Tab: Research */}
        {tab === "research" && (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Добавьте исследование или аналитику по конкретному проекту. Текст будет отображаться на странице проекта в разделе «Исследования».
            </p>
            <div>
              <label className="block text-sm font-medium mb-2">Slug проекта <span className="text-destructive">*</span></label>
              <input type="text" value={rSlug} onChange={(e) => setRSlug(e.target.value)}
                placeholder="start-parnas-spb (из URL /projects/...)" className={INPUT} />
              <p className="text-xs text-muted-foreground mt-1">
                Для проектов из расширенной базы: /projects/extra/slug → slug
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Заголовок документа <span className="text-destructive">*</span></label>
              <input type="text" value={rTitle} onChange={(e) => setRTitle(e.target.value)}
                placeholder="Анализ с hotelinsider.ru, февраль 2026" className={INPUT} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Источник</label>
              <input type="text" value={rSource} onChange={(e) => setRSource(e.target.value)}
                placeholder="hotelinsider.ru / собственный ресерч / ЦИАН" className={INPUT} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Текст / данные <span className="text-destructive">*</span></label>
              <textarea value={rContent} onChange={(e) => setRContent(e.target.value)}
                placeholder="Вставьте текст из PDF, статьи или собственные заметки о проекте..." rows={14}
                className={`${INPUT} resize-y font-mono`} />
              <p className="text-xs text-muted-foreground mt-1">{rContent.length} символов</p>
            </div>
            <StatusBar {...researchStatus} />
            <button onClick={saveResearch} disabled={researchStatus.status === "loading"} className={BTN_PRIMARY}>
              <FileText className="h-4 w-4" />
              Сохранить исследование
            </button>
          </div>
        )}

        {/* Tab: Add Project */}
        {tab === "project" && (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Добавьте новый апарт-проект в расширенную базу. Проект появится на странице /projects и получит свою страницу /projects/extra/slug.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Название <span className="text-destructive">*</span></label>
                <input type="text" value={pTitle} onChange={(e) => setPTitle(e.target.value)} placeholder="Наименование проекта" className={INPUT} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Город <span className="text-destructive">*</span></label>
                <input type="text" value={pCity} onChange={(e) => setPCity(e.target.value)} placeholder="Санкт-Петербург" className={INPUT} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Страна</label>
                <input type="text" value={pCountry} onChange={(e) => setPCountry(e.target.value)} placeholder="Россия" className={INPUT} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Застройщик</label>
                <input type="text" value={pDeveloper} onChange={(e) => setPDeveloper(e.target.value)} placeholder="ООО Застройщик" className={INPUT} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Формат</label>
              <div className="flex gap-2 flex-wrap">
                {FORMATS.map((f) => (
                  <button key={f} onClick={() => setPFormat(f)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${pFormat === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                    {FORMAT_LABELS[f]}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Статус</label>
              <div className="flex gap-2 flex-wrap">
                {STATUSES.map((s) => (
                  <button key={s} onClick={() => setPStatus(s)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${pStatus === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                    {STATUS_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Цена от (₽)</label>
                <input type="number" value={pPrice} onChange={(e) => setPPrice(e.target.value)} placeholder="5000000" className={INPUT} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Площадь от (м²)</label>
                <input type="number" value={pArea} onChange={(e) => setPArea(e.target.value)} placeholder="25" className={INPUT} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Краткое описание <span className="text-destructive">*</span></label>
              <textarea value={pSummary} onChange={(e) => setPSummary(e.target.value)}
                placeholder="2-3 предложения о проекте: локация, концепция, особенности..." rows={3}
                className={`${INPUT} resize-none`} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Сайт проекта</label>
              <input type="url" value={pLink} onChange={(e) => setPLink(e.target.value)} placeholder="https://..." className={INPUT} />
            </div>
            <StatusBar {...projectStatus} />
            <button onClick={addProject} disabled={projectStatus.status === "loading"} className={BTN_PRIMARY}>
              <Building2 className="h-4 w-4" />
              Добавить в базу
            </button>
          </div>
        )}

        {/* Tab: Tools */}
        {tab === "tools" && (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">Ручной запуск фоновых задач (cron запускает их автоматически каждые 6 часов).</p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={async () => {
                  const res = await fetch("/api/research/fetch-news");
                  const d = await res.json();
                  alert(`RSS-новости обновлены: ${d.total} статей`);
                }}
                className="px-4 py-2 rounded-md bg-muted text-sm hover:bg-muted/80 transition-colors"
              >
                Обновить RSS-новости
              </button>
              <button
                onClick={async () => {
                  const res = await fetch("/api/research/fetch-project-mentions");
                  const d = await res.json();
                  alert(`Telegram: ${d.totalMentions} совпадений из ${d.totalPosts} постов`);
                }}
                className="px-4 py-2 rounded-md bg-muted text-sm hover:bg-muted/80 transition-colors"
              >
                Обновить упоминания (Telegram)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
