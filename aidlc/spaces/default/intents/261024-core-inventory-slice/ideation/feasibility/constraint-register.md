# Constraint Register — Mojud core slice

Constraints that bound this round, drawn from the intent statement ("intent-statement") and `feasibility-questions.md`.

## Technical Constraints

| ID | Constraint | Fixed or flexible | Source |
|---|---|---|---|
| C-T1 | The app is built with TypeScript, a React frontend, a Node backend and a PostgreSQL database | Fixed (your choice) | Initial request |
| C-T2 | It runs only on the builder's machine, started with Docker Compose; no cloud deployment | Fixed this round | Initial request |
| C-T3 | The build machine runs Windows 10 Home, so Docker Desktop needs WSL 2 | Fixed (environment) | Q5 |
| C-T4 | No connections to other systems; the app has its own database | Fixed this round | Q1 |
| C-T5 | Scanning means typed SKU or product search; no camera access this round | Fixed this round | Q6 |

## Organizational Constraints

| ID | Constraint | Source |
|---|---|---|
| C-O1 | One person builds, decides scope and approves the work | Intent capture Q5, Q6 |
| C-O2 | The builder is a beginner across most of the stack, so the design must stay simple and be explained | Q3 |
| C-O3 | No deadline and no budget limit | Q4 |

## Regulatory Constraints

| ID | Constraint | Source |
|---|---|---|
| C-R1 | None this round, because only demo and test data is used. Using real distributor data later would bring data-protection duties. | Q2 |

## Assumptions & Open Questions

None.
