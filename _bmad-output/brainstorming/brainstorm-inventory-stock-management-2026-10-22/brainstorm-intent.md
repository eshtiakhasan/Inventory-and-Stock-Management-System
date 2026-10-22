---
title: Inventory and Stock Management System - Brainstorm Intent
source: _bmad-output/brainstorming/brainstorm-inventory-stock-management-2026-10-22/.memlog.md
date: 2026-10-22
status: ready-for-product-brief
---

# Inventory and Stock Management System - Brainstorm Intent

## 1. Product in one line

A simple, reliable stock-control system for small-to-mid FMCG distributors. It shows what stock is really available, records every movement with no extra effort, and settles discrepancies with evidence. It is **not a full ERP**.

- **Core theme:** trust through transparent, effortless accountability. Show the stock that is truly available, make every movement traceable, resolve discrepancies with evidence, make workers' jobs easier, and protect them from unfair blame.
- **Positioning candidate:** "Every handoff counted. Every person protected."

## 2. Problem and root cause

**Trigger story:** the system showed 60 units, but only 32 were really available because the rest were damaged or already reserved. The manager promised 50 to a customer and then had to explain the shortfall to the customer and to the boss.

**Five Whys:**
1. Why was the number wrong? Damaged and reserved stock were not taken out of the available number.
2. Why? Damage reports and reservations go through separate, often manual steps (verbal tells, piles on the floor), and nobody updates the system straight away.
3. Why? The system is too slow and awkward for quick daily tasks, and sales and warehouse staff have no single simple place to record both.
4. Why? Existing systems are built for managers' reports, not workers' daily tasks, so recording feels like extra work instead of part of the job.
5. **Root:** the people who record get little immediate benefit. The value goes up to managers and never comes back down to them.

**Handoff insight:** gaps enter at handoffs, where one side trusts the other side's number without checking it. Examples are supplier to receiver, warehouse A to warehouse B, shelf to customer, worker to supervisor, and record to reality at a count. Two fraud routes found in the session use exactly these gaps: receiving fewer units than the PO but marking the full PO as received, and transfers confirmed without a count.

## 3. Target customer

**Small-to-mid FMCG distributors and wholesalers in Bangladesh**, with 1-3 warehouses and 5-30 staff. Today they use Excel, paper khata or WhatsApp. The owner is not on the warehouse floor every day.

v1 stays simple. Complex, industry-specific features are left out. Carton-to-piece conversion counts as basic for FMCG and is in scope, and best-before dates matter. Full batch and serial tracking is out.

| Role | Core need |
|---|---|
| Owner | Trust the numbers from a distance. See money lost (damaged, missing, expired) as it happens and where capital is tied up, with no surprises at month end. |
| Inventory manager | Know the real promisable quantity (on hand minus damaged minus reserved), not just the recorded on-hand number. |
| Supervisor | One prioritised list of issues, without an alert for every item, and approval or rejection of damage reports in one tap. |
| Warehouse worker | Record work in about one scan and one tap, get something useful back, and be protected from blame for gaps they did not cause. |
| Sales rep | Up-to-date available-to-promise stock per warehouse and a delivery date they can rely on. |
| Accountant | A clear valuation, a transaction-level audit trail, and stock value that matches the general ledger at month end. |

## 4. Design principles

1. **Show promisable stock, not just on-hand.** Every product shows on hand, damaged, reserved and promisable, never one bare number.
2. **Every change is an append-only ledger entry** of one of three kinds: Move (location or state), Transform (for example carton to pieces, keeping cost history) or Revalue (value only). Nothing is overwritten.
3. **Every record gives the recorder something back right away:** the next task, confirmation that the work was saved, or proof that protects them.
4. **Recording happens inside work people already do.** Routine low-risk actions cost at most about 1 scan and 1 tap. Fields are pre-filled from context, and users only correct exceptions.
5. **Offline-first.** Scans wait on the device and sync when the connection returns.
6. **Friction follows risk.** Controls are automatic and based on risk, and each business can configure them. High-value items, repeated discrepancies and suspicious transfers get stricter checks. Everyday movements stay simple.
7. **Every number the owner sees can be traced and acted on.** Use evidence (verified counts, resolved discrepancy cases), not scores. The Trust Score idea was rejected.
8. **Segregation of duties.** No one approves their own receiving record. Receiving is blind (the receiver does not see the PO quantity), and the receiving side of a transfer has to count.
9. **Protect honest workers.** The same record that holds people accountable also proves what they did.

## 5. v1 MoSCoW

MUST items are delivered in small increments, in priority order.

**MUST**
1. Product catalogue with carton and piece units
2. Support for 1-3 warehouses
3. Append-only stock ledger
4. Stock states (on hand, damaged, reserved) and promisable quantity
5. Suppliers and purchase orders, with blind receiving
6. Dispatch with reservation (no invoicing)
7. Transfers that require a count at the receiving end
8. Damage flag with one-tap supervisor approval (works without a photo)
9. Prioritised issues inbox
10. Stock counting and reconciliation, with discrepancy cases
11. Roles and segregation of duties
12. Barcode scanning with the phone camera
13. Bangla and English interface
14. Excel import
15. Low-stock alerts and an owner view of losses in taka
16. Offline scan queue (promoted)
17. Simple worker "My record" view showing picks completed, damage flags and confirmed discrepancies (promoted)
18. Basic stock value tracking

**SHOULD**
- Photo capture for damage reports (demoted, because reporting must work without a photo)
- Weighted-average valuation
- Month-end period lock

**COULD** (ideas from the session that were not explicitly prioritised)
- Soft hold, where a rep reserves stock for about 30 minutes during a customer call
- Freshness stamp on availability (last count date and movements since)
- Supplier on-time history to give a realistic incoming date
- Risk levels that rise with discrepancies and fall after clean counts
- Treating in-transit stock as a location with an owner, plus seal or QR checks on transfers
- Grouping similar damage reports into one card
- Drift rate per location as a health measure

**WON'T (v1)**
- Full ERP scope, including invoicing
- Complex, industry-specific features
- Full batch and serial tracking
- A Trust Score made-up percentage (rejected)

## 6. Open questions and assumptions

**Market and business model**
- How much will a small business pay each month? How do we convince them to pay when cheaper options exist?
- Who pays (likely the owner) and who uses it every day (the floor and sales staff)?
- Why would an owner leave a free Excel sheet that works well enough?
- What makes this better than existing local inventory software?
- What do target businesses use today: Excel, khata, WhatsApp, Tally or nothing? This needs checking.

**People and adoption**
- Will employees refuse a system that makes them more accountable? Who loses power or comfort when stock becomes accurate?
- Can staff use it without technical training?
- Is it acceptable to give individual people a risk score, given privacy, morale and labour norms?

**Trust, data and liability**
- Why should customers trust us with their stock and financial data (security)?
- What happens to us if a customer's data is wrong and they blame the software?

**Assumptions to validate**
- The market is Bangladesh and the currency is BDT. This was inferred from the owner thinking in taka.
- Warehouse internet and power are unreliable.
- Staff need Bangla and English.
- Carton-to-piece conversion and best-before dates are basic needs for FMCG.
