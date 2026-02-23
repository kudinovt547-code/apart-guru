import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

const RESEARCH_DIR = path.join(process.cwd(), "src/data/project-research");

export interface ResearchNote {
  id: string;
  slug: string;
  title: string;
  source: string;
  content: string;
  addedAt: string;
}

function checkAuth(req: NextRequest) {
  return req.headers.get("x-admin-secret") === process.env.NEXT_PUBLIC_N8N_SECRET;
}

// GET /api/admin/project-research?slug=xxx — list notes for a project
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug || !/^[\w-]+$/.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  await fs.mkdir(RESEARCH_DIR, { recursive: true });
  const filePath = path.join(RESEARCH_DIR, `${slug}.json`);

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json([]);
  }
}

// POST /api/admin/project-research — add a research note
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { slug?: string; title?: string; source?: string; content?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.slug || !body.title || !body.content) {
    return NextResponse.json(
      { error: "slug, title and content are required" },
      { status: 400 }
    );
  }

  if (!/^[\w-]+$/.test(body.slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  await fs.mkdir(RESEARCH_DIR, { recursive: true });
  const filePath = path.join(RESEARCH_DIR, `${body.slug}.json`);

  let notes: ResearchNote[] = [];
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    notes = JSON.parse(raw);
  } catch {
    notes = [];
  }

  const note: ResearchNote = {
    id: Date.now().toString(),
    slug: body.slug,
    title: body.title.trim(),
    source: (body.source ?? "").trim(),
    content: body.content.trim(),
    addedAt: new Date().toISOString(),
  };

  notes.unshift(note);
  await fs.writeFile(filePath, JSON.stringify(notes, null, 2), "utf-8");

  revalidatePath(`/projects/${body.slug}`);

  return NextResponse.json({ ok: true, id: note.id });
}

// DELETE /api/admin/project-research?slug=xxx&id=yyy
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slug = req.nextUrl.searchParams.get("slug");
  const id = req.nextUrl.searchParams.get("id");

  if (!slug || !id || !/^[\w-]+$/.test(slug)) {
    return NextResponse.json({ error: "slug and id required" }, { status: 400 });
  }

  const filePath = path.join(RESEARCH_DIR, `${slug}.json`);

  let notes: ResearchNote[] = [];
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    notes = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: true, deleted: 0 });
  }

  const filtered = notes.filter((n) => n.id !== id);
  await fs.writeFile(filePath, JSON.stringify(filtered, null, 2), "utf-8");

  revalidatePath(`/projects/${slug}`);
  return NextResponse.json({ ok: true, deleted: notes.length - filtered.length });
}
