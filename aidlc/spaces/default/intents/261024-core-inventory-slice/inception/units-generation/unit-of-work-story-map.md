# Story-to-Unit Map — Mojud core slice

Maps every story in `inception/user-stories/stories.md` to the unit in `unit-of-work.md` where it becomes complete and usable. Stories beyond the skeleton are cross-cutting: their backend is built in U2 and their screens in U3. Requirements trace through the stories (`requirements.md`); components per `components.md`.

## Story Map

| Story | Title | Completing unit | Directory | Also built in | Components |
|---|---|---|---|---|---|
| US1.1 | Sign up a business | U1 | u1-walking-skeleton | — | IdentityAccess, WebApp |
| US1.2 | Sign in, sign out and land on my home | U1 | u1-walking-skeleton | — | IdentityAccess, WebApp |
| US1.3 | Manage warehouses and users | U3 | u3-frontend | U2 (backend) | IdentityAccess, StockLedger, WebApp |
| US1.4 | Manage products and suppliers | U3 | u3-frontend | U2 (backend) | Catalogue, WebApp |
| US2.1 | Enter opening stock | U3 | u3-frontend | U2 (backend) | Catalogue, StockLedger, WebApp |
| US2.2 | Create and manage purchase orders | U3 | u3-frontend | U2 (backend) | Purchasing, Catalogue, WebApp |
| US3.1 | See my tasks | U3 | u3-frontend | U2 (backend) | MyTasks, Purchasing, Dispatch, WebApp |
| US3.2 | Receive a delivery without seeing the order | U3 | u3-frontend | U2 (backend) | Purchasing, StockLedger, Issues, WebApp |
| US4.1 | Create, change and cancel a dispatch order | U3 | u3-frontend | U2 (backend) | Dispatch, StockLedger, WebApp |
| US5.1 | Pick an order and confirm dispatch | U3 | u3-frontend | U2 (backend) | Dispatch, StockLedger, WebApp |
| US5.2 | Flag a damaged carton while picking | U3 | u3-frontend | U2 (backend) | Dispatch, Damage, StockLedger, Issues, WebApp |
| US5.3 | See the Issues list | U3 | u3-frontend | U2 (backend) | Issues, WebApp |

## Cross-cutting Rows

US1.3 to US5.3 span two units: U2 builds and tests their backend acceptance criteria through the API; U3 builds their screens and is where each story becomes usable.

## Implementation Order Within Each Unit

- **U1:** project setup and Docker Compose → database and migrations → Business and User tables → sign-up → sign-in, sessions and sign-out → app shell, theme and role landing → end-to-end check.
- **U2:** remaining IdentityAccess (warehouses, users, permissions) → Catalogue → StockLedger and opening stock → Issues creation → Purchasing and receiving → Dispatch and picking → Damage → Issues list → MyTasks.
- **U3:** Setup home and settings screens → purchase orders → dispatch orders → My tasks → receiving → picking and Flag damage → Issues list.

## Coverage Check

- All 12 stories are assigned to a unit.
- Every unit has rows: U1 completes 2 stories; U2 contributes to 10; U3 completes 10.

## Assumptions & Open Questions

None.
