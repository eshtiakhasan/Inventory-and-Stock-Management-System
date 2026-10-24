# Requirements — Mojud core slice

Sources: the intent statement (`ideation/intent-capture/intent-statement.md`, "intent-statement"), the scope document (`ideation/scope-definition/scope-document.md`, "scope-document") with its intent backlog (IB-1 to IB-10), the approved team practices (`inception/practices-discovery/team-practices.md`, "team-practices"), the wireframes (`ideation/rough-mockups/wireframes.md`), the PRD (`_bmad-output/planning-artifacts/prds/prd-E2E_IAM-2026-10-22/prd.md`, cited as PRD FR-n) and the answers in `requirements-analysis-questions.md` (cited as RA-Qn).

## Intent Analysis

The builder wants the first working slice of Mojud, a stock-control web app for small FMCG distributors, running on their own machine. An Owner signs up and sets up the business; a Warehouse worker receives a supplier delivery without seeing ordered amounts; a Sales rep orders stock for a customer; and a Warehouse worker picks that order and flags a damaged carton. Underneath, the stock record must be trustworthy: it never goes negative and is never edited. This is a learning and portfolio project, so clarity and correctness matter more than breadth (intent-statement; scope-document).

Depth: Standard. Request type: new product (greenfield). Scope: multi-component (frontend, backend, database).

## Functional Requirements

Each requirement lists its origin. Acceptance criteria use Given/When/Then.

### FR1 Business sign-up and accounts (IB-1; PRD FR-1, FR-2; RA-Q6)

- **FR1.1** The system shall let a person create a business by entering a business name, their own name, a phone number and a password; this creates the business and its first Owner, and signs them in.
  - Given no account uses phone 01712345678, When a person signs up with it and a valid password, Then a business and an Owner are created and the Owner lands on the Setup home.
  - Given phone 01712345678 is already registered, When someone signs up with it, Then sign-up is refused with "This phone number is already registered" and the other fields keep their values.
  - Given a password of 7 characters, When the person submits, Then sign-up is refused with "At least 8 characters."
- **FR1.2** The system shall let any active user sign in with phone number and password, and sign out.
  - Given a wrong phone number or wrong password, When the user signs in, Then the message is "Sign-in details are not correct." and does not say which field was wrong.
  - Given a deactivated user, When they sign in with correct details, Then sign-in is refused with "This account is deactivated."
  - There is no pause after repeated failed attempts this round (RA-Q6).
- **FR1.3** Every record shall belong to exactly one business, and a user shall never read or change another business's data.
  - Given users from two businesses, When a user of business A requests any record of business B by ID, Then the request is refused as not found.

### FR2 Roles and permissions (IB-1; PRD FR-4; scope Q5; rough-mockups Q3)

- **FR2.1** The system shall support six fixed roles: Owner, Manager, Supervisor, Warehouse worker, Sales rep and Accountant. Each user has exactly one role and one or more assigned warehouses (Owners, Managers and Accountants cover all warehouses).
- **FR2.2** The server shall enforce, on every request, the PRD role table for this round's actions:

  | Action | Owner | Manager | Supervisor | Warehouse worker | Sales rep | Accountant |
  |---|---|---|---|---|---|---|
  | Manage users and warehouses | Yes | Yes (not Owners) | No | No | No | No |
  | Manage products, suppliers, opening stock, purchase orders | Yes | Yes | No | No | No | No |
  | Receive, pick, flag damage | Yes | Yes | Assigned warehouses | Assigned warehouses | No | No |
  | Create, edit, cancel dispatch orders | Yes | Yes | No | No | Yes | No |
  | View the Issues list | Yes | Yes | No | No | No | No |

  - Given a Sales rep, When they call the create-purchase-order endpoint directly, Then the server refuses it, even though no button is shown.
  - Given a Warehouse worker assigned only to Narayanganj, When they try to receive a purchase order for Gazipur, Then the server refuses it.
- **FR2.3** After sign-in each role shall land on its home: Owner and Manager on the Setup home; Sales rep on Dispatch orders; Warehouse worker on My tasks; Supervisor and Accountant on a "coming in a later round" page.

### FR3 Users (IB-2; PRD FR-3)

- **FR3.1** An Owner or Manager shall add a user with name, phone number, role, assigned warehouses and a password they set; change a user's role, warehouses or password; and deactivate a user.
- **FR3.2** A Manager shall not add, change or deactivate an Owner. The last active Owner cannot be deactivated or have their role changed.
- **FR3.3** A deactivated user's past stock movements keep their name.
  - Given a business with one active Owner, When that Owner tries to deactivate themselves, Then it is refused with a message naming the rule.

### FR4 Warehouses (IB-2; PRD FR-10)

