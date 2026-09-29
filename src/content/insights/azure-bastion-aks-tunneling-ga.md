---
title: "Azure Bastion's AKS Tunneling Goes GA: The Jump Box Becomes Optional"
description: "Azure Bastion can now tunnel directly to a private AKS cluster's API server, no jump box required. Here's what the GA release changes and where it still falls short."
date: "2026-08-27"
author: "Cloudwalker IT"
tags: ["aks", "kubernetes", "azure-bastion", "networking", "security"]
readTime: "4 min read"
---

Azure announced general availability of [Azure Bastion integration with AKS](https://azure.microsoft.com/updates?id=570030) on August 26, 2026. The feature lets an operator open an encrypted tunnel from a local machine, through Bastion, straight to a private AKS cluster's API server, and run `kubectl` or `helm` against it as if the endpoint were reachable directly. It had been in public preview since August 2025.

## What the GA release covers

The mechanism is Bastion's existing native client tunneling, now formally supported and documented for AKS. The dedicated CLI surface is `az aks bastion tunnel --name CLUSTER --resource-group RESOURCE_GROUP`, which opens a subshell with `kubeconfig` pointed at a local port. Older documentation shows an equivalent longer form, `az aks bastion --name CLUSTER --resource-group RESOURCE_GROUP --admin --bastion BASTION_RESOURCE_ID`, paired with a manual `sed` rewrite of the kubeconfig server field to `localhost:PORT`. Either way, the tunnel rides an outbound TLS connection on port 443 from Bastion to the API server's private endpoint; the client never touches an intermediate VM.

Requirements: Bastion deployed at Standard or Premium SKU with Native Client Support enabled in its configuration, and Reader role on the AKS cluster, the Bastion resource, and the virtual network. No changes to the AKS cluster's own network configuration are needed if it's already a private cluster.

Two exclusions matter. The feature is not supported for AKS Automatic clusters, and it is not supported for clusters with network resource group (NRG) lockdown enabled. Both are increasingly common configurations for teams standardizing on Microsoft's more opinionated, locked-down AKS defaults, which puts a meaningful slice of newer deployments outside this feature's reach for now.

## What it replaces

Before this, reaching a private AKS API server meant one of: a jump-box VM behind Bastion (RDP/SSH in, run `kubectl` from there), VNet peering, a private endpoint, ExpressRoute/VPN, or `az aks command invoke`, which executes commands server-side without a real interactive session. The jump-box pattern is the one most teams actually ran, and it comes with real maintenance cost: a VM to patch and monitor, credentials or agents to manage on it, and an experience where operators can't use their own local tooling, IDE Kubernetes extensions, or shell aliases.

Native tunneling removes the VM from that path entirely while keeping the API server off the public internet, which is the property most compliance frameworks (CIS Kubernetes Benchmark, PCI-scoped clusters) actually check for. Standard SKU Bastion supports concurrent sessions, so multiple operators can tunnel in independently without contending for a shared jump box. For platform teams managing several private clusters, this collapses per-cluster jump-box sprawl into a single Bastion deployment per VNet.

## Where a jump box still makes sense

This is a genuine operational improvement, but it doesn't replace jump boxes outright. Microsoft's own AKS baseline architecture guidance still recommends a jump box when operators use untrusted devices, connect over unstable networks, or need diagnostic tooling like packet capture that doesn't cooperate well with tunneled connections. Teams with those constraints should keep a jump box available rather than migrating wholesale.

There's also a documentation gap worth flagging: as of this writing, Azure Bastion's own "what's new" reference page still lists AKS connectivity as public preview, dated August 2025, with no update reflecting the August 26 GA announcement. The Azure Updates feed and the product documentation are out of sync. Anyone scripting against this in automation should verify current behavior with `az aks bastion tunnel --help` rather than trusting either source in isolation.

Bastion pricing is hourly per SKU plus outbound data transfer, so a Basic-SKU deployment needs an upgrade to Standard or Premium to use this at all, which is a real cost delta for teams that hadn't budgeted for it.

The GA release requires no changes to an existing private AKS cluster's configuration; the only new setup is on the Bastion side.
