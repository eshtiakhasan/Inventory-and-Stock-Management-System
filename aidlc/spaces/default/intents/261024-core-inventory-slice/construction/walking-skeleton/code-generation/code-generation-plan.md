# Code Generation Plan — walking-skeleton

## Summary

- Builds: the walking skeleton — npm-workspaces monorepo with a contracts package, the Express API (identity module: sign-up, sign-in, sign-out, sessions, CSRF, caller context), the React web app (sign up, sign in, app shell, role homes, theme), Docker Compose stack and `npm run verify`.
- Touches: repository root config, `packages/contracts/`, `apps/api/`, `apps/web/`, `docker-compose.yml`, `scripts/`, `.env.example`, `.gitignore`, `README.md`.
- Tests: about 75 tests — API unit tests (~30), API integration tests against PostgreSQL with Supertest (~25), contracts tests (~6), web component tests with React Testing Library and jest-axe (~12), and one Playwright smoke test inside `npm run verify`; 80% line coverage enforced.

## Inputs

Unit U1 walking-skeleton (`unit-of-work.md`; stories US1.1, US1.2). Design sources: `functional-design/` (functional-spec, rules BR1.1–BR5.2, entities, frontend-components), `nfr-requirements/` (NFR1.x–NFR9.1, tech-stack-decisions), `nfr-design/` (security, performance, scalability, reliability, observability, logical-components), `infrastructure-design/` (infrastructure-specification, monitoring-design, cicd-pipeline), contract C1/C2 (`contract-summary.md`), design tokens (`design-process/D-Design-System/design-tokens.md`, `refined-mockups/design-system-mapping.md`). All application code goes to the workspace root, never to the record directory.

## Testing Contract

```json
{
  "version": 1,
  "methodology": "test-after",
  "source": "team",
  "ordering": "Build each testable layer (database rules, backend logic and endpoints, frontend screens), then write and run that layer's tests before moving on to the next layer.",
  "scope": "mvp",
  "test_strategy": "standard",
  "project_type": "brownfield",
  "applicable_notes": [
    {
      "layer": "org",
      "text": "We treat tests as a first-class deliverable in every Bolt. The specific\nmethodology (TDD, BDD, ATDD, or classic test-after) is affirmed at\npractices-discovery and recorded in `team.md` under this heading with explicit\n`Methodology` and `Ordering` fields; Code Generation resolves those fields\nindependently from coverage, tooling, and scope notes.\n\nWhen no posture has been affirmed, our default per scope is:\n- **Methodology**: test-after\n- **Ordering**: implement each applicable testable layer, then write and run\n  that layer's tests.\n- `mvp`, `enterprise`, `feature`, `infra`, `classic` add an 80% line-coverage\n  floor and CI execution before merge.\n- `bugfix`, `security-patch` add a targeted regression for the specific\n  bug/vulnerability and require the existing suite to remain green.\n- `express` uses the Minimal strategy: requirement-driven unit tests (one per\n  requirement, with a happy-path floor per component); existing tests remain\n  green.\n- `poc`, `refactor`, `workshop` add no extra new-test floor and require the\n  existing suite to remain green.\n\nThe active `Test Strategy` still applies in every scope and determines test\nvolume/types. Scope floors are additive; they never reduce or replace the\nselected strategy.\n\nBuild and Test verifies defined coverage floors and affirmed quality targets;\nthey may not be weakened to make a step pass.\n\nAffirm a stricter posture in `team.md` if the team commits to one."
    },
    {
      "layer": "team",
      "text": "- **Methodology**: test-after\n- **Methodology evidence**: Chosen by the builder in the interview (Q3, option A), matching the `org.md` default. Writing each layer's tests right after building it is the easiest rhythm for a builder who is new to most of the stack; the ideation artifacts set no testing method and only require automated tests for the stock rules (intent statement S4, RAID R3).\n- **Ordering**: Build each testable layer (database rules, backend logic and endpoints, frontend screens), then write and run that layer's tests before moving on to the next layer.\n- **Must-test rules**: stock never goes negative, and every stock change is a permanent stock movement that is never edited or deleted. These rules have automated tests from the first Unit that touches stock (intent statement S4).\n- **Coverage floor**: at least 80% line coverage, measured on every test run. This is the `mvp` default in `org.md`; Build and Test checks it and it may not be lowered to make a step pass.\n- **Test types**: unit tests for backend logic and stock rules; integration tests for backend endpoints against a real PostgreSQL database; component tests for the key React screens. The volume of each follows the workflow's Standard test strategy.\n- **Tooling**: chosen when the code is designed in Construction. Suggested candidates are Vitest with its built-in coverage report, Supertest for backend endpoint tests, and React Testing Library for screens.\n- **Before merge**: the full test suite, the coverage check and the linter pass before a Bolt is merged to `main`. No CI exists yet, so these checks run locally before each merge until the CI Pipeline stage adds automatic checks on GitHub; from then on they also run in CI, as `org.md` asks."
    }
  ],
  "obligations": {
    "strategy": "standard",
    "strategy_volume": [
      "Five to eight tests per component.",
      "Unit tests plus integration tests for key boundaries.",
      "Add E2E, performance, or security tests when requirements demand them."
    ],
    "scope_floor": [
      "Meet an 80% line-coverage floor.",
      "Run the selected tests in CI before merge."
    ],
    "combination_rule": "Apply every selected-strategy obligation and every scope-floor obligation; neither replaces the other, and a targeted scope regression may add the narrowest necessary test type beyond the strategy default."
  },
  "plan_profile": {
    "methodology": "test-after",
    "runner_step": "Verify the existing test runner/configuration and record the exact unit-scoped command.",
    "runner_ready_before_first_test": true,
    "testable_layers": [
      "Data model / database behavior",
      "Repository / data access",
      "Business logic",
      "API / endpoint",
      "Frontend behavior"
    ],
    "steps": [
      "Project structure and production configuration skeleton.",
      "Verify the existing test runner/configuration and record the exact unit-scoped command.",
      "Data model / database behavior - implement.",
      "Data model / database behavior - write and run its tests after implementation.",
      "Repository / data access - implement.",
      "Repository / data access - write and run its tests after implementation.",
      "Business logic - implement.",
      "Business logic - write and run its tests after implementation.",
      "API / endpoint - implement.",
      "API / endpoint - write and run its tests after implementation.",
      "Frontend behavior - implement.",
      "Frontend behavior - write and run its tests after implementation.",
      "Environment/build configuration.",
      "Documentation and traceability."
    ]
  },
  "input_sha256": "sha256:a55996e68860e48ba8c7bd78e9b1009dbf6167454ea4f31526a053760fb6d153",
  "contract_sha256": "sha256:65b1337e0a45cb12ec2eb383127b8b44efda0b96b0886c6ed91c802b22156831"
}
```

