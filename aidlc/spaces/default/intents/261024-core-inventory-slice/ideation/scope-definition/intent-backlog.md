# Intent Backlog — Mojud core slice

Proto-units of work for this round, prioritized with MoSCoW and sequenced dependency-first (Q4). The scope boundary comes from the scope document, which builds on the intent statement ("intent-statement"), the feasibility assessment ("feasibility-assessment") and the constraint register ("constraint-register").

## Prioritized Backlog

| Order | ID | Proto-unit | What it delivers | MoSCoW | Depends on | Success outcome |
|---|---|---|---|---|---|---|
| 1 | IB-1 | Business, accounts and roles | Owner sign-up that creates the business; sign in and sign out for everyone; six roles with their permissions | Must | — | S1 |
| 2 | IB-2 | Setup screens | Warehouses, Users (role, assigned warehouses, password), Products (code, units, carton size, barcode), Suppliers | Must | IB-1 | S1 |
| 3 | IB-3 | Stock record core | Permanent stock movements, stock states (Available, Reserved, Damaged), and the never-negative rule, with automated tests | Must | IB-2 | S4 |
| 4 | IB-4 | Opening stock | Manager enters starting quantity and unit cost per product per warehouse | Must | IB-3 | S3 |
| 5 | IB-5 | Purchase orders | Manager creates a purchase order for one supplier and one warehouse | Must | IB-2 | S2 |
| 6 | IB-6 | My tasks and blind receiving | Worker's task list; counting a delivery without seeing ordered amounts, using a typed code or search; shortfall and over-delivery Issues opened | Must | IB-3, IB-5 | S2 |
| 7 | IB-7 | Dispatch orders | Sales rep (or Manager, Owner) creates an order from one warehouse, reserving stock, never more than is available | Must | IB-3, IB-4 | S3 |
| 8 | IB-8 | Picking and dispatch | Worker confirms each picked line and then the dispatch; the order appears in My tasks | Must | IB-6, IB-7 | S3 |
| 9 | IB-9 | Flag damage while picking | Carton moves from Reserved to Damaged, a replacement is reserved from Available, and a damage Issue opens | Must | IB-8 | S3 |
| 10 | IB-10 | Local run | The whole app starts with Docker Compose on the builder's machine | Must | all | S5 |

IB-3 and IB-10 run through every other item: the stock rules are tested as each feature adds movements, and each item is checked running locally.

## Won't Have (this round)

Supervisor decisions on Issues, offline queue and sync, Bangla, Excel import, camera scanning, Owner recovery code, segregation of duties, stock ladder and movement history screens, stock value, temporary passwords and the shared-phone setting, and scenarios 03–08, 10 and 11. See the scope document's Out of Scope table for the reasons.

## Sequencing Rationale

Dependency-first (Q4): each item needs the records the one before it creates. A worker cannot receive until there are users, products, suppliers and a purchase order; a Sales rep cannot reserve stock until opening stock exists (Q2). With no deadline (feasibility Q4), there is no pressure to reorder for early value, and a beginner builder (feasibility Q3) benefits from building each piece on working foundations.

## Assumptions & Open Questions

None.
