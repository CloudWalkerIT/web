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
| `/` | Home — hero, features, stats, CTA |
| `/services/` | Services — cloud, AI, security, DevOps, managed IT |
| `/products/` | Products — Atomatize product page with pricing tiers |
| `/insights/` | Insights — blog listing |
| `/insights/[slug]/` | Individual blog post |
| `/about/` | About — mission, values, teams |
| `/contact/` | Contact — form with serverless fallback |

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npx serve out
```

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

The post will be automatically picked up at build time and available at `/insights/your-file-name/`.

## Deploying to Cloudflare Pages

### Via Dashboard

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Create a new project and connect your Git repository
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Node.js version**: `22` (set via environment variable `NODE_VERSION=22`)
4. Deploy

### Via Wrangler CLI

```bash
# Install wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build the site
npm run build

# Deploy
wrangler pages deploy out --project-name=cloudwalker-it
```

### Custom Domain (cloudwalker.it)

1. In Cloudflare Pages project settings, go to **Custom domains**
2. Add `cloudwalker.it` and `www.cloudwalker.it`
3. If your domain DNS is managed by Cloudflare, records are added automatically
4. If external DNS, add the CNAME record as instructed:
   - `cloudwalker.it` → `cloudwalker-it.pages.dev`
   - `www.cloudwalker.it` → `cloudwalker-it.pages.dev`
5. SSL is provisioned automatically by Cloudflare

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

## SEO Features

- Full Open Graph and Twitter Card metadata on all pages
- JSON-LD structured data (Organization, SoftwareApplication, Article)
- Auto-generated `sitemap.xml` and `robots.txt`
- Semantic HTML with proper heading hierarchy
- Performance-optimized static HTML output

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with header/footer
│   ├── page.tsx            # Home page
│   ├── not-found.tsx       # 404 page
│   ├── sitemap.ts          # Auto-generated sitemap
│   ├── robots.ts           # Robots.txt
│   ├── globals.css         # Tailwind + theme config
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
│   └── Section.tsx         # Reusable section wrapper
├── content/
│   └── insights/           # Markdown blog posts
└── lib/
    └── insights.ts         # Blog post loading utilities
```

## License

Proprietary — Cloudwalker IT
