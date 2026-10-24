# Tech Stack Decisions — walking-skeleton

U1 sets the stack that U2 and U3 extend (`unit-of-work.md`). The mandated parts (TypeScript, React, Node, PostgreSQL, local Docker Compose) come from `project.md`. Library choices come from this stage's questions Q1–Q4. Versions are the current stable major lines and are pinned in the lockfile when code is generated.

## Decisions

| Area | Choice | Why | Alternatives considered |
|---|---|---|---|
| Language | TypeScript 5 (strict) | Mandated; NFR9 | — |
| Runtime | Node.js 22 LTS | Current LTS; built-in `crypto` and `fetch` | Node 20 LTS (older) |
| Repository layout | npm workspaces monorepo: `apps/api`, `apps/web`, `packages/contracts` | One install and one `npm run verify`; shared `@mojud/contracts` types (ADR on contracts) | Separate repositories (more setup for one builder) |
| Backend framework | Express 5 | Q1 A. Widely documented and simple for a beginner; Express 5 handles async errors | Fastify (faster, less familiar); NestJS (heavier) |
| Database access | Kysely (typed SQL query builder) with `pg` | Q1 A. Plain, visible SQL with types; easy `FOR UPDATE` locks and transactions for the U2 stock ledger | Drizzle ORM; Prisma (locks need raw SQL) |
| Migrations | Plain SQL files run by Kysely's `Migrator` in a one-off `migrate` Compose service before the backend starts (NFR Design Q2) | Forward-only, readable SQL (team Deployment practice) | node-pg-migrate; Prisma migrate |
| Validation | zod schemas, shared through `@mojud/contracts` | One schema for server checks and client hints | Hand-written checks |
| API description | OpenAPI 3.1 document generated from the zod schemas (`zod-to-openapi`) and served at `/api/v1/openapi.json`; it also documents `GET /api/v1/health`. Both routes are additive under contract v1 (C1). | Contract C1 requires OpenAPI | Hand-written YAML |
| Password hashing | Argon2id via the `argon2` package | Q2 A; NFR1.1 | bcrypt |
| Security headers | helmet | NFR1.14 | Manual headers |
| Logging | pino and pino-http (pino-pretty in development) | Q4 A; NFR8.9 | winston; console |
| Database | PostgreSQL 16 (official Docker image) | Mandated | — |
| Frontend | React 18 with Vite, React Router 6 | Mandated React; Vite is fast and simple | Next.js (server features not needed) |
| Frontend data | TanStack Query for server calls, one small `apiClient` wrapper | Caching and request state without extra global state | Redux Toolkit (more code) |
| Styling | Plain CSS with design-system tokens as CSS variables (no UI kit) | Matches `design-system-mapping.md`; light and dark themes | Tailwind (extra layer over the tokens) |
| Translations | i18next with one English JSON file | BR5.2; ready for Bangla later | Hand-rolled lookup |
| Unit and integration tests | Vitest with V8 coverage (80% lines enforced) | Q3 A; NFR7 | Jest |
| Endpoint tests | Supertest against a real PostgreSQL test database (separate database name, migrated per run) | Q3 A; team Testing Posture | Mocked database |
| Screen tests | React Testing Library with jsdom and `jest-axe` for basic accessibility checks | Q3 A; NFR6 | — |
| Browser smoke test | Playwright (Chromium) running the sign-up → home → sign-out → sign-in path against the Compose stack | Q3 A; verification command `npm run verify` | API-only smoke |
| Lint and format | ESLint 9 flat config with typescript-eslint and eslint-plugin-react-hooks; Prettier defaults | NFR9; team Code Style | — |
| Containers | Docker Compose with services `db`, `migrate` (one-off), `api`, `web` (nginx serving the built web app and proxying `/api` to `api`) | NFR8; same origin, no CORS (NFR1.15) | Vite dev server in Compose (not production-like) |

## Quality Requirements Met by These Tools

| ID | Requirement | Check |
|---|---|---|
| NFR6.1 | The skeleton screens (Sign up, Sign in, app shell, placeholders) have no `jest-axe` violations in either theme. | Screen tests run once in each theme |
| NFR6.2 | The skeleton screens can be used by keyboard alone: the skip link, visible focus, and focus moving to the error summary. Text contrast is 4.5:1 or more in both themes. | Playwright keyboard path in the smoke test; token contrast unit test |
| NFR7.1 | Line coverage is at least 80% for `apps/api` and `apps/web`, measured on every test run; the run fails below it. | Vitest `coverage.thresholds.lines: 80` |
| NFR7.2 | Tests run with no manual setup beyond Docker and `.env`. The test database is created and migrated by the test setup. | `npm run verify` on a clean clone |
| NFR9.1 | Every workspace uses strict TypeScript, ESLint (typescript-eslint, react-hooks) and Prettier. Lint and type errors fail `npm run verify`. | `npm run verify` |

## Verification Command

`npm run verify` runs, in order:
1. lint, type check and the secret scan (NFR1.12)
2. unit and integration tests with coverage (fails under 80%)
3. `docker compose up -d --build --wait`
4. the Playwright smoke test against `http://localhost:8080`
5. `docker compose down`

## Assumptions & Open Questions

None.
