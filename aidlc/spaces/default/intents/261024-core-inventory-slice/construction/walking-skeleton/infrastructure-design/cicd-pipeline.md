# CI/CD Pipeline — walking-skeleton

The delivery pipeline for this round is local (Q3). There is no GitHub Actions workflow. The approved verification command `npm run verify` (`verification-command.txt`) is the pipeline. It runs before every merge to `main` (team Way of Working and Testing Posture). A GitHub CI workflow is added in a later round's CI Pipeline stage. Nothing is deployed to a cloud environment (`project.md` Forbidden).

## Branch and Merge Flow

1. **Branch.** Each Bolt is built on a short-lived branch `bolt/<slug>`, created from `main`.
2. **Verify.** The builder or the AI runs `npm run verify` on the branch.
3. **Merge.** When verify passes and the Bolt is approved, the AI squash-merges the branch into `main` locally, as one commit named after the Bolt.
4. **Local deploy.** On `main`, `npm run verify` runs again, then `npm run up` (`docker compose up -d --build --wait`, the default project `mojud`) leaves the app running at `http://localhost:8080`. This is the "deploy" step in team Deployment: the stack is rebuilt, the smoke check runs, and the app stays up.
5. **Push.** The AI never pushes. The builder pushes `main` to GitHub when they choose.

## `npm run verify` Stages

All Docker commands in verify use their own Compose project, `-p mojud-verify`, which gets its own empty volume. So verify never touches the builder's demo data in the `mojud` project, and every run checks a clean start (NFR8.4).

| # | Stage | Command (script) | Gate: fails when |
|---|---|---|---|
| 0 | Preflight | `node scripts/preflight.mjs` | Docker is not running; Docker Compose is older than v2.24; `.env` is missing; or host ports 8080 or 5433 are in use. If they are, the message says to stop the dev stack with `npm run down` |
| 1 | Static checks | `npm run lint` (ESLint), `npm run typecheck` (`tsc -b`), `npm run format:check` (Prettier), `node scripts/secret-scan.mjs` | Any lint, type or format error, or a secret is found (NFR9.1, NFR1.12) |
| 2 | Start database | `docker compose -p mojud-verify up -d --wait db` | `db` is not healthy |
| 3 | Unit and integration tests | `npm run test:coverage`. Vitest runs across `apps/api`, `apps/web` and `packages/contracts`. Its global setup creates `mojud_test` if missing and migrates it (`infrastructure-specification.md` Environments) | Any test fails, or line coverage is below 80% (NFR7.1, NFR7.2) |
| 4 | Build and start full stack | `docker compose -p mojud-verify up -d --build --wait --wait-timeout 60` | An image build fails, `migrate` fails, or a service is not healthy within 60 s (NFR8.4, NFR8.5) |
| 5 | Smoke test | `npm run test:smoke`: Playwright Chromium against `http://127.0.0.1:8080`. Each run uses a unique phone number (`01` followed by the last 9 digits of `Date.now()`: 11 digits, valid under BR1.2) and a unique business name, so a repeated run never hits DUPLICATE | The sign-up → home → sign-out → sign-in path, the timings, the web headers or the keyboard path fail (NFR5.x, NFR6.2, NFR1.14) |
| 6 | Tear down | `docker compose -p mojud-verify down -v` | — (always runs, see below) |

`scripts/verify.mjs` runs the stages in order with Node's `child_process.spawnSync`. It uses no shell features, so it runs the same in PowerShell, Git Bash, macOS and Linux.
- Stages 0–5 stop at the first failure and print which stage failed.
- Stage 6 runs in a `finally` block, and also from a `SIGINT` / `SIGTERM` handler when the builder presses Ctrl+C. Teardown therefore always happens once stage 2 has started.
- The exit code is that of the first failing stage, or 0.

## Build Artifacts

- **Images:** `mojud-api` and `mojud-web` are built locally by Compose and tagged `local`. No registry is used.
- **Dependencies:** `package-lock.json` is committed, and `npm ci` is used in the Dockerfiles.

## Deployment Strategy

Recreate. `docker compose up -d --build --wait` replaces the containers in place. There is no blue/green or canary deployment, because there is only one local user.

## Rollback

1. Check out the previous `main` commit, or revert the Bolt's squash commit with `git revert <sha>`.
2. Run `npm run verify`, then `npm run up`.
3. If the reverted Bolt added a migration, reset the `mojud` database with `npm run db:reset` (`docker compose down -v`, then `up -d --wait`). Migrations only move forward. Resetting is acceptable because there is only demo data (team Deployment practice; RAID A1).

## Secrets in the Pipeline

The pipeline reads only the local `.env`. No secrets are written in scripts, Dockerfiles or Compose files; Compose uses `env_file`. The secret scan in stage 1 enforces this. When CI is added later, the same variable names will come from GitHub Actions secrets.

## Assumptions & Open Questions

None.
