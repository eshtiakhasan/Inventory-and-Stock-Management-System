# 05: Karim's Transfer Arrives Short

**Project:** Mojud (E2E_IAM)
**Created:** 2026-10-23
**Method:** Whiteport Design Studio (WDS)
**Priority:** P2
**Source journey:** UJ-5, UJ-9 (EXPERIENCE.md → Key Flows)

---

## Transaction (Q1)

**What this scenario covers:**
Hand stock from one warehouse to another so that any gap is pinned to the step where it happened.

---

## Business Goal (Q2)

**Goal:** Record accuracy; losses get explained
**Objective:** Objective 3 (SM-1) and Objective 4 (SM-4)

---

## User & Situation (Q3)

**Persona:** [Karim the Warehouse Worker](../../B-Trigger-Map/personas/02-Karim-the-Warehouse-Worker.md) (Primary)
**Situation:** Karim, Monday 10 am at Narayanganj, sending 20 cartons of rice to Gazipur on the company pickup. At Gazipur, a colleague (Jamal, a worker there) receives it at 4:40 pm.

---

## Driving Forces (Q4)

**Hope:** Send the stock and have it on record that 20 left his hands.

**Worry:** That if Gazipur ends up short, everyone assumes he sent less.

---

## Device & Starting Point (Q5 + Q6)

**Device:** Mobile (warehouse phones at both ends)
**Entry:** Taps Send Transfer in the My tasks header (or More → Transfers) on the Narayanganj phone.

---

## Best Outcome (Q7)

**User Success:**
Both counts, both people and both times are on record; the missing carton stays In transit and is clearly not his gap.

**Business Success:**
The handoff gap is captured as a Transfer-shortage Issue instead of disappearing into month-end shrinkage.

---

## Shortest Path (Q8)

1. **Transfers** — See incoming and outgoing transfers and start a new one
2. **Send Transfer** — Pick the destination, scan and count out each product, send
3. **Receive Transfer (blind)** — The receiver counts what arrived without seeing the sent quantity ✓

---

## Trigger Map Connections

**Persona:** Karim the Warehouse Worker (Primary)

**Driving Forces Addressed:**
- ✅ **Want:** Proof of good work
- ❌ **Fear:** Being blamed for gaps he didn't cause

**Business Goal:** Objective 3 (SM-1) and Objective 4 (SM-4)

---

## Scenario Steps

| Step | Folder | Purpose | Exit Action |
|------|--------|---------|-------------|
| 05.1 | `05.1-transfers-list/` | See incoming and outgoing transfers and start a new one | Taps Send Transfer |
| 05.2 | `05.2-send-transfer/` | Pick the destination, scan and count out each product, send | Taps Send Transfer (finish); 20 ctn move to In transit and Karim sees the next task |
| 05.3 | `05.3-receive-transfer/` | The receiver counts what arrived without seeing the sent quantity | Jamal saves 19, taps Finish receipt; a Transfer-shortage Issue shows 20 / 19, both workers and both times ✓ |

**First step** (05.1) includes full entry context (Q3 + Q4 + Q5 + Q6).
**On-step interactions** are listed in each page file and become storyboard items in Phase 4.
