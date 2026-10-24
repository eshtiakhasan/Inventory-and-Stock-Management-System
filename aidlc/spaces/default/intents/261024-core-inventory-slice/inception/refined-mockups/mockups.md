# Refined Mockups — Mojud core slice

Written mid-fidelity mockups (Q2), one per screen, refining `ideation/rough-mockups/wireframes.md` (W1–W14) and `user-flow.md` against the user stories (`inception/user-stories/stories.md`), the requirements (`requirements.md`) and the team practices (`team-practices.md`). Component names in `code` are keys from your design system (`design-process/D-Design-System/00-design-system.md`); new components are marked **(new)** and specified in `interaction-spec.md`.

## Layout Frame (all signed-in screens)

- Designed at 1280px wide; works from 1024px up; content column max 1200px, centred, with `{spacing.gutter-desktop}` (24px) gutters (Q3).
- `app-bar` across the top (`{spacing.app-bar-height}`): screen title (`headline`), signed-in name and role (`meta`), online status as icon plus "Online", theme switch **(new: `theme-switch`)**, Sign out (`button-secondary`).
- `side-nav` on the left (240px) with the role's items (wireframes App Shell table); current item has `aria-current="page"`.
- Toasts (`confirmation-toast`) appear top-right under the app bar, never covering the focused element.
- No `scan-bar`, `bottom-tab-bar`, `offline-banner` or `sync-status-chip` this round.

## M1. Sign up (W1; US1.1)

- Centered card 480px wide on `surface-alt` page.
- `input-field` ×4: Business name, Your name, Phone number (hint "You sign in with this number."), Password (hint "At least 8 characters.", Show/Hide toggle).
- `button-primary` "Create business" (full card width); link "Already have an account? Sign in".
- States: inline `refusal-message` under the failing field; duplicate phone message under Phone; `button-primary` shows a spinner while saving; server error as a `form-error-summary` at the top of the card.
- Success → M3 Setup home.

## M2. Sign in (W2; US1.2)

- Same card frame as M1. `input-field` ×2, `button-primary` "Sign in", link "New business? Create one".
- Error: `form-error-summary` "Sign-in details are not correct." (never names a field); "This account is deactivated." in the same place.
- Success → role home (FR2.3).

## M3. Setup home (W3; Owner, Manager)

- `headline` "Set up {business name}".
- Grid of six **(new) `setup-card`** tiles, 3 columns × 2 rows: Warehouses, Users, Products, Suppliers, Purchase orders, Dispatch orders. Each shows a count line ("2 active", "None yet") and is one link.
- Under the grid, an "Issues" link card (Owner, Manager) to M14 with the open count.
- First use: a `setup-checklist` above the grid lists the suggested order (Warehouses → Products with opening stock → Suppliers → Users → Purchase orders), each step ticked when done.

## M4. Warehouses (W4; US1.3)

- `data-table`: Name, Status, Actions (Rename, Deactivate). Footer `meta`: "2 of 3 active warehouses".
- `button-primary` "Add warehouse" top-right opens the **(new) `side-panel`** (400px, right edge) with one `input-field` Name and Save / Cancel.
- Deactivate opens `confirmation-dialog` ("Deactivate Gazipur? Staff can no longer record work there."), confirm uses `button-danger`.
- Refusals ("You can have at most 3 active warehouses.", "This warehouse still holds stock.") shown as `refusal-message` in the panel or dialog.

## M5. Users (W5; US1.3)

- `data-table`: Name, Phone, Role, Warehouses, Status, Actions (Edit, Deactivate).
- `side-panel` form: Name, Phone (`input-field`), Role (`combobox` of six roles), Assigned warehouses (`choice-chip` multi-select; hidden and shown as "All warehouses" for Owner, Manager, Accountant), Password (`input-field`, "Set by you; tell the user").
- Managers do not see Owners' Edit/Deactivate actions; the last active Owner's Deactivate is disabled with its reason (`button-disabled`).

## M6. Products with opening stock (W6; US1.4, US2.1)

- `data-table`: Name, SKU, Units ("1 ctn = 4 bag"), Barcodes, Opening stock (recorded per warehouse, as text).
- `side-panel` (560px for this form) with three `fieldset` groups:
  1. Product: Name, SKU, Category.
  2. Units: Base unit, Pack unit, Per pack; Base barcode, Pack barcode.
  3. Opening stock: one row per active warehouse with `quantity-entry` (cartons + pieces) and Unit cost per base unit. A row already recorded shows read-only "10 ctn + 2 bag · recorded {date}".
- Save validates all groups; duplicate SKU/barcode and pack-size errors appear under their fields.

## M7. Suppliers (W7; US1.4)

- `data-table`: Name, Contact, Phone, Address, Status, Actions (Edit, Archive).
- `side-panel` with four `input-field`s. Archive opens `confirmation-dialog`.

## M8. Purchase orders (W8; US2.2)

