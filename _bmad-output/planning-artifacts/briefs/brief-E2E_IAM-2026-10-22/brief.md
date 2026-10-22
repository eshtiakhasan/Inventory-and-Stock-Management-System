---
title: "Product Brief: Mojud (working name)"
status: final
created: 2026-10-22
updated: 2026-10-22
inputs:
  - _bmad-output/brainstorming/brainstorm-inventory-stock-management-2026-10-22/brainstorm-intent.md
  - idea.md
---

# Product Brief: Mojud (working name)

> *Mojud* (মজুদ) means "stock" in Bangla. The name is temporary.

## Executive Summary

Mojud is a simple, reliable stock-control web app for small and mid-sized **FMCG distributors and wholesalers in Bangladesh** with 1–3 warehouses and 5–30 staff. It replaces Excel sheets, paper khatas and WhatsApp messages with one shared record. That record shows what stock is **really available**, who moved it and why, and where taka is being lost.

The core idea is **trust through transparent, effortless accountability**. Most inventory tools are built for the manager's reports, so recording feels like extra work to the people on the floor and gets skipped. Mojud turns that around. Every record takes about one scan and one tap, works offline, and gives the person recording it something back: their next task, confirmation that the work was saved, and proof that protects them from blame for gaps they didn't cause.

This is a personal learning project, built with the intention of becoming usable by real businesses. It is **a stock-control system, not an ERP**.

Working positioning line: *"Every handoff counted. Every person protected."*

## The Problem

A typical scenario: the system says 60 cartons are in stock, so a manager promises 50 to a customer. Only 32 can actually be sold, because some were crushed during picking and others were already promised by a colleague. The manager has to explain the shortfall to the customer and to the owner.

The underlying causes:

- **"Stock" is one number that hides three.** Recorded stock includes damaged and reserved units, so nobody knows what can actually be promised.
- **Events happen outside the system.** Damage is reported to a supervisor verbally, reservations sit in a sales notebook or on WhatsApp, and nobody updates the record. Later, nobody remembers who found the damage or when.
- **Gaps enter at handoffs**, where one side trusts the other's number: supplier to receiver, warehouse to warehouse, worker to supervisor. Short deliveries marked as "fully received" and transfers confirmed without counting are easy ways for stock to disappear.
- **Owners find losses too late.** Damaged, missing and expired stock shows up as an unexplained shortfall at month end, with nothing to trace it back to.

**Root cause:** the people who record stock get no immediate benefit from doing it. Effort flows up to managers and value never flows back down, so under time pressure recording is the first thing skipped.

## The Solution

A responsive web app, **installable as a PWA** so it works on phones and keeps recording offline. It does a small number of things reliably:

- **Promisable stock, not just on-hand stock.** Every product shows on hand, damaged, reserved, in transit and promisable quantities, per warehouse.
- **Every change goes into an append-only record:** who, what, when, where, why and value. Nothing is silently overwritten. Count shortages are kept as *unexplained* until someone resolves them, never deleted.
- **Recording happens inside the work.** Receiving, picking, transfers and damage take about one scan and one tap with the phone camera. Fields are pre-filled, and offline scans sync later.
- **Controls at every handoff.** Blind receiving against purchase orders, a count at the receiving end of transfers, and nobody can approve their own records.
- **Damage reporting in one tap.** "Flag it" moves stock out of sale straight away. The supervisor approves or rejects it from one prioritised issues inbox, not a stream of separate alerts.
- **Evidence for the owner, not scores.** Losses are shown in taka by reason (damaged, expired, unexplained), and each figure can be followed down to a case with a transaction, a person and a timestamp, assigned to someone to resolve.
- **Something back for workers.** A simple "My record" view shows picks completed, damage flags and confirmed discrepancies, which serves as their proof of work.

## What Makes This Different

These points are honest positioning claims. None of them is a technical moat.

- **Built for the floor first.** Bangla and English, phone-first, offline-capable, and designed to an effort budget of roughly one scan and one tap.
- **Accountability that protects.** The same record that holds people accountable also clears honest workers.
- **Focused scope.** It does warehouse stock control for small distributors well and stops there: no POS, no invoicing, no ERP.
- `[ASSUMPTION]` **There is a market gap.** Desk research suggests local tools are either single-shop khata apps (TallyKhata, Hishabee) or brand-side distribution and ERP systems (Sokrio, TallyPrime, Odoo implementations). None of the tools found is a Bangla, offline, warehouse-control tool for small distributors. This must be checked with real distributors (addendum A).

