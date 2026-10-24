# 01: Karim Receives a Supplier Delivery Blind

**Project:** Mojud (E2E_IAM)
**Created:** 2026-10-23
**Method:** Whiteport Design Studio (WDS)
**Priority:** ⭐ P1
**Source journey:** UJ-1 (EXPERIENCE.md → Key Flows)

**Reference mockup:** [key-receiving.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-receiving.html) (BMAD UX, used as the visual reference in Phase 4)

---

## Transaction (Q1)

**What this scenario covers:**
Count a supplier delivery into stock without seeing the order, even when the signal drops at the back of the warehouse.

---

## Business Goal (Q2)

**Goal:** Floor adoption and record accuracy
**Objective:** Objective 2 (SM-2, ≥ 80% weekly floor recording) and Objective 3 (SM-1, ≥ 97% accuracy)

---

## User & Situation (Q3)

**Persona:** [Karim the Warehouse Worker](../../B-Trigger-Map/personas/02-Karim-the-Warehouse-Worker.md) (Primary)
**Situation:** Karim, at the Narayanganj loading bay, mid-morning. A supplier truck has just backed in with rice and oil; the driver wants a signature and the back of the warehouse has one bar of signal.

---

## Driving Forces (Q4)

**Hope:** Get the truck counted fast and be done with it.

**Worry:** That the 8 missing cartons get pinned on him, or that his counts vanish when the network drops.

---

## Device & Starting Point (Q5 + Q6)

**Device:** Mobile (shared low-end Android, Chrome, PWA)
**Entry:** Opens the installed Mojud app from the home screen of the shared warehouse phone; it lands on My tasks, where the delivery already waits as a task card.

---

## Best Outcome (Q7)

**User Success:**
Every carton he counted is saved under his name, the shortfall is someone else's issue, and the next task is already on screen.

**Business Success:**
Receipt recorded at source with who, when, where (SM-3 = 100%); 92 vs 100 Shortfall Issue raised automatically, so no silent loss enters stock.

---

## Shortest Path (Q8)

1. **My tasks** — See today's tasks with the supplier delivery at the top
2. **Receive PO (blind)** — See the products on the delivery with no ordered quantities
3. **Scan overlay** — Scan a carton barcode to jump to its line
4. **Offline queue** — Confirm that the counts saved on the phone have synced ✓

---

## Trigger Map Connections

**Persona:** Karim the Warehouse Worker (Primary)

**Driving Forces Addressed:**
- ✅ **Want:** Finish the task fast and know what to do next
- ✅ **Want:** Proof of good work
- ❌ **Fear:** Being blamed for gaps he didn't cause
- ❌ **Fear:** Losing work when the network drops

**Business Goal:** Objective 2 (SM-2, ≥ 80% weekly floor recording) and Objective 3 (SM-1, ≥ 97% accuracy)

---

## Scenario Steps

| Step | Folder | Purpose | Exit Action |
|------|--------|---------|-------------|
| 01.1 | `01.1-my-tasks/` | See today's tasks with the supplier delivery at the top | Taps the Purchase order task card |
| 01.2 | `01.2-receive-po/` | See the products on the delivery with no ordered quantities | Taps the Scan bar to scan the first carton |
| 01.3 | `01.3-scan-overlay/` | Scan a carton barcode to jump to its line | Scan succeeds; overlay closes on the selected line, he enters 92 and saves; repeats, then marks delivery complete |
| 01.4 | `01.4-offline-queue/` | Confirm that the counts saved on the phone have synced | Watches the queue empty to 'All synced', then returns to My tasks with the next task ✓ |

**First step** (01.1) includes full entry context (Q3 + Q4 + Q5 + Q6).
**On-step interactions** are listed in each page file and become storyboard items in Phase 4.
