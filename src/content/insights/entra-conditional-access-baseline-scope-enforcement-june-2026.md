---
title: "Conditional Access Enforcement Now Reaches Baseline Scopes: What the June 2026 Rollout Breaks"
description: "Microsoft began rolling out Conditional Access enforcement for OIDC and baseline directory sign-ins on June 15, 2026. Tenants with All resources policies and resource exclusions are affected. Azure CLI, VS Code, and any app requesting only User.Read are in scope."
date: "2026-06-25"
author: "Cloudwalker IT"
tags: ["entra-id", "conditional-access", "identity", "security", "azure"]
readTime: "6 min read"
---

Microsoft started rolling out a Conditional Access behavior change on June 15, 2026 that closes an enforcement gap in policies targeting **All resources** with one or more resource exclusions. The full technical specification is at [learn.microsoft.com](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-enforcement-resource-exclusions); advance notice went out as Message Center item MC1223829. The rollout is progressive over several weeks, so some tenants are already affected and others are not yet.

## What Changed

Conditional Access policies that target **All resources** have a class of sign-in they were silently skipping: requests where the client application requests *only* baseline scopes. Baseline scopes are:

- **OIDC scopes**: `openid`, `email`, `profile`, `offline_access`
- **Baseline directory scopes**: `User.Read`, `User.Read.All`, `User.ReadBasic.All`, `People.Read`, `People.Read.All`, `GroupMember.Read.All`, `Member.Read.Hidden`

These scopes map internally to the Windows Azure Active Directory resource (Azure AD Graph). When a policy targeted All resources and had any resource exclusion, the enforcement engine treated baseline-scope requests as if they were asking for access to the excluded resource and let them through without challenge. The policy controls did not fire.

After the rollout, baseline-scope sign-ins are evaluated against Windows Azure Active Directory as the explicit enforcement audience, regardless of what other resources the policy excludes. MFA, device compliance, app protection -- whatever grant controls the policy specifies now apply.

Microsoft provides a Graph query to identify which applications in your tenant are making baseline-only requests. It requires first enabling enforcement manually in the [Baseline scopes settings](https://aka.ms/BaselineScopesSettingsUX) (which creates a placeholder application used as the filter target), then querying sign-in logs:

```http
GET https://graph.microsoft.com/beta/auditLogs/signIns
  ?$filter=createdDateTime ge 2026-06-01T00:00:00Z
    and createdDateTime lt 2026-06-02T00:00:00Z
    and conditionalAccessAudiences/any(a:a eq '<your-placeholder-app-id>')
  &$select=createdDateTime,appId,appDisplayName,userDisplayName,conditionalAccessStatus
```

Run this across several days to capture the full application population.

## Why It Matters Operationally

The tools most likely to surface failures are the ones engineers use constantly.

**Azure CLI** requests only `User.Read` during device-code and browser-based sign-ins. Before June 15, an Azure CLI login by a user in scope of a compliant-device CA policy succeeded without triggering a compliance check, as long as the policy had any resource exclusion. After the rollout reaches that tenant, the same login is evaluated. On a device that cannot satisfy compliance -- an unmanaged personal machine, a Linux workstation not enrolled in Intune -- it fails.

**VS Code** authenticates with `openid` and `profile`. Same exposure. Any developer signing in to VS Code on a machine outside your device management scope will hit whatever grant controls your All resources policies enforce.

**Confidential clients explicitly excluded from All resources policies** are the higher-risk scenario. The exclusion was probably intentional: a SaaS vendor or internal service with strict access requirements exempted so it could authenticate outside the standard policy. If that application requests only `User.Read` or `People.Read`, the exclusion no longer protects it from policy enforcement on baseline-scope sign-ins. The exclusion still applies for sign-ins where the application requests any scope beyond the baseline set -- the behavior change is scoped precisely to baseline-only requests.

**Non-interactive delegated flows** that cannot respond to MFA or device compliance prompts -- background services, CI/CD pipelines using user-delegated auth, OAuth flows in legacy automation -- will surface as `interaction_required` errors rather than a visible prompt. The failures can be quiet until something downstream breaks.

[YOUR EXPERIENCE: Among the tenants you manage, have you found confidential clients that were explicitly excluded from an All resources block or compliant-device policy because they only need User.Read or similar low-privilege directory access? If so, were those exclusions documented with a business justification, or were they accumulated over time without clear ownership?]

## Tradeoffs and Caveats

Closing this gap is the correct security call. CA policies should not have scope-based blind spots, and the enforcement model prior to June 15 meant that obtaining only minimal directory permissions was a reliable way to bypass grant controls in many tenants.

The operational problem is detection. Sign-ins that previously slipped through do not leave any indicator in logs that they bypassed CA -- they simply succeeded. You cannot run a historical query showing "applications that relied on this gap" without first enabling enforcement in a test environment and running the placeholder-app query against recent logs. For tenants with many CA policies and many resource exclusions, this audit takes real time and requires careful interpretation.

The per-policy escape hatch (Baseline scopes settings, Customize behavior) lets you register a placeholder application and exclude it from specific policies to retain legacy behavior for particular scenarios. That workaround is designed for short-term continuity while applications are updated, not as a permanent configuration.

One gap that remains: confidential clients requesting *only* OIDC scopes (`openid`, `profile`, `email`) with an exclusion from an All resources policy are still not evaluated. The enforcement change covers baseline directory scopes; OIDC-only confidential clients remain outside it.

The rollout reaches tenants automatically. If a tenant has not configured a setting in the Baseline scopes UX, enforcement is applied by the rollout. Tenants that previously selected Disable enforcement retain that configuration until they change it.
