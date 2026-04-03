import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/** Match markdown/MDX while skipping underscore-prefixed paths (e.g. `_templates/`). */
const mdMdxPattern = [
  "**/*.{md,mdx}",
  "!**/_*/**/*.{md,mdx}",
  "!**/_*.{md,mdx}",
] as const;

const site = defineCollection({
  loader: glob({
    base: "src/content/site",
    pattern: [...mdMdxPattern],
  }),
  // Accept mixed frontmatter from all sections
  schema: z.object({}).passthrough(),
});

const blog = defineCollection({
  loader: glob({
    base: "src/content/blog",
    pattern: [...mdMdxPattern],
  }),
  schema: z.object({
    id: z.string().min(1).optional(),
    title: z.string().min(1),
    excerpt: z.string().min(1),
    publishedAt: z.string().min(1),
    updatedAt: z.string().optional(),
    source: z.enum(["medium", "linkedin"]),
    sourceUrl: z.string().url().optional(),
    canonicalMode: z.enum(["site", "source"]).default("site"),
    authorName: z.string().min(1).default("Piyushh Bhutoria"),
    authorProfileUrl: z.string().url().optional(),
    coverImageUrl: z.string().optional(),
    tags: z.array(z.string()).default([]),
    readingTimeMinutes: z.number().int().positive().optional(),
    isFeatured: z.boolean().optional(),
    lockSync: z.boolean().optional(),
    visibility: z.enum(["public", "private"]).default("public"),
  }),
});

export const collections = {
  site,
  blog,
};
