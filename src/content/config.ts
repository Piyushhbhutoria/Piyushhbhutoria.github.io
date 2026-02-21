import { defineCollection, z } from "astro:content";

const site = defineCollection({
  type: "content",
  // Accept mixed frontmatter from all sections
  schema: z.object({}).passthrough(),
});

const blog = defineCollection({
  type: "content",
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
