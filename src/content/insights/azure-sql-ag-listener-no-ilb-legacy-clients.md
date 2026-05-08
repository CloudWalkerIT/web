---
title: "No ILB, No MultiSubnetFailover: Setting Up an Azure SQL AG Listener for Legacy Clients"
description: "How we configured a SQL Server Availability Group listener in Azure without an Internal Load Balancer for a client whose legacy application couldn't use MultiSubnetFailover=True -- and the SQL port binding issue that caught us off guard."
date: "2026-05-08"
author: "Cloudwalker IT"
tags: ["sql-server", "azure", "high-availability", "windows-server", "wsfc"]
readTime: "5 min read"
---

## The Problem

We were standing up a three-node SQL Server Availability Group in Azure -- two synchronous replicas in the primary region, one asynchronous in the DR region -- with two constraints that don't usually coexist: no Internal Load Balancer for the listener, and a legacy application that couldn't use `MultiSubnetFailover=True` in its connection string.

## Why This Combination Is Tricky

SQL AGs in Azure traditionally require an Internal Load Balancer for the listener because Azure's virtual network ignores gratuitous ARPs. On-premises WSFC clusters handle virtual IP failover by broadcasting a gratuitous ARP to update the network's routing table so that traffic to the listener IP reaches whichever node is now primary. Azure's SDN doesn't honor those broadcasts, so without an ILB probing cluster health and routing traffic accordingly, the listener IP stops responding after a failover.

Windows Server 2019 introduced the Distributed Network Name (DNN) as an alternative to the traditional IP-based cluster name object. DNN registers a DNS name that resolves directly to the current primary node, eliminating the need for an ILB at the cluster name level. For the Availability Group listener, you can pair a DNN cluster name with a multi-subnet VNN -- one IP per replica subnet, all registered in DNS under the listener name.

That multi-subnet VNN approach works well when clients can use `MultiSubnetFailover=True`. With that flag, the SQL client library connects to all registered listener IPs simultaneously and lands on whichever replica just became primary without waiting for TCP timeouts. Without it, clients try IPs sequentially. If the first IP belongs to the failed replica, the client waits for the full TCP connection timeout before attempting the next -- a painful reconnect experience in a production failover.

In this engagement, neither the ILB nor relying on `MultiSubnetFailover=True` was viable. The constraint combination pointed toward a third path.

## What We Were Working Around

The Windows Failover Clustering engine exposes a parameter on the AG listener resource called `RegisterAllProvidersIP`. Its default value of `1` causes WSFC to publish all replica IPs for the listener in DNS simultaneously -- the behavior that `MultiSubnetFailover` depends on. Setting it to `0` changes WSFC to register only the current primary replica's IP. To a legacy client that tries IPs sequentially, the listener always appears to have a single address, which is exactly what we needed.

The companion parameter is `HostRecordTTL`, which controls the TTL of the listener's DNS record. After a failover, WSFC updates the DNS record to point the listener name at the new primary's IP, but any client that cached the old record keeps using it until the TTL expires. A shorter TTL means a shorter post-failover reconnect window.

## The Fix

After deploying the WSFC with a DNN cluster name and creating the multi-subnet AG listener, we applied the following to the cluster:

```powershell
Import-Module FailoverClusters
$ListenerName = <AGL-Name>
Get-ClusterResource $ListenerName | Set-ClusterParameter -Name RegisterAllProvidersIP -Value 0
Get-ClusterResource $ListenerName | Set-ClusterParameter -Name HostRecordTTL -Value 60

# Take the listener offline and back online for the changes to take effect
Stop-ClusterResource $ListenerName
Start-ClusterResource $ListenerName
```

With `RegisterAllProvidersIP` at `0` and a 60-second `HostRecordTTL`, clients reconnect to the new primary within roughly 60 seconds of a failover. That's not transparent failover -- connections drop and reconnect -- but the window was within the acceptable threshold for this engagement.

## The Part Nobody Warns You About

SQL Server binds to all IP addresses on the host by default. In practice, that means it claims port 1433 on every NIC and every virtual IP that comes online on the node -- including the AG listener's IP when it's brought online on the primary replica.

The problem surfaced when we brought the listener online and verified connectivity: the AG listener's IP was already held by SQL Server's catch-all binding. The options are to configure the listener on a non-standard port, or to constrain SQL Server's own binding. A standard port was required here, so we chose the latter.

We added a secondary IP configuration to each SQL node's network interface, then used SQL Server Configuration Manager to restrict SQL Server's TCP listener to only the primary NIC's IP address. That freed the secondary IP from SQL's catch-all binding, and the AG listener could claim that address on port 1433 without conflict.

It's one of those things that's easy to miss until the listener comes online and connections fail -- obvious in retrospect, but not something that surfaces in most AG deployment guides.

## The Takeaway

`RegisterAllProvidersIP=0` with a reduced `HostRecordTTL` is the documented path for supporting legacy clients in multi-subnet AG configurations. The SQL Server default port binding behavior is separately documented but easy to overlook when the rest of the configuration is what's demanding your attention. If you're standing up an Azure SQL AG without an ILB and need a standard port on the listener, verify SQL Server's TCP binding before you consider the listener tested.
