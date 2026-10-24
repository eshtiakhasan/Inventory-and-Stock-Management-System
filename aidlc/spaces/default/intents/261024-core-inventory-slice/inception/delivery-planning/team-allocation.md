# Team Allocation — Mojud core slice

A **Bolt** is one build pass over a piece of the work that ends in running, tested code (see `bolt-plan.md`). A **mob** is the group that works on a Bolt together; here it is one builder working with the AI. Inputs: `unit-of-work.md`, `unit-of-work-dependency.md`, `unit-of-work-story-map.md`, `requirements.md`, `stories.md`, `mockups.md`, `components.md`, `contract-summary.md` and the team practices (`team-practices.md`).

Team Formation did not run in this workflow (`mvp`), so every Bolt is built by the AI developer (aidlc-developer-agent) in this session, with you reviewing and approving. There is one team, so no program board is needed.

| Bolt | Unit | Built by | Reviewed and approved by |
|---|---|---|---|
| B1 Walking skeleton | U1 | AI developer | You |
| B2 Stock ledger and opening stock | U2 | AI developer | You |
| B3 Remaining setup | U2 | AI developer | You |
| B4 Purchasing, receiving and Issues | U2 | AI developer | You |
| B5 Dispatch, picking, damage and My tasks | U2 | AI developer | You |
| B6 Setup and order screens | U3 | AI developer | You |
| B7 Floor screens and Issues list | U3 | AI developer | You |

**Staffing:** one session runs all the work (solo ownership), because you are the only person on this project (intent capture). Bolts run one after another.

**Your part:** approve each code plan before it is built, approve the verification command, approve the working skeleton, and decide on any failure. After the skeleton, routine checkpoints continue automatically (team practices). You push `main` to GitHub when you choose.

## Assumptions & Open Questions

None.
