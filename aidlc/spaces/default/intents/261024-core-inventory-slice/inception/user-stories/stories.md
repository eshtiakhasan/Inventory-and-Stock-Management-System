# User Stories — Mojud core slice

Source: `inception/requirements-analysis/requirements.md` (FR and NFR IDs below), personas in `personas.md`, team practices (test-after, 80% coverage). Grouped by the user journey in build order (Q1); one story per screen or flow (Q3); every story is Must Have this round (Q4). Acceptance criteria use Given/When/Then.

## Story Map

| Journey step | Stories |
|---|---|
| 1. Set up the business | US1.1, US1.2, US1.3, US1.4 |
| 2. Get stock in | US2.1, US2.2 |
| 3. Receive deliveries | US3.1, US3.2 |
| 4. Order stock for customers | US4.1 |
| 5. Pick and handle damage | US5.1, US5.2, US5.3 |

---

## 1. Set up the business

### US1.1 Sign up a business

**As an** Owner, **I want** to create my business and my account in one step, **so that** I can start using Mojud without anyone's help.

- Priority: Must Have
- Requirements: FR1.1, FR1.3, NFR1, NFR2
- Depends on: none

Acceptance criteria:
- **AC1.1.1** Given no account uses phone 01712345678, When I sign up with a business name, my name, that phone and an 8-character password, Then the business and my Owner account are created and I land on the Setup home.
- **AC1.1.2** Given phone 01712345678 is already registered, When I sign up with it, Then sign-up is refused with "This phone number is already registered" and my other entries are kept.
- **AC1.1.3** Given a 7-character password, When I submit, Then sign-up is refused with "At least 8 characters."
- **AC1.1.4** Given two businesses A and B, When a user of A requests any record of B by its ID, Then the request is refused as not found.
- **AC1.1.5** Given I have signed up, When the stored account data is inspected, Then my password is stored only as a salted hash.

INVEST: independent (first story); small (one form, one flow); testable through AC1.1.1–AC1.1.5.

### US1.2 Sign in, sign out and land on my home

**As any** user, **I want** to sign in with my phone and password and land on the screen for my role, **so that** I start on the work that is mine.

- Priority: Must Have
- Requirements: FR1.2, FR2.1, FR2.3, FR18.1, FR18.2, FR18.3, NFR1, NFR6
- Depends on: US1.1

Acceptance criteria:
- **AC1.2.1** Given an active Owner or Manager, When they sign in correctly, Then they land on the Setup home; a Sales rep lands on Dispatch orders; a Warehouse worker on My tasks; a Supervisor or Accountant on "coming in a later round".
- **AC1.2.2** Given a wrong phone or password, When I sign in, Then I see "Sign-in details are not correct." with no hint of which field was wrong.
- **AC1.2.3** Given a deactivated user, When they sign in with correct details, Then sign-in is refused with "This account is deactivated."
- **AC1.2.4** Given I am signed in, When I sign out, Then my session ends and the next request without signing in is refused.
- **AC1.2.5** Given I choose the dark theme, When I reload the page in the same browser, Then the dark theme is still applied; before any choice the theme follows the device setting.
- **AC1.2.6** Given any screen, When it is checked with a keyboard only and an accessibility checker, Then every action is reachable by keyboard with visible focus and text contrast is at least 4.5:1 in both themes.

INVEST: depends only on an existing account; testable per role.

### US1.3 Manage warehouses and users

**As an** Owner or Manager, **I want** to add warehouses and staff with their roles and warehouses, **so that** each person can sign in and do only their own work.

- Priority: Must Have
- Requirements: FR2.1, FR2.2, FR3.1, FR3.2, FR3.3, FR4.1
- Depends on: US1.1

Acceptance criteria:
- **AC1.3.1** Given 2 active warehouses, When I add a third, Then it is created; When I then add a fourth, Then it is refused with "You can have at most 3 active warehouses."
- **AC1.3.2** Given a warehouse holding stock, When I deactivate it, Then it is refused with a message naming the rule.
- **AC1.3.3** Given I add a user with name, phone, role Warehouse worker, warehouse Narayanganj and a password, When they sign in with that password, Then they land on My tasks.
- **AC1.3.4** Given I am a Manager, When I try to add, change or deactivate an Owner, Then it is refused and those controls are hidden.
- **AC1.3.5** Given only one active Owner, When that Owner tries to deactivate themselves or change their role, Then it is refused.
- **AC1.3.6** Given a signed-in user is deactivated, When their next request reaches the server, Then it is refused and they are signed out.
- **AC1.3.7** Given a Sales rep, When they call the add-user endpoint directly, Then the server refuses it.

