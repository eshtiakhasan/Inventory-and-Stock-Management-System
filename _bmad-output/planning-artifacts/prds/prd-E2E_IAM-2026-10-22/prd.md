---
title: "PRD: Mojud (working name)"
status: final
created: 2026-10-22
updated: 2026-10-24
inputs:
  - _bmad-output/planning-artifacts/briefs/brief-E2E_IAM-2026-10-22/brief.md
  - _bmad-output/planning-artifacts/briefs/brief-E2E_IAM-2026-10-22/addendum.md
---

# PRD: Mojud (working name)

*Mojud (মজুদ) means "stock" in Bangla. The name is temporary.*

## 0. Document Purpose

This PRD describes **what** v1 of Mojud must do. It does not say **how** to build it. It is written for the builder, a beginner developer working alone, one small piece at a time. It is also the input to the next steps: UX design, architecture, and epics and stories.

- Requirements are in plain language. Each FR (functional requirement) is small enough to build and test on its own.
- Words defined in the **Glossary (§3)** have one meaning only, and the rest of the document uses them exactly as defined.
- Features (§4) are grouped by capability. FR numbers never change, even if features are reordered.
- Guesses are marked `[ASSUMPTION]` and listed again in §10.
- Inputs: the final product brief and its addendum. Technical options (no technology stack has been chosen) are in this PRD's `addendum.md`.

## 1. Vision

Mojud is a simple, reliable stock-control web app for small and mid-sized **FMCG distributors and wholesalers in Bangladesh** with 1–3 warehouses and 5–30 staff. It replaces Excel sheets, paper khatas and WhatsApp messages with one shared record. That record shows what stock is **really available**, who moved it and why, and where money (taka) is being lost.

The core idea is **trust through transparent, effortless accountability**. Recording stock must be quicker than not recording it: about one scan and one tap, even offline. Every record also gives the person who made it something back: the next task, confirmation that the work was saved, and proof that protects them from blame for gaps they did not cause.

Mojud is **a stock-control system, not an ERP**. It does not handle sales invoicing, point of sale (POS) or full accounting.

## 2. Target Users

### 2.1 Jobs To Be Done

| Role | Job |
|---|---|
| **Owner** (pays for the product) | "Let me trust my stock numbers without visiting the warehouse, and show me where I am losing taka so I can act." |
| **Manager** (inventory manager) | "Tell me what I can really promise, and help me find and fix discrepancies with evidence." |
| **Supervisor** | "Give me one short list of problems and let me decide each one in a tap." |
| **Warehouse worker** | "Let me record my work in seconds, tell me what to do next, and prove what I did." |
| **Sales rep** | "Tell me how much I can promise, from which warehouse, before I commit." |
| **Accountant** | "Give me a stock value I can trace back to individual stock movements." |

### 2.2 Non-Users (v1)

- Single shops with no separate warehouse. Khata apps already serve them.
- Large distributors or brands that need an ERP or a distributor management system (DMS).
- Manufacturers that need production planning or a bill of materials (BOM).
- Shoppers or end customers. Mojud has no customer-facing screens.

### 2.3 Key User Journeys

*The names below are illustrative personas.*

- **UJ-1. Rahim receives a supplier delivery without seeing the order.**
  Rahim, a **Warehouse worker** at the Narayanganj Warehouse, opens **My tasks** on a phone and selects the delivery's **Purchase order**. The screen lists the products but not the ordered quantities. Rahim scans each carton's Barcode and enters the counted number of cartons, then marks the delivery complete. Mojud compares the count with the order: 92 cartons counted, 100 ordered. It records 92 as **Available** and opens a **Shortfall** **Issue** for a Supervisor. Rahim sees "Receipt saved ✓" and the next task.
  *Edge case:* the network drops halfway through. The counts wait in the **Offline queue** and sync once the connection is back.

- **UJ-2. Karim flags a crushed carton while picking.**
  Karim, a **Warehouse worker**, is picking a **Dispatch order** and finds a crushed carton. Karim scans it and taps **Flag damage**. The quantity defaults to 1 carton and the Reason to "damaged". The carton moves from **Reserved** to **Damaged**. Mojud immediately reserves a replacement carton from **Available**, so the order stays complete, and Karim carries on picking. The flag records who found it, when and where.

- **UJ-3. Nasima clears the issues inbox at shift end.**
  Nasima, a **Supervisor** at Narayanganj, opens the **Issues inbox**. The Issue with the most money at risk is at the top. One card reads: "Damage flag · Rice 25 kg · 1 carton · Narayanganj · Karim · 14:05". Nasima taps **Approve**, and the carton is written off as a loss with the Reason "damaged". Nasima then rejects a second flag that turned out to be fine, and that carton returns to **Available**.

- **UJ-4. Tanvir checks stock with a customer on the phone.**
  Tanvir, a **Sales rep**, searches for a product while the customer waits on the line. Mojud shows the **Promisable quantity** per warehouse: Narayanganj 32, Gazipur 20. The customer wants 50, so Tanvir creates two **Dispatch orders**: 32 from Narayanganj and 18 from Gazipur. Those units become **Reserved**, so no colleague can promise them again.
  *Edge case:* if Tanvir enters more than is promisable, Mojud blocks it and shows the maximum.

- **UJ-5. A transfer between warehouses arrives short.**
  A Warehouse worker at Gazipur sends 50 cartons to Narayanganj, and those 50 move to **In transit**. At Narayanganj, a different worker counts without seeing the sent number and finds 40. The 40 move to **Available** at Narayanganj. The missing 10 stay **In transit**, linked to this **Transfer**, and an **Issue** shows both counts, both workers and both times. Nothing is silently deleted.

- **UJ-6. The owner follows an unexplained loss back to its source.**
  Mr. Haque, the **Owner**, opens the owner view from home. It shows this month's losses by Reason: damaged ৳11,200, expired ৳4,900, confirmed loss ৳2,300, plus ৳1,450 currently **Unexplained**. Mr. Haque taps "Unexplained" and sees the open **Discrepancy cases**. Each one lists the product, warehouse, quantity, the **Stock count** that found it, and who counted. Mr. Haque assigns one case to the Manager.

- **UJ-7. The manager runs a weekly count of one aisle's products.**
  The **Manager** starts a **Stock count** for 20 products at Narayanganj and assigns two workers. The workers count without seeing system quantities. When the Manager closes the count, Mojud opens a **Discrepancy case** for every line that differs from **On hand**. The Manager, who did not count, resolves each case as "found" or "confirmed loss" with a **Reason**.

