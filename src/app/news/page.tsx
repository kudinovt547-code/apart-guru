import { Metadata } from "next";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import { BookOpen, TrendingUp, Scale, Building2, Banknote, MapPin } from "lucide-react";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Новости рынка апартаментов | Apart Guru",
  description:
    "Экспертный анализ и ключевые события рынка апартаментов и доходной недвижимости от команды Apart Guru",
};

interface EditorialArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  publishedAt: string;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Рынок: TrendingUp,
  Анализ: BookOpen,
  Проекты: Building2,
  Законы: Scale,
  Инвестиции: Banknote,
  Ипотека: Banknote,
  Регионы: MapPin,
};

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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function NewsPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Новости и разборы
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Ключевые события рынка апартаментов. Экспертный взгляд команды
            Apart Guru — без воды, с цифрами и выводами.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {articles.length === 0 ? (
            <div className="text-center py-24">
              <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold mb-3 text-muted-foreground">
                Материалы готовятся
              </h2>
              <p className="text-muted-foreground">
                Скоро здесь появятся аналитика и разборы рынка
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {articles.map((article) => {
                const Icon =
                  CATEGORY_ICONS[article.category] ?? TrendingUp;
                return (
                  <article
                    key={article.id}
                    className="border border-border rounded-xl p-6 hover:border-primary/40 transition-colors bg-card"
                  >
                    <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5 text-primary font-medium">
                        <Icon className="h-3.5 w-3.5" />
                        {article.category}
                      </span>
                      <span>·</span>
                      <time dateTime={article.publishedAt}>
                        {formatDate(article.publishedAt)}
                      </time>
                      <span>·</span>
                      <span>Apart Guru</span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold mb-3 leading-snug">
                      <Link
                        href={`/news/${article.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {article.title}
                      </Link>
                    </h2>

                    <p className="text-muted-foreground leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="mt-4">
                      <Link
                        href={`/news/${article.slug}`}
                        className="text-sm text-primary font-medium hover:underline underline-offset-4"
                      >
                        Читать материал →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-muted-foreground mb-4">
            Хотите подобрать апартаменты с реальной доходностью?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Получить персональный подбор
          </Link>
        </div>
      </section>
    </div>
  );
}
