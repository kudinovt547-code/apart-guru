import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { TelegramPost } from "@/lib/telegram-parser";

const MENTIONS_DIR = path.join(process.cwd(), "src/data/project-mentions");

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Basic slug validation — only allow alphanumeric + hyphen/underscore
  if (!/^[\w-]+$/.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const filePath = path.join(MENTIONS_DIR, `${slug}.json`);

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const mentions: TelegramPost[] = JSON.parse(raw);
    return NextResponse.json(mentions);
  } catch {
    // File not found — no mentions yet
    return NextResponse.json([]);
  }
}
