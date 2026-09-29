---
title: "Where Azure Bills Actually Leak"
description: "Before right-sizing and commitments, look for the spend nobody is using: unattached disks and IPs, log ingestion, licences you already own, and AKS clusters sized off requests. Queries included."
date: "2026-03-01"
author: "Cloudwalker IT"
tags: ["cloud", "finops", "cost optimization"]
readTime: "7 min read"
---

Most Azure cost advice starts with right-sizing VMs and buying reservations. Both are worth doing, but they're the second pass. The first pass is finding money spent on things nobody uses, or paying twice for things you already own. That part needs no performance testing and no three-year commitment, and it's usually where the quickest savings are.

These are the places we look first, roughly in the order we look.

## Resources that outlived what they were attached to

Deleting a VM doesn't delete its disks unless someone ticked the box. Snapshots taken before a change stay forever. Public IPs outlive the load balancer they were created for. All of them keep billing.

Azure Resource Graph finds them across every subscription you can read in one query:

```bash
# Managed disks not attached to anything
az graph query -q "
Resources
| where type =~ 'microsoft.compute/disks'
| where properties.diskState =~ 'Unattached'
| project name, resourceGroup, subscriptionId, sku = sku.name,
          sizeGB = properties.diskSizeGB, created = properties.timeCreated
| order by sizeGB desc" --first 1000

# Public IPs with no NIC, load balancer or NAT gateway
az graph query -q "
Resources
| where type =~ 'microsoft.network/publicipaddresses'
| where isnull(properties.ipConfiguration) and isnull(properties.natGateway)
| project name, resourceGroup, subscriptionId, sku = sku.name" --first 1000

# Snapshots older than 90 days
az graph query -q "
Resources
| where type =~ 'microsoft.compute/snapshots'
| where todatetime(properties.timeCreated) < ago(90d)
| project name, resourceGroup, subscriptionId, sizeGB = properties.diskSizeGB" --first 1000
```

Don't delete straight from the output. Unattached disks are sometimes kept on purpose, such as a data disk detached during a migration. Tag what you find with an owner and a review date, ask around, then delete what nobody claims. Premium SSD disks sized for a database that no longer exists are the usual big finds.

Standard SKU public IPs are billed whether they're associated or not, so an unused one is pure waste. The [IP address pricing page](https://azure.microsoft.com/pricing/details/ip-addresses/) has current rates.

## Log Analytics ingestion

Log Analytics bills mainly on data ingested. It's also the cost that grows without anyone deciding it should: a diagnostic setting turned on during an incident and never turned off, an AKS cluster sending every container's stdout, a chatty application logging at debug level.

This query shows which tables take the most ingestion over the last 30 days. `Quantity` in the `Usage` table is in megabytes.

```kusto
Usage
| where TimeGenerated > ago(30d)
| where IsBillable == true
| summarize IngestedGB = sum(Quantity) / 1000 by DataType
| order by IngestedGB desc
```

What to do depends on what's at the top:

- **`ContainerLogV2` or `ContainerLog`:** reduce what Container Insights collects with its data collection rule. Exclude noisy namespaces such as `kube-system`, and stop collecting stdout for workloads that ship logs somewhere else.
- **`AzureDiagnostics` or resource-specific tables:** look at the diagnostic settings. "All logs" categories on Key Vault, Storage or Front Door are rarely all needed.
- **High-volume tables used only for occasional troubleshooting:** move them to a cheaper [table plan](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/data-platform-logs#table-plans), which trades query features for lower ingestion cost.

Once ingestion is steady and predictable, check whether a commitment tier is cheaper than pay-as-you-go for your volume.

## Licences you already paid for

If you have Windows Server or SQL Server licences with Software Assurance, [Azure Hybrid Benefit](https://learn.microsoft.com/en-us/azure/virtual-machines/windows/hybrid-use-benefit-licensing) lets you use them in Azure instead of paying for the licence again in the VM price. It's a setting on each VM or SQL resource, and it's easy to miss when VMs are created by hand, by old templates or by a migration tool. Check the `licenseType` property across the estate:

```bash
az graph query -q "
Resources
| where type =~ 'microsoft.compute/virtualmachines'
| where properties.storageProfile.osDisk.osType =~ 'Windows'
| project name, resourceGroup, licenseType = tostring(properties.licenseType)
| where licenseType == ''" --first 1000
```

Every row is a Windows VM paying for a licence. Whether you can switch it depends on what your licensing agreement covers, so check with whoever owns licensing before changing anything.

Non-production subscriptions are the related case. Dev/Test subscription offers remove Windows licence charges and discount some services. A test environment in a normal production subscription pays full price.

## Environments that run all night

Development and test VMs that only get used during working hours are running roughly three quarters of the week for nothing. VM auto-shutdown is a single setting. For anything more involved, like shutting down a whole environment including App Service plans and scaling AKS node pools to zero, use a scheduled pipeline or an Automation runbook.

The hard part is agreement, not the mechanism. Pick the schedule with the teams who use the environments, and give them a way to start things outside hours without filing a ticket.

## AKS clusters sized off requests

The cluster autoscaler adds nodes when pods can't be scheduled, and scheduling is based on resource **requests**, not actual usage. A deployment that requests two CPUs and uses a tenth of one still takes up two CPUs of node capacity. Multiply that across a few hundred pods and you get a cluster that looks full to the scheduler while the nodes sit mostly idle.

Compare requests with actual usage per namespace:

```bash
kubectl top pods -A --sum
kubectl get pods -A -o custom-columns='NS:.metadata.namespace,POD:.metadata.name,CPU_REQ:.spec.containers[*].resources.requests.cpu,MEM_REQ:.spec.containers[*].resources.requests.memory'
```

The AKS [cost analysis add-on](https://learn.microsoft.com/en-us/azure/aks/cost-analysis) breaks cluster cost down by namespace in Cost Management, which makes the conversation with application teams much easier. Two other common findings:

- a system node pool much larger than the system pods need;
- batch or dev workloads on regular nodes that could run on a Spot node pool.

## Only then: reservations and savings plans

Once the waste is gone, what's left is your real baseline, and that's what you commit to. Committing first means paying up front for resources you were about to delete.

Microsoft's [guidance on choosing between them](https://learn.microsoft.com/en-us/azure/cost-management-billing/savings-plan/decide-between-savings-plan-reservation) comes down to this. Reservations give a bigger discount for a specific resource type in a specific region. Savings plans give a smaller discount on an hourly spend commitment that applies across compute services and regions.

Our rule of thumb: reserve the floor you've seen for several months on stable workloads, and use a savings plan for compute that's still moving, such as during a migration or a VM-to-containers shift.

## Make it stick

The cleanup is a one-off unless someone sees the numbers every month.

- **Tags that match how you're organised.** Owner, environment and cost centre at minimum. [Tag inheritance](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/enable-tag-inheritance) in Cost Management applies subscription and resource group tags to usage records, so you don't have to tag every resource individually to get useful reports.
- **Budgets per team or subscription**, with alerts to people who can act on them, not a shared mailbox.
- **Anomaly alerts** in Cost Management, so a runaway log source shows up in days rather than on next month's invoice.

None of this needs a FinOps team to start. It needs an owner and a monthly half-hour with the cost analysis view open.
