# Wireframes — Mojud core slice (rough)

Inputs: the intent statement (`ideation/intent-capture/intent-statement.md`, "intent-statement"), the scope document (`ideation/scope-definition/scope-document.md`, "scope-document") and the intent backlog (`ideation/scope-definition/intent-backlog.md`, "intent-backlog"), plus the answers in `rough-mockups-questions.md`.

## How to Read This

Your existing UX design stays the source of truth (Q1):

- Behaviour: `_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md` (screen numbers S1–S27 below come from it)
- Look and feel: `DESIGN.md` in the same folder, and `design-process/D-Design-System/`
- Page-level detail: `design-process/C-UX-Scenarios/` (pages 01.1, 01.2, 01.3, 02.1, 02.2, 09.1, 09.2, 09.4–09.7)
- HTML mockups: `mockups/key-receiving.html` and `mockups/key-picking.html`

These rough wireframes list only this round's screens and show **what is different** from that design because of this round's choices. Anything not mentioned here follows the existing design unchanged.

## What Changes From the Existing Design

| Change | Why | Screens affected |
|---|---|---|
| Desktop layout only; no phone layouts this round | Q2 | All |
| No camera: the Scan bar and Scan overlay become **Type code**, which takes a product code (SKU), barcode number or name search | Feasibility Q6 | S3, S4, S7, S8 |
| Flag damage on the pick screen opens the Flag damage sheet pre-filled with the selected line's product, 1 carton, reason "damaged"; one tap on Save | Q6 | S8, S9 |
| English only; every screen string still comes from a translation file so Bangla can be added later | Intent capture Q10 | All |
| Light and dark themes both ship, with a theme switch | Q5 | All |
| No offline banner, sync chips or offline queue; the status shows "Online" only | Intent capture Q10 | All floor screens |
| No recovery-code step at sign-up and no "Forgot password / Owner recovery" link | Scope Q3 | S1, S2 |
| No temporary password or shared-phone hint at sign-in; the Owner or Manager sets each user's password in Settings: Users | Scope Q1 | S2, S22 |
| New **Setup home** for Owner and Manager instead of the Issues inbox and Owner view | Q3 | New screen |
| A "coming in a later round" page for Supervisor and Accountant | Q3 | New screen |
| No Excel import, stock ladder, movement history, Issues inbox or Issue detail screens | Scope document | S6, S12, S13, S26 |
| Issues are still created (shortfall, over-delivery, damage); nobody can view or decide them yet | Scope document | — |
| Accessibility target stays WCAG 2.1 AA, with the design's touch-target sizes | Q4 | All |

## App Shell (all signed-in screens)

```
+--------------------------------------------------------------------------+
| Mojud        [screen title]               Karim (Warehouse worker)       |
|                                           Online   [Theme: Light v]      |
|                                           [Sign out]                     |
+---------------+----------------------------------------------------------+
| Side nav      |                                                          |
| (role-based)  |   main content                                           |
|  - item       |                                                          |
|  - item       |                                                          |
+---------------+----------------------------------------------------------+
```

Accessibility: `header`, `nav` and `main` landmarks; skip-to-content link first; current nav item marked `aria-current="page"`; online status shown as icon plus text, never color alone.

Side nav per role (Q3):

| Role | Lands on | Side nav |
|---|---|---|
| Owner | Setup home | Setup home · Warehouses · Users · Products · Suppliers · Purchase orders · Dispatch orders |
| Manager | Setup home | Same as Owner (cannot manage Owners) |
| Sales rep | Dispatch orders | Dispatch orders |
| Warehouse worker | My tasks | My tasks |
| Supervisor | Coming later | (none) |
| Accountant | Coming later | (none) |

## W1. Sign up (S1, page 09.1)

```
+--------------------------------------------------------------+
| Mojud                                                        |
|            +--------------------------------------+          |
|            | Create your business (h1)            |          |
|            | Business name  [                   ] |          |
|            | Your name      [                   ] |          |
|            | Phone number   [                   ] |          |
|            |   You sign in with this number.      |          |
|            | Password       [               ][Show]|         |
|            |   At least 8 characters.             |          |
|            | [ Create business ]                  |          |
|            | Already have an account? Sign in     |          |
|            +--------------------------------------+          |
+--------------------------------------------------------------+
```

After "Create business" the Owner goes straight to the Setup home (no recovery-code view this round).

