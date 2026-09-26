---
title: "Reinstating Admin-on-Behalf-Of Access on an Azure Subscription"
description: "AOBO access does not transfer with an Azure subscription. Restore the partner's foreign-group RBAC assignment, then choose the right scope and access model."
date: "2026-09-26"
author: "Cloudwalker IT"
tags: ["azure", "csp", "rbac", "partner-center", "powershell"]
readTime: "5 min read"
---

Admin-on-behalf-of (AOBO) access does not transfer with a subscription. When a subscription moves between partners, the new partner's admin group does not automatically receive its Owner assignment on that subscription. The transfer and the access grant are separate operations, so a completed transfer is not evidence that the incoming partner can manage the resources.

## The Relationship Is Not the Role Assignment

CSP administration has two layers. Tenant-level delegated privileges cover directory administration. Subscription-level privileges come from Azure RBAC assignments on the resources being managed. Establishing a reseller relationship and granular delegated admin privileges (GDAP) does not, by itself, recreate a missing subscription role assignment.

For a newly provisioned Azure Plan subscription, the automatic grant gives the partner's `AdminAgents` group Owner at subscription scope. The group lives in the partner tenant, not the customer's directory. Azure represents it as a foreign principal on the customer's subscription.

A transfer is not that provisioning event. We need to check the receiving partner's group and the subscription's assignments independently of the relationship in Partner Center. Otherwise, the directory relationship can look correct while the Azure access needed to operate the subscription is absent.

## Restore the Documented Subscription Grant

Microsoft's [procedure for reinstating CSP admin privileges](https://learn.microsoft.com/en-us/partner-center/customers/reinstate-csp) separates partner actions from customer actions. Before creating the assignment, the reseller relationship and GDAP must already exist. If either is missing, establish it first; the role-assignment command is not a replacement for those prerequisites.

The partner retrieves the object ID of its own `AdminAgents` group:

```powershell
Connect-AzAccount -Tenant "<Partner tenant ID>"
Get-AzADGroup -DisplayName AdminAgents
```

Use that group's object ID, not the partner tenant ID or a group from the customer's directory. The customer-side operator needs Owner or User Access Administrator and permission to create role assignments at subscription scope. A partner whose access is missing cannot assume it has permission to repair its own assignment.

Microsoft's customer-side procedure starts by updating `Az.Resources`. The customer then connects to the correct tenant and selects the subscription explicitly:

```powershell
Update-Module Az.Resources
Connect-AzAccount -TenantID "<Customer tenant ID>"
Set-AzContext -SubscriptionID "<Subscription ID>"
New-AzRoleAssignment `
    -ObjectID "<AdminAgents group object ID>" `
    -RoleDefinitionName "Owner" `
    -Scope "/subscriptions/<Subscription ID>" `
    -ObjectType "ForeignGroup"
```

This is the subscription-scope grant that matches the automatic Azure Plan assignment. Confirm the tenant, subscription and partner group before running it: the command is granting Owner, not merely making the subscription visible in a portal.

## ForeignGroup Is the Important Detail

Without `-ObjectType "ForeignGroup"`, the cmdlet tries to resolve the object ID in the customer's directory, where the partner's group does not exist. The object ID can be correct and still be looked up in the wrong directory. The explicit object type tells Azure what kind of principal the assignment targets.

The Azure CLI equivalent is:

```bash
az role assignment create --assignee-object-id "<AdminAgents group object ID>" --assignee-principal-type ForeignGroup --role Owner --scope "/subscriptions/<Subscription ID>"
```

Run that equivalent in the customer's tenant and subscription context, just as with PowerShell. Changing the client does not change the principal type or the permissions required to create the assignment.

For an indirect reseller, Microsoft's route is to establish the customer relationship, request GDAP and obtain the object ID of the reseller's own AdminAgent group. An indirect provider with OBO rights and RBAC Owner can grant AOBO to that reseller group; otherwise, an end customer with subscription ownership can perform the grant.

## Narrow the Access Before Making It Routine

Subscription Owner is the documented restoration target, not the right default for every management task. Microsoft also documents resource-group and individual-resource scope. Keep `-ObjectType "ForeignGroup"` and replace the subscription scope with the appropriate value:

```powershell
# Resource-group scope
-Scope "/subscriptions/<Subscription ID>/resourceGroups/<Resource group name>"

# Individual-resource scope
-Scope "<Resource URI>"
```

These are replacements for the `-Scope` argument, not standalone commands. Choose the boundary that covers the work; a resource-group assignment deliberately does not restore subscription-wide Owner access.

We also recommend PIM eligibility on the GDAP security groups in the partner tenant instead of standing `AdminAgents` membership. Treat who can activate access and where the group has Azure permissions as separate design decisions. PIM eligibility does not create the subscription assignment, and a narrower scope does not remove standing membership. Both need attention before this becomes a repeatable operating pattern.

## Where Lighthouse Fits

The foreign-group procedure is agnostic about whether the subscription is under an Azure plan. It can apply to a Pay-As-You-Go subscription where a partner provides management services only, but the reseller relationship and GDAP must already exist. It is not a recipe for granting an arbitrary group access across unrelated tenants.

For repeatable managed services on subscriptions the partner did not sell, we would start with [Azure Lighthouse](https://learn.microsoft.com/en-us/azure/lighthouse/overview), Microsoft's purpose-built cross-tenant management service. It supports CSP and Pay-As-You-Go subscriptions, subscription and resource-group delegation, and template-based onboarding. Customers control delegated permissions and scopes, can audit provider activity, and can remove access.

A narrowly scoped foreign-group assignment remains pragmatic when an existing CSP AOBO relationship needs a specific access repair. Lighthouse is the better architectural starting point when the requirement is ongoing management across customers, consistent onboarding and customer-visible delegation. Restoring one assignment and designing a managed-services platform are different jobs.

## The Takeaway

After any subscription transfer, verify the foreign-principal Owner assignment yourself: check that it names the incoming partner's group and covers the intended scope. If narrower access was deliberately chosen, verify that boundary explicitly rather than treating it as subscription-wide restoration. AOBO is an RBAC assignment, not a property of the partner relationship.