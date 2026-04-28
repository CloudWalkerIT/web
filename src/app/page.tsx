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
    desc: "Scalable, secure cloud architectures built on AWS, Azure, and GCP. Migration, optimization, and 24/7 managed operations.",
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

const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "150+", label: "Clients Served" },
  { value: "40%", label: "Avg Cost Reduction" },
  { value: "24/7", label: "Support Coverage" },
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
            Intelligent IT Solutions
          </p>
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Walk Above the Clouds.{" "}
            <span className="bg-gradient-to-r from-cloud-400 to-electric-400 bg-clip-text text-transparent">
              Transform Your IT.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            We architect modern cloud infrastructure, deliver insights, and drive the digital transformation your business needs to lead.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact/"
              className="rounded-lg bg-cloud-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-cloud-500/25 transition hover:bg-cloud-600"
            >
              Get Started
            </Link>
            <Link
              href="/products/"
              className="rounded-lg border border-white/10 px-8 py-3 text-sm font-semibold text-gray-300 transition hover:border-cloud-400/50 hover:text-cloud-400"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </Section>

      {/* Stats */}
      <Section className="border-y border-white/5 bg-dark-800/50">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-cloud-400">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
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
          <h2 className="text-3xl font-bold">Ready to Transform Your IT?</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Let&apos;s discuss how Cloudwalker IT can modernize your infrastructure and unlock new growth.
          </p>
          <Link
            href="/contact/"
            className="mt-8 inline-block rounded-lg bg-cloud-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-cloud-500/25 transition hover:bg-cloud-600"
          >
            Schedule a Consultation
          </Link>
        </div>
      </Section>
    </>
  );
}
