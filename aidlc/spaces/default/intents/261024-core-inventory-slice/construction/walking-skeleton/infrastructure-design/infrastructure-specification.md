# Infrastructure Specification — walking-skeleton

Local-only infrastructure for U1: Docker Compose on the builder's Windows 10 Home machine (`project.md`; `nfr-requirements/tech-stack-decisions.md`). It implements the components in `nfr-design/logical-components.md` and the start order in `nfr-design/reliability-design.md`. The answers to this stage's questions Q1–Q3 apply. No cloud resources are created (`project.md` Forbidden).

## Deployment

| Facet | Choice | Rationale |
|---|---|---|
| Compute model | Containers: Docker Desktop with WSL 2 and Docker Compose v2.24+ | Mandated local run (NFR8). v2.24+ supports `service_completed_successfully` and `up --wait`, and treats a one-off service that exits 0 (`migrate`) as a success rather than a failure |
| Networking topology | One Compose bridge network `mojud`. Host ports: `web` at `127.0.0.1:8080:80` and `db` at `127.0.0.1:5433:5432`, both bound to localhost only. `api` (port 3000) has no host port and is reached only through nginx `/api/` (Q1) | Same origin, no CORS (NFR1.15); nothing is reachable from the local network |
| Storage strategy | Named volume `pgdata` for PostgreSQL data. Images are rebuilt from source and hold no other state | Data survives `down` and is cleared by `down -v` (`reliability-design.md`) |
| Environments | **local-full**: all four services in Compose, used by `npm run verify` and after each merge. **local-dev**: only `db` in Compose; the API runs with `tsx watch` on port 3000 and the web app with the Vite dev server on port 5173, which proxies `/api` to 3000 (Q2). **test**: the database `mojud_test` in the same `db` container. Vitest's global setup does two things on every run, and both are safe to repeat on any existing volume. It connects to the `postgres` maintenance database, and creates `mojud_test` if it is missing (`SELECT 1 FROM pg_database WHERE datname = 'mojud_test'`, then `CREATE DATABASE`). It then runs the same Kysely migrator as the `migrate` service against it (NFR7.2). **verify**: a separate Compose project, `-p mojud-verify`, using the same files. It is started on an empty volume and removed with `down -v` at the end, so every run checks a clean start (NFR8.4). There is no staging or production this round | Hot reload while coding; production-like build for verification |
| IaC approach | `docker-compose.yml` at the repository root, plus `apps/api/Dockerfile` and `apps/web/Dockerfile` (multi-stage) and `apps/web/nginx/` config, all in git | Reproducible start with one command (NFR8.4) |
| Resource sizing | `db` memory limit 1 GB, `api` 512 MB, `web` 256 MB (`deploy.resources.limits.memory`), `migrate` 256 MB | Fits a laptop (`performance-requirements.md` Resource Constraints) |

## Infrastructure Services

| Service | Role | Configuration | Notes |
|---|---|---|---|
| `db` | database | Image `postgres:16-alpine`. Env `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB=mojud`. Health check `pg_isready -h 127.0.0.1 -U $${POSTGRES_USER} -d $${POSTGRES_DB}`, interval 2 s, timeout 3 s, retries 30, `start_period` 10 s. No init scripts: the test database is created by the test setup (see Environments) | Volume `pgdata`; host port 5433 (Q1) |
| `migrate` | one-off job | Same image as `api`, command `node dist/migrate.js`, `restart: "no"`, `depends_on: db: service_healthy` | Applies `migrations/*.sql` and exits 0 |
| `api` | application server | Built by `apps/api/Dockerfile` (`node:22-alpine`, `npm ci --omit=dev`, runs as user `node`). `env_file: .env`. `depends_on: db: service_healthy, migrate: service_completed_successfully`. Health check `wget -qO- http://127.0.0.1:3000/api/v1/health`, interval 2 s, timeout 3 s, retries 15, `start_period` 5 s. `restart: unless-stopped`. `stop_grace_period: 15s` | Graceful shutdown within 10 s (NFR8.8) |
| `web` | static web server and reverse proxy | Built by `apps/web/Dockerfile`: the Vite build, then `nginx:1.27-alpine`. Serves `/`, proxies `/api/` to `http://api:3000`. Security headers via `security-headers.conf` (`nfr-design/security-design.md`). gzip on. Health check `wget -qO- http://127.0.0.1/healthz` (an nginx `location = /healthz` that returns 200), interval 2 s, timeout 3 s, retries 15. `depends_on: api: service_healthy` | Host port 8080 (Q1). Worst-case ready time: db about 15 s, then migrate about 5 s, then api about 10 s, then web about 5 s, which is well inside the 60 s budget |
| cache, queue, search, CDN, DNS, load balancer | — | Not used | Not needed for one local user (`scalability-design.md`) |

## Configuration and Secrets

| Variable | Used by | Example value in `.env.example` (local only) |
|---|---|---|
| `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB` | `db` | `mojud` / `local-dev-only` / `mojud` |
| `DATABASE_URL` | `api`, `migrate` | `postgres://mojud:local-dev-only@db:5432/mojud` (local-dev uses `localhost:5433`, set by `npm run dev`) |
| `TEST_DATABASE_URL` | tests | `postgres://mojud:local-dev-only@localhost:5433/mojud_test` |
| `APP_ORIGIN` | `api` (Origin check) | `http://localhost:8080,http://127.0.0.1:8080,http://localhost:5173,http://127.0.0.1:5173`. This is a comma-separated allow-list, and the Origin check matches any one entry exactly (`nfr-design/security-design.md`). Both local-full and local-dev pass NFR1.19, whichever local hostname the browser uses |
| `COOKIE_SECURE` | `api` | `false` (no HTTPS on localhost) |
| `LOG_LEVEL` / `DB_POOL_MAX` | `api` | `info` / `10` |

`.env` is git-ignored, and `.env.example` is committed (NFR1.12).

## Shared Infrastructure

| Shared Resource | Owner Unit | Consumer Units | Access Boundary |
|---|---|---|---|
| `docker-compose.yml`, Dockerfiles, nginx config | walking-skeleton | backend, frontend | Later units add migrations, modules and screens. They do not add services unless their own Infrastructure Design says so |
| PostgreSQL database `mojud` | walking-skeleton (`identity` tables) | backend (its module tables) | Each module owns its tables (`logical-components.md`) |

## Assumptions & Open Questions

None.
