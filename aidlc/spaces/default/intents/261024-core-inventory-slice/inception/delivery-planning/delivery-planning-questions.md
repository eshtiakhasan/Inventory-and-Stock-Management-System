# Delivery Planning — Questions

> Context: Units Generation gave three units that must be built in order: U1 walking skeleton → U2 backend → U3 frontend (`unit-of-work-dependency.md`). This stage plans the Bolts, where a Bolt is one build pass over a piece of the work that ends in something that runs and can be checked. Several earlier points are already settled and are not asked again: you build alone (intent capture), the thin end-to-end slice comes first (team practices), nothing runs in parallel (the dependency graph), and nothing outside the project blocks the work except installing Docker (feasibility). The architecture review warned that U2 is very large and proves the riskiest part, the stock rules, late.

## Q1. After the walking skeleton, what should come first inside the large backend unit (U2)?

A. Risk first: the stock ledger and opening stock with their must-pass tests (never negative, never edited, applied once, safe at the same moment), before purchasing and dispatch build on them
B. Value first: setup data (warehouses, users, products, suppliers) first, then the stock ledger, then the order flows
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q2. How big should one Bolt be?

A. Split the big units: U1 as one Bolt; U2 as four Bolts (setup data; stock ledger and opening stock; purchasing, receiving and Issues; dispatch, picking, damage and My tasks); U3 as two Bolts (setup and order screens; floor screens and Issues list). Seven Bolts, each ending in tested, running code
B. One Bolt per unit: three Bolts
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q3. What worries you most about this build? (select all that apply)

These get tackled early or watched closely.

A. Getting Docker running on Windows 10 Home
B. The stock rules being subtly wrong (negative stock, double-counting, edits to history)
C. Learning TypeScript, React, Node and PostgreSQL as I go
D. The amount of screen work in the frontend
E. Nothing in particular
X. Other (please specify)

[Answer]: A, B, C, D

## Consolidated Summary Confirmation

- Order inside the backend (Q1): risk first. Right after the skeleton, the stock ledger and opening stock (with just the warehouses and products they need) are built and proven by their must-pass tests, before purchasing and dispatch build on them.
- Bolt size (Q2): seven Bolts. B1 walking skeleton (U1). U2 as four Bolts: B2 stock ledger and opening stock, B3 remaining setup (users, permissions, suppliers, warehouse rules), B4 purchasing, receiving and Issues, B5 dispatch, picking, damage and My tasks. U3 as two Bolts: B6 setup and order screens, B7 floor screens and Issues list.
- Worries to tackle early (Q3): Docker on Windows (first thing in B1), stock rules (B2, right after the skeleton), learning the stack (small Bolts, each explained), and the amount of screen work (split into two Bolts).

Does this all look correct before I generate the artifact?

- Looks correct
- Request changes

[Answer]: Looks correct
