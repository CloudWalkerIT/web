---
title: "Moving Atomatize to Container Apps and Portable Postgres"
description: "Moving an application to Azure Container Apps and plain PostgreSQL connections gives us more control over deployment and future database placement. Low hosting spend still comes with cold starts and operational work."
date: "2026-10-01"
author: "Cloudwalker IT"
tags: ["azure", "container-apps", "postgresql", "finops", "cicd"]
readTime: "5 min read"
---

We moved Atomatize's application from Vercel to Azure Container Apps and replaced its Supabase REST API and SDK database access with ordinary PostgreSQL connections over SSL. The database still runs on Supabase. At current traffic, application hosting costs almost nothing within Azure's free allowances, with customer-visible cold starts as part of the tradeoff.

## The database interface was shaping our choices

Atomatize's previous setup combined Vercel application hosting with Supabase's database API and SDK. As we took a more hands-on operational role, we wanted deployment to fit the Azure and CI/CD work we already knew well. We also wanted more freedom over where the database could run later.

Keeping database access tied to a provider's API made that second decision harder. We wanted the option to evaluate another managed PostgreSQL service on Azure, AWS or elsewhere when the current plan stopped fitting, instead of treating a Supabase plan upgrade as the default next step.

There wasn't a database provider move in this work. We changed the application hosting and database access interface while retaining Supabase as the managed database provider.

## Low traffic makes the hosting tradeoff workable

Container Apps fits our operational experience, and its consumption pricing fits the application's present traffic. Microsoft's [billing documentation](https://learn.microsoft.com/en-us/azure/container-apps/billing) lists monthly free grants per subscription of 180,000 vCPU-seconds, 360,000 GiB-seconds and two million HTTP requests. Request count alone doesn't establish whether an application stays inside those grants: CPU and memory consumption matter too.

A Container App with zero replicas incurs no resource consumption charge. Running replicas still consume resources, and keeping a minimum replica count above zero can introduce idle charges. The [scaling documentation](https://learn.microsoft.com/en-us/azure/container-apps/scale-app) describes revision-level scaling and the HTTP scaler, but doesn't promise a particular cold-start duration.

We accept cold starts for Atomatize today. The delay has a real customer-experience cost, even when the hosting bill is small. That decision needs revisiting as usage and customer expectations change.

> TODO: What delay have we observed on the first request after inactivity, and where does the customer encounter it? Include a measured range only if we have one.

Our near-zero observation covers application hosting at current traffic. It doesn't establish total operating cost: other services, network charges and our time remain outside that statement. Nor does it establish a measured saving against the previous setup.

## We moved deployment into familiar tooling

We reworked and containerized the application, then wrote GitHub Actions workflows to build it and deploy it to Azure Container Apps. That gives us a deployment path we can operate using our existing Azure and DevOps experience. Both application hosting and the database remain managed services; this change didn't introduce virtual machines or a self-hosted PostgreSQL server.

Microsoft's [Container Apps deployment guidance](https://learn.microsoft.com/en-us/azure/container-apps/github-actions) supports building from a Dockerfile or deploying an existing image, with application updates creating revisions. It recommends unique image tags, such as a commit SHA, instead of repeatedly deploying `latest`. That's a useful practice for making a deployed revision traceable to its source; we aren't presenting our workflow here as a reference implementation.

The database change removed the application's reliance on the Supabase REST API and SDK for state access. PostgreSQL connections now provide that interface. We haven't moved the database elsewhere or demonstrated a migration to a second provider, so the portability benefit remains an option we can exercise and test.

## Connection details still constrain the design

Plain PostgreSQL access needs endpoint and TLS choices that match the runtime. Supabase's [connection guide](https://supabase.com/docs/guides/database/connecting-to-postgres) documents an IPv6 direct endpoint unless the paid IPv4 add-on is used. An IPv4-only backend can use the session pooler on port `5432`. The transaction pooler on `6543` doesn't support prepared statements, which matters when choosing a driver configuration.

Take the endpoint from the dashboard's Connect panel. Don't construct a hostname from an assumed naming pattern. Before choosing a connection path, check network reachability and how the application's connection pool will behave as replicas scale.

For a libpq-compatible client, the following illustrates connection parameters for certificate and hostname verification. This illustrative example needs adapting to the application's database client. Replace the placeholders with the selected endpoint, database and trusted root certificate; credentials are deliberately omitted.

```text
host=<hostname-from-connect-panel>
port=<port-from-connect-panel>
dbname=<database-name>
sslmode=verify-full
sslrootcert=/path/to/trusted-root.crt
```

Supabase documents `verify-full` with a trusted root certificate for encrypted connections that verify server identity. `sslmode=require` encrypts the connection without providing the same verification. Other drivers need their equivalent TLS settings checked explicitly. Our confirmed implementation uses SSL; that fact alone doesn't establish which verification settings are deployed.

Database connections belong in the backend. Removing the SDK doesn't transfer its authentication or authorization behavior into SQL connections automatically. For this pattern, we'd review the database role's privileges and trace how each request remains limited to the data its caller can access. Treat that as an implementation review requirement, not a completed security audit implied by changing the connection string.

## A portable interface still needs a recovery plan

Supabase's [free plan](https://supabase.com/pricing) currently includes a 500 MB database, pauses projects after a week of inactivity and excludes automatic backups. Our database remains on that nominal free tier. Those constraints belong in the operating decision alongside the application hosting bill.

Before relying on a future provider move, we'd rehearse restoring the database to the proposed target and run the application against it. We'd check extension compatibility, roles and authorization behavior, then work through the cutover and rollback procedure. Backups need a separate decision now; a familiar SQL interface doesn't supply them.

For now, we'd use customer-visible cold-start behavior to decide when paying to keep capacity available becomes worthwhile.