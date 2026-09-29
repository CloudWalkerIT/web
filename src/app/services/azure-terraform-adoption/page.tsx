import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import { BOOKING_CTA, BOOKING_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Azure Terraform adoption",
  description:
    "Bring hand-built Azure infrastructure under Terraform one production service at a time, starting with a fixed-scope discovery and a pilot that ends in a clean plan.",
};

const discoveryDeliverables = [
  "The resources in the candidate service and what they depend on",
  "Anything that will be hard to import, and a recommended boundary for the pilot",
  "A design for state, access and CI that fits how you already work",
  "An estimate for the pilot and later waves, and a recommendation on whether to go ahead",
];

const pilotSteps = [
  {
    title: "Agree the slice",
    description:
      "Name the production service, the resources in scope and the checks that count as done. Shared resources such as a hub network or a shared SQL server stay out unless we agree otherwise.",
  },
  {
    title: "Import to a clean plan",
    description:
      "We write Terraform import blocks, often starting from aztfexport output, and refine the code until terraform plan shows no changes. If a plan wants to replace or delete anything, work stops until we know why.",
  },
  {
    title: "Approve and hand over",
    description:
      "You review the plan before the first production apply. We check the agreed resources, then document the state, the workflow and the next services to bring in.",
  },
];

const afterPilot = [
  {
    title: "Expand in waves",
    description:
      "Bring in the next services in the order discovery suggested, using the same pattern and the same checks.",
  },
  {
    title: "We run it",
    description:
      "Managed Terraform: we run plan and apply with your approvals, catch and fix drift, and keep modules and providers current.",
    href: "/services/#platform",
    linkText: "Managed Terraform",
  },
  {
    title: "Your team runs it",
    description:
      "We hand over the code, pipelines and runbooks, with an agreed window for questions afterwards.",
  },
];

export default function AzureTerraformAdoptionPage() {
  return (
    <>
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-cloud-500/10 blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cloud-400">
            Terraform adoption
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
            Bring your existing Azure infrastructure under Terraform
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            For resources built in the portal, by scripts or by a previous team. We start with one production service, get it to a clean plan, and expand from there.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-lg bg-cloud-500 px-8 py-3 text-sm font-semibold text-dark-900 shadow-lg shadow-cloud-500/25 transition hover:bg-cloud-400"
          >
            {BOOKING_CTA}
          </a>
        </div>
      </Section>

      <Section className="border-y border-white/5 bg-dark-800/30">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold">Discovery first</h2>
          <p className="mt-4 text-gray-400">
            A paid, fixed-scope look at one candidate service. With read-only access, we map its resources and dependencies, find what will be awkward to import, and design where state, access and pipelines will live. Nothing in production changes.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {discoveryDeliverables.map((item) => (
              <li key={item} className="rounded-xl border border-white/5 bg-dark-900/40 p-5 text-sm text-gray-300">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold">A production pilot with clear gates</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {pilotSteps.map((step, index) => (
              <div key={step.title} className="rounded-xl border border-white/5 bg-dark-800/50 p-6">
                <p className="text-sm font-semibold text-cloud-400">0{index + 1}</p>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-gray-400">
            The pilot covers one service, not the whole estate. The exact resources and checks are agreed after discovery.
          </p>
        </div>
      </Section>

      <Section className="bg-dark-800/30">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold">What a pilot might look like</h2>
          <p className="mt-4 text-gray-400">
            Take a customer portal API running on App Service. The web app, its App Service plan, its Key Vault and its Application Insights resource come under Terraform. The shared SQL server and hub network it depends on are referenced as data sources and documented, but stay out of scope. This is an illustration, not a client project.
          </p>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold">Your environment stays yours</h2>
          <p className="mt-4 text-gray-400">
            The Azure resources, the Terraform code and the state are yours. State lives in your subscription, usually a storage account with locking, and the code and pipelines live in your Git and CI. We work through access you grant and can revoke.
          </p>
        </div>
      </Section>

      <Section className="bg-dark-800/30">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold">After the pilot</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {afterPilot.map((item) => (
              <div key={item.title} className="flex flex-col rounded-xl border border-white/5 bg-dark-800/50 p-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm text-gray-400">{item.description}</p>
                {item.href && (
                  <Link
                    href={item.href}
                    className="mt-auto pt-4 text-sm font-medium text-cloud-400 transition hover:text-cloud-300"
                  >
                    {item.linkText} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <h2 className="text-3xl font-bold">Have a service in mind?</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Tell us which one on a call and we&apos;ll say whether discovery is the right first step.
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
