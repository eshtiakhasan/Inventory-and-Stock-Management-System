# Performance Design — walking-skeleton

How U1 meets `nfr-requirements/performance-requirements.md` (NFR5.1–NFR5.6). The app is small and local, so the design avoids caches and relies on few round trips per request.

## Request Budgets

| Path | Database round trips | Main cost | Requirement |
|---|---|---|---|
| Sign-up | 1 transaction (insert business, insert user, insert session) | One Argon2id hash (~20–100 ms) | NFR5.1 ≤ 2 s |
| Sign-in | 1 select user + 1 insert session | One Argon2id verify | NFR5.2 ≤ 2 s |
| Authenticated request (`/auth/me`) | 2: one joined `SELECT` (session, user, business by primary keys), then one `UPDATE` to extend the session (`security-design.md` Lifetime) | Two indexed primary-key operations | NFR5.3 median ≤ 50 ms |

## Resource Pooling

- **Connection pool:** one `pg.Pool` with `max: DB_POOL_MAX` (default 10), `idleTimeoutMillis: 30000` and `connectionTimeoutMillis: 5000`, shared by Kysely (NFR8.2).
- **Hashing:** Argon2 runs on libuv's thread pool, so the event loop is not blocked. The default `UV_THREADPOOL_SIZE` of 4 is enough for 5 users.

## Frontend Loading (NFR5.4)

- **Build and compression:** the web app is a Vite production build, served by nginx with gzip on and `Cache-Control: max-age=31536000, immutable` for hashed assets. `index.html` is served with `no-cache`.
- **Code splitting:** each route is lazy-loaded with `React.lazy`, so the Sign in page loads only the shell and its form.
- **Fonts:** no web fonts are downloaded; the design system uses a system font stack.

## Caching

There is no server-side cache. The session must be checked on every request (NFR1.6), and the data is tiny. TanStack Query keeps `/auth/me` in memory in the browser with `staleTime: Infinity`, and resets it on sign-in and sign-out.

## Measurement

- **Smoke timings (NFR5.1, NFR5.2, NFR5.4):** the Playwright smoke test wraps each step in `performance.now()` timers and fails above the targets.
- **`/auth/me` median (NFR5.3):** the smoke test also makes 20 `/auth/me` calls through `request.get`, and reads each one's `durationMs`. NFR5.3 names the log line, but the smoke test runs outside the containers and cannot read it easily. The API therefore also sends the same value, from the same timer, in an `X-Response-Time` header, and the test reads that header. This is a deliberate refinement of how NFR5.3 is measured; the value is identical. The test fails when the median is above 200 ms.
- **Hash time (NFR5.5):** a Vitest test times one hash and fails above 500 ms.
- **Product search (NFR5.6):** deferred to the backend unit.

## Assumptions & Open Questions

None.
