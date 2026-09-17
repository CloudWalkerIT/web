---
title: "SQL Data Sync Enters Its Final Phase: New Subscriptions Are Locked Out"
description: "Microsoft closed SQL Data Sync to subscriptions that never used it on September 9, 2026, ahead of full retirement in September 2027. The replacement list is long, and none of it is bidirectional."
date: "2026-09-17"
author: "Cloudwalker IT"
tags: ["azure-sql", "sql-server", "replication", "migration", "retirement"]
readTime: "5 min read"
---

Microsoft began the final phase of the Azure SQL Data Sync retirement on September 9, 2026: subscriptions with no prior history of the service can no longer create sync groups at all. The service retires completely on September 30, 2027, per the [Azure SQL blog announcement](https://techcommunity.microsoft.com/blog/azuresqlblog/sql-data-sync-%E2%80%93-the-final-phase-of-retirement/4554796) and the [Microsoft Learn migration guidance](https://learn.microsoft.com/en-us/azure/azure-sql/database/sql-data-sync-retirement-migration). Existing sync groups keep running until that date.

## What Changed

The gate is at subscription scope rather than resource scope. A subscription that already uses Data Sync retains the full ability to create, modify, and manage sync groups and member databases through the retirement date. A subscription with no Data Sync history is blocked outright, and the Learn documentation now carries that restriction as a banner on every Data Sync article: you can't create new sync groups in Azure subscriptions that didn't previously use SQL Data Sync.

For anyone who never touched the service, a short recap of what is going away. Data Sync is a hub and spoke topology built on Azure SQL Database. The hub must be an Azure SQL Database (Hyperscale is supported only as a member, never as the hub); members can be Azure SQL databases or on-premises SQL Server instances reached through the Data Sync Agent. Change tracking is trigger-based: insert, update, and delete triggers write into side tables created in the user database under the `DataSync` schema. Conflicts are settled by a single per-sync-group setting, *Hub wins* or *Member wins*. Limits are 30 endpoints per sync group with at most five on-premises, 500 tables, and a primary key on every synced table whose value never changes. Neither Azure SQL Managed Instance nor Synapse is supported.

Microsoft's stated reason is evolving operational, security, and compliance requirements. The Learn docs are blunter about what that means in practice: Data Sync requires SQL authentication for every hub and member connection, Entra ID authentication is not supported, and those credentials are stored for the lifetime of the sync group. That excludes MFA, Conditional Access, and managed identities from every database in the topology.

## Why It Matters Operationally

The migration article lists Always On availability groups, Azure Data Factory, transactional replication, linked servers, read replicas, active geo-replication, database copy, Azure Functions, and Fabric mirrored databases. Check that list against what Data Sync actually did and the gap is specific: none of it is bidirectional.

Microsoft's own comparison table credits Data Sync with exactly two advantages over transactional replication, active-active support and bidirectional sync between on-premises and Azure SQL Database. Those are precisely the two properties the replacement list does not cover. Availability groups and geo-replication give a readable secondary. Transactional replication is one-directional and cannot publish from Azure SQL Database at all, which is why the platform matrix offers Azure Data Factory as the only option for Azure SQL Database to SQL Server. ADF and Functions mean building and operating conflict handling yourself.

The subscription gate also removes the usual validation path. A team standing up a fresh landing zone subscription cannot deploy Data Sync into it, even to build a like-for-like environment in which to rehearse the migration off Data Sync. That work has to happen in a subscription that already carries the service.

Deprovisioning is not a delete and forget either. Data Sync leaves system-created objects across the `DataSync`, `dss`, and `TaskHosting` schemas, plus tracking tables and triggers on every synced table. Cleanup needs ALTER on all synced tables and CONTROL on tracking tables, stored procedures, and user-defined types, on each member database and not just the hub.

[YOUR EXPERIENCE: For a bidirectional on-premises SQL Server to Azure SQL Database sync group you have had to replace, what did it move to, and where did the conflict handling that Hub wins or Member wins used to absorb end up living?]

## Tradeoffs and Caveats

Retiring this is defensible on the merits. Trigger-based change tracking imposes a real write-path cost on the source database, the service guarantees eventual consistency only, and SQL authentication with static stored passwords is hard to square with a tenant that has moved to Entra-only database access. The primary key rule is sharper still: changing a primary key value can lose data between hub and member while sync continues to report success.

The caveat is that the replacement is a list of components, not a service. Microsoft says plainly that no single alternative maps to every Data Sync configuration. For read-scale and one-way hybrid flows, the listed alternatives are strictly better than what they replace. For active-active topologies, particularly globally distributed ones using Data Sync to converge writes across regions, this is an application design change rather than a service swap, and the runway is roughly twelve months.

Sync groups created before September 9, 2026 continue to operate unchanged until the service stops on September 30, 2027.
