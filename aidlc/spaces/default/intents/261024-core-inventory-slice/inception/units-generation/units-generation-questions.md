# Units Generation — Questions

> Context: Domain Design (`components.md`, `decisions.md`) defined 9 components. ADR-003 requires Purchasing, Dispatch, Damage, Issues and the Stock ledger to save changes in one shared database transaction. This stage groups the components into units of work (pieces that are designed, built and tested one at a time) and maps the 12 stories to them. Your practices say the first unit is a thin end-to-end slice (walking skeleton). The order in which units are built is decided in the next planning stage, not here.

## Q1. How should the app be deployed?

A. One backend service containing all business blocks as separate modules (a "modular monolith"), one web app, and one PostgreSQL database, all started with Docker Compose. Keeps the shared transaction in ADR-003 simple
B. A separate backend service per business block. Independent deploys, but the shared transaction becomes a distributed one, which is much harder
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q2. How should the work be split into units?

A. Vertical feature slices: each unit delivers its stories end to end (screens, backend, database tables), about 6 units
B. By layer: a backend unit and a frontend unit
C. One unit per component: 9 units, each layer-free but not usable on its own
D. Not yet defined
X. Other (please specify)

[Answer]: B

## Q3. What should the first unit (the thin end-to-end slice) contain?

A. Project setup (repository layout, Docker Compose, database migrations, lint, formatting, test runner) plus real sign-up, sign-in and sign-out working end to end through the browser, backend and database
B. Project setup plus only a health page that reads and writes one test row; sign-up comes in a later unit
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q4. Can units that don't depend on each other be built in either order?

For example, purchasing and receiving does not depend on dispatch and picking; both depend on the stock ledger.

A. Yes: independent units may be built in any order (the next stage picks the order)
B. No: one strict chain, each unit depending on the one before
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q5. Follow-up: your answers point two ways. Which do you mean?

Splitting by layer (Q2: one backend unit, one frontend unit) clashes with the other two answers. The first unit must be a thin slice that runs end to end through browser, backend and database (Q3, and your walking-skeleton practice), and a layer unit can't run on its own. With only two layer units, the frontend always depends on the backend, so nothing could be built in either order (Q4).

A. Thin end-to-end first unit (setup + real sign-in), then the rest split by layer: a backend unit with all remaining business logic, then a frontend unit with all remaining screens
B. Thin end-to-end first unit, then vertical feature slices (about 5 more units, each with its own screens and backend), so independent ones can go in either order
C. Pure layers, no end-to-end first unit: backend unit first, frontend unit second (this drops the walking skeleton your practices require)
X. Other (please specify)

[Answer]: A

## Consolidated Summary Confirmation

- Deployment (Q1): one backend service holding every business block as a module (modular monolith), one web app, and one PostgreSQL database, all started with Docker Compose.
- Units (Q2 + Q5): three units.
  - U1 walking skeleton: project setup (repository layout, Docker Compose, database migrations, lint, formatting, test runner) plus real sign-up, sign-in and sign-out working end to end (Q3).
  - U2 backend: all remaining business logic and its API: warehouses, users and permissions, products and suppliers, stock ledger and opening stock, purchase orders and receiving, dispatch and picking, damage, Issues, My tasks.
  - U3 frontend: all remaining screens, built on U2's API.
- Order (Q4): independent units may go in any order, but with this split there are none: U2 needs U1, and U3 needs U2. The next planning stage confirms the sequence.

Does this all look correct before I generate the artifact?

- Looks correct
- Request changes

[Answer]: Looks correct
