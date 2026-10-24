# Scalability Design — walking-skeleton

How U1 meets `nfr-requirements/scalability-requirements.md` (NFR8.1–NFR8.3). Scaling out is not a goal this round. The design only keeps the backend stateless and the database indexed, so more instances could be added later.

## Stateless Backend (NFR8.1)

- **No in-memory state:** sessions, users and businesses live only in PostgreSQL. The backend holds no in-memory session map and no sticky state.
- **Clean-up job:** the session clean-up timer (`reliability-design.md`) takes the transaction-level advisory lock `pg_try_advisory_xact_lock(hashtext('session-cleanup'))` inside its own transaction, so it is safe to run on several instances.
- **Migrations:** these run in the one-off `migrate` service, never inside the backend instances (NFR Design Q2).

## Connection Pool (NFR8.2)

There is one pool per backend process, sized by `DB_POOL_MAX`. With one instance and PostgreSQL's default `max_connections` of 100, there is wide headroom.

## Indexes (NFR8.3)

| Table | Index | Serves |
|---|---|---|
| `businesses` | primary key `id` | caller context |
| `users` | primary key `id`; unique `phone`; index `business_id` | sign-in; sign-up duplicate check; business scoping |
| `sessions` | primary key `id_hash`; index `expires_at`; index `user_id` | authenticate; clean-up; deactivate (U2) |

## Module Boundaries for Later Growth

Each module owns its tables and is reached only through its `index.ts` (NFR Design Q3; `logical-components.md`). A module could later move to its own service without other modules changing their imports.

## Capacity Thresholds

None this round. The app is local, with under 50 users (`scalability-requirements.md`).

## Assumptions & Open Questions

None.
