"use client";

import { useState, type FormEvent } from "react";
import Section from "@/components/Section";

const contactInfo = [
  { label: "Email", value: "hello@cloudwalker.it" },
  { label: "Location", value: "United States — remote engagements" },
  { label: "Response time", value: "Within one business day" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    // Serverless-friendly: POST to a Cloudflare Worker or any endpoint
    // For static export, we encode as mailto fallback or use external service
    const body = {
      name: data.get("name"),
      email: data.get("email"),
      company: data.get("company"),
      message: data.get("message"),
      website: data.get("website"),
    };

    try {
      // Attempt to send to API endpoint (configure in production)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        // Fallback: open mailto
        window.location.href = `mailto:hello@cloudwalker.it?subject=Contact from ${body.name}&body=${encodeURIComponent(
          `Name: ${body.name}\nEmail: ${body.email}\nCompany: ${body.company}\n\n${body.message}`
        )}`;
      }
    } catch {
      // Offline/no API fallback
      window.location.href = `mailto:hello@cloudwalker.it?subject=Contact from ${body.name}&body=${encodeURIComponent(
        `Name: ${body.name}\nEmail: ${body.email}\nCompany: ${body.company}\n\n${body.message}`
      )}`;
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <Section>
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cloud-400">
            Contact
          </p>
          <h1 className="mt-2 text-4xl font-bold">Get in touch</h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Tell us about an engagement you are considering, ask about KrakenKey or Atomatize, or use the form to start a conversation. We respond within one business day.
          </p>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="rounded-xl border border-accent-400/20 bg-accent-400/5 p-8 text-center">
                <p className="text-2xl font-bold text-accent-400">Thank you.</p>
                <p className="mt-2 text-gray-400">
                  Your message has reached us. We will respond within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot — bots fill this, humans don't see it */}
                <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
                  <label>
                    Don&apos;t fill this in:
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      maxLength={200}
                      className="w-full rounded-lg border border-white/10 bg-dark-800 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-cloud-400/50 focus:ring-1 focus:ring-cloud-400/50"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      maxLength={320}
                      pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                      title="Please enter a valid email address"
                      className="w-full rounded-lg border border-white/10 bg-dark-800 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-cloud-400/50 focus:ring-1 focus:ring-cloud-400/50 invalid:[&:not(:placeholder-shown)]:border-red-500/50"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="mb-2 block text-sm font-medium text-gray-300">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    maxLength={200}
                    className="w-full rounded-lg border border-white/10 bg-dark-800 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-cloud-400/50 focus:ring-1 focus:ring-cloud-400/50"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-300">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    maxLength={5000}
                    className="w-full rounded-lg border border-white/10 bg-dark-800 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-cloud-400/50 focus:ring-1 focus:ring-cloud-400/50"
                    placeholder="Tell us about your project or question..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="rounded-lg bg-cloud-500 px-8 py-3 text-sm font-semibold text-dark-900 shadow-lg shadow-cloud-500/25 transition hover:bg-cloud-400 disabled:opacity-50"
                >
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-white/5 bg-dark-800/50 p-8">
              <h2 className="text-lg font-semibold">Contact details</h2>
              <div className="mt-6 space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.label}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      {info.label}
                    </p>
                    <p className="mt-1 text-gray-300">{info.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-white/5 pt-8">
                <h3 className="text-sm font-semibold text-gray-300">What happens next</h3>
                <ol className="mt-4 space-y-3">
                  <li className="flex gap-3 text-sm text-gray-400">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cloud-500/10 text-xs font-bold text-cloud-400">
                      1
                    </span>
                    We review your inquiry within one business day.
                  </li>
                  <li className="flex gap-3 text-sm text-gray-400">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cloud-500/10 text-xs font-bold text-cloud-400">
                      2
                    </span>
                    A short call to understand the problem.
                  </li>
                  <li className="flex gap-3 text-sm text-gray-400">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cloud-500/10 text-xs font-bold text-cloud-400">
                      3
                    </span>
                    A scoped proposal if it is a fit, or a referral if it is not.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
