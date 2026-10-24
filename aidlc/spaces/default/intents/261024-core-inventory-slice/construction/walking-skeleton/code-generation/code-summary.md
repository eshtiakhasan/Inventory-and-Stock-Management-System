# Code Summary — walking-skeleton

The walking skeleton (U1) is built on branch `bolt/b1-walking-skeleton` from the approved `code-generation-plan.md`. It has not been committed yet. `npm run verify` passes all stages 0–6.

## Files Created or Modified

| Area | Files |
|---|---|
| Root | `package.json` (npm workspaces and scripts), `package-lock.json`, `tsconfig.base.json`, `tsconfig.json`, `tsconfig.tools.json`, `.prettierrc`, `.prettierignore`, `eslint.config.js`, `vitest.config.ts`, `.env.example`, `.dockerignore`, `docker-compose.yml`, `.gitignore` (modified: `!.env.example`, build and test output folders), `README.md` (rewritten in UTF-8) |
| Scripts | `scripts/preflight.mjs`, `secret-scan.mjs`, `verify.mjs`, `logs-errors.mjs`, `dev.mjs`, `lib/npm.mjs` |
| Contracts | `packages/contracts/src/{index,errors,phone,roles,schemas}.ts`; tests `runner.test.ts`, `schemas.test.ts` |
| API platform | `apps/api/src/{app,server,migrate}.ts`; `platform/{config,errors,validation,log,http,health,openapi,shutdown}.ts`; `platform/db/{db,migrations,sqlFileMigrationProvider}.ts`; `platform/middleware/{requestId,responseTime,httpLogger,originCheck,authenticate,csrfCheck,extendSession,errorHandler}.ts` |
| API identity module | `apps/api/src/modules/identity/index.ts`; `internal/{ids,types,repository,cleanup,password,tokens,service,routes}.ts`; `apps/api/migrations/0001_identity.sql` |
| API tests | `apps/api/test/globalSetup.ts`; `helpers/{db,factories,twoBusinesses,app}.ts`; `db/schema.test.ts`; `identity/{repository,cleanup,password,tokens,service}.test.ts`; `api/{auth,platform}.test.ts` |
| Web app | `apps/web/{index.html,vite.config.ts,playwright.config.ts}`; `public/theme-init.js`; `src/{main,App}.tsx`; `styles/{tokens,base}.css`; `i18n/{en.json,index.ts}`; `api/client.ts`; `session/{SessionProvider.tsx,roles.ts}`; `theme/theme.ts`; `components/{InputField,PasswordField,RefusalMessage,Buttons,FormErrorSummary,SkipLink,ThemeSwitch,AppBar,SideNav}.tsx`; `layouts/Layouts.tsx`; `pages/{SignUpPage,SignInPage,Placeholders}.tsx`, `pages/usePageTitle.ts` |
| Web tests | `apps/web/test/{setup.ts,helpers.tsx,SignUpPage,SignInPage,shell,theme,a11y}.test.tsx`; `e2e/smoke.spec.ts` |
| Containers | `apps/api/Dockerfile`, `apps/web/Dockerfile`, `apps/web/nginx/{default,security-headers}.conf` |

## Key Implementation Decisions

- **Request pipeline.** The API runs requests through this sequence, as in `security-design.md`: requestId → response-time → pino-http (with redaction) → helmet → originCheck (any `APP_ORIGIN` entry) → JSON body limit 100 KB → public routes → authenticate (one joined SELECT) → csrfCheck → extendSession → protected routes → errorHandler.
- **Sign-in failures.** Every sign-in failure runs exactly one Argon2id verify, against a dummy hash when needed, and returns 401 INVALID_CREDENTIALS. That includes body-parser errors, which are matched by method and path.
- **Warm-up at start.** `server.ts` runs the dummy hash check once before it starts listening. Without it, the first sign-up after a cold start missed the 2 s target (see Deviations).
- **Business ID.** `BusinessId` is a branded type built only in `internal/ids.ts`. ESLint bans `as BusinessId` casts and `sql.raw` outside the migration provider. A test lists the global lookups that are allowed to run without a business ID.
- **Session clean-up.** Clean-up runs in one transaction under `pg_try_advisory_xact_lock`, once at start and then every 24 h.
- **Migrations.** A custom SQL-file provider feeds Kysely's `Migrator`. The same migrator runs in the one-off `migrate` Compose service and in the Vitest global setup, which also creates `mojud_test` if it is missing.
- **Containers.** Docker Compose runs four services: `db`, `migrate`, `api` and `web`. Each has a health check with explicit timings. The `web` service is nginx; it includes its security headers in every location and proxies `/api/`.
- **Verify.** `npm run verify` (`scripts/verify.mjs`) runs Compose project `mojud-verify` from a fresh volume each time. It tears the project down in `finally` and on SIGINT/SIGTERM. Preflight checks Docker, Compose ≥ 2.24 (compared numerically, so 5.x passes), `.env`, free ports and Playwright Chromium.

