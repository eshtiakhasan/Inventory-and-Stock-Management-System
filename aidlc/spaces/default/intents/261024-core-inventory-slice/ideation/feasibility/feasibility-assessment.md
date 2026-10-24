# Feasibility Assessment — Mojud core slice

Input: the intent statement (`ideation/intent-capture/intent-statement.md`, "intent-statement") and the answers in `feasibility-questions.md`. No market research was run for this workflow.

## Verdict

**Feasible, with one blocker to clear first.** The core slice (sign-up, blind receiving, picking with damage flags, plus minimal setup screens) is technically straightforward for a single-builder web app. Nothing in it needs outside systems, special compliance work or paid services. The one blocker is that Docker is not yet installed on the build machine.

## Technical Viability

| Area | Assessment | Basis |
|---|---|---|
| Integrations | None needed. The app stands alone with its own database, so there are no outside systems to depend on or wait for. | Q1 |
| Compliance | No legal or data-protection work this round, because only demo and test data is used. This must be revisited before any real distributor data is entered. | Q2 |
| Core rules (stock never negative, permanent stock movements) | Viable. These are well-understood record-keeping rules. They are the part most worth getting right first, and they are covered by success outcome S4 in the intent statement. | intent-statement S4 |
| Scanning | Kept simple: the scan overlay accepts a typed SKU or product search. This avoids the browser camera restriction (camera only on secure pages or `localhost`) and the extra setup needed to test from a phone. | Q6 |
| Running locally | Viable once Docker is installed. On Windows 10 Home, Docker Desktop needs WSL 2 (the Windows Subsystem for Linux). | Q5 |
| Builder experience | The builder is a beginner across most of the chosen tools. This is manageable if the design stays simple, uses few moving parts, and explains its choices. | Q3 |
| Time and money | No deadline and no budget limit, so schedule pressure is not a risk this round. | Q4 |

## Risk Analysis

| Risk | Likelihood | Impact | Response |
|---|---|---|---|
| Docker Desktop or WSL 2 fails to install or run on Windows 10 Home (for example, virtualization turned off in BIOS, or an outdated Windows build) | Medium | High: the app cannot run as planned | Set up and test Docker before construction starts; keep a fallback of running the database alone in Docker, or a locally installed PostgreSQL |
| Beginner builder gets stuck on unfamiliar tools | Medium | Medium: slower progress | Keep the design to one backend, one frontend and one database; explain choices in plain words; build in small, testable steps |
| Stock rules implemented wrongly (stock goes negative or records get changed) | Low to medium | High: breaks the product's core promise | Treat these rules as must-test items with automated tests (S4) |
| Scope creeps back toward the full PRD | Medium | Medium | The intent statement fixes the boundary; later rounds hold the rest |

## Assumptions & Open Questions

None.