- List: `data-table` with No., Supplier, Warehouse, Expected, Status (`task-status-tag` styling: Draft, Sent, Partly received, Received, Cancelled). Row opens detail.
- Create / edit page (not a panel: it holds a line list): Supplier (`combobox`), Warehouse (`combobox`), Expected date (`input-field` type date); `line-item-editor`: Product (`combobox` with search), Quantity (`quantity-entry`), Cost and unit selector ("per ctn" / "per bag"), Add line; lines listed with Remove.
- Footer actions: `button-secondary` "Save as draft", `button-primary` "Send".
- Detail view: header facts, lines with ordered quantity (this desk view is not blind), status; Edit and Cancel shown only while nothing is received; otherwise a `meta` note "Receiving has started; this order can no longer be changed."

## M9. Dispatch orders (W9; US4.1; Sales rep home)

- List: `data-table` with No., Customer, Warehouse, Needed by, Status (Open, Part-dispatched, Dispatched, Cancelled).
- Create / edit page: Customer name (`input-field`), Warehouse (`combobox`), Needed by (date); `line-item-editor` with Product search showing "Available: 32 ctn" under the field, `quantity-entry` with inline max; `refusal-message` "Only 32 ctn available. Max 32 ctn." with `button-secondary` "Use max".
- `button-primary` "Save order" → toast "Saved" and return to the list.
- Detail: lines with reserved and picked quantities; Edit and Cancel (Cancel opens `confirmation-dialog` "Cancel order DO-31? 20 ctn go back to Available.").

## M10. My tasks (W10; US3.1; Warehouse worker home)

- `headline` "My tasks" with the warehouse names in `meta`.
- Vertical list of `task-card`s (max width 720px): Receive cards ("Receive · PO-12 · ACI Foods", "5 products") and Pick cards ("Pick · DO-31 · Rahman Store · needed 25 Oct", "8 / 20 ctn picked"), each with a `task-status-tag` (New, In progress, Done).
- Type code button (`button-secondary`, icon + "Type code") at the top-right of the list opens the **(new) `type-code-dialog`**; choosing a product opens the first open task that contains it, or says "No open task has this product".
- Empty: "All tasks done for today".

## M11. Receive purchase order (W11; US3.2)

- Matches `mockups/key-receiving.html` adapted to desktop: two columns at 1024px and up. Left (60%): line rows (product name, "counted 8 ctn" or "not counted yet"). Right (40%): the selected line's `quantity-entry` (cartons and pieces, empty by default) and `button-primary-floor` "Save line".
- Header: back link, "Receive PO-12" (`headline`), supplier and warehouse in `meta`, Type code button.
- Bottom of the left column: `button-primary` "Mark delivery complete" → `confirmation-dialog` "Finish this delivery? 3 of 5 lines counted. Lines with no count are saved as not received in this delivery." Initial focus on Go back.
- After saving a line: toast "Saved"; the line shows "counted 8 ctn" and becomes read-only (RA-Q1).
- Never displayed: ordered or remaining quantities.

## M12. Pick dispatch order (W12; US5.1)

- Matches `mockups/key-picking.html` adapted to desktop: left line list with progress "8 / 20 ctn" and status tags; right panel for the selected line with `quantity-entry` pre-filled with what is left, inline "Max 12 ctn", `button-primary-floor` "Confirm line".
- Under the right panel: `button-flag-damage` "Flag damage", disabled with "Select a line first" until a line is selected (US5.2).
- Line badges: `stock-state-pill` "Damaged, 1 ctn" and a "Short by 1 ctn" tag when a replacement could not be reserved.
- `button-primary` "Confirm dispatch" at the bottom of the list; when lines are short, `confirmation-dialog` "1 line is short. Short quantities stay Reserved."

## M13. Flag damage form (W13; US5.2)

- Desktop version of the `bottom-sheet`: a centred dialog 480px wide (focus-trapped) titled "Flag damage".
- Product (read-only text), `quantity-entry` pre-filled 1 ctn with inline "Max 3 ctn", Reason `choice-chip` group (damaged selected, expired, other), Note `input-field` (optional).
- `button-danger` "Flag damage" (saves), `button-secondary` "Close".
- Success toast "Flagged 1 ctn damaged"; focus returns to the line.

## M14. Issues list (US5.3; Owner, Manager)

- `data-table`, read-only: Type (with icon), Product, Warehouse, Quantity, Raised by, Age; newest first. No decision buttons; a `meta` note above the table: "Deciding issues comes in a later round."
- Empty: "No open issues."

## M15. Coming in a later round (W14; Supervisor, Accountant)

- `app-bar` with name and Sign out; centred `headline` "Your screens are coming in a later round" and `body` "You can sign in, but there is nothing to do here yet."

## Story Coverage

| Story | Screens |
|---|---|
| US1.1 | M1 |
| US1.2 | M2, layout frame, M15 |
| US1.3 | M4, M5 |
| US1.4 | M6, M7 |
| US2.1 | M6 |
| US2.2 | M8 |
| US3.1 | M10 |
| US3.2 | M11, `type-code-dialog` |
| US4.1 | M9 |
| US5.1 | M12 |
| US5.2 | M12, M13 |
| US5.3 | M14, M3 Issues link |

## Assumptions & Open Questions

None.
