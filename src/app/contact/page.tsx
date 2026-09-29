"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Section from "@/components/Section";
import { BOOKING_CTA, BOOKING_URL } from "@/lib/site";

const contactInfo = [
  { label: "Email", value: "hello@cloudwalker.it" },
  { label: "Location", value: "United States, working remotely" },
  { label: "Response time", value: "Within one business day" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [mailtoHref, setMailtoHref] = useState("mailto:hello@cloudwalker.it");
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  useEffect(() => {
    if (failed) errorRef.current?.focus();
  }, [failed]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setFailed(false);

    const form = e.currentTarget;
    const data = new FormData(form);

    const body = {
      name: data.get("name"),
      email: data.get("email"),
      company: data.get("company"),
      message: data.get("message"),
      website: data.get("website"),
    };

    // Prefilled fallback shown in the error state; the user chooses to
    // open it rather than being redirected into it.
    const mailto = `mailto:hello@cloudwalker.it?subject=Contact from ${encodeURIComponent(
      String(body.name ?? "")
    )}&body=${encodeURIComponent(
      `Name: ${body.name}\nEmail: ${body.email}\nCompany: ${body.company}\n\n${body.message}`
    )}`;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setMailtoHref(mailto);
        setFailed(true);
      }
    } catch {
      setMailtoHref(mailto);
      setFailed(true);
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
            Booking a call is quickest. If you&apos;d rather write first, use the form and we&apos;ll reply within one business day.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl rounded-xl border border-cloud-400/20 bg-dark-800/50 p-8 text-center">
          <h2 className="text-xl font-bold">Book the intro call</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-gray-400">
            30 minutes on Proton Meet, no account needed. Bring the problem
            you&apos;re working on.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-lg bg-cloud-500 px-8 py-3 text-sm font-semibold text-dark-900 transition hover:bg-cloud-400"
          >
            {BOOKING_CTA}
          </a>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div
                ref={successRef}
                role="status"
                tabIndex={-1}
                className="rounded-xl border border-accent-400/20 bg-accent-400/5 p-8 text-center outline-none"
              >
                <p className="text-2xl font-bold text-accent-400">Thanks, we got it.</p>
                <p className="mt-2 text-gray-400">
                  We&apos;ll reply within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {failed && (
                  <div
                    ref={errorRef}
                    role="alert"
                    tabIndex={-1}
                    className="rounded-xl border border-red-400/30 bg-red-400/5 p-6 outline-none"
                  >
                    <p className="font-semibold text-red-300">
                      Your message didn&apos;t send.
                    </p>
                    <p className="mt-2 text-sm text-gray-400">
                      Try again in a moment, or email us directly at{" "}
                      <a
                        href={mailtoHref}
                        className="text-cloud-400 underline decoration-cloud-400/40 underline-offset-2 hover:decoration-cloud-400"
                      >
                        hello@cloudwalker.it
                      </a>
                      {" "}(the link opens your mail app with the message prefilled).
                      Nothing you typed has been lost.
                    </p>
                  </div>
                )}
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
                      autoComplete="name"
                      required
                      maxLength={200}
                      className="w-full rounded-lg border border-white/10 bg-dark-800 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-cloud-400 focus:ring-2 focus:ring-cloud-400"
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
                      autoComplete="email"
                      required
                      maxLength={320}
                      pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                      title="Please enter a valid email address"
                      className="w-full rounded-lg border border-white/10 bg-dark-800 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-cloud-400 focus:ring-2 focus:ring-cloud-400 invalid:[&:not(:placeholder-shown)]:border-red-500/50"
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
                    autoComplete="organization"
                    maxLength={200}
                    className="w-full rounded-lg border border-white/10 bg-dark-800 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-cloud-400 focus:ring-2 focus:ring-cloud-400"
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
                    className="w-full rounded-lg border border-white/10 bg-dark-800 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-cloud-400 focus:ring-2 focus:ring-cloud-400"
                    placeholder="Tell us about your project or question..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="rounded-lg bg-cloud-500 px-8 py-3 text-sm font-semibold text-dark-900 transition hover:bg-cloud-400 disabled:opacity-50"
                >
                  {sending ? "Sending..." : "Send message"}
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
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
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
                    We reply within one business day.
                  </li>
                  <li className="flex gap-3 text-sm text-gray-400">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cloud-500/10 text-xs font-bold text-cloud-400">
                      2
                    </span>
                    We talk it through on a short call.
                  </li>
                  <li className="flex gap-3 text-sm text-gray-400">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cloud-500/10 text-xs font-bold text-cloud-400">
                      3
                    </span>
                    You get a written proposal, or a referral if we&apos;re not the right people.
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
