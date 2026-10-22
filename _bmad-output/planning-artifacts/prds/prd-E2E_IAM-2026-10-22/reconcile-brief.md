---
title: "Input reconciliation: Brief + Brief Addendum vs PRD"
created: 2026-10-22
inputs:
  - _bmad-output/planning-artifacts/briefs/brief-E2E_IAM-2026-10-22/brief.md
  - _bmad-output/planning-artifacts/briefs/brief-E2E_IAM-2026-10-22/addendum.md
targets:
  - _bmad-output/planning-artifacts/prds/prd-E2E_IAM-2026-10-22/prd.md
  - _bmad-output/planning-artifacts/prds/prd-E2E_IAM-2026-10-22/addendum.md
---

# Input reconciliation: Brief vs PRD

Scope of check: all 18 v1 MUST items, the out-of-scope list, the 10 design principles (brief addendum C), the post-v1 backlog (addendum B), success criteria, open questions, core theme and qualitative ideas. Deliberate deferrals respected: risk-based controls ("friction follows risk") = SHOULD; damage photo = SHOULD. The PRD was not edited.

## Summary

- **Coverage is strong.** All 18 MUST items map to FRs (PRD §7.1). The full out-of-scope list is in PRD §6. Addendum B (SHOULD/COULD) is reproduced in PRD §7.3. Core theme, "not an ERP", "evidence over scores" (Trust Score rejected) and Unexplained state are carried through.
- **Main gaps:** one success criterion was silently replaced (damage capture), the ledger model from principle 2 lost its Transform/Revalue entry kinds, the "something back / next task" and "protect honest workers" ideas are only partly specified, segregation of duties has some loopholes, and two brief open questions were dropped.

## Gaps

Severity: **high** = contradicts or silently replaces an agreed input; **medium** = weakens or leaves an agreed idea underspecified; **low** = wording, consistency or minor drift.

### G-1. Damage success criterion replaced with a different metric — HIGH
- **Input:** brief.md, Success Criteria, "Damage captured on the same day: at least 90% of damage is flagged within the same shift it was found."
- **PRD:** prd.md §8 SM-5, "at least 90% of Damage flags are **decided within 24 hours of being raised**."
- **Problem:** The brief measures how fast the *floor* captures damage (capture timeliness). The PRD measures how fast *supervisors* decide (decision latency). Different behaviour, different owner, and the brief's target is silently gone.
- **Fix:** Restore the brief's metric as SM-5 (flag raised in the same shift as found; measurable e.g. as share of damage found at counts/picks that already had a flag, or flag time vs shift window). Keep "decided within 24 h" as an additional secondary metric if wanted.

### G-2. Ledger model drops Transform and Revalue entry kinds — MEDIUM
- **Input:** addendum.md C.2, "three kinds of append-only entry: Move, Transform (carton → pieces, with cost carried over) and Revalue (value only)." Brief Solution: "Nothing is silently overwritten."
- **PRD:** prd.md §3 Stock movement (from-state/to-state only), FR-11, FR-18 ("Unit cost = the cost from the latest Receipt").
- **Problem:** (a) No Revalue entry: when a new Receipt changes Unit cost, the value of stock already on hand changes with no ledger entry, which is a silent overwrite of value and breaks "every figure traceable to evidence" (C.8) for Stock value. (b) Transform is absent; storing everything in Base units may make it unnecessary, but the PRD does not record that decision.
- **Fix:** Either add a Revalue movement (value-only, Reason "cost update", linked to the Receipt) whenever Unit cost changes, or state explicitly that Stock value is computed and how it is traced. Add a one-line rationale in PRD addendum C that Transform is not needed because quantities are held in Base units.

### G-3. "Every record gives something back" only specified for dispatch — MEDIUM
- **Input:** addendum.md C.4; brief Executive Summary ("their next task, confirmation ... and proof"); brief Who This Serves (worker "knows the next task").
- **PRD:** FR-25 (next Dispatch order after confirming), FR-52 (confirmation), FR-51 (My record). UJ-1 promises "the next task" after a Receipt, but no FR delivers it.
- **Problem:** "Next task" exists only for picking. Receiving, transfer counts, count lines and damage flags give confirmation but no next task. There is no worker task list (POs to receive, incoming Transfers, assigned Stock count lines).
- **Fix:** Add an FR for a simple worker "My tasks" list (open POs for my Warehouse, incoming Transfers, assigned count lines, open Dispatch orders) and state that each floor action returns the user to their next task.

