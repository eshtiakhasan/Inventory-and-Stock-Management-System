# 08: Rafiq the Manager Runs the Weekly Count

**Project:** Mojud (E2E_IAM)
**Created:** 2026-10-23
**Method:** Whiteport Design Studio (WDS)
**Priority:** P2
**Source journey:** UJ-7 (EXPERIENCE.md → Key Flows)

---

## Transaction (Q1)

**What this scenario covers:**
Count one aisle blind and turn every mismatch into a case someone resolves with evidence.

---

## Business Goal (Q2)

**Goal:** Record accuracy; losses get explained
**Objective:** Objective 3 (SM-1, ≥ 97%) and Objective 4 (SM-4); guardrail SM-C1 (keep counting weekly)

---

## User & Situation (Q3)

**Persona:** Rafiq the Manager (supporting group, see trigger-map.md) (Supporting)
**Situation:** Rafiq, the inventory manager (name illustrative; the PRD leaves him unnamed), Saturday morning at his desk, planning the weekly count of the rice and oil aisle at Narayanganj with two workers.

---

## Driving Forces (Q4)

**Hope:** Know which numbers he can trust and fix the rest this week.

**Worry:** A count nobody trusts, or mismatches with no trail.

---

## Device & Starting Point (Q5 + Q6)

**Device:** Desktop (manager); mobile (counting workers)
**Entry:** Opens Stock counts from the desktop side nav.

---

## Best Outcome (Q7)

**User Success:**
20 products counted blind by two workers, mismatches opened as cases, matched lines marked verified today.

**Business Success:**
Accuracy measured weekly (SM-1) and every shortage held as Unexplained until resolved, never deleted.

---

## Shortest Path (Q8)

1. **Stock counts** — Start a count for chosen products at one warehouse and assign counters
2. **Count lines (blind)** — Workers scan and count each product without seeing system quantities ✓

---

## Trigger Map Connections

**Persona:** Rafiq the Manager (Supporting)

**Driving Forces Addressed:**
- ✅ **Want:** Know what's promisable
- ✅ **Want:** Fix discrepancies with evidence
- ❌ **Fear:** Discrepancies with no trail

**Business Goal:** Objective 3 (SM-1, ≥ 97%) and Objective 4 (SM-4); guardrail SM-C1 (keep counting weekly)

---

## Scenario Steps

| Step | Folder | Purpose | Exit Action |
|------|--------|---------|-------------|
| 08.1 | `08.1-stock-counts/` | Start a count for chosen products at one warehouse and assign counters | Taps Start count, assigns Karim and a colleague; their phones show 'Count lines' in My tasks |
| 08.2 | `08.2-count-lines/` | Workers scan and count each product without seeing system quantities | Each saves their lines; Rafiq closes the count and works the cases as Found or Confirmed loss ✓ |

**First step** (08.1) includes full entry context (Q3 + Q4 + Q5 + Q6).
**On-step interactions** are listed in each page file and become storyboard items in Phase 4.
