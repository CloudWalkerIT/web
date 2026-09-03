import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Cloudwalker IT products: KrakenKey for automated TLS certificate management and endpoint monitoring, and Atomatize for AI-powered content repurposing.",
};

const atomatizeFeatures = [
  {
    title: "Twelve outputs per source",
    desc: "Each piece of source content — a blog post, article, or newsletter — becomes twelve ready-to-use assets in seconds: LinkedIn posts, X/Twitter posts, a thread, an email block, and a long-form article.",
  },
  {
    title: "Trained on your voice",
    desc: "Atomatize is trained on your writing style, so every output reads in your voice rather than as generic AI prose. Manage multiple voice profiles per account.",
  },
  {
    title: "LinkedIn variations",
    desc: "Four LinkedIn takes from every source — story, contrarian, tip, and discussion — so you can pick the angle that fits the audience and discard the rest.",
  },
  {
    title: "X / Twitter coverage",
    desc: "Five standalone X/Twitter post variants per source (insight, tip, hot take, quote, question) plus a six-tweet narrative thread, each tailored to platform format.",
  },
  {
    title: "Long-form & email",
    desc: "A 600–800 word article ready for blog publication, plus an email newsletter block formatted for any ESP — generated alongside the social outputs from the same source.",
  },
  {
    title: "No setup overhead",
    desc: "Paste source content; receive twelve outputs in seconds. No prompt engineering, no template tweaking, no copying back and forth from a chatbot.",
  },
];

const atomatizeTiers = [
  {
    name: "Creator",
    price: "$19/mo",
    features: [
      "5 source pieces per month",
      "12 outputs per piece",
      "1 brand voice profile",
      "Copy-to-clipboard",
    ],
  },
  {
    name: "Pro",
    price: "$49/mo",
    popular: true,
    features: [
      "20 source pieces per month",
      "12 outputs per piece",
      "2 brand voice profiles",
      "Priority email support",
    ],
  },
  {
    name: "Scale",
    price: "$149/mo",
    features: [
      "Unlimited source content per month",
      "12 outputs per piece",
      "5 brand voice profiles",
      "24-hour email support",
    ],
  },
];

const krakenKeyFeatures = [
  {
    title: "Automated ACME Challenges",
    desc: "Two DNS records once — a TXT for ownership and a CNAME to delegate ACME challenges — then KrakenKey handles every Let's Encrypt validation automatically. No manual records per certificate, no cron jobs.",
  },
  {
    title: "Client-Side CSR Generation",
    desc: "Certificate Signing Requests are generated in-browser using the WebCrypto API. The private key is created locally and never transmitted to our servers — only the CSR is sent.",
  },
  {
    title: "REST API & CLI",
    desc: "Every dashboard action is available via the REST API and the krakenkey CLI. AI agent tool definitions ship for automated workflows in agentic systems.",
  },
  {
    title: "Endpoint Monitoring",
    desc: "Register any TLS endpoint and KrakenKey scans it on a schedule from distributed probes. Each scan performs a real TLS handshake and reports certificate health, chain validation, and latency.",
  },
  {
    title: "Free TLS Scanner",
    desc: "A public scanner at krakenkey.io/scanner — no signup, instant TLS configuration check for any host. Powered by the same open-source probe that runs paid endpoint monitoring.",
  },
  {
    title: "Team Access & RBAC",
    desc: "Invite team members into organizations with role-based access control — owner, admin, member, and viewer roles, available on the Team plan.",
  },
];

const krakenKeyTiers = [
  {
    name: "Free",
    price: "$0",
    features: [
      "3 domains, 10 active certificates",
      "ACME automation via Let's Encrypt",
      "In-browser CSR generator",
      "REST API & web dashboard",
      "3 monitored endpoints",
    ],
  },
  {
    name: "Starter",
    price: "$29/mo",
    popular: true,
    features: [
      "10 domains, 75 active certificates",
      "30-day auto-renewal window",
      "Certificate expiry notifications",
      "Double API rate limits",
      "10 endpoints, 2 hosted probe regions",
    ],
  },
  {
    name: "Team",
    price: "$79/mo",
    features: [
      "25 domains, 375 active certificates",
      "Organizations with RBAC",
      "Team roles: owner, admin, member, viewer",
      "Higher rate limits (300 reads/min)",
      "50 endpoints, 5 hosted regions, 5-min scans",
    ],
  },
];