### G-4. "Protect honest workers" is weakly specified; My record leans to blame — MEDIUM
- **Input:** addendum.md C.10; brief ("proof that protects them from blame for gaps they didn't cause"; "Accountability that protects"; My record shows "confirmed discrepancies, which serves as their proof of work").
- **PRD:** FR-51 lists "Discrepancy cases linked to their own Stock movements that were confirmed"; FR-28, FR-37.
- **Problem:** (a) FR-51 is ambiguous and reads as a list of the worker's faults rather than proof of work; how a count shortage is "linked" to a worker's movement is undefined. (b) No FR states the protective side: e.g. on a Transfer or receiving shortfall, the record shows the sender's count and the receiver's blind count so the gap is attributed to the handoff, not to the honest counter. (c) Owner/Manager can view any User's My record (FR-51), with no guard against it becoming a de facto per-person score (out of scope per brief).
- **Fix:** Reword FR-51 to "discrepancies I reported/flagged that were confirmed" (credit) and show cases where the worker's count was verified correct. Add an acceptance criterion to FR-28/FR-37 that case evidence shows both counts with who/when. Add a note that My record shows counts only, never rankings or scores.

### G-5. Segregation of duties has loopholes — MEDIUM
- **Input:** addendum.md C.9 ("receiving is blind, transfers need a count at the receiving end, and nobody approves their own records"); brief Solution.
- **PRD:** FR-5 (Owner self-approval exception), FR-15 (Reversal), FR-4/FR-20/FR-21.
- **Problem:** (a) FR-5 lets the Owner self-approve when no other eligible User exists; this contradicts "nobody approves their own records" (flagged as assumption, but not as a principle conflict). (b) FR-15 lets a Manager/Owner reverse any movement, including their own, with no second person and no Issue; a Reversal can undo a Write-off or a shortage silently. (c) A Manager can create a PO (FR-20) and also record its Receipt (FR-4), so the receiver may know the ordered quantity, defeating blind receiving.
- **Fix:** Mark the FR-5 exception as a deliberate deviation from C.9 and show such decisions in the owner view. Make Reversals create an Issue visible to the Owner (or require a second person). Add a rule that the PO creator cannot record its Receipt (same pattern as FR-27).

