# Risk and Sequencing Rationale — Mojud core slice

Why the Bolts in `bolt-plan.md` come in this order (a Bolt is one build pass that ends in running, tested code). Inputs: `unit-of-work-dependency.md`, `unit-of-work.md`, `unit-of-work-story-map.md`, `requirements.md`, `stories.md`, `mockups.md`, `components.md`, `contract-summary.md`, the team practices (`team-practices.md`) and the answers in `delivery-planning-questions.md`.

## Heuristic

**Walking skeleton first, then risk first** (Cockburn's walking skeleton; Boehm's risk-first spiral). A walking skeleton is the thinnest version that runs end to end, built first to prove the parts connect. No formal scoring model (such as WSJF, which ranks work by value and urgency over size) was used: the unit dependencies already fix the order of units, and the only open choice was the order inside the large backend unit.

## Order and Why

| Position | Bolt | Reason |
|---|---|---|
| 1 | B1 Walking skeleton | Team practice requires it; also tackles your top worry, Docker on Windows, before anything is built on it |
| 2 | B2 Stock ledger and opening stock | Risk first (Q1): the never-negative, never-edited and applied-once rules are the product's core promise and the riskiest design (ADR-002, ADR-003); proving them before purchasing and dispatch avoids late rework, which the Units Generation review flagged |
| 3 | B3 Remaining setup | Permissions and setup data are needed by every order flow |
| 4 | B4 Purchasing, receiving and Issues | First use of the shared transaction across modules; receiving supplies stock for later flows |
| 5 | B5 Dispatch, picking, damage and My tasks | Builds on the ledger and Issues; completes the backend |
| 6 | B6 Setup and order screens | Desk screens first, so the floor screens have real data to show |
| 7 | B7 Floor screens and Issues list | Completes the full journey |

## Deviation From the Dependency Order

None. The unit order U1 → U2 → U3 is the only order the dependencies allow. Inside U2, B2 builds the minimal warehouse and product tables the ledger needs before B3 adds the rest of setup; this reorders work within one unit only.

## Risk Register

| Risk | Likelihood | Impact | Mitigation | Bolt |
|---|---|---|---|---|
| Docker Desktop or WSL 2 will not run on Windows 10 Home | Medium | High | Check first in B1; allowed fallback is the database alone in Docker or a local PostgreSQL | B1 |
| Stock rules subtly wrong (negative stock, double-counting, edits to history) | Medium | High | Must-pass tests written in B2 before other modules use the ledger, including simultaneous requests | B2 |
| Learning curve on the stack slows progress | High | Medium | Small Bolts with a running result each; code plans explained before building | All |
| Large amount of screen work | Medium | Medium | Split into two Bolts; reuse design-system components | B6, B7 |
| Contract gaps accepted at Contract Design (missing schemas, read permissions, apply-once details) | High | Medium | Filled in during each unit's Functional Design before code is planned | B2–B5 |
| No user-visible flow until U3 | High | Low | API scenario demos at the end of B2–B5 | B2–B5 |

## Assumptions & Open Questions

None.
