# Monitoring Design — walking-skeleton

The local platform version of `nfr-design/observability-design.md`. There is no monitoring service, because the app runs only on the builder's machine. Docker health checks and the console logs are the monitoring this round.

## Metrics & KPIs

| Metric | Source | Threshold | Why it matters |
|---|---|---|---|
| `api` health status | Docker health check on `GET /api/v1/health` | Must be `healthy` within 60 s of `up` | Start-order gate and smoke test (NFR8.5, NFR8.13) |
| `db` health status | Docker health check `pg_isready` over TCP | `healthy` before `migrate` runs | Prevents an early migration (NFR8.4) |
| Request duration | `durationMs` in each request log line; the `X-Response-Time` header | `/auth/me` median ≤ 50 ms budget, and the smoke test fails above 200 ms | NFR5.3 |
| Sign-up and sign-in time | Playwright timers | ≤ 2 s | NFR5.1, NFR5.2 |
| 5xx count | Log lines with `level ≥ 50` | 0 during `npm run verify` | Any 500 in the smoke test fails it |
| Test coverage | Vitest V8 coverage | ≥ 80% lines | NFR7.1 |

## Alerts

| Alert | Condition | Severity | Routes to |
|---|---|---|---|
| Stack not healthy | `docker compose up --wait` times out after 60 s | Blocking | Builder's terminal; `npm run verify` fails |
| Smoke or test failure | Any failing step in `npm run verify` | Blocking | Builder's terminal; the merge is blocked |
| Container restarting | `docker compose ps` shows `restarting` | Info | Builder checks `npm run logs:errors` |

There is no paging and no external alert routing this round.

## SLIs / SLOs

| SLI | SLO target | Measurement window |
|---|---|---|
| Smoke path success (sign-up → home → sign-out → sign-in) | 100% of `npm run verify` runs | Each run |
| `/auth/me` median server time | ≤ 50 ms budget (fails above 200 ms) | 20 calls per smoke run |
| Clean start from an empty volume (verify project `mojud-verify`, removed with `down -v`) | 100% | Each `npm run verify` run |

Operational SLOs, such as availability over 30 days, are defined when the app is deployed to a cloud environment in a later round.

## Logs & Tracing

- **Log aggregation:** none. `docker compose logs -f api` shows the pino JSON. In local-dev, the log is pretty-printed with `pino-pretty`.
- **Error filter:** `npm run logs:errors` filters lines at `error` level and above.
- **Retention:** Docker's default `json-file` driver, capped with `max-size: 10m` and `max-file: 3` per service.
- **Tracing:** none. The request ID (`X-Request-Id`) links a browser error to its log line.
- **Dashboards:** none this round.

## Assumptions & Open Questions

None.
