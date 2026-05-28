---
title: "Container Insights on AKS Before v1.33 Holds a Kubelet RCE Path via nodes/proxy"
description: "AKS security bulletin AKS-2026-0004 confirms the Azure Monitor Container Insights add-on holds nodes/proxy GET on clusters running Kubernetes earlier than v1.33, giving any principal that obtains the service account token exec access to pods on any node. The fix is in AKS v1.33."
date: "2026-05-28"
author: "Cloudwalker IT"
tags: ["aks", "kubernetes", "security", "container-insights", "rbac", "monitoring"]
readTime: "6 min read"
---

AKS security bulletin [AKS-2026-0004](https://learn.microsoft.com/en-us/azure/aks/security-bulletins/overview#aks-2026-0004-azure-monitor-container-insights-add-on-uses-nodes-proxy-permission-in-kubernetes-versions-%3C-133), published May 11, 2026, documents that the Azure Monitor Container Insights add-on (`ama-logs`) requires the `nodes/proxy GET` ClusterRole permission on AKS clusters running Kubernetes earlier than v1.33. Because the Kubelet does not perform a secondary authorization check for `exec` and `run` operations after the WebSocket handshake is authorized by the initial GET, this permission is a viable path to command execution in any pod on any reachable node. The Kubernetes Security Team determined the behavior is working as intended and will not assign a CVE; the fix arrives with Kubernetes v1.33, where [KEP-2862](https://github.com/kubernetes/enhancements/blob/master/keps/sig-node/2862-fine-grained-kubelet-authz/README.md) (fine-grained Kubelet API authorization) goes GA and lets Container Insights use the narrower `nodes/pods` subresource instead.

## What Changed

The `nodes/proxy GET` permission lets a Kubernetes principal proxy arbitrary HTTP requests through the API server to the Kubelet on port 10250. A [public disclosure on January 26, 2026](https://grahamhelton.com/blog/nodes-proxy-rce) documented that the WebSocket upgrade path over this proxy endpoint allows `CREATE`-verb operations (`/exec`, `/run`, `/attach`, `/portforward`) to succeed even when the caller holds only `GET`. The Kubelet authorizes the WebSocket handshake based on the initial HTTP `GET` and does not re-authorize when the client escalates to exec semantics. Any principal with `nodes/proxy GET` can exec into pods on that node.

On pre-v1.33 AKS, the Container Insights add-on holds exactly this permission via a ClusterRole binding:

```yaml
# Simplified: what ama-logs holds on AKS < v1.33
- apiGroups: [""]
  resources: ["nodes/proxy"]
  verbs: ["get"]
```

Kubernetes v1.33 promotes KEP-2862 to GA, which introduces the `nodes/pods` subresource. With it, `ama-logs` can call the metrics and log endpoints it needs without the broader proxy permission:

```yaml
# AKS v1.33+: Container Insights uses the narrower subresource
- apiGroups: [""]
  resources: ["nodes/pods"]
  verbs: ["get"]
```

AKS v1.33 updates Container Insights to use this narrower subresource automatically. No configuration change is needed after the cluster upgrade completes.

## Why It Matters Operationally

Container Insights is enabled by default in most Azure Landing Zone deployments and in any cluster created through the AKS portal workflow with monitoring turned on. If you are running AKS v1.32 or earlier with Container Insights active, `ama-logs` holds `nodes/proxy GET` bound to a ClusterRoleBinding that covers all nodes in the cluster.

The practical attack surface is the `ama-logs` service account token. Any workload that can read that token can use it to proxy exec requests through the Kubernetes API server to the Kubelet and execute commands inside any pod on any node, without requiring direct node-level access. The token can be obtained through several paths common in production AKS configurations: workload namespaces where developers hold `serviceaccounts/get` against non-workload namespaces, pod identity configurations that mount the token unnecessarily, or a compromised sidecar sharing the monitoring namespace's service account.

This is not limited to multi-tenant clusters. Even in single-tenant environments, lateral movement from a compromised application pod to the Container Insights service account to the Kubelet is a credible escalation path wherever RBAC boundaries between namespaces are loose.

The bulletin recommends restricting pod-to-Kubelet network access on port 10250 as a defense-in-depth measure. This is worth implementing regardless of this specific issue: blocking direct pod-to-Kubelet traffic limits the scope of several container escape classes beyond the proxy path.

[YOUR EXPERIENCE: When you audited AKS clusters for exposure to this bulletin, what RBAC misconfigurations did you find that could have made the ama-logs service account token reachable from workload pods? For example, did you find developer role bindings that included serviceaccounts/get in shared namespaces, or token projection configurations inherited from templates that pre-dated namespace isolation policies?]

## Tradeoffs and Caveats

The upgrade to AKS v1.33 resolves this cleanly, but standard upgrade caveats apply. Node pool upgrades rotate nodes, which respects configured maintenance windows and can take time on large clusters. Clusters with PodDisruptionBudgets that use `minAvailable` equal to total replicas, or with stateful workloads that do not tolerate pod restarts, need upgrade planning before moving forward.

One honest observation: the Kubernetes Security Team's determination that this is "working as intended" is correct at the protocol level. The WebSocket authorization design is not accidental, and KEP-2862 is the proper architectural fix. What this incident surfaces is that a widely deployed first-party Microsoft add-on held a permission enabling node-wide exec in its default configuration across every supported Kubernetes minor version before v1.33. It is worth auditing whether other AKS managed add-ons hold similarly broad permissions. ClusterRoleBindings in system namespaces that include `nodes/proxy`, `pods/exec`, or `secrets/get` deserve regular review, not just when a bulletin forces the question.

On v1.33 and later, the fix is automatic. The cluster upgrade is the action.

AKS v1.33 is generally available.