INVEST: one settings flow covering two small entities; testable per rule.

### US1.4 Manage products and suppliers

**As a** Manager, **I want** to add products with their units and barcodes, and the suppliers I buy from, **so that** purchase orders, receiving and picking have something to work with.

- Priority: Must Have
- Requirements: FR5.1, FR5.2, FR6.1, FR9.1, FR9.2
- Depends on: US1.1

Acceptance criteria:
- **AC1.4.1** Given I enter name "Rice 25 kg", SKU RICE25, base unit bag, pack unit ctn with 4 per pack, When I save, Then the product is created.
- **AC1.4.2** Given SKU RICE25 exists, When I save another product with SKU rice25, Then it is refused as a duplicate.
- **AC1.4.3** Given a barcode already on one product, When I put it on another, Then it is refused.
- **AC1.4.4** Given a pack size of 1, When I save, Then it is refused with "Must be a whole number of 2 or more."
- **AC1.4.5** Given product "Rice 25 kg", When anyone types "rice" in a product search, Then it appears in the results within 1 second.
- **AC1.4.6** Given I add supplier "ACI Foods" and later archive it, When I create a new purchase order, Then ACI Foods is not offered.

INVEST: one settings flow; testable per rule.

---

## 2. Get stock in

### US2.1 Enter opening stock

**As a** Manager, **I want** to record how much of each product is already in each warehouse, **so that** the system starts with the real stock and orders can be taken.

- Priority: Must Have
- Requirements: FR7.1, FR8.1, FR8.2, FR8.3, FR9.1, FR9.2, NFR3, NFR4
- Depends on: US1.3, US1.4

Acceptance criteria:
- **AC2.1.1** Given Rice 25 kg has no opening stock at Narayanganj, When I enter 10 ctn + 2 bag with a unit cost, Then 42 bag (shown "10 ctn + 2 bag") become Available there, recorded as one movement with reason "opening balance", my name and the time.
- **AC2.1.2** Given opening stock already exists for that product and warehouse, When anyone enters it again, Then it is refused.
- **AC2.1.3** Given any recorded movement, When any request tries to edit or delete it, Then no such operation exists and it is unchanged.
- **AC2.1.4** Given a set of movements, When stock is calculated, Then each state's quantity equals the sum of the movements for that product, warehouse and state.

INVEST: independent of ordering stories; testable through the movement record.

### US2.2 Create and manage purchase orders

**As a** Manager, **I want** to order products from a supplier for a warehouse, and change or cancel the order before anything arrives, **so that** workers know what delivery to expect.

- Priority: Must Have
- Requirements: FR10.1, FR10.2, FR10.3, FR9.1
- Depends on: US1.3, US1.4

Acceptance criteria:
- **AC2.2.1** Given a supplier and warehouse, When I create a purchase order with Rice 25 kg, 100 ctn at a cost per carton, and send it, Then its status is Sent and it appears in My tasks for workers assigned to that warehouse.
- **AC2.2.2** Given a cost entered per carton with 4 bags per carton, When the order is saved, Then the cost is stored per bag.
- **AC2.2.3** Given a Draft or Sent order with nothing received, When I edit a quantity or cancel it, Then the change is saved; a cancelled order leaves My tasks.
- **AC2.2.4** Given a Sent order with one saved receiving line, When I try to edit or cancel it, Then it is refused because receiving has started.

INVEST: one flow (create, edit, cancel); testable per status.

---

## 3. Receive deliveries

### US3.1 See my tasks

**As a** Warehouse worker, **I want** one list of the deliveries to receive and orders to pick in my warehouses, **so that** I always know what to do next without asking.

- Priority: Must Have
- Requirements: FR11.1, FR11.2, FR2.2
- Depends on: US2.2, US4.1

