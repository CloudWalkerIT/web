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

function renderMarkdown(content: string): string {
  // Simple markdown to HTML conversion for static export
  return content
    .replace(/^### (.+)$/gm, '<h3 class="mt-8 mb-3 text-lg font-semibold text-white">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="mt-10 mb-4 text-xl font-bold text-white">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="mt-10 mb-4 text-2xl font-bold text-white">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-cloud-400 hover:underline">$1</a>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 flex gap-2 text-gray-300"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cloud-400"></span>$1</li>')
    .replace(/^---$/gm, '<hr class="my-8 border-white/10" />')
    .replace(/^(?!<[hluoa-z])((?!^$).+)$/gm, '<p class="mb-4 text-gray-400 leading-relaxed">$1</p>')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul class="my-4 space-y-2">$&</ul>');
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
