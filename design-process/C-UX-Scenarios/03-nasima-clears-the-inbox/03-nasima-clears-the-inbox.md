# 03: Nasima Clears the Inbox at Shift End

**Project:** Mojud (E2E_IAM)
**Created:** 2026-10-23
**Method:** Whiteport Design Studio (WDS)
**Priority:** ⭐ P1
**Source journey:** UJ-3 (EXPERIENCE.md → Key Flows)

**Reference mockup:** [key-issues-inbox.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-issues-inbox.html) (BMAD UX, used as the visual reference in Phase 4)

---

## Transaction (Q1)

**What this scenario covers:**
Decide every open problem from the shift, worst first, and leave with nothing open.

---

## Business Goal (Q2)

**Goal:** Damage captured at source; losses get explained
**Objective:** Objective 5 (flags decided within 24 h) and Objective 4 (SM-4)

---

## User & Situation (Q3)

**Persona:** [Nasima the Supervisor](../../B-Trigger-Map/personas/04-Nasima-the-Supervisor.md) (Tertiary)
**Situation:** Nasima, 5:40 pm at the small desk by the bay, twenty minutes before the shift ends. Today brought two damage flags, a receipt shortfall and a transfer difference.

---

## Driving Forces (Q4)

**Hope:** Close every issue before she goes home.

**Worry:** Approving something wrong and carrying the blame for it.

---

## Device & Starting Point (Q5 + Q6)

**Device:** Mobile (her own Android phone)
**Entry:** Opens Mojud on her phone; her home is the Issues inbox, ranked by money at risk.

---

## Best Outcome (Q7)

**User Success:**
Inbox reads 'No open issues.' and every decision is recorded under her name with the evidence she saw.

**Business Success:**
Damage flags decided within the shift (SM-5 24 h target); write-offs carry a Reason, so the owner's loss figures are explained.

---

## Shortest Path (Q8)

1. **Issues inbox** — See every open issue ranked: assigned, then reserved stock, then value at risk, then age
2. **Issue detail** — See the full evidence and history, then decide ✓

---

## Trigger Map Connections

**Persona:** Nasima the Supervisor (Tertiary)

**Driving Forces Addressed:**
- ✅ **Want:** One short ranked list
- ✅ **Want:** Decide in a tap with evidence
- ❌ **Fear:** Alert overload
- ❌ **Fear:** Being blamed for a wrong approval

**Business Goal:** Objective 5 (flags decided within 24 h) and Objective 4 (SM-4)

---

## Scenario Steps

| Step | Folder | Purpose | Exit Action |
|------|--------|---------|-------------|
| 03.1 | `03.1-issues-inbox/` | See every open issue ranked: assigned, then reserved stock, then value at risk, then age | Approves the top damage flag from its card, then opens the next flag's detail |
| 03.2 | `03.2-issue-detail/` | See the full evidence and history, then decide | Taps 'Reject · back to Available'; returns to an empty inbox ✓ |

**First step** (03.1) includes full entry context (Q3 + Q4 + Q5 + Q6).
**On-step interactions** are listed in each page file and become storyboard items in Phase 4.
