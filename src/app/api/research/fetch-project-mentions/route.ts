import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import {
  fetchChannelPosts,
  mentionsProject,
  TELEGRAM_CHANNELS,
  TelegramPost,
} from "@/lib/telegram-parser";
import { projects } from "@/data/projects";

const MENTIONS_DIR = path.join(process.cwd(), "src/data/project-mentions");
const MAX_PER_PROJECT = 10;

export async function GET() {
  await fs.mkdir(MENTIONS_DIR, { recursive: true });

  // Fetch all channels in parallel
  const channelResults = await Promise.allSettled(
    TELEGRAM_CHANNELS.map((ch) => fetchChannelPosts(ch))
  );

  const allPosts: TelegramPost[] = [];
  const channelStats: Record<string, number> = {};

  for (let i = 0; i < channelResults.length; i++) {
    const result = channelResults[i];
    const chName = TELEGRAM_CHANNELS[i].username;
    if (result.status === "fulfilled") {
      channelStats[chName] = result.value.length;
      allPosts.push(...result.value);
    } else {
      channelStats[chName] = 0;
    }
  }

  // Sort by date
  allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Match posts to projects
  const projectStats: Record<string, number> = {};

  for (const project of projects) {
    const mentions = allPosts
      .filter((post) => mentionsProject(post, project.title))
      .slice(0, MAX_PER_PROJECT);

    const filePath = path.join(MENTIONS_DIR, `${project.slug}.json`);
    await fs.writeFile(filePath, JSON.stringify(mentions, null, 2), "utf-8");
    projectStats[project.slug] = mentions.length;
    if (mentions.length > 0) {
      revalidatePath(`/projects/${project.slug}`);
    }
  }

  const totalMentions = Object.values(projectStats).reduce((a, b) => a + b, 0);

  return NextResponse.json({
    ok: true,
    totalPosts: allPosts.length,
    totalMentions,
    channels: channelStats,
    projects: projectStats,
    updatedAt: new Date().toISOString(),
  });
}
