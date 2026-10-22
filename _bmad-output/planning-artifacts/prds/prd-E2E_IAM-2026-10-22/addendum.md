---
title: "PRD Addendum: Mojud (working name)"
created: 2026-10-22
updated: 2026-10-22
---

# PRD Addendum: Mojud (working name)

Technical notes and background that support the PRD but describe *how* rather than *what*. **No technology stack has been chosen.** Everything below is an option for the architecture step, not a decision.

## A. Technical notes for architecture (options, not decisions)

**Stock ledger (FR-11 – FR-15)**
- The usual pattern is an append-only `stock_movements` table, with balances either summed from it or kept in a balance table updated in the same database transaction.
- To meet FR-13 (no negative stock) and NFR-4 (correct under concurrency), the balance check and the insert must happen atomically, as one step that nothing else can interrupt. Options include row locking on the balance row, or a database constraint such as `CHECK (qty >= 0)` on balance rows.
- A relational database with transactions suits this, for example PostgreSQL.

**Duplicate prevention and offline (FR-14, FR-40 – FR-44)**
- One option: the device generates a unique ID (UUID) for each action, and the server stores it with a unique index. This gives idempotent writes: sending the same action twice has no extra effect.
- A service worker together with IndexedDB can hold the Offline queue, and the queue is replayed in order when the device reconnects.
- Device time and server time are both kept, and the server's checks are the ones that count.

**Camera scanning (FR-38)**
- The browser `BarcodeDetector` API is supported in Chrome on Android but not everywhere. A JavaScript fallback library (ZXing-based) is a common choice.
- FMCG products mostly carry EAN-13 barcodes. Scanning needs HTTPS and permission to use the camera.

**Languages (FR-45)**
- A common approach is an i18n library, with all text kept in translation files from the start.
- Bangla needs a font that displays conjunct characters correctly, and should be tested on low-cost phones.

**Data isolation (FR-1, NFR-7)**
- Every table carries a `business_id`, and every query is filtered by the User's Business. Row-level security in the database is an optional extra safeguard.

**Excel import (FR-46, FR-47)**
- A common approach is to read `.xlsx` files on the server, validate every row first, and save in one transaction only after the Manager confirms.

## B. Rationale for key PRD choices

- **One Warehouse per Dispatch order (FR-23):** this keeps reservation and picking simple. Orders that need stock from two Warehouses are rare and can be split into two orders.
- **Damage approval means Write-off (FR-30):** this is the simplest flow. Selling damaged goods at a discount or returning them to the Supplier is left out of v1.
- **Unexplained state (FR-36, FR-37):** count shortages keep their value and stay visible to the Owner, instead of disappearing through a silent adjustment. This puts the brief's "evidence over scores" principle into practice.
- **Count shortages are taken from Available, then Damaged, then Reserved (FR-36):** this keeps the no-negative rule true in every case. Reserved is touched last because changing it affects promises already made to customers.
- **Only two kinds of Stock movement, Move and Revalue:** the brief's design principles also listed a third kind, Transform. Converting cartons to pieces needs no Transform, because every quantity is already stored in Base units. Kitting and assembly are non-goals, so Transform is deferred until a real need appears.
- **Returns are a non-goal:** this keeps v1 lean. A simple "return in" can be added later. Until then, the only way to record a returned item is an approved Reversal of the dispatch, done by a Manager.
- **No notifications in v1:** the brief asked for one ranked inbox instead of a separate alert per problem. Leaving out SMS also avoids its cost.

## C. Related documents

- Product brief: `_bmad-output/planning-artifacts/briefs/brief-E2E_IAM-2026-10-22/brief.md`
- Brief addendum, covering market research with sources (A), the post-v1 backlog (B) and 10 design principles (C): `_bmad-output/planning-artifacts/briefs/brief-E2E_IAM-2026-10-22/addendum.md`
