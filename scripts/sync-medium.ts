import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

const FEED_URL = "https://medium.com/feed/@piyushhbhutoria";
const IMAGE_FETCH_DELAY_MS = 300;

const MEDIUM_FETCH_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
  "Referer": "https://medium.com/",
} as const;
const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const MEDIA_DIR = path.join(process.cwd(), "public/blog-media/medium");
const DEFAULT_AUTHOR_NAME = "Piyushh Bhutoria";
const DEFAULT_AUTHOR_PROFILE_URL = "https://medium.com/@piyushhbhutoria";
const SITE_URL = "https://piyushhbhutoria.github.io";

interface MediumItem {
  title: string;
  link: string;
  pubDate: string;
  categories: string[];
  description: string;
  content: string;
}

interface ExistingPostMeta {
  filePath: string;
  sourceUrl?: string;
  lockSync: boolean;
}

const decodeEntities = (value: string): string => value
  .replace(/&amp;/g, "&")
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">")
  .replace(/&quot;/g, "\"")
  .replace(/&#39;/g, "'")
  .replace(/&nbsp;/g, " ");

const stripCdata = (value: string): string => {
  const match = value.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/i);
  return match ? match[1] : value;
};

const stripHtml = (value: string): string => value
  .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const slugify = (value: string): string => value
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9\s-]/g, "")
  .replace(/\s+/g, "-")
  .replace(/-+/g, "-")
  .replace(/^-|-$/g, "");

const hash = (value: string): string => createHash("sha256").update(value).digest("hex");

const ensureDir = async (dirPath: string): Promise<void> => {
  await fs.mkdir(dirPath, { recursive: true });
};

const getTagValue = (xml: string, tagName: string): string => {
  const pattern = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i");
  const match = xml.match(pattern);
  if (!match || !match[1]) {
    return "";
  }
  return decodeEntities(stripCdata(match[1]).trim());
};

const getTagValues = (xml: string, tagName: string): string[] => {
  const pattern = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "gi");
  const values: string[] = [];
  let match = pattern.exec(xml);

  while (match) {
    const value = decodeEntities(stripCdata(match[1]).trim());
    if (value) {
      values.push(value);
    }
    match = pattern.exec(xml);
  }

  return values;
};

const parseRss = (xml: string): MediumItem[] => {
  const itemPattern = /<item>([\s\S]*?)<\/item>/gi;
  const items: MediumItem[] = [];
  let match = itemPattern.exec(xml);

  while (match) {
    const itemXml = match[1];
    const title = getTagValue(itemXml, "title");
    const link = getTagValue(itemXml, "link");
    const pubDate = getTagValue(itemXml, "pubDate");
    const description = getTagValue(itemXml, "description");
    const content = getTagValue(itemXml, "content:encoded");
    const categories = getTagValues(itemXml, "category");

    if (title && link && pubDate) {
      items.push({
        title,
        link,
        pubDate,
        description,
        content,
        categories,
      });
    }

    match = itemPattern.exec(xml);
  }

  return items;
};

