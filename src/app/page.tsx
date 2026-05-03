import Link from "next/link";
import type { Metadata } from "next";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Cloudwalker IT — Senior Azure Cloud Engineering",
  description:
    "Senior cloud engineering practice — Azure-first, with AWS delivered jointly through 010 Consulting. Builders of the KrakenKey and Atomatize SaaS products.",
};

const homeServices = [
  {
    kicker: "Primary practice",
    title: "Azure Cloud Engineering",
    desc: "Architecture, migration, FinOps, and operations on Azure — anchored by Solutions Architect Expert and DevOps Engineer Expert credentials.",
  },
  {
    kicker: "Partnership offering",
    title: "AWS — with 010 Consulting",
    desc: "Joint engagements: Cloudwalker IT leads, 010 brings AWS-specialist hands. One contact, two firms' depth.",
  },
  {
    kicker: "Cross-cloud capability",
    title: "Platform Engineering & Managed Terraform",
    desc: "Pipelines, modules, state, drift detection. AKS and EKS clusters. CI/CD with GitHub Actions and Azure DevOps.",
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
              designed and operated by the same hands
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Cloudwalker IT is a senior cloud engineering practice — Azure delivery in-house, AWS through our 010 Consulting partnership. We also build and operate KrakenKey and Atomatize, so the patterns we recommend are ones we already use in production.
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

      {/* Proof — what we've shipped, partners, credentials */}
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

      {/* Services overview */}
      <Section>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-electric-400">
            What we do
          </p>
          <h2 className="mt-2 text-3xl font-bold">Three focused services</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Azure architecture and operations as the primary practice. AWS delivered jointly with 010 Consulting. Platform engineering and Managed Terraform across both clouds.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {homeServices.map((s) => (
            <Link
              key={s.title}
              href="/services/"
              className="group flex flex-col rounded-xl border border-white/5 bg-dark-800/50 p-6 transition hover:border-cloud-400/30 hover:bg-dark-700/50"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-cloud-400">
                {s.kicker}
              </p>
              <h3 className="mt-2 text-lg font-semibold transition group-hover:text-cloud-400">
                {s.title}
              </h3>
              <p className="mt-3 text-sm text-gray-400">{s.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/services/"
            className="text-sm font-medium text-cloud-400 transition hover:text-cloud-300"
          >
            See all services →
          </Link>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-br from-dark-800 to-dark-900">
        <div className="rounded-2xl border border-white/5 bg-dark-700/30 p-12 text-center">
          <h2 className="text-3xl font-bold">Begin a conversation</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Engagements typically start with a short call to understand the problem. If our practice is the right fit, we will say so. If not, we will recommend someone better suited.
          </p>
          <Link
            href="/contact/"
            className="mt-8 inline-block rounded-lg bg-cloud-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-cloud-500/25 transition hover:bg-cloud-600"
          >
            Get in touch
          </Link>
        </div>
      </Section>
    </>
  );
}
