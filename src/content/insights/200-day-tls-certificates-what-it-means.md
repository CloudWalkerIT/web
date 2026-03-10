---
title: "200-Day TLS Certificates Take Effect March 15 — Here's What Changes"
description: "CA/B Forum Ballot SC-081 cuts maximum TLS certificate lifetime to 200 days starting March 15, 2026, with further reductions ahead. We break down the operational impact and the case for automation."
date: "2026-03-10"
author: "Cloudwalker IT"
tags: ["security", "tls", "certificates", "automation", "infrastructure"]
readTime: "7 min read"
---

## The Deadline You Can't Ignore

On March 15, 2026, the maximum lifetime of a publicly trusted TLS certificate drops from 398 days to 200 days under [CA/Browser Forum Ballot SC-081](https://krakenkey.io/blog/200-day-tls-certs-are-here/). This is not a proposal or a draft — the ballot passed in April 2025, and enforcement begins in five days.

If your organization still manages TLS renewals manually or semi-manually, this is the inflection point where that approach starts breaking down. And 200 days is only the first step.

## The SC-081 Timeline

SC-081 lays out a phased reduction in maximum certificate validity:

<div class="my-6 overflow-x-auto rounded-xl border border-white/10 bg-dark-800/50">
  <table class="w-full text-left text-sm">
    <thead>
      <tr class="border-b border-white/10 bg-dark-700/50">
        <th class="px-4 py-3 font-semibold text-white sm:px-6">Effective Date</th>
        <th class="px-4 py-3 font-semibold text-white sm:px-6">Max Lifetime</th>
        <th class="px-4 py-3 font-semibold text-white sm:px-6">Renewals/Year</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-white/5">
      <tr>
        <td class="whitespace-nowrap px-4 py-3 text-gray-400 sm:px-6">Until March 15, 2026</td>
        <td class="px-4 py-3 text-gray-400 sm:px-6">398 days</td>
        <td class="px-4 py-3 text-gray-400 sm:px-6">~1</td>
      </tr>
      <tr class="bg-cloud-500/5">
        <td class="whitespace-nowrap px-4 py-3 font-medium text-cloud-400 sm:px-6">March 15, 2026</td>
        <td class="px-4 py-3 text-white sm:px-6">200 days</td>
        <td class="px-4 py-3 text-white sm:px-6">~2</td>
      </tr>
      <tr>
        <td class="whitespace-nowrap px-4 py-3 text-gray-400 sm:px-6">March 15, 2027</td>
        <td class="px-4 py-3 text-gray-400 sm:px-6">100 days</td>
        <td class="px-4 py-3 text-gray-400 sm:px-6">~4</td>
      </tr>
      <tr>
        <td class="whitespace-nowrap px-4 py-3 text-gray-400 sm:px-6">March 15, 2029</td>
        <td class="px-4 py-3 text-gray-400 sm:px-6">47 days</td>
        <td class="px-4 py-3 text-gray-400 sm:px-6">~8</td>
      </tr>
    </tbody>
  </table>
</div>

Equally important: Domain Control Validation (DCV) reuse shrinks to just 10 days under the new rules. By 2029, revalidation becomes nearly continuous.

## Why This Matters Operationally

Shorter certificate lifetimes are a net positive for security posture. A compromised key has a smaller blast radius when the certificate it's attached to expires in weeks rather than a year. Revocation — which has always been unreliable in practice due to spotty CRL and OCSP checking — matters less when expiration does the heavy lifting.

But the security benefit only materializes if you can actually keep up with the renewal pace. Going from one renewal per year to two is manageable on paper. In practice, the problem is compounding — each step doubles the operational load, and the 47-day endpoint demands a fundamentally different workflow than what most infrastructure teams run today.

Consider a mid-size environment with 50–200 certificates across production services, internal tools, and SaaS integrations. At 398-day lifetimes, a spreadsheet and calendar reminders might suffice. At 47-day lifetimes, that same environment requires roughly 1,600–6,400 renewal operations per year. Manual processes do not scale to that volume — and a single missed renewal means a production outage.

Certificate expiry remains one of the most common causes of preventable outages across the industry. Shorter lifetimes increase the surface area for that failure mode unless automation absorbs the burden.

## ACME Solves Issuance, Not Lifecycle

Most teams that have automated TLS at all rely on ACME clients like Certbot or acme.sh. These tools are excellent at what they do — requesting and installing certificates on a single host. But as the [KrakenKey team pointed out in their analysis of this change](https://krakenkey.io/blog/200-day-tls-certs-are-here/), ACME handles the *issuance* side of the problem. It does not solve lifecycle *management* across a fleet.

What ACME clients typically lack:

- **Cross-infrastructure visibility** — no single pane of glass showing certificate status across dozens or hundreds of endpoints
- **Failure detection and alerting** — a failed renewal on one server writes to a local log that nobody reads until the site goes down
- **Team-based workflows** — renewing a certificate shouldn't require SSH access to a production box
- **Audit trails** — when compliance asks who renewed what and when, grepping Certbot logs across 50 servers isn't an answer

These gaps are manageable when you renew once a year. At four to eight renewals per year per certificate, they become operational liabilities. A Certbot cronjob that silently fails is invisible until a service goes down. At two renewals per year, you might catch it. At eight, the odds shift against you.

## The Tooling Landscape

Enterprise certificate lifecycle platforms — Venafi (now CyberArk), Keyfactor, and similar — address these gaps comprehensively but carry price tags ($25K–$500K+/year) and implementation complexity that puts them out of reach for small-to-mid-size infrastructure teams.

On the other end, open-source ACME clients are free and effective at what they do, but lack centralized visibility, team collaboration features, and the monitoring layer that prevents silent failures.

This leaves a practical gap for teams that need more than a cron job but less than an enterprise platform. [KrakenKey](https://krakenkey.io/) is one tool worth evaluating in this space — it layers management, visibility, and team workflows on top of the certificate lifecycle with a web dashboard, REST API for certificate operations, centralized monitoring with renewal alerting, role-based access control, and audit logging. Their [free tier](https://krakenkey.io) covers 3 domains and 10 active certificates, with paid plans starting at $29/month — positioned for teams that have outgrown Certbot-on-a-cron-job but aren't ready to sign a six-figure CLM contract.

We are not affiliated with KrakenKey, but their approach aligns well with the kind of infrastructure we build and manage for clients.

## Practitioner Checklist

If you manage TLS certificates for any environment, the March 15 deadline is an opportunity to audit your current process:

1. **Inventory your certificates.** Know every certificate in your infrastructure, where it's installed, and when it expires. If you cannot answer this question in under five minutes, that is the first problem to solve.

2. **Identify manual processes.** Any certificate that requires a human to log in and run commands is a future outage waiting to happen at 47-day lifetimes.

3. **Automate issuance.** If you are not already using ACME or an equivalent, start there. This is table stakes.

4. **Add monitoring and alerting.** Automated issuance without verification is a false sense of security. You need to know when renewals fail, not discover it from a user report.

5. **Evaluate lifecycle tooling.** Whether that is KrakenKey, an enterprise CLM platform, or a custom integration built on your existing stack, the key is closing the gap between issuance and management.

6. **Plan for 47 days, not 200.** The 200-day limit is the gentle introduction. March 2027 brings 100-day certs — just twelve months away. Design your automation for the 2029 endpoint now so you are not scrambling through two more migration cycles.

## The Bottom Line

The shift to shorter TLS lifetimes is part of a wider industry push to reduce the window of exposure when a private key is compromised. The security rationale is sound. But security improvements that introduce operational fragility create their own risk. The organizations that benefit from shorter lifetimes are the ones with automation mature enough to absorb the increased velocity. For everyone else, the net effect is more outages, not fewer compromises.

The 200-day deadline is the gentlest version of this change you will see. Use it.

---

*This post references and builds on the analysis published by the KrakenKey team: [The 200-Day TLS Deadline Arrives — And It's Just the Beginning](https://krakenkey.io/blog/200-day-tls-certs-are-here/).*

---

*Need help automating your certificate lifecycle or hardening your infrastructure for shorter TLS lifetimes? [Talk to our team](/contact) — we help organizations build resilient, automated security operations.*