## 3. Glossary

- **Business**: one customer company using Mojud, such as a distributor. All data belongs to exactly one Business. Businesses never see each other's data.
- **User**: a person who signs in to Mojud. A User belongs to one Business, has one **Role**, and is assigned to one or more **Warehouses**.
- **Role**: one of six fixed roles that decide what a User can do: Owner, Manager, Supervisor, Warehouse worker, Sales rep, Accountant (see FR-4).
- **Assigned Warehouses**: the Warehouses where a User may record and decide. Owners, Managers and Accountants cover all Warehouses.
- **Product**: an item the Business stocks. Each Product has one **SKU**.
- **Alternate name**: an extra name for a Product, in either language, that search also matches. The Product's main name is still the one shown everywhere.
- **SKU**: the Business's unique code for a Product.
- **Barcode**: a scannable code on packaging. A Product can have one barcode for its **Base unit** and one for its **Pack unit**.
- **Base unit**: the smallest unit a Product is counted in, such as a piece. All quantities are stored in Base units.
- **Pack unit**: an optional larger unit, such as a carton, equal to a fixed number of Base units (the **Conversion factor**).
- **Conversion factor**: how many Base units make one Pack unit (for example, 1 carton = 24 pieces).
- **Warehouse**: a physical storage site of the Business. A Business can have 1 to 3.
- **Stock state**: the condition of a quantity of stock. It is always exactly one of **Available**, **Reserved**, **Damaged**, **In transit** or **Unexplained**:
  - **Available**: in a Warehouse and free to promise.
  - **Reserved**: in a Warehouse and held for a **Dispatch order**.
  - **Damaged**: in a Warehouse, flagged as unusable and waiting for a decision.
  - **In transit**: has left one Warehouse on a **Transfer** and has not yet been counted in at the other.
  - **Unexplained**: found missing by a **Stock count**. It stays recorded, with its value, until its **Discrepancy case** is resolved.
- **On hand**: at one Warehouse, Available + Reserved + Damaged. Stock that is In transit or Unexplained is not On hand anywhere.
- **Promisable quantity**: the Available quantity of a Product at a Warehouse. This is the number a Sales rep may promise.
- **Stock movement**: one permanent record of a change, holding who, what, when, where, from-state, to-state, quantity, **Reason** and value. It is never edited or deleted. There are two kinds:
  - **Move**: a quantity changes Stock state or location, or enters or leaves the Business.
  - **Revalue**: the **Unit cost** changes and no quantity moves.
- **Stock ledger**: the full list of Stock movements. All quantities and values are calculated from it.
- **Reason**: a short code that explains a Stock movement, for example "received", "damaged", "expired" or "count shortage".
- **Reversal**: a new Stock movement that cancels an earlier, mistaken one. It must be approved by a second person.
- **Supplier**: a company the Business buys from.
- **Purchase order (PO)**: a list of Products and quantities ordered from one Supplier for one Warehouse.
- **Receipt**: the record of goods counted in against a PO.
- **Blind count**: counting without being able to see the expected quantity.
- **Shortfall**: a smaller quantity counted in than expected.
- **Dispatch order**: a request to send Products from one Warehouse to a customer. It is not an invoice.
- **Transfer**: moving stock from one Warehouse of the Business to another. Until it is sent, a Transfer is a **draft** and moves no stock (FR-26).
- **Damage flag**: a report that some stock is damaged, expired or otherwise unusable.
- **Write-off**: a Move that removes stock from the Business as a loss, with a Reason.
- **Issue**: an item that needs a person's decision. Each Issue type has fixed decisions (see FR-33a).
- **Issues inbox**: one ranked list of the open Issues a User may decide.
- **Stock count**: a planned physical count of selected Products at one Warehouse.
- **Discrepancy case**: an Issue opened when a Stock count line does not match On hand.
- **Unit cost**: the cost of one Base unit of a Product, the same across all Warehouses of the Business.
- **Stock value**: quantity × Unit cost.
- **Low-stock threshold**: a minimum Promisable quantity for a Product at a Warehouse. A Product is **low** when its Promisable quantity is at or below the threshold, and **out of stock** when its Promisable quantity is 0.
- **Offline queue**: actions recorded on a device without a connection, waiting to be sent to the server.
- **Sync conflict**: a queued action that the server refuses, for example because it would make stock negative.
- **My tasks**: a User's list of open work in their Assigned Warehouses.
- **My record**: a User's own summary of the work they recorded.

## 4. Features

*Each FR is meant to be one small build step. "Realizes UJ-n" links it to a journey.*

### 4.1 Business, Users and Roles

**Description:** An Owner creates a Business and invites Users. Each User's Role controls what they can do, and their Assigned Warehouses control where they can do it. For important actions, the person who does the work and the person who approves it must be different (segregation of duties).

#### FR-1: Create a Business
A person can sign up as an Owner by entering the Business name and the Owner's name, phone number and password.
- Every later record is linked to this Business.
- One Business's data is never visible to Users of another Business.
- At sign-up the Owner sees a one-time **recovery code** (see FR-54).

#### FR-2: Sign in and out
A User can sign in with a phone number and password, and can sign out. *Decided: v1 has no SMS code.*
- A wrong sign-in shows an error that does not say which field was wrong.
- After 5 failed attempts in a row, sign-in is paused for 15 minutes. `[ASSUMPTION]`
- **Shared phone:** each device has a Shared phone setting. It is asked at the first sign-in on that device and is on by default for Warehouse workers and Supervisors. `[ASSUMPTION: default]` When it is on, the sign-in form asks the browser not to save the password, offers no "remember me", and shows a short hint not to save the password. Some browsers may still offer to save it. `[ASSUMPTION: browser behaviour; test on Chrome Android]` When it is off (for example, an Owner on a personal device), password managers work as normal.
- **Sign out with unsynced actions:** if the Offline queue still holds the User's actions, sign-out warns how many are not synced and says they stay on the device and will sync as that User (FR-41).

#### FR-3: Invite and manage Users
An Owner or Manager can add a User (name, phone number, Role, Assigned Warehouses, temporary password), change a User's Role or Assigned Warehouses, and deactivate a User.
- A deactivated User cannot sign in. Their past Stock movements keep their name.
- A Business always has at least one active Owner.
- Managers cannot create, change or deactivate Owners.