Acceptance criteria:
- **AC3.1.1** Given a Sent purchase order and an open dispatch order at my warehouse, When I open My tasks, Then I see both, with dispatch orders ordered by needed-by date.
- **AC3.1.2** Given work at a warehouse I am not assigned to, When I open My tasks, Then it is not shown.
- **AC3.1.3** Given no open work, When I open My tasks, Then I see "All tasks done for today".
- **AC3.1.4** Given I finish a task, When I return, Then the task shows Done or has left the list, and the next task is on top.

INVEST: read-only list; testable with seeded tasks.

### US3.2 Receive a delivery without seeing the order

**As a** Warehouse worker, **I want** to count each product as it comes off the truck without seeing what was ordered, **so that** my count is honest and any shortfall is someone else's question, not my blame.

- Priority: Must Have
- Requirements: FR12.1, FR12.2, FR12.3, FR12.4, FR13.1, FR8.4, FR8.5, FR9.1, FR17.1, NFR3, NFR4
- Depends on: US2.2, US3.1

Acceptance criteria:
- **AC3.2.1** Given a purchase order for 100 ctn, When I open it and the data the server sent is inspected, Then no ordered or remaining quantity appears anywhere.
- **AC3.2.2** Given I select Rice 25 kg by typing its code and save 92 ctn, Then 92 ctn become Available with reason "received" and the order's cost, and I see "Saved".
- **AC3.2.3** Given I type a product that is not on this order, Then I see "Not on this order" and nothing is recorded.
- **AC3.2.4** Given a save request with action ID X was applied, When the same request with ID X arrives again, Then no second movement is created.
- **AC3.2.5** Given 100 ordered and 92 received, When I mark the delivery complete and confirm "Finish this delivery? 1 of 1 lines counted…", Then I see only "Receipt saved", a Shortfall Issue for 8 ctn is created, and the order becomes Partly received and stays in My tasks.
- **AC3.2.6** Given 100 ordered and 105 received, When I mark the delivery complete, Then all 105 are Available and an Over-delivery Issue for 5 is created.
- **AC3.2.7** Given every line fully received, When I mark the delivery complete, Then the order becomes Received and leaves My tasks.
- **AC3.2.8** Given I am not assigned to the order's warehouse, When I call the receive endpoint directly, Then the server refuses it.

INVEST: one flow; a saved line is final this round (RA-Q1); testable end to end.

---

## 4. Order stock for customers

### US4.1 Create, change and cancel a dispatch order

**As a** Sales rep, **I want** to order stock for a customer from one warehouse and have it held for them, **so that** I never promise stock someone else has already promised.

- Priority: Must Have
- Requirements: FR14.1, FR14.2, FR8.4, FR8.6, FR9.1, FR2.2, NFR3
- Depends on: US2.1

Acceptance criteria:
- **AC4.1.1** Given 32 ctn Available, When I create an order for Rahman Store for 20 ctn, Then 20 ctn move to Reserved and 12 stay Available.
- **AC4.1.2** Given 32 ctn Available, When I enter 33 ctn, Then it is refused with "Only 32 ctn available. Max 32 ctn." and a "Use max" button.
- **AC4.1.3** Given two people reserve the last 10 ctn at the same moment, When both requests arrive, Then one succeeds and the other is refused with the new maximum; stock never goes negative.
- **AC4.1.4** Given an order reserving 20 ctn and nothing picked, When I cancel it, Then 20 ctn return to Available.
- **AC4.1.5** Given an order with 8 ctn already picked on a line, When I edit that line below 8, Then it is refused.
- **AC4.1.6** Given an order line of 20 ctn and 5 more Available, When I raise it to 25, Then 5 more move to Reserved; raising it to 26 is refused with the maximum.

INVEST: one flow; testable through reserved and available quantities.

---

## 5. Pick and handle damage

### US5.1 Pick an order and confirm dispatch

**As a** Warehouse worker, **I want** each line pre-filled with what is left to pick, so I confirm it in one tap, **so that** picking is fast and the order leaves complete.

- Priority: Must Have
- Requirements: FR15.1, FR15.2, FR15.3, FR8.4, FR8.5
- Depends on: US3.1, US4.1

