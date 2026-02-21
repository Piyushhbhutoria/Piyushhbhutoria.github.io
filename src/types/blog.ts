export type BlogSource = "medium" | "linkedin";

export type BlogVisibility = "public" | "private";
export type BlogCanonicalMode = "site" | "source";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  source: BlogSource;
  sourceUrl?: string;
  canonicalMode: BlogCanonicalMode;
  canonicalUrl: string;
  authorName: string;
  authorProfileUrl?: string;
  coverImageUrl?: string;
  tags: string[];
  readingTimeMinutes?: number;
  isFeatured?: boolean;
  visibility: BlogVisibility;
}
