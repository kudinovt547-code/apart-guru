import { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Newspaper, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import fs from "fs/promises";
import path from "path";

export const revalidate = 3600; // revalidate hourly at most

export const metadata: Metadata = {
  title: "Новости рынка апартаментов",
  description:
    "Актуальные новости рынка апартаментов и доходной недвижимости России",
};

type Article = {
  title: string;
  description?: string;
  url: string;
  source: string;
  publishedAt: string;
};

async function getArticles(): Promise<Article[]> {
  try {
    const data = await fs.readFile(
      path.join(process.cwd(), "src/data/news.json"),
      "utf-8"
    );
    return JSON.parse(data) as Article[];
  } catch {
    return [];
  }
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default async function NewsPage() {
  const articles = await getArticles();
  const lastUpdated =
    articles.length > 0 ? articles[0].publishedAt : null;

  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 md:py-20 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">Новости рынка</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Актуальные события рынка апартаментов и доходной недвижимости
          </p>
          {lastUpdated && (
            <p className="mt-3 text-sm text-muted-foreground flex items-center gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" />
              Обновлено: {formatDate(lastUpdated)}
              {" · "}
              {articles.length} материалов
            </p>
          )}
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {articles.length === 0 ? (
            <div className="text-center py-24">
              <Newspaper className="h-16 w-16 text-muted-foreground/40 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold mb-3 text-muted-foreground">
                Скоро здесь появятся актуальные новости рынка
              </h2>
              <p className="text-muted-foreground">
                Мы регулярно обновляем раздел свежими материалами
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {articles.map((article, idx) => (
                <Card key={idx} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                          <span className="font-medium text-primary">
                            {article.source}
                          </span>
                          <span>·</span>
                          <time dateTime={article.publishedAt}>
                            {formatDate(article.publishedAt)}
                          </time>
                        </div>
                        <h2 className="text-xl font-semibold mb-2 leading-snug">
                          {article.url ? (
                            <a
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-primary transition-colors"
                            >
                              {article.title}
                            </a>
                          ) : (
                            article.title
                          )}
                        </h2>
                        {article.description && (
                          <p className="text-muted-foreground leading-relaxed">
                            {article.description}
                          </p>
                        )}
                      </div>
                      {article.url && (
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors mt-1"
                          aria-label="Открыть источник"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-muted-foreground mb-4">
            Хотите подобрать объект с реальной доходностью?
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