## Who This Serves

**Primary customer:** the **owner** of a Bangladeshi FMCG distributor or wholesaler with 1–3 warehouses and 5–30 staff. Today they run on Excel, khata and WhatsApp, and they aren't on the floor every day. They pay for the product because they want **control**: to trust the numbers from a distance and stop money leaking away.

**Daily users** adopt it only if it gives them **relief**.

| Role | What success looks like |
|---|---|
| Warehouse worker | Records work in seconds, knows the next task, and isn't blamed for others' gaps |
| Supervisor | Clears one prioritised inbox and approves damage in one tap |
| Inventory manager | Knows the promisable quantity per warehouse and resolves discrepancies with evidence |
| Sales rep | Promises quantities and dates without having to check with the warehouse first |
| Accountant | Gets a stock value backed by a transaction-level trail |

## Success Criteria

`[ASSUMPTION]` **These targets are provisional.** They are working assumptions, not commitments, and stay that way until they have been validated with real users.

- **Inventory record accuracy:** at least 97% of counted lines match the system after 3 months of use, up from a baseline measured at the first count.
- **Complete audit information:** 100% of stock changes record user, time, reason and location. The system enforces this rather than relying on discipline.
- **Unexplained loss falls:** unexplained shortfall in taka goes down month on month, and at least 80% of discrepancy cases are resolved within 7 days.
- **Damage captured on the same day:** at least 90% of damage is flagged within the same shift it was found.
- **Floor adoption:** at least 80% of warehouse and sales staff record in the app every working week.
- **Speed:** a routine scan takes 5 seconds or less, and a sales rep can find the promisable quantity in 10 seconds or less.
- **Product proof:** one real distributor replaces Excel or khata with Mojud for 8 consecutive weeks.

## Scope

**In v1 (MUST).** v1 is limited to these 18 features, built in small increments starting with **core stock tracking** (items 1–7). Accountability and advanced features follow in later increments; the exact order is decided in planning.

1. Product catalogue with carton ↔ piece units
2. 1–3 warehouses
3. Append-only stock ledger
4. Stock states and promisable quantity
5. Suppliers and simple purchase orders with blind receiving
6. Dispatch with reservation (no invoicing)
7. Transfers with a count at the receiving end
8. Damage flag (photo optional) with one-tap supervisor approval
9. Prioritised issues inbox
10. Stock counts and reconciliation into discrepancy cases
11. Roles and segregation of duties
12. Phone-camera barcode scanning
13. Bangla and English interface
14. Excel import
15. Low-stock list and owner view of losses in taka
16. Offline scan queue (PWA)
17. Simple worker "My record" view
18. Basic stock value tracking

**Explicitly out of v1:**

- POS and invoicing
- Full accounting ledger
- Batch and serial tracking
- Kitting and bill of materials (BOM)
- Bin-level locations
- Risk scores for individual people
- Multi-company
- Native mobile apps

Next priorities (SHOULD) and later ideas are listed in addendum B.

## Open Questions

`[ASSUMPTION]` Each of these needs to be validated, ideally by interviewing 3–5 distributors before or during the build.

- **Willingness to pay:** will owners pay a monthly fee, and how much? Local tool pricing suggests about ৳1,000–3,000/month, but that is unverified.
- **Switching:** why would an owner leave an Excel sheet that works "well enough"? Is the loss in taka large enough to justify it?
- **Staff acceptance:** will staff accept more accountability if the product clearly protects them too?
- **Devices:** do warehouse staff have, or share, smartphones good enough for camera scanning? Research suggests many share low-end phones.
- **Data trust:** what security and backup promises do owners need before trusting a new web app with stock and money data?

## Vision

If v1 earns trust with a handful of distributors, Mojud becomes the record that small Bangladeshi distributors run their warehouses on. Possible next steps:

- Smarter controls that tighten and relax with risk
- Expiry and valuation for the accountant
- Supplier performance insights
- Optional links to accounting tools such as Tally

Throughout, it stays a focused stock-control product and does not grow into an ERP.