const jsonLd = [
  {
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
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "KrakenKey",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cloud",
    url: "https://krakenkey.io",
    description:
      "Automated TLS certificate management — one-time DNS setup, then certificates in 4 minutes with no ongoing records to manage.",
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Starter",
        price: "29.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Team",
        price: "79.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    ],
  },
];

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Products Hero */}
      <Section>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cloud-400">
            Our Products
          </p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
            Tools built for builders
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Purpose-built platforms that solve real problems — from certificate management to content operations.
          </p>
        </div>
      </Section>

      {/* KrakenKey Hero */}
      <Section id="krakenkey" className="relative scroll-mt-24 overflow-hidden bg-dark-800/30">
        <div className="absolute inset-0 -z-10">
          <div className="absolute right-1/3 top-1/3 h-80 w-80 rounded-full bg-accent-500/10 blur-3xl" />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Kraken<span className="text-accent-400">Key</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Automated TLS certificate management. One-time DNS setup, then certificates in 4 minutes — no ongoing records to manage, no cron jobs, no forgotten renewals. Plus endpoint monitoring from distributed probes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://krakenkey.io"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-accent-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-500/25 transition hover:bg-accent-600"
            >
              Get Started Free
            </a>
            <Link
              href="/contact/"
              className="rounded-lg border border-white/10 px-8 py-3 text-sm font-semibold text-gray-300 transition hover:border-accent-400/50 hover:text-accent-400"
            >
              Learn More
            </Link>
          </div>
        </div>
      </Section>

      {/* KrakenKey Features */}
      <Section>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {krakenKeyFeatures.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-white/5 bg-dark-800/50 p-6 transition hover:border-accent-400/20"
            >
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* KrakenKey Pricing */}
      <Section className="bg-dark-800/30">
        <div className="text-center">
          <h2 className="text-3xl font-bold">KrakenKey Plans</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Free to start — no credit card required. Scale as your infrastructure grows.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {krakenKeyTiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl border p-8 ${
                tier.popular
                  ? "border-accent-400/50 bg-dark-700/50 shadow-lg shadow-accent-500/10"
                  : "border-white/5 bg-dark-800/50"
              }`}
            >
              {tier.popular && (
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent-400">
                  Most Popular
                </p>
              )}
              <h3 className="text-xl font-bold">{tier.name}</h3>
              <p className="mt-2 text-2xl font-bold text-accent-400">{tier.price}</p>
              <ul className="mt-6 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="mt-0.5 text-accent-400">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://krakenkey.io"
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 block rounded-lg px-6 py-3 text-center text-sm font-semibold transition ${
                  tier.popular
                    ? "bg-accent-500 text-white hover:bg-accent-600"
                    : "border border-white/10 text-gray-300 hover:border-accent-400/50"
                }`}
              >
                {tier.price === "$0" ? "Get Started Free" : "Start Free"}
              </a>
            </div>
          ))}
        </div>
      </Section>
      {/* Atomatize Hero */}
      <Section id="atomatize" className="relative scroll-mt-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/3 top-1/3 h-80 w-80 rounded-full bg-electric-500/10 blur-3xl" />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Atom<span className="text-electric-400">atize</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Paste a blog post, article, or newsletter; receive twelve platform-ready outputs in your voice in seconds — LinkedIn variations, X/Twitter posts, a thread, an email block, and a long-form article.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://atomatize.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-electric-500 px-8 py-3 text-sm font-semibold text-dark-900 shadow-lg shadow-electric-500/25 transition hover:bg-electric-400"
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

      {/* Atomatize Features */}
      <Section className="bg-dark-800/30">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {atomatizeFeatures.map((f) => (
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

      {/* Atomatize Pricing */}
      <Section>
        <div className="text-center">
          <h2 className="text-3xl font-bold">Atomatize Plans</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Every plan includes a 14-day free trial — no credit card required.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {atomatizeTiers.map((tier) => (
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
              <p className="mt-2 text-2xl font-bold text-electric-400">{tier.price}</p>
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
                    ? "bg-electric-500 text-dark-900 hover:bg-electric-400"
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