## Test Coverage Summary

| Command | Result |
|---|---|
| `npx vitest run --coverage packages/contracts/test apps/api/test apps/web/test` | 130/130 passed, all against a real PostgreSQL 16 in Docker |
| Lines `apps/api/src` | 95.18% |
| Lines `apps/web/src` | 95.76% |
| Lines `packages/contracts/src` | 100% |
| Overall | 95.63% (floor 80% per folder, enforced) |
| `npm run verify` | Stages 0–6 passed: lint (0 errors), `tsc -b`, Prettier, secret scan, tests, stack healthy within 60 s, smoke 4/4, teardown |

Smoke timings from the verify run:

| Check | Measured | Limit |
|---|---|---|
| First load | 353 ms | 2 s |
| Sign-up | 675 ms | 2 s |
| Sign-in | 226 ms | 2 s |
| `/auth/me` median | 9.2 ms | 200 ms (50 ms budget) |

## Deviations from the Plan

1. **Vitest 3.2 config.** Vitest 3.2 uses `test.projects` in the root `vitest.config.ts` instead of `vitest.workspace.ts`. Coverage thresholds are set at the root, with an 80% floor for each source folder, because Vitest ignores per-project coverage settings.
2. **API test isolation.** The API project runs in a single fork instead of with `fileParallelism: false`, which cannot be set per project. The result is the same: test files do not run in parallel.
3. **No database at test time.** When the database cannot be reached, the global setup passes the reason to the database-backed tests, which then fail with a clear message. Database-free tests still run.
4. **Kysely 0.29.** `Migrator` is imported from `kysely/migration`.
5. **OpenAPI document.** The OpenAPI document is built from zod 4's native JSON Schema output and assembled by zod-to-openapi. The plan's `extendZodWithOpenApi` patch did not reach the contracts schemas, because of a dual zod copy under CommonJS.
6. **Identity module interface.** The module exports the following:
   - `createIdentityRouters` returns a public router and a protected router, so authentication can sit between them.
   - `equalizeSignInFailure` is used by the error handler and the start-up warm-up.
   - `resolveCaller` returns a session with `checkCsrf` and `extend` built in, so the platform middleware never touches identity tables.
   - Requests carry `req.caller` and `req.authSession`.
7. **Global-lookup allow-list.** `createBusinessWithOwner` is on this list, because no business ID exists before it runs. The reason is recorded in the code.
8. **Secret scan exemptions.** The secret scan allows the `local-dev-only` placeholder and unquoted code identifiers. It also scans untracked files that are not ignored, and still flags real values.
9. **Additions.** `scripts/dev.mjs`, `scripts/lib/npm.mjs` and a `build` script. `ButtonPrimary` and `ButtonSecondary` share `components/Buttons.tsx`.
10. **Start-up warm-up.** The dummy-hash warm-up was first missed in `server.ts`, and the first verify run then failed with sign-up at 2005 ms. It was added before the server starts listening. The 2 s limit was not changed.
11. **jsdom version.** jsdom 29 is used, because jsdom 30 needs Node ≥ 22.22 and this machine has 22.15.

## Known Risks

- **npm audit, Vitest 3.** `npm audit` reports advisories in Vitest 3. These are dev-only: tinypool (critical) and @vitest/mocker (moderate).
- **npm audit, React Router.** `npm audit` reports moderate open-redirect advisories in React Router 6.30.6. The fixes need Vitest 5 and React Router 7, which are not in the approved stack. The app only navigates to paths it creates itself. The upgrade is left for the builder to decide.
- **Playwright browser.** Playwright Chromium was installed on this machine (`npx playwright install chromium`). Preflight checks that it is present.

## Assumptions & Open Questions

None.
