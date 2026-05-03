import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Cloudwalker IT offers cloud infrastructure, managed Terraform, AI & automation, cybersecurity, DevOps, and managed IT services for enterprises.",
};

const services = [
  {
    title: "Cloud Architecture & Migration",
    desc: "Design and deploy scalable cloud infrastructure on AWS, Azure, or GCP. We handle full-stack migration with zero downtime and optimized cost.",
    details: [
      "Multi-cloud & hybrid architecture design",
      "Lift-and-shift & re-platforming migrations",
      "Infrastructure as Code (Terraform, Pulumi)",
      "Cost optimization & FinOps consulting",
    ],
  },
  {
    title: "AI & Intelligent Automation",
    desc: "Deploy machine learning pipelines, NLP systems, and intelligent process automation to transform raw data into strategic advantage.",
    details: [
      "Custom ML model development & deployment",
      "Natural language processing & LLM integration",
      "Robotic process automation (RPA)",
      "Predictive analytics & forecasting",
    ],
  },
  {
    title: "Cybersecurity & Compliance",
    desc: "Protect your digital assets with zero-trust architecture, continuous monitoring, and compliance-ready security frameworks.",
    details: [
      "Zero-trust network architecture",
      "SOC-as-a-Service & SIEM implementation",
      "Penetration testing & vulnerability assessments",
      "GDPR, SOC 2, ISO 27001 compliance",
    ],
  },
  {
    title: "DevOps & Platform Engineering",
    desc: "Accelerate delivery with CI/CD pipelines, container orchestration, and internal developer platforms built for velocity.",
    details: [
      "CI/CD pipeline design (GitHub Actions, GitLab CI)",
      "Kubernetes & container orchestration",
      "Internal developer platforms & golden paths",
      "Observability (Prometheus, Grafana, OpenTelemetry)",
    ],
  },
  {
    title: "Managed Terraform",
    desc: "We run your Terraform end-to-end — pipelines, state, drift, and policy — so your engineers ship features instead of fighting provider quirks.",
    details: [
      "Terraform pipeline operation & module development",
      "Remote state management with disaster recovery",
      "Drift detection & automated remediation",
      "Policy-as-code (OPA, Sentinel) & compliance gates",
    ],
  },
  {
    title: "Managed IT Operations",
    desc: "24/7 monitoring, incident response, and proactive maintenance so you can focus on building your business.",
    details: [
      "24/7 infrastructure monitoring & alerting",
      "Incident response & escalation management",
      "Patch management & system updates",
      "SLA-backed uptime guarantees",
    ],
  },
  {
    title: "Data Engineering & Analytics",
    desc: "Build modern data platforms that turn siloed information into real-time insights and competitive intelligence.",
    details: [
      "Data lake & warehouse architecture",
      "ETL/ELT pipeline development",
      "Real-time streaming analytics",
      "Business intelligence & dashboarding",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Section>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cloud-400">
            Our Services
          </p>
          <h1 className="mt-2 text-4xl font-bold">
            Enterprise IT, Reimagined
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            We deliver comprehensive IT solutions that scale with your ambition. From cloud infrastructure to AI-powered automation, every service is engineered for performance.
          </p>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-8 lg:grid-cols-2">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-xl border border-white/5 bg-dark-800/50 p-8 transition hover:border-cloud-400/20"
            >
              <h2 className="text-xl font-bold">{s.title}</h2>
              <p className="mt-3 text-sm text-gray-400">{s.desc}</p>
              <ul className="mt-5 space-y-2">
                {s.details.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-cloud-400" />
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
          <h2 className="text-3xl font-bold">Need a Custom Solution?</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Every enterprise is different. Let&apos;s architect a solution tailored to your specific challenges and goals.
          </p>
          <Link
            href="/contact/"
            className="mt-8 inline-block rounded-lg bg-cloud-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-cloud-500/25 transition hover:bg-cloud-600"
          >
            Talk to Our Team
          </Link>
        </div>
      </Section>
    </>
  );
}
