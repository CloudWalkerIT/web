---
title: "Reinstating Admin-on-Behalf-Of Access on an Azure Subscription"
description: "Admin On Behalf Of access to a customer's Azure subscription doesn't always carry over the way partners expect. The documented fix is a scoped RBAC grant to a foreign security group -- and it turns out to work well beyond the CSP program."
date: "2026-09-01"
author: "Cloudwalker IT"
tags: ["azure", "csp", "rbac", "partner-center", "powershell"]
readTime: "5 min read"
---

## The Problem

Admin On Behalf Of access to a customer's Azure subscription is supposed to be automatic once a reseller relationship is in place. We ran into a subscription where that access wasn't there, and getting it back turned out to be less obvious than it should be -- Microsoft has a documented path for it, but it's one we've found most people in the partner channel have never had to use.

[GAP: the specific trigger -- what surfaced the missing access (couldn't manage the subscription, it wasn't listed in Partner Center, an error on a specific action) and what caused it to go missing in the first place -- wasn't detailed in the intake notes.]

## Tenant Access and Subscription Access Are Two Different Grants

In the CSP program, a partner's rights over a customer split into two layers that don't move together. Tenant-level access -- resetting passwords, managing licenses, that kind of administration -- comes from establishing a reseller relationship and getting granular delegated admin privileges (GDAP) with the customer's tenant.

Subscription-level access is separate. It's an ordinary Azure RBAC role assignment made against the subscription itself, granted to a security group that lives in the partner's own tenant (traditionally the `AdminAgents` group). Azure represents that group as a foreign principal, since it doesn't belong to the customer's directory. When a partner provisions a new Azure Plan subscription for a customer, Microsoft creates that RBAC assignment automatically, and the `AdminAgents` group gets Owner on the subscription out of the gate.

That automatic step is what creates the assumption: set up the reseller relationship once, and subscription access just follows forever. It doesn't. The RBAC assignment on the subscription is independent of the tenant-level GDAP relationship, and it can end up missing without anyone having touched the delegated admin relationship at all.

## What We Expected vs. What Was Actually There

We went in expecting a straightforward fix: find the subscription, add the partner's admin group back as Owner, done. What we found instead is that "Owner on the subscription" isn't a single flat grant to hand out. The same RBAC granularity that applies to any other principal in Azure applies to the partner's admin group -- the assignment can be scoped to the whole subscription, a resource group, or a single resource, and access to the group that holds it can itself be gated by Privileged Identity Management in the partner's management tenant rather than being a standing membership. "Just re-add Owner" turned into confirming which group needed the role, at what scope, and whether it needed to be activated through PIM rather than assumed to already be active.

## The Documented Fix

Microsoft publishes the exact procedure for this in [Reinstate admin privileges for a customer's Azure CSP subscriptions](https://learn.microsoft.com/partner-center/customers/reinstate-csp). It splits into a partner-side step and a customer-side (or delegated-admin-side) step.

On the partner side, you pull the object ID of the `AdminAgents` group from your own tenant:

```powershell
Connect-AzAccount -Tenant "Partner tenant"
Get-AzADGroup -DisplayName AdminAgents
```

Then, against the customer's subscription, the role assignment gets created using that object ID:

```powershell
Connect-AzAccount -TenantID "<Customer tenant>"
Set-AzContext -SubscriptionID "<Subscription ID>"
New-AzRoleAssignment -ObjectID "<AdminAgents object ID>" -RoleDefinitionName "Owner" -Scope "/subscriptions/<Subscription ID>" -ObjectType "ForeignGroup"
```

`-ObjectType "ForeignGroup"` is the part that's easy to overlook. It's what tells Azure that the object ID belongs to a security group in a different tenant rather than the customer's own directory, and without it the assignment doesn't resolve correctly. The same command works with the scope narrowed to a resource group or a single resource instead of the whole subscription, which is how we applied it -- no broader than the situation called for.

## It Isn't Actually a CSP-Specific Trick

The part that wasn't obvious going in: none of this is specific to the CSP billing relationship. `New-AzRoleAssignment` against a foreign-group object ID is a generic Azure RBAC operation. It works on any subscription the person running the command has rights to modify, in any tenant, regardless of whether that subscription was ever sold as an Azure Plan through a CSP relationship at all.

That means the same mechanism applies to a customer on ordinary Pay-As-You-Go billing with no reseller relationship in place -- an MSP providing management services only, rather than reselling Azure, can be granted the same scoped Owner role against a foreign security group to get working access. The CSP program's automatic grant is just one path that creates this RBAC assignment; the assignment itself can be created by hand for any subscription, on any billing model, independent of any reseller relationship.

We're packaging this as a tool for the CloudWalker IT toolbox -- wrapping the object ID lookup and the scoped role assignment into something repeatable instead of re-deriving the right flags from documentation each time it comes up. [GAP: toolbox tool name and any additional detail, to be linked here once it ships.]

## The Takeaway

The full procedure, including the tenant-level GDAP steps and the resource-group- and resource-scoped variants of the role assignment, is documented in Microsoft's Partner Center reference for reinstating CSP admin privileges.
