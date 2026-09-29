import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Products",
  description:
    "KrakenKey automates TLS certificates and monitors endpoints. Atomatize turns long-form writing into social, email and blog drafts. Both are built and run by Cloudwalker IT.",
};

const atomatizeFeatures = [
  {
    title: "Twelve drafts per piece",
    desc: "Paste in a blog post, article or newsletter and get twelve drafts back: LinkedIn posts, X posts, a thread, an email block and a long-form article.",
  },
  {
    title: "Written in your voice",
    desc: "Atomatize learns from samples of your writing. You can keep several voice profiles on one account.",
  },
  {
    title: "Four LinkedIn angles",
    desc: "Story, contrarian, tip and discussion versions of every piece. Use the one that suits the audience.",
  },
  {
    title: "X posts and a thread",
    desc: "Five single posts (insight, tip, hot take, quote, question) and a six-post thread.",
  },
  {
    title: "Article and newsletter block",
    desc: "A 600 to 800 word article for your blog, and an email block that pastes into any newsletter tool.",
  },
  {
    title: "No prompt writing",
    desc: "Paste the source and go. There are no prompts or templates to maintain.",
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
    title: "Automated ACME challenges",
    desc: "Add two DNS records once: a TXT record to prove ownership and a CNAME that delegates ACME challenges. After that, KrakenKey handles every Let's Encrypt validation itself.",
  },
  {
    title: "Client-side CSR generation",
    desc: "Certificate signing requests are generated in the browser with the WebCrypto API. The private key is created locally and never sent to our servers. Only the CSR is.",
  },
  {
    title: "REST API and CLI",
    desc: "Everything in the dashboard is also available through the REST API and the krakenkey CLI. Tool definitions for AI agents are included.",
  },
  {
    title: "Endpoint monitoring",
    desc: "Register any TLS endpoint and KrakenKey scans it on a schedule from probes in several regions. Each scan does a real TLS handshake and reports certificate health, chain validation and latency.",
  },
  {
    title: "Free TLS scanner",
    desc: "A public scanner at krakenkey.io/scanner checks any host's TLS setup without an account. It runs on the same open-source probe as paid monitoring.",
  },
  {
    title: "Team access and RBAC",
    desc: "Organizations with owner, admin, member and viewer roles, on the Team plan.",
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
      "Content repurposing tool from Cloudwalker IT that turns long-form writing into social, email and blog drafts.",
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
      "Automated TLS certificate management with a one-time DNS setup, plus endpoint monitoring.",
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
            Products
          </p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
            Two products we build and run
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            KrakenKey for TLS certificates and endpoint monitoring, and Atomatize for turning long-form writing into social and email posts.
          </p>
        </div>
      </Section>

      {/* KrakenKey Hero */}
      <Section id="krakenkey" className="scroll-mt-24 bg-dark-800/30">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Kraken<span className="text-accent-400">Key</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Automated TLS certificates. After a one-time DNS setup, certificates issue in about four minutes and renew on their own. KrakenKey also monitors your endpoints from probes in several regions.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://krakenkey.io?utm_source=cloudwalker.it&utm_medium=referral&utm_campaign=products"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-accent-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
            >
              Start free
            </a>
            <a
              href="https://krakenkey.io/scanner?utm_source=cloudwalker.it&utm_medium=referral&utm_campaign=products"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/10 px-8 py-3 text-sm font-semibold text-gray-300 transition hover:border-accent-400/50 hover:text-accent-400"
            >
              Try the free scanner
            </a>
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
          <h2 className="text-3xl font-bold">KrakenKey plans</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            The free plan doesn&apos;t need a credit card.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {krakenKeyTiers.map((tier) => (
            <div
              key={tier.name}
              className="rounded-xl border p-8 border-white/5 bg-dark-800/50"
            >
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
                href="https://krakenkey.io?utm_source=cloudwalker.it&utm_medium=referral&utm_campaign=pricing"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block rounded-lg px-6 py-3 text-center text-sm font-semibold transition border border-white/10 text-gray-300 hover:border-accent-400/50"
              >
                {tier.price === "$0" ? "Start free" : "Start with the free plan"}
              </a>
            </div>
          ))}
        </div>
      </Section>
      {/* Atomatize Hero */}
      <Section id="atomatize" className="scroll-mt-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Atom<span className="text-electric-400">atize</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Paste in a blog post, article or newsletter and get twelve drafts back in your voice: LinkedIn and X posts, a thread, an email block and a long-form article.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://atomatize.com?utm_source=cloudwalker.it&utm_medium=referral&utm_campaign=products"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-electric-500 px-8 py-3 text-sm font-semibold text-dark-900 transition hover:bg-electric-400"
            >
              Try Atomatize
            </a>
            <a
              href="#atomatize-pricing"
              className="rounded-lg border border-white/10 px-8 py-3 text-sm font-semibold text-gray-300 transition hover:border-electric-400/50 hover:text-electric-400"
            >
              See pricing
            </a>
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
      <Section id="atomatize-pricing" className="scroll-mt-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Atomatize plans</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Every plan has a 14-day free trial, and starting it doesn&apos;t need a credit card.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {atomatizeTiers.map((tier) => (
            <div
              key={tier.name}
              className="rounded-xl border p-8 border-white/5 bg-dark-800/50"
            >
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
                href="https://atomatize.com?utm_source=cloudwalker.it&utm_medium=referral&utm_campaign=pricing"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block rounded-lg px-6 py-3 text-center text-sm font-semibold transition border border-white/10 text-gray-300 hover:border-electric-400/50"
              >
                Start free trial
              </a>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