Note on "CI execution before merge": no CI exists this round (infrastructure-design Q3; team Testing Posture "Before merge"), so the selected tests run through `npm run verify` locally before each merge; CI is added in a later round.

## Steps

### Step 1 — Project structure and production configuration skeleton (US1.1, US1.2; NFR9.1)

- [x] Root `package.json` with npm workspaces (`packages/*`, `apps/*`), Node 22 engines field, and scripts: `dev`, `up`, `down`, `db:reset`, `lint`, `typecheck`, `format`, `format:check`, `test`, `test:coverage`, `test:smoke`, `verify`, `logs:errors`.
- [x] `tsconfig.base.json` (strict, `noUncheckedIndexedAccess`, ES2022, NodeNext for api, Bundler for web) and project references.
- [x] `.prettierrc` (defaults), `.prettierignore`, `eslint.config.js` (flat config: typescript-eslint, react-hooks, `no-restricted-imports` for `modules/*/internal/**` and `platform/middleware` from modules, `no-restricted-syntax` banning `sql.raw` outside `apps/api/src/platform/db/sqlFileMigrationProvider.ts` and banning `as BusinessId` outside `apps/api/src/modules/identity/internal/ids.ts`).
- [x] `.gitignore`: add `!.env.example` (the existing `.env.*` rule would hide it), `dist/`, `coverage/`, `playwright-report/`, `test-results/`.
- [x] `packages/contracts/` (`@mojud/contracts`): zod schemas `SignUpSchema`, `SignInSchema` (`.strict()`, lengths per BR1.1/BR1.4), `CallerSchema`, `ErrorSchema`, `ErrorCode` union (VALIDATION_FAILED, DUPLICATE, NOT_SIGNED_IN, SESSION_ENDED, INVALID_CREDENTIALS, ACCOUNT_DEACTIVATED, FORBIDDEN, NOT_FOUND, INTERNAL_ERROR), `Role` enum (6 roles), `normalizePhone()` (returns `string | null`, never throws; BR1.2), and exported types.
- [x] `apps/api/src/platform/config.ts`: zod-validated env (`DATABASE_URL`, `POSTGRES_PASSWORD`, `APP_ORIGIN` list parsed and validated as origins, `COOKIE_SECURE`, `LOG_LEVEL`, `DB_POOL_MAX`, `PORT`), injectable `clock`, Argon2 parameters; exits with a clear message on a missing/invalid value (NFR1.12).

### Step 2 — Test runner bootstrap and exact unit-scoped commands (NFR7.1, NFR7.2)

- [x] Install Vitest, `@vitest/coverage-v8`, Supertest, React Testing Library, `@testing-library/user-event`, jsdom, jest-axe, Playwright.
- [x] `vitest.workspace.ts` with projects `contracts`, `api`, `web`; each project config sets `coverage.provider: 'v8'` and `coverage.thresholds.lines: 80`.
- [x] `apps/api/test/globalSetup.ts`: connects to the `postgres` maintenance database, creates `mojud_test` if missing, runs the migrator against it; `apps/api/test/helpers/db.ts` truncates identity tables between tests.
- [x] Add `packages/contracts/test/runner.test.ts` (asserts that `normalizePhone('01-234 5678')` returns `'012345678'`, so it tests real code) and run the runner-check command from `unit-test-instructions.md` to prove the runner works before the first layer's tests.

### Step 3 — Data model / database behavior: implement (BR1.3, BR1.5, BR2.3; NFR8.3)

- [x] `apps/api/migrations/0001_identity.sql`: `businesses(id uuid pk default gen_random_uuid(), name text not null check (length(btrim(name)) between 1 and 100), created_at timestamptz not null default now())`; `users(id uuid pk, business_id uuid not null references businesses(id), name text not null check (...), phone text not null constraint users_phone_key unique check (phone ~ '^[0-9]{6,15}$'), role text not null check (role in (6 roles)), password_hash text not null, active boolean not null default true, created_at timestamptz not null default now())`, index `users_business_id_idx`; `sessions(id_hash char(64) pk, user_id uuid not null references users(id) on delete cascade, csrf_token text not null, created_at, last_used_at, expires_at timestamptz not null)`, indexes on `expires_at` and `user_id`.
- [x] `apps/api/src/platform/db/sqlFileMigrationProvider.ts` (reads `migrations/*.sql` in name order, runs each with `sql.raw`) and `apps/api/src/platform/db/db.ts` (one `pg.Pool` with `max`, timeouts, and the `error` listener that logs at `warn`; Kysely instance; database types for the three tables).
- [x] `apps/api/src/migrate.ts`: runs the Kysely `Migrator` with the provider, logs results, exits 0 or 1.

### Step 4 — Data model / database behavior: write and run tests

- [x] `apps/api/test/db/schema.test.ts` (~6 tests): migration runs twice without error; phone unique constraint rejects a duplicate (23505 on `users_phone_key`); phone check rejects non-digits; role check rejects an unknown role; blank business name is rejected; deleting a user cascades its sessions.
- [x] Run `npx vitest run --project api apps/api/test/db` and fix until green.

### Step 5 — Repository / data access: implement (BR3.1, NFR2.1, NFR1.11)

- [x] `apps/api/src/modules/identity/internal/ids.ts`: branded `BusinessId`, `UserId` and their only constructors.
- [x] `apps/api/src/modules/identity/internal/repository.ts`: `createBusinessWithOwner(trx, …)`, `findUserByPhoneForSignIn(db, phone)`, `findSessionByIdHashGlobal(db, idHash)` (the joined SELECT from `security-design.md`), `insertSession`, `deleteSession`, `extendSession(db, idHash, now)`, `deleteExpiredSessionsGlobal(trx, now)`, `getCaller(db, businessId, userId)`; every business-owned query takes `businessId`.
- [x] `apps/api/src/modules/identity/internal/cleanup.ts`: transaction with `pg_try_advisory_xact_lock(hashtext('session-cleanup'))`, then the delete; `startSessionCleanup()` / `stop()` with an unref'd 24 h interval.

### Step 6 — Repository / data access: write and run tests

