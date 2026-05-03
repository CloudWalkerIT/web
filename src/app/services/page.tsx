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
  },
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
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-dark-800/30">
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