const sanitizeHtml = (unsafeHtml: string): string => {
  let safe = unsafeHtml;
  safe = safe.replace(/<\/?(script|style|iframe|object|embed|form|input|button|textarea|meta|link)[^>]*>/gi, "");
  safe = safe.replace(/<img[^>]+medium\.com\/_\/stat[^>]*>/gi, "");
  safe = safe.replace(/<\/?(strong|em)[^>]*>/gi, "");
  safe = safe.replace(/\s(on[a-z]+)=("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
  safe = safe.replace(/\s(href|src)=("\s*javascript:[^"]*"|'\s*javascript:[^']*'|\s*javascript:[^\s>]*)/gi, "");
  safe = safe.replace(/\sstyle=("[^"]*"|'[^']*')/gi, "");
  return safe;
};

const getSlugFromMediumLink = (link: string, title: string): string => {
  const pathname = new URL(link).pathname;
  const segments = pathname.split("/").filter(Boolean);
  const tail = segments.at(-1);
  if (tail) {
    return slugify(tail);
  }

  const titleSlug = slugify(title);
  return titleSlug || `post-${hash(link).slice(0, 8)}`;
};

const getExcerpt = (description: string, content: string): string => {
  const text = stripHtml(description) || stripHtml(content);
  if (!text) {
    return "Read this full post on my site.";
  }

  if (text.length <= 180) {
    return text;
  }

  return `${text.slice(0, 177).trim()}...`;
};

const readingTimeMinutes = (content: string): number | undefined => {
  const text = stripHtml(content);
  if (!text) {
    return undefined;
  }

  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 150));
};

const getCoverImage = (html: string): string | undefined => {
  const match = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
  return match?.[1];
};

const getExtension = (urlString: string, contentType: string | null): string => {
  if (contentType) {
    if (contentType.includes("image/jpeg")) return "jpg";
    if (contentType.includes("image/png")) return "png";
    if (contentType.includes("image/webp")) return "webp";
    if (contentType.includes("image/gif")) return "gif";
    if (contentType.includes("image/svg+xml")) return "svg";
  }

  const pathname = new URL(urlString).pathname;
  const ext = path.extname(pathname).replace(".", "").toLowerCase();
  if (ext) {
    return ext;
  }

  return "jpg";
};

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const getRetryDelayMs = (response: Response): number => {
  const retryAfter = response.headers.get("Retry-After");
  if (retryAfter) {
    const secs = parseInt(retryAfter, 10);
    if (!Number.isNaN(secs)) {
      return secs * 1000;
    }
  }
  return 5000;
};

const fetchWithRetry = async (
  url: string,
  options: RequestInit,
  maxRetries = 2,
): Promise<Response> => {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const res = await fetch(url, options);
    if (res.status !== 429 || attempt === maxRetries) return res;
    const delay = getRetryDelayMs(res);
    console.warn(`[blog:sync] 429 rate limited, retrying in ${delay / 1000}s (attempt ${attempt + 1}/${maxRetries})`);
    await sleep(delay);
  }
  throw new Error("fetchWithRetry: unreachable");
};

const findExistingImageFile = async (dir: string, hashPrefix: string): Promise<string | null> => {
  let entries: Array<{ name: string; isFile: () => boolean }>;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return null;
  }
  const prefix = hashPrefix.toLowerCase();
  for (const e of entries) {
    if (e.isFile() && e.name.toLowerCase().startsWith(prefix) && /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(e.name)) {
      return e.name;
    }
  }
  return null;
};