- [x] `apps/api/test/identity/repository.test.ts` (~8 tests): create business with owner in one transaction; failure injected after the business insert leaves no rows (NFR1.16); find by phone; session lookup returns joined caller fields and CSRF token; extend updates `expires_at`; delete removes; `getCaller` for business B with A's user returns nothing (twoBusinesses helper, NFR2.2); exports test: every function without `businessId` is on the allow-list (NFR2.1).
- [x] `apps/api/test/identity/cleanup.test.ts` (~3 tests): deletes only sessions expired more than 7 days; second concurrent run skips while the lock is held; a failing run logs an error and keeps the timer.
- [x] Run `npx vitest run --project api apps/api/test/identity/repository.test.ts apps/api/test/identity/cleanup.test.ts`.

### Step 7 — Business logic: implement (US1.1, US1.2; BR1.1–BR2.8; NFR1.1–NFR1.6, NFR1.9)

- [x] `internal/password.ts`: Argon2id hash/verify with config parameters; `DUMMY_HASH` built once at start.
- [x] `internal/tokens.ts`: `newSessionId()`, `newCsrfToken()` (32 random bytes, base64url), `hashSessionId()` (sha256 hex), `safeEqual()` (length check, then `timingSafeEqual`).
- [x] `internal/service.ts`: `signUp` (validate, normalize phone, duplicate check, transaction, map 23505 on `users_phone_key` to DUPLICATE, create session), `signIn` (uniform path with exactly one verify, INVALID_CREDENTIALS / ACCOUNT_DEACTIVATED), `signOut`, `resolveSession` (NOT_SIGNED_IN / SESSION_ENDED for expired or inactive, with delete), `authorize(caller, action, warehouseId?)` (signed in and active only in U1; BR2.7).
- [x] `modules/identity/index.ts`: exports `identityRouter`, `resolveCaller`, `authorize`, `Caller` type, `startSessionCleanup` only.
- [x] `apps/api/src/platform/errors.ts`: `AppError(code, field?)` with status map from the Error Catalogue.

### Step 8 — Business logic: write and run tests

- [x] `apps/api/test/identity/password.test.ts` (~4): hash starts with `$argon2id$`; verify right/wrong; one hash ≤ 500 ms (NFR5.5); plain password not in hash.
- [x] `apps/api/test/identity/tokens.test.ts` (~4): 32-byte base64url length; hash is 64 hex chars; `safeEqual` true/false; unequal lengths return false without throwing.
- [x] `apps/api/test/identity/service.test.ts` (~10, real test DB): sign-up creates owner and session; duplicate phone → DUPLICATE; concurrent duplicate sign-ups → one 201-equivalent, one DUPLICATE (NFR1.17); sign-in success; unknown phone, wrong password, invalid phone, missing fields, over-128 password → INVALID_CREDENTIALS with `verify` spy called exactly once each (NFR1.3); deactivated user with correct password → ACCOUNT_DEACTIVATED; expired session → SESSION_ENDED and row deleted (injected clock); inactive user's session → SESSION_ENDED; `authorize` allows an active caller.
- [x] `packages/contracts/test/schemas.test.ts` (~6): `normalizePhone` strips spaces and dashes, rejects 5 and 16 digits and letters, returns null instead of throwing; schemas reject unknown fields; password is not trimmed (8 spaces accepted at sign-up, BR1.1/BR1.4).
- [x] Run `npx vitest run --project api apps/api/test/identity/password.test.ts apps/api/test/identity/tokens.test.ts apps/api/test/identity/service.test.ts` and `npx vitest run --project contracts`.

### Step 9 — API / endpoint: implement (WF1–WF5; NFR1.7–NFR1.19, NFR8.6–NFR8.13)

