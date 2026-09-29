import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Section from "@/components/Section";
import { formatInsightDate, getAllInsights } from "@/lib/insights";
import { BOOKING_CTA, BOOKING_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cloudwalker IT | Azure cloud engineering",
  description:
    "Azure architecture, migration and operations, with AWS work delivered alongside 010 Consulting. We also build and run KrakenKey and Atomatize.",
};

const homeServices = [
  {
    title: "Azure",
    desc: "Landing zones, networking and identity, migrations, cost reviews, and day-to-day operations.",
  },
  {
    title: "AWS, with 010 Consulting",
    desc: "We run the engagement and 010 Consulting's engineers handle the AWS-heavy work. You still have one contact.",
  },
  {
    title: "Platform engineering and Terraform",
    desc: "Terraform modules and pipelines, AKS and EKS clusters, and CI/CD in GitHub Actions or Azure DevOps.",
  },
];

const artifacts: Array<{
  name: string;
  desc: string;
  href: string;
  external: boolean;
  accentClass: string;
  hoverClass: string;
  logo?: { src: string; width: number; height: number };
}> = [
  {
    name: "KrakenKey",
    desc: "Our TLS certificate service. Two DNS records once, then issuance and renewal run on their own.",
    href: "https://krakenkey.io?utm_source=cloudwalker.it&utm_medium=referral&utm_campaign=home",
    external: true,
    accentClass: "text-krakenkey-amber",
    hoverClass: "hover:border-krakenkey-amber/40",
    logo: { src: "/products/krakenkey.svg", width: 30, height: 28 },
  },
  {
    name: "Atomatize",
    desc: "Our content tool. Turns one article, PDF or video into a week of posts in your voice.",
    href: "https://atomatize.com?utm_source=cloudwalker.it&utm_medium=referral&utm_campaign=home",
    external: true,
    accentClass: "text-atomatize-teal",
    hoverClass: "hover:border-atomatize-teal/40",
    logo: { src: "/products/atomatize.svg", width: 28, height: 28 },
  },
  {
    name: "010 Consulting",
    desc: "Our AWS delivery partner for engagements that need deep AWS experience.",
    href: "https://zero10consulting.com",
    external: true,
    accentClass: "text-cloud-400",
    hoverClass: "hover:border-white/20",
  },
  {
    name: "Certifications",
    desc: "Azure Solutions Architect and DevOps Engineer Expert, CKA, Terraform Associate, RHCSA.",
    href: "/about/#credentials",
    external: false,
    accentClass: "text-cloud-400",
    hoverClass: "hover:border-white/20",
  },
];

export default function HomePage() {
  const latestInsights = getAllInsights().slice(0, 3);
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
            Cloudwalker IT
          </p>
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Azure engineering for teams{" "}
            <span className="bg-gradient-to-r from-cloud-400 to-electric-400 bg-clip-text text-transparent">
              that don&apos;t have a platform team
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            We design, build and run Azure environments, and bring in 010 Consulting when the work is on AWS. We also run two products of our own, KrakenKey and Atomatize, on the same setup we build for clients.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-cloud-500 px-8 py-3 text-sm font-semibold text-dark-900 shadow-lg shadow-cloud-500/25 transition hover:bg-cloud-400"
            >
              {BOOKING_CTA}
            </a>
            <Link
              href="/products/"
              className="rounded-lg border border-white/10 px-8 py-3 text-sm font-semibold text-gray-300 transition hover:border-cloud-400/50 hover:text-cloud-400"
            >
              See the products
            </Link>
          </div>
        </div>
      </Section>

      {/* Products, partner, credentials */}
      <Section className="border-y border-white/5 bg-dark-800/50">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {artifacts.map((a) => {
            const inner = (
              <>
                <p className={`flex items-center gap-2 text-lg font-bold ${a.accentClass}`}>
                  {a.logo && (
                    <Image
                      src={a.logo.src}
                      alt=""
                      width={a.logo.width}
                      height={a.logo.height}
                      className="h-7 w-auto"
                    />
                  )}
                  {a.name}
                </p>
                <p className="mt-2 text-sm text-gray-400">{a.desc}</p>
              </>
            );
            const cardClass = `block rounded-xl border border-white/5 bg-dark-900/40 p-6 transition hover:bg-dark-800/60 ${a.hoverClass}`;
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
          <h2 className="text-3xl font-bold">What we do</h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {homeServices.map((s) => (
            <Link
              key={s.title}
              href="/services/"
              className="group flex flex-col rounded-xl border border-white/5 bg-dark-800/50 p-6 transition hover:border-cloud-400/30 hover:bg-dark-700/50"
            >
              <h3 className="text-lg font-semibold transition group-hover:text-cloud-400">
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
            Services in detail →
          </Link>
        </div>
      </Section>

      {/* Latest insights */}
      <Section className="border-t border-white/5 bg-dark-800/30">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Recent writing</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {latestInsights.map((post) => (
            <Link
              key={post.slug}
              href={`/insights/${post.slug}/`}
              className="group flex flex-col rounded-xl border border-white/5 bg-dark-800/50 p-6 transition hover:border-cloud-400/30 hover:bg-dark-700/50"
            >
              <p className="text-xs text-gray-400">
                <time dateTime={post.date}>{formatInsightDate(post.date)}</time>
                {" · "}
                {post.readTime}
              </p>
              <h3 className="mt-3 text-lg font-semibold transition group-hover:text-cloud-400">
                {post.title}
              </h3>
              <p className="mt-3 text-sm text-gray-400">{post.description}</p>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/insights/"
            className="text-sm font-medium text-cloud-400 transition hover:text-cloud-300"
          >
            All posts →
          </Link>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-br from-dark-800 to-dark-900">
        <div className="rounded-2xl border border-white/5 bg-dark-700/30 p-12 text-center">
          <h2 className="text-3xl font-bold">Start with a call</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Thirty minutes on video to go over what you&apos;re working on and whether we can help.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-lg bg-cloud-500 px-8 py-3 text-sm font-semibold text-dark-900 shadow-lg shadow-cloud-500/25 transition hover:bg-cloud-400"
          >
            {BOOKING_CTA}
          </a>
          <p className="mt-4 text-sm text-gray-400">
            Prefer to write first?{" "}
            <Link href="/contact/" className="text-cloud-400 transition hover:text-cloud-300">
              Use the contact form
            </Link>
          </p>
        </div>
      </Section>
    </>
  );
}
