---
title: "Entra Connect Hard Match Enforcement Is Live for Privileged Accounts"
description: "As of June 1, 2026, Microsoft Entra ID silently blocks Entra Connect Sync and Cloud Sync from hard-matching AD objects to cloud users holding Entra roles. Here is what breaks and what legitimate migration paths still exist."
date: "2026-06-04"
author: "Cloudwalker IT"
tags: ["entra-id", "security", "hybrid-identity", "azure", "active-directory"]
readTime: "6 min read"
---

As of June 1, 2026, Microsoft Entra ID automatically blocks any Entra Connect Sync or Cloud Sync hard match attempt that would transfer Source of Authority from an on-premises Active Directory object to an existing cloud-managed Entra user holding Microsoft Entra roles. The enforcement is live with no tenant opt-in required and is documented in Microsoft's [February 2026 What's New in Microsoft Entra announcement](https://learn.microsoft.com/en-us/entra/fundamentals/whats-new#february-2026).

## What Changed

Hard matching is the mechanism Entra Connect and Cloud Sync use to reconcile on-premises AD objects with existing cloud-managed Entra identities. It works by comparing the incoming object's `sourceAnchor` value (derived from `mS-Ds-ConsistencyGuid` or `objectGUID`) against the `onPremisesImmutableId` attribute on cloud users. A successful hard match transfers Source of Authority to on-premises AD, and from that point forward the cloud user's attributes (including the password hash if password hash sync is active) are overwritten on every sync cycle by on-premises values.

The June 1 enforcement adds an unconditional block: if the target cloud-managed user already has an `onPremisesImmutableId` set and holds at least one [Microsoft Entra role](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference), the sync engine returns `InvalidHardMatch` and stops. This applies regardless of whether `BlockCloudObjectTakeoverThroughHardMatchEnabled` is configured at the tenant level. For role-holding users, enforcement is now automatic.

A companion change arrives July 1, 2026: Entra Connect will stop allowing modification of `OnPremisesObjectIdentifier` after it has been mapped to a synced object, blocking a separate re-mapping path. Legitimate recovery requires a new Graph permission scope (`User-OnPremisesSyncBehavior.ReadWrite.All`) and a null-write to `onPremisesObjectIdentifier` before retrying.

The attack surface being closed is sometimes called SyncJacking: an attacker with write access to on-premises AD sets an AD user's `mS-Ds-ConsistencyGuid` to match the `onPremisesImmutableId` of a privileged cloud-managed Entra account. On the next sync cycle, Entra Connect transfers Source of Authority to AD, and the attacker can then overwrite the cloud user's password hash without ever touching the Entra admin center.

## Why It Matters Operationally

The enforcement blocks a subset of previously allowed operations. The scenarios most likely to surface as unexpected sync failures are:

**Migration consolidation.** An IT team created a cloud-only Entra account for an administrator, assigned Global Administrator or another privileged role, and now wants to bring that account under Entra Connect management for lifecycle and offboarding consistency. That consolidation now fails with `InvalidHardMatch` without additional prep work.

**Sync scope changes for privileged accounts.** A privileged user was temporarily removed from sync scope, accumulated Entra role assignments while out of scope, and is being re-added. Hard match will fail because the cloud object now holds roles.

**CSP and GDAP partner scenarios.** Partners configuring GDAP relationships often create cloud-only admin accounts in the customer tenant that accumulate role assignments during setup. If those accounts are later brought into sync scope to align with the customer's on-premises directory, the enforcement applies. Any partner migration playbook that includes identity consolidation should be reviewed against this.

The failure mode is not loud. Entra Connect Health records `InvalidHardMatch` in the export cycle, but if Connect Health alerts are not routing to an actionable inbox, the failure is invisible until someone notices the account has stopped syncing.

The workaround for legitimate consolidations: remove all Microsoft Entra roles from the target cloud user, allow the hard match to complete, then re-assign roles. If the target is soft-deleted, restore it from the Entra ID Recycle Bin first.

[YOUR EXPERIENCE: In the hybrid environments you manage or have recently migrated, how often do privileged Entra accounts end up outside sync scope and accumulate cloud-side role assignments before anyone tries to re-sync them? Are these mostly one-off migration artifacts from AD-to-cloud consolidations, or does it happen recurrently as part of normal operations?]

## Tradeoffs and Caveats

The security rationale is sound. Privileged cloud accounts whose Source of Authority can be hijacked from on-premises AD are a real attack path, and the existing opt-in flag (`BlockCloudObjectTakeoverThroughHardMatchEnabled`) was a reasonable first step, but relying on tenants to discover and enable it was not adequate for role-protected accounts. Mandatory enforcement for that subset is the right call.

The honest friction is in the workaround. Temporarily removing roles from a Global Administrator account in a production tenant is not a trivial change: you need at least one other GA-privileged account active before removing roles from the one being matched, and in a GDAP partner context the relevant roles may not be directly modifiable without steps in the customer's admin center.

The July 1 companion change introduces a dependency on `User-OnPremisesSyncBehavior.ReadWrite.All`, a permission scope unlikely to appear in existing automation scripts or runbooks. Any pipeline that handles sync object remediation should be audited against this before that date.

If Entra Connect Health sync error alerts are not routing to an actionable inbox, the June 1 enforcement will produce silent failures. The enforcement is live and requires no action to take effect.