- [x] `apps/api/src/platform/log.ts` (pino with redact paths, level from config, pretty in dev), `middleware/requestId.ts`, `middleware/originCheck.ts`, `middleware/authenticate.ts` (lookup only), `middleware/csrfCheck.ts`, `middleware/extendSession.ts`, `middleware/errorHandler.ts` (AppError map; body-parser errors → VALIDATION_FAILED, or INVALID_CREDENTIALS with a dummy verify when `POST /api/v1/auth/signin`; 500 with `requestId`), `X-Response-Time` header.
- [x] `apps/api/src/platform/health.ts` (`GET /api/v1/health`, `SELECT 1` with 1 s timeout, 200/503, logged at debug) and `openapi.ts` (`GET /api/v1/openapi.json` from zod schemas, including health).
- [x] `modules/identity/internal/routes.ts`: `POST /auth/signup` (201, cookie `mojud_session`, body Caller + csrfToken), `POST /auth/signin` (200), `POST /auth/signout` (204, clears cookie), `GET /auth/me` (200 Caller + csrfToken).
- [x] `apps/api/src/app.ts`: pipeline in the order of `security-design.md` (requestId → pino-http → helmet → originCheck → json 100kb → public routes → authenticate → csrfCheck → extendSession → routers → errorHandler).
- [x] `apps/api/src/server.ts`: start server, start clean-up, `uncaughtException`/`unhandledRejection` → fatal log + exit 1, SIGTERM/SIGINT → `shutdown()` (stop clean-up, close server, wait ≤ 10 s, end pool).

### Step 10 — API / endpoint: write and run tests

- [x] `apps/api/test/api/auth.test.ts` (~14, Supertest, real test DB, `Origin` set by helper): sign-up 201 with `Set-Cookie` attributes `HttpOnly; SameSite=Lax; Path=/` and no `Max-Age` (NFR1.5); validation errors per field 400; duplicate 409; sign-in 200; malformed JSON, unsupported charset and >100 KB body to sign-in → 401 INVALID_CREDENTIALS; >100 KB to sign-up → 400; `/auth/me` 200 then sign-out 204 then `/auth/me` 401 NOT_SIGNED_IN (AC1.2.4); missing/wrong `X-CSRF-Token` → 403 and session not extended; foreign `Origin`, `Origin: null`, bad Referer → 403 (NFR1.19); twoBusinesses: each session's `/auth/me` returns only its own business (NFR2.2).
- [x] `apps/api/test/api/platform.test.ts` (~8): security headers present (NFR1.14); `X-Request-Id` echoed or generated, included in 500 body; log line fields and redaction (captured stream: no password, cookie, CSRF token; NFR1.2, NFR1.18, NFR8.9–NFR8.11); health 200, and 503 when the pool is pointed at a dead database; route-inventory test (NFR1.8); pool `error` event does not crash (NFR8.6); `shutdown()` order with fakes (NFR8.8); config exits on missing variable (NFR1.12).
- [x] Run `npx vitest run --project api apps/api/test/api`.

### Step 11 — Frontend behavior: implement (FR1, FR2.3, FR18; BR4.1, BR5.1, BR5.2; M1, M2, M15)

- [x] `apps/web/` Vite + React 18 + TypeScript strict; `index.html` loading `/theme-init.js` (blocking, in `<head>`); `public/theme-init.js` (applies saved theme or device setting before first paint).
- [x] `src/styles/tokens.css` (design tokens as CSS variables for light and dark, from `design-tokens.md`), `src/styles/base.css` (system font stack, focus ring, skip link).
- [x] `src/i18n/en.json` + i18next setup; every screen string comes from keys (BR5.2).
- [x] `src/api/client.ts` (fetch with `credentials: 'include'`, `X-CSRF-Token` on non-GET, maps the Error shape to field/form errors), `src/session/SessionProvider.tsx` (TanStack Query `/auth/me`, `staleTime: Infinity`, reset on sign-in/out, 401 handling per `frontend-components.md`).
- [x] Components: `InputField`, `PasswordField` (Show/Hide), `ButtonPrimary`, `ButtonSecondary`, `FormErrorSummary` (takes focus), `ThemeSwitch` (Light/Dark/Device), `SkipLink`, `AppBar`, `SideNav` (items per role, `aria-current`), with `data-testid` on every interactive element.
- [x] Pages: `SignUpPage` (M1), `SignInPage` (M2), `SetupHomePlaceholder`, `DispatchOrdersPlaceholder`, `MyTasksPlaceholder`, `ComingLaterPage` (M15); router per the Routes table with `React.lazy` per route, redirects, "return to the page first asked for".
- [x] `vite.config.ts` dev proxy `/api` → `http://localhost:3000`.

### Step 12 — Frontend behavior: write and run tests

