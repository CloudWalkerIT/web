// Cloudflare Pages Function — handles POSTs from the contact form.
// Sends email via Resend when RESEND_API_KEY is set in the Pages env vars;
// otherwise returns 503 so the client falls back to its mailto: handler.
//
// Setup:
//   1. Sign up at resend.com (free tier: 100 emails/day, 3000/month).
//   2. Add cloudwalker.it as a domain and complete DNS verification.
//   3. Generate an API key and add it to the Cloudflare Pages project as
//      RESEND_API_KEY (Settings → Environment variables → Production).
//   4. Optionally set CONTACT_FROM and CONTACT_TO env vars to override the
//      defaults below.

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_FROM?: string;
  CONTACT_TO?: string;
}

interface Context {
  request: Request;
  env: Env;
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
  // honeypot — invisible field that bots fill, humans don't
  website?: unknown;
}

const DEFAULT_FROM = "Cloudwalker IT <contact@cloudwalker.it>";
const DEFAULT_TO = "hello@cloudwalker.it";

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function asString(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function onRequestPost(context: Context): Promise<Response> {
  let payload: ContactPayload;
  try {
    payload = (await context.request.json()) as ContactPayload;
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  // Honeypot — pretend success so the bot doesn't retry.
  if (asString(payload.website, 200)) {
    return json({ ok: true });
  }

  const name = asString(payload.name, 200);
  const email = asString(payload.email, 320);
  const company = asString(payload.company, 200);
  const message = asString(payload.message, 5000);

  if (!name || !email || !message) {
    return json({ error: "Missing required fields" }, 400);
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ error: "Invalid email address" }, 400);
  }

  const apiKey = context.env.RESEND_API_KEY;
  if (!apiKey) {
    return json({ error: "Mail service not configured" }, 503);
  }

  const subject = `Cloudwalker IT contact — ${name}${company ? ` (${company})` : ""}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const resendResp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: context.env.CONTACT_FROM ?? DEFAULT_FROM,
      to: [context.env.CONTACT_TO ?? DEFAULT_TO],
      reply_to: email,
      subject,
      text,
    }),
  });

  if (!resendResp.ok) {
    const detail = await resendResp.text().catch(() => "");
    console.error("Resend error", resendResp.status, detail);
    return json({ error: "Email send failed" }, 502);
  }

  return json({ ok: true });
}
