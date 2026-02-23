import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const EXTRA_FILE = path.join(process.cwd(), "src/data/projects-extra.json");

export async function GET() {
  try {
    const raw = await fs.readFile(EXTRA_FILE, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json([]);
  }
}
