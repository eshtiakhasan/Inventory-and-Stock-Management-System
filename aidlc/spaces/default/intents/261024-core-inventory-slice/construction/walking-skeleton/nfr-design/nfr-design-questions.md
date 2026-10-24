# NFR Design — walking-skeleton — Questions

> Context: the NFR requirements for U1 are settled (`nfr-requirements/`: Express + Kysely, Argon2id, Vitest + Playwright, pino). The architecture is a modular monolith (`components.md`, ADR-001). Only these design points are open.

## Q1. How should the daily clean-up of expired sessions run (BR2.3)?

A. Inside the backend: a timer runs once at start and then every 24 hours. If more than one backend instance runs later, a PostgreSQL advisory lock ensures only one does the clean-up.
B. A separate small container in Docker Compose that runs the clean-up on a schedule
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q2. When should database migrations run?

A. A one-off `migrate` service in Docker Compose runs the migrations and exits. The backend starts only after it succeeds.
B. The backend runs pending migrations itself at start, under a migration lock
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q3. How should the backend code keep modules apart (ADR-001)?

A. One folder per module (`identity`, later `catalogue`, `stock-ledger`, …). Each module exposes only an `index.ts` interface. An ESLint import rule blocks reaching into another module's internals. Each module owns its own tables.
B. Layer folders (`routes`, `services`, `repositories`) shared by all modules
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Consolidated Summary Confirmation

- Session clean-up (Q1): a timer inside the backend runs at start and then every 24 hours, guarded by a PostgreSQL advisory lock.
- Migrations (Q2): a one-off `migrate` service in Docker Compose runs the migrations and exits; the backend starts only after it succeeds. The NFR requirements text saying "migrations run at backend start" is updated to match.
- Modules (Q3): one folder per module, each exposing only `index.ts`; an ESLint import rule blocks reaching into another module's internals; each module owns its own tables.

Does this all look correct before I generate the artifact?

- Looks correct
- Request changes

[Answer]: Looks correct
