# 10: Karim Signs In on the Shared Warehouse Phone

**Project:** Mojud (E2E_IAM)
**Created:** 2026-10-23
**Method:** Whiteport Design Studio (WDS)
**Priority:** P3
**Source journey:** UJ-8 (failure path) (EXPERIENCE.md → Key Flows)

---

## Transaction (Q1)

**What this scenario covers:**
Get onto the shared phone as himself, in his language, so his work is recorded under his own name.

---

## Business Goal (Q2)

**Goal:** Floor adoption
**Objective:** Objective 2 (SM-2)

---

## User & Situation (Q3)

**Persona:** [Karim the Warehouse Worker](../../B-Trigger-Map/personas/02-Karim-the-Warehouse-Worker.md) (Primary)
**Situation:** Karim, first morning after Mr. Haque set Mojud up, holding the warehouse phone and a slip of paper with his temporary password.

---

## Driving Forces (Q4)

**Hope:** Get in quickly and see his tasks in Bangla.

**Worry:** Recording under someone else's name on a shared phone, or getting stuck on an English screen.

---

## Device & Starting Point (Q5 + Q6)

**Device:** Mobile (shared low-end Android)
**Entry:** Opens the Mojud link (or installed icon) on the shared warehouse phone; sees Sign in.

---

## Best Outcome (Q7)

**User Success:**
Signed in as himself, password set, interface in Bangla, app installed to the home screen, and his name showing in the app bar.

**Business Success:**
Each floor action attributable to the right person (SM-3) from day one.

---

## Shortest Path (Q8)

1. **Sign in** — Sign in with phone number and temporary password
2. **Change temporary password** — Set his own password before seeing anything else
3. **Settings: Me** — Choose Bangla, install the app, see who is signed in ✓

---

## Trigger Map Connections

**Persona:** Karim the Warehouse Worker (Primary)

**Driving Forces Addressed:**
- ✅ **Want:** Feel the app is on his side
- ❌ **Fear:** Recording under someone else's name
- ❌ **Fear:** Looking foolish on a confusing screen

**Business Goal:** Objective 2 (SM-2)

---

## Scenario Steps

| Step | Folder | Purpose | Exit Action |
|------|--------|---------|-------------|
| 10.1 | `10.1-sign-in/` | Sign in with phone number and temporary password | Signs in and is sent to set his own password |
| 10.2 | `10.2-change-temporary-password/` | Set his own password before seeing anything else | Saves; goes to More → Settings: Me |
| 10.3 | `10.3-settings-me/` | Choose Bangla, install the app, see who is signed in | Switches to Bangla, taps Install app, returns to My tasks ✓ |

**First step** (10.1) includes full entry context (Q3 + Q4 + Q5 + Q6).
**On-step interactions** are listed in each page file and become storyboard items in Phase 4.
