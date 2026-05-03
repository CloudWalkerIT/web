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
    title: "Direct work",
    desc: "The engineer who designs your platform is the same engineer implementing it. No project management layer between scoping and execution, no rotating account team.",
  },
  {
    title: "Right cloud for the job",
    desc: "Azure is the primary practice; AWS is delivered through our 010 Consulting partnership rather than claimed as in-house depth. Recommendations are based on fit, never on partner margin.",
  },
  {
    title: "Operator empathy",
    desc: "We build and operate KrakenKey and Atomatize as production systems we own. The patterns we recommend to clients are ones we already use in our own infrastructure.",
  },
  {
    title: "Work that fits",
    desc: "Engagements typically begin small and expand as the fit becomes clear. When a project is not the right match for our practice, we will say so and point you toward someone better suited.",
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

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cloud-400">
            About
          </p>
          <h1 className="mt-2 text-4xl font-bold">
            Cloud engineering, anchored by the SaaS we run ourselves
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Cloudwalker IT is a Microsoft-certified Azure cloud engineering practice with an AWS delivery partnership through 010 Consulting. We build and operate two SaaS products of our own, so the production patterns we ship to clients are patterns we already run.
          </p>
        </div>
      </Section>

      {/* Mission */}
      <Section className="bg-dark-800/30">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-electric-400">
              Approach
            </p>
            <h2 className="mt-2 text-3xl font-bold">
              A boutique cloud engineering practice
            </h2>
            <p className="mt-4 text-gray-400">
              Each engagement at Cloudwalker IT is led by a senior engineer who remains directly involved from initial scoping through production delivery. No intermediate project management layer, no rotating account team — architectural decisions are made by the same people who will operate the result.
            </p>
            <p className="mt-4 text-gray-400">
              Azure is our primary focus, anchored by senior Microsoft certifications and the depth of delivery to back them. AWS engagements are led jointly with 010 Consulting — a deliberate choice to lead with capability rather than claim breadth. We also build and operate two SaaS products of our own, KrakenKey and Atomatize, so the patterns we recommend are ones we already use ourselves.
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-dark-700/30 p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              At a glance
            </p>

            <div className="mt-5 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-cloud-400">
                  Practice
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  Senior cloud engineering — engagements stay with the same engineer from first call through delivery.
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
            Operating principles
          </p>
          <h2 className="mt-2 text-3xl font-bold">Four principles we hold to</h2>
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

      {/* CTA */}
      <Section>
        <div className="text-center">
          <h2 className="text-3xl font-bold">Want to work together?</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Most engagements start with a short conversation. Tell us what you&apos;re trying to do and we&apos;ll tell you whether we&apos;re the right fit.
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
