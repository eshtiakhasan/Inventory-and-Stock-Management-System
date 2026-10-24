# Intent Capture & Framing — Questions

## Sources

- [desc] Initial description: "Build the first core slice of the E2E_IAM inventory/stock management app as a full-stack application. Source of truth: PRD at _bmad-output/planning-artifacts/prds/prd-E2E_IAM-2026-10-22/prd.md, UX at _bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/ (DESIGN.md, EXPERIENCE.md), WDS product brief (design-process/A-Product-Brief), trigger map and personas (design-process/B-Trigger-Map), UX scenarios (design-process/C-UX-Scenarios), and design system (design-artifacts/D-Design-System). Core-first scope for this round: scenario 09 (Haque sets up his business: sign-up), scenario 01 (Karim receives a delivery: my tasks, receive PO, scan overlay), scenario 02 (Karim picks and flags damage: pick dispatch order, flag damage). Remaining scenarios come in later rounds. Stack: TypeScript, React frontend, Node backend, PostgreSQL. Run locally with Docker Compose. No cloud deployment."
- [scope] Workflow-selected scope: `mvp`.

> The options below are drawn from your PRD (`prd.md`, "Mojud") so you can mostly confirm rather than write from scratch. Pick the option that fits, or choose X to say it your way.

## Q1. What business problem does Mojud solve?

Your PRD's Vision section describes this; please confirm the framing this workflow should carry forward.

A. Small and mid-sized FMCG distributors and wholesalers in Bangladesh (1–3 warehouses, 5–30 staff) run stock on Excel, paper khatas and WhatsApp, so nobody trusts the numbers and taka is lost without anyone knowing where. Mojud gives them one shared, trustworthy stock record.
B. Same as A, but the main problem is specifically theft and unexplained loss, not general record-keeping.
C. Same as A, but the main problem is sales reps promising stock that is not really available.
D. Not yet defined
X. Other (please specify)

[Answer]: A

## Q2. Who is the customer, and what pain do they feel today?

A. The Owner pays for it: cannot trust stock numbers without visiting the warehouse and cannot see where taka is lost. Warehouse workers use it most: recording is slow and they get blamed for gaps they did not cause.
B. The Owner only; workers are just data-entry users
C. Warehouse workers and supervisors only; the owner view comes later
D. Not yet defined
X. Other (please specify)

[Answer]: A

## Q3. What does success look like for THIS first core slice? (select all that apply)

These describe what "done" means for this round, separate from the long-term PRD success metrics.

A. An Owner can sign up and set up the business (scenario 09), running locally in Docker
B. A Warehouse worker can blind-receive a Purchase order, and a shortfall is recorded as an Issue (scenario 01)
C. A Warehouse worker can pick a Dispatch order and flag a damaged carton, with a replacement reserved automatically (scenario 02)
D. Stock never goes negative and every change is a permanent stock movement, proven by automated tests
E. Not yet defined
X. Other (please specify)

[Answer]: A, B, C, D

## Q4. What triggered this work now?

A. Turning the finished PRD and UX design into working software, starting a learning/portfolio project
B. A real distributor is waiting to try it
C. A company or client project with a deadline
D. Not identified
X. Other (please specify)

[Answer]: A

## Q5. Who are the stakeholders for this work?

A. Just me: I am the builder and also decide what the product should do
B. Me, plus a real distributor owner who gives feedback
C. Me, plus a manager or team at my company who reviews the work
D. Not identified
X. Other (please specify)

[Answer]: A

## Q6. Who decides scope and priority?

A. I decide alone
B. I decide, with input from a distributor/client
C. Someone else (a manager or client) decides; I build
D. Not identified
X. Other (please specify)

[Answer]: A

## Q7. Is there any reporting or demo cadence?

A. None needed (solo work)
B. A demo at the end of each round (core slice now, more scenarios later)
C. Regular written updates (for example weekly)
D. Not applicable
X. Other (please specify)

[Answer]: A

## Q8. What should this first version NOT do? (select all that apply)

Your request already puts transfers, stock counts, owner view, low stock, sales-rep search and My record in later rounds. These are the less obvious edges of scenarios 09, 01 and 02.

A. Offline queue and sync (scenario 01.4): online only for now
B. Supervisor decisions on Issues (approve/reject damage flags, accept shortfalls): Issues are created now but decided in a later round with the Issues inbox (scenario 03)
C. Bangla language: English first, with all screen text kept in a translation file so Bangla is easy to add
D. Excel import: setup data comes from screens or seed data
E. None: keep all of these in this round
X. Other (please specify)

[Answer]: E

## Q9. Receiving needs Products, Suppliers and Purchase orders, and picking needs Dispatch orders. How should those get into the system for this slice?

The three core scenarios start from records someone else creates (a Manager creates POs, a Sales rep creates Dispatch orders).

A. Minimal Manager/Sales screens to create Products, Suppliers, POs, Warehouses, Users and Dispatch orders
B. Seed/demo data loaded by a script only; no setup screens yet
C. Both: seed data for quick demos, plus minimal setup screens
D. Not yet defined
X. Other (please specify)

[Answer]: A

## Q10. Follow-up: your answers point two ways on size. Which do you mean?

You asked to build the core first (smaller round), and in Q8 you chose to keep everything in: offline queue and sync, Supervisor Issue decisions (part of scenario 03), Bangla, and Excel import. Together with the setup screens from Q9, that roughly doubles this round. Which do you want?

A. Keep all four in this round: a bigger first round
B. Keep offline queue and Issue decisions (they complete scenarios 01 and 02); move Bangla and Excel import to a later round
C. Keep only the offline queue (it is part of scenario 01); move the other three to later rounds
D. Move all four to later rounds: the smallest first round
X. Other (please specify)

[Answer]: D

## Consolidated Summary Confirmation

- Problem (Q1): FMCG distributors in Bangladesh (1–3 warehouses, 5–30 staff) run stock on Excel, khatas and WhatsApp; nobody trusts the numbers and taka is lost unseen. Mojud gives one shared, trustworthy stock record.
- Customer (Q2): the Owner pays (can't trust numbers or see losses); Warehouse workers use it most (slow recording, blamed for gaps they didn't cause).
- Success for this slice (Q3): Owner sign-up and business setup; blind receiving with shortfall Issue; picking with damage flag and automatic re-reservation; no-negative-stock and permanent stock movements proven by automated tests. All running locally in Docker.
- Trigger (Q4): turning the finished PRD and UX design into working software as a learning/portfolio project.
- Stakeholders, decisions, cadence (Q5–Q7): just you; you decide alone; no reporting needed.
- Left out of this round (Q8 + Q10): offline queue and sync, Supervisor Issue decisions, Bangla, and Excel import, plus the other scenarios (transfers, stock counts, owner view, low stock, sales-rep search, My record).
- Setup data (Q9): minimal setup screens for Products, Suppliers, POs, Warehouses, Users and Dispatch orders.

Does this all look correct before I generate the artifact?

- Looks correct
- Request changes

[Answer]: Looks correct
