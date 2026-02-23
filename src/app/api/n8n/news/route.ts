import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

const NEWS_FILE = path.join(process.cwd(), "src/data/news.json");

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-n8n-secret");
  if (secret !== process.env.NEXT_PUBLIC_N8N_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { articles?: unknown[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!Array.isArray(body.articles)) {
    return NextResponse.json({ error: "articles must be an array" }, { status: 400 });
  }

  await fs.writeFile(NEWS_FILE, JSON.stringify(body.articles, null, 2), "utf-8");

  revalidatePath("/news");
  revalidatePath("/");

  return NextResponse.json({ ok: true, count: body.articles.length });
}
