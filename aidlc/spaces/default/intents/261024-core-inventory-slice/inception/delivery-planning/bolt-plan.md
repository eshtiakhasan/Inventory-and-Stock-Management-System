# Bolt Plan — Mojud core slice

A **Bolt** is one build pass over a piece of the work that ends in running, tested code you can check. This plan orders seven Bolts across the three units in `unit-of-work.md`, following `unit-of-work-dependency.md` (U1 → U2 → U3) and `unit-of-work-story-map.md`. Inputs also include `requirements.md`, `stories.md`, `mockups.md`, `components.md`, `contract-summary.md` and the team practices (`team-practices.md`). Answers are in `delivery-planning-questions.md`.

The build runs unit by unit, one at a time (serial). Bolts B2–B5 are planned slices inside U2, and B6–B7 inside U3: they set the order of work and the check at the end of each slice, while the workflow still builds and approves each unit as a whole.

## Sequence

| # | Bolt | Unit | Stories | Walking skeleton |
|---|---|---|---|---|
| B1 | Walking skeleton | U1 | US1.1, US1.2 (Owner path) | **Yes** |
| B2 | Stock ledger and opening stock | U2 | US2.1 (backend) | — |
| B3 | Remaining setup | U2 | US1.3, US1.4 (backend) | — |
| B4 | Purchasing, receiving and Issues | U2 | US2.2, US3.2 (backend) | — |
| B5 | Dispatch, picking, damage and My tasks | U2 | US3.1, US4.1, US5.1, US5.2, US5.3 (backend) | — |
| B6 | Setup and order screens | U3 | US1.3, US1.4, US2.1, US2.2, US4.1 | — |
| B7 | Floor screens and Issues list | U3 | US3.1, US3.2, US5.1, US5.2, US5.3 | — |

## B1 — Walking skeleton (U1)

A walking skeleton is the thinnest version that runs the whole way through, built first to prove the pieces connect.

- **Includes:** Docker Desktop check first; repository layout (backend service, web app, shared `@mojud/contracts` package); Docker Compose for web app, backend and PostgreSQL; forward-only migrations; strict TypeScript, ESLint, Prettier, test runner with coverage; IdentityAccess sign-up, sign-in, sign-out, sessions with CSRF; app shell with theme switch, English translation file and role landing placeholders.
- **Proves:** browser → API → module → PostgreSQL, sessions and migrations all work together on this Windows machine.
- **Definition of Done:** one command starts everything from a clean checkout; an Owner can sign up in the browser, sign out and sign in again; tests and lint pass with at least 80% line coverage; the approved verification command passes.
- **Confidence hypothesis:** the chosen stack runs reliably under Docker on Windows 10 Home (or the allowed database fallback), so later Bolts build on a working base.
- **Expected demo:** run the start command, open the browser, sign up "Haque Traders", land on the Setup home, sign out, sign back in.

## B2 — Stock ledger and opening stock (U2)

- **Includes:** StockLedger module (append-only movements, balances, never-negative with maximum, once-only `Idempotency-Key` handling, row locking in a fixed order); the warehouses and products tables it needs (minimal create endpoints); opening stock endpoint.
- **Proves:** the riskiest rules hold before anything else depends on them.
- **Definition of Done:** must-pass tests green: stock never negative (including two simultaneous requests for the last unit), no edit or delete path for movements, a repeated key applies once, balances equal the sum of movements; opening stock recorded once per product and warehouse.
- **Confidence hypothesis:** the ledger design is correct and fast enough that purchasing and dispatch can rely on it unchanged.
- **Expected demo:** API test run showing the concurrency and repeat-request tests passing.

## B3 — Remaining setup (U2)

- **Includes:** warehouse rules (3 active, deactivation check), users and roles, assigned warehouses, the full permission matrix on every endpoint, refusing deactivated users, product edit and search, suppliers.
- **Definition of Done:** API tests for every FR2.2 row (allowed and refused), business data isolation tests, user and warehouse rules; coverage held at 80%.
- **Confidence hypothesis:** permissions can be enforced on every endpoint from one place without slowing requests.
- **Expected demo:** API tests show a Sales rep refused on setup endpoints and a worker limited to their warehouse.

## B4 — Purchasing, receiving and Issues (U2)

- **Includes:** purchase orders (create, edit, send, cancel), blind receiving endpoints, delivery completion with Shortfall and Over-delivery Issues in the same transaction, the Issues module.
- **Definition of Done:** API tests for US2.2 and US3.2 criteria; a contract test proves the receiving responses contain no ordered quantity; repeated save requests apply once.
- **Confidence hypothesis:** the shared transaction across Purchasing, StockLedger and Issues behaves as designed.
- **Expected demo:** API scenario: send a PO for 100, receive 92, complete, see a Shortfall Issue and 92 Available.

## B5 — Dispatch, picking, damage and My tasks (U2)

- **Includes:** dispatch orders (create, edit, cancel with release), picking and confirm dispatch, Damage module with replacement reservation and short lines, Issues list endpoint, My tasks endpoint.
- **Definition of Done:** API tests for US3.1, US4.1, US5.1, US5.2, US5.3 criteria; damage replacement and short-line cases; whole backend at 80% line coverage.
- **Confidence hypothesis:** the full backend supports every story's flow through the API alone.
- **Expected demo:** API scenario: reserve 20, flag 1 damaged with and without spare stock, confirm dispatch, list Issues and My tasks.

## B6 — Setup and order screens (U3)

- **Includes:** Setup home, warehouses, users, products with opening stock, suppliers (side panels), purchase orders and dispatch orders (lists, create, edit, detail, cancel).
- **Definition of Done:** each screen meets its story's criteria end to end in the browser; component tests with accessibility checks pass; light and dark themes checked.
- **Confidence hypothesis:** the design system can be built as our own components at a steady pace.
- **Expected demo:** set up a business from empty to a sent purchase order and a dispatch order, in the browser.

## B7 — Floor screens and Issues list (U3)

- **Includes:** My tasks, blind receiving with Type code, picking with Flag damage form, Issues list.
- **Definition of Done:** every story's criteria pass end to end in the browser; the whole app passes the verification command; coverage at 80%.
- **Confidence hypothesis:** the full core slice works for all four active roles on this machine.
- **Expected demo:** the full journey: Owner setup → Manager PO → worker receives with a shortfall → Sales rep orders → worker picks and flags damage → Owner sees the Issues.

## Construction Settings

- **Order:** one unit at a time through its design stages and build (unit-major), serial, with checkpoints.
- **After the skeleton:** later checkpoints continue automatically once you approve the working skeleton (team practices); you still approve plans, the verification command and any failure.
- **Branching:** each Bolt on a short-lived branch from `main`, squash-merged into `main` locally; you push later (team practices).

## Assumptions & Open Questions

None.
