import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import { BOOKING_CTA, BOOKING_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Cloudwalker IT is an Azure cloud engineering firm. We deliver AWS work with 010 Consulting and build our own products, KrakenKey and Atomatize.",
};

const values = [
  {
    title: "Whoever scopes it builds it",
    desc: "There's no project manager relaying messages between you and the engineer, and no account team that changes every quarter.",
  },
  {
    title: "Straight about AWS",
    desc: "Our depth is in Azure. For AWS we bring in 010 Consulting instead of learning on your account, and we recommend whichever cloud suits the work.",
  },
  {
    title: "We run production too",
    desc: "KrakenKey and Atomatize are ours, so we deal with real outages, renewals and bills. What we recommend to clients is what we already do there.",
  },
  {
    title: "Start small",
    desc: "Most work starts as one well-defined piece. It grows if that piece goes well.",
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
            An Azure firm that also runs its own software
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Cloudwalker IT designs, builds and operates Azure environments, and delivers AWS work with 010 Consulting. If what you need isn&apos;t a good match for us, we&apos;ll say so on the first call and suggest who might be.
          </p>
        </div>
      </Section>

      {/* Mission */}
      <Section className="bg-dark-800/30">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold">Who does the work</h2>
            <p className="mt-4 text-gray-400">
              The engineer on your first call is the one who designs the platform, writes the Terraform and hands it over to your team. Decisions get made by someone who has to live with them.
            </p>
            <p className="mt-4 text-gray-400">
              Azure is where we have the most experience, and the Microsoft certifications below back that up. On AWS we work with 010 Consulting, whose engineers do that work every day. Between client projects we build and run KrakenKey and Atomatize, so we&apos;re on the hook for production systems of our own.
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-dark-700/30 p-8">
            <div className="space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-cloud-400">
                  Cloud focus
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  Azure, plus AWS with{" "}
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
                <p className="mt-2 text-xs text-gray-400">
                  Verifiable badges below.
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-cloud-400">
                  Our products
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
          <h2 className="text-3xl font-bold">Certifications</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Each badge links to the issuer&apos;s own verification page.
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
                  alt={`${cred.fullName}, issued by ${cred.issuer}`}
                  width={cred.width}
                  height={cred.height}
                  className="max-h-28 w-auto object-contain"
                />
              </div>
              <p className="mt-4 text-center text-sm font-semibold text-white transition group-hover:text-cloud-400">
                {cred.shortName}
              </p>
              <p className="mt-1 text-center text-xs text-gray-400">{cred.issuer}</p>
            </a>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-dark-800/30">
        <div className="text-center">
          <h2 className="text-3xl font-bold">How we work</h2>
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
          <h2 className="text-3xl font-bold">Talk to us</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Tell us what you&apos;re trying to do. Most engagements start with a 30-minute call.
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