States: field errors under each field, keeping what was typed; "This phone number is already registered" for a duplicate; "Couldn't save. Try again." on a server error; button disabled while saving.

Accessibility: h1 "Create your business"; `main` landmark; first focus on Business name; every field has a visible label.

## W2. Sign in (S2)

```
+--------------------------------------------------------------+
| Mojud                                                        |
|            +--------------------------------------+          |
|            | Sign in (h1)                         |          |
|            | Phone number   [                   ] |          |
|            | Password       [               ][Show]|         |
|            | [ Sign in ]                          |          |
|            | New business? Create one             |          |
|            +--------------------------------------+          |
+--------------------------------------------------------------+
```

States: "Sign-in details are not correct." (never says which field); "This account is deactivated."; button disabled while signing in.

Accessibility: h1 "Sign in"; `main` landmark; first focus on Phone number; the error is announced once.

## W3. Setup home (new; Owner and Manager)

```
+---------------+----------------------------------------------------------+
| Side nav      | Set up Haque Traders (h1)                                |
|               |                                                          |
|               | +----------------+ +----------------+ +----------------+ |
|               | | Warehouses     | | Users          | | Products       | |
|               | | 2 active       | | 5 users        | | 12 products    | |
|               | | [Open]         | | [Open]         | | [Open]         | |
|               | +----------------+ +----------------+ +----------------+ |
|               | +----------------+ +----------------+ +----------------+ |
|               | | Suppliers      | | Purchase orders| | Dispatch orders| |
|               | | 3 suppliers    | | 1 sent         | | 2 open         | |
|               | | [Open]         | | [Open]         | | [Open]         | |
|               | +----------------+ +----------------+ +----------------+ |
+---------------+----------------------------------------------------------+
```

First use (no data): the cards read "None yet" and the page suggests the order: Warehouses, then Products with opening stock, then Suppliers, Users and Purchase orders.

Accessibility: h1 page title; each card is a link with its heading as the name (h2); keyboard order left to right, top to bottom.

## W4. Settings: Warehouses (S23, page 09.2)

```
+---------------+----------------------------------------------------------+
| Side nav      | Warehouses (h1)                       [ Add warehouse ]  |
|               | Name             Status     Actions                      |
|               | Narayanganj      Active     [Rename] [Deactivate]        |
|               | Gazipur          Active     [Rename] [Deactivate]        |
|               | 2 of 3 active warehouses                                 |
+---------------+----------------------------------------------------------+
```

States: "You can have at most 3 active warehouses." when adding a fourth; a warehouse that holds stock cannot be deactivated (message names the rule); empty: "No warehouses yet" + Add warehouse.

Accessibility: h1; data table with header cells; action buttons named with the warehouse ("Rename Gazipur").

## W5. Settings: Users (S22, page 09.6)

```
+---------------+----------------------------------------------------------+
| Side nav      | Users (h1)                                 [ Add user ]  |
|               | Name     Phone        Role              Warehouses  Status|
|               | Karim    01711...     Warehouse worker  Narayanganj Active|
|               | Tanvir   01811...     Sales rep         All         Active|
|               |                                                          |
|               | Add / edit user (panel)                                  |
|               |  Name [        ]  Phone [        ]                       |
|               |  Role [ Warehouse worker v ]                             |
|               |  Assigned warehouses [x] Narayanganj [ ] Gazipur         |
|               |  Password [        ] (set by you; tell the user)         |
|               |  [ Save ]  [ Cancel ]                                    |
+---------------+----------------------------------------------------------+
```

States: duplicate phone number refused; a Manager cannot add, change or deactivate an Owner (those controls are hidden for Managers); the last active Owner cannot be deactivated.

Accessibility: h1; table with headers; the panel is a labelled region; focus moves to Name when the panel opens and back to the triggering button when it closes.

## W6. Settings: Products with opening stock (S24, page 09.4)

```
+---------------+----------------------------------------------------------+
| Side nav      | Products (h1)                           [ Add product ]  |
|               | Name          SKU      Units               Barcodes      |
|               | Rice 25 kg    RICE25   1 ctn = 4 bag       2             |
|               |                                                          |
|               | Add / edit product (panel)                               |
|               |  Name [        ]  SKU [      ]  Category [      ]        |
|               |  Base unit [ bag ]  Pack unit [ ctn ]  Per pack [ 4 ]    |
|               |  Base barcode [       ]  Pack barcode [       ]          |
|               |  Opening stock                                           |
|               |   Narayanganj  qty [ 10 ctn ] [ 0 bag ]  cost/bag [   ]  |
|               |   Gazipur      qty [  0 ctn ] [ 0 bag ]  cost/bag [   ]  |
|               |  [ Save ]  [ Cancel ]                                    |
+---------------+----------------------------------------------------------+
```

