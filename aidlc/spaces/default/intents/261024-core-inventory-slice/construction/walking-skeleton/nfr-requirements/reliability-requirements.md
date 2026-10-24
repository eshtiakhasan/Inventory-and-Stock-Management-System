# Reliability Requirements — walking-skeleton

Reliability for a local-only app (`requirements.md` NFR8; team Deployment practice). There is no uptime SLA: the app runs when the builder starts it. The requirements below make sure it starts reliably, never leaves partial data, and recovers by a simple reset.

## Availability Targets

| ID | Requirement | Target | Check |
|---|---|---|---|
| NFR8.4 | A fresh start works: on a clean machine with Docker, after `cp .env.example .env` (it holds working local-only values, NFR1.12), one `docker compose up` starts the database, applies migrations, then starts the backend and the web app | 100% of `npm run verify` runs on a clean database | `npm run verify` begins from an empty database volume |
| NFR8.5 | Start order is safe: the backend waits for the database health check, and the web app waits for the backend health check (`GET /api/v1/health` returns 200 only when the database answers) | The stack is ready within 60 s of `docker compose up` | Compose `depends_on: condition: service_healthy`; the smoke test times out after 60 s |
| NFR8.6 | A database restart does not need a backend restart. The pool has an `error` listener that logs idle-client errors at `warn` and never exits the process. The pool opens new connections on the next request, and requests during the outage get 500 INTERNAL_ERROR (BR2.8), not a crash. | Backend process stays up | Integration test stops and restarts the database container; unit test emits a pool `error` event and checks the process is still running |

## Fault Tolerance

| ID | Requirement | Rule | Check |
|---|---|---|---|
| NFR1.16 | Sign-up writes Business and Owner in one transaction. Any failure saves nothing. | BR1.6 | Integration test injects a failure after the Business insert |
| NFR1.17 | A concurrent duplicate phone at sign-up returns 409 DUPLICATE, not 500. The unique violation (PostgreSQL code 23505 on the phone index) is mapped. | BR1.3 | Integration test with two simultaneous sign-ups |
| NFR8.7 | Unhandled errors in a request are caught by one error handler, logged with the request ID, and answered with 500 INTERNAL_ERROR. Any other uncaught process-level error (not a pool idle-client error, see NFR8.6) is logged and the process exits, so Docker restarts it (`restart: unless-stopped`). | BR2.8 | Integration test; Compose config |
| NFR8.8 | On SIGTERM the backend stops accepting requests, finishes in-flight requests (up to 10 s), then closes the pool. | — | Unit test of the shutdown function: the server is closed first and the pool is ended only after in-flight requests finish |

## Data Durability and Recovery

- Database data lives in a named Docker volume, so it survives `docker compose down` and is deleted only by `down -v`.
- Migrations only move forward. A one-off `migrate` service in Docker Compose applies them and exits, and the backend starts only after it succeeds (NFR Design Q2).
- Recovery means resetting the local database (`npm run db:reset`) and re-running migrations. This is acceptable because only demo data exists (team Deployment practice; RAID A1). No backups are required this round.

## Assumptions & Open Questions

None.
