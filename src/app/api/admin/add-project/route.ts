import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

const EXTRA_FILE = path.join(process.cwd(), "src/data/projects-extra.json");

export interface ExtraProject {
  slug: string;
  title: string;
  city: string;
  country: string;
  format: string;       // "apartment" | "apart-hotel" | "hotel" | "hostel"
  status: string;       // "active" | "construction" | "planning"
  developer?: string;
  price?: number;       // min price in RUB, 0 if unknown
  area?: number;        // typical area m², 0 if unknown
  summary: string;
  link?: string;
  addedAt: string;
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

function checkAuth(req: NextRequest) {
  return req.headers.get("x-admin-secret") === process.env.NEXT_PUBLIC_N8N_SECRET;
}

// GET — list all extra projects
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const raw = await fs.readFile(EXTRA_FILE, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json([]);
  }
}

// POST — add a new project
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Partial<ExtraProject>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.title || !body.city || !body.summary) {
    return NextResponse.json(
      { error: "title, city and summary are required" },
      { status: 400 }
    );
  }

  const project: ExtraProject = {
    slug: toSlug(body.title),
    title: body.title.trim(),
    city: body.city.trim(),
    country: (body.country ?? "Россия").trim(),
    format: body.format ?? "apart-hotel",
    status: body.status ?? "active",
    developer: body.developer?.trim() || undefined,
    price: body.price ?? 0,
    area: body.area ?? 0,
    summary: body.summary.trim(),
    link: body.link?.trim() || undefined,
    addedAt: new Date().toISOString(),
  };

  let projects: ExtraProject[] = [];
  try {
    const raw = await fs.readFile(EXTRA_FILE, "utf-8");
    projects = JSON.parse(raw);
  } catch {
    projects = [];
  }

  // Avoid duplicate slugs
  if (projects.some((p) => p.slug === project.slug)) {
    project.slug = `${project.slug}-${Date.now().toString().slice(-4)}`;
  }

  projects.unshift(project);
  await fs.writeFile(EXTRA_FILE, JSON.stringify(projects, null, 2), "utf-8");

  revalidatePath("/projects");

  return NextResponse.json({ ok: true, slug: project.slug });
}

// DELETE ?slug=xxx
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }

  let projects: ExtraProject[] = [];
  try {
    const raw = await fs.readFile(EXTRA_FILE, "utf-8");
    projects = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: true, deleted: 0 });
  }

  const filtered = projects.filter((p) => p.slug !== slug);
  await fs.writeFile(EXTRA_FILE, JSON.stringify(filtered, null, 2), "utf-8");

  revalidatePath("/projects");
  return NextResponse.json({ ok: true, deleted: projects.length - filtered.length });
}