- **FR4.1** An Owner or Manager shall create, rename and deactivate warehouses, with at most 3 active per business.
  - Given 3 active warehouses, When a fourth is added, Then it is refused with "You can have at most 3 active warehouses."
  - Given a warehouse holding stock (Available, Reserved or Damaged above zero), When it is deactivated, Then it is refused with a message naming the rule.

### FR5 Products (IB-2; PRD FR-6, FR-8, FR-9)

- **FR5.1** An Owner or Manager shall create and edit a product with name, SKU, category, base unit name, optional pack unit name and pack size (conversion factor), and optional base and pack barcodes.
  - SKU is unique within the business; a barcode cannot belong to two products; the pack size is a whole number of 2 or more.
  - Given an existing SKU RICE25, When another product is saved with SKU rice25, Then it is refused as a duplicate (comparison ignores case).
- **FR5.2** Users shall find a product by typing its name, SKU or barcode number; matching ignores upper and lower case and results appear while typing (Type code, product fields).
  - Given product "Rice 25 kg" with SKU RICE25, When a user types "rice", Then "Rice 25 kg" appears in the results.

### FR6 Suppliers (IB-2; PRD FR-19)

- **FR6.1** An Owner or Manager shall create, edit and archive suppliers with name, contact person, phone and address. Name is required. Archived suppliers cannot be used on new purchase orders.

### FR7 Opening stock (IB-4; PRD FR-16; scope Q2)

- **FR7.1** An Owner or Manager shall enter a starting quantity and unit cost for a product at a warehouse, once per product and warehouse. It is recorded as a stock movement into Available with reason "opening balance".
  - Given Rice 25 kg has no opening stock at Narayanganj, When the Manager enters 10 ctn at a unit cost, Then 10 ctn become Available there and one movement with reason "opening balance" is recorded.
  - Given opening stock already exists for that product and warehouse, When someone enters it again, Then it is refused.

### FR8 Stock record (IB-3; PRD FR-11, FR-13, FR-14; intent-statement S4; RA-Q3)

- **FR8.1** Every stock change shall be recorded as a stock movement holding business, product, warehouse, from-state, to-state, quantity in base units, unit cost at that moment, reason, user, server time and a link to its source (purchase order, dispatch order, damage flag or opening stock).
- **FR8.2** Stock movements shall never be edited or deleted by anyone, through any screen or endpoint.
  - Given any recorded movement, When any request tries to change or delete it, Then no such operation exists and the movement is unchanged.
- **FR8.3** Stock quantities per product, warehouse and state (Available, Reserved, Damaged) shall always equal the sum of that product's movements.
- **FR8.4** The system shall refuse any action that would make any stock state for any product at any warehouse drop below zero, and the refusal shall state the maximum allowed in the entry's units.
  - Given 32 ctn Available, When a Sales rep reserves 33 ctn, Then it is refused with "Only 32 ctn available. Max 32 ctn." and nothing changes.
- **FR8.5** Every stock-changing action shall carry a unique ID created by the client; an action received twice with the same ID shall be applied only once, and the second request returns the first result.
  - Given a "Save line" request with ID X was applied, When the same request with ID X arrives again, Then no second movement is created.
- **FR8.6** When two users act on the same stock at the same moment, the result shall be correct and never negative; one of them may be refused with the current maximum, but no change is lost or applied twice.

### FR9 Quantity entry in cartons and pieces (PRD FR-9; RA-Q4)

- **FR9.1** Wherever a quantity is entered (opening stock, purchase orders, receiving, dispatch orders, picking, damage), the user shall be able to enter cartons, pieces or both; the total is stored in base units (pieces).
- **FR9.2** Quantities shall be shown as cartons plus leftover pieces, for example "3 ctn + 5 pcs"; products without a pack unit show pieces only.
  - Given a pack size of 24, When a user enters 27 pieces, Then the stored quantity is 27 and it shows as "1 ctn + 3 pcs".

### FR10 Purchase orders (IB-5; PRD FR-20; RA-Q5)

- **FR10.1** An Owner or Manager shall create a purchase order for one supplier and one warehouse, listing products, ordered quantities, an expected date and a purchase cost (entered per carton or per piece, stored per piece).
- **FR10.2** A purchase order's status is one of Draft, Sent, Partly received, Received or Cancelled. Only Sent and Partly received orders appear as receiving tasks.
- **FR10.3** A purchase order shall be viewable, and editable or cancellable only while no delivery has been received against it.
  - Given a Sent purchase order with one saved receiving line, When the Manager tries to edit or cancel it, Then it is refused because receiving has started.

### FR11 My tasks (IB-6; PRD FR-53)

