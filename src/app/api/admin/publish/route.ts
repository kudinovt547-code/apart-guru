import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

const EDITORIAL_FILE = path.join(
  process.cwd(),
  "src/data/editorial-news.json"
);

export interface EditorialArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  publishedAt: string;
}

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[а-яё]/g, (char) => {
      const map: Record<string, string> = {
        а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo",
        ж: "zh", з: "z", и: "i", й: "j", к: "k", л: "l", м: "m",
        н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u",
        ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "shch",
        ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
      };
      return map[char] ?? char;
    })
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");
  if (secret !== process.env.NEXT_PUBLIC_N8N_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    title?: string;
    content?: string;
    excerpt?: string;
    category?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.title || !body.content) {
    return NextResponse.json(
      { error: "title and content are required" },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();
  const article: EditorialArticle = {
    id: Date.now().toString(),
    slug: toSlug(body.title),
    title: body.title.trim(),
    excerpt: (body.excerpt ?? body.content.slice(0, 300)).trim(),
    content: body.content.trim(),
    category: body.category?.trim() ?? "Рынок",
    publishedAt: now,
  };

  // Read existing articles
  let articles: EditorialArticle[] = [];
  try {
    const raw = await fs.readFile(EDITORIAL_FILE, "utf-8");
    articles = JSON.parse(raw);
  } catch {
    articles = [];
  }

  // Prepend new article (newest first)
  articles.unshift(article);

  await fs.writeFile(
    EDITORIAL_FILE,
    JSON.stringify(articles, null, 2),
    "utf-8"
  );

  revalidatePath("/news");
  revalidatePath("/");

  return NextResponse.json({ ok: true, slug: article.slug, id: article.id });
}

// DELETE by id
export async function DELETE(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");
  if (secret !== process.env.NEXT_PUBLIC_N8N_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  let articles: EditorialArticle[] = [];
  try {
    const raw = await fs.readFile(EDITORIAL_FILE, "utf-8");
    articles = JSON.parse(raw);
  } catch {
    articles = [];
  }

  const filtered = articles.filter((a) => a.id !== id);
  await fs.writeFile(
    EDITORIAL_FILE,
    JSON.stringify(filtered, null, 2),
    "utf-8"
  );

  revalidatePath("/news");
  return NextResponse.json({ ok: true, deleted: articles.length - filtered.length });
}
