# Security Design — walking-skeleton

How U1 meets `nfr-requirements/security-requirements.md` (NFR1.x, NFR2.x), within the session and CSRF contract C1 (`contract-summary.md`) and the workflows in `functional-spec.md`. The design uses defence in depth. A request passes through these checks in order:
1. Origin check
2. Session
3. Active user
4. CSRF
5. Session extension
6. Schema
7. `authorize`
8. Business-scoped data access

## Request Pipeline (Express middleware order)

| # | Step | Purpose | Requirements |
|---|---|---|---|
| 1 | `requestId` | Take a valid `X-Request-Id` or create a UUID; set it on the response | NFR8.10 |
| 2 | `pino-http` logger with `redact` | One log line per request; secrets removed | NFR8.9, NFR1.18 |
| 3 | `helmet` (API only; nginx adds no headers to `/api/`) | Security headers on API responses | NFR1.14 |
| 4 | `originCheck` (non-GET only) | Origin check (see "Origin check" below); otherwise 403 FORBIDDEN | NFR1.19 |
| 5 | `express.json({ limit: '100kb' })` | Parse the body. Every parser error (`entity.too.large`, `entity.parse.failed`, `charset.unsupported`, `encoding.unsupported`) goes to the error handler, which maps it by route (step 9) | NFR1.10, NFR1.3 |
| 6 | Public routes: signup, signin, health, openapi.json | Mounted before authentication | NFR1.8 |
| 7 | `authenticate` | WF4 steps 1–4: cookie, session, expiry and active-user checks; builds the caller context; does **not** extend the session | NFR1.6, NFR1.9 |
| 8 | `csrfCheck` (non-GET only), then `extendSession` | WF4 step 5, then step 6: CSRF compare; only after it passes is the session extended | NFR1.7, NFR1.6 |
| 9 | Module routers, then `errorHandler` | zod validation per route; one Error shape; no internals | NFR1.10, NFR1.13 |

A route-inventory test walks the Express router stack. It fails if a route is mounted outside the public allow-list (step 6) without passing steps 7–8 (NFR1.8).

**Body errors on sign-in (NFR1.3):** `errorHandler` identifies sign-in by `req.method === 'POST' && req.path === '/api/v1/auth/signin'`. It does not use `req.route`, which is not set yet when the body parser fails. On that route, every body-parser error and every validation error becomes 401 INVALID_CREDENTIALS. Before answering, it still runs the dummy hash verify, so timing stays uniform. A test sends malformed JSON, an unsupported charset, and an oversize body to sign-in, and each one gets 401.

## Origin check (NFR1.19)

- **Allow-list:** `APP_ORIGIN` is a comma-separated allow-list. `config.ts` splits it, trims each entry, and checks each entry is a valid origin (scheme, host and port, no path) at start-up. An invalid entry stops the backend.
- **Accepted values:**
  - The `Origin` header must equal one entry exactly.
  - If `Origin` is absent, the origin of the `Referer` URL (`new URL(referer).origin`, guarded by try/catch) must equal one entry.
- **Refused values:** `Origin: null`, an unparsable `Referer`, or neither header present gives 403 FORBIDDEN.
- **Tests:** the Supertest helpers always set `Origin`.

## Authentication Design

- **Hashing (NFR1.1, NFR5.5):** `identity/internal/password.ts` wraps `argon2.hash` and `argon2.verify`. Parameters are `{ type: argon2id, memoryCost: 19456, timeCost: 2, parallelism: 1 }` from `config.ts`. The library creates a salt for each hash.
- **Uniform sign-in failure (NFR1.3):** the sign-in handler uses one code path. `normalizePhone` returns `null` for invalid input and never throws.

  ```ts
  const parsed = SignInSchema.safeParse(body);                         // never throws, never 400
  const phone = parsed.success ? normalizePhone(parsed.data.phone) : null;
  const user = phone ? await identityRepo.findUserByPhoneForSignIn(db, phone) : null;
  const ok = await password.verify(user?.passwordHash ?? DUMMY_HASH, parsed.success ? parsed.data.password : '');
  if (!user || !ok) throw new AppError('INVALID_CREDENTIALS');       // 401
  if (!user.active) throw new AppError('ACCOUNT_DEACTIVATED');       // 401, only after a correct password
  ```

  `DUMMY_HASH` is a constant Argon2id hash made with the same parameters. `verify` runs exactly once on every path, which a spy test asserts.
- **Session tokens (NFR1.4):** the session ID is `randomBytes(32).toString('base64url')`. The database stores `sha256(id)` as `sessions.id_hash` (primary key). The CSRF token is also 32 random bytes and is stored as plain text, because it is not a bearer credential on its own.
- **Cookie (NFR1.5):** the cookie name is `mojud_session`, as contract C1 states. It has `HttpOnly`, `SameSite=Lax` and `Path=/`, plus `Secure` when `COOKIE_SECURE=true`. It has no `Max-Age`. Sign-out clears it with an expired cookie of the same name and path.
- **Lifetime and active user (NFR1.6, BR2.3, BR2.6):**
  - **Lookup:** `authenticate` makes one round trip:

    ```sql
    SELECT s.id_hash, s.csrf_token, s.expires_at, u.id, u.active, u.name, u.role, b.id AS business_id, b.name AS business_name
    FROM sessions s JOIN users u ON u.id = s.user_id JOIN businesses b ON b.id = u.business_id
    WHERE s.id_hash = $1
    ```

  - **Outcomes:**
    - No row: NOT_SIGNED_IN.
    - `expires_at <= now`: delete the session, then SESSION_ENDED.
    - `active = false`: delete the session, then SESSION_ENDED.
    - Otherwise: set `req.caller` and `req.session = { idHash, csrfToken }`.
  - **Extension:** `extendSession` runs after `csrfCheck` passes. It makes a second round trip: `UPDATE sessions SET last_used_at = $now, expires_at = $now + interval '12 hours' WHERE id_hash = $1`.
  - **Clock:** `now` comes from an injectable clock (`config.clock`), so expiry tests are possible.
