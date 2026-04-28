# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
npm run dev        # Start dev server (Next.js)
npm run build      # Production build (static export to out/)
npm run lint       # Lint with Next.js built-in linter
npx serve out      # Preview production build locally
```

Deployment to Cloudflare Pages: `wrangler pages deploy out --project-name=cloudwalker-it`

## Architecture

Next.js 16 App Router marketing site for Cloudwalker IT, statically exported for Cloudflare Pages. All pages are server components by default; only Header (mobile menu) and Contact form use `"use client"`.

**Static export constraints:** `output: "export"` in next.config.ts means no API routes, no SSR, no ISR. Images are unoptimized. All routes use trailing slashes.

**Path alias:** `@/*` maps to `./src/*`.

## Blog System

Markdown files in `src/content/insights/` with gray-matter frontmatter. Required frontmatter fields: `title`, `description`, `date`, `author`, `tags`, `readTime`.

`src/lib/insights.ts` provides `getAllInsights()`, `getInsightBySlug(slug)`, and `getAllInsightSlugs()`. The slug is derived from the filename. Blog detail page (`src/app/insights/[slug]/page.tsx`) uses `generateStaticParams()` and a custom regex-based `renderMarkdown()` function — there is no external markdown rendering library.

## Styling

Tailwind CSS 4 with a custom dark theme defined in `src/app/globals.css` via `@theme`. Key color tokens: `--color-dark-*` (backgrounds), `--color-cloud-*` (cyan accents), `--color-electric-*` (purple accents), `--color-accent-*` (green accents). Font: Inter.

## SEO

Every page exports Next.js `metadata`. JSON-LD structured data is embedded in pages. `sitemap.ts` and `robots.ts` auto-generate at build time with `force-static`.

## Contact Form

The contact form POSTs to `/api/contact` (expected to be a Cloudflare Worker) and falls back to `mailto:hello@cloudwalker.it` if the API is unavailable.
