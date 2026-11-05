---
title: "AKS ingress-nginx support ends this month: plan the cutover"
description: "Microsoft's critical security patch support for AKS application routing ingress-nginx ends in November 2026. Plan a parallel migration with TLS validation and a usable rollback path."
date: "2026-11-05"
author: "Cloudwalker IT"
tags: ["azure", "aks", "kubernetes", "networking", "security"]
readTime: "5 min read"
---

Microsoft's [November 2 AKS announcement](https://blog.aks.azure.com/2026/11/02/automatic-enhancements) reiterates that critical security patch support for the application routing add-on's ingress-nginx resources ends in November 2026. Upstream maintenance ended in March. If those controllers still carry production traffic, this month's work needs to include a tested replacement and a cutover window.

## The new default doesn't migrate existing clusters

New AKS Automatic clusters on Kubernetes 1.36 and later default to Gateway API, according to the announcement. Existing clusters aren't migrated automatically. Neither the announcement nor the [migration guide](https://learn.microsoft.com/en-us/azure/aks/app-routing-nginx-to-gateway-api-migration) gives an exact November cutoff day, so we'd schedule against the stated month rather than assume a final-day deadline.

Microsoft's application routing Gateway API implementation uses a lightweight Istio control plane and the `approuting-istio` GatewayClass. It reconciles Gateway API resources; it doesn't provide Istio CRD support or workload sidecar injection. For application routing users whose requirements fit, Microsoft documents a migration with both ingress data planes running on the same cluster.

The operational consequence is a second load balancer frontend IP. There's no in-place switch that transfers the existing ingress-nginx address to the Gateway. Applications can keep their backend Services while you build and validate the new ingress path.

## Inventory the addresses outside Kubernetes

Start with every controller. The add-on supports multiple `NginxIngressController` resources, each with its own ingress class and load balancer IP. Microsoft's inventory commands are:

```bash
kubectl get nginxingresscontrollers -o custom-columns=NAME:.metadata.name,CLASS:.spec.ingressClassName
kubectl get ingress -A
```

Match each Ingress class to a controller, then record its hostnames, routes and address. The default class is `webapprouting.kubernetes.azure.com`; looking only for `nginx` misses it.

Extend that inventory beyond DNS. An Azure Front Door origin, Traffic Manager endpoint or customer firewall allow list might reference the old IP directly. Each reference needs an owner and a change plan. A DNS update won't move traffic from a system that still targets the old address.

Don't plan to preserve an AKS-managed public IP by marking it `Static`. The migration guide explicitly warns that AKS deletes these managed public IPs when their owning Service is removed. Reassigning that address is therefore an unsafe migration strategy. Keep the old Service and controller intact while the replacement is being proven.

For DNS-based entry points, lower the TTL ahead of the cutover and wait out the previous TTL. Microsoft's guide suggests 60 seconds or the provider's minimum. A record previously cached for an hour doesn't acquire the shorter lifetime just because you changed it at the authority.

## Prove the second path before moving traffic

Check prerequisites before enabling the replacement. The guide requires Azure CLI 2.86.0 or later and both Managed Gateway API and the application routing Gateway API implementation. It also warns that existing Istio service mesh CRDs prevent the application routing control plane from starting. A cluster already using the mesh needs an architecture decision before any removal of those resources.

Translate each Ingress into the appropriate Gateway and HTTPRoute configuration. Review path matching, redirects, rewrites and header handling individually. Microsoft's guide links `ingress2gateway` as a starting point, but its default class selection is `nginx`. Application routing users must explicitly select their ingress class and repeat conversion per class.

Provision HTTPS before changing DNS. The old Ingress's certificate wiring doesn't establish that the new listener has a usable certificate. Follow Microsoft's [Gateway API DNS and TLS configuration](https://learn.microsoft.com/en-us/azure/aks/app-routing-gateway-api-dns-tls) for the replacement, then verify the certificate clients actually receive.

The migration guide uses `curl --resolve` to test each IP independently. This HTTPS version follows its instruction to switch the probe to port 443 and the HTTPS scheme. Replace the documentation hostname and path with a real route; set the address variables to the new Gateway and existing controller IPs:

```bash
curl -sS -o /dev/null -w '%{http_code}\n' \
  --resolve "httpbin.contoso.com:443:${GW_IP}" \
  https://httpbin.contoso.com/get

curl -sS -o /dev/null -w '%{http_code}\n' \
  --resolve "httpbin.contoso.com:443:${INGRESS_NGINX_IP}" \
  https://httpbin.contoso.com/get
```

This preserves the hostname for TLS and HTTP while selecting the destination IP. Don't add `--insecure`: validate trust, the certificate chain and expected SANs. A successful response from one URL is only the beginning.

Exercise every hostname and routing rule, including authentication and POST bodies. Test streaming, WebSockets or gRPC where the workload uses them. Run sustained probes while watching latency, intermittent errors and Gateway/HTTPRoute status conditions. Test upstream health probes through a staging origin or endpoint where possible. We'd require these checks to pass consistently while ingress-nginx still serves production.

## Keep rollback available through the observation window

At cutover, change DNS and any IP-pinned upstream configuration as a coordinated operation. Watch both paths. Retain the old Ingress resources, controllers and Services until traffic has drained and the new path has met the observation criteria you set before the change.

DNS rollback takes time: cached answers and existing connections don't reverse immediately. If you changed upstream origins or allow lists, reverting DNS alone is insufficient. Record those reversals alongside the old IPs, and keep both paths functional while clients converge.

Controller deletion is a separate rollback boundary. Once the old controller and its Service are removed, the previous serving path is gone, and its managed public IP can be deleted. Recovery then requires rebuilding resources and validating addressing. It is no longer the same traffic-switch operation.

There are also reasons to choose another destination. Review [application routing Gateway API limitations](https://learn.microsoft.com/en-us/azure/aks/app-routing-gateway-api#limitations) if you depend on request header or body size limits, Lua scripts or rate limiting. Microsoft identifies Application Gateway for Containers and Gateway API ingress through the Istio service mesh add-on as alternatives to evaluate. Choose against the behaviors your applications require before booking the cutover. Parallel data planes provide room to test and recover, but uninterrupted service still depends on that validation and on every upstream dependency moving correctly.
