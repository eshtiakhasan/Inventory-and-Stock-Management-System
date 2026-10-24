# Performance Requirements — walking-skeleton

Targets for U1 (`unit-of-work.md`): sign-up, sign-in, sign-out, `/auth/me` and the app shell (`functional-spec.md` WF1–WF5). Derived from `requirements.md` NFR5. All timings are measured on the builder's machine with the stack running in Docker Compose (NFR8).

## Targets

| ID | Requirement | Target | How it is checked |
|---|---|---|---|
| NFR5.1 | Sign-up (WF1) completes, including the Argon2id hash and the transaction | ≤ 2 s from submit to the Owner's home | Playwright smoke test fails above 2 s |
| NFR5.2 | Sign-in (WF2) completes, including the hash check | ≤ 2 s from submit to the role home | Playwright smoke test fails above 2 s |
| NFR5.3 | Authenticated request overhead (WF4: session lookup, CSRF check, session extension) | Median ≤ 50 ms on the server for `/auth/me` (budget); the check fails only above 200 ms so a busy machine does not cause false failures | The smoke test makes 20 `/auth/me` calls after warm-up and reads `durationMs` from the log lines (NFR8.9); it reports the median and fails above 200 ms |
| NFR5.4 | First page load of the web app (production build served locally) | Sign in page usable within 2 s | Playwright smoke test |
| NFR5.5 | Password hashing cost | One Argon2id hash with the NFR1.1 parameters takes at most 500 ms on the builder's machine (upper bound only; the OWASP minimum parameters are expected to take roughly 20–100 ms) | A unit test times one hash and fails above 500 ms |
| NFR5.6 | Product search within 1 second (the rest of NFR5) | Applies from the backend unit, where products exist | Deferred to the backend unit |

## Resource Constraints

- The whole stack runs on one Windows 10 Home machine with Docker Desktop and WSL 2. The database container may use at most 1 GB of memory, and backend and web containers at most 512 MB each.
- Database connection pool: at most 10 connections.

## Benchmarks

No load benchmark is required this round. There is one builder with demo data, and NFR5's product-search target (NFR5.6) applies from U2, where products exist.

## Assumptions & Open Questions

None.