#### FR-4: Role permissions
The system enforces this table on the server, not only by hiding buttons. "Assigned" means the action is allowed only in the User's Assigned Warehouses.

| Action | Owner | Manager | Supervisor | Warehouse worker | Sales rep | Accountant |
|---|---|---|---|---|---|---|
| Manage Users, Warehouses, settings | ✓ | ✓ (not Owners) | | | | |
| Manage Products, Suppliers, POs | ✓ | ✓ | | | | |
| Floor actions: Receipts, picks, Damage flags, Transfers, Stock count lines | ✓ | ✓ | Assigned | Assigned | | |
| Create and change Dispatch orders | ✓ | ✓ | | | ✓ | |
| Decide Issues (FR-33a) | ✓ | ✓ | Assigned | | Own Dispatch orders only | |
| Request and approve Reversals | ✓ | ✓ | | | | |
| View stock, Promisable quantity, low stock | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| View Stock value, losses, owner view | ✓ | ✓ | | | | ✓ |

Other FRs name the Roles involved only for readability. If they ever disagree, this table wins.

Two narrower limits apply on top of the table: during a Blind count, assigned counters cannot see system quantities for the counted Products at that Warehouse (FR-35); and value at risk on Issues is shown only to Roles that may view Stock value (FR-31).

#### FR-5: Segregation of duties
The system refuses these combinations:
- Deciding an Issue that came from your own Stock movement.
- Recording a Receipt on a PO you created.
- Receiving a Transfer you sent.
- Resolving a Discrepancy case on a line you counted.
- Approving your own Reversal request.

Exception: when no other eligible User exists, an Owner may do these, and the record is marked "self-approved by Owner". `[ASSUMPTION: needed for very small teams]`

#### FR-54: Password reset and recovery
- An Owner or Manager can reset another User's password to a temporary one, which the User must change at their next sign-in.
- An Owner who forgets their password can use their recovery code to set a new one. The code then stops working, and a new code is shown.
- An Owner can generate a new recovery code at any time, which cancels the old one.

### 4.2 Product Catalogue

**Description:** FMCG goods are bought in cartons and sold in cartons or pieces, so every Product has a Base unit and can have a Pack unit.

#### FR-6: Create and edit a Product
A Manager can create a Product with a name, SKU, category, Base unit name, an optional Pack unit name and Conversion factor, optional Barcodes, optional Alternate names, and an optional Low-stock threshold per Warehouse.
- Each SKU is unique within the Business.
- A Product can have up to 5 Alternate names, in either language, for example "চাল 25 কেজি" for "Rice 25 kg". `[ASSUMPTION: up to 5]` The main name is shown everywhere (FR-45); Alternate names are used by search (FR-8). There is no automatic transliteration.
- A Barcode cannot belong to two Products.
- The Conversion factor is a whole number of 2 or more.
- Selling prices are not stored (see Non-Goals).

#### FR-7: Archive a Product
A Manager can archive a Product, which hides it from new transactions. Its history stays.
- A Product cannot be archived while it has On hand, In transit or Unexplained quantity above zero.

#### FR-8: Search Products
Any User can search Products by main name, Alternate names, SKU or Barcode, with results appearing while they type.
- Search ignores upper and lower case.
- Search works for both Bangla and English names.
- When the match came from an Alternate name, the result shows that Alternate name under the main name.

#### FR-9: Enter quantities in either unit
Wherever a quantity is entered, the User can give it in Pack units, Base units or both (for example "3 cartons + 5 pieces"). The total is stored in Base units.
- Screens show quantities as Pack units plus leftover Base units, for example "3 ctn + 5 pcs".

### 4.3 Warehouses

#### FR-10: Manage Warehouses
An Owner or Manager can create, rename and deactivate Warehouses, with at most 3 active per Business.
- Trying to create a 4th active Warehouse is refused with a clear message.
- A Warehouse with any On hand quantity cannot be deactivated.

### 4.4 Stock Ledger and Stock States

**Description:** This is the core of the system. Every change is a Stock movement in the Stock ledger. Balances are always calculated from the Stock ledger and never typed in. Stock never goes negative.

#### FR-11: Record every change as a Stock movement
Every action that changes stock creates one or more Stock movements. Each holds:
- Business, Product, and Warehouse (or Transfer)
- from-state and to-state
- quantity in Base units and the Unit cost at that moment
- Reason and User
- device time and server time
- a link to the source: a PO, Dispatch order, Transfer, Damage flag, Stock count or Issue

No one can edit or delete a Stock movement, not even the Owner.

#### FR-12: Show stock by state
Any User can see a "stock ladder" for each Product per Warehouse: On hand → Damaged → Reserved → Promisable (On hand, minus Damaged, minus Reserved, equals the Promisable quantity). Totals for In transit and Unexplained are shown too.
- Every figure equals the sum of that Product's Stock movements.
- The screen shows when the figures were last updated.
- During a Blind count, assigned counters see "Hidden during count" instead of these figures for the counted Products at that Warehouse (FR-35).

#### FR-13: Stock can never go negative
The system refuses any action that would make the quantity of any Stock state, for any Product at any Warehouse, drop below zero.
- The refusal message shows the maximum quantity allowed.
- The same check applies to actions arriving from the Offline queue (FR-44).
- Stock counts follow this rule too (FR-36).

#### FR-14: Prevent duplicate actions
Each action carries a unique ID created on the device. If the same action arrives twice, for example from a double tap or an offline retry, it is applied only once.

#### FR-15: Correct mistakes with a Reversal
An Owner or Manager can request a Reversal of a Stock movement, giving a Reason. This creates a Reversal request Issue. When a different Owner or Manager approves it, the system records the opposite Stock movement, linked to the original.
- A Reversal that would make stock negative is refused (FR-13).
- The original movement and its Reversal both stay visible in history.

#### FR-16: Opening stock
A Manager can enter a starting quantity and Unit cost for each Product at each Warehouse. These are recorded as Stock movements with the Reason "opening balance". They can also be loaded through Excel import (§4.14).

#### FR-17: Movement history
A User who can view stock can see a Product's Stock movements, newest first. The list can be filtered by Warehouse, date range, Reason and User.

