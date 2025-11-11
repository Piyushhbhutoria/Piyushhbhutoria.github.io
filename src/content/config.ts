import { defineCollection, z } from 'astro:content';

const site = defineCollection({
    type: 'content',
    // Accept mixed frontmatter from all sections
    schema: z.object({}).passthrough(),
});

export const collections = {
    site,
};