- **CSRF compare (NFR1.7):** a missing header, or one whose byte length differs from the stored token, is refused with 403 FORBIDDEN before `crypto.timingSafeEqual` runs. That function throws on unequal lengths, so it is only called for equal-length values.

## Authorization and Isolation Design

- **Caller context (NFR1.9, BR2.7):** the caller is `{ userId, businessId, businessName, name, role, warehouseIds: [] }`, attached as `req.caller`. Its type is read-only.
- **`authorize` (NFR1.9):** `identity.authorize(caller, action, warehouseId?)` checks that the caller exists and is active in U1. Every module service calls it first. U2 replaces the body with a role table and keeps the signature.
- **Business scoping (NFR2.1):**
  - **Signature rule:** repository functions over business-owned tables have the shape `fn(db, businessId: BusinessId, …args)` and include `where('business_id', '=', businessId)`.
  - **Branded type:** `BusinessId` is created only by `identity/internal/ids.ts`, which `authenticate`, sign-up and sign-in call. Elsewhere, ESLint bans `as BusinessId` casts (`no-restricted-syntax`).
  - **Global lookups:** these are the only functions that read without a `businessId`. Each lives in `identity/internal/` and is named with a `Global` or `ForSignIn` suffix:
    - `findUserByPhoneForSignIn` (sign-in and the duplicate check; phone is globally unique, BR1.3)
    - `findSessionByIdHashGlobal` (authenticate; the session row carries no `business_id`, and the business is taken from the joined user)
    - `deleteExpiredSessionsGlobal` (clean-up)

    Session write functions (`insertSession`, `deleteSession`, `extendSession`) also take no `businessId`. They act on one session named by its `id_hash`, and they live in the same folder. A test lists the repository exports for the business-owned tables (`users`, `businesses`, and later modules' tables) and fails if a function without a `businessId` parameter is not on the list above.
- **Isolation harness (NFR2.2):** `test/helpers/twoBusinesses.ts` creates businesses A and B, each with an Owner and a signed-in agent (a Supertest agent holding the cookie and CSRF token). U1 uses it to check that `/auth/me` returns only the caller's own business. U2 uses it for the 404 checks on every record endpoint.

## Input Validation Design

- **Schemas (NFR1.10):** zod schemas live in `@mojud/contracts` and are all `.strict()`. A `validate(schema)` helper turns a failure into VALIDATION_FAILED with the field. Sign-in uses `safeParse` directly, as shown above.
- **SQL (NFR1.11):** only Kysely builders and the tagged `sql` template are used. An ESLint `no-restricted-syntax` rule forbids `sql.raw` everywhere except `apps/api/src/platform/db/sqlFileMigrationProvider.ts`, which runs the migration files (`reliability-design.md`).

## Secrets Design (NFR1.12)

- **Config check:** `config.ts` reads `process.env` once through a zod schema. A missing or empty `DATABASE_URL`, `POSTGRES_PASSWORD` or `APP_ORIGIN` makes it exit with a clear message.
- **Passing values to containers:** Docker Compose passes `.env` to the services with `env_file`. `.env.example` holds placeholders marked local-only.
- **Secret scan:** `scripts/secret-scan.mjs` scans the files `git ls-files` lists, except `.env.example`. It fails if `.env` is tracked or if a line matches `(PASSWORD|SECRET|TOKEN)\s*[=:]\s*\S{6,}`.

## Headers and CSP (NFR1.14, NFR1.15)

- **API:** the `/api/` responses get helmet's defaults from Express. nginx's `location /api/` adds no headers, to avoid duplicates.
- **Web app:** nginx puts the security headers in an `include security-headers.conf;` file. That file is included in **every** `location` that serves the web app, because a location with its own `add_header` drops the server-level ones. Each header uses `always`:

  ```nginx
  add_header X-Content-Type-Options nosniff always;
  add_header X-Frame-Options DENY always;
  add_header Referrer-Policy same-origin always;
  add_header Content-Security-Policy "default-src 'self'; style-src 'self' 'unsafe-inline'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'" always;
  ```

- **Caching:** `location /assets/` holds hashed files and is `immutable`, plus the include. `/index.html` and `/theme-init.js` are not hashed and are served with `Cache-Control: no-cache`, plus the include.
- **Theme script:** `index.html` loads `/theme-init.js` with a blocking `<script>` in `<head>`. There is no inline script.
- **Same origin:** nginx proxies `/api/` to `api:3000`. The browser sees one origin (`http://localhost:8080`), and no CORS headers are sent.
- **Test:** the smoke test checks the web headers on `/`, on an `/assets/` file and on `/theme-init.js`.

## Error Shape (NFR1.13)

`errorHandler` maps `AppError(code)` to its status from the Error Catalogue (`functional-spec.md`). Body-parser errors become VALIDATION_FAILED, or INVALID_CREDENTIALS on sign-in. Every other error becomes `{ code: 'INTERNAL_ERROR', message: "Couldn't save. Try again.", requestId }` with status 500. Stack traces go to the log only.

## Assumptions & Open Questions

None.
