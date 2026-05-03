import type { Metadata } from "next";
import Image from "next/image";
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

const credentials = [
  {
    shortName: "Azure DevOps Expert",
    fullName: "Microsoft Certified: DevOps Engineer Expert",
    issuer: "Microsoft",
    image: "/badges/microsoft-certified-expert.svg",
    width: 256,
    height: 256,
    verifyUrl:
      "https://learn.microsoft.com/api/credentials/share/en-us/LukeWilkinson-2810/7E14B7D5016741F2?sharingId=9C8FE829760CE9BF",
  },
  {
    shortName: "Azure Architect Expert",
    fullName: "Microsoft Certified: Azure Solutions Architect Expert",
    issuer: "Microsoft",
    image: "/badges/microsoft-certified-expert.svg",
    width: 256,
    height: 256,
    verifyUrl:
      "https://learn.microsoft.com/api/credentials/share/en-us/LukeWilkinson-2810/9C23BA9BD8A81BF2?sharingId=9C8FE829760CE9BF",
  },
  {
    shortName: "CKA",
    fullName: "Certified Kubernetes Administrator",
    issuer: "Linux Foundation / CNCF",
    image: "/badges/cka.png",
    width: 672,
    height: 352,
    verifyUrl: "https://www.credly.com/badges/9eb693d4-14b4-408f-aae0-4651dc0c2861/public_url",
  },
  {
    shortName: "Terraform Associate",
    fullName: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp",
    image: "/badges/terraform.png",
    width: 672,
    height: 352,
    verifyUrl: "https://www.credly.com/badges/2e7923cd-c392-49cc-92ef-1635c769ba3b/public_url",
  },
  {
    shortName: "RHCSA",
    fullName: "Red Hat Certified System Administrator",
    issuer: "Red Hat",
    image: "/badges/rhcsa.png",
    width: 600,
    height: 600,
    verifyUrl: "https://www.credly.com/badges/63694e63-bab4-445d-bcdb-de19f2e54046/public_url",
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
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              At a glance
            </p>

            <div className="mt-5 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-cloud-400">
                  Operator
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  Solo principal engineer — the person you talk to is the person doing the work.
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-cloud-400">
                  Cloud focus
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  Azure (primary) · AWS delivered jointly with{" "}
                  <span className="text-gray-100">010 Consulting</span>
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-cloud-400">
                  Certifications
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-300">
                  <li>Microsoft Certified: Azure DevOps Engineer Expert</li>
                  <li>Microsoft Certified: Azure Solutions Architect Expert</li>
                  <li>Certified Kubernetes Administrator (CKA)</li>
                  <li>HashiCorp Certified: Terraform Associate</li>
                  <li>Red Hat Certified System Administrator (RHCSA)</li>
                </ul>
                <p className="mt-2 text-xs text-gray-500">
                  Verifiable badges below.
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-cloud-400">
                  SaaS in market
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  <a
                    href="https://krakenkey.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-400 hover:underline"
                  >
                    KrakenKey
                  </a>
                  {" · "}
                  <a
                    href="https://atomatize.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-electric-400 hover:underline"
                  >
                    Atomatize
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Credentials wall */}
      <Section id="credentials">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cloud-400">
            Credentials
          </p>
          <h2 className="mt-2 text-3xl font-bold">Verifiable, current, senior</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Every badge below links to its issuer. Click any to verify directly with Microsoft, the Linux Foundation, HashiCorp, or Red Hat.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {credentials.map((cred) => (
            <a
              key={cred.shortName}
              href={cred.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`Verify ${cred.fullName} with ${cred.issuer}`}
              className="group flex flex-col items-center rounded-xl border border-white/5 bg-dark-800/50 p-6 transition hover:border-cloud-400/30 hover:bg-dark-700/50"
            >
              <div className="flex h-28 w-full items-center justify-center">
                <Image
                  src={cred.image}
                  alt={`${cred.fullName} — issued by ${cred.issuer}`}
                  width={cred.width}
                  height={cred.height}
                  className="max-h-28 w-auto object-contain"
                />
              </div>
              <p className="mt-4 text-center text-sm font-semibold text-white transition group-hover:text-cloud-400">
                {cred.shortName}
              </p>
              <p className="mt-1 text-center text-xs text-gray-500">{cred.issuer}</p>
            </a>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-dark-800/30">
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
      <Section>
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
