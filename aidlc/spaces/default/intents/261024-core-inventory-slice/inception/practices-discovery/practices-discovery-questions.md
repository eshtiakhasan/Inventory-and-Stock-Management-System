# Practices Discovery — Questions

> Context: this is a new project with no code yet, so each question offers a suggested answer drafted from the framework's defaults and adapted to this round (one beginner builder, local Docker Compose only, no CI yet). The draft is in `team-practices.md`; the reasoning is in `evidence.md`. Your answers become the project's working practices.

## Q1. How should finished work get into `main`?

Each piece of work (one unit of the build) is done on its own short-lived branch and merged back.

A. Short-lived branch per piece, squash-merged into `main` locally (one commit per piece), then `main` pushed to GitHub after every piece
B. Same, but each piece goes through a GitHub pull request instead of a local merge
C. Commit straight to `main`; no branches
D. Not yet defined
X. Other (please specify)

[Answer]: X. rigth now you do the work. i will push it later.start the work immedietly

## Q2. Build a thin end-to-end slice first? A walking skeleton is a minimal version that runs the whole way through, built first to prove the pieces connect before the real features go in.

Here that would be one browser page calling one backend endpoint that reads and writes the database, all started with one Docker Compose command.

A. Yes; after it works, stop for my review at each later checkpoint
B. Yes; after it works, continue through the later pieces automatically (I still approve plans and failures)
C. No; build the features in order without a separate slice first
D. Not yet defined
X. Other (please specify)

[Answer]: B

## Q3. When are tests written, and how much must they cover?

Your scope requires automated tests that prove stock never goes negative and stock records are never changed. The framework default for this kind of project is an 80% line-coverage minimum.

A. Write each layer's tests right after building it (test-after); 80% line coverage; run the tests locally before each merge until the CI Pipeline stage adds automatic checks on GitHub
B. Write the stock-rule tests first, before the code, and the other tests right after; 80% coverage; run locally until CI exists
C. Write every test first, before the code (test-driven development); 80% coverage; run locally until CI exists
D. Not yet defined
X. Other (please specify)

[Answer]: A

## Q4. There is no staging or production this round. What does "deploy" mean, and is Docker Compose a hard rule?

Docker is not installed yet on your Windows 10 Home machine.

A. No deploy target; after each merge, restart the app locally with Docker Compose and run a quick check. Docker Compose for the whole app is required, so Docker gets installed before building starts
B. Same as A, but if Docker can't be made to work, falling back to running only the database in Docker (or PostgreSQL installed directly) is allowed
C. Not yet defined
D. Not applicable
X. Other (please specify)

[Answer]: B

## Q5. What code style rules should the project use?

None exist yet; the first piece of work would add them.

A. Prettier (automatic formatting) with default settings, ESLint (code checks) with TypeScript and React rules, and strict TypeScript; lint errors block a merge
B. Same as A, with my own preferences (say which in X, for example single quotes or a line length)
C. Formatting only (Prettier); no lint rules yet
D. Not yet defined
X. Other (please specify)

[Answer]: A (chosen on your instruction to start immediately)

## Q6. Your request set three hard rules: the stack (TypeScript, React, Node, PostgreSQL), running locally with Docker Compose, and no cloud deployment this round. Should "no connections to outside systems; the app has its own database" also be a hard rule?

A. Yes, add it as a hard rule for this round
B. No, keep only the three rules
C. Not yet defined
D. Not applicable
X. Other (please specify)

[Answer]: B (chosen on your instruction to start immediately)

## Consolidated Summary Confirmation

- Merging (Q1): I do the work locally, each piece on its own short-lived branch squash-merged into `main`; you push to GitHub later yourself. No pushing or pull requests by me.
- Walking skeleton (Q2): yes, build the thin end-to-end slice first; once you approve it, the later pieces continue automatically (you still approve plans and anything that fails).
- Testing (Q3): tests written right after each layer; at least 80% line coverage; tests run locally before each merge until automatic checks are added.
- Deploy (Q4): no deploy target; after each merge the app restarts locally with Docker Compose plus a quick check. If Docker won't work, running only the database in Docker or PostgreSQL installed directly is allowed.
- Code style (Q5): Prettier defaults, ESLint with TypeScript and React rules, strict TypeScript; lint errors block a merge.
- Hard rules (Q6): keep the three: the TypeScript/React/Node/PostgreSQL stack, running locally, no cloud deployment this round.

Does this all look correct before I generate the artifact?

- Looks correct
- Request changes

[Answer]: Looks correct