- **FR11.1** A Warehouse worker shall see open work for their assigned warehouses: purchase orders to receive (Sent or Partly received) and dispatch orders to pick (not yet dispatched, by needed-by date).
- **FR11.2** Each task shows a status: New, In progress or Done. After finishing a task the worker returns to My tasks with the next task on top.
  - Given no open work, When the worker opens My tasks, Then it shows "All tasks done for today".

### FR12 Blind receiving (IB-6; PRD FR-21, FR-22; intent-statement S2; RA-Q1, RA-Q2)

- **FR12.1** A Warehouse worker shall open a Sent or Partly received purchase order for an assigned warehouse and see its products, but never the ordered or remaining quantities: not on screen, not in the data the server sends, not in page code.
  - Given a purchase order for 100 ctn, When the receiving screen's data is inspected, Then no ordered or remaining quantity appears in it.
- **FR12.2** Saving a line shall record the counted quantity as a movement into Available with reason "received" and the purchase order's cost. A saved line is final this round (RA-Q1).
- **FR12.3** Choosing a product (by typing or search) that is not on the purchase order shall show "Not on this order" and record nothing.
- **FR12.4** "Mark delivery complete" shall close this delivery and compare total received with ordered, line by line. It never records the saved lines again.
  - Given 100 ctn ordered and 92 ctn received, When the worker marks the delivery complete, Then a Shortfall Issue for 8 ctn is created, the purchase order becomes Partly received and stays in My tasks (RA-Q2), and the worker sees only "Receipt saved".
  - Given 100 ordered and 105 received, When the delivery is marked complete, Then all 105 are Available and an Over-delivery Issue for 5 is created.
  - Given every line fully received, When the delivery is marked complete, Then the purchase order becomes Received and leaves My tasks.

### FR13 Type code (IB-6; feasibility Q6)

- **FR13.1** On floor screens, a Type code dialog shall let the worker find a product by SKU, barcode number or name and select it, acting as the scan would. No camera is used this round.

### FR14 Dispatch orders (IB-7; PRD FR-23, FR-24; RA-Q5)

- **FR14.1** A Sales rep, Manager or Owner shall create a dispatch order with a customer name (free text), one warehouse, products with quantities and a needed-by date. Saving it moves those quantities from Available to Reserved.
  - The form shows the Available quantity for each product, and a quantity above it is refused with the maximum (FR8.4).
- **FR14.2** Before it is dispatched, the creator, a Manager or the Owner shall be able to view, edit quantities and cancel a dispatch order. Lowering a quantity or cancelling returns stock to Available; raising it reserves more and is limited by Available.
  - Given a dispatch order reserving 20 ctn, When it is cancelled, Then 20 ctn return to Available.
  - Given picking has started on a line, When someone edits that line below what was already picked, Then it is refused.

### FR15 Picking and dispatch (IB-8; PRD FR-25; intent-statement S3)

- **FR15.1** A Warehouse worker shall open a dispatch order for an assigned warehouse; the current line's quantity is pre-filled with what is left to pick.
- **FR15.2** Confirming a line shall move that quantity out of Reserved, out of the business, with reason "dispatched"; partial quantities are allowed. A quantity above what is left on the line is refused with the maximum.
- **FR15.3** "Confirm dispatch" closes the pick. When lines are short it first asks "N lines are short. Short quantities stay Reserved." Short quantities stay Reserved until dispatched later or cancelled.
  - Given 20 ctn reserved and 12 confirmed, When dispatch is confirmed, Then 8 ctn stay Reserved and the order shows as part-dispatched.

### FR16 Flag damage while picking (IB-9; PRD FR-29; intent-statement S3; rough-mockups Q6; RA-Q8)

- **FR16.1** Flag damage shall be available only with a pick line selected; otherwise it is disabled with "Select a line first".
- **FR16.2** It opens a form pre-filled with that line's product, quantity 1 carton (or 1 piece when the product has no pack unit) and reason "damaged"; the worker may change the quantity, choose damaged, expired or other, and add a note. The product cannot be changed.
- **FR16.3** Saving moves the quantity from Reserved to Damaged, creates a Damage flag Issue, and then reserves the same quantity from Available for the same order line.
  - Given 20 ctn reserved on the line and 5 ctn Available, When 1 ctn is flagged damaged, Then Damaged becomes 1, Reserved stays 20, Available becomes 4, and a Damage flag Issue is created.
- **FR16.4** If not enough is Available for the replacement, what can be reserved is reserved, the line is marked short, and a Dispatch short Issue is created.
  - Given 0 ctn Available, When 1 ctn is flagged, Then Reserved becomes 19, the line shows short by 1, and a Dispatch short Issue is created.
- **FR16.5** The quantity flagged cannot exceed what is reserved on the line; a larger quantity is refused with the maximum.