### G-6. Shortfall only raised when the worker marks delivery complete — MEDIUM
- **Input:** brief The Problem ("Short deliveries marked as 'fully received' ... are easy ways for stock to disappear"); MUST #5 blind receiving.
- **PRD:** FR-22 ("If less has been received and the User marks the delivery as complete, a Shortfall Issue is created"); UJ-1 (Shortfall Issue raised on submit).
- **Problem:** If nobody marks the PO complete, a short delivery sits as "Partly received" indefinitely with no Issue. UJ-1 and FR-22 also disagree on when the Issue opens.
- **Fix:** Add an ageing rule (like FR-28's 48 h for Transfers) that raises a Shortfall Issue for POs left Partly received past N days, and align UJ-1 with FR-22.

### G-7. Recording-effort budget weakened; context pre-fill not specified — MEDIUM
- **Input:** addendum.md C.5 ("at most about 1 scan + 1 tap, with fields pre-filled from context"); brief Solution ("Fields are pre-filled").
- **PRD:** FR-29 ("at most one scan, one quantity entry and one tap"); NFR-2; no FR for pre-fill. Users are never assigned to Warehouses, yet FR-26 ("from their Warehouse") and FR-31 ("Warehouses they work with") assume it.
- **Problem:** The damage flow adds a quantity entry beyond the budget; nothing defines what is pre-filled (Warehouse, quantity default of 1 Pack unit from a pack scan, Reason default). Missing user-to-Warehouse assignment blocks pre-fill and inbox scoping.
- **Fix:** Add a User "home Warehouse(s)" field to FR-3; add an acceptance criterion that Warehouse, Reason and quantity (1 scanned unit) are pre-filled; align FR-29 with NFR-2.

### G-8. Two brief open questions dropped — MEDIUM
- **Input:** brief.md Open Questions: "Switching: why would an owner leave an Excel sheet that works 'well enough'?" and "Staff acceptance: will staff accept more accountability if the product clearly protects them too?" Also "validated ... by interviewing 3–5 distributors".
- **PRD:** prd.md §9 (has pay, devices x2, SMS, supervisor scope, data trust, customer list; omits switching and staff acceptance).
- **Problem:** Staff acceptance is the core risk behind the whole "protect honest workers" thesis; switching is the core buying risk.
- **Fix:** Add both questions to §9 and note the 3–5 distributor interview plan.

### G-9. Shared-phone attribution not addressed in requirements — MEDIUM
- **Input:** brief Open Questions (Devices: "many share low-end phones"); addendum A Connectivity ("supports offline-first and shared-device design").
- **PRD:** §9 Q2 (open question only); FR-41 (sign-in once per device).
- **Problem:** Accountability depends on correct attribution. On a shared phone, actions may be recorded under whoever last signed in, undermining both accountability and worker protection.
- **Fix:** Either add an FR for quick user switching on a shared device (e.g. PIN switch, offline-capable) or keep it as an open question explicitly marked as blocking for SM-2/FR-51 validity.

### G-10. Audit success criterion drops "location" — LOW
- **Input:** brief Success Criteria ("100% of stock changes record user, time, reason and location").
- **PRD:** §8 SM-3 and NFR-5 (User, time, Reason only). FR-11 does capture Warehouse.
- **Fix:** Add "and Warehouse (location)" to SM-3 and NFR-5.

### G-11. Speed criterion softened to median — LOW
- **Input:** brief ("a routine scan takes 5 seconds or less").
- **PRD:** §8 SM-6 ("median time ... 5 seconds or less").
- **Problem:** Median allows half of actions to be slower. May be a reasonable refinement but is not flagged.
- **Fix:** Use a percentile (e.g. p90 ≤ 5 s) or mark the change as a deliberate `[ASSUMPTION]`.

### G-12. Owner loss breakdown inconsistent with brief and UJ-6 — LOW
- **Input:** brief Solution ("Losses are shown in taka by reason (damaged, expired, unexplained)").
- **PRD:** FR-48 (monthly losses: damaged, expired, other, confirmed loss, plus *current* Unexplained balance); UJ-6 shows "unexplained" as a monthly loss.
- **Fix:** Decide whether "unexplained" is a monthly flow (new Unexplained this month) or a balance, and make UJ-6 and FR-48 match.

### G-13. UJ-4 contradicts FR-23 — LOW
- **Input:** brief MUST #6 (dispatch with reservation).
- **PRD:** UJ-4 ("creates a Dispatch order for 50 from both warehouses") vs FR-23 ("One Dispatch order uses one Warehouse").
- **Fix:** Change UJ-4 to two Dispatch orders (32 + 18).

### G-14. Sales rep "promise dates" not supported — LOW
- **Input:** brief Who This Serves (Sales rep "Promises quantities **and dates**").
- **PRD:** FR-23 has a required date, but no information about when stock will be available (expected arrival is SHOULD, addendum B / PRD §7.3).
- **Fix:** Note in §2.1 or §7.3 that date promising depends on the SHOULD "expected arrival dates" item, so v1 supports quantities only.

### G-15. Principle 7 ("friction follows risk") not recorded as a guiding principle — LOW
- **Input:** addendum.md C.7. (Deferral to SHOULD is deliberate and correct.)
- **PRD:** only §7.3 SHOULD item "Risk-based extra checks". FR-28's fixed 48 h rule and FR-5 are fixed, not configurable.
- **Fix:** Add a line in PRD addendum C: principle 7 is deferred; v1 controls are fixed and uniform, and should be built so thresholds can later become per-business settings.

### G-16. Notification non-goal vs FR-44 "the User ... is told" — LOW
- **Input:** brief (one inbox, "not a stream of separate alerts").
- **PRD:** §6 (no SMS/email/push); FR-44 (recording User "is told about it").
- **Fix:** Specify the channel (e.g. a banner in the app / entry in My record).

### G-17. Positioning line not carried — LOW
- **Input:** brief Executive Summary ("Every handoff counted. Every person protected.").
- **PRD:** absent.
- **Fix:** Add to §1 Vision; useful as a tone anchor for UX.

## Scope creep (beyond agreed v1)

### S-1. Sale price on Product — LOW/MEDIUM
- **PRD:** FR-6 includes "sale price"; nothing in the PRD uses it.
- **Concern:** Drifts toward POS/invoicing (explicitly out, brief Scope). **Fix:** remove, or state why it is needed (it is not used in Stock value, which uses Unit cost).

### S-2. "Verified" count lines stored as last-verified date — LOW
- **PRD:** FR-36 ("stored as evidence of the last verified date").
- **Concern:** Overlaps the SHOULD "freshness stamp" (addendum B). Storing is harmless; displaying it on availability would be SHOULD scope. **Fix:** note that only storage is v1.

### S-3. Quantity on open POs in the low-stock list — LOW
- **PRD:** FR-50 ("together with the quantity on open POs").
- **Concern:** Edges toward SHOULD "expected arrival dates". Small and useful; **Fix:** keep but mark as a minor addition, no dates.

### S-4. 48-hour unreceived Transfer Issue and sign-in lockout — LOW
- **PRD:** FR-28, FR-2.
- **Concern:** Small additions not in the brief; both reasonable and already marked `[ASSUMPTION]`. No action beyond keeping them marked.

No significant scope creep was found: no POS, invoicing, batch/serial, bins, BOM, multi-company, native apps or person-level risk scores were added.

## Items verified as covered (no gap)

- MUST 1–18 all mapped (PRD §7.1); build order starts with core stock tracking (§7.2), matching brief.
- Out-of-scope list fully reproduced (PRD §6), plus consistent extras (integrations, notifications).
- Addendum B SHOULD and COULD lists reproduced in PRD §7.3.
- Principles C.1 (promisable, stock ladder FR-12), C.3 (Unexplained state), C.6 (offline PWA FR-40–44), C.8 (drill-down FR-49, Trust Score rejected §6) covered.
- Photo optional / SHOULD (FR-29) and risk-based controls SHOULD (§7.3) match the deliberate deferrals.
- Success criteria accuracy, unexplained loss, adoption, product proof carried (SM-1, SM-2, SM-4, SM-7); counter-metrics are a good addition.
- Open questions on pay, devices and data trust carried (§9 Q1–Q3, Q6).
- "Not an ERP" and core theme stated in PRD §1.
