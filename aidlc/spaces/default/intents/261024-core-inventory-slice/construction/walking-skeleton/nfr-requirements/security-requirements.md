# Security Requirements — walking-skeleton

Security requirements for U1 (`unit-of-work.md`): sign-up, sign-in, sessions, CSRF, caller context and business scoping (`functional-spec.md`, `rules.md` BR1.5, BR2.1–BR2.8, BR3.1). Derived from `requirements.md` NFR1 and NFR2, and from contract C1 in `contract-summary.md`.

## Authentication

| ID | Requirement | Rule | Check |
|---|---|---|---|
| NFR1.1 | Passwords are hashed with Argon2id (memory 19 MiB, iterations 2, parallelism 1, per-password random salt), using the OWASP minimum parameters. The parameters live in one config module so they can be raised. | BR1.5 | Unit test: stored hash starts with `$argon2id$`, verifies the right password, rejects a wrong one |
| NFR1.2 | The plain password is never stored, returned or logged, and never appears in an error message. | BR1.5 | Integration test signs up, then searches the `users` table and the captured log output for the password text and finds nothing |
| NFR1.3 | Every sign-in failure (missing or empty field, wrong type, invalid phone, password longer than 128 characters, unknown phone, wrong password) returns the same 401 INVALID_CREDENTIALS body. Sign-in never returns 400 VALIDATION_FAILED. The one exception is a request from a foreign origin, which is refused with 403 FORBIDDEN before any credential check (NFR1.19). On every failure path that does not reach a real hash check, the server still verifies against a fixed dummy Argon2id hash, so all paths do similar work. | BR2.1, BR1.2 | Integration test: each failure case returns the same status and body. Unit test with a spy on the hash verifier: it is called exactly once on every failure path. |
| NFR1.4 | Session IDs and CSRF tokens are 32 random bytes from the operating system's secure random source (`crypto.randomBytes`), base64url-encoded. Only a SHA-256 hash of the session ID is stored in the database. | C1 | Unit test of the token module; the database column holds 64 hex characters |
| NFR1.5 | The session cookie is `HttpOnly`, `SameSite=Lax`, `Path=/`, with no `Max-Age` (it is a browser-session cookie; the server enforces the 12-hour expiry). `Secure` is set whenever `COOKIE_SECURE=true`. It is off on `localhost` (requirements assumption: no HTTPS locally) and must be on once the app is deployed. | C1, BR2.3 | Integration test reads the `Set-Cookie` header |
| NFR1.6 | Sessions end after 12 hours without use, at sign-out, or when the user is deactivated. | BR2.3, BR2.4, BR2.6 | Integration tests with a controllable clock |

## Authorization

| ID | Requirement | Rule | Check |
|---|---|---|---|
| NFR1.7 | Every non-GET request other than sign-up and sign-in must carry `X-CSRF-Token` matching the session's token, compared in constant time. | BR2.5 | Integration test: missing or wrong token returns 403 FORBIDDEN and changes nothing |
| NFR1.8 | Every route goes through the authentication middleware except this allow-list: `POST /api/v1/auth/signup`, `POST /api/v1/auth/signin`, `GET /api/v1/health` and `GET /api/v1/openapi.json`. A route test lists all registered routes and fails if one is unprotected and not on the allow-list. The health and OpenAPI routes are additive under contract v1 (C1). | WF4 | Route-inventory test |
| NFR1.19 | Every non-GET request, including sign-up and sign-in, must have an `Origin` header (or, if it is absent, a `Referer`) equal to the app's own origin (`APP_ORIGIN`). Otherwise it returns 403 FORBIDDEN. This protects sign-in and sign-up, which carry no CSRF token, from login CSRF. | C1 | Integration test with a foreign Origin |
| NFR1.9 | `authorize(caller, action, warehouseId)` is called by every module operation. In U1 it allows any signed-in, active caller (BR2.7). | BR2.7 | Unit test |
| NFR2.1 | Every data-access function takes `businessId` as a required typed argument and filters on it. No repository function can query a business-owned table without it (enforced by the function signatures). | BR3.1 | Type check plus a unit test per repository function, run against two businesses |
| NFR2.2 | Isolation test harness: U1 provides a test helper that creates two businesses with their own users and sessions. U2 uses it to prove that every record endpoint refuses the other business's records with 404 (AC1.1.4). | BR3.1 | Helper exists and is used by U1's own `/auth/me` test (each session returns only its own business) |

