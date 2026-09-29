import type { Metadata } from "next";
import Image from "next/image";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Products",
  description:
    "KrakenKey automates TLS certificates and monitors endpoints. Atomatize turns one article, PDF or video into a week of posts in your voice. Both are built and run by Cloudwalker IT.",
};

const atomatizeFeatures = [
  {
    title: "Twelve drafts per piece",
    desc: "Give it a blog post, newsletter, PDF, YouTube video or link. You get four LinkedIn posts, five X posts, a thread, a newsletter section and an article back.",
  },
  {
    title: "Written in your voice",
    desc: "Atomatize builds a voice profile from a few things you've written: sentence length, tone, the words you use and the ones you avoid. You can read the profile and change it.",
  },
  {
    title: "Four LinkedIn angles",
    desc: "A story, a contrarian take, a how-to and a discussion post from the same piece.",
  },
  {
    title: "X posts and a thread",
    desc: "Five standalone posts under 280 characters and a six-post thread, formatted and ready to copy.",
  },
  {
    title: "Newsletter section and article",
    desc: "A block for your next issue with a suggested subject line, and a 600 to 800 word article that takes a new angle on the source.",
  },
  {
    title: "LinkedIn publishing",
    desc: "On Pro and Scale, post to LinkedIn straight away or schedule it, with a calendar of what's queued.",
  },
];

