# Evidence — Practices Discovery

> Written by the lead (`aidlc-pipeline-deploy-agent`). The lead draft was written in Step 2; this version adds the interview decisions from Step 5 integration. This run is lead-only: no support agents reviewed the draft and there are no contribution files.

## Run context

- **Mode**: lead-only (collaborators off for scope `mvp`); no contribution files.
- **Project type treated as**: greenfield. There is no application code, package manifest, CI or linter configuration in the repository, so practices come from `org.md` defaults adapted to the facts below and to the builder's interview answers, not from code evidence.
- **Re-run context**: none. `team.md` and `project.md` are empty templates, so this is a first run.
- **Draft timestamp**: 2026-10-24T13:42:35Z at commit `c27c00a`.
- **Integration timestamp**: 2026-10-24T14:00:52Z at commit `c27c00a`.

## What was inspected

| Source | What it showed |
|---|---|
| `aidlc/spaces/default/memory/org.md` (Way of Working, Walking Skeleton, Testing Posture, Deployment, Code Style) | The framework defaults used as suggested answers: trunk-based with squash-merge to `main`; walking skeleton when the scope sets `skeleton: on`; test-after with an 80% line-coverage floor and CI before merge for `mvp`; deploy on merge to staging with a manual production gate; defer to repository formatter and linter configuration |
| `aidlc/spaces/default/memory/team.md`, `project.md` | Empty templates; no affirmed practices |
| `aidlc/spaces/default/memory/phases/inception.md` | Inception guardrails (traceability, no unresolved contradictions) applied to this stage |
| `<record>/aidlc-state.md` | Scope `mvp`; Test Strategy Standard; Depth Standard; Operation phase skipped (stages 4.1 to 4.7 SKIP); CI Pipeline stage 3.7 is EXECUTE; Construction is unit-major with checkpoints enabled and serial execution |
| `ideation/intent-capture/intent-statement.md` | Stack and local-only running come from the initial request; success outcomes S4 (stock never negative, permanent movements, checked by automated tests) and S5 (runs locally with Docker Compose); learning and portfolio project |
| `ideation/feasibility/constraint-register.md` | C-T1 stack fixed; C-T2 local Docker Compose only, no cloud; C-T3 Windows 10 Home needs WSL 2 for Docker Desktop; C-T4 no outside systems; C-O1 one builder decides and approves; C-O2 beginner builder |
| `ideation/feasibility/feasibility-assessment.md`, `raid-log.md` | Docker not installed yet (I1, D1); fallback for R1 is the database alone in Docker or a local PostgreSQL; only demo data (A1); stock rules must have automated tests (R3) |
| `ideation/scope-definition/scope-document.md` | Capabilities for this round; cloud deployment out of scope |
| Repository root listing and file search | No `package.json`, `tsconfig.json`, Prettier or ESLint configuration, `.editorconfig`, `.github/` workflows or Compose file. `.gitignore` already excludes `.env`, `.env.*` and `node_modules/` |
| `git log --all`, `git remote -v` | Four commits on `main`, all design documents; no other branches; remote `origin` on GitHub (`eshtiakhasan/Inventory-and-Stock-Management-System`) |
| `practices-discovery-questions.md` | The completed interview: six answers and the Consolidated Summary Confirmation, answered "Looks correct" |

## What was inferred

- **Branching**: there is only `main` and no branch history to learn from, so trunk-based with squash-merge was proposed as the `org.md` default. It matches how Construction worktrees are created and merged (`--base main --target main --strategy squash`). The builder confirmed it (Q1).
- **Review**: with one builder (C-O1) there is nobody else to review a pull request; the workflow's approval gates act as the review step.
- **CI**: a GitHub remote exists, so GitHub Actions is the natural home for the CI the CI Pipeline stage (3.7) will build. Until it exists, the checks run locally.
- **Deployment**: with the Operation phase skipped and no cloud (C-T2), there is no deployment target. "Deploy" means restarting the app locally after a merge and running the smoke check.
- **Rollback**: only demo data is used (A1), so resetting the local database is an acceptable rollback path for database changes this round.

## Interview decisions

| Question | Answer | Who chose | What it changed in the practices |
|---|---|---|---|
| Q1. How finished work gets into `main` | `X. rigth now you do the work. i will push it later.start the work immedietly` (verbatim) | Builder | The AI builds each Bolt on a short-lived branch and squash-merges it into `main` locally. The builder pushes to GitHub later, themselves. The AI does not push and does not open pull requests. |
| Q2. Thin end-to-end slice first | B: yes; after it works, continue through later pieces automatically | Builder | Walking skeleton on. After the skeleton is approved, later checkpoints continue automatically; the builder still approves plans, the verification command and failures. This replaces the draft's suggestion to stop at each checkpoint. |
| Q3. Test timing and coverage | A: test-after; 80% line coverage; run tests locally before each merge until CI exists | Builder | `Methodology: test-after`; 80% floor kept; local checks before merge until stage 3.7 adds CI. |
| Q4. Meaning of "deploy"; is Docker Compose a hard rule | B: no deploy target; restart locally with Docker Compose plus a quick check after each merge; database-only in Docker or locally installed PostgreSQL allowed if Docker cannot be made to work | Builder | Deployment section and the Mandated "run locally" rule both allow the database fallback. |
| Q5. Code style | A: Prettier defaults, ESLint with TypeScript and React rules, strict TypeScript; lint errors block a merge | Conductor, on the builder's instruction to start immediately (given in the Q1 answer) | Code Style section as drafted, with no personal preferences added. |
| Q6. Add "no connections to outside systems" as a hard rule | B: no, keep only the three rules | Conductor, on the builder's instruction to start immediately (given in the Q1 answer) | `discovered-rules.md` keeps the three stated rules; C-T4 stays a scope constraint, not a promoted rule. |

The builder confirmed all six decisions together through the Consolidated Summary Confirmation ("Looks correct"), including the two the conductor chose.

## Rule-layer compatibility notes

- The Deployment section does not remove or weaken the `org.md` rule; it states that the rule has no environment to apply to this round and applies unchanged in a later cloud round. The promotion is strictly additive.
- The 80% coverage floor is kept as in `org.md`. Running the checks locally until CI exists is a stated gap in tooling, not a weaker rule; once stage 3.7 adds CI, checks run there before merge as `org.md` requires.
- The Way of Working keeps `org.md`'s trunk-based, squash-merge practice and adds that pushing to GitHub is done by the builder, not the AI. This narrows who pushes; it does not contradict the broader rule.
- The walking-skeleton choice (continue automatically after approval) uses the `org.md` "Continue automatically" option; plan approval, summary confirmation, verification command selection and failures stay human stops.

## Remaining uncertainty

- **Docker is not installed yet** (RAID I1, D1; constraint C-T3). Docker Desktop with WSL 2 still has to be installed and tested on the Windows 10 Home machine before the walking skeleton can run under Docker Compose. If it cannot be made to work, the Q4 fallback applies, and the skeleton's verification command must be chosen to match whichever setup is in use.
- **Project type mismatch**: `aidlc-state.md` still records **Project Type: Brownfield** (source: workspace scan), while the repository has no application code and Reverse Engineering was skipped. These practices were written as greenfield. The orchestrator may want to confirm or correct the project type.
- **Pushing and CI**: because the builder pushes to GitHub later and by hand, a GitHub Actions workflow added by stage 3.7 will only run once the builder pushes. Until then, the local pre-merge checks are the only gate.
- **Test tooling** (Vitest, Supertest, React Testing Library) is a suggestion, not a decision; it is settled in Construction design.
