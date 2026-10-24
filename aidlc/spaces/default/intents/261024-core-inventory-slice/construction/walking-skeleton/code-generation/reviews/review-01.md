## Review

**Verdict:** READY
**Reviewer:** aidlc-architecture-reviewer-agent
**Date:** 2026-10-24T20:37:05Z
**Iteration:** 1

### Findings

| ID | Severity | Location | Finding | Required action | Status |
|---|---|---|---|---|---|
| R-01 | Minor | apps/api/test/api/platform.test.ts > "logs one request line ..." test (lines 318-354); apps/api/src/platform/log.ts > REDACT_PATHS | The test that is meant to prove log redaction cannot fail on redaction. The HTTP logger never writes headers or bodies (`quietReqLogger`, `quietResLogger`, and `requestLine` writes only method, route, status and durationMs). So "no cookie, CSRF token or password in the log" holds with or without `REDACT_PATHS`. I ran pino with these exact paths and they do remove `req.headers.cookie`, `x-csrf-token`, `set-cookie`, `password` and `csrfToken`. The control works today, but nothing would catch a broken path list. | Add a unit test that builds `createLogger` with a `LogCapture` and logs objects such as `{ req: { headers: { cookie, "x-csrf-token" } } }`, `{ password }`, `{ body: { password } }` and `{ x: { csrfToken } }`. Assert that none of the secret values appear in the captured output. | New |
| R-02 | Minor | apps/api/test/api/auth.test.ts > "answers malformed JSON, an unsupported charset ..." (lines 168-189); apps/api/src/platform/middleware/errorHandler.ts lines 62-78 | The body-parser failure path for sign-in is checked only for the 401 INVALID_CREDENTIALS body. Nothing counts the Argon2 verifies. The service test spies `verify` for the `signIn()` paths, but the error handler's `equalizeSignInFailure()` call is never asserted. Deleting that call would keep every test green and silently break the uniform-timing requirement for malformed, wrong-charset and oversized sign-in bodies. | In the same test, spy on `passwordHasher.verify` and assert it is called exactly once for each of the malformed, charset, oversized and unknown-field requests. | New |
| R-03 | Minor | apps/api/src/platform/middleware/errorHandler.ts lines 31-33 (`isSignIn`) | `isSignIn` compares `req.path` to the literal `/api/v1/auth/signin`. Express routing is case-insensitive and ignores a trailing slash by default. So a malformed body sent to `/api/v1/auth/signin/` or `/API/V1/AUTH/SIGNIN` is routed to sign-in. The handler does not recognise it, runs no dummy verify, and answers 400 VALIDATION_FAILED instead of 401 INVALID_CREDENTIALS. The response does not reveal whether an account exists, so this is a uniformity gap and not a leak. | Compare a normalised path (lower-cased, trailing slash removed), or set `strict routing` and `case sensitive routing` on the app. Add a test for `/signin/`. | New |
| R-04 | Minor | apps/api/test/api/auth.test.ts > "extends the session on use and ends it with SESSION_ENDED 12 hours after the last use" (lines 286-300) | The test cannot prove extension. If `extendSession` did nothing, the 11 h read still succeeds (expiry is at 12 h) and the final read at 23 h + 1 ms is still past the original expiry. Extension is proven only in `service.test.ts` ("resolves a valid session ... and extends it", which checks `expires_at`) and not through the HTTP pipeline. | After the 11 h read, advance the clock a further 11 h (22 h in total). Assert the session is still valid at 22 h. That passes only when the extension ran. Then advance by 12 h + 1 ms and assert SESSION_ENDED. | New |
| R-05 | Minor | apps/web/nginx/default.conf lines 267-274 (`location /api/`) | `proxy_pass http://api:3000;` resolves `api` once, when nginx starts, and keeps that address. If only the `api` container is rebuilt or recreated (`docker compose up -d --build api`), its address can change. Compose does not restart `web`, so every `/api/` call returns 502 until `web` is restarted. The team deployment practice restarts the whole stack, so this is low impact. | Add `resolver 127.0.0.11 valid=5s;` and proxy through a variable (`set $api http://api:3000; proxy_pass $api;`). Alternatively, record "restart web after rebuilding api" in the README. | New |
| R-06 | Minor | apps/api/src/app.ts lines 106-114 (response headers); apps/api/src/modules/identity/internal/routes.ts (sign-up, sign-in and `/me` responses) | Responses that carry the CSRF token and caller data (`/auth/signup`, `/auth/signin`, `/auth/me`) do not send `Cache-Control: no-store`. Express adds a weak ETag by default, and helmet does not set Cache-Control. Browsers do not heuristically cache these responses (they have no Last-Modified), but shared or intermediary caches are not instructed to skip them. The security design does not require this header. | Add `Cache-Control: no-store` to the `/auth/*` responses (for example in a small middleware for the `/api/v1` prefix) and assert it in `auth.test.ts`. | New |
| R-07 | Minor | scripts/verify.mjs lines 58-74 and 51-56 | `verify.mjs` runs each step with `spawnSync`, which blocks the event loop. The SIGINT/SIGTERM handlers therefore run only after the current child exits. Ctrl+C reaches the child too, so teardown follows promptly. A SIGTERM sent to the `verify` process alone (an IDE stop button or `kill`) waits for the current step, which may be a long test run, before `finally` tears the stack down. The summary says it tears down "on SIGINT/SIGTERM". | Either switch to async `spawn` and forward the signal to the child, or soften the wording in the comment, code summary and `unit-test-instructions.md` to "after the current step finishes". | New |
| R-08 | Minor | eslint.config.js lines 21-25 (`BUSINESS_ID_CAST_BAN`) | The ban matches only `as BusinessId` (TSAsExpression). It does not match the angle-bracket form `<BusinessId>x`, and `UserId` has no cast ban at all although it is branded the same way. The brand guard is therefore weaker than the comment in `ids.ts` says. The allow-list test (`repository.test.ts`) also detects `businessId` by reading function source text, so it is a convention check and not a type check. | Add `TSTypeAssertion > TSTypeReference[typeName.name='BusinessId']`, and the same selectors for `UserId`. Note the source-text limitation in the test comment. | New |

