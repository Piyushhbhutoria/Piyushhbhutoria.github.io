import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import type { BlogPost } from "@/types/blog";

const SITE_URL = "https://piyushhbhutoria.github.io";

const isPublicBlogEntry = (entry: CollectionEntry<"blog">): boolean => {
  if (entry.id.startsWith("_templates/")) {
    return false;
  }

  return entry.data.visibility === "public";
};

const toValidIsoDate = (value: string): string | undefined => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return undefined;
  }
  return parsed.toISOString();
};

const getCanonicalUrl = (entry: CollectionEntry<"blog">): string => {
  if (entry.data.canonicalMode === "source" && entry.data.sourceUrl) {
    return entry.data.sourceUrl;
  }

  return `${SITE_URL}/blog/${entry.id}`;
};

const toBlogPost = (entry: CollectionEntry<"blog">): BlogPost | null => {
  const publishedAt = toValidIsoDate(entry.data.publishedAt);
  if (!publishedAt) {
    console.warn(`[blog] Skipping blog entry with invalid publishedAt: ${entry.id}`);
    return null;
  }

  return {
    id: entry.data.id || entry.id,
    slug: entry.id,
    title: entry.data.title,
    excerpt: entry.data.excerpt,
    publishedAt,
    updatedAt: entry.data.updatedAt ? toValidIsoDate(entry.data.updatedAt) : undefined,
    source: entry.data.source,
    sourceUrl: entry.data.sourceUrl,
    canonicalMode: entry.data.canonicalMode,
    canonicalUrl: getCanonicalUrl(entry),
    authorName: entry.data.authorName,
    authorProfileUrl: entry.data.authorProfileUrl,
    coverImageUrl: entry.data.coverImageUrl,
    tags: entry.data.tags,
    readingTimeMinutes: entry.data.readingTimeMinutes,
    isFeatured: entry.data.isFeatured,
    visibility: entry.data.visibility,
  } satisfies BlogPost;
};

const isNonNullable = <T>(value: T | null): value is T => value !== null;

const sortEntriesByDateDesc = (entries: CollectionEntry<"blog">[]): CollectionEntry<"blog">[] => entries.sort(
  (a, b) => new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime(),
);

export const getAllBlogEntries = async (): Promise<CollectionEntry<"blog">[]> => {
  const entries = await getCollection("blog");
  return sortEntriesByDateDesc(entries.filter(isPublicBlogEntry));
};

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  const entries = await getAllBlogEntries();
  return entries.map(toBlogPost).filter(isNonNullable);
};

export const getRecentBlogPosts = async (limit = 3): Promise<BlogPost[]> => {
  const posts = await getAllBlogPosts();
  return posts.slice(0, limit);
};

export const getBlogEntryBySlug = async (slug: string): Promise<CollectionEntry<"blog"> | undefined> => {
  const entries = await getAllBlogEntries();
  return entries.find((entry) => entry.id === slug);
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  const entry = await getBlogEntryBySlug(slug);
  if (!entry) {
    return undefined;
  }

  return toBlogPost(entry) || undefined;
};
