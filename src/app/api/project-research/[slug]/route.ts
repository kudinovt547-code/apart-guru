import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const RESEARCH_DIR = path.join(process.cwd(), "src/data/project-research");

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!/^[\w-]+$/.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const filePath = path.join(RESEARCH_DIR, `${slug}.json`);

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json([]);
  }
}
