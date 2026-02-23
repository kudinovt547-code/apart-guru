import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

const EXTRA_FILE = path.join(process.cwd(), "src/data/projects-extra.json");

// Full schema — all fields n8n/AI can fill
export interface ExtraProject {
  slug: string;
  title: string;
  city: string;
  country: string;
  format: string;          // "apart-hotel" | "apartment" | "hotel" | "hostel"
  status: string;          // "active" | "construction" | "planning"

  // Застройщик / УК
  developer?: string;
  managementCompany?: string;
  managementFee?: number;      // decimal: 0.30 = 30%
  investorShare?: number;      // decimal: 0.70 = 70%

  // Цены
  price?: number;              // мин. цена ₽
  priceMax?: number;           // макс. цена ₽
  pricePerM2?: number;         // цена за м²
  area?: number;               // мин. площадь м²
  areaMax?: number;

  // Инвестиционные метрики (для работающих объектов)
  adr?: number;                // средний чек ₽/ночь
  occupancy?: number;          // загрузка % (0-100)
  revPerM2Month?: number;      // выручка ₽/м²/мес
  noiYear?: number;            // NOI ₽/год
  roiYear?: number;            // ROI % годовых
  paybackYears?: number;       // срок окупаемости лет

  // Строящиеся
  completionDate?: string;     // "Q3 2026"
  totalUnits?: number;

  // Контент
  summary: string;
  description?: string;
  why?: string[];              // преимущества для инвестора
  risks?: string[];            // риски

  // Ссылки
  link?: string;
  image?: string;
  address?: string;

  // Мета
  addedAt: string;
  updatedAt?: string;
  dataSource?: string;         // "n8n-ai" | "manual"
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

async function readProjects(): Promise<ExtraProject[]> {
  try {
    const raw = await fs.readFile(EXTRA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeProjects(projects: ExtraProject[]) {
  await fs.writeFile(EXTRA_FILE, JSON.stringify(projects, null, 2), "utf-8");
}

// GET — list all extra projects (public, no auth needed for list)
export async function GET() {
  const projects = await readProjects();
  return NextResponse.json(projects);
}

// POST — create new project
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Partial<ExtraProject>;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  if (!body.title || !body.city || !body.summary) {
    return NextResponse.json({ error: "title, city, summary required" }, { status: 400 });
  }

  const slug = body.slug?.trim() || toSlug(body.title);
  const projects = await readProjects();

  // If slug already exists → upsert (merge)
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx !== -1) {
    projects[idx] = { ...projects[idx], ...body, slug, updatedAt: new Date().toISOString() };
    await writeProjects(projects);
    revalidatePath("/projects");
    revalidatePath(`/projects/extra/${slug}`);
    return NextResponse.json({ ok: true, slug, action: "updated" });
  }

  const project: ExtraProject = {
    slug,
    title: body.title.trim(),
    city: body.city.trim(),
    country: (body.country ?? "Россия").trim(),
    format: body.format ?? "apart-hotel",
    status: body.status ?? "active",
    developer: body.developer?.trim() || undefined,
    managementCompany: body.managementCompany?.trim() || undefined,
    managementFee: body.managementFee,
    investorShare: body.investorShare,
    price: body.price,
    priceMax: body.priceMax,
    pricePerM2: body.pricePerM2,
    area: body.area,
    areaMax: body.areaMax,
    adr: body.adr,
    occupancy: body.occupancy,
    revPerM2Month: body.revPerM2Month,
    noiYear: body.noiYear,
    roiYear: body.roiYear,
    paybackYears: body.paybackYears,
    completionDate: body.completionDate,
    totalUnits: body.totalUnits,
    summary: body.summary.trim(),
    description: body.description?.trim(),
    why: body.why,
    risks: body.risks,
    link: body.link?.trim() || undefined,
    image: body.image?.trim() || undefined,
    address: body.address?.trim() || undefined,
    dataSource: body.dataSource ?? "manual",
    addedAt: new Date().toISOString(),
  };

  projects.unshift(project);
  await writeProjects(projects);
  revalidatePath("/projects");
  revalidatePath(`/projects/extra/${slug}`);

  return NextResponse.json({ ok: true, slug, action: "created" });
}

// PUT — upsert by slug (n8n uses this to update data on each run)
export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Partial<ExtraProject> & { slug: string };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  if (!body.slug) {
    return NextResponse.json({ error: "slug required for PUT" }, { status: 400 });
  }

  const projects = await readProjects();
  const idx = projects.findIndex((p) => p.slug === body.slug);

  if (idx === -1) {
    // Project doesn't exist — forward to POST logic
    if (!body.title || !body.city || !body.summary) {
      return NextResponse.json({ error: "title, city, summary required for new project" }, { status: 400 });
    }
    const project: ExtraProject = {
      ...body,
      addedAt: new Date().toISOString(),
      dataSource: body.dataSource ?? "n8n-ai",
    } as ExtraProject;
    projects.unshift(project);
    await writeProjects(projects);
    revalidatePath("/projects");
    revalidatePath(`/projects/extra/${body.slug}`);
    return NextResponse.json({ ok: true, slug: body.slug, action: "created" });
  }

  // Merge — only overwrite fields that are explicitly provided (not null/undefined)
  const updated = { ...projects[idx] };
  for (const [key, value] of Object.entries(body)) {
    if (value !== undefined && value !== null && key !== "slug" && key !== "addedAt") {
      (updated as Record<string, unknown>)[key] = value;
    }
  }
  updated.updatedAt = new Date().toISOString();
  projects[idx] = updated;

  await writeProjects(projects);
  revalidatePath("/projects");
  revalidatePath(`/projects/extra/${body.slug}`);

  return NextResponse.json({ ok: true, slug: body.slug, action: "updated" });
}

// DELETE ?slug=xxx
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const projects = await readProjects();
  const filtered = projects.filter((p) => p.slug !== slug);
  await writeProjects(filtered);

  revalidatePath("/projects");
  return NextResponse.json({ ok: true, deleted: projects.length - filtered.length });
}
