import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "ContentEngine — AI-Powered Content Intelligence",
  description:
    "ContentEngine by Cloudwalker IT: AI-driven content analysis, market intelligence, and automated insight generation for data-driven enterprises.",
};

const features = [
  {
    title: "AI Content Analysis",
    desc: "Automatically analyze market content, competitor publications, and industry trends using advanced NLP and LLM pipelines.",
  },
  {
    title: "Trend Forecasting",
    desc: "Predictive models identify emerging market trends before they become mainstream, giving you a strategic time advantage.",
  },
  {
    title: "Automated Reporting",
    desc: "Generate executive-ready reports, summaries, and briefs automatically — from raw data to polished deliverables.",
  },
  {
    title: "Multi-Source Ingestion",
    desc: "Ingest and correlate data from news feeds, social media, financial reports, patents, and internal documents.",
  },
  {
    title: "Custom Dashboards",
    desc: "Real-time dashboards tailored to your KPIs, with drill-down capabilities and alerting for critical signals.",
  },
  {
    title: "API-First Architecture",
    desc: "RESTful APIs and webhooks let you integrate ContentEngine into your existing workflows and tools seamlessly.",
  },
];

const tiers = [
  {
    name: "Starter",
    price: "Contact Us",
    features: [
      "Up to 1,000 analyses/month",
      "3 data source integrations",
      "Weekly trend reports",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: "Contact Us",
    popular: true,
    features: [
      "Up to 25,000 analyses/month",
      "Unlimited data sources",
      "Daily trend reports & alerts",
      "Custom dashboards",
      "API access",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    features: [
      "Unlimited analyses",
      "Custom ML model training",
      "Real-time streaming analytics",
      "Dedicated infrastructure",
      "On-premise deployment option",
      "Dedicated success manager",
    ],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ContentEngine",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Cloud",
  description:
    "AI-powered content intelligence and market analysis platform by Cloudwalker IT.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    priceCurrency: "USD",
  },
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
            Content<span className="text-electric-400">Engine</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            AI-powered content intelligence that transforms unstructured market data into actionable strategic insights — automatically.
          </p>
          <Link
            href="/contact/"
            className="mt-8 inline-block rounded-lg bg-electric-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-electric-500/25 transition hover:bg-electric-600"
          >
            Request a Demo
          </Link>
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
            Flexible plans that scale with your intelligence needs.
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
              <Link
                href="/contact/"
                className={`mt-8 block rounded-lg px-6 py-3 text-center text-sm font-semibold transition ${
                  tier.popular
                    ? "bg-electric-500 text-white hover:bg-electric-600"
                    : "border border-white/10 text-gray-300 hover:border-electric-400/50"
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
