<!-- INVARIANT: examples are single-line HTML comments so a fresh template parses to total=0 (MEMORY_EMPTY). Do NOT un-comment or split across lines. t100 guards this. -->
> This file is kept up to date automatically while the stage runs. Add observations at the review step, not by editing here directly.

## Interpretations
<!-- example: 2026-05-29T10:14:32Z — chose REST over GraphQL; the consuming team only needs CRUD, revisit if subscriptions land -->
- 2026-10-24T10:50:48Z — Used the PRD (prd.md) as the single document input; question options are drawn from it so the person mostly confirms. Other referenced docs (UX scenarios, design system) are left for later stages where they shape requirements and design.
- 2026-10-24T10:50:48Z — Added a question on how prerequisite records (Products, Suppliers, POs, Dispatch orders) enter the system, because the three core scenarios start from records created by roles outside the slice.

## Deviations
<!-- example: 2026-05-29T10:14:32Z — skipped the optional caching layer the stage prose suggested; the dataset is small enough that it adds risk -->

## Tradeoffs
<!-- example: 2026-05-29T10:14:32Z — picked TDD over BDD this run; the team is unit-first and the domain is well-understood -->
- 2026-10-24T10:50:48Z — The person kept every edge in at Q8 but had asked for a core-first round; a follow-up (Q10) resolved it toward the smallest round: offline queue, Issue decisions, Bangla and Excel import all move to later rounds. Setup screens (Q9) stay in because the core scenarios depend on records created by other roles.

## Open questions
<!-- example: 2026-05-29T10:14:32Z — confirm the retention window with compliance before the next stage hardens the schema -->
