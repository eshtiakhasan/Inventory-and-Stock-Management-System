# NFR Requirements — walking-skeleton — Questions

> Context: the walking skeleton (U1) sets the base that U2 and U3 build on: the Node backend, the React web app, the PostgreSQL database and Docker Compose (`unit-of-work.md`). Requirements NFR1–NFR9 already fix most targets (for example: saves within 2 seconds, 80% coverage, one Compose command, passwords as salted slow hashes). The stack (TypeScript, React, Node, PostgreSQL) is mandated. Only the library choices below are open.

## Q1. Which backend web framework and database library should we use?

The stock ledger (U2) needs row locks and transactions in plain SQL, so the database library must allow them easily.

A. Express with Kysely (typed SQL query builder) and plain SQL migration files
B. Fastify with Drizzle ORM and Drizzle migrations
C. Express with Prisma ORM and Prisma migrations
D. Not yet defined
X. Other (please specify)

[Answer]: A

## Q2. Which password-hashing function should we use?

A. Argon2id (current OWASP first choice)
B. bcrypt (cost 12)
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q3. Which test tools should we use?

A. Vitest with built-in coverage for backend and frontend, Supertest for endpoint tests against a real test database, React Testing Library for screens, and one Playwright browser smoke test for `npm run verify`
B. Jest with Supertest and React Testing Library, and an API-only smoke test (no browser)
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q4. How should the backend log?

A. Structured JSON logs (pino) to the console, one line per request with a request ID, status and duration; passwords, cookies and CSRF tokens are never logged
B. Plain text console logs for errors only
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Consolidated Summary Confirmation

- Backend (Q1): Express with Kysely and plain SQL migration files.
- Passwords (Q2): Argon2id.
- Tests (Q3): Vitest with coverage, Supertest against a real test database, React Testing Library, and one Playwright browser smoke test inside `npm run verify`.
- Logging (Q4): pino JSON logs to the console, one line per request with request ID, status and duration; passwords, cookies and CSRF tokens are never logged.

Does this all look correct before I generate the artifact?

- Looks correct
- Request changes

[Answer]: Looks correct
