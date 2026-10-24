# 04: Mr. Haque Traces an Unexplained Loss

**Project:** Mojud (E2E_IAM)
**Created:** 2026-10-23
**Method:** Whiteport Design Studio (WDS)
**Priority:** ⭐ P1
**Source journey:** UJ-6 (EXPERIENCE.md → Key Flows)

**Reference mockup:** [key-owner-view.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-owner-view.html) (BMAD UX, used as the visual reference in Phase 4)

---

## Transaction (Q1)

**What this scenario covers:**
Turn a taka figure he can't explain into a named person's task, without visiting the warehouse.

---

## Business Goal (Q2)

**Goal:** Losses get explained; product proof
**Objective:** Objective 4 (SM-4) and Objective 1 (SM-7, 8-week pilot)

---

## User & Situation (Q3)

**Persona:** [Mr. Haque the Owner](../../B-Trigger-Map/personas/03-Haque-the-Owner.md) (Secondary)
**Situation:** Mr. Haque, Sunday evening at home on his laptop, doing his weekly look at the business before Monday's supplier calls.

---

## Driving Forces (Q4)

**Hope:** See exactly where taka leaked this month and who will fix it.

**Worry:** Finding out too late, or finding a number nobody can explain.

---

## Device & Starting Point (Q5 + Q6)

**Device:** Desktop at home (also phone)
**Entry:** Opens Mojud in his browser bookmark; home is the Owner view for the current month.

---

## Best Outcome (Q7)

**User Success:**
Knows the ৳1,450 unexplained comes from two open count cases, has assigned one to the Manager, and has checked what's running low.

**Business Success:**
Unexplained case assigned within minutes of being seen (SM-4, ≥ 80% resolved in 7 days); the owner sees value in Mojud, which is what keeps the pilot going (SM-7).

---

## Shortest Path (Q8)

1. **Owner view + drill-down** — See this month's losses by Reason in taka, then the cases behind Unexplained
2. **Low stock** — See which products are below their threshold per warehouse ✓

---

## Trigger Map Connections

**Persona:** Mr. Haque the Owner (Secondary)

**Driving Forces Addressed:**
- ✅ **Want:** Trust numbers from a distance
- ✅ **Want:** See where taka leaks
- ❌ **Fear:** Finding losses too late
- ❌ **Fear:** Being kept in the dark

**Business Goal:** Objective 4 (SM-4) and Objective 1 (SM-7, 8-week pilot)

---

## Scenario Steps

| Step | Folder | Purpose | Exit Action |
|------|--------|---------|-------------|
| 04.1 | `04.1-owner-view/` | See this month's losses by Reason in taka, then the cases behind Unexplained | Taps the Unexplained tile, opens a case (Issue detail, designed in 03.2), assigns it to the Manager, then opens Low stock |
| 04.2 | `04.2-low-stock/` | See which products are below their threshold per warehouse | Notes the two products to reorder for Monday ✓ |

**First step** (04.1) includes full entry context (Q3 + Q4 + Q5 + Q6).
**On-step interactions** are listed in each page file and become storyboard items in Phase 4.
