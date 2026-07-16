---
title: "Entra ID Is Retiring SMS and Voice MFA: What the Passkey-by-Default Timeline Means for Admins"
description: "Starting September 1, 2026, Microsoft Entra ID auto-enrolls SMS/voice MFA users into passkey registration campaigns. Microsoft-provided telecom delivery ends February 1, 2027, with a blocking passkey prompt and no opt-out. Here is the admin timeline."
date: "2026-07-16"
author: "Cloudwalker IT"
tags: ["azure", "entra-id", "identity", "mfa", "passkeys", "security"]
readTime: "5 min read"
---

On July 13, 2026, Microsoft published [Passkeys by default and retirement of Microsoft-provided SMS and voice authentication](https://learn.microsoft.com/entra/identity/authentication/concept-sms-voice-retirement), confirming that Entra ID is retiring its native SMS and voice MFA delivery and making passkeys the default authentication method for any tenant still using phone-based MFA. The retirement runs on a fixed schedule starting September 1, 2026, with full enforcement by February 1, 2027.

## What changed

Entra ID's Authentication Methods Policy (AMP) and legacy MFA settings currently let tenants enable SMS and voice as MFA factors, delivered directly by Microsoft. That native delivery path is going away, on four dates:

- **September 1, 2026**: any user currently enabled for SMS or voice in AMP (or legacy MFA) is automatically enabled for passkeys. Their tenant's registration campaign switches to Microsoft-managed state, targeting passkeys instead of Microsoft Authenticator, and every MFA-capable user in scope starts getting a registration nudge after sign-in. Snooze behavior changes too: the window drops from 3 days to 1, and the previously configurable snooze limit becomes fixed and non-configurable.
- **September 18, 2026**: Microsoft publishes the list and pricing model for third-party telecom providers available through the Microsoft Security Store.
- **October 30, 2026**: admins can select and configure a customer-managed telecom provider through the Security Store, for tenants with a genuine regulatory or operational reason to keep SMS/voice.
- **February 1, 2027**: Microsoft-provided SMS and voice delivery is fully retired. Any user whose only MFA method is still SMS or voice, and whose tenant hasn't configured a Security Store telecom provider, hits a blocking passkey registration prompt on next sign-in. Microsoft states plainly that this has no opt-out.

There's a narrower escape hatch: a temporary opt-out API becomes available August 1, 2026, letting tenants delay the September 1 auto-enablement and campaign switch while they finish migration work. It only defers the September changes; it doesn't cancel February 1 enforcement.

Microsoft ships a [PowerShell-based usage analyzer](https://github.com/microsoft/entra-sms-voice-usage-analyzer) to find which users in a tenant are currently enrolled in SMS or voice, requiring Global Reader, Authentication Policy Administrator, or Security Reader. Supported passkey types are synced (iCloud Keychain, Google Password Manager) and device-bound (Microsoft Authenticator, Windows Hello-backed Entra passkeys, FIDO2 hardware keys). The timeline applies to Entra ID in public cloud only; sovereign and government clouds follow a separate, not-yet-published schedule.

## Why it matters operationally

This isn't just a policy toggle. Microsoft is changing default tenant behavior for admins who don't act first. If you have users still on SMS or voice MFA and haven't touched your registration campaign settings, your tenant's campaign target silently flips from Microsoft Authenticator to passkeys on September 1, and the targeted audience expands from "voice/SMS users" to "all MFA-capable users." For organizations running Conditional Access policies that gate on authentication strength or method (phishing-resistant MFA requirements, step-up auth for privileged roles), this changes the population receiving registration prompts and can interact with existing CA exclusions built around specific method assignments.

SSPR is in scope too. The native SMS/voice retirement applies across Entra, not just interactive sign-in, so any self-service password reset flow relying on Microsoft-delivered SMS falls under the same February 1 cutoff. Call centers, break-glass accounts, and shared-device scenarios that lean on SMS because passkeys don't map cleanly to them need a plan before Q1 2027, not a fire drill after.

[YOUR EXPERIENCE: Have you run the Entra SMS/voice usage analyzer against a client tenant yet, and if so, roughly what fraction of MFA-capable users came back still enrolled in SMS or voice?]

## Tradeoffs and caveats

The security case for killing SMS/voice MFA isn't in dispute. Phone-based MFA is phishable, vulnerable to SIM-swapping, and has been on Microsoft's own "stop using this" list since at least 2020. Moving tenants to phishing-resistant passkeys by default is the right direction.

The caveat is the compressed, partly Microsoft-managed nature of the rollout. Tenants that do nothing get auto-enrolled into behavior changes on Microsoft's schedule, and the temporary opt-out mechanism doesn't exist yet: it's promised for August 1, 2026, roughly a month before the first auto-enablement wave, with no confirmed detail yet on whether it will be Graph-based, portal-only, or PowerShell. Regulated environments with a genuine operational need for SMS also don't get a like-for-like replacement. Microsoft's own delivery goes away entirely, and continuing requires standing up a paid third-party telecom contract through the Security Store, with per-message pricing that varies by provider and region and won't be published until September 18.

Migrating users from Microsoft-delivered SMS/voice to passkeys carries no additional licensing cost, which is a genuine plus for tenants that can complete the move on the default timeline.

Full enforcement lands February 1, 2027; the first auto-enablement wave lands September 1, 2026, regardless of whether affected tenants have acted.