## Input Validation and Data Protection

| ID | Requirement | Check |
|---|---|---|
| NFR1.10 | Every request body is validated against a schema (zod) before use. Unknown fields are rejected and string lengths are capped (names ≤ 100, password ≤ 128). On every endpoint except sign-in, a failure returns 400 VALIDATION_FAILED with the field. Sign-in maps any schema failure to 401 INVALID_CREDENTIALS (NFR1.3). Bodies larger than 100 KB are refused with 400 VALIDATION_FAILED (sign-in: INVALID_CREDENTIALS). | Integration tests for oversize and extra fields, on sign-up and on sign-in |
| NFR1.11 | All SQL is built with Kysely's parameterized queries, with no string-concatenated SQL. Raw SQL is allowed only in migration files. | ESLint rule bans `sql.raw` outside `migrations/`; review |
| NFR1.12 | Secrets (the database password) come only from environment variables, loaded from a local `.env` file that git ignores. `.env.example` lists every variable with a working local-only placeholder value, marked `# local only - change before any deployment` (for example `POSTGRES_PASSWORD=local-dev-only`), so `cp .env.example .env` gives a working local setup (NFR8.4). The backend refuses to start if a required variable is missing or empty. Real secrets are never committed. This refines the team Deployment practice ("names without values"), because NFR8 requires a start with no manual steps; the placeholders are not secrets. | Startup test for a missing variable. The secret scan in `npm run verify` checks that no tracked file other than `.env.example` sets `PASSWORD`, `SECRET` or `TOKEN` values, and that `.env` is not tracked. |
| NFR1.13 | Error responses use the one Error shape and never include stack traces, SQL or internal messages (BR2.8). | Integration test forces a database failure and checks the body |
| NFR1.14 | Security headers on every response: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: same-origin`. API responses get them from helmet in Express. Web app responses get the same headers from nginx, plus `Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline'` (inline styles are allowed so React `style` props work; inline scripts are not). No inline script is used: the "theme before first paint" code (BR5.1) is a small external file `/theme-init.js`, loaded with a blocking script tag in `<head>`, which `'self'` allows. | Integration test for the API headers; the smoke test checks the web headers and that the saved dark theme is applied on first load |
| NFR1.15 | The web app and API are served from the same origin (`localhost`), through the web server's proxy to `/api`. CORS is not enabled. | Configuration review; smoke test |

## Threat Considerations (STRIDE, U1)

| Threat | Example | Control |
|---|---|---|
| Spoofing | Guessing a session ID | NFR1.4 (256-bit IDs), NFR1.6 |
| Spoofing | Password guessing | NFR1.1 slow hash. A sign-in pause after failed attempts is out of scope this round (`requirements.md` Out of Scope) and is accepted as a local-only risk. |
| Tampering | Cross-site request changing data | NFR1.7 CSRF token, NFR1.5 SameSite=Lax, NFR1.19 Origin check |
| Tampering | Login CSRF (a foreign site signs the person into an attacker's account) | NFR1.19 Origin check on sign-in and sign-up |
| Repudiation | No record of who signed in | Sign-in and sign-out are logged with user ID, never with the password (`observability-requirements.md`) |
| Information disclosure | Account enumeration through sign-in | NFR1.3 |
| Information disclosure | Leaked password or stack trace | NFR1.2, NFR1.13 |
| Information disclosure | Account enumeration through sign-up | Sign-up's 409 DUPLICATE does reveal that a phone is registered. This is accepted per FR1.1, which requires that message. |
| Denial of service | Very large request bodies | NFR1.10 body limit |
| Elevation of privilege | Reaching another business's data | NFR2.1, NFR2.2 |

## Compliance

There is no regulated data this round: only demo and test data is used (RAID A1). There is no data residency or retention requirement beyond the 7-day clean-up of expired sessions (BR2.3).

## Assumptions & Open Questions

None.
