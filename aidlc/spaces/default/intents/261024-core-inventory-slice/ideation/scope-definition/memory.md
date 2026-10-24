<!-- INVARIANT: examples are single-line HTML comments so a fresh template parses to total=0 (MEMORY_EMPTY). Do NOT un-comment or split across lines. t100 guards this. -->
> This file is kept up to date automatically while the stage runs. Add observations at the review step, not by editing here directly.

## Interpretations
<!-- example: 2026-05-29T10:14:32Z — chose REST over GraphQL; the consuming team only needs CRUD, revisit if subscriptions land -->
- 2026-10-24T11:30:00Z — Read Q2 "opening stock" as how stock first enters a warehouse, not as excluding receiving; receiving still adds stock because scenario 01 is in scope.
- 2026-10-24T11:30:00Z — Added a glossary to the scope document to answer intent-capture review finding R-01 (undefined product terms).

## Deviations
<!-- example: 2026-05-29T10:14:32Z — skipped the optional caching layer the stage prose suggested; the dataset is small enough that it adds risk -->

## Tradeoffs
<!-- example: 2026-05-29T10:14:32Z — picked TDD over BDD this run; the team is unit-first and the domain is well-understood -->

## Open questions
<!-- example: 2026-05-29T10:14:32Z — confirm the retention window with compliance before the next stage hardens the schema -->
- 2026-10-24T11:30:00Z — Duplicate-submission protection and carton/piece quantity entry were never offered as scope choices; left as assumptions for Requirements Analysis.
