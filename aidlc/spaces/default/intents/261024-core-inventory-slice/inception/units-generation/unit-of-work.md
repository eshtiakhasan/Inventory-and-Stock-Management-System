# Units of Work — Mojud core slice

Groups the 9 components in `inception/domain-design/components.md` (with the constraints in `decisions.md`) into three units, covering the requirements in `requirements.md` and the 12 stories in `stories.md`. Choices come from `units-generation-questions.md` (Q1–Q5).

## Deployment Model

One backend service holding every business block as a separate module (a modular monolith), one web app, and one PostgreSQL database, all started with one Docker Compose command (Q1). This keeps the shared database transaction that ADR-003 requires for Purchasing, Dispatch, Damage, Issues and StockLedger inside a single process. Module boundaries inside the backend follow the component catalogue: each module owns its tables and is called only through its public functions.

## Units

| Unit ID | Directory | Name | Kind | Complexity | Deployment |
|---|---|---|---|---|---|
| U1 | u1-walking-skeleton | walking-skeleton | (full design set) | M | Creates all three runtime parts: backend service, web app, database |
| U2 | u2-backend | backend | service | XL | Adds modules to the backend service from U1 |
| U3 | u3-frontend | frontend | ui | L | Adds screens to the web app from U1 |

### U1 — Walking skeleton

**Description.** The thinnest slice that runs end to end through browser, backend and database, plus the project foundations every later unit builds on (Q3, team practices Walking Skeleton).

**Responsibilities.**
- Repository layout for the backend service, the web app and shared types.
- Docker Compose with the web app, the backend service and PostgreSQL; `.env.example`; a documented fallback for running only the database in Docker or a local PostgreSQL.
- Database migration setup (forward-only migrations).
- Strict TypeScript, ESLint (TypeScript and React rules), Prettier, test runner and coverage report for backend and frontend.
- IdentityAccess module, first part: Business and User tables, sign-up (business plus first Owner), sign-in, sign-out, sessions, password hashing, and the caller context with business scoping.
- WebApp foundations: app shell (app bar, side nav, theme switch with light and dark tokens as CSS variables), English translation file, sign-up and sign-in screens, role landing (Setup home placeholder, My tasks placeholder, Dispatch orders placeholder, "coming in a later round").

**Delivers.** US1.1, US1.2.

**Constraints.** Must run with one command on Windows 10 Home with Docker Desktop (or the allowed fallback). Its end-to-end check is chosen and approved at the start of Construction.

### U2 — Backend

**Description.** All remaining business logic and its API, as modules of the backend service from U1 (Q5).

**Responsibilities.**
- IdentityAccess, rest: warehouses (3-active limit, deactivation check), users and roles, assigned warehouses, the FR2.2 permission table and warehouse scoping on every endpoint, refusing deactivated users.
- Catalogue: products, units and barcodes, product search, suppliers, opening stock.
- StockLedger: append-only movements, balances, never-negative rule with maximum, once-only action IDs, safe concurrent changes.
- Purchasing: purchase orders, statuses, edit and cancel rules, blind receiving API (no ordered quantities in responses), delivery completion.
- Dispatch: dispatch orders, reservation, edit and cancel, picking, confirm dispatch, damage orchestration and replacement.
- Damage: damage flags.
- Issues: creation of four types, read-only list.
- MyTasks: task list assembly.

**Delivers (backend part).** US1.3, US1.4, US2.1, US2.2, US3.1, US3.2, US4.1, US5.1, US5.2, US5.3, all acceptance criteria testable through the API.

**Constraints.** Purchasing, Dispatch, Damage, Issues and StockLedger share one database transaction per request (ADR-003). Business data isolation and the role table are tested on every endpoint (NFR2). 80% line coverage (team practices).

### U3 — Frontend

**Description.** All remaining screens on U2's API, from the refined mockups (Q5).

**Responsibilities.**
- Setup home and settings screens: warehouses, users, products with opening stock, suppliers (side panels).
- Purchase orders and dispatch orders: lists, create, edit, detail, cancel.
- My tasks, blind receiving, picking, Flag damage form, Type code dialog.
- Issues list.
- Our own components from the design system; WCAG 2.1 AA in both themes; accessibility checks in component tests.

**Delivers (user-facing part).** US1.3, US1.4, US2.1, US2.2, US3.1, US3.2, US4.1, US5.1, US5.2, US5.3 as usable screens.

**Constraints.** Never requests or displays ordered quantities on the receiving screen. Sends a unique action ID with every stock-changing request. Desktop from 1024px.

## Implementation Notes

- With this split, a story beyond U1 is complete only when both U2 (its backend) and U3 (its screen) are done.
- Unit boundaries follow layers after the skeleton, so U2 and U3 cannot be built in parallel; the order is fixed by their dependencies (see `unit-of-work-dependency.md`).

## Assumptions & Open Questions

None.
