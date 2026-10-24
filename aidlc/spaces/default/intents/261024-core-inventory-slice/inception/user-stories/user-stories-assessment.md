# User Stories Assessment

## Decision

Execute.

## Rationale

This round is user-facing and serves four distinct roles (Owner, Manager, Sales rep, Warehouse worker), each with its own goals on different screens. The requirements (`inception/requirements-analysis/requirements.md`) carry real business logic: blind receiving, reservation, damage with automatic replacement, and a stock record that must never go negative. Stories tie each requirement to the person it serves and give every behaviour a testable acceptance criterion, which the team practices (`team-practices.md`, test-after with 80% coverage) rely on.

## Factors Considered

| Factor | Finding |
|---|---|
| Project type | New product (greenfield), full-stack |
| User-facing scope | 14 screens across 4 active roles (wireframes W1–W14) |
| Personas | Already defined in your UX work: Mr. Haque (Owner), Karim (Warehouse worker), Tanvir (Sales rep), Rafiq (Manager) |
| Complexity signals | Stock states, reservation, blind counts, duplicate protection, concurrency |
| Cross-team work | None; one builder |

## Where Stories Add the Most Value

- Blind receiving and partial deliveries: the hidden quantities and the shortfall rule are easy to get subtly wrong.
- Picking and flagging damage: the replacement reservation and the "short" path need precise acceptance criteria.
- Permissions per role: stories make clear who may do what on each screen.

## Assumptions & Open Questions

None.
