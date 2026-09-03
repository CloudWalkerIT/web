# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
npm run dev        # Start dev server (Next.js)
npm run build      # Production build (static export to out/)
npm run lint       # Lint with Next.js built-in linter
npx serve out      # Preview production build locally
```

Deployment: the Cloudflare Pages project `cwit` is git-connected to `krakenhavoc/CWIT`. Merges to `main` deploy production automatically; every PR gets a preview deployment linked in a PR comment. Never commit directly to `main` — branch and PR. Do not use wrangler direct upload (the old `cloudwalker-it` direct-upload project and its proxy worker are retired).

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

The contact form POSTs to `/api/contact`, which is implemented as a Cloudflare Pages Function at `functions/api/contact.ts`. The function sends mail via Resend when `RESEND_API_KEY` is set in the Pages project's environment variables; if the key is missing or Resend fails, the function returns a non-2xx response and the client falls back to `mailto:hello@cloudwalker.it`.

Optional Pages env vars: `CONTACT_FROM` and `CONTACT_TO` override the default sender (`Cloudwalker IT <contact@cloudwalker.it>`) and recipient (`hello@cloudwalker.it`). The form includes a honeypot field (`website`) — submissions where it's filled get a fake-success response.

The `functions/` directory is excluded from the Next.js TypeScript project (see `tsconfig.json` exclude). Pages Functions are checked and deployed by Cloudflare at deploy time, not by `npm run build`.