### FR17 Issues (scope document; PRD FR-33a; RA-Q7)

- **FR17.1** The system shall create Issues of four types this round: Shortfall and Over-delivery (FR12.4), Damage flag (FR16.3) and Dispatch short (FR16.4). Each records type, product, warehouse, quantity, who raised it, when, and its source.
- **FR17.2** The Owner and Manager shall see a read-only Issues list, newest first, showing type, product, warehouse, quantity, raised by and age. No decisions can be made this round.
  - Given no Issues, When the list opens, Then it shows "No open issues."

### FR18 Interface (rough-mockups Q2, Q4, Q5; intent capture Q10)

- **FR18.1** All screen text shall come from one English translation file, so Bangla can be added later.
- **FR18.2** Light and dark themes shall both be available, with a switch. The theme follows the device setting until the user chooses, and the choice is remembered on that browser.
- **FR18.3** Screens are designed for desktop browsers this round.

## Non-Functional Requirements

- **NFR1 Security.** Passwords are stored only as salted, slow hashes, never in plain text or logs. Every request checks the user's business, role and assigned warehouses on the server (FR2.2). Secrets such as the database password come from a local `.env` file that is not committed. Sessions end at sign-out. (PRD NFR-6; team-practices Deployment)
- **NFR2 Data isolation.** Automated tests prove that a user of one business cannot read or change another business's data on every endpoint built this round. (PRD NFR-7; FR1.3)
- **NFR3 Data correctness.** Automated tests prove that stock never goes negative (including two simultaneous requests for the last unit), that movements cannot be edited or deleted, that a repeated action ID is applied once, and that stock totals equal the sum of movements. (intent-statement S4; team-practices Testing Posture; FR8)
- **NFR4 Audit.** 100% of stock movements and Issues record the user, time, warehouse and reason. (PRD NFR-5)
- **NFR5 Responsiveness.** On the builder's machine with up to 5,000 products, product search results appear within 1 second and any save completes within 2 seconds. (PRD NFR-1, NFR-10)
- **NFR6 Accessibility.** Every screen meets WCAG 2.1 AA in both themes: visible labels, full keyboard use with visible focus, 4.5:1 text contrast, status never shown by color alone, and the design's touch-target sizes. (rough-mockups Q4)
- **NFR7 Test quality.** At least 80% line coverage, measured on every test run; tests are written after each layer and run locally, with lint, before each merge. (team-practices Testing Posture)
- **NFR8 Local run.** The whole app (frontend, backend, database) starts with one Docker Compose command on Windows 10 Home; if Docker cannot work, the database may run alone in Docker or as a local PostgreSQL install. A fresh start with an empty database works without manual steps beyond copying `.env.example` to `.env`. (intent-statement S5; team-practices Deployment)
- **NFR9 Code quality.** Strict TypeScript, ESLint with TypeScript and React rules, and Prettier; lint errors block a merge. (team-practices Code Style)

## Constraints

- TypeScript, React frontend, Node backend, PostgreSQL database (project rules, Mandated).
- Runs locally only; no cloud deployment this round (project rules, Mandated and Forbidden).
- One beginner builder; no deadline or budget limit (feasibility).
- No connections to other systems (constraint register C-T4).
- Docker Desktop with WSL 2 is not yet installed on the build machine (RAID I1).

## Assumptions

- [assumption] HTTPS is not required while the app runs only on `localhost`; PRD NFR-6's HTTPS rule applies when the app is deployed. Reason: there is no network exposure this round.
- [assumption] Product alternate names (PRD FR-6, FR-8) and low-stock thresholds are left out of the product form this round, since search is English only and low stock is out of scope.
- [assumption] Segregation of duties (PRD FR-5) is out of scope (scope Q3), so the person who created a purchase order may also receive it this round.
- [assumption] Dispatch orders are created only for products that already have Available stock; there is no customer list, only a free-text customer name (PRD open question 7).
- [assumption] Unit cost is shown on opening stock and purchase orders, but stock value is not calculated or shown this round (scope Q3).

## Out of Scope

Supervisor decisions on Issues; offline queue and sync; Bangla; Excel import; camera scanning; Owner recovery code; segregation of duties; stock ladder and movement history screens; stock value and revalue movements; temporary passwords and the shared-phone setting; corrections to saved receiving lines (Reversals); sign-in pause after failed attempts; transfers, stock counts, owner view, low stock, My record (scenarios 03–08, 10, 11); phone layouts; cloud deployment. (scope-document; RA-Q1, RA-Q6)

## Open Questions

- Which exact command proves the walking skeleton works end to end is chosen and approved in Construction (team-practices Walking Skeleton).
- Test tooling is chosen when the code is designed (team-practices Testing Posture).