### Validation Tool Results

| Tool | Result | Interpretation |
|---|---|---|
| `npx eslint .` | PASS, no output | Confirms the lint-clean claim, including the `sql.raw` and `as BusinessId` bans. `sql.raw` appears only in `sqlFileMigrationProvider.ts`. |
| Direct pino check with the `REDACT_PATHS` list | PASS | All listed secret paths are removed. This is evidence that the control works. The test gap is reported in the first finding. |
| `traceability.json` check (every OK target exists) | PASS | 75 upstream IDs, 75 coverage rows, none missing. 71 are OK with existing files. 3 are Deferred with reasons: AC1.1.4, AC1.2.3 and AC1.2.6. 1 is N/A: NFR5.6. I spot-checked the mappings for BR1.3 (unique constraint), BR2.5 (`csrfCheck`), BR2.6 (`authenticate` plus `resolveSession`), BR2.8, NFR1.7, NFR1.17, NFR1.19 and NFR8.8. Each target implements or tests the ID it is mapped to. |
| `npm run verify` and the test run | Not rerun (as instructed) | The reported 130/130 pass, 95.63% coverage and smoke timings were taken from the summary. |

### Summary

The security-critical code follows the design:
- Sign-in runs exactly one Argon2 verify on every path, including the error handler for body-parser failures.
- CSRF is checked before the session is extended, and the compare checks length first.
- The Origin allow-list refuses `null`, bad Referers and missing headers.
- The cookie attributes and the `mojud_session` name are correct.
- The duplicate-phone race is mapped to 409, and sign-up runs in one transaction.
- Clean-up uses `pg_try_advisory_xact_lock`.
- Shutdown order is clean-up, server, then pool.
- `sql.raw` is confined to the migration provider.

I found no Critical or Major problems. The open items are test-hardening gaps (redaction, the verify count on the error path, and session extension over HTTP), a path-matching edge case, and small operational notes. All of them are Minor. The deviations in the summary are justified and none weakens a control.
