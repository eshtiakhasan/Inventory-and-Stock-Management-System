# Unit Test Instructions — walking-skeleton

Standard test strategy plus the `mvp` floor (80% line coverage). Methodology is test-after: each layer is built, then its tests are written and run (Testing Contract in `code-generation-plan.md`).

## Framework Setup

- **Runner:** Vitest with three projects in `vitest.workspace.ts`: `contracts` (node), `api` (node, `globalSetup: apps/api/test/globalSetup.ts`, `pool: 'forks'`, `fileParallelism: false` so tests share one test database safely), `web` (jsdom, `setupFiles: apps/web/test/setup.ts` with `@testing-library/jest-dom` and `jest-axe`).
- **Coverage:** `@vitest/coverage-v8`, `coverage.thresholds.lines: 80` in each project; reports `text` and `html` to `coverage/`.
- **Endpoint tests:** Supertest against `createApp()` (no network port).
- **Browser smoke:** Playwright Chromium, run only by `npm run verify` stage 5 (not a unit test).

## Prerequisites

1. Docker Desktop running; `cp .env.example .env`.
2. `npm ci`.
3. Database for API tests: `docker compose up -d --wait db` (host port 5433). The API global setup creates `mojud_test` if missing and migrates it on every run, so no manual step is needed (NFR7.2). `TEST_DATABASE_URL` comes from `.env`.

## Commands for This Unit (exact, unit-scoped)

All commands are run from the repository root. They name this unit's test paths only.

| What | Command |
|---|---|
| Runner check (Step 2, before the first real test) | `npx vitest run --project contracts packages/contracts/test/runner.test.ts` |
| Contracts tests | `npx vitest run --project contracts packages/contracts/test` |
| Database tests | `npx vitest run --project api apps/api/test/db` |
| Identity repository, clean-up, password, tokens, service | `npx vitest run --project api apps/api/test/identity` |
| API endpoint and platform tests | `npx vitest run --project api apps/api/test/api` |
| Web component tests | `npx vitest run --project web apps/web/test` |
| All of this unit with coverage | `npx vitest run --coverage packages/contracts/test apps/api/test apps/web/test` |

## Expected Coverage

- At least 80% line coverage for `packages/contracts/src`, `apps/api/src` and `apps/web/src`, each measured separately. The run fails below it; the threshold is never lowered.
- Excluded from coverage: `apps/api/src/server.ts` and `apps/api/src/migrate.ts` (process entry points, exercised by the smoke test), `apps/web/src/main.tsx`, generated types and test files.

## Test Volume (Standard: 5–8 per component)

| Component | File(s) | Tests |
|---|---|---|
| contracts schemas and phone | `packages/contracts/test/schemas.test.ts` | ~6 |
| database schema | `apps/api/test/db/schema.test.ts` | ~6 |
| identity repository + clean-up | `apps/api/test/identity/repository.test.ts`, `cleanup.test.ts` | ~11 |
| password + tokens | `apps/api/test/identity/password.test.ts`, `tokens.test.ts` | ~8 |
| identity service | `apps/api/test/identity/service.test.ts` | ~10 |
| auth endpoints | `apps/api/test/api/auth.test.ts` | ~14 |
| platform (headers, logs, health, config, shutdown) | `apps/api/test/api/platform.test.ts` | ~8 |
| web screens, shell, theme, a11y | `apps/web/test/*.test.tsx` | ~20 |

Each file covers the happy path and at least two error or edge cases (construction phase rules).

## Mocking and Stubbing

- **Database:** never mocked in `api` tests: integration tests use the real `mojud_test` database (team Testing Posture). Tables are truncated between tests by `test/helpers/db.ts`.
- **Clock:** injected through `config.clock`; tests set a fixed time to cross the 12-hour expiry and the 7-day clean-up boundary.
- **Hash verifier:** `vi.spyOn(password, 'verify')` to assert exactly one verify on every sign-in failure path.
- **Failure injection:** a test-only hook on the repository throws after the business insert (transaction test); a pool pointed at an unused port makes `/health` return 503.
- **Logs:** a pino destination stream captured in memory for log-field and redaction tests.
- **Web:** `fetch` is stubbed with `vi.fn()` per test (no network); TanStack Query client is created fresh per test.

## Test Data

- Built by helpers: `test/helpers/factories.ts` (`aSignUp()`, unique phone per call) and `test/helpers/twoBusinesses.ts` (businesses A and B with signed-in Supertest agents holding cookie and CSRF token).
- No shared fixtures between files; every test creates what it needs.
- The Playwright smoke test uses a unique 11-digit phone (`01` + last 9 digits of `Date.now()`) and runs against the throw-away `mojud-verify` Compose project.
