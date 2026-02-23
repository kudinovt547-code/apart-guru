import { Metadata } from "next";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, TrendingUp } from "lucide-react";

interface EditorialArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  publishedAt: string;
}

async function getArticles(): Promise<EditorialArticle[]> {
  try {
    const data = await fs.readFile(
      path.join(process.cwd(), "src/data/editorial-news.json"),
      "utf-8"
    );
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const articles = await getArticles();
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} | Apart Guru`,
    description: article.excerpt,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articles = await getArticles();
  const article = articles.find((a) => a.slug === slug);

  if (!article) notFound();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-3xl py-12">
        {/* Back */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Все материалы
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5 text-primary font-medium">
              <TrendingUp className="h-3.5 w-3.5" />
              {article.category}
            </span>
            <span>·</span>
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
            <span>·</span>
            <span>Apart Guru</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {article.excerpt}
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          {article.content.split("\n\n").map((para, i) => (
            <p key={i} className="mb-5 leading-relaxed text-foreground/90">
              {para}
            </p>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-6">
            Материал подготовлен командой Apart Guru
          </p>
          <div className="flex gap-4">
            <Link
              href="/projects"
              className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Смотреть базу проектов
            </Link>
            <Link
              href="/news"
              className="px-5 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors"
            >
              Все материалы
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