const localizeImages = async (slug: string, html: string): Promise<{ html: string; coverImageUrl?: string; allLocalized: boolean }> => {
  const imgPattern = /<img([^>]*?)src=["']([^"']+)["']([^>]*?)>/gi;
  let localizedHtml = html;
  let coverImageUrl: string | undefined;
  const handledUrls = new Map<string, string>();
  let anyFetchFailed = false;

  const matches = [...html.matchAll(imgPattern)];
  if (matches.length === 0) {
    return { html, allLocalized: true };
  }

  const postMediaDir = path.join(MEDIA_DIR, slug);
  await ensureDir(postMediaDir);

  for (const match of matches) {
    const originalSrc = match[2];
    if (!originalSrc) {
      continue;
    }

    if (originalSrc.includes("medium.com/_/stat")) {
      continue;
    }

    if (handledUrls.has(originalSrc)) {
      const local = handledUrls.get(originalSrc)!;
      localizedHtml = localizedHtml.replaceAll(originalSrc, local);
      if (!coverImageUrl) {
        coverImageUrl = local;
      }
      continue;
    }

    const hashPrefix = hash(originalSrc).slice(0, 14);
    const existingFile = await findExistingImageFile(postMediaDir, hashPrefix);
    if (existingFile) {
      const publicPath = `/blog-media/medium/${slug}/${existingFile}`;
      handledUrls.set(originalSrc, publicPath);
      localizedHtml = localizedHtml.replaceAll(originalSrc, publicPath);
      if (!coverImageUrl) {
        coverImageUrl = publicPath;
      }
      continue;
    }

    if (handledUrls.size > 0) {
      await sleep(IMAGE_FETCH_DELAY_MS);
    }

    try {
      const response = await fetch(originalSrc, {
        headers: {
          ...MEDIUM_FETCH_HEADERS,
          "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
          "Referer": SITE_URL,
        },
      });
      if (!response.ok) {
        throw new Error(`status ${response.status}`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      const ext = getExtension(originalSrc, response.headers.get("content-type"));
      const fileName = `${hashPrefix}.${ext}`;
      const filePath = path.join(postMediaDir, fileName);
      const publicPath = `/blog-media/medium/${slug}/${fileName}`;

      await fs.writeFile(filePath, buffer);

      handledUrls.set(originalSrc, publicPath);
      localizedHtml = localizedHtml.replaceAll(originalSrc, publicPath);

      if (!coverImageUrl) {
        coverImageUrl = publicPath;
      }
    } catch (error) {
      console.warn(`[blog:sync] Failed to localize image ${originalSrc}:`, error);
      handledUrls.set(originalSrc, originalSrc);
      anyFetchFailed = true;
      if (!coverImageUrl) {
        coverImageUrl = originalSrc;
      }
    }
  }

  return {
    html: localizedHtml,
    coverImageUrl,
    allLocalized: !anyFetchFailed,
  };
};

const yamlArray = (items: string[]): string => {
  if (items.length === 0) {
    return "[]";
  }

  return `\n${items.map((item) => `  - \"${item.replaceAll("\"", "\\\"")}\"`).join("\n")}`;
};

const buildFrontmatter = (params: {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  sourceUrl: string;
  coverImageUrl?: string;
  tags: string[];
  readingTime?: number;
  lockSync?: boolean;
}): string => {
  const coverImageLine = params.coverImageUrl ? `coverImageUrl: "${params.coverImageUrl}"\n` : "";
  const readingLine = params.readingTime ? `readingTimeMinutes: ${params.readingTime}\n` : "";
  const lockSyncLine = `lockSync: ${params.lockSync === true}\n`;

  return `---\nid: "${params.id}"\nslug: "${params.slug}"\ntitle: "${params.title.replaceAll("\"", "\\\"")}"\nexcerpt: "${params.excerpt.replaceAll("\"", "\\\"")}"\npublishedAt: "${params.publishedAt}"\nsource: "medium"\nsourceUrl: "${params.sourceUrl}"\ncanonicalMode: "site"\nauthorName: "${DEFAULT_AUTHOR_NAME}"\nauthorProfileUrl: "${DEFAULT_AUTHOR_PROFILE_URL}"\n${coverImageLine}tags:${yamlArray(params.tags)}\n${readingLine}visibility: "public"\n${lockSyncLine}---\n`;
};

const extractFrontmatter = (fileContent: string): string => {
  const match = fileContent.match(/^---\n([\s\S]*?)\n---/);
  return match?.[1] || "";
};

const isLocked = (frontmatter: string): boolean => /(?:^|\n)lockSync:\s*true\s*(?:\n|$)/.test(frontmatter);

const getSourceUrlFromFrontmatter = (frontmatter: string): string | undefined => {
  const match = frontmatter.match(/(?:^|\n)sourceUrl:\s*"([^"]+)"/);
  return match?.[1];
};

const listExistingBlogFiles = async (): Promise<string[]> => {
  await ensureDir(BLOG_DIR);
  const entries = await fs.readdir(BLOG_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => path.join(BLOG_DIR, entry.name));
};

