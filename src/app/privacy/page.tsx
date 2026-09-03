import type { Metadata } from "next";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What Cloudwalker IT collects, why, and what happens to it. Short version: a contact form, cookieless analytics, and nothing sold to anyone.",
};

const sections = [
  {
    title: "What we collect",
    body: "The contact form asks for your name, email address, company, and message. Submitting it sends that information to our inbox by email (delivered through Resend, our email provider). We use it to respond to you and for nothing else. It is not added to any marketing list and never sold or shared.",
  },
  {
    title: "Analytics",
    body: "We use Cloudflare Web Analytics to see aggregate page views and referrers. It is cookieless and does not profile you, fingerprint your device, or track you across sites. We cannot identify individual visitors from it.",
  },
  {
    title: "Hosting and logs",
    body: "The site is served by Cloudflare, which processes standard request logs (IP address, user agent) to deliver and protect the site. See Cloudflare's privacy policy for how they handle that data.",
  },
  {
    title: "Cookies",
    body: "This site sets no cookies of its own. That is why there is no cookie banner.",
  },
  {
    title: "Our products",
    body: "KrakenKey and Atomatize are separate services with their own accounts and their own privacy policies, available on their sites.",
  },
  {
    title: "Your data, your call",
    body: "If you have emailed us or used the contact form and want that correspondence deleted, email hello@cloudwalker.it and we will delete it.",
  },
];

export default function PrivacyPage() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-cloud-400">
          Privacy
        </p>
        <h1 className="mt-2 text-4xl font-bold">Privacy policy</h1>
        <p className="mt-4 text-gray-400">
          The short version: we collect what you type into the contact form,
          we count page views without cookies, and we sell nothing to anyone.
          Details below. Last updated September 2026.
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-xl font-semibold">{s.title}</h2>
              <p className="mt-3 text-gray-400">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
