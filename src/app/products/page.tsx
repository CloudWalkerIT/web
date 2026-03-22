import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Atomatize — AI-Powered Content Repurposing",
  description:
    "Atomatize by Cloudwalker IT: transform long-form content into platform-ready social media posts and multi-format deliverables with AI.",
};

const features = [
  {
    title: "Content Atomization",
    desc: "Transform long-form articles, podcasts, and videos into dozens of platform-ready social media posts using AI-powered content repurposing.",
  },
  {
    title: "Multi-Platform Output",
    desc: "Generate tailored content for Twitter/X, LinkedIn, Instagram, TikTok, and more — each optimized for the platform's format and audience.",
  },
  {
    title: "Brand Voice Consistency",
    desc: "AI maintains your unique brand voice and tone across every piece of repurposed content, ensuring cohesive messaging at scale.",
  },
  {
    title: "Smart Scheduling",
    desc: "Queue and schedule repurposed content across platforms with intelligent timing recommendations for maximum engagement.",
  },
  {
    title: "Analytics Dashboard",
    desc: "Track performance of repurposed content across all platforms with unified analytics and actionable insights.",
  },
  {
    title: "API-First Architecture",
    desc: "RESTful APIs and webhooks let you integrate Atomatize into your existing workflows and content pipelines seamlessly.",
  },
];

const tiers = [
  {
    name: "Creator",
    price: "$19/mo",
    features: [
      "5 source content pieces/month",
      "All text output types (12 per piece)",
      "1 brand voice profile",
      "Copy-to-clipboard",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: "$49/mo",
    popular: true,
    features: [
      "20 source content pieces/month",
      "All text output types (12 per piece)",
      "2 brand voice profiles",
      "Social publishing & scheduling",
      "Priority email support",
    ],
  },
  {
    name: "Scale",
    price: "$149/mo",
    features: [
      "Unlimited source content/month",
      "All text output types (12 per piece)",
      "5 brand voice profiles",
      "Social publishing & scheduling",
      "24-hour email support",
    ],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Atomatize",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Cloud",
  url: "https://atomatize.com",
  description:
    "AI-powered content repurposing platform by Cloudwalker IT — transform long-form content into platform-ready social media posts.",
  offers: [
    {
      "@type": "Offer",
      name: "Creator",
      price: "19.00",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Pro",
      price: "49.00",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Scale",
      price: "149.00",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  ],
};

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/3 top-1/3 h-80 w-80 rounded-full bg-electric-500/10 blur-3xl" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-electric-400">
            Our Product
          </p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
            Atom<span className="text-electric-400">atize</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            AI-powered content repurposing that transforms long-form content into platform-ready social media posts — automatically.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://atomatize.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-electric-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-electric-500/25 transition hover:bg-electric-600"
            >
              Try Atomatize
            </a>
            <Link
              href="/contact/"
              className="rounded-lg border border-white/10 px-8 py-3 text-sm font-semibold text-gray-300 transition hover:border-electric-400/50 hover:text-electric-400"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-white/5 bg-dark-800/50 p-6 transition hover:border-electric-400/20"
            >
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <Section className="bg-dark-800/30">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Plans & Pricing</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Every plan includes a 14-day free trial — no credit card required.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl border p-8 ${
                tier.popular
                  ? "border-electric-400/50 bg-dark-700/50 shadow-lg shadow-electric-500/10"
                  : "border-white/5 bg-dark-800/50"
              }`}
            >
              {tier.popular && (
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-electric-400">
                  Most Popular
                </p>
              )}
              <h3 className="text-xl font-bold">{tier.name}</h3>
              <p className="mt-2 text-2xl font-bold text-cloud-400">{tier.price}</p>
              <ul className="mt-6 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="mt-0.5 text-accent-400">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://atomatize.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 block rounded-lg px-6 py-3 text-center text-sm font-semibold transition ${
                  tier.popular
                    ? "bg-electric-500 text-white hover:bg-electric-600"
                    : "border border-white/10 text-gray-300 hover:border-electric-400/50"
                }`}
              >
                Start Free Trial
              </a>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