const getExistingMediumMeta = async (): Promise<Map<string, ExistingPostMeta>> => {
  const files = await listExistingBlogFiles();
  const bySourceUrl = new Map<string, ExistingPostMeta>();

  for (const filePath of files) {
    const content = await fs.readFile(filePath, "utf-8");
    const frontmatter = extractFrontmatter(content);
    const source = frontmatter.match(/(?:^|\n)source:\s*"([^"]+)"/)?.[1];

    if (source !== "medium") {
      continue;
    }

    const sourceUrl = getSourceUrlFromFrontmatter(frontmatter);
    const meta: ExistingPostMeta = {
      filePath,
      sourceUrl,
      lockSync: isLocked(frontmatter),
    };

    if (sourceUrl) {
      bySourceUrl.set(sourceUrl, meta);
    }
  }

  return bySourceUrl;
};

const hasExistingMediumPosts = async (): Promise<boolean> => {
  const existing = await getExistingMediumMeta();
  return existing.size > 0;
};

const writePostFile = async (filePath: string, frontmatter: string, htmlBody: string): Promise<void> => {
  const content = `${frontmatter}\n${htmlBody.trim()}\n`;
  await fs.writeFile(filePath, content, "utf-8");
};

const syncMedium = async (): Promise<void> => {
  await ensureDir(BLOG_DIR);
  await ensureDir(MEDIA_DIR);

  const existingBySourceUrl = await getExistingMediumMeta();

  let xml = "";
  try {
    const response = await fetchWithRetry(FEED_URL, {
      headers: {
        ...MEDIUM_FETCH_HEADERS,
        "Accept": "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
      },
    });

    if (!response.ok) {
      throw new Error(`Medium feed fetch failed with status ${response.status}`);
    }

    xml = await response.text();
  } catch (error) {
    const strict = process.env.BLOG_SYNC_STRICT === "1";
    const hasCache = await hasExistingMediumPosts();
    console.warn("[blog:sync] Unable to fetch Medium feed:", error);

    if (strict || !hasCache) {
      process.exitCode = 1;
      return;
    }

    console.warn("[blog:sync] Using existing local Medium content.");
    return;
  }

  const items = parseRss(xml);
  const usedSlugs = new Set<string>();
  let createdOrUpdated = 0;

  for (const item of items) {
    const published = new Date(item.pubDate);
    if (Number.isNaN(published.getTime())) {
      console.warn(`[blog:sync] Skipping post with invalid date: ${item.link}`);
      continue;
    }
    const publishedAt = published.toISOString();

    const sourceUrl = item.link;
    const baseSlug = getSlugFromMediumLink(sourceUrl, item.title);
    let slug = baseSlug;

    if (usedSlugs.has(slug)) {
      slug = `${baseSlug}-${hash(sourceUrl).slice(0, 6)}`;
    }
    usedSlugs.add(slug);

    const existingMeta = existingBySourceUrl.get(sourceUrl);
    if (existingMeta?.lockSync) {
      console.log(`[blog:sync] Skipping locked post: ${sourceUrl}`);
      continue;
    }

    const rawBody = item.content || item.description;
    const safeHtml = sanitizeHtml(rawBody);
    const localized = await localizeImages(slug, safeHtml);
    const coverImageUrl = localized.coverImageUrl || getCoverImage(localized.html);
    const excerpt = getExcerpt(item.description, localized.html);
    const readingTime = readingTimeMinutes(localized.html);
    const postId = `medium-${hash(sourceUrl).slice(0, 12)}`;
    const targetFilePath = existingMeta?.filePath || path.join(BLOG_DIR, `${slug}.mdx`);

    const frontmatter = buildFrontmatter({
      id: postId,
      slug,
      title: item.title,
      excerpt,
      publishedAt,
      sourceUrl,
      coverImageUrl,
      tags: item.categories,
      readingTime,
      lockSync: localized.allLocalized,
    });

    await writePostFile(targetFilePath, frontmatter, localized.html || `<p>${excerpt}</p>`);
    createdOrUpdated += 1;
    if (localized.allLocalized) {
      console.log(`[blog:sync] All images localized, locked from further updates: ${item.title}`);
    }
  }

  console.log(`[blog:sync] Medium sync completed. Updated ${createdOrUpdated} post(s).`);
};

void syncMedium();
