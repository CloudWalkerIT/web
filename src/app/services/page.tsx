import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import { BOOKING_CTA, BOOKING_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Azure architecture and operations, AWS work delivered with 010 Consulting, and platform engineering with Terraform and Kubernetes.",
};

const services = [
  {
    title: "Azure cloud engineering",
    desc: "Design, build and run Azure environments for teams that need an experienced cloud engineer but not a full-time hire.",
    details: [
      "Landing zones, hub-and-spoke networking and Entra ID identity design",
      "Migrations to Azure, from lift-and-shift VMs to PaaS rebuilds",
      "Cost reviews: right-sizing, reservations and savings plans, tagging and policy cleanup",
      "Production operations and incident response during agreed hours",
    ],
    deliverables: [
      "Landing zone or solution architecture, written up as decision records and diagrams",
      "Terraform in your repository, with remote state and CI set up",
      "A migration runbook with pre-flight checks, cutover, rollback and post-cutover checks, if you're migrating",
      "A cost assessment covering tagged usage, right-sizing and reservation options, if cost is in scope",
      "Runbooks for the incidents your team is most likely to hit",
      "Pairing and code review with your team during the build",
      "A handover session and an agreed window for follow-up questions",
    ],
  },
  {
    title: "AWS, with 010 Consulting",
    desc: "The same kind of work on AWS, delivered with 010 Consulting. We run the engagement and stay your contact. Their engineers do the AWS-specific work.",
    details: [
      "AWS architecture, migration and ongoing operations",
      "One engagement lead from Cloudwalker IT, with 010's AWS engineers on the build",
      "IaC, GitOps and observability set up the same way on Azure and AWS",
      "Sized for small and mid-sized companies",
    ],
    deliverables: [
      "A joint engagement plan agreed by both firms at kickoff",
      "AWS architecture and implementation led by 010, with cross-cloud decisions made together",
      "Terraform or CDK, your choice, in your repository",
      "CI/CD, observability and IAM that match what you run on Azure",
      "One point of contact at Cloudwalker IT for the whole engagement",
      "Pairing between both firms' engineers and your team during the build",
      "A joint handover, so your team can run it without either firm",
    ],
  },
  {
    title: "Platform engineering and Terraform",
    desc: "Pipelines, modules and clusters that let your developers ship without filing an infrastructure ticket every time.",
    details: [
      "Managed Terraform: pipelines, modules, state, drift detection and remediation",
      "Kubernetes on AKS, EKS and on-prem clusters",
      "CI/CD in GitHub Actions and Azure DevOps Pipelines",
      "Policy as code with OPA or Sentinel, and self-service for developers",
    ],
    deliverables: [
      "A Terraform module library for your environment: AKS or EKS, networking, IAM and shared patterns",
      "Plan and apply pipelines with policy checks and required approvals",
      "Remote state with locking, backups and a written recovery procedure",
      "Scheduled drift detection and a procedure for fixing drift",
      "OPA or Sentinel policies covering your compliance scope",
      "Walkthroughs and pairing while your team adopts the platform",
      "Documentation developers can use without asking us",
    ],
  },
];

const everyEngagement = [
  "Documentation written for your team to use",
  "Infrastructure code and configuration in your repositories from day one",
  "Knowledge transfer while the work happens",
  "A handover that leaves your team able to run it without us",
  "A written summary of what we decided, what we deferred and what we'd do next",
  "An agreed window for follow-up questions afterwards",
];

export default function ServicesPage() {
  return (
    <>
      <Section>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cloud-400">
            Services
          </p>
          <h1 className="mt-2 text-4xl font-bold">Azure, AWS and platform work</h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Most clients come to us for one of these. Open any of them to see the deliverables you can expect.
          </p>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mx-auto max-w-4xl rounded-xl border border-cloud-400/20 bg-dark-800/50 p-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-cloud-400">Featured offer</p>
          <h2 className="mt-3 text-2xl font-bold">Azure Terraform Adoption</h2>
          <p className="mt-3 text-sm text-gray-300">
            Bring existing Azure infrastructure under Terraform, one agreed production service at a time. Start with a scoped discovery, then import and validate a pilot without planned replacement.
          </p>
          <Link href="/services/azure-terraform-adoption/" className="mt-5 inline-block text-sm font-medium text-cloud-400 transition hover:text-cloud-300">
            Explore the adoption offer →
          </Link>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mx-auto max-w-4xl space-y-8">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-xl border border-white/5 bg-dark-800/50 p-8 transition hover:border-cloud-400/20"
            >
              <h2 className="text-2xl font-bold">{s.title}</h2>
              <p className="mt-3 text-sm text-gray-400">{s.desc}</p>
              <ul className="mt-5 space-y-2">
                {s.details.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-cloud-400" />
                    {d}
                  </li>
                ))}
              </ul>

              <details className="group mt-6 border-t border-white/5 pt-5">
                <summary className="flex cursor-pointer select-none list-none items-center gap-2 text-sm font-medium text-cloud-400 transition hover:text-cloud-300 [&::-webkit-details-marker]:hidden">
                  <svg
                    className="h-3 w-3 shrink-0 transition-transform duration-200 group-open:rotate-90"
                    fill="none"
                    viewBox="0 0 12 12"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 2l4 4-4 4" />
                  </svg>
                  Typical deliverables
                </summary>
                <p className="mt-3 ml-5 text-xs text-gray-400">
                  Examples. The actual list is agreed with you at kickoff.
                </p>
                <ul className="mt-3 ml-5 space-y-2 border-l border-white/5 pl-4">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />
                      {d}
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          ))}
        </div>
      </Section>

      {/* Included in every engagement */}
      <Section className="bg-dark-800/30">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold">In every engagement</h2>
            <p className="mx-auto mt-4 text-gray-400">
              Whichever service you use, you get these.
            </p>
          </div>
          <ul className="mt-10 space-y-3">
            {everyEngagement.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-gray-300"
              >
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-cloud-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <h2 className="text-3xl font-bold">Not sure which one you need?</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Describe the problem on a call and we&apos;ll work out which of these it is.
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
