import { NextResponse } from "next/server";
import { projects } from "@/data/projects";
import fs from "fs/promises";
import path from "path";

const EXTRA_FILE = path.join(process.cwd(), "src/data/projects-extra.json");

// Публичный эндпоинт — все проекты (статические + extra)
// Используется n8n для получения полного списка проектов для обновления
export async function GET() {
  const base = projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    city: p.city,
    country: p.country ?? "Россия",
    source: "static",
  }));

  let extra: { slug: string; title: string; city: string; country: string; source: string }[] = [];
  try {
    const raw = await fs.readFile(EXTRA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    extra = parsed.map((p: { slug: string; title: string; city: string; country?: string }) => ({
      slug: p.slug,
      title: p.title,
      city: p.city,
      country: p.country ?? "Россия",
      source: "extra",
    }));
  } catch {
    // extra file doesn't exist yet
  }

  // Merge, deduplicate by slug
  const seen = new Set<string>();
  const all = [...base, ...extra].filter((p) => {
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });

  return NextResponse.json(all);
}
