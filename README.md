# Cloudwalker IT — Marketing Website

Production-ready marketing website for [cloudwalker.it](https://cloudwalker.it), built with Next.js and Tailwind CSS, optimized for Cloudflare Pages deployment.

## Tech Stack

- **Framework**: Next.js 16 (App Router, static export)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Blog**: Markdown with gray-matter for frontmatter parsing
- **Deployment**: Cloudflare Pages (static HTML export)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, artifact proof strip (products + partner + credentials), services overview, CTA |
| `/services/` | Services — three lines: Azure Cloud Engineering, AWS via 010 Consulting, Platform Engineering & Managed Terraform |
| `/products/` | Products — Atomatize and KrakenKey, each with feature grid and pricing tiers |
| `/insights/` | Insights — blog listing |
| `/insights/[slug]/` | Individual blog post |
| `/about/` | About — mission, credentials wall (5 verifiable cert badges), operating principles, CTA |
| `/contact/` | Contact — form posts to `/api/contact` Pages Function (Resend); mailto fallback |
| `/privacy/` | Privacy policy |
| `/feed.xml` | RSS feed of insights |

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Lint
npm run lint

# Build for production (static export to out/)
npm run build

# Preview production build
npx serve out
```

## Architecture

- Next.js App Router with `output: "export"` in `next.config.ts`, so the whole site is static HTML. That means no API routes, no SSR and no ISR. Images are unoptimized and all routes use trailing slashes.
- Pages are server components. The only client components are the Header (mobile menu), the contact form and `ScrollToHash`.
- `@/*` is an import alias for `./src/*`.
- Styling is Tailwind CSS 4 with a custom dark theme defined via `@theme` in `src/app/globals.css`. Font is Inter. See Brand colours below.
- The only server-side code is the Cloudflare Pages Function in `functions/`. It is excluded from the Next.js TypeScript project (see `tsconfig.json`) and is built and deployed by Cloudflare, not by `npm run build`.

## Brand colours

All colour tokens live in the `@theme` block in `src/app/globals.css`, in two groups.

**Cloudwalker IT** is used for everything the firm owns: header, footer, headings, links, the booking button, the hero gradient and background glows.

| Token | Hex | Role |
|---|---|---|
| `cloud-400` / `500` / `600` | `#38bdf8` / `#0ea5e9` / `#0284c7` | Blue. The lead colour: links, primary buttons, labels |
| `electric-400` / `500` / `600` | `#a78bfa` / `#8b5cf6` / `#7c3aed` | Purple. Second stop of the hero gradient, glows |
| `accent-400` / `500` | `#34d399` / `#10b981` | Green. Success states and small highlights |
| `dark-500` to `dark-900` | `#334155` to `#0a0e17` | Navy backgrounds and surfaces |

**Products** use their own sites' colours, and only where that product is the subject: its section on /products, its card on the home page, its buttons, pricing and links. Don't use them for Cloudwalker's own UI, and don't use Cloudwalker's green or purple to stand in for a product.

| Product | Tokens | Where it comes from |
|---|---|---|
| KrakenKey | `krakenkey-amber` `#f59e0b` (actions, prices), `krakenkey-cyan` `#06b6d4` / `krakenkey-cyan-light` `#22d3ee` (highlights, checkmarks) | krakenkey.io buttons and accent colour |
| Atomatize | `atomatize-orange` `#ea9941` (actions, prices), `atomatize-teal` `#2dd4bf` (highlights), `atomatize-stone` `#1c1917` / `atomatize-ink` `#0f0a07` (section backgrounds) | atomatize.com dark theme and logo |

Product logos are in `public/products/`. `atomatize.svg` is the dark-mode version of the atomatize.com icon with its colours fixed, because this site is always dark. If a product rebrands, update its tokens in `globals.css` and its logo in `public/products/`; the pages pick up the change.

## Adding Blog Posts

Create a new `.md` file in `src/content/insights/` with frontmatter:

```markdown
---
title: "Your Post Title"
description: "Brief description for SEO and cards"
date: "2026-03-10"
author: "Cloudwalker IT"
tags: ["cloud", "AI"]
readTime: "5 min read"
---

Your markdown content here...
```

All frontmatter fields shown are required. The post is picked up at build time and served at `/insights/your-file-name/` (the slug is the filename).

Loading lives in `src/lib/insights.ts` (`getAllInsights()`, `getInsightBySlug()`, `getAllInsightSlugs()`). The post page renders markdown with its own small regex-based `renderMarkdown()` in `src/app/insights/[slug]/page.tsx` rather than a markdown library, so check how new syntax renders before relying on it.

## Deployment

The site is hosted on Cloudflare Pages in the `cwit` project, which is connected to this GitHub repo (`CloudWalkerIT/web`).

- Merging to `main` deploys production.
- Every pull request gets a preview deployment, and a link to it is posted as a PR comment.
- Don't push directly to `main`. Work on a branch and open a PR.
- Don't deploy with `wrangler pages deploy`. The old `cloudwalker-it` direct-upload project and its proxy worker are retired.

Build settings in the Pages project:

- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Node.js version**: `22` (environment variable `NODE_VERSION=22`)

DNS for `cloudwalker.it` is on Cloudflare, and the domain is attached under the `cwit` project's **Custom domains**. Cloudflare manages the DNS records and certificates.

### Contact Form (Production)

The form POSTs to `/api/contact`, implemented as a Cloudflare Pages Function at `functions/api/contact.ts` that sends mail via [Resend](https://resend.com).

To enable real form submissions:

1. Sign up at resend.com (free tier: 100 emails/day, 3000/month).
2. Add `cloudwalker.it` as a domain and complete DNS verification (3 records).
3. Generate an API key in the Resend dashboard.
4. In the Cloudflare Pages project: **Settings → Environment variables** → add `RESEND_API_KEY` (Production scope) with the value from step 3.
5. Optional: override `CONTACT_FROM` (default `Cloudwalker IT <contact@cloudwalker.it>`) and `CONTACT_TO` (default `hello@cloudwalker.it`) the same way.
6. Redeploy.

If `RESEND_API_KEY` is missing or Resend rejects the request, the function returns a non-2xx response and the client falls back to opening a `mailto:hello@cloudwalker.it` link with the form contents prefilled — so the form keeps working even without Resend configured.

The form has a hidden honeypot field (`website`). Submissions that fill it in get a fake success response and are not sent.

## SEO Features

- Full Open Graph and Twitter Card metadata on all pages
- JSON-LD structured data (Organization, SoftwareApplication, Article)
- Auto-generated `sitemap.xml` and `robots.txt`
- Semantic HTML with proper heading hierarchy
- Performance-optimized static HTML output

## Project Structure

```
functions/
└── api/contact.ts          # Contact form Pages Function (Resend)
src/
├── app/
│   ├── layout.tsx          # Root layout with header/footer
│   ├── page.tsx            # Home page
│   ├── not-found.tsx       # 404 page
│   ├── sitemap.ts          # Auto-generated sitemap
│   ├── robots.ts           # Robots.txt
│   ├── globals.css         # Tailwind + theme config (brand colours)
│   ├── feed.xml/route.ts   # RSS feed
│   ├── privacy/page.tsx
│   ├── services/page.tsx
│   ├── products/page.tsx
│   ├── about/page.tsx
│   ├── contact/
│   │   ├── page.tsx        # Contact form (client component)
│   │   └── layout.tsx      # Contact metadata
│   └── insights/
│       ├── page.tsx        # Blog listing
│       └── [slug]/page.tsx # Blog post detail
├── components/
│   ├── Header.tsx          # Navigation with mobile menu
│   ├── Footer.tsx          # Footer with links
│   ├── ScrollToHash.tsx    # Scrolls to #anchors after navigation
│   └── Section.tsx         # Reusable section wrapper
├── content/
│   └── insights/           # Markdown blog posts
└── lib/
    └── insights.ts         # Blog post loading utilities
```

## License

Proprietary — Cloudwalker IT
