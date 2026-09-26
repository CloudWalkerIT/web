---
title: "Reinstating Admin-on-Behalf-Of Access on an Azure Subscription"
description: "AOBO access does not transfer with an Azure subscription. Restore the partner's foreign-group RBAC assignment, then choose the right scope and access model."
date: "2026-09-26"
author: "Cloudwalker IT"
tags: ["azure", "csp", "rbac", "partner-center", "powershell"]
readTime: "5 min read"
---

When an Azure subscription moves between partners, the incoming partner needs a separate Owner assignment for its admin group. Admin-on-behalf-of (AOBO) access requires its own check after the transfer: verify that the receiving partner can manage the resources.

## The Relationship Is Not the Role Assignment

CSP administration has two layers. Tenant-level delegated privileges cover directory administration. Subscription-level privileges come from Azure RBAC assignments on the resources being managed. A reseller relationship and granular delegated admin privileges (GDAP) leave a missing subscription role assignment to be restored separately.

For a newly provisioned Azure Plan subscription, the automatic grant gives the partner's `AdminAgents` group Owner at subscription scope. The group lives in the partner tenant. Azure represents it as a foreign principal on the customer's subscription.

A transfer follows a different path from provisioning. We check the receiving partner's group and the subscription's assignments independently of the relationship in Partner Center, where the directory relationship can look correct even while Azure access is missing.

## Restore the Documented Subscription Grant

Microsoft's [procedure for reinstating CSP admin privileges](https://learn.microsoft.com/en-us/partner-center/customers/reinstate-csp) separates partner actions from customer actions. The reseller relationship and GDAP are prerequisites for creating the assignment. Establish either missing relationship before proceeding with the role-assignment command.

The partner retrieves the object ID of its own `AdminAgents` group:

```powershell
Connect-AzAccount -Tenant "<Partner tenant ID>"
Get-AzADGroup -DisplayName AdminAgents
```

Use that group's object ID. Keep it distinct from the partner tenant ID and any group ID from the customer's directory. The customer-side operator needs Owner or User Access Administrator and permission to create role assignments at subscription scope. A partner repairing missing access must establish who already has permission to perform the grant.

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

This subscription-scope grant matches the automatic Azure Plan assignment and gives the group Owner permissions, beyond portal visibility. Before running it, confirm the customer tenant and subscription, then check that the object ID belongs to the intended partner group.

## ForeignGroup Is the Important Detail

Without `-ObjectType "ForeignGroup"`, the cmdlet tries to resolve the object ID in the customer's directory. The partner's group lives in a different tenant, so even a correct object ID leads to a lookup in the wrong directory. The explicit object type identifies the assignment's principal type.

The Azure CLI equivalent is:

```bash
az role assignment create --assignee-object-id "<AdminAgents group object ID>" --assignee-principal-type ForeignGroup --role Owner --scope "/subscriptions/<Subscription ID>"
```

Run it in the customer's tenant and subscription context, just as with PowerShell. Both clients require the same principal type and role-assignment permissions.

For an indirect reseller, Microsoft's route starts with establishing the customer relationship and requesting GDAP. The reseller then obtains the object ID of its own AdminAgent group. An indirect provider with OBO rights and RBAC Owner can grant AOBO to that group. Alternatively, an end customer with subscription ownership can perform the grant.

## Narrow the Access Before Making It Routine

Subscription Owner is the documented restoration target. For management tasks that need a smaller boundary, Microsoft also documents resource-group and individual-resource scope. Keep `-ObjectType "ForeignGroup"` and replace the subscription scope with the appropriate value:

```powershell
# Resource-group scope
-Scope "/subscriptions/<Subscription ID>/resourceGroups/<Resource group name>"

# Individual-resource scope
-Scope "<Resource URI>"
```

Use these fragments as replacements for the `-Scope` argument in the full command. Choose the boundary that covers the work: a resource-group assignment limits Owner access to that resource group.

We also recommend PIM eligibility on the GDAP security groups in the partner tenant instead of standing `AdminAgents` membership. Decide who can activate access separately from where the group has Azure permissions. PIM eligibility still requires the subscription assignment, and narrowing the scope leaves standing membership in place. Review both before making this a repeatable operating pattern.

## Where Lighthouse Fits

The foreign-group procedure applies independently of whether the subscription is under an Azure plan. It can cover a Pay-As-You-Go subscription where a partner provides management services only. The reseller relationship and GDAP remain prerequisites, limiting this procedure to established partner relationships.

For repeatable managed services on subscriptions sold elsewhere, we'd start with [Azure Lighthouse](https://learn.microsoft.com/en-us/azure/lighthouse/overview), Microsoft's purpose-built cross-tenant management service. It supports CSP and Pay-As-You-Go subscriptions, with delegation at subscription or resource-group scope. Template-based onboarding provides a consistent setup. Customers control delegated permissions and scopes; they can audit provider activity and remove access.

A narrowly scoped foreign-group assignment remains pragmatic for a specific access repair within an existing CSP AOBO relationship. For ongoing management across customers, we'd choose Lighthouse as the architectural starting point for consistent onboarding and customer-visible delegation.

## The Takeaway

After a subscription transfer, verify that the foreign-principal Owner assignment names the incoming partner's group and covers the intended scope. Where narrower access was deliberately chosen, check that boundary explicitly. Verify AOBO through the actual RBAC assignment, independently of the partner relationship.