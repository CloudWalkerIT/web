import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import { BOOKING_CTA, BOOKING_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Azure Terraform Adoption",
  description:
    "Bring existing Azure infrastructure under Terraform one production service at a time, starting with a scoped discovery and an agreed pilot.",
};

const discoveryDeliverables = [
  "An inventory of the agreed candidate service and its important dependencies",
  "Import and change risks, with a recommended pilot boundary",
  "A design for Terraform state, access and CI that fits your environment",
  "A phased implementation estimate and a candid go/no-go recommendation",
];

const pilotSteps = [
  {
    title: "Agree the slice",
    description:
      "After discovery, name the production service, included Azure resources, dependencies and acceptance checks. Shared or unrelated resources stay outside the pilot unless explicitly scoped.",
  },
  {
    title: "Import and review",
    description:
      "Bring existing resources under Terraform without planned replacement. If a plan shows an unintended replacement or deletion, stop and assess it before any apply.",
  },
  {
    title: "Approve and hand over",
    description:
      "Review the plan together and obtain your approval before the first production apply. Validate the agreed resources, then document the state, workflow and handoff.",
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
            Azure Terraform Adoption
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
            Bring your existing Azure infrastructure under Terraform
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Start with one agreed production service. Understand what is there, choose a safe pilot boundary and expand in waves when it makes sense.
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
          <h2 className="text-3xl font-bold">Discover before changing production</h2>
          <p className="mt-4 text-gray-400">
            We begin with a paid, fixed-scope discovery of one candidate Azure service. With agreed read-only access, we map its resources and important dependencies, assess import risks and design the state, access and CI approach. Discovery does not promise a complete-estate inventory or production changes.
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
            The exact resources, validation checks and handoff artifacts are agreed after discovery. This is an incremental adoption path, not a promise to migrate an entire estate in one project.
          </p>
        </div>
      </Section>

      <Section className="bg-dark-800/30">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold">What a pilot might look like</h2>
          <p className="mt-4 text-gray-400">
            For an illustrative Customer Portal production API, the pilot might bring an existing Azure App Service, its App Service plan, the Key Vault resource and Application Insights under Terraform. We would document dependencies on a shared SQL server and hub network without bringing those shared resources into scope unless agreed. This is an example, not a client case study or a prescribed architecture.
          </p>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold">Your environment stays yours</h2>
          <p className="mt-4 text-gray-400">
            You own the Azure infrastructure and Terraform state. We select a suitable state backend with you during discovery. By default, the repository and CI environment are yours too; Cloudwalker IT works through delegated access. We can operate the resulting Terraform workflow with your team, or integrate with your existing Git and CI/CD controls and hand it over.
          </p>
          <div className="mt-8 rounded-xl border border-cloud-400/20 bg-dark-800/50 p-8">
            <h3 className="text-xl font-semibold">Start with a fit call</h3>
            <p className="mt-3 text-sm text-gray-400">
              Tell us which Azure service you want to bring under Terraform. We&apos;ll assess whether a scoped discovery is the right first step and be direct if it is not.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-lg bg-cloud-500 px-6 py-3 text-sm font-semibold text-dark-900 transition hover:bg-cloud-400"
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
        </div>
      </Section>
    </>
  );
}
