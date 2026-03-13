import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import { getInsightBySlug, getAllInsightSlugs } from "@/lib/insights";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllInsightSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsightBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sanitizeUrl(url: string): string {
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("/") || trimmed.startsWith("#")) {
    return trimmed;
  }
  return "#";
}

function renderMarkdown(content: string): string {
  // Strip any raw HTML tags for safety
  let html = content.replace(/<[^>]*>/g, "");

  // Fenced code blocks (```lang ... ```)
  html = html.replace(/^```(\w*)\n([\s\S]*?)^```$/gm, (_match, _lang, code) =>
    `<pre class="my-6 overflow-x-auto rounded-lg bg-dark-800 p-4"><code class="text-sm text-gray-300">${escapeHtml(code.trimEnd())}</code></pre>`
  );

  // Blockquotes (> lines)
  html = html.replace(/^(?:> (.+)\n?)+/gm, (match) => {
    const inner = match.replace(/^> /gm, "").trim();
    return `<blockquote class="my-6 border-l-2 border-cloud-400/40 pl-4 text-gray-400 italic">${inner}</blockquote>`;
  });

  // Headings
  html = html
    .replace(/^### (.+)$/gm, '<h3 class="mt-8 mb-3 text-lg font-semibold text-white">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="mt-10 mb-4 text-xl font-bold text-white">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="mt-10 mb-4 text-2xl font-bold text-white">$1</h1>');

  // Inline code (before bold/italic to avoid conflicts)
  html = html.replace(/`([^`]+)`/g, '<code class="rounded bg-dark-800 px-1.5 py-0.5 text-sm text-cloud-400">$1</code>');

  // Bold and italic
  html = html
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Links (sanitize URLs)
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, (_match, text, url) =>
    `<a href="${sanitizeUrl(url)}" class="text-cloud-400 hover:underline">${text}</a>`
  );

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-4 flex gap-2 text-gray-300"><span class="mt-1.5 text-cloud-400 text-xs font-bold shrink-0">&#8226;</span>$1</li>');

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4 flex gap-2 text-gray-300"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cloud-400"></span>$1</li>');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="my-8 border-white/10" />');

  // Paragraphs (lines not already wrapped in block elements)
  html = html.replace(/^(?!<[hluopbc])((?!^$).+)$/gm, '<p class="mb-4 text-gray-400 leading-relaxed">$1</p>');

  // Wrap adjacent <li> in <ul>
  html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul class="my-4 space-y-2">$&</ul>');

  return html;
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const post = getInsightBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "Cloudwalker IT" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <Link
            href="/insights/"
            className="mb-8 inline-flex items-center gap-1 text-sm text-gray-500 transition hover:text-cloud-400"
          >
            &larr; Back to Insights
          </Link>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-cloud-500/10 px-3 py-1 text-xs font-medium text-cloud-400"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{post.title}</h1>

          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
            <span>{post.author}</span>
          </div>

          <div
            className="prose-dark mt-12"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />
        </div>
      </Section>
    </>
  );
}