Acceptance criteria:
- **AC5.1.1** Given a line with 20 ctn reserved and 8 picked, When I open it, Then the quantity is pre-filled with 12 ctn.
- **AC5.1.2** Given I confirm 12 ctn, Then 12 ctn leave Reserved with reason "dispatched" and the line shows 20 / 20.
- **AC5.1.3** Given 12 left on the line, When I enter 13, Then it is refused with "Max 12 ctn" and "Use max".
- **AC5.1.4** Given one line is short by 8 ctn, When I confirm dispatch, Then I am asked "1 line is short. Short quantities stay Reserved."; on confirming, 8 ctn stay Reserved and I return to My tasks.
- **AC5.1.5** Given a confirm request with action ID Y was applied, When it arrives again, Then no second movement is created.

INVEST: one flow; testable by quantities.

### US5.2 Flag a damaged carton while picking

**As a** Warehouse worker, **I want** to flag a damaged carton in one tap on the line I'm picking, and have a good one held instead, **so that** the damage is on record under my name and the customer's order stays complete.

- Priority: Must Have
- Requirements: FR16.1, FR16.2, FR16.3, FR16.4, FR16.5, FR17.1, FR8.4, NFR4
- Depends on: US5.1

Acceptance criteria:
- **AC5.2.1** Given no line is selected, When I look at Flag damage, Then it is disabled with "Select a line first".
- **AC5.2.2** Given I select the Rice 25 kg line and tap Flag damage, Then the form shows Rice 25 kg (not changeable), 1 ctn and reason "damaged", and one tap saves it.
- **AC5.2.3** Given 20 ctn reserved on the line and 5 ctn Available, When I flag 1 ctn, Then Damaged becomes 1, the line still has 20 Reserved, Available becomes 4, a Damage flag Issue is created, and I see "Flagged 1 ctn damaged".
- **AC5.2.4** Given 0 ctn Available, When I flag 1 ctn, Then Reserved on the line becomes 19, the line shows short by 1, and a Dispatch short Issue is created.
- **AC5.2.5** Given 3 ctn reserved on the line, When I flag 4 ctn, Then it is refused with "Max 3 ctn".

INVEST: one action on the pick screen; testable by stock states and Issues.

### US5.3 See the Issues list

**As an** Owner or Manager, **I want** to see the shortfalls, over-deliveries, damage flags and short orders that have been raised, **so that** I know what will need a decision when that feature arrives.

- Priority: Must Have
- Requirements: FR17.1, FR17.2, FR2.2
- Depends on: US3.2, US5.2

Acceptance criteria:
- **AC5.3.1** Given Issues exist, When I open the Issues list, Then I see each one's type, product, warehouse, quantity, who raised it and how long ago, newest first, with no decision buttons.
- **AC5.3.2** Given no Issues, When I open the list, Then I see "No open issues."
- **AC5.3.3** Given a Warehouse worker or Sales rep, When they request the Issues list, Then the server refuses it.

INVEST: read-only list; testable with seeded Issues.

---

## Non-Functional Coverage

Cross-cutting requirements are checked inside the stories above, and the rest is carried to later stages:

| Requirement | Where it is checked |
|---|---|
| NFR1 Security | AC1.1.5, AC1.2.4, AC1.3.6, AC1.3.7, AC3.2.8 |
| NFR2 Data isolation | AC1.1.4 |
| NFR3 Data correctness | AC2.1.3, AC2.1.4, AC3.2.4, AC4.1.3, AC5.1.5 |
| NFR4 Audit | AC2.1.1, AC5.2.3 |
| NFR5 Responsiveness | AC1.4.5; save timing measured in NFR Requirements |
| NFR6 Accessibility | AC1.2.6 |
| NFR7, NFR8, NFR9 | Build and Test, Code Generation (not user-facing) |

## Won't Have (this time)

Issue decisions (approve, reject, accept short); closing a purchase order that is short for good; correcting a saved receiving line; offline queue and sync; Bangla; Excel import; camera scanning; Owner recovery code; segregation of duties; stock ladder and movement history; stock value; temporary passwords and shared phones; transfers, stock counts, owner view, low stock, My record; phone layouts.

## Assumptions & Open Questions

- [assumption] Owner and Manager may perform floor actions through the API (FR2.2) but have no My tasks screen this round; floor screens are built for the Warehouse worker (wireframes W10–W13).
- [assumption] A purchase order left Partly received for good can only be closed in a later round, together with Issue decisions.
