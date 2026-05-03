import Link from "next/link";
import type { Metadata } from "next";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Cloudwalker IT — Intelligent Cloud & IT Solutions",
  description:
    "Cloud infrastructure, insights, and digital transformation for modern enterprises. Discover Atomatize and our managed IT services.",
};

const features = [
  {
    icon: "☁️",
    title: "Cloud Infrastructure",
    desc: "Scalable, secure cloud architectures on AWS, Azure, and GCP — with managed Terraform, migration, and 24/7 operations.",
  },
  {
    icon: "🤖",
    title: "AI & Automation",
    desc: "Harness machine learning and intelligent automation to streamline operations and unlock actionable insights from your data.",
  },
  {
    icon: "🛡️",
    title: "Cybersecurity",
    desc: "Zero-trust security frameworks, threat detection, and compliance-ready infrastructure to protect your digital assets.",
  },
  {
    icon: "📊",
    title: "Market Intelligence",
    desc: "AI-powered content repurposing that transforms long-form content into platform-ready social media posts through our Atomatize platform.",
  },
];

const artifacts: Array<{
  name: string;
  desc: string;
  badge: string;
  href: string;
  external: boolean;
  accentClass: string;
}> = [
  {
    name: "KrakenKey",
    desc: "TLS certificate automation — one-time DNS setup, then 4-minute renewals.",
    badge: "Live SaaS",
    href: "https://krakenkey.io",
    external: true,
    accentClass: "text-accent-400",
  },
  {
    name: "Atomatize",
    desc: "AI content repurposing — long-form into platform-ready posts.",
    badge: "Live SaaS",
    href: "https://atomatize.com",
    external: true,
    accentClass: "text-electric-400",
  },
  {
    name: "010 Consulting",
    desc: "AWS delivery partner. Joint engagements when work demands deep AWS.",
    badge: "Delivery partner",
    href: "https://zero10consulting.com",
    external: true,
    accentClass: "text-cloud-400",
  },
  {
    name: "Certified Expert",
    desc: "Azure DevOps + Architect Expert · CKA · Terraform · RHCSA.",
    badge: "Engineer credentials",
    href: "/about/#credentials",
    external: false,
    accentClass: "text-cloud-400",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-cloud-500/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-electric-500/10 blur-3xl" />
        </div>

        <div className="py-20 text-center lg:py-32">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cloud-400">
            Azure cloud engineering
          </p>
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Cloud platforms,{" "}
            <span className="bg-gradient-to-r from-cloud-400 to-electric-400 bg-clip-text text-transparent">
              built by the engineer who&apos;ll run them
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            I&apos;m Luke Wilkinson. Cloudwalker IT is my solo cloud engineering practice — Azure-first, with AWS delivered jointly through 010 Consulting. I also build and operate two SaaS products of my own (KrakenKey and Atomatize), so the patterns I ship to clients are ones I run in production myself.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact/"
              className="rounded-lg bg-cloud-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-cloud-500/25 transition hover:bg-cloud-600"
            >
              Start a conversation
            </Link>
            <Link
              href="/products/"
              className="rounded-lg border border-white/10 px-8 py-3 text-sm font-semibold text-gray-300 transition hover:border-cloud-400/50 hover:text-cloud-400"
            >
              See the products
            </Link>
          </div>
        </div>
      </Section>

      {/* Proof — things I've shipped, partners, credentials */}
      <Section className="border-y border-white/5 bg-dark-800/50">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {artifacts.map((a) => {
            const inner = (
              <>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                  {a.badge}
                </p>
                <p className={`mt-3 text-lg font-bold ${a.accentClass}`}>{a.name}</p>
                <p className="mt-2 text-sm text-gray-400">{a.desc}</p>
              </>
            );
            const cardClass =
              "block rounded-xl border border-white/5 bg-dark-900/40 p-6 transition hover:border-white/20 hover:bg-dark-800/60";
            return a.external ? (
              <a
                key={a.name}
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
              >
                {inner}
              </a>
            ) : (
              <Link key={a.name} href={a.href} className={cardClass}>
                {inner}
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Features */}
      <Section>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-electric-400">
            What We Do
          </p>
          <h2 className="mt-2 text-3xl font-bold">End-to-End IT Excellence</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            From cloud architecture to expert insights, we provide the full spectrum of modern IT services.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-white/5 bg-dark-800/50 p-6 transition hover:border-cloud-400/20 hover:bg-dark-700/50"
            >
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-br from-dark-800 to-dark-900">
        <div className="rounded-2xl border border-white/5 bg-dark-700/30 p-12 text-center">
          <h2 className="text-3xl font-bold">Want to talk?</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Tell me about the problem you&apos;re trying to solve. If I&apos;m a good fit, I&apos;ll say so. If not, I&apos;ll point you at someone better suited.
          </p>
          <Link
            href="/contact/"
            className="mt-8 inline-block rounded-lg bg-cloud-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-cloud-500/25 transition hover:bg-cloud-600"
          >
            Send me a note
          </Link>
        </div>
      </Section>
    </>
  );
}