#### FR-18: Basic Stock value
The system keeps one Unit cost per Product, per Base unit, shared by all Warehouses. It shows Stock value per Warehouse and in total to the Roles allowed by FR-4.
- *Decided for v1:* Unit cost is the cost from the latest Receipt. Before the first Receipt, it is the cost from the opening balance. Weighted-average cost is a later improvement (SHOULD).
- When a Receipt changes the Unit cost, the system records a **Revalue** movement showing the old cost, the new cost and the change in value. Stock value never changes without a record.
- Each Stock movement keeps the Unit cost from the moment it happened, so the value of past losses never changes.

### 4.5 Suppliers, Purchase Orders and Blind Receiving

#### FR-19: Manage Suppliers
A Manager can create, edit and archive Suppliers. Each Supplier has a name, contact person, phone number and address.

#### FR-20: Create a Purchase order
A Manager can create a PO for one Supplier and one Warehouse. It lists the Products, ordered quantities, expected date and unit purchase cost. The cost may be entered per Pack unit or per Base unit and is stored per Base unit.
- A PO's status is one of: Draft, Sent, Partly received, Received, Closed short or Cancelled.

#### FR-21: Blind receiving
A Warehouse worker can open a Sent or Partly received PO for an Assigned Warehouse and enter the counted quantity for each line. The screen shows the Products but no ordered or outstanding quantities. Realizes UJ-1.
- **Each saved line is its own Stock movement.** When a line is saved, its counted quantity moves into Available with the Reason "received" and the cost from the PO. Offline, the line waits in the Offline queue like any action (FR-41).
- **Mark delivery complete** closes the Receipt and raises any Shortfall or over-delivery Issues (FR-22). It never posts the saved lines again.
- One PO can have several Receipts, so partial deliveries are supported.
- The User who created the PO cannot record its Receipts (FR-5).

#### FR-22: Shortfall and over-delivery
After each Receipt, the system compares the total received with the ordered quantity, line by line.
- A Shortfall Issue is raised when the receiver marks the delivery complete with less than was ordered. It is also raised when a Manager closes a Partly received PO.
- If more was received than ordered, the extra is recorded as Available and an over-delivery Issue is raised.
- The PO status updates automatically.

### 4.6 Dispatch with Reservation

#### FR-23: Create a Dispatch order
A Sales rep, Manager or Owner can create a Dispatch order with a customer name (free text), one Warehouse, Products with quantities, and a required date. Saving it moves those quantities from Available to Reserved. Realizes UJ-4.
- The quantity cannot be more than the Promisable quantity, and the screen shows the maximum (FR-13).
- A Dispatch order uses one Warehouse only. To supply from two, the User creates two orders.

#### FR-24: Change or cancel a Dispatch order
The creator, a Manager or the Owner can reduce quantities or cancel an order that has not been dispatched. The quantity released goes back to Available.

#### FR-25: Pick and confirm dispatch
A Warehouse worker can open a Dispatch order, scan or tick each line as it is picked, and confirm dispatch.
- **Each confirmed line is its own Stock movement.** When a line is confirmed, its quantity moves from Reserved out of the Business with the Reason "dispatched". Offline, it waits in the Offline queue like any action (FR-41).
- **Confirm dispatch** closes the pick. It never posts the confirmed lines again.
- Partial dispatch is allowed. Whatever is not dispatched stays Reserved until it is dispatched or cancelled.
- After confirming, the worker sees their next task from My tasks (FR-53).

### 4.7 Transfers Between Warehouses

#### FR-26: Send a Transfer
A Warehouse worker can create a Transfer from an Assigned Warehouse to another Warehouse, entering the Products and the quantities counted out. Realizes UJ-5.
- **A Transfer is a draft until it is sent.** Saved lines are recorded but move no stock and reserve nothing. The stock stays Available at the source.
- **Send Transfer** moves every line from Available at the source to In transit, one Stock movement per line, at that moment.
- If Available has dropped below a draft line by then, Send is refused for that line and shows the maximum, for example "Only 18 ctn available. Max 18 ctn." (FR-13).
- Drafts are always visible: as a "Draft transfer · not sent" item in the creator's My tasks (FR-53) and in the Transfers list.
- The creator, a Supervisor, a Manager or the Owner can discard a draft. Discarding moves no stock.
- A draft not sent within 24 hours raises a Draft-transfer-not-sent Issue for the source Warehouse's Supervisor. `[ASSUMPTION: 24 hours]`
- Once a Transfer is sent, FR-28 applies, so stock never sits In transit without someone being told.

#### FR-27: Receive a Transfer with a Blind count
A Warehouse worker at the destination can open an incoming Transfer and enter the counted quantities without seeing what was sent.
- **Each saved line is its own Stock movement.** When a line is saved, its counted quantity moves from In transit to Available at the destination, up to the quantity still In transit on that line. Any extra is handled by FR-28. Offline, the line waits in the Offline queue like any action (FR-41).
- **Finish receipt** closes the receipt and raises any Transfer-shortage or Transfer-overage Issue (FR-28). It never posts the saved lines again.
- The sender cannot be the receiver (FR-5).

#### FR-28: Transfer differences
- **Received less than sent:** the missing quantity stays In transit, linked to the Transfer, and a Transfer-shortage Issue is raised.
- **Received more than sent:** nothing extra is added, and a Transfer-overage Issue is raised. `[ASSUMPTION]`
- **Not received within 48 hours of being sent:** a Transfer-overdue Issue is raised. `[ASSUMPTION — provisional target]`

Each of these Issues shows the sender's count and the receiver's count, the User who made each one, and the time of each. Decisions follow FR-33a.

### 4.8 Damage Reporting

#### FR-29: Flag damage
A Warehouse worker or Supervisor can scan or search a Product and tap **Flag damage**. Realizes UJ-2.
- **Defaults:** the quantity defaults to 1 of the scanned unit and the Reason to "damaged", so accepting the defaults takes one scan and one tap. The User can change the quantity, choose another Reason (damaged, expired or other) and add an optional note.
- **Flag from Available:** the quantity moves from Available to Damaged.
- **Flag from Reserved:** a flag raised from a Dispatch order's picking screen moves the quantity from Reserved to Damaged. The system then tries to reserve the same quantity from Available for that order. If there is not enough Available, the order line is marked short and a Dispatch-short Issue is raised. `[ASSUMPTION]`
- Flagging works offline (§4.12).
- Photos are not needed. Photo upload is SHOULD, not v1.

