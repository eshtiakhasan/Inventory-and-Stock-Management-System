# Logical Components — walking-skeleton

The component view of U1 and where the NFR patterns apply. It bridges this design to Infrastructure Design. The components come from `components.md` (IdentityAccess, WebApp) and the tech stack (`nfr-requirements/tech-stack-decisions.md`).

## Component Inventory

| Component | Runs in | Responsibility | NFR patterns applied |
|---|---|---|---|
| `web` | nginx container | Serves the React build; proxies `/api/` to `api` | Security headers and CSP, same origin, asset caching (NFR1.14, NFR1.15, NFR5.4) |
| `api` → platform layer | `api` container | Config, logger, request ID, error handler, Origin, authentication and CSRF middleware, health, OpenAPI | Request pipeline (`security-design.md`), logging, health (NFR1.x, NFR8.x) |
| `api` → `identity` module | `api` container | Sign-up, sign-in, sign-out, sessions, caller context, `authorize`, session clean-up | Argon2id, uniform failure, business-scoped repositories (NFR1.1–NFR1.9, NFR2.x) |
| `migrate` | one-off container (same image as `api`) | Applies forward-only SQL migrations | Start order (NFR8.4) |
| `db` | `postgres:16` container | Stores businesses, users, sessions | Indexes, named volume (NFR8.3) |
| `@mojud/contracts` | build-time package | zod schemas, types, error codes shared by `api` and `web` | One validation source (NFR1.10) |

## Backend Module Layout (NFR Design Q3)

```
apps/api/src/
  platform/        config, log, db, errors, middleware, health, openapi
  modules/
    identity/
      index.ts     the only public surface: router, resolveCaller, authorize, types
      internal/    service, repository, password, tokens, cleanup
```

- **Import rule:** ESLint `no-restricted-imports` forbids `modules/*/internal/**` from outside its own module, and forbids `modules/*` from importing `platform/middleware`.
- **Table ownership:** each module owns its tables. `identity` owns `businesses`, `users` and `sessions`. The `sessions` table has no `business_id`; it reaches its business through `users` (`security-design.md` global lookups).
- **Later modules:** U2 adds `catalogue`, `stock-ledger`, `purchasing`, `dispatch`, `damage`, `issues` and `my-tasks` the same way.

## Failure Domains and Blast Radius

| Failure | Effect | Contained by |
|---|---|---|
| `db` down | All API calls return 500; `/health` returns 503; `web` still serves pages, which show the error | Pool listener; error handler (NFR8.6) |
| `migrate` fails | `api` does not start; the stack reports the migration error | `service_completed_successfully` |
| `api` crash | `web` gets 502 from nginx until Docker restarts `api` | `restart: unless-stopped` (NFR8.7) |
| Bug in one module | Limited to that module's routes; other modules keep working | Module boundary; one error handler |
| Clean-up job fails | Expired sessions stay longer; no user effect | Logged; next run in 24 h |

## Shared Resources

- **Database:** one PostgreSQL database with one schema (`public`), shared by all modules. Each module owns its tables and has no cross-module foreign keys, except to `businesses` (`components.md`).
- **Pool and logger:** one pool and one root logger per `api` process.

## Assumptions & Open Questions

None.
