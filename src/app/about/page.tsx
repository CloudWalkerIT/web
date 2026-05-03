import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Cloudwalker IT — our mission, values, and the team behind intelligent cloud and IT solutions for modern enterprises.",
};

const values = [
  {
    title: "Innovation First",
    desc: "We stay ahead of the technology curve, continuously exploring emerging tools and methodologies to deliver cutting-edge solutions.",
  },
  {
    title: "Client Partnership",
    desc: "We don't just deliver projects — we build lasting partnerships. Your success is our success, and we're invested in your long-term growth.",
  },
  {
    title: "Engineering Excellence",
    desc: "Quality is non-negotiable. Every solution we deliver is built with robust architecture, clean code, and comprehensive testing.",
  },
  {
    title: "Transparent Operations",
    desc: "No black boxes. We operate with full transparency — clear communication, honest timelines, and open documentation.",
  },
];

const team = [
  {
    name: "Cloud Architecture Team",
    desc: "Certified architects across AWS, Azure, and GCP who design and deploy infrastructure that scales globally.",
  },
  {
    name: "AI & Data Science Team",
    desc: "Machine learning engineers and data scientists who build intelligent systems that drive real business outcomes.",
  },
  {
    name: "Security Operations Team",
    desc: "Cybersecurity experts who protect your assets with zero-trust frameworks and 24/7 threat monitoring.",
  },
  {
    name: "DevOps & Platform Team",
    desc: "Platform engineers who accelerate delivery with modern CI/CD, containers, and developer experience tooling.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cloud-400">
            About Us
          </p>
          <h1 className="mt-2 text-4xl font-bold">
            Walking Above the Clouds Since Day One
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Cloudwalker IT was founded on a simple belief: enterprise technology should empower, not constrain. We combine deep technical expertise with strategic thinking to deliver IT solutions that drive real transformation.
          </p>
        </div>
      </Section>

      {/* Mission */}
      <Section className="bg-dark-800/30">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-electric-400">
              Our Mission
            </p>
            <h2 className="mt-2 text-3xl font-bold">
              Empowering Enterprises Through Intelligent Technology
            </h2>
            <p className="mt-4 text-gray-400">
              We exist to bridge the gap between where enterprise IT is and where it needs to be. Through cloud-native architecture, artificial intelligence, and relentless focus on outcomes, we help organizations operate faster, smarter, and more securely.
            </p>
            <p className="mt-4 text-gray-400">
              Our approach is rooted in pragmatism: we choose the right tool for the job, not the trendiest. Whether that means deploying a cutting-edge LLM pipeline or optimizing a legacy system, we deliver measurable results.
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-dark-700/30 p-8">
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-cloud-400">Azure</p>
                <p className="mt-1 text-sm text-gray-500">Primary cloud focus</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-electric-400">AWS</p>
                <p className="mt-1 text-sm text-gray-500">Via 010 Consulting</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent-400">2</p>
                <p className="mt-1 text-sm text-gray-500">Live SaaS products</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-cloud-400">4</p>
                <p className="mt-1 text-sm text-gray-500">Microsoft Expert · CKA · RHCSA</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cloud-400">
            Our Values
          </p>
          <h2 className="mt-2 text-3xl font-bold">What Drives Us</h2>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-xl border border-white/5 bg-dark-800/50 p-6"
            >
              <h3 className="text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{v.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Teams */}
      <Section className="bg-dark-800/30">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-electric-400">
            Our Teams
          </p>
          <h2 className="mt-2 text-3xl font-bold">Expert Teams, Real Results</h2>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {team.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-white/5 bg-dark-800/50 p-6"
            >
              <h3 className="text-lg font-semibold text-cloud-400">{t.name}</h3>
              <p className="mt-2 text-sm text-gray-400">{t.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center">
          <h2 className="text-3xl font-bold">Join Our Journey</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Whether you&apos;re looking to partner with us or join our team, we&apos;d love to hear from you.
          </p>
          <Link
            href="/contact/"
            className="mt-8 inline-block rounded-lg bg-cloud-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-cloud-500/25 transition hover:bg-cloud-600"
          >
            Get in Touch
          </Link>
        </div>
      </Section>
    </>
  );
}
