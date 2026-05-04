import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Three focused cloud engineering services: Azure architecture and operations, AWS delivered jointly with 010 Consulting, and platform engineering with Managed Terraform.",
};

const services = [
  {
    title: "Azure Cloud Engineering",
    kicker: "Primary practice",
    desc: "Design, build, and operate Azure platforms for teams that need senior cloud engineering without a full-time hire. Anchored by Microsoft Azure Solutions Architect Expert and DevOps Engineer Expert credentials.",
    details: [
      "Landing zones, hub-and-spoke networking, and Entra ID identity design",
      "Migration to Azure — IaaS lift-and-shift through PaaS modernization",
      "FinOps and cost optimization — right-sizing, reservations, policy hygiene",
      "Production operations, incident response, and on-call coverage",
    ],
    deliverables: [
      "Azure landing zone or solution architecture, documented in decision records and diagrams",
      "Terraform checked into your repository, with remote state and CI configured",
      "Migration runbook covering pre-flight checks, cutover, rollback, and post-cutover validation (where relevant)",
      "FinOps assessment with tagged usage analysis, right-sizing recommendations, and reservation strategy (where relevant)",
      "Operational runbooks covering the scenarios your team will actually face",
      "Pairing sessions and code reviews with your team during implementation, not only at handover",
      "Handover session with your team and a defined post-engagement Q&A window",
    ],
  },
  {
    title: "AWS — delivered with 010 Consulting",
    kicker: "Partnership offering",
    desc: "Same outcomes on AWS, delivered jointly with 010 Consulting. You get a single point of contact and the depth of two firms' senior engineers — no agency layers, no rotating account team.",
    details: [
      "AWS architecture, migration, and ongoing operations",
      "Joint delivery model: Cloudwalker IT leads the engagement, 010 brings AWS-specialist hands",
      "Platform practice (IaC, GitOps, observability) consistent across Azure and AWS",
      "Right-sized for SMB and mid-market — not optimized only for enterprise scale",
    ],
    deliverables: [
      "Joint engagement plan signed by both Cloudwalker IT and 010 Consulting at kickoff",
      "AWS architecture and implementation, led by 010's specialists with cross-cloud platform decisions made jointly",
      "Terraform or CDK (your preference) checked into your repository",
      "Cross-cloud platform components — CI/CD, observability, IAM — consistent with your Azure footprint",
      "Single point of contact (Cloudwalker IT) for the entire engagement",
      "Joint pairing across both firms' engineers and your team during implementation",
      "Joint handover so your team operates the result without ongoing dependency on either firm",
    ],
  },
  {
    title: "Platform Engineering & Managed Terraform",
    kicker: "Cross-cloud capability",
    desc: "The platform layer that lets your engineers ship features instead of fighting infrastructure. Anchored by HashiCorp Terraform Associate, Certified Kubernetes Administrator, and RHCSA.",
    details: [
      "Managed Terraform — pipelines, modules, state management, drift detection, automated remediation",
      "Kubernetes platform engineering — AKS, EKS, and on-prem clusters",
      "CI/CD with GitHub Actions and Azure DevOps Pipelines",
      "Policy-as-code (OPA, Sentinel) and self-service developer platforms",
    ],
    deliverables: [
      "Terraform module library tailored to your environment — AKS or EKS, networking, IAM, and shared platform patterns",
      "Pipeline configuration for terraform plan and apply, with policy gates and required approvals",
      "Remote state management with backup, locking, and documented disaster recovery procedures",
      "Drift detection schedule and remediation procedures",
      "Policy-as-code definitions (OPA or Sentinel) covering your compliance scope",
      "Walkthrough sessions and pairing while your team adopts the platform",
      "Self-service documentation so your developers consume the platform without ongoing intervention",
    ],
  },
];

const everyEngagement = [
  "Documentation written for your team to use, not for our records",
  "Infrastructure-as-code and configuration committed to your repositories from day one",
  "Active knowledge transfer during the engagement, not only at handover",
  "A scoped handover so your team operates the result without ongoing dependency on us",
  "A written summary of what was decided, what was deferred, and what we recommend next",
  "A defined post-engagement Q&A window for follow-up questions",
];

export default function ServicesPage() {
  return (
    <>
      <Section>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cloud-400">
            Services
          </p>
          <h1 className="mt-2 text-4xl font-bold">
            Cloud engineering, end to end
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Three focused services from a senior cloud engineer — no agency layers, no rotating account team. Azure as the primary practice, AWS delivered jointly with 010 Consulting, and platform engineering across both clouds.
          </p>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mx-auto max-w-4xl space-y-8">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-xl border border-white/5 bg-dark-800/50 p-8 transition hover:border-cloud-400/20"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-cloud-400">
                {s.kicker}
              </p>
              <h2 className="mt-2 text-2xl font-bold">{s.title}</h2>
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
                <p className="mt-3 ml-5 text-xs text-gray-500">
                  Representative of what this service line typically produces. The actual deliverable set is scoped collaboratively at engagement kickoff.
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

      {/* Every engagement — cross-cutting deliverable baseline */}
      <Section className="bg-dark-800/30">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-cloud-400">
              Every engagement
            </p>
            <h2 className="mt-2 text-3xl font-bold">Documentation that outlives the work</h2>
            <p className="mx-auto mt-4 text-gray-400">
              Service-specific deliverables vary by engagement and are scoped with you at kickoff. The items below appear in every Cloudwalker IT engagement regardless of service line, so your team operates the result without ongoing dependency on us.
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
          <h2 className="text-3xl font-bold">Unsure which service fits?</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Engagements typically start with a short call to understand what you are building. If our services can address it, we will scope an engagement. If not, we will point you toward a practice better suited.
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