#### FR-30: Decide a Damage flag
A Supervisor, Manager or Owner who did not raise the flag can decide it in one tap from the Issues inbox. Realizes UJ-3.
- **Approve:** the stock is written off from Damaged with the flag's Reason.
- **Reject:** the stock returns from Damaged to Available.
- The decision, the person who made it and the time are all recorded.
- `[ASSUMPTION — open for validation]` Approving always means a Write-off. Check with real distributors whether they also need "sell at a discount" or "return to Supplier" outcomes.

### 4.9 Issues Inbox

#### FR-31: One ranked inbox
Each User sees one list of the open Issues they are allowed to decide (FR-4). There are no separate notifications for each Issue. Realizes UJ-3.
- Each Issue shows its type, Product, Warehouse, quantity, value at risk, who raised it and how long ago.
- Value at risk is used for ranking for every User, but the taka amount is shown only to Roles allowed to view Stock value (FR-4). Supervisors and Sales reps see the quantity and unit instead, never taka.
- `[ASSUMPTION]` Issues are ranked in this order: Issues assigned to the User first, then Issues that affect Reserved stock, then by value at risk (quantity × Unit cost), then the oldest.

#### FR-32: Act on an Issue
A User can open an Issue to see its full evidence and history, take one of the decisions allowed for that Issue type (FR-33a), and add a comment.
- Decided Issues leave the open list but can still be found by search.

#### FR-33: Assign an Issue
An Owner or Manager can assign an Issue to a particular eligible User.

#### FR-33a: Issue types and decisions
Every Issue type has a fixed set of decisions. Each decision has a defined effect on stock. FR-5 always applies.

| Issue type | Raised by | Who decides | Decisions and their effect on stock |
|---|---|---|---|
| Damage flag | FR-29 | Supervisor, Manager, Owner | **Approve:** Write-off from Damaged. **Reject:** Damaged → Available. |
| Shortfall | FR-22 | Supervisor, Manager, Owner | **Accept short:** the PO line is closed short, with no stock change (the goods never arrived). **Expect rest:** the PO stays Partly received. |
| Over-delivery | FR-22 | Supervisor, Manager, Owner | **Accept:** the extra stays Available. **Correct count:** a Reversal request for the extra quantity (FR-15). |
| Transfer shortage | FR-28 | Supervisor (destination), Manager, Owner | **Found:** In transit → Available at a Warehouse chosen by the decider. **Transfer loss:** Write-off from In transit with the Reason "transfer loss". |
| Transfer overage | FR-28 | Supervisor (destination), Manager, Owner | **Sender undercounted:** the extra moves from Available at the source to Available at the destination (refused if the source does not have enough). **Recount:** the receiver counts again. |
| Transfer overdue | FR-28 | Supervisor, Manager, Owner | **Still coming:** check again in 24 hours. **Transfer loss:** Write-off from In transit. |
| Draft transfer not sent | FR-26 | Supervisor (source), Manager, Owner | **Keep draft:** no stock change; check again in 24 hours. **Discard draft:** the draft is removed; no stock change. `[ASSUMPTION: these two decisions]` |
| Discrepancy case | FR-36 | Supervisor, Manager, Owner (not the counter) | See FR-37. |
| Late count line | FR-36 | The Manager who started the count, Owner | **Start recount:** opens a Stock count for that one Product at that Warehouse. **Dismiss:** nothing changes; the late line stays recorded. `[ASSUMPTION: two decisions are enough]` |
| Dispatch short | FR-29, FR-36 | Order creator, Manager, Owner | **Reduce order:** the short line is reduced. **Keep open:** the line stays open until the creator edits it. |
| Sync conflict | FR-44 | Supervisor, Manager, Owner | **Discard:** the action is not applied (for example, a duplicate or a mistake). **Recount:** opens a Stock count for that one Product at that Warehouse, so the record is corrected properly. |
| Reversal request | FR-15 | A different Manager or Owner | **Approve:** the Reversal is recorded. **Reject:** nothing changes. |

### 4.10 Stock Counts and Discrepancy Cases

#### FR-34: Start a Stock count
A Manager can start a Stock count at one Warehouse for all Products, one category or a chosen list, and assign the Users who will count. Realizes UJ-7.

#### FR-35: Count blind
An assigned User enters the counted quantity for each Product, by scanning or searching, without seeing any system quantities.
- Each saved line records who counted it, the quantity and when. It moves no stock until the count is closed (FR-36).
- **Nothing gives the count away.** While the count is open, a User assigned to count it cannot see On hand, Promisable quantity, the stock ladder, movement quantities or low-stock status for the Products in that count, at that Warehouse, on any screen (for example Product search, Product stock, Low stock and scan results). They see "Hidden during count" instead. Everything else stays normal.
- The Manager who started the count sees its progress (lines counted) but no counted quantities until the count is closed.
- The server enforces these limits; hiding them on screen is not enough. They end when the count is closed.

#### FR-36: Compare and open Discrepancy cases
Count discrepancies apply when the count is closed. When the Manager closes the count, each line is compared with On hand at the moment that line was counted. `[ASSUMPTION: this handles stock movements that happen during the count]`
- **Close count warning:** the confirm step warns if any assigned counter still has lines the server has not received, for example "2 lines from Karim not received yet".
- **Late count line:** a line that reaches the server after the count was closed (for example, from an offline sync) never changes the closed count. It opens a Late count line Issue for the Manager who started the count, showing the counted quantity, On hand at the time it was counted, and both times (FR-33a).
- **Match:** the line is recorded as "verified". It is the evidence for the Product's last verified date.
- **Shortage:** a Discrepancy case opens, and the missing quantity moves to Unexplained. It is taken from Available first, then from Damaged, then from Reserved, so no state goes negative (FR-13). If Reserved stock is taken, the affected Dispatch orders (latest-created first) get Dispatch-short Issues. `[ASSUMPTION]`
- **Surplus:** a Discrepancy case opens. Nothing is added to stock until the case is decided.

#### FR-37: Resolve a Discrepancy case
A Supervisor, Manager or Owner who did not count the line can resolve the case. The case shows the counted quantity, the On hand quantity, the counter and the times. Realizes UJ-6.
- **Found:** the Unexplained quantity returns to Available.
- **Confirmed loss:** a Write-off from Unexplained, with one of these Reasons: theft suspected, receiving error, picking error, unrecorded damage, unknown.
- **Surplus confirmed:** the extra is added to Available.
- **Surplus rejected (miscount):** nothing changes.

