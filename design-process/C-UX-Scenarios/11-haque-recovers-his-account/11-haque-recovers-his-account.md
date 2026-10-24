# 11: Mr. Haque Recovers His Account

**Project:** Mojud (E2E_IAM)
**Created:** 2026-10-23
**Method:** Whiteport Design Studio (WDS)
**Priority:** P3
**Source journey:** — (cross-role sub-flow, FR-54) (EXPERIENCE.md → Key Flows)

---

## Transaction (Q1)

**What this scenario covers:**
Get back into the owner account after forgetting the password, with no SMS or support desk.

---

## Business Goal (Q2)

**Goal:** Product proof
**Objective:** Objective 1 (SM-7): a locked-out owner ends the pilot

---

## User & Situation (Q3)

**Persona:** [Mr. Haque the Owner](../../B-Trigger-Map/personas/03-Haque-the-Owner.md) (Secondary)
**Situation:** Mr. Haque, a month into the pilot, on a new phone; the old one held his saved password.

---

## Driving Forces (Q4)

**Hope:** Get back in tonight without asking anyone.

**Worry:** Losing access to his business data for good.

---

## Device & Starting Point (Q5 + Q6)

**Device:** Mobile or desktop
**Entry:** On Sign in, taps 'Owner? Use your recovery code'.

---

## Best Outcome (Q7)

**User Success:**
Back in with a new password, and prompted to save a new recovery code.

**Business Success:**
Owner retained; the data-trust fear is answered.

---

## Shortest Path (Q8)

1. **Owner recovery** — Enter phone number and recovery code, set a new password ✓

---

## Trigger Map Connections

**Persona:** Mr. Haque the Owner (Secondary)

**Driving Forces Addressed:**
- ✅ **Want:** Control from a distance
- ❌ **Fear:** Data being lost or exposed

**Business Goal:** Objective 1 (SM-7): a locked-out owner ends the pilot

---

## Scenario Steps

| Step | Folder | Purpose | Exit Action |
|------|--------|---------|-------------|
| 11.1 | `11.1-owner-recovery/` | Enter phone number and recovery code, set a new password | Sets a new password, saves the regenerated recovery code, lands on the Owner view ✓ |

**First step** (11.1) includes full entry context (Q3 + Q4 + Q5 + Q6).
**On-step interactions** are listed in each page file and become storyboard items in Phase 4.
