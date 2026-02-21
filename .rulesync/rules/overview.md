---
root: false
targets:
  - '*'
description: Project overview and general development guidelines
globs:
  - '**/*'
cursor:
  description: Project overview and general development guidelines
  globs:
    - '**/*'
---
# Project Overview

## Project Context

- **Goals**: Personal portfolio site deployed to GitHub Pages at `https://piyushhbhutoria.github.io`.
- **Stack**: Astro 5, React 19, MDX, Tailwind v4, Radix UI, Lucide React. Path alias `@/` → `src/`.
- **Constraints**: Static site; build output must work on GitHub Pages. Use TypeScript; follow existing code style and architecture below.
- **Architecture**: Astro pages with React islands. Content in `src/content/site/*.md`; components in `src/components/` (feature-style: Hero, About, Projects, Experience, etc.). Shared UI in `components/ui/`; hooks in `hooks/`.
- **Validation**: `npm run dev` (local), `npm run build` (production), `npm run build:analyze` (bundle stats in `dist/stats.html`).

## General Guidelines

- Follow consistent naming conventions
- Write self-documenting code with clear variable and function names
- Prefer composition over inheritance
- Use meaningful comments for complex business logic

## Code Style

- Use 2 spaces for indentation
- Use double quotes for strings
- Use trailing commas in multi-line objects and arrays

## Architecture Principles

- Organize code by feature, not by file type
- Keep related files close together
- Implement proper error handling
- Follow single responsibility principle
