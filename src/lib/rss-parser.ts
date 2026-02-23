export interface Article {
  title: string;
  description?: string;
  url: string;
  source: string;
  publishedAt: string;
}

export interface FeedConfig {
  url: string;
  name: string;
}

// Russian real estate RSS feeds (verified working)
export const RSS_FEEDS: FeedConfig[] = [
  {
    url: "https://realty.ria.ru/export/rss2/archive/index.xml",
    name: "РИА Недвижимость",
  },
  {
    url: "https://lenta.ru/rss/articles/nedvizhimost/",
    name: "Lenta.ru",
  },
  {
    url: "https://www.bn.ru/rss/news.xml",
    name: "BN.ru",
  },
  {
    url: "https://www.novostroev.ru/rss/",
    name: "Новостроев",
  },
  {
    url: "https://www.cian.ru/stati_rss/",
    name: "ЦИАН",
  },
];

// Keywords for relevance filtering (Russian stems to match word forms)
const KEYWORDS = [
  "апартамент",
  "апарт-отел",
  "апарт отел",
  "аренд",
  "недвижимост",
  "инвестиц",
  "доходност",
  "новостройк",
  "ипотека",
  "ипотек",
  "посуточн",
  "гостиниц",
  "отель",
  "управляющ",
  "краткосрочн",
  "noi",
  "окупаемост",
  "застройщик",
  "апарты",
  "жилой комплекс",
  "купить квартир",
  "вторичн",
];

export function isRelevant(article: Article): boolean {
  const text = `${article.title} ${article.description ?? ""}`.toLowerCase();
  return KEYWORDS.some((kw) => text.includes(kw.toLowerCase()));
}

/**
 * Decode an ArrayBuffer using encoding declared in XML prolog or from Content-Type header.
 * Handles Windows-1251 (common on Russian sites) and falls back to UTF-8.
 */
function decodeBuffer(buffer: ArrayBuffer, contentTypeCharset: string | null): string {
  // The XML declaration (<?xml ... encoding="..."?>) uses only ASCII chars,
  // so we can safely peek at the beginning with latin1/utf-8 to find encoding.
  const peekDecoder = new TextDecoder("latin1");
  const peek = peekDecoder.decode(new Uint8Array(buffer).slice(0, 200));

  const xmlEncMatch = peek.match(/encoding=["']([^"']+)["']/i);
  const xmlEncoding = xmlEncMatch?.[1]?.toLowerCase() ?? null;

  const encoding =
    contentTypeCharset?.toLowerCase() ?? xmlEncoding ?? "utf-8";

  try {
    return new TextDecoder(encoding).decode(buffer);
  } catch {
    // If the encoding label is unknown to TextDecoder, try utf-8
    try {
      return new TextDecoder("utf-8").decode(buffer);
    } catch {
      return new TextDecoder("latin1").decode(buffer);
    }
  }
}

function extractCdata(raw: string): string {
  return raw.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
}

function extractTag(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = xml.match(regex);
  return match ? extractCdata(match[1]).trim() : "";
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function parseItems(xml: string, sourceName: string): Article[] {
  const items: Article[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1];
    const title = extractTag(item, "title");
    const rawDesc = extractTag(item, "description");
    const description = stripHtml(rawDesc).substring(0, 500) || undefined;
    const link = extractTag(item, "link") || extractTag(item, "guid");
    const pubDate =
      extractTag(item, "pubDate") || extractTag(item, "dc:date");

    if (!title || !link) continue;

    let publishedAt: string;
    try {
      publishedAt = pubDate
        ? new Date(pubDate).toISOString()
        : new Date().toISOString();
    } catch {
      publishedAt = new Date().toISOString();
    }

    items.push({
      title,
      description,
      url: link,
      source: sourceName,
      publishedAt,
    });
  }

  return items;
}

export async function fetchFeed(config: FeedConfig): Promise<Article[]> {
  try {
    const res = await fetch(config.url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; ApartGuru/1.0; +https://apart.guru)",
        Accept:
          "application/rss+xml, application/xml, text/xml, application/atom+xml, */*",
      },
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(9000),
    });

    if (!res.ok) return [];

    const buffer = await res.arrayBuffer();

    // Extract charset from Content-Type header if present
    const contentType = res.headers.get("content-type") ?? "";
    const ctCharset =
      contentType.match(/charset=([^\s;]+)/i)?.[1] ?? null;

    const xml = decodeBuffer(buffer, ctCharset);

    return parseItems(xml, config.name);
  } catch {
    return [];
  }
}
