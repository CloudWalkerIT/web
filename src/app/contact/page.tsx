"use client";

import { useState, type FormEvent } from "react";
import Section from "@/components/Section";

const contactInfo = [
  { label: "Email", value: "hello@cloudwalker.it" },
  { label: "Location", value: "Europe / Remote-First" },
  { label: "Response Time", value: "Within 24 hours" },
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
            Contact Us
          </p>
          <h1 className="mt-2 text-4xl font-bold">Let&apos;s Build Something Great</h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Ready to transform your IT infrastructure? Have a question about Atomatize? We&apos;re here to help.
          </p>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="rounded-xl border border-accent-400/20 bg-accent-400/5 p-8 text-center">
                <p className="text-2xl font-bold text-accent-400">Thank You!</p>
                <p className="mt-2 text-gray-400">
                  We&apos;ve received your message and will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      className="w-full rounded-lg border border-white/10 bg-dark-800 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-cloud-400/50 focus:ring-1 focus:ring-cloud-400/50"
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
                    className="w-full rounded-lg border border-white/10 bg-dark-800 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-cloud-400/50 focus:ring-1 focus:ring-cloud-400/50"
                    placeholder="Tell us about your project or question..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="rounded-lg bg-cloud-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-cloud-500/25 transition hover:bg-cloud-600 disabled:opacity-50"
                >
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-white/5 bg-dark-800/50 p-8">
              <h2 className="text-lg font-semibold">Get in Touch</h2>
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
                <h3 className="text-sm font-semibold text-gray-300">What happens next?</h3>
                <ol className="mt-4 space-y-3">
                  <li className="flex gap-3 text-sm text-gray-400">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cloud-500/10 text-xs font-bold text-cloud-400">
                      1
                    </span>
                    We review your inquiry within 24 hours
                  </li>
                  <li className="flex gap-3 text-sm text-gray-400">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cloud-500/10 text-xs font-bold text-cloud-400">
                      2
                    </span>
                    A specialist schedules a discovery call
                  </li>
                  <li className="flex gap-3 text-sm text-gray-400">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cloud-500/10 text-xs font-bold text-cloud-400">
                      3
                    </span>
                    We deliver a tailored proposal
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
