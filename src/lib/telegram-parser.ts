export interface TelegramPost {
  text: string;
  date: string; // ISO
  url: string;
  channel: string;
}

export interface TelegramChannel {
  username: string;
  name: string;
}

// Public Telegram channels — verified working (t.me/s/username returns 200)
export const TELEGRAM_CHANNELS: TelegramChannel[] = [
  { username: "Apartamen", name: "Апартаменты России" },
  { username: "apartpro", name: "apartpro — про апартаменты Петербурга" },
  { username: "apartonomica", name: "Апартономика | Взгляд изнутри" },
];

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code)));
}

function stripTags(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function fetchChannelPosts(
  channel: TelegramChannel
): Promise<TelegramPost[]> {
  try {
    const res = await fetch(
      `https://t.me/s/${channel.username}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          Accept: "text/html",
        },
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!res.ok) return [];

    const html = await res.text();
    const posts: TelegramPost[] = [];

    // Match each message block
    const msgRegex =
      /<div class="tgme_widget_message_wrap[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi;
    let match: RegExpExecArray | null;

    while ((match = msgRegex.exec(html)) !== null) {
      const block = match[1];

      // Extract text
      const textMatch = block.match(
        /<div class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/i
      );
      if (!textMatch) continue;
      const text = decodeHtmlEntities(stripTags(textMatch[1]));
      if (!text || text.length < 30) continue;

      // Extract date/time
      const dateMatch = block.match(/datetime="([^"]+)"/);
      const date = dateMatch
        ? new Date(dateMatch[1]).toISOString()
        : new Date().toISOString();

      // Extract message URL
      const urlMatch = block.match(
        /href="(https:\/\/t\.me\/[^"]+\/\d+)"/
      );
      const url = urlMatch ? urlMatch[1] : `https://t.me/${channel.username}`;

      posts.push({ text, date, url, channel: channel.name });
    }

    return posts;
  } catch {
    return [];
  }
}

// Check if a post mentions a project (by its title keywords)
export function mentionsProject(
  post: TelegramPost,
  projectTitle: string
): boolean {
  const text = post.text.toLowerCase();
  // Use significant words from the title (skip short words)
  const keywords = projectTitle
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 3);
  return keywords.some((kw) => text.includes(kw));
}