const atomatizeTiers = [
  {
    name: "Creator",
    price: "$19/mo",
    features: [
      "5 source pieces a month",
      "All 12 outputs from each piece",
      "1 voice profile",
      "Copy, edit and export",
    ],
  },
  {
    name: "Pro",
    price: "$49/mo",
    features: [
      "20 source pieces a month",
      "All 12 outputs from each piece",
      "2 voice profiles",
      "Publish and schedule to LinkedIn",
    ],
  },
  {
    name: "Scale",
    price: "$149/mo",
    features: [
      "Unlimited source pieces",
      "All 12 outputs from each piece",
      "10 brands, 3 voice profiles each",
      "Publish and schedule to LinkedIn",
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
      "Turns one article, PDF or video into a week of LinkedIn and X posts, a newsletter section and an article, written in your voice. Built by Cloudwalker IT.",
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
            KrakenKey for TLS certificates and endpoint monitoring, and Atomatize for turning one article into a week of posts in your voice.
          </p>
        </div>
      </Section>

      {/* KrakenKey, in its own brand colours: amber actions, cyan highlights */}
      <Section id="krakenkey" className="relative scroll-mt-24 overflow-hidden bg-dark-800/30">
        <div className="absolute inset-0 -z-10">
          <div className="absolute right-1/3 top-1/3 h-80 w-80 rounded-full bg-krakenkey-cyan/10 blur-3xl" />
          <div className="absolute left-1/3 bottom-0 h-64 w-64 rounded-full bg-krakenkey-amber/5 blur-3xl" />
        </div>
        <div className="text-center">
          <h2 className="flex items-center justify-center gap-3 text-3xl font-bold sm:text-4xl">
            <Image src="/products/krakenkey.svg" alt="" width={48} height={45} className="h-11 w-auto" />
            KrakenKey
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            TLS certificate management,{" "}
            <span className="font-semibold text-krakenkey-cyan-light">automated</span>. After a one-time DNS setup, certificates issue in about four minutes and renew on their own. KrakenKey also monitors your endpoints from probes in several regions.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://krakenkey.io?utm_source=cloudwalker.it&utm_medium=referral&utm_campaign=products"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-krakenkey-amber px-8 py-3 text-sm font-semibold text-dark-900 shadow-lg shadow-krakenkey-amber/25 transition hover:bg-krakenkey-amber-hover"
            >
              Start free
            </a>
            <a
              href="https://krakenkey.io/scanner?utm_source=cloudwalker.it&utm_medium=referral&utm_campaign=products"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/10 px-8 py-3 text-sm font-semibold text-gray-300 transition hover:border-krakenkey-cyan/50 hover:text-krakenkey-cyan-light"
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
              className="rounded-xl border border-white/5 bg-dark-800/50 p-6 transition hover:border-krakenkey-cyan/30"
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
              className={`rounded-xl border p-8 ${
                tier.popular
                  ? "border-krakenkey-amber/50 bg-dark-700/50 shadow-lg shadow-krakenkey-amber/10"
                  : "border-white/5 bg-dark-800/50"
              }`}
            >
              <h3 className="text-xl font-bold">{tier.name}</h3>
              <p className="mt-2 text-2xl font-bold text-krakenkey-amber">{tier.price}</p>
              <ul className="mt-6 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="mt-0.5 text-krakenkey-cyan-light">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://krakenkey.io?utm_source=cloudwalker.it&utm_medium=referral&utm_campaign=pricing"
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 block rounded-lg px-6 py-3 text-center text-sm font-semibold transition ${
                  tier.popular
                    ? "bg-krakenkey-amber text-dark-900 hover:bg-krakenkey-amber-hover"
                    : "border border-white/10 text-gray-300 hover:border-krakenkey-amber/50"
                }`}
              >
                {tier.price === "$0" ? "Start free" : "Start with the free plan"}
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* Atomatize, in its own brand colours: warm stone, orange actions, teal highlights */}
      <Section id="atomatize" className="relative scroll-mt-24 overflow-hidden bg-atomatize-stone">
        <div className="absolute inset-0">
          <div className="absolute left-1/3 top-1/3 h-80 w-80 rounded-full bg-atomatize-orange/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-atomatize-teal/5 blur-3xl" />
        </div>
        <div className="relative text-center">
          <h2 className="flex items-center justify-center gap-3 text-3xl font-bold sm:text-4xl">
            <Image src="/products/atomatize.svg" alt="" width={40} height={40} className="h-10 w-10" />
            Atomatize
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-400">
            Turn one article into{" "}
            <span className="text-stone-100 underline decoration-atomatize-teal decoration-2 underline-offset-4">
              a week of posts
            </span>
            , written in your voice. Give it a blog post, newsletter, PDF, YouTube video or link, and it writes LinkedIn and X posts, a thread, a newsletter section and an article.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://atomatize.com?utm_source=cloudwalker.it&utm_medium=referral&utm_campaign=products"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-atomatize-orange px-8 py-3 text-sm font-semibold text-atomatize-ink shadow-lg shadow-atomatize-orange/25 transition hover:bg-atomatize-orange-hover"
            >
              Try Atomatize
            </a>
            <a
              href="#atomatize-pricing"
              className="rounded-lg border border-white/10 px-8 py-3 text-sm font-semibold text-stone-300 transition hover:border-atomatize-teal/50 hover:text-atomatize-teal"
            >
              See pricing
            </a>
          </div>
        </div>
      </Section>

      {/* Atomatize Features */}
      <Section className="bg-atomatize-ink">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {atomatizeFeatures.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-white/5 bg-atomatize-stone/60 p-6 transition hover:border-atomatize-teal/30"
            >
              <h3 className="text-lg font-semibold text-stone-100">{f.title}</h3>
              <p className="mt-2 text-sm text-stone-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Atomatize Pricing */}
      <Section id="atomatize-pricing" className="scroll-mt-24 bg-atomatize-stone">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-stone-100">Atomatize plans</h2>
          <p className="mx-auto mt-4 max-w-xl text-stone-400">
            Every account starts with a 14-day trial: 3 source pieces and every feature, no card needed.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {atomatizeTiers.map((tier) => (
            <div
              key={tier.name}
              className="rounded-xl border border-white/5 bg-atomatize-ink/60 p-8"
            >
              <h3 className="text-xl font-bold text-stone-100">{tier.name}</h3>
              <p className="mt-2 text-2xl font-bold text-atomatize-orange">{tier.price}</p>
              <ul className="mt-6 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-stone-300">
                    <span className="mt-0.5 text-atomatize-teal">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://atomatize.com?utm_source=cloudwalker.it&utm_medium=referral&utm_campaign=pricing"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block rounded-lg border border-white/10 px-6 py-3 text-center text-sm font-semibold text-stone-300 transition hover:border-atomatize-orange/60 hover:text-atomatize-orange"
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