States: duplicate SKU or barcode refused with the field named; carton size must be a whole number of 2 or more; opening stock can be entered once per product and warehouse (later changes need features from a later round).

Accessibility: h1; grouped fields use `fieldset` and `legend` ("Units", "Opening stock"); quantity fields labelled with warehouse and unit.

## W7. Settings: Suppliers (S25, page 09.5)

```
+---------------+----------------------------------------------------------+
| Side nav      | Suppliers (h1)                         [ Add supplier ]  |
|               | Name          Contact      Phone        Address          |
|               | ACI Foods     Mr. Rahman   01911...     Tejgaon, Dhaka   |
+---------------+----------------------------------------------------------+
```

States: empty "No suppliers yet" + Add supplier; required name; archive instead of delete.

Accessibility: h1; table with headers; add/edit panel follows W5's focus rules.

## W8. Purchase orders (S15, page 09.7)

```
+---------------+----------------------------------------------------------+
| Side nav      | Purchase orders (h1)              [ New purchase order ] |
|               | No.    Supplier    Warehouse     Expected   Status       |
|               | PO-12  ACI Foods   Narayanganj   26 Oct     Sent         |
|               |                                                          |
|               | New purchase order (page)                                |
|               |  Supplier [ v ]  Warehouse [ v ]  Expected date [    ]   |
|               |  Product [ type code or search ]  Qty [ ctn ][ bag ]     |
|               |    Cost [   ] per [ ctn v ]                [ Add line ]  |
|               |  Lines: Rice 25 kg  100 ctn  @ 2,400 per ctn  [Remove]   |
|               |  [ Save as draft ]  [ Send ]                             |
+---------------+----------------------------------------------------------+
```

States: a Sent purchase order appears in My tasks for workers assigned to its warehouse; status updates to Partly received or Received after receiving.

Accessibility: h1; table with headers; line list is a list with remove buttons named per product.

## W9. Dispatch orders (S14; Sales rep home)

```
+---------------+----------------------------------------------------------+
| Side nav      | Dispatch orders (h1)            [ New dispatch order ]   |
|               | No.    Customer       Warehouse     Needed by  Status    |
|               | DO-31  Rahman Store   Narayanganj   25 Oct     Open      |
|               |                                                          |
|               | New dispatch order (page)                                |
|               |  Customer name [            ]  Warehouse [ v ]           |
|               |  Needed by [      ]                                      |
|               |  Product [ type code or search ]                         |
|               |   Available: 32 ctn                                      |
|               |   Qty [ ctn ][ bag ]                      [ Add line ]   |
|               |  [ Save order ]                                          |
+---------------+----------------------------------------------------------+
```

States: more than available is refused with "Only 32 ctn available. Max 32 ctn." and a "Use max" button; saving reserves the stock; empty list "No dispatch orders yet" + New dispatch order.

Accessibility: h1; the refusal is linked to the quantity field by `aria-describedby` and announced once.

## W10. My tasks (S3, page 01.1; Warehouse worker home)

```
+---------------+----------------------------------------------------------+
| My tasks      | My tasks (h1)                    Narayanganj             |
|               | +------------------------------------------------------+ |
|               | | Receive · PO-12 · ACI Foods                 [New]    | |
|               | | 5 products                                           | |
|               | +------------------------------------------------------+ |
|               | +------------------------------------------------------+ |
|               | | Pick · DO-31 · Rahman Store · needed 25 Oct [In prog]| |
|               | | 8 / 20 ctn picked                                    | |
|               | +------------------------------------------------------+ |
|               | [ Type code ]  (replaces the camera Scan bar)            |
+---------------+----------------------------------------------------------+
```

States: empty "All tasks done for today"; each card is one link; status tag New / In progress / Done (no "Not synced" this round); after finishing any task the worker returns here with the next task on top.

Accessibility: h1; task list is a list of links named by the card title; Type code is a button that opens a dialog.

## W11. Receive purchase order, blind (S7, pages 01.2 and 01.3)

