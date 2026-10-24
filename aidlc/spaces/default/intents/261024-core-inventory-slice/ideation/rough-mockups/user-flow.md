# User Flows — Mojud core slice

Inputs: the intent statement ("intent-statement"), the scope document ("scope-document") and the intent backlog ("intent-backlog"). Screen codes W1–W14 refer to `wireframes.md`; S-numbers refer to the existing `EXPERIENCE.md`.

## Core Flow (happy path, end to end)

```
[Owner] W1 Sign up --> W3 Setup home
            |
            v
   W4 Warehouses --> W6 Products + opening stock --> W7 Suppliers
            |
            v
   W5 Users (adds Manager, Sales rep, Warehouse worker; sets passwords)
            |
            v
[Manager] W2 Sign in --> W8 New purchase order --> Send
                                                     |
                                                     v
[Worker]  W2 Sign in --> W10 My tasks --> W11 Receive (blind) --> Mark delivery complete
                                                     |                       |
                                                     |          (shortfall Issue created)
                                                     v
[Sales rep] W2 Sign in --> W9 New dispatch order (stock reserved)
                                                     |
                                                     v
[Worker]  W10 My tasks --> W12 Pick --> W13 Flag damage --> W12 --> Confirm dispatch
                                             |
                                (damage Issue created; replacement reserved)
```

<!-- Text fallback: The Owner signs up and lands on the Setup home, then adds warehouses, products with opening stock, suppliers and users. The Manager signs in and sends a purchase order. The Warehouse worker signs in, opens My tasks, receives the delivery blind and marks it complete, which may create a shortfall Issue. The Sales rep signs in and creates a dispatch order, reserving stock. The worker picks the order from My tasks, flags a damaged carton (a replacement is reserved and a damage Issue is created), and confirms dispatch. -->

## Flow 1: Owner sets up the business (scenario 09)

Persona: Mr. Haque, Owner. Trigger: wants to start using Mojud.

1. W1 Sign up → enters business name, name, phone, password → business and Owner account created; lands on W3 Setup home.
2. W3 → Warehouses (W4) → adds Narayanganj and Gazipur.
3. W3 → Products (W6) → adds products with units, barcodes and opening stock per warehouse.
4. W3 → Suppliers (W7) → adds suppliers.
5. W3 → Users (W5) → adds Manager, Sales rep and Warehouse worker with roles, warehouses and passwords.

Success: the Setup home shows warehouses, products, suppliers and users in place.

Error paths:
- Phone number already registered → message on the field → use another number or sign in.
- Fourth active warehouse → "You can have at most 3 active warehouses."
- Duplicate SKU or barcode → message names the field → change it.

## Flow 2: Worker receives a delivery blind (scenario 01)

Persona: Karim, Warehouse worker. Trigger: a supplier delivery arrives for a sent purchase order.

1. W2 Sign in → lands on W10 My tasks with "Receive · PO-12" on top.
2. Opens the task → W11 Receive, showing products but no ordered amounts.
3. Selects a line (tap, or Type code) → enters cartons and bags counted → Save line → "Saved"; stock is now Available.
4. Repeats for each line.
5. Mark delivery complete → dialog "3 of 5 lines counted…" → confirms → "Receipt saved" → back to W10 with the next task.

Success: received quantities are Available; if fewer arrived than ordered, a shortfall Issue exists (decided in a later round).

Error paths:
- Typed product not on the purchase order → "Not on this order"; nothing recorded.
- Save without a quantity → Save disabled with "Enter a quantity" shown.
- Server error → "Couldn't save. Try again." with what was typed kept.

## Flow 3: Sales rep creates a dispatch order

Persona: Tanvir, Sales rep. Trigger: a customer orders stock.

1. W2 Sign in → lands on W9 Dispatch orders.
2. New dispatch order → customer name, warehouse, needed-by date.
3. Adds products; sees Available for each; enters quantities → Save order → stock moves to Reserved.

Success: the order appears in the worker's My tasks.

Error paths:
- Quantity above Available → "Only 32 ctn available. Max 32 ctn." with "Use max"; save blocked until fixed.

## Flow 4: Worker picks and flags damage (scenario 02)

Persona: Karim, Warehouse worker. Trigger: a dispatch order is in My tasks.

1. W10 → opens "Pick · DO-31" → W12 with the remaining quantity pre-filled on the current line.
2. Confirm line → that quantity leaves stock as dispatched.
3. Finds a crushed carton → Flag damage → W13 pre-filled (Rice 25 kg, 1 ctn, damaged) → Flag damage → carton moves to Damaged, a replacement is reserved, "Flagged 1 ctn damaged".
4. Continues picking → Confirm dispatch → back to W10.

Success: the order is dispatched in full, the damaged carton is recorded with who, when and where, and a damage Issue exists (decided in a later round).

Error paths:
- No Available stock for the replacement → the line is marked short; Confirm dispatch then says "1 line is short. Short quantities stay Reserved."
- Quantity above what is left on the line → "Max 12 ctn" with "Use max".

## Information Architecture (this round)

```
Public
  +-- W1 Sign up
  +-- W2 Sign in
Owner / Manager
  +-- W3 Setup home
       +-- W4 Warehouses
       +-- W5 Users
       +-- W6 Products (+ opening stock)
       +-- W7 Suppliers
       +-- W8 Purchase orders
       +-- W9 Dispatch orders
Sales rep
  +-- W9 Dispatch orders
Warehouse worker
  +-- W10 My tasks
       +-- W11 Receive PO (blind)
       +-- W12 Pick dispatch order
            +-- W13 Flag damage
Supervisor / Accountant
  +-- W14 Coming in a later round
```

## Assumptions & Open Questions

None.