The decision, the person who made it and a comment are recorded.

### 4.11 Barcode Scanning

#### FR-38: Scan with the phone camera
On supported phone browsers, from any field that takes a Product, a User can open the camera and scan a Barcode to select the Product.
- Scanning a Pack unit Barcode sets the quantity in Pack units. Scanning a Base unit Barcode sets it in Base units.
- An unknown Barcode shows "Not found" and offers search. From there, a Manager can link that Barcode to a Product.

#### FR-39: Manual fallback
Every screen that accepts a scan also accepts a typed SKU or a search, for phones whose camera cannot scan.

### 4.12 Offline Use (Installable Web App)

**Description:** Mojud is a web app that can be added to the phone's home screen as a PWA. Work on the warehouse floor can continue without a connection.

#### FR-40: Install to home screen
A User can install Mojud from the browser so that it opens like an app. There is no app store.

#### FR-41: Record actions offline
While offline, a signed-in User can record these actions, which are added to the Offline queue:
- Receipt counts (FR-21)
- Picks and dispatch confirmations (FR-25)
- Sending and receiving Transfers (FR-26, FR-27)
- Damage flags (FR-29)
- Stock count lines (FR-35)

Conditions:
- The User must have signed in on that device while it was online at least once.
- `[ASSUMPTION — provisional target]` Actions can be queued for up to 24 hours. After that, the device asks the User to reconnect.

Queued actions stay with their author (shared phones, FR-2):
- Every queued action is stamped, when it is recorded, with the User who recorded it and a signed token for that sign-in session. New actions are always stamped with the User signed in now. `[ASSUMPTION: signed action tokens to be confirmed in architecture]`
- Queued actions keep syncing as their author, even after that User signs out.
- A different User who signs in on the same device cannot edit, discard or re-send them, and sees only how many are waiting, for example "2 actions from another person waiting to sync".

#### FR-42: Show offline status
The screen always shows whether the device is online or offline and how many actions are waiting in the queue. Stock figures shown while offline are labelled "as of (time)".

#### FR-43: Automatic sync
When the connection returns, queued actions are sent in the order they were recorded, without the User doing anything.
- Each action is applied only once (FR-14).
- Each action keeps its original device time, and the server time is recorded as well.

#### FR-44: Sync conflicts
If the server refuses a queued action, for example because it would make stock negative, the action is not applied and a Sync conflict Issue is raised (decisions in FR-33a).
- The User who recorded the action sees it marked "Not applied – sent to supervisor", in the device's queue screen and in My record.
- No action in the queue is ever lost without a record.

### 4.13 Language

#### FR-45: Bangla and English
Each User can switch the interface between Bangla and English at any time. The choice is remembered for that User.
- All screen text, buttons, messages and Reasons appear in the chosen language.
- Names of Products, Suppliers and customers are shown exactly as they were entered.
- `[ASSUMPTION]` Numbers use Western digits (0–9) in both languages in v1.

### 4.14 Excel Import

#### FR-46: Download templates
A Manager can download Excel templates for Products, Suppliers and opening stock.
- The Products template has an optional **Alternate names** column. Several Alternate names in one cell are separated by ";" (FR-6).

#### FR-47: Import with preview
A Manager can upload a filled template. The system checks every row and shows a preview of the valid rows and the errors, each error with its row number and reason.
- Nothing is saved until the Manager confirms.
- Rows with errors are skipped, and valid rows are imported.
- Opening stock rows create "opening balance" Stock movements (FR-16).

### 4.15 Owner View and Low Stock

#### FR-48: Owner view
The Owner, Manager and Accountant can see one summary screen showing:
- Stock value per Warehouse and in total.
- Losses for the chosen month in taka by Reason (damaged, expired, other, transfer loss, confirmed loss), plus the current Unexplained value.
- The number and value of open Discrepancy cases and other open Issues.
- The number of low-stock Products: Promisable quantity at or below the Low-stock threshold, per Warehouse (same rule as FR-50).

Realizes UJ-6.

#### FR-49: Drill down to evidence
Every figure in the owner view can be tapped to show the Issues or Stock movements behind it. Each item shows the Product, quantity, value, User and time.

#### FR-50: Low-stock list
Any User can see the Products whose Promisable quantity at a Warehouse is at or below that Warehouse's Low-stock threshold. The list also shows the quantity on open POs.
- Out-of-stock Products (Promisable quantity 0) appear first.

### 4.16 My Tasks and My Record

#### FR-53: My tasks
Each Warehouse worker and Supervisor sees a list of open work in their Assigned Warehouses:
- Dispatch orders to pick, by required date
- Sent POs to receive
- Incoming Transfers to receive
- Stock count lines assigned to them
- Their own draft Transfers not yet sent, shown as "Draft transfer · not sent" (FR-26)

After any action, the next task appears.

Only tasks for features already built appear. The list grows as later increments add features.

#### FR-51: My record
Every User can see their own summary for today, this week and this month:
- Dispatch lines picked.
- Receipt and Transfer lines counted.
- Count lines that were confirmed "verified".
- Damage flags raised, with how many were approved or rejected.
- Discrepancy cases and Sync conflicts linked to their own actions, with the outcome of each.

Each User sees only their own record, except that Owners and Managers can see anyone's. This record is the User's proof of work.

#### FR-52: Instant confirmation
After every action, the User sees a clear confirmation: "Saved ✓" when online, or "Saved on phone, will sync" when offline.

## 5. Cross-Cutting Non-Functional Requirements

`[ASSUMPTION]` All numbers in this section are provisional targets until they are tested with real users and real phones.

- **NFR-1 Speed:** On a typical low-cost Android phone over 3G/4G, product search results appear within 1 second and saving an action takes less than 2 seconds.
- **NFR-2 Effort budget:** Each routine floor action (receiving a line, picking a line, flagging damage, counting a line) needs at most one scan and one tap when the defaults are accepted.
- **NFR-3 Small screens:** Every screen works on a phone screen 360 pixels wide without sideways scrolling. Owner and Manager screens also work in a desktop browser.
- **NFR-4 Data correctness:** If two Users act on the same stock at the same moment, the result is still correct and never negative. One of them may be asked to retry, but no change is lost or counted twice.
- **NFR-5 Audit:** Every Stock movement and Issue decision records the User, the time, the Warehouse and a Reason. Nothing on screen or through the API can edit or delete them.
- **NFR-6 Security:**
  - All traffic uses HTTPS.
  - Passwords are stored only as secure hashes.
  - Every request checks the User's Business, Role and Assigned Warehouses on the server.
  - No secrets are kept in the code.
