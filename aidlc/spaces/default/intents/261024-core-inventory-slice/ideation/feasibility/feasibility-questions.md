# Feasibility & Constraints — Questions

> Context: the intent statement (`ideation/intent-capture/intent-statement.md`) sets this round to sign-up, blind receiving, and picking with damage flags, built with TypeScript, React, Node and PostgreSQL, running locally with Docker Compose and no cloud deployment. These questions look for what could block or slow that down.

## Q1. Does this round need to connect to any other system?

A. None: a standalone app with its own database
B. It must import from or export to an existing spreadsheet or tool now
C. It must connect to an accounting tool (for example Tally) now
D. Not identified
X. Other (please specify)

[Answer]: A

## Q2. Are there legal or compliance rules this round must meet?

This round runs only on your machine. Real customer data would bring data-protection duties.

A. None for this round: only demo or test data, no real customer data
B. Real distributor data will be used, so data-protection rules apply now
C. Not identified
D. Not applicable
X. Other (please specify)

[Answer]: A

## Q3. What is your experience with the chosen stack (TypeScript, React, Node, PostgreSQL, Docker)?

Your PRD describes the builder as a beginner working alone. This shapes how much the design should explain and how simple the code should stay.

A. Beginner across most of it: keep the design simple and explained
B. Comfortable with React/TypeScript, newer to Node, PostgreSQL and Docker
C. Comfortable with backend (Node/PostgreSQL), newer to React
D. Experienced full-stack: the design can assume common patterns
X. Other (please specify)

[Answer]: A

## Q4. What time and budget do you have for this round?

A. No fixed deadline; part-time, roughly 2–4 weeks; no money to spend (free, local tools only)
B. No fixed deadline and no budget limits
C. A fixed deadline (please say when in X)
D. Not yet defined
X. Other (please specify)

[Answer]: B

## Q5. Is Docker ready on your machine?

Your machine runs Windows 10 Home. Docker Desktop on Windows Home needs WSL 2, and a missing or broken setup would block running the app.

A. Docker Desktop is installed with WSL 2 and runs containers fine
B. Installed, but I have not tried running containers yet
C. Not installed yet
D. Not sure
X. Other (please specify)

[Answer]: C

## Q6. What should the "scan overlay" in scenario 01 actually do in this round?

Phone browsers only allow the camera on secure (HTTPS) pages or `localhost`. Testing a real phone against an app running on your laptop needs extra HTTPS setup, so this choice changes the effort a lot.

A. Real camera barcode scanning, including testing from a phone on the local network (needs local HTTPS setup)
B. Real camera scanning on the laptop browser only (works on `localhost`); phone testing later
C. The scan overlay screen with typed SKU or product search only; real camera scanning in a later round
D. Not yet defined
X. Other (please specify)

[Answer]: C

## Consolidated Summary Confirmation

- Connections (Q1): none; a standalone app with its own database.
- Compliance (Q2): none for this round; demo and test data only.
- Skills (Q3): beginner across most of the stack, so the design stays simple and explained.
- Time and budget (Q4): no fixed deadline and no budget limits.
- Docker (Q5): not installed yet. Docker Desktop with WSL 2 must be set up on Windows 10 Home before the app can run; this is the main blocker.
- Scanning (Q6): the scan overlay accepts a typed SKU or product search only; real camera scanning moves to a later round.

Does this all look correct before I generate the artifact?

- Looks correct
- Request changes

[Answer]: Looks correct
