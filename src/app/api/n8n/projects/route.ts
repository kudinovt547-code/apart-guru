import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

const PROJECTS_FILE = path.join(process.cwd(), "src/data/projects.generated.json");

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-n8n-secret");
  if (secret !== process.env.NEXT_PUBLIC_N8N_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { projects?: unknown[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!Array.isArray(body.projects)) {
    return NextResponse.json({ error: "projects must be an array" }, { status: 400 });
  }

  await fs.writeFile(PROJECTS_FILE, JSON.stringify(body.projects, null, 2), "utf-8");

  revalidatePath("/projects");

  return NextResponse.json({ ok: true, count: body.projects.length });
}
