# RAID Log — Mojud core slice

Risks, Assumptions, Issues and Dependencies for this round, based on the intent statement ("intent-statement") and the feasibility assessment.

## Risks

| ID | Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| R1 | Docker Desktop or WSL 2 will not install or run on Windows 10 Home | Medium | High | Install and test before construction; fallback is running the database alone in Docker or a locally installed PostgreSQL | Builder |
| R2 | Beginner builder slowed by unfamiliar tools | Medium | Medium | Simple design with few moving parts; small, testable steps; choices explained | Builder |
| R3 | Stock rules (never negative, permanent movements) built wrongly | Low to medium | High | Automated tests for these rules from the start (success outcome S4) | Builder |
| R4 | Scope grows back toward the full PRD | Medium | Medium | Hold the boundary set in the intent statement; defer extras to later rounds | Builder |

## Assumptions

| ID | Assumption | Status |
|---|---|---|
| A1 | Only demo and test data is used this round (Q2) | Confirmed |
| A2 | Typed SKU or product search is enough for the scan overlay this round (Q6) | Confirmed |

## Issues

| ID | Issue | Impact | Action | Owner |
|---|---|---|---|---|
| I1 | Docker is not installed on the build machine (Q5) | Blocks running the app locally | Install Docker Desktop with WSL 2 and confirm it runs a test container before construction starts | Builder |

## Dependencies

| ID | Dependency | Needed by | Status |
|---|---|---|---|
| D1 | Working Docker Desktop with WSL 2 on the build machine | Construction (first run of the app) | Not yet in place (I1) |
| D2 | Approved PRD and UX design documents as the source of requirements | Requirements and design stages | In place |

## Assumptions & Open Questions

None.
