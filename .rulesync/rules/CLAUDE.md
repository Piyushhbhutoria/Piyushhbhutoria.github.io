---
root: true
targets:
  - '*'
globs:
  - '**/*'
---
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

- **What**: Piyushh Bhutoria's personal portfolio site, deployed statically to GitHub Pages at `https://piyushhbhutoria.github.io`.
- **Stack**: Astro 6, React 19 (islands), MDX, Tailwind CSS v4 (via `@tailwindcss/vite`), Radix UI, Lucide React, TypeScript.
- **Path alias**: `@/` → `src/` (configured in both `astro.config.mjs` vite resolve alias and `tsconfig.json`).

## Commands

```bash
npm run dev            # local dev server (astro dev)
npm run build          # production build to dist/
npm run preview        # preview the production build
npm run build:analyze  # build + bundle stats at dist/stats.html (rollup-plugin-visualizer)
npm run blog:sync      # tsx scripts/sync-medium.ts — pulls posts from the Medium RSS feed
```

There is no lint or test script configured. Type-check with `npx astro check` (uses `@astrojs/check`, already a devDependency).

CI (`.github/workflows/pages.yml`) runs `npm ci` then `npm run build` on push to `main` and deploys `dist/` to GitHub Pages. The `blog:sync` step is currently commented out there — Medium sync is a manual/local step, not part of CI.

## Architecture

### Single entry point, content-driven sections

`src/pages/index.astro` is the only real page. At build time it:
1. Loads each site section (`hero`, `about`, `experience`, `projects`, `opensource-projects`, `skills`, `certifications`, `achievements`, `education`, `contact`) via `getEntry("site", <slug>)`.
2. Optimizes project card images through `astro:assets` `getImage` and maps them onto entries by filename (see the `imageMap` in `index.astro`) — project image files live in `src/assets/projects/` and are referenced from content frontmatter via a `file` field.
3. Passes everything as props into `<App client:load />`, a single React island. `App.tsx` wraps `Index.tsx` in `ThemeProvider`/`TooltipProvider`/`Toaster`, and `Index.tsx` renders each section component (`Hero`, `About`, `RecentBlogs`, `Projects`, `OpenSourceProjects`, `Experience`, `Skills`, `Certifications`, `Education`, `Contact`) in order.

Because the whole page hydrates as one island (`client:load` on `App`), adding/removing a section means editing `Index.tsx`, its prop type in `src/types/index.ts`, and threading the new data through `index.astro`.

### Content collections (`src/content.config.ts`)

Two collections, both loaded via `astro/loaders` `glob()`:
- **`site`** — one markdown file per section under `src/content/site/*.md`. Schema is an open passthrough (`z.object({}).passthrough()`) since each file's frontmatter shape is completely different (matches the corresponding `*Data` interface in `src/types/index.ts`). To change what a section renders, edit its content file's frontmatter, not the component, when possible.
- **`blog`** — structured, schema-validated posts under `src/content/blog/*.mdx` (Medium/LinkedIn syndication). Files under any `_templates/` path are excluded from the collection glob pattern.

### Blog

- `src/lib/blog/getPosts.ts` centralizes all blog queries (`getAllBlogPosts`, `getRecentBlogPosts`, `getBlogPostBySlug`, etc.). It filters out `visibility: "private"` posts and anything under `_templates/`, and derives a canonical URL per post (`canonicalMode: "source"` points at `sourceUrl`, `"site"` points at `/blog/<slug>`).
- Pages: `src/pages/blog/index.astro` (list) and `src/pages/blog/[slug].astro` (detail). The homepage additionally shows the 3 most recent posts via `RecentBlogs`.
- `scripts/sync-medium.ts` fetches `https://medium.com/feed/@piyushhbhutoria`, sanitizes the HTML, localizes remote images into `public/blog-media/medium/<slug>/`, and writes/updates `.mdx` files in `src/content/blog/`. A post is skipped on resync once `lockSync: true` is set in its frontmatter (set automatically once all its images have been successfully localized), so manual edits to a locked post are safe from being overwritten.

### Types

`src/types/index.ts` defines the data contract for every homepage section (`HeroData`, `AboutData`, `ExperienceData`, etc.) plus the derived component prop types and the top-level `IndexProps`. `src/types/blog.ts` defines `BlogPost`. When adding a field to a content file, add it to the matching interface here too — the `site` collection schema itself won't catch mismatches since it's passthrough.

### Build/bundling notes (`astro.config.mjs`)

- Manual Rollup chunking groups vendor code into `vendor-react`, `vendor-radix-core`/`vendor-radix-ui`/`vendor-radix-unused`, `vendor-icons`, and generic `vendor`. If you add a new Radix package, check whether it needs to be added to the `optimizeDeps.exclude` list or one of the radix chunk buckets.
- `rollup-plugin-visualizer` always emits `dist/stats.html` on build (`npm run build:analyze` just points you at it).
- `site:` in the config is hardcoded to `https://piyushhbhutoria.github.io`; CI also passes `PUBLIC_SITE_URL` from the Pages step but the config doesn't currently read it.

## Rulesync-managed files — do not hand-edit

`AGENTS.md` and everything under `.claude/rules/`, `.claude/commands/`, `.claude/subagents/`, `.claude/skills/`, `.mcp.json` are generated output from [rulesync](https://github.com/dyoshikawa/rulesync), configured by `rulesync.jsonc`. The source of truth is `.rulesync/` (e.g. `.rulesync/rules/overview.md`). Edit files there and regenerate with the `rulesync` CLI rather than editing the generated files directly, or changes will be silently overwritten.
