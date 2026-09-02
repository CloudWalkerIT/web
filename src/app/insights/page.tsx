import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import { formatInsightDate, getAllInsights } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practitioner notes on Azure, Kubernetes, platform engineering, and cloud security: field reports from real engagements and the SaaS we operate.",
};

export default function InsightsPage() {
  const insights = getAllInsights();

  return (
    <>
      <Section>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cloud-400">
            Insights
          </p>
          <h1 className="mt-2 text-4xl font-bold">
            Analysis & thought leadership
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Deep dives into cloud, AI, security, and enterprise technology trends — written by practitioners, not pundits.
          </p>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-8 lg:grid-cols-2">
          {insights.map((post) => (
            <Link
              key={post.slug}
              href={`/insights/${post.slug}/`}
              className="group rounded-xl border border-white/5 bg-dark-800/50 p-8 transition hover:border-cloud-400/20"
            >
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
              <h2 className="mt-4 text-xl font-bold transition group-hover:text-cloud-400">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-gray-400">{post.description}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
                <time dateTime={post.date}>{formatInsightDate(post.date)}</time>
                <span>{post.readTime}</span>
                <span>{post.author}</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
