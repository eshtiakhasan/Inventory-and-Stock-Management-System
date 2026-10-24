# Observability Design — walking-skeleton

How U1 meets `nfr-requirements/observability-requirements.md` (NFR8.9–NFR8.14, NFR1.18). Logs go to the console and the health endpoint is checked by Docker. There is no metrics backend, tracing or alerting this round, because the app runs only locally.

## Structured Logging (NFR8.9, NFR8.12)

- **Logger:** one root `pino` logger in `apps/api/src/log.ts`, with `level: LOG_LEVEL`. Development pipes the output through `pino-pretty`. Tests use `silent`, or a captured stream when a test checks the logs.
- **Request line:** `pino-http` writes one line when each request finishes. The line includes `requestId`, `method`, `route` (the route pattern, not the raw URL), `status` and `durationMs`. When a caller exists, it also includes `userId` and `businessId`, which a `customProps` hook adds from `req.caller`.
- **Response-time header:** the API sets `X-Response-Time` from the same timer as the log line (used by the NFR5.3 measurement).

## Redaction (NFR1.18)

`redact.paths` covers:
- `req.headers.cookie`
- `req.headers["x-csrf-token"]`
- `res.headers["set-cookie"]`
- `*.password`
- `*.csrfToken`

All of these are removed. Request bodies are never logged.

## Correlation (NFR8.10)

- **Request ID:** `requestId` middleware accepts an incoming `X-Request-Id` if it matches `^[A-Za-z0-9-]{8,64}$`. Otherwise it creates `crypto.randomUUID()`.
- **Where the ID goes:** the ID is stored on `req.id` (used by pino-http), returned in `X-Request-Id`, and added to every 500 body.
- **Log calls:** each module logs through `req.log`, so every line carries the ID.

## Event Log (NFR8.11)

| Event | Level | Fields |
|---|---|---|
| `auth.signup` | info | businessId, userId |
| `auth.signin` | info | userId |
| `auth.signin_failed` | info | reason (`invalid` or `deactivated`); never the phone |
| `auth.signout` | info | userId |
| `auth.session_ended` | info | userId, reason (`expired` or `inactive`) |
| `session.cleanup` | info | deleted count |
| unhandled error | error | err (with stack), requestId |

## Health (NFR8.13, NFR8.14)

- **Health endpoint:** `GET /api/v1/health` runs `SELECT 1` with a 1 s timeout. It returns 200 `{status:"ok",db:"ok"}` or 503 `{status:"error",db:"down"}`. It is not logged at `info`, to avoid noise from the Docker health checks every few seconds; it is logged at `debug`.
- **Error filter:** `npm run logs:errors` runs `docker compose logs api` and filters lines with `"level":50` or higher.

## Metrics, Tracing, Alerting, SLOs

These are not designed this round, because the app runs only locally. When a cloud environment is planned, the request line already holds what is needed for request-rate, error-rate and latency SLIs.

## Assumptions & Open Questions

None.