```
+---------------+----------------------------------------------------------+
| My tasks      | < Back   Receive PO-12 (h1)   ACI Foods · Narayanganj    |
|               | +------------------------------------------------------+ |
|               | | > Rice 25 kg                     counted 8 ctn       | |
|               | |   Cartons [ - ][ 8  ][ + ]   Bags [ - ][ 0 ][ + ]    | |
|               | |   [ Save line ]                                      | |
|               | +------------------------------------------------------+ |
|               | | Lentils 50 kg                    not counted yet     | |
|               | +------------------------------------------------------+ |
|               | [ Mark delivery complete ]                               |
|               | [ Type code ]                                            |
+---------------+----------------------------------------------------------+

Type code dialog (S4 without camera):
+--------------------------------------+
| Type code (h2)                       |
| [ code, barcode number or name     ] |
|  Rice 25 kg   RICE25                 |
|  Rice 50 kg   RICE50                 |
| [ Close ]                            |
+--------------------------------------+
```

Never shown anywhere, including the page code: ordered or remaining quantities (blind). Saving a line moves that quantity into Available straight away. "Mark delivery complete" opens a dialog: "Finish this delivery? 3 of 5 lines counted. Lines with no count are saved as not received in this delivery." Afterwards the worker sees only "Receipt saved"; a shortfall or over-delivery Issue is created in the background.

States: "Not on this order" when the typed product is not on the purchase order; "Saved" toast after each line; save disabled until a quantity is entered (reason shown beside it).

Accessibility: h1 with the purchase order number; the selected line is marked for screen readers; dialog uses `role="alertdialog"` with focus starting on Go back; the Type code dialog traps focus and Escape closes it.

## W12. Pick dispatch order (S8, page 02.1)

```
+---------------+----------------------------------------------------------+
| My tasks      | < Back   DO-31 (h1)       Rahman Store · Narayanganj     |
|               | +------------------------------------------------------+ |
|               | | > Rice 25 kg                     8 / 20 ctn          | |
|               | |   Cartons [ - ][ 12 ][ + ]  Max 12 ctn               | |
|               | |   [ Confirm line ]                                   | |
|               | +------------------------------------------------------+ |
|               | | Sugar 1 kg                       0 / 5 ctn           | |
|               | +------------------------------------------------------+ |
|               | [ Confirm dispatch ]                                     |
|               | [ Flag damage ]   [ Type code ]                          |
+---------------+----------------------------------------------------------+
```

The quantity is pre-filled with what is left on the line. Confirming a line moves it out of stock straight away. "Confirm dispatch" asks only when lines are short: "2 lines are short. Short quantities stay Reserved."

States: "Max 12 ctn" refusal with "Use max"; a line with a damaged carton shows a "Damaged 1 ctn" pill; "Not on this order" for a typed product not on the order.

Accessibility: h1 with the order number; progress read as "8 of 20 cartons picked"; Flag damage acts on the selected line and says so in its accessible name ("Flag damage on Rice 25 kg").

## W13. Flag damage sheet (S9, page 02.2)

```
+--------------------------------------+
| Flag damage (h2)                     |
| Product   Rice 25 kg  [change]       |
| Quantity  [ - ][ 1 ][ + ] ctn        |
| Reason    (o) damaged ( ) expired    |
|           ( ) other                  |
| Note (optional) [               ]    |
| [ Flag damage ]        [ Close ]     |
+--------------------------------------+
```

Pre-filled from the selected pick line (Q6), so accepting the defaults is one tap. On save: that quantity moves from Reserved to Damaged, a replacement is reserved from Available, a damage Issue is created, and the toast reads "Flagged 1 ctn damaged". If nothing is available to replace it, the line is marked short.

States: refusal "Only 2 ctn on this line. Max 2 ctn."; Close saves nothing.

Accessibility: dialog labelled "Flag damage"; focus starts on the Flag damage button; reason options are a radio group; focus returns to the pick line on close.

## W14. Coming in a later round (Supervisor and Accountant)

```
+--------------------------------------------------------------+
| Mojud                         Nasima (Supervisor) [Sign out] |
|   Your screens are coming in a later round (h1)              |
|   You can sign in, but there is nothing to do here yet.      |
+--------------------------------------------------------------+
```

Accessibility: h1; `main` landmark; Sign out reachable by keyboard.

## Assumptions & Open Questions

- [assumption] The Flag damage button keeps its designed place at the bottom of the pick screen and acts on the selected line, which matches both the design and Q6.
- [assumption] Owners and Managers can also open the floor screens (My tasks, receiving, picking), as the PRD's role table allows; they are not in their side nav this round.
