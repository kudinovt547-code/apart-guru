import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import {
  fetchFeed,
  isRelevant,
  RSS_FEEDS,
  Article,
} from "@/lib/rss-parser";

const NEWS_FILE = path.join(process.cwd(), "src/data/news.json");
const MAX_ARTICLES = 60;

// No auth needed — this endpoint only reads from predefined RSS feeds
// and writes to a local file. External n8n endpoints remain protected.
export async function GET() {
  // Fetch all RSS feeds in parallel
  const results = await Promise.allSettled(
    RSS_FEEDS.map((feed) => fetchFeed(feed))
  );

  const allArticles: Article[] = [];
  const feedStats: Record<string, number> = {};

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const feedName = RSS_FEEDS[i].name;

    if (result.status === "fulfilled") {
      const relevant = result.value.filter(isRelevant);
      feedStats[feedName] = relevant.length;
      allArticles.push(...relevant);
    } else {
      feedStats[feedName] = 0;
    }
  }

  // Sort by date, newest first
  allArticles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Deduplicate by URL
  const seen = new Set<string>();
  const unique = allArticles.filter((a) => {
    if (seen.has(a.url)) return false;
    seen.add(a.url);
    return true;
  });

  const final = unique.slice(0, MAX_ARTICLES);

  await fs.writeFile(NEWS_FILE, JSON.stringify(final, null, 2), "utf-8");

  revalidatePath("/news");
  revalidatePath("/");

  return NextResponse.json({
    ok: true,
    total: final.length,
    feeds: feedStats,
    updatedAt: new Date().toISOString(),
  });
}
