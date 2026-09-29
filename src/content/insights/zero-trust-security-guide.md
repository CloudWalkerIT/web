---
title: "Zero Trust on Azure Starts in Entra ID"
description: "Most zero trust programmes start with network segmentation. On Azure, the controls that matter most live in Entra ID: emergency accounts, Conditional Access, PIM and workload identities. An order of work that holds up."
date: "2026-01-20"
author: "Cloudwalker IT"
tags: ["security", "zero trust", "cybersecurity", "compliance"]
readTime: "7 min read"
---

Ask a team to plan a zero trust programme and the first draft usually looks like a network project: segment the VNets, add firewalls between tiers, put private endpoints on everything. Those are worthwhile, but on Azure they're not where attackers get in. The common incidents we see start with an identity: a phished admin, a client secret committed to a repository, a service principal with Owner on a subscription it was only meant to deploy one app into.

So we start in Entra ID, and we work in a particular order. Each step makes the next one safer to do.

## 1. Emergency access accounts, before anything else

The next steps involve Conditional Access policies, and a mistake there can lock every administrator out of the tenant. Before creating any policy, set up two [emergency access accounts](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access):

- cloud-only accounts on the `onmicrosoft.com` domain, not synced from on-premises AD;
- Global Administrator assigned permanently, not through PIM;
- phishing-resistant authentication such as FIDO2 security keys, stored separately;
- excluded from Conditional Access policies, so a bad policy can't lock them out;
- an alert on any sign-in, because nobody should be using them day to day.

Azure now [enforces MFA](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mandatory-multifactor-authentication) for sign-ins to the Azure portal, CLI, PowerShell and management APIs. An emergency account with only a password won't get into Azure resources when you need it. The FIDO2 keys are what let it satisfy that requirement while staying outside your own policies.

Test both accounts once they're set up, and put a recurring reminder to test them again.

## 2. A Conditional Access baseline

Microsoft publishes a set of [common Conditional Access policies](https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-policy-common). The ones we treat as the baseline for almost every tenant:

- **Require MFA for all users.** Exclude the emergency accounts and nothing else without a written reason.
- **Block legacy authentication.** Legacy protocols can't do MFA, so they'd bypass the previous policy. Exchange Online has already switched most of them off, but SMTP AUTH and older line-of-business apps can still use them. Check the sign-in logs for legacy client apps first; there's usually a scanner or printer somewhere.
- **Require phishing-resistant MFA for administrator roles.** Use an authentication strength, not just "require MFA". Push notifications and SMS codes can be phished or fatigued; FIDO2 keys and Windows Hello for Business can't.
- **Require a compliant or hybrid-joined device for admin roles.** An admin session from an unmanaged personal laptop is a risk you can close with one policy, if the devices are enrolled in Intune.
- **Risk-based policies**, if you have Entra ID P2: require a password change on high user risk and MFA on medium or high sign-in risk.

Create every policy in report-only mode first. Leave it for a week or two, read the results in the sign-in logs, and use the What If tool for edge cases before switching it on. Most outages from Conditional Access come from a policy that went straight to "On".

## 3. No standing admin access

Count the permanent privileged assignments you have now. For Azure resources:

```bash
az role assignment list --all --include-inherited \
  --query "[?roleDefinitionName=='Owner' || roleDefinitionName=='User Access Administrator'].{who:principalName, type:principalType, scope:scope}" \
  -o table
```

For Entra roles, check Global Administrator, Privileged Role Administrator and the other high-impact roles in the portal or with Microsoft Graph.

The number is usually larger than anyone expected, and a good share of it is people who needed access once. [Privileged Identity Management](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure) (Entra ID P2) turns those into eligible assignments. A person activates the role when they need it, for a limited time, with a justification and optionally an approval. Every activation is logged.

Start with Global Administrator and Owner on production subscriptions, then work down. Keep activation durations short, and set up an access review so eligible assignments that nobody activates get removed.

## 4. Workload identities without secrets

Human accounts are now behind MFA, device checks and just-in-time access. Service principals with client secrets have none of that. A secret in a pipeline variable or an app setting works from anywhere, for as long as it's valid, often a year or two.

Replace them in this order:

- **Azure-hosted workloads** (App Service, Functions, Container Apps, VMs): use a managed identity. There's no credential to store or rotate.
- **AKS workloads:** use [workload identity](https://learn.microsoft.com/en-us/azure/aks/workload-identity-overview), which federates a Kubernetes service account with a managed identity.
- **CI/CD** (GitHub Actions, Azure DevOps, GitLab): use [workload identity federation](https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation). The pipeline gets a short-lived token from its own identity provider and exchanges it with Entra ID. Nothing long-lived sits in the pipeline settings.

While you're there, check what each service principal can do. A deployment pipeline for one app needs Contributor on that app's resource group, not Owner on the subscription.

## 5. Keep the logs long enough to use

Entra ID keeps sign-in and audit logs for a limited time: [30 days](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/reference-reports-data-retention) with P1 or P2, less without. Incidents often surface later than that.

Send sign-in logs (including service principal and managed identity sign-ins), audit logs and Azure activity logs to a Log Analytics workspace with retention that matches your investigation needs. If you use Microsoft Sentinel, this is the same workspace. If you don't, it's still the place you'll want to query when something looks wrong.

## 6. Then the network

With identity in order, network controls add depth instead of being the only line:

- **Private endpoints** for PaaS services holding data, such as Storage, SQL and Key Vault, with public network access disabled. The work here is mostly DNS. Private DNS zones need to be linked to every VNet that resolves them, and on-premises clients need a forwarder, usually Azure DNS Private Resolver.
- **Segmentation** between workloads with NSGs and a central firewall in the hub, starting with the paths that would let a compromised app server reach a database it has no business talking to.
- **No public management ports.** RDP and SSH go through Azure Bastion or just-in-time VM access, not public IPs.

## What this doesn't cover

Endpoint protection, email security, data classification and SaaS app governance are all part of a full zero trust model, and they matter. But for an organisation whose crown jewels live in Azure, the list above covers the paths most attacks actually take. It also gives the rest of the programme a solid base: you can't enforce device compliance or data policies for identities you haven't secured.

There's no fixed timeline to any of this. A small tenant can get through the first four steps in a few weeks. A large one with years of accumulated service principals and standing access will spend longer on steps 3 and 4 than on everything else combined, and that time is well spent.
