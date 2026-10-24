# Infrastructure Design — walking-skeleton — Questions

> Context: the app runs only on the builder's Windows 10 Home machine with Docker Compose (`project.md` Mandated and Forbidden). The services `db`, `migrate`, `api` and `web` are designed in `nfr-design/` (`logical-components.md`, `reliability-design.md`). These points about the local setup are still open.

## Q1. Which host ports should the stack open?

A. Web app on `localhost:8080`. The database on `localhost:5433`, so database tools can connect and it does not clash with a local PostgreSQL on 5432. The API is not opened (it is reached through the web app's `/api`).
B. Only the web app on `localhost:8080`. The database is not reachable from the host.
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q2. How should day-to-day development run (while editing code)?

A. Run only `db` in Compose. Run the API with `tsx watch` and the web app with the Vite dev server (hot reload; Vite proxies `/api` to the API). The full Compose stack is used by `npm run verify` and for the merge check.
B. Run everything in Compose all the time, with source folders mounted into the containers.
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q3. Should the code include a GitHub Actions workflow now?

A. No. Checks run locally with `npm run verify` before each merge. A CI workflow is added in a later round's CI Pipeline stage, as the team practice says.
B. Yes. Add a workflow file now that runs lint, tests and coverage on push. It only runs once you push to GitHub.
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Consolidated Summary Confirmation

- Ports (Q1): the web app is on `localhost:8080`; the database is on `localhost:5433` for database tools; the API is reached only through `/api`.
- Development (Q2): only `db` runs in Compose; the API runs with `tsx watch` and the web app with the Vite dev server (hot reload, `/api` proxied); the full Compose stack is used by `npm run verify` and the merge check.
- CI (Q3): no GitHub Actions workflow now; checks run locally with `npm run verify` before each merge.

Does this all look correct before I generate the artifact?

- Looks correct
- Request changes

[Answer]: Looks correct
