import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import { getInsightBySlug, getAllInsightSlugs, formatInsightDate } from "@/lib/insights";

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
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Cloudwalker IT — Azure cloud engineering",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/og-image.png"],
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
  // Extract fenced code blocks first so later passes (HTML sanitizer, headings,
  // paragraph wrap) can't touch their contents. Each block is replaced with a
  // unique placeholder and substituted back at the very end.
  const codeBlocks: string[] = [];
  let html = content.replace(/^```(\w*)\n([\s\S]*?)^```$/gm, (_match, _lang, code) => {
    // Newlines are encoded as &#10; so the paragraph pass (line-by-line via gm)
    // can't see them as separate lines. <pre> renders &#10; as a real newline.
    codeBlocks.push(
      `<pre class="my-6 overflow-x-auto rounded-lg bg-dark-800 p-4"><code class="text-sm text-gray-300">${escapeHtml(code.trimEnd()).replace(/\n/g, "&#10;")}</code></pre>`
    );
    // Placeholder uses <div> so the HTML sanitizer keeps it (div is whitelisted)
    // and the paragraph regex skips it (it has a <div> exception).
    return `<div data-codeblock="${codeBlocks.length - 1}"></div>`;
  });

  // Preserve safe block-level HTML (tables, divs) and strip everything else
  const safeTagPattern = /^(\/?)(?:div|table|thead|tbody|tfoot|tr|th|td|caption|colgroup|col)\b/i;
  html = html.replace(/<([^>]*)>/g, (_match, inner) =>
    safeTagPattern.test(inner.trim()) ? _match : ""
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

  // Ordered lists — preserve the actual number in the marker
  html = html.replace(/^(\d+)\. (.+)$/gm, '<li data-md-list="ol" class="ml-4 flex gap-2 text-gray-300"><span class="text-cloud-400 font-semibold shrink-0 tabular-nums">$1.</span><span>$2</span></li>');

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li data-md-list="ul" class="ml-4 flex gap-2 text-gray-300"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cloud-400"></span><span>$1</span></li>');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="my-8 border-white/10" />');

  // Paragraphs (lines not already wrapped in block or table elements)
  html = html.replace(/^(?!\s*<[hluopbc]|\s*<\/?(?:div|table|thead|tbody|tfoot|tr|th|td|caption)\b)((?!^$).+)$/gm, '<p class="mb-4 text-gray-400 leading-relaxed">$1</p>');

  // Wrap adjacent ordered items in <ol>; unordered in <ul>
  html = html.replace(/(<li data-md-list="ol"[^>]*>.*<\/li>\n?)+/g, '<ol class="my-4 space-y-2">$&</ol>');
  html = html.replace(/(<li data-md-list="ul"[^>]*>.*<\/li>\n?)+/g, '<ul class="my-4 space-y-2">$&</ul>');

  // Substitute code block placeholders back in
  html = html.replace(/<div data-codeblock="(\d+)"><\/div>/g, (_match, i) => codeBlocks[Number(i)]);

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
            className="mb-8 inline-flex items-center gap-1 text-sm text-gray-400 transition hover:text-cloud-400"
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

          <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
            <time dateTime={post.date}>{formatInsightDate(post.date)}</time>
            <span>{post.readTime}</span>
            <span>{post.author}</span>
          </div>

          <div
            className="prose-dark mt-12"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />

          <aside className="mt-16 rounded-xl border border-white/10 bg-dark-800/40 p-8">
            <h2 className="text-xl font-bold">Working through something like this?</h2>
            <p className="mt-3 text-gray-400">
              Problems like the one above are what our engagements are built around:
              assessment, implementation, and the operational follow-through. A short
              call is usually enough to tell whether we are the right fit.
            </p>
            {post.tags.some((t) => ["tls", "certificates"].includes(t.toLowerCase())) && (
              <p className="mt-3 text-gray-400">
                If the pain is certificate lifecycle specifically, our product{" "}
                <a
                  href="https://krakenkey.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cloud-400 underline decoration-cloud-400/40 underline-offset-2 hover:decoration-cloud-400"
                >
                  KrakenKey
                </a>{" "}
                may solve it without an engagement.
              </p>
            )}
            <Link
              href="/contact/"
              className="mt-6 inline-block rounded-lg bg-cloud-500 px-8 py-3 text-sm font-semibold text-dark-900 shadow-lg shadow-cloud-500/25 transition hover:bg-cloud-400"
            >
              Start a conversation
            </Link>
            <p className="mt-6 text-sm text-gray-400">
              Not ready for that? New posts land in the{" "}
              <a
                href="/feed.xml"
                className="text-cloud-400 underline decoration-cloud-400/40 underline-offset-2 hover:decoration-cloud-400"
              >
                RSS feed
              </a>
              .
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