- **NFR-7 Data isolation:** Automated tests confirm that a User of one Business cannot read or change another Business's data.
- **NFR-8 Backups:** Data is backed up automatically at least once a day, and each backup is kept for 30 days. A restore is tested before the first real customer starts.
- **NFR-9 Availability:** The goal is 99% uptime each month. Floor work continues during outages because of offline mode.
- **NFR-10 Scale (v1):** Each Business can have up to 3 Warehouses, 30 Users, 5,000 Products and 2,000 Stock movements a day without slowing down.
- **NFR-11 Usability:** After a 10-minute demonstration and without a manual, a new Warehouse worker can complete a Receipt and a Damage flag.

## 6. Non-Goals (Explicit)

v1 of Mojud does not include any of the following:

- An ERP, accounting system, POS or invoicing tool. Selling prices are not stored.
- A general ledger, tax or VAT.
- **Customer returns or returns to Suppliers.** These are out of v1 and are planned as a simple "return in" later.
- Batch, lot or serial-number tracking.
- Kitting, assembly or bill of materials (BOM), or any other stock transformation.
- Bin or shelf locations inside a Warehouse.
- Risk scores for individual people, or an overall "trust score".
- Several companies under one account.
- A native Android or iOS app. Mojud is web only, installable as a PWA.
- Integration with other software, such as Tally. Tally integration is a COULD for later (§7.3).
- SMS, email or push notifications. In v1, the Issues inbox and My tasks replace them.

## 7. MVP Scope

### 7.1 In Scope

All 18 MUST capabilities from the brief are covered by FR-1 to FR-54:

| # | MUST capability (brief) | FRs |
|---|---|---|
| 1 | Product catalogue with carton and piece units | FR-6 – FR-9 |
| 2 | 1–3 Warehouses | FR-10 |
| 3 | Append-only Stock ledger | FR-11, FR-14, FR-15, FR-17 |
| 4 | Stock states and Promisable quantity | FR-12, FR-13 |
| 5 | Suppliers, POs, Blind receiving | FR-19 – FR-22 |
| 6 | Dispatch with reservation | FR-23 – FR-25 |
| 7 | Transfers with a count at the receiving end | FR-26 – FR-28 |
| 8 | Damage flag with one-tap approval | FR-29, FR-30 |
| 9 | Ranked Issues inbox | FR-31 – FR-33a |
| 10 | Stock counts and Discrepancy cases | FR-34 – FR-37 |
| 11 | Roles and segregation of duties | FR-1 – FR-5, FR-54 |
| 12 | Phone-camera barcode scanning | FR-38, FR-39 |
| 13 | Bangla and English | FR-45 |
| 14 | Excel import | FR-46, FR-47 |
| 15 | Low stock and owner view of losses in taka | FR-48 – FR-50 |
| 16 | Offline scan queue (PWA) | FR-40 – FR-44 |
| 17 | Worker "My record" view (with next task) | FR-51 – FR-53 |
| 18 | Basic Stock value | FR-16, FR-18 |

### 7.2 Suggested Build Increments

`[ASSUMPTION]` This order is a suggestion. The final order is decided during epic and story planning. Each increment depends only on earlier ones and can be used and tested on its own. **Increments 1–4 cover core stock tracking.**

| Increment | What becomes usable | FRs |
|---|---|---|
| **1. Foundation** | Sign-in and recovery, Business, Users with Roles and Warehouses, Products, Warehouses, opening stock, stock ladder, history, the no-negative rule | FR-1 – FR-4, FR-54, FR-6 – FR-14, FR-16, FR-17 |
| **2. Buying in** | Suppliers, POs, blind receiving, Stock value and Revalue, a basic Issues inbox, segregation of duties, Reversals | FR-5, FR-15, FR-18 – FR-22, FR-31 – FR-33a |
| **3. Selling out** | Dispatch orders, reservation, picking, My tasks | FR-23 – FR-25, FR-53 |
| **4. Moving stock** | Transfers with blind counts and transfer Issues | FR-26 – FR-28 |
| **5. Damage** | Damage flags and one-tap decisions | FR-29, FR-30 |
| **6. Verification** | Stock counts and Discrepancy cases | FR-34 – FR-37 |
| **7. Floor speed** | Camera scanning, installable PWA, Offline queue, confirmations | FR-38 – FR-44, FR-52 |
| **8. Ready for real use** | Bangla, Excel import, owner view, low stock, My record | FR-45 – FR-51 |

*Notes for the builder:*
- From Increment 1, keep all screen text in a translation file. Adding Bangla in Increment 8 then only means adding the translations.
- From Increment 1, give every action a unique ID (FR-14), so offline mode slots in later without changes.
- FR-33a lists every Issue type in v1. Add each Issue type to the inbox in the same increment as the feature that raises it.

### 7.3 Out of Scope for v1 (deferred)

**SHOULD** (next):
- Damage photos
- Risk-based extra checks (first rule: high-value items get a second count)
- Best-before dates and a near-expiry list
- Weighted-average cost, a month-end lock and accounting export
- A "freshness" stamp on availability
- A 30-minute soft hold for Sales reps
- Expected arrival dates shown alongside availability

**COULD** (later):
- Supplier on-time history
- Adaptive risk levels
- A drift-rate metric
- Grouping similar damage reports
- Seal or QR checks on Transfers
- Discrepancy cause analytics
- Tally integration
- Customer and Supplier returns

## 8. Success Metrics

`[ASSUMPTION]` Every target in this section is provisional until it has been checked with real users.

**Primary**
- **SM-1 Record accuracy:** the share of Stock count lines where the counted quantity equals On hand. Target: at least 97% by month 3. The first full count sets the baseline. Validates FR-11 – FR-13 and FR-34 – FR-36.
- **SM-2 Floor adoption:** at least 80% of Warehouse workers and Sales reps record at least one action every working week. Validates FR-29, FR-38 – FR-44, FR-51 and FR-53.

