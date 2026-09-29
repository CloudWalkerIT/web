---
title: "Taking an LLM Feature to Production on Azure"
description: "The demo took a week. Production takes network isolation, quota planning, token accounting, an evaluation set and a plan for model retirements. A checklist for Azure OpenAI workloads."
date: "2026-02-15"
author: "Cloudwalker IT"
tags: ["AI", "enterprise", "automation", "LLM"]
readTime: "7 min read"
---

Most LLM pilots we get asked to look at share a shape. Someone built a working feature in a week: an Azure OpenAI resource, an API key in an app setting, a system prompt, and a demo that impressed the right people. Then it has to go to production, and the questions start. Who can reach the endpoint? What happens when it returns 429? Why is there a new line on the bill that nobody can attribute? What changes when the model version we tested against is retired?

None of this is exotic. It's the same platform work as any other dependency, applied to one that behaves a little differently. Below is the list we work through before an LLM feature goes live on Azure.

## Take the endpoint off the internet

A new Azure OpenAI resource accepts traffic from anywhere with a valid key. For production, that should change on two fronts.

**Network.** Put the resource behind a [private endpoint](https://learn.microsoft.com/en-us/azure/ai-services/cognitive-services-virtual-networks) and set public network access to disabled. The application resolves the endpoint through the `privatelink.openai.azure.com` private DNS zone, so the zone has to be linked to the VNet the app runs in, or reachable through whatever DNS forwarding you already use for other private endpoints. If the feature runs in App Service or Container Apps, that means VNet integration on the app side as well.

**Authentication.** Replace the key with a managed identity. Give the app's identity the `Cognitive Services OpenAI User` role on the resource, then set `disableLocalAuth` to `true` so keys stop working. Keys tend to get copied into local `.env` files, CI variables and notebooks, and they never expire on their own. A managed identity gives you nothing to leak.

```bash
id=$(az cognitiveservices account show -n my-openai -g rg-ai-prod --query id -o tsv)

# Step 1: keys stop working; only Entra ID tokens are accepted
az resource update --ids "$id" --set properties.disableLocalAuth=true

# Step 2, once the private endpoint and DNS are confirmed working
az resource update --ids "$id" --set properties.publicNetworkAccess=Disabled
```

Do the identity change first and let it run for a while before the network change. If both happen at once and something breaks, you won't know which one did it.

## Plan quota like capacity, because it is

Azure OpenAI [quota](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/quota) is assigned in tokens per minute, per model, per region, per subscription. You split it between deployments, and the requests-per-minute limit follows from the TPM you assign. When a deployment runs out, callers get HTTP 429 with a `retry-after` header.

Three decisions matter here:

- **Deployment type.** Standard deployments run in the resource's region. Global Standard routes traffic across Microsoft's global capacity and usually has more quota headroom. Data Zone deployments keep processing inside the US or EU data zone. Provisioned throughput buys reserved capacity for predictable, high-volume loads. The [deployment types page](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/deployment-types) spells out where data is processed for each, and that answer belongs in your data protection review, not just your architecture diagram.
- **Retry behaviour.** The SDKs retry on 429 by default. Check that yours honours `retry-after`, caps total wait time, and fails in a way the user can understand. A request that silently retries for 40 seconds looks like an outage.
- **More than one backend.** If the feature matters, put [API Management in front as an AI gateway](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities) with a backend pool across two regions or deployments and a circuit breaker. APIM can then enforce per-consumer token limits with the `azure-openai-token-limit` policy, so one noisy internal team can't starve everyone else's quota.

## Make token cost visible before it shows up on the invoice

Azure OpenAI bills input and output tokens separately, at different rates per model. On the invoice, it shows up as usage on a Cognitive Services resource, which tells finance nothing about which feature or customer drove it.

Every chat completion response includes a `usage` object with prompt and completion token counts. Log it with the request, along with the feature name and, where it applies, a tenant or customer ID. If you're already behind APIM, the `azure-openai-emit-token-metric` policy sends the same counts to Application Insights with whatever dimensions you choose.

Once you can see it, the usual findings are:

- System prompts that grew over months of tweaking and now go with every call.
- Retrieval that stuffs ten documents into the context when the answer is always in the first two.
- Conversation history that is sent in full on every turn instead of being trimmed or summarised.

Each of these is a code change, not a pricing negotiation.

## Build the evaluation set before launch

With a normal dependency you write tests against its contract. An LLM's contract is fuzzy, so the equivalent is an evaluation set: a few dozen to a few hundred real inputs, each with the properties a good answer must have. Maybe it has to cite a source, stay under a length, avoid a topic, or produce valid JSON against a schema.

Run it whenever the prompt, the retrieval logic or the model changes. It doesn't need to be sophisticated. A script that runs the set, checks what can be checked mechanically and saves the rest for a person to skim will catch most regressions. The important part is that it exists before the first production change, because that's when people start "just tweaking the prompt".

## Pin model versions and track retirements

Azure OpenAI models have [published retirement dates](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/model-retirements). Each deployment has a version upgrade policy: upgrade when a new default version is available, upgrade when the current version expires, or no automatic upgrade.

For production, pin the version you evaluated and set the policy so an upgrade doesn't happen without you. Then put the retirement date in the same place you track certificate expiries and support end dates. When a new version comes out, run the evaluation set against it on a separate deployment before switching traffic. A newer model is usually better on average and occasionally worse at exactly the thing your feature depends on.

## Handle content filtering as a normal outcome

Azure OpenAI applies [content filters](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/content-filter) to prompts and completions by default. A filtered prompt comes back as HTTP 400 with a `content_filter` error code. A filtered completion comes back with `finish_reason` set to `content_filter`.

Legitimate inputs in security, medical and legal work trip these more often than you'd expect. The application needs a real response for both cases, not an unhandled exception. If false positives are frequent for your domain, you can configure filter severity on a custom content filter, and log each filtered request so you know how often it happens.

## Know what happens to the data

Put the answers in writing before the security review asks. Microsoft's [data, privacy and security page for Azure OpenAI](https://learn.microsoft.com/en-us/legal/cognitive-services/openai/data-privacy) covers whether prompts are used for training, where data is processed for each deployment type, and how abuse monitoring stores data. If your data can't leave a geography, the deployment type decision above is where that gets enforced.

Also decide what your own application logs. Logging full prompts and completions is very useful for debugging and evaluation. It also means you now store every piece of customer data that passed through the feature, in your log workspace, with its retention settings.

## Where it usually goes wrong

In most pilots, the model is the part that works. The problems are the same ones that follow any service that got to production faster than its platform did:

- a key in an app setting that three other apps also use;
- a public endpoint nobody remembered to close;
- a single deployment in a single region with no plan for 429s;
- no one who can say what the feature costs per user.

Treat the LLM like any other external dependency with rate limits, versioning and a data processing agreement, and most of the list above turns into ordinary platform work.
