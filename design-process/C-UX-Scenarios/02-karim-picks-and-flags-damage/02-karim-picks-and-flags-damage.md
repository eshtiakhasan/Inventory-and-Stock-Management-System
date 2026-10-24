# 02: Karim Picks an Order and Flags a Crushed Carton

**Project:** Mojud (E2E_IAM)
**Created:** 2026-10-23
**Method:** Whiteport Design Studio (WDS)
**Priority:** ⭐ P1
**Source journey:** UJ-2 (EXPERIENCE.md → Key Flows)

**Reference mockup:** [key-picking.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-picking.html) (BMAD UX, used as the visual reference in Phase 4)

---

## Transaction (Q1)

**What this scenario covers:**
Pick a dispatch order and report a damaged carton without stopping the pick.

---

## Business Goal (Q2)

**Goal:** Damage captured at source
**Objective:** Objective 5 (SM-5, ≥ 90% of damage from flags) and Objective 2 (SM-2)

---

## User & Situation (Q3)

**Persona:** [Karim the Warehouse Worker](../../B-Trigger-Map/personas/02-Karim-the-Warehouse-Worker.md) (Primary)
**Situation:** Karim, mid-afternoon, picking a 20-carton rice order for a customer van that leaves in 30 minutes. On the second line he finds a carton crushed at the corner.

---

## Driving Forces (Q4)

**Hope:** Get the order on the van complete and on time.

**Worry:** That reporting the crushed carton will cost him five minutes of paperwork, or that the damage is blamed on him.

---

## Device & Starting Point (Q5 + Q6)

**Device:** Mobile (shared low-end Android, Chrome, PWA)
**Entry:** Taps the Dispatch order task on My tasks (designed in 01.1) on the warehouse phone.

---

## Best Outcome (Q7)

**User Success:**
The crushed carton is flagged in one tap plus one scan, the order stays complete through automatic re-reservation, and the van leaves on time.

**Business Success:**
Damage recorded the same minute it was found, with who/when/where; the carton leaves sellable stock immediately and the customer order isn't short.

---

## Shortest Path (Q8)

1. **Pick Dispatch order** — See the order lines with big 'picked / ordered' progress and confirm each line
2. **Flag damage** — Report the crushed carton in one scan ✓

---

## Trigger Map Connections

**Persona:** Karim the Warehouse Worker (Primary)

**Driving Forces Addressed:**
- ✅ **Want:** Finish the task fast
- ✅ **Want:** Feel the app is on his side
- ❌ **Fear:** Recording that slows him down
- ❌ **Fear:** Being blamed for others' gaps

**Business Goal:** Objective 5 (SM-5, ≥ 90% of damage from flags) and Objective 2 (SM-2)

---

## Scenario Steps

| Step | Folder | Purpose | Exit Action |
|------|--------|---------|-------------|
| 02.1 | `02.1-pick-dispatch-order/` | See the order lines with big 'picked / ordered' progress and confirm each line | Scans a carton, accepts the pre-filled remaining quantity with Confirm line, then taps Flag damage on the next line |
| 02.2 | `02.2-flag-damage/` | Report the crushed carton in one scan | Scans the crushed carton (the scan saves the flag), sees 'Flagged 1 ctn damaged', is back on the pick with the line unchanged, and confirms dispatch ✓ |

**First step** (02.1) includes full entry context (Q3 + Q4 + Q5 + Q6).
**On-step interactions** are listed in each page file and become storyboard items in Phase 4.