**Secondary**
- **SM-3 Complete audit:** 100% of Stock movements have a User, time, Warehouse and Reason. Validates FR-11 and NFR-5.
- **SM-4 Unexplained loss falls:** the Unexplained value in taka goes down from month to month, and at least 80% of Discrepancy cases are resolved within 7 days. Validates FR-36, FR-37, FR-48 and FR-49.
- **SM-5 Damage captured at source:** at least 90% of damage losses come from Damage flags rather than from Stock counts resolved as "unrecorded damage". This is a measurable stand-in for "damage flagged in the same shift". A second target: Damage flags are decided within 24 hours. Validates FR-29 – FR-31 and FR-37.
- **SM-6 Speed:** 90% of routine floor actions take 5 seconds or less, and a Sales rep finds the Promisable quantity in 10 seconds or less. Validates FR-8, FR-12, FR-38, NFR-1 and NFR-2.
- **SM-7 Product proof:** one real distributor uses Mojud instead of Excel or khata for 8 weeks in a row.

**Counter-metrics (do not optimize)**
- **SM-C1 Number of counts:** do not raise SM-1 by counting less often, or by counting only easy products. Stock counts should still happen at least weekly. Counterbalances SM-1.
- **SM-C2 "Unknown" resolutions:** do not close Discrepancy cases faster by resolving them as "unknown". Track how many are closed that way. Counterbalances SM-4.
- **SM-C3 Damage flag volume:** do not reduce Damage flags by discouraging people from reporting. Falling flags together with a rising Unexplained value is a warning sign. Counterbalances SM-5.

## 9. Open Questions

1. Will owners pay a monthly fee, and how much? About ৳1,000–3,000/month is an unverified guess.
2. Do warehouse workers have their own smartphones, or do they share them? If they share, how does each worker sign in quickly as themselves?
   *Partly decided 2026-10-24 (DD-8):* v1 supports shared phones. A device can be marked Shared phone so passwords are not saved (FR-2), and queued actions stay with the User who recorded them, even after sign-out (FR-41). *Still open:* how many workers really share phones, and whether a quicker way to switch User than phone number + password is needed.
3. Can the camera scanner read FMCG barcodes reliably on the low-cost phones staff actually use?
4. Why would an owner switch from an Excel sheet that works "well enough"? Is the taka lost to stock problems big enough to justify paying?
5. Will staff accept more accountability if the product clearly protects them too?
6. What security and backup promises do owners need before they trust a web app with their data?
7. Is a customer list needed for Dispatch orders, or is a free-text customer name enough for v1?
8. Does "approve = write-off" fit how distributors really handle damaged goods (FR-30)?

## 10. Assumptions Index

- §4.1 FR-2: sign-in pauses after 5 failed attempts.
- §4.1 FR-2: Shared phone is on by default for Warehouse workers and Supervisors. Browsers may still offer to save the password even when asked not to (test on Chrome Android).
- §4.1 FR-5: an Owner can self-approve when no other eligible User exists, and the record is marked.
- §4.2 FR-6: a Product can have up to 5 Alternate names.
- §4.7 FR-26: a draft Transfer not sent within 24 hours raises a Draft-transfer-not-sent Issue. Its decisions are Keep draft and Discard draft (FR-33a).
- §4.7 FR-28: extra received on a Transfer is held until someone decides. An overdue Issue is raised after 48 hours (**provisional target**).
- §4.8 FR-29: damage flagged from Reserved stock triggers an automatic re-reservation from Available.
- §4.8 FR-30: **open for validation**. Approving a Damage flag always writes the stock off.
- §4.9 FR-31: inbox ranking is assigned Issues first, then Reserved stock, then value at risk, then age.
- §4.10 FR-36: count lines are compared with On hand at the moment each line is counted. Shortages are taken from Available, then Damaged, then Reserved.
- §4.10 FR-36 / FR-33a: Start recount and Dismiss are enough decisions for a Late count line Issue.
- §4.12 FR-41: the Offline queue holds up to 24 hours of actions (**provisional target**).
- §4.12 FR-41: queued actions carry a signed per-session action token (to be confirmed in architecture).
- §4.13 FR-45: Western digits are used in both languages.
- §5: all NFR numbers are provisional.
- §7.2: the order of build increments is a suggestion.
- §8: all success targets are provisional.

*Decided (no longer assumptions):* phone number + password sign-in with Owner recovery code and admin reset; Unit cost = latest Receipt cost with Revalue movements; one Warehouse per Dispatch order; segregation-of-duties rules in FR-5; returns are a non-goal; per-line posting on receiving and picking, draft Transfers, count discrepancies applied at close, and server-enforced Blind counts (2026-10-24, §11).

## 11. Change log

**2026-10-24** — applied UX design decisions DD-1…DD-10 (`design-process/C-UX-Scenarios/00-design-decisions.md`). FR numbers are unchanged and no new FR was added.

- **DD-1:** each saved line is its own Stock movement on Receive PO (FR-21), Pick (FR-25) and Receive Transfer (FR-27). Finish actions close the task and raise Issues; they never post lines again.
- **DD-2:** value at risk still ranks Issues, but taka is shown only to Roles that may view Stock value (FR-31, FR-4 note).
- **DD-3:** low stock = Promisable quantity at or below the threshold; out of stock = Promisable 0 (Glossary, FR-48, FR-50).
- **DD-4:** no PRD change (screen layout belongs in DESIGN.md and EXPERIENCE.md).
- **DD-5:** a Transfer is a draft until sent; drafts visible and discardable; Send refused when Available dropped; new Draft-transfer-not-sent Issue type (Glossary, FR-26, FR-28, FR-33a, FR-53).
- **DD-6:** count discrepancies apply at Close count; Close count warns about unsynced lines; late lines open a new Late count line Issue type (FR-35, FR-36, FR-33a).
- **DD-7:** during a Blind count, assigned counters cannot see system quantities for the counted Products at that Warehouse on any screen; server-enforced (FR-35, FR-12, FR-4 note).
- **DD-8:** Shared phone device setting with no password saving; queued actions stay with their author after sign-out (FR-2, FR-41, §9 Q2 partly decided).
- **DD-9:** no PRD change (the PRD does not describe navigation; Owner Orders access is in EXPERIENCE.md).
- **DD-10:** optional Alternate names on Products; search matches them; new optional template column (Glossary, FR-6, FR-8, FR-46).