- [x] `apps/web/test/SignUpPage.test.tsx` (~5): field validation on blur with messages from `frontend-components.md`; server field error shown under field; typed values kept on error; button busy while saving; success navigates to Setup home.
- [x] `apps/web/test/SignInPage.test.tsx` (~4): INVALID_CREDENTIALS and ACCOUNT_DEACTIVATED shown in the summary, which takes focus; success goes to the remembered page; password Show/Hide.
- [x] `apps/web/test/shell.test.tsx` (~5): role landing per BR4.1 for all six roles (mocked caller); side-nav items per role; SESSION_ENDED shows the "session ended" message, NOT_SIGNED_IN shows none, first `/auth/me` 401 shows none; signed-in user opening `/signin` goes to role home.
- [x] `apps/web/test/theme.test.tsx` (~3): saved choice applied; Device removes saved choice; `theme-init.js` sets the attribute from storage.
- [x] `apps/web/test/a11y.test.tsx` (~3): jest-axe has no violations on Sign up, Sign in and the shell in both themes (NFR6.1); token contrast ≥ 4.5:1 for text pairs (NFR6.2).
- [x] Run `npx vitest run --project web`.

### Step 13 — Environment/build configuration (NFR8.1–NFR8.14; infrastructure-specification; cicd-pipeline)

- [x] `apps/api/Dockerfile` (multi-stage, `node:22-alpine`, `npm ci`, build contracts and api, copy `migrations/`, run as `node`), `apps/web/Dockerfile` (Vite build → `nginx:1.27-alpine`), `apps/web/nginx/default.conf` and `security-headers.conf` (headers with `always` included in every web location, `/assets/` immutable, `index.html` and `theme-init.js` no-cache, `/api/` proxy with no added headers, `/healthz`).
- [x] `docker-compose.yml`: `db`, `migrate`, `api`, `web` with health checks and timings, `depends_on` conditions, ports `127.0.0.1:8080:80` and `127.0.0.1:5433:5432`, named volume `pgdata`, memory limits, `restart` policies, `stop_grace_period`, json-file log rotation, `env_file: .env`.
- [x] `.env.example` with the local-only placeholder values and comments from `infrastructure-specification.md`.
- [x] `scripts/preflight.mjs` (Docker running, Compose ≥ v2.24, `.env` present, ports 8080 and 5433 free), `scripts/secret-scan.mjs`, `scripts/verify.mjs` (stages 0–6 with `spawnSync`, project `mojud-verify`, teardown in `finally` and on SIGINT/SIGTERM), `scripts/logs-errors.mjs`.
- [x] `apps/web/e2e/smoke.spec.ts` + `playwright.config.ts` (Chromium, base URL `http://127.0.0.1:8080`): unique 11-digit phone; sign up → Setup home within 2 s; sign out; sign in within 2 s; first load ≤ 2 s; 20 `/auth/me` calls median from `X-Response-Time` (fail > 200 ms); keyboard-only path with skip link and visible focus; web headers on `/`, an asset and `/theme-init.js`; dark theme applied on first load when saved.
- [x] `verification-command`: `npm run verify` → `node scripts/verify.mjs`.

### Step 14 — Documentation and traceability

- [x] `README.md` (root): prerequisites (Docker Desktop with WSL 2, Node 22), `cp .env.example .env`, `npm ci`, `npm run dev` (db in Docker, API and web with hot reload), `npm run up`, `npm run verify`, `npm run db:reset`, troubleshooting (ports in use, Docker not running).
- [x] Inline doc comments on the module interface (`modules/identity/index.ts`), the request pipeline (`app.ts`) and the global-lookup exceptions.
- [ ] `code-summary.md`, `source-manifest.json` and `traceability.json` in this record folder; tick each step's checkboxes here as it finishes.

## Story-to-Step Traceability

| Story / AC | Steps |
|---|---|
| US1.1 Sign up a business (AC1.1.1, AC1.1.2, AC1.1.3, AC1.1.5) | 1, 3–4, 5–6, 7–8, 9–10, 11–12, 13 |
| US1.1 AC1.1.4 business isolation | Foundation in 5–6 and 10 (twoBusinesses helper); record-by-ID check deferred to the backend unit (functional-design traceability) |
| US1.2 Sign in and out (AC1.2.1, AC1.2.2, AC1.2.4, AC1.2.5) | 1, 5–6, 7–8, 9–10, 11–12, 13 |
| US1.2 AC1.2.3 deactivated user | Rule built in 7–8 (tested at service level); end-to-end check deferred to the backend unit |
| US1.2 AC1.2.6 accessibility | Skeleton screens in 12 and 13; full pass deferred to the frontend unit |

## Assumptions & Open Questions

None.
