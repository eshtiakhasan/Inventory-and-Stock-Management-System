# Team-Level Rules

> This team's affirmed practices and corrections. Loaded after `org.md` as
> strict-additive guidance; contradictions with broader policy are rejected.
> Populated by the practices-discovery affirmation gate. Edit at the gate,
> not directly.

## Way of Working

We use **trunk-based development** with `main` as the only long-lived branch. Each piece of work (one Bolt in Construction) is built on its own short-lived branch, created from `main` and merged back into `main` when the Bolt is approved, normally within one or two days.

For Construction worktrees, the worktree base branch is `main` and the merge target is `main`.

We **squash-merge** each Bolt branch into `main` locally, so every Bolt becomes one commit on `main` named after the Bolt. The Bolt's step-by-step commits stay on its branch until the worktree is discarded, and the AI-DLC audit log keeps the full history of decisions.

The AI does the build work and the local merges. The AI does not push to the GitHub remote and does not open pull requests; the builder pushes `main` to GitHub themselves, when they choose to.

There is one builder, who also decides and approves everything, so no second-person code review is required before a merge. The approval gates in the workflow are the review step.

## Walking Skeleton

**We build a thin end-to-end slice first.** It proves that the React frontend, the Node backend and the PostgreSQL database start together and talk to each other before any real feature is built.

The first Unit in Construction is that smallest working slice: one page in the browser calls one backend endpoint, which reads from and writes to the database, all started with one Docker Compose command (or with the allowed database fallback described under Deployment). Later Units are built only after this slice runs and the builder approves it.

The slice is checked with one command that the builder approves in Construction and that shows the real end-to-end result on this machine (for example: start the stack, then run a smoke test that calls the backend and confirms a database round trip). The exact command is chosen and approved in Construction, not here.

After the builder approves the working slice, the remaining Units **continue automatically** through their checkpoints. The builder still approves every plan, the verification command, and anything that fails.

## Testing Posture

- **Methodology**: test-after
- **Methodology evidence**: Chosen by the builder in the interview (Q3, option A), matching the `org.md` default. Writing each layer's tests right after building it is the easiest rhythm for a builder who is new to most of the stack; the ideation artifacts set no testing method and only require automated tests for the stock rules (intent statement S4, RAID R3).
- **Ordering**: Build each testable layer (database rules, backend logic and endpoints, frontend screens), then write and run that layer's tests before moving on to the next layer.
- **Must-test rules**: stock never goes negative, and every stock change is a permanent stock movement that is never edited or deleted. These rules have automated tests from the first Unit that touches stock (intent statement S4).
- **Coverage floor**: at least 80% line coverage, measured on every test run. This is the `mvp` default in `org.md`; Build and Test checks it and it may not be lowered to make a step pass.
- **Test types**: unit tests for backend logic and stock rules; integration tests for backend endpoints against a real PostgreSQL database; component tests for the key React screens. The volume of each follows the workflow's Standard test strategy.
- **Tooling**: chosen when the code is designed in Construction. Suggested candidates are Vitest with its built-in coverage report, Supertest for backend endpoint tests, and React Testing Library for screens.
- **Before merge**: the full test suite, the coverage check and the linter pass before a Bolt is merged to `main`. No CI exists yet, so these checks run locally before each merge until the CI Pipeline stage adds automatic checks on GitHub; from then on they also run in CI, as `org.md` asks.

## Guard Policy

<!-- Affirmed by the team. Mode: strict, relaxed, or off. Strict here holds for every intent, whatever one person asks in chat; relaxed or off here applies to every intent whose policy came from its scope, unless project.md or the person sets another; changing this line changes it. A section under the retired Change Control heading, written by an earlier release, is still read. -->

## Deployment

**This round has no deployment target.** There is no staging and no production; the app runs only on the builder's machine (constraint register C-T2). The `org.md` rule (deploy on merge to staging, with a separate manual approval for production) stays in force unchanged; it has no environment to act on this round and applies as written when a cloud environment is added in a later round.

In this round, "deploying" means running the current `main` locally: after each Bolt is merged, the stack is rebuilt and restarted with Docker Compose and the approved smoke check is run to confirm the app still starts and works end to end.

Docker Compose for the whole app is the normal way to run it. If Docker cannot be made to work on the Windows 10 Home machine, the allowed fallback is to run only the PostgreSQL database in Docker, or to use a locally installed PostgreSQL, with the frontend and backend run directly with Node. The smoke check still runs after each merge in either setup.

**Rolling back** means checking out the previous commit on `main` (or reverting the Bolt's squash commit) and restarting the app. Database changes are applied as versioned migration files that only move forward, so a rollback also needs either a migration that undoes the change or a fresh local database with demo data. Only demo and test data is used this round (RAID A1), so resetting the local database is acceptable.

Secrets such as the database password live in a local `.env` file that `.gitignore` already excludes from git; a committed `.env.example` lists the variable names without values.

## Code Style

We follow the configuration files in the repository. None exist yet, so the first Unit adds them:

- **Formatter**: Prettier with its default settings, configured in the repository root (`.prettierrc`), for all TypeScript, JavaScript, JSON, CSS and Markdown files.
- **Linter**: ESLint with the TypeScript rules (`typescript-eslint`) and the React rules for the frontend. Lint errors block a merge. The linter and formatter run locally before each merge, and in CI once the CI Pipeline stage adds it.
- **TypeScript**: strict mode on in every `tsconfig.json`, so type errors are caught early.
- **Naming**: the usual TypeScript conventions: `camelCase` for variables and functions, `PascalCase` for types and React components, `UPPER_SNAKE_CASE` for constants. Database tables and columns use `snake_case`, the usual PostgreSQL convention. No other project-wide naming rules.
- When an agent suggests a style change, it reads the linter and formatter configuration first and only suggests what those tools do not already cover.
## Forbidden

<!-- Team-specific forbidden patterns -->

## Mandated

<!-- Team-specific mandates -->

## Corrections

<!-- Self-learning loop appends here. -->
