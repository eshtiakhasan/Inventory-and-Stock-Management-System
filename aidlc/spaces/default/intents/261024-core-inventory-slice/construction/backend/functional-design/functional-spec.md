# Functional Specification — backend

Behaviour of the backend unit (U2 in `unit-of-work.md`; US1.3–US5.3 backend parts in `unit-of-work-story-map.md`), built from `requirements.md` (FR2–FR17), the components in `components.md`, the API in `contract-summary.md` (C1–C5) and this stage's answers Q1–Q7. Data shapes are in `entities.md`; decision logic in `rules.md`. It extends the walking skeleton's spec (`construction/walking-skeleton/functional-design/functional-spec.md`), whose request pipeline, sessions and errors still apply.

## Scope of This Unit's Checks

Every acceptance criterion of US1.3–US5.3 that the API can show is tested here through HTTP against a real database. The skeleton's deferred checks are also proved here:
- **AC1.1.4:** a record of another business is reported as not found, on every record endpoint.
- **AC1.2.3:** a deactivated user's sign-in is refused.

What only the screen can show (hidden controls, "Use max" buttons, pre-filled fields, confirm dialogs) is checked in the frontend unit.

## Permissions

### Changes (FR2.2, BR6.1, BR6.2, BR6.4)

| Action | Endpoints | Owner | Manager | Supervisor | Warehouse worker | Sales rep | Accountant |
|---|---|---|---|---|---|---|---|
| manage_org | warehouses, users | Yes | Yes (not Owners) | No | No | No | No |
| manage_catalogue | products, suppliers, opening stock, purchase orders (create, edit, send, cancel, close short) | Yes | Yes | No | No | No | No |
| floor | receiving, picking, damage | Yes | Yes | Assigned | Assigned | No | No |
| manage_dispatch | dispatch orders (create, edit, cancel) | Yes | Yes | No | No | Create in assigned warehouses; edit and cancel only orders they created | No |

### Reads (Q5, BR6.3)

| Read | Owner, Manager | Supervisor, Warehouse worker | Sales rep | Accountant |
|---|---|---|---|---|
| Warehouses | All | Assigned | Active | No |
| Users | All | No | No | No |
| Products (list, search, detail) | Yes | Yes | Yes | No |
| Suppliers | Yes | No | No | No |
| Available stock | Any warehouse | Assigned warehouses | Any warehouse | No |
| Purchase orders (list, detail) | Yes | No (receiving view only) | No | No |
| Receiving view | Any warehouse | Assigned | No | No |
| Dispatch orders (list, detail) | Yes | No (picking view only) | Yes, all | No |
| Picking view | Any warehouse | Assigned | No | No |
| Issues | Yes | No | No | No |
| My tasks | All warehouses | Assigned | No | No |

### Caller Context (contract C2, updated by this unit)

- **warehouseIds:** now filled from `user_warehouses`. For an Owner, Manager or Accountant it lists every active warehouse of the business.
- **authorize:** `authorize(caller, action, warehouseId?)` applies the tables above.
- **Sales rep ownership:** the check that a Sales rep edits only their own orders needs the order, so it is a separate check inside Dispatch (BR6.4).

## Module Interfaces (additions to contracts C3 and C5)

Every cross-module question goes through the owning module's interface; no module reads another's tables (C5). These functions are additive to the interfaces in `contract-summary.md` and are added to the in-process contract in the same commit as their code. Each takes the caller's transaction when one is open.

| Owner | Function | Used by | Purpose |
|---|---|---|---|
| StockLedger | `move(tx, …)`, `available(…)`, `warehouseHoldsStock(…)` | as in C3 | as in C3 |
| StockLedger | `recordOpeningStock(tx, caller, productId, warehouseId, quantityBase, unitCost)` | Catalogue | BR9.7 |
| StockLedger | `openingStockFor(businessId, productId)` | Catalogue | product's opening-stock list |
| StockLedger | `productHasMovements(businessId, productId)` | Catalogue | BR9.4 |
| StockLedger | `latestCost(tx, businessId, productId, warehouseId)` | StockLedger itself | BR10.5 |
| Purchasing | `hasOpenOrders(tx, businessId, warehouseId)` | warehouse lifecycle | BR7.3 |
| Dispatch | `hasOpenOrders(tx, businessId, warehouseId)` | warehouse lifecycle | BR7.3 |
| Purchasing | `receivingWork(businessId, warehouseIds, today)` | MyTasks | BR17.2 |
| Dispatch | `pickingWork(businessId, warehouseIds, today)` | MyTasks | BR17.2 |
| IdentityAccess | `deactivateWarehouse(tx, caller, warehouseId)`, `countUsersOnlyIn(tx, businessId, warehouseId)` | warehouse lifecycle | BR7.3 |

**Warehouse lifecycle without a cycle.** IdentityAccess must not call Purchasing or Dispatch, because both depend on it. So the warehouse route (`PATCH /warehouses/{id}`) is handled by a small application service, `warehouseLifecycle`, in the platform composition layer above the modules.
- It calls IdentityAccess (to lock the row and authorize), StockLedger, Purchasing and Dispatch, then `IdentityAccess.deactivateWarehouse`.
- The module dependency graph therefore keeps IdentityAccess depending only on StockLedger.
- The new composition service depends on all four.

## Workflows

Every stock-changing workflow runs in one database transaction:
1. The idempotency record is inserted first (BR11.1).
2. Rows are locked in the fixed order of BR10.4.
3. All movements, Issues, line changes and the stored response are written.
4. The transaction commits.

Any refusal rolls everything back.

### WF6 Manage warehouses (US1.3)

1. **Create.** `POST /warehouses {name}` validates the name, checks BR7.2 and the 3-active limit (BR7.1, with the business's warehouse rows locked), and returns 201 with the warehouse.
2. **Rename, deactivate, reactivate.** `PATCH /warehouses/{id} {name?, active?}` is handled by the `warehouseLifecycle` composition service (see Module Interfaces):
   - A rename checks BR7.2.
   - Deactivation locks the warehouse row and checks BR7.3: stock, then open purchase orders, then open dispatch orders, then users who would be left with no active warehouse. It then removes the warehouse from users' assignments.
   - Reactivation checks BR7.1 and BR7.2.
   - Returns 200.

### WF7 Manage users (US1.3)

1. **Create.** `POST /users {name, phone, role, warehouseIds, password}` checks BR8.1 and BR8.2, hashes the password (BR1.5), and returns 201. Neither the password nor its hash is ever returned.
2. **Change.** `PATCH /users/{id} {name?, role?, warehouseIds?, password?, active?}` checks:
   - BR8.2 (Managers cannot change Owners)
   - BR8.3 (last active Owner, with the owner rows locked)
   - BR8.4 (deactivation ends sessions)
   - BR8.5 (a password change ends other sessions)

   A role that covers all warehouses clears that user's assignments. Returns 200.
3. **List.** `GET /users` lists the business's users, Owner and Manager only.

### WF8 Manage products and suppliers (US1.4)

1. **Products.** `POST /products` and `PATCH /products/{id}` check BR9.1–BR9.4 and return the product, including its opening stock per warehouse.
2. **Product reads.**
   - `GET /products?search=` applies BR9.5.
   - Without `search`, it lists all products by name, 50 per page, using `page`.
   - `GET /products/{id}` returns one product.
3. **Suppliers.** `POST /suppliers` and `PATCH /suppliers/{id} {…, archived?}` handle create, edit, archive and unarchive (BR9.6). `GET /suppliers?includeArchived=` lists them.

### WF9 Enter opening stock (US2.1)

1. `POST /products/{id}/opening-stock {warehouseId, quantity, unitCostBase}` checks:
   - the Idempotency-Key, `manage_catalogue`, and that the warehouse is active (BR7.4);
   - the quantity (BR18.1) and the cost.
2. It refuses opening stock that already exists for the product and warehouse (BR9.7).
3. It moves the quantity from external to available, with reason `opening_balance` and source `opening_stock`, and sets StockCost.
4. It returns 201 with the product's opening-stock entry and the quantity view.

### WF10 Purchase orders (US2.2)

1. **Create.** `POST /purchase-orders {supplierId, warehouseId, expectedDate, lines[{productId, quantity, cost: {amount, per: carton|piece}}]}` needs an Idempotency-Key (BR11.1). It checks BR12.1, takes the next number from PurchaseOrderCounter (row locked), and saves the order as `draft`. Returns 201.
2. **Edit.** `PATCH /purchase-orders/{id}` replaces the supplier, warehouse, date and lines, under BR12.3 (only before receiving starts).
3. **Send.** `POST /purchase-orders/{id}/send` changes `draft` to `sent`. The order then shows in My tasks.
4. **Cancel.** `POST /purchase-orders/{id}/cancel` is allowed under BR12.2 and BR12.3. The order becomes `cancelled`, with finishedAt set.
5. **Close short.** `POST /purchase-orders/{id}/close-short` applies BR12.4 and is additive under v1.
6. **Reads.**
   - `GET /purchase-orders?status=&warehouseId=` lists orders, newest first.
   - `GET /purchase-orders/{id}` returns the full order, including ordered and received quantities. This detail is Owner and Manager only, so workers never see ordered quantities.

### WF11 Receive a delivery (US3.2)

1. **Open the receiving view.** `GET /receiving/{purchaseOrderId}` requires the order to be `sent` or `partly_received` and the caller to work in its warehouse (BR6.2). It returns the blind view (BR13.1, BR13.3): number, supplier name, warehouse name, and lines with product, name, counted-this-delivery and status. It never includes ordered or remaining quantities.
2. **Save a line.** `POST /receiving/{id}/lines {productId, quantity}` applies BR13.2:
   - The first save opens the delivery's Receipt.
   - Two workers on the same order share the open Receipt; the purchase order row is locked.
   - The response is the updated blind view plus "Saved".
3. **Complete the delivery.** `POST /receiving/{id}/complete` applies BR13.4. It is idempotent and the response is only `{message: "Receipt saved"}`.
4. **Choose a product.** The client finds products with `GET /products?search=` (Type code, FR13.1). A product not on the order is refused when saved, with "Not on this order" (BR13.2).

### WF12 Dispatch orders (US4.1)

1. **Create.** `POST /dispatch-orders {customerName, warehouseId, neededBy, lines[{productId, quantity}]}` reserves every line or none (BR14.1). It takes the number from DispatchOrderCounter and returns 201 with the order.
2. **Edit.** `PATCH /dispatch-orders/{id}` allows changes under BR14.2 and BR6.4, and returns 200 with the order.
3. **Cancel.** `POST /dispatch-orders/{id}/cancel` releases the reservations (BR14.3).
4. **Reads.**
   - `GET /dispatch-orders?status=&warehouseId=` lists orders, newest first.
   - `GET /dispatch-orders/{id}` returns the order with ordered, reserved, picked, short and damaged quantities per line.
5. **Available stock.** `GET /stock/available?productId=&warehouseId=` returns the quantity view (BR6.3), for the order form.

### WF13 Pick and confirm dispatch (US5.1)

1. **Open the picking view.** `GET /picking/{dispatchOrderId}` requires the order to be `open` or `part_dispatched` and the caller to work in its warehouse. Each line has its product, ordered, picked, short and damaged quantities, and `leftToPick`, which equals reserved. It is additive under v1.
2. **Confirm a line.** `POST /picking/{id}/lines/{lineId}/confirm {quantity}` applies BR15.1 and returns the updated line.
3. **Confirm dispatch.** `POST /picking/{id}/confirm-dispatch` applies BR15.2 and returns `{status, shortLines}`.

### WF14 Flag damage (US5.2)

1. `POST /picking/{id}/lines/{lineId}/damage {quantity, reason, note?}` applies BR16.1 and BR16.2, all in one transaction.
2. It returns the updated line and `{replacementReserved, shortBy}`.

### WF15 Issues and My tasks (US5.3, US3.1)

1. **Issues.** `GET /issues` returns Issues newest first, Owner and Manager only (BR17.1).
2. **My tasks.** `GET /my-tasks` returns the tasks (BR17.2). Each task has kind, id, title, subtitle, status and neededBy:
   - for receiving: title "Receive PO-12", subtitle "{supplier} · {warehouse}";
   - for picking: title "Pick DO-31", subtitle "{customer} · {warehouse}".

## State Machines

### Purchase order

| From | Event | Guard | To |
|---|---|---|---|
| (none) | create | BR12.1 | draft |
| draft | send | — | sent |
| draft, sent | edit | no receipt line | same |
| draft, sent | cancel | no receipt line | cancelled |
| sent, partly_received | save line | BR13.2 | same (status changes only at delivery completion; the saved line itself blocks edit and cancel, BR12.3) |
| sent, partly_received | complete delivery | open receipt with ≥ 1 line | received if all lines fully received, else partly_received |
| partly_received | close short | no open receipt | received (closedShort) |

Received and cancelled are terminal.

### Dispatch order

| From | Event | Guard | To |
|---|---|---|---|
| (none) | create | BR14.1 | open |
| open, part_dispatched | edit | BR14.2 | same |
| open, part_dispatched | confirm line, flag damage | BR15.1, BR16.1 | same |
| open, part_dispatched | confirm dispatch | some picked overall, and either picked since the last confirm or the status would change (BR15.2) | dispatched if no reserved or short left, else part_dispatched |
| open, part_dispatched | cancel | BR14.3 | cancelled if nothing ever picked, else dispatched |

Dispatched and cancelled are terminal.

### Dispatch line quantities (invariant: reserved + picked + short + cancelled = ordered)

| Event | ordered | reserved | picked | short | cancelled | damaged | Movements |
|---|---|---|---|---|---|---|---|
| create (q) | q | q | 0 | 0 | 0 | 0 | available → reserved q |
| confirm pick (p ≤ reserved) | — | −p | +p | — | — | — | reserved → external p |
| flag damage (d ≤ reserved), replacement r = min(d, Available) | — | −d + r | — | +(d − r) | — | +d | reserved → damaged d; available → reserved r |
| edit line to n (n ≥ picked) | n | n − picked | — | 0 | — | — | the difference moves between available and reserved |
| cancel | — | 0 | — | 0 | + (reserved + short) | — | reserved → available |

Each row keeps the invariant: for example, cancel moves the reserved and short quantities into cancelled, so a line ordered 20 with 8 picked and 12 reserved ends as picked 8 and cancelled 12.

## Worked Examples (from the stories)

| Story check | Before | Action | After |
|---|---|---|---|
| AC3.2.5 | ordered 100 ctn, received 0 | save 92 ctn, then complete | Available +92; Shortfall Issue 8 ctn; partly_received; response "Receipt saved" |
| Q1 second delivery | ordered 100, received 92, shortfallRaised 8 | save 5, then complete | received 97; missing 3 is below the 8 already raised, so no new Issue (the Shortfall of 8 stays as history); partly_received |
| Q1 over on a later delivery | ordered 100, received 97 | save 6, then complete | received 103; Over-delivery Issue 3; received |
| Q3 cancel the rest | line ordered 20, picked 8, reserved 12 | cancel | Available +12; line picked 8, cancelled 12; order dispatched |
| AC3.2.6 | ordered 100 | save 105, then complete | Available +105; Over-delivery Issue 5; received |
| AC4.1.6 | ordered 20, reserved 20, Available 5 | edit to 25, then to 26 | reserved 25, Available 0; then refused with max 25 ctn |
| AC5.2.3 | reserved 20, Available 5 | flag 1 ctn damaged | Damaged 1, line reserved 20, Available 4, Damage flag Issue |
| AC5.2.4 | reserved 20, Available 0 | flag 1 ctn | line reserved 19, short 1, Damage flag and Dispatch short Issues |
| AC5.1.4 | reserved 20, picked 12 | confirm dispatch | part_dispatched; 8 stay Reserved; shortLines 1 |

## Rules Summary (derived from rules.md)

| Group | Rules |
|---|---|
| Permissions | BR6.1–BR6.5 |
| Warehouses and users | BR7.1–BR7.4, BR8.1–BR8.5 |
| Catalogue and opening stock | BR9.1–BR9.7 |
| Stock ledger and apply once | BR10.1–BR10.6, BR11.1 |
| Quantities | BR18.1–BR18.2 |
| Purchasing and receiving | BR12.1–BR12.4, BR13.1–BR13.4 |
| Dispatch, picking, damage | BR14.1–BR14.3, BR15.1–BR15.2, BR16.1–BR16.2 |
| Issues and My tasks | BR17.1–BR17.2 |

## API Additions (contract C1, additive under v1)

The OpenAPI document and `@mojud/contracts` are updated with these in the same commit as their code.

| Endpoint | Request | Success | Other statuses |
|---|---|---|---|
| `GET /products?search=&page=` | — | 200 `{items: Product[], nextPage: number \| null}`; with `search`, at most 20 items and `nextPage` null | 403 |
| `POST /purchase-orders` (now `x-idempotent`, needs `Idempotency-Key`, so a retry never creates a second order or uses up a number) | `{supplierId, warehouseId, expectedDate, lines: [{productId, quantity: QuantityInput, cost: {amount: decimal string, per: "carton" \| "piece"}}]}` | 201 PurchaseOrder | 400, 403, 409 IDEMPOTENCY_KEY_REUSED, 422 RULE_REFUSED |
| `PATCH /purchase-orders/{id}` | same body as create, every field optional; `lines` replaces all lines when sent | 200 PurchaseOrder | 409 STATE_CONFLICT |
| `POST /purchase-orders/{id}/close-short` | — | 200 PurchaseOrder | 409 STATE_CONFLICT |
| `PurchaseOrder.lines[]` | — | adds `received: QuantityView` (Owner and Manager only) | — |
| `GET /receiving/{id}` | — | 200 ReceivingView (unchanged) | 404 other business or unknown; 409 STATE_CONFLICT when not sent or partly_received; 403 not assigned |
| `GET /picking/{dispatchOrderId}` | — | 200 PickingView: `{dispatchOrderId, number, customerName, warehouseName, neededBy, status, lines: [{lineId, productId, productName, sku, packUnitName, packSize, baseUnitName, ordered, picked, short, damaged, leftToPick: QuantityView}]}` | 404; 409 STATE_CONFLICT when not open or part_dispatched; 403 not assigned |
| `POST /picking/{id}/lines/{lineId}/confirm` | `{quantity}` | 200 the PickingView line | 409 INSUFFICIENT_STOCK with max; 409 STATE_CONFLICT |
| `POST /picking/{id}/lines/{lineId}/damage` | `{quantity, reason, note?}` | 200 `{line: PickingView line, replacementReserved: QuantityView, shortBy: QuantityView}` | 409 INSUFFICIENT_STOCK with max |
| `POST /picking/{id}/confirm-dispatch` | — | 200 `{status, shortLines: integer}` | 409 STATE_CONFLICT |
| `PATCH /dispatch-orders/{id}` | `{customerName?, neededBy?, lines?: [{lineId?, productId?, quantity?: QuantityInput, remove?: true}]}` | 200 DispatchOrder | 409, 422 |
| `DispatchOrder.lines[]` | — | adds `cancelled: QuantityView` | — |

## Error Catalogue (additions to the skeleton's)

| Code | Status | When | Message (example) |
|---|---|---|---|
| FORBIDDEN | 403 | BR6.1–BR6.4, BR8.2 | "You don't have permission to do that." |
| NOT_FOUND | 404 | BR6.5 | "Not found" |
| DUPLICATE | 409 | BR7.2, BR8.1, BR9.1, BR9.2 | "This SKU is already used." |
| STATE_CONFLICT | 409 | BR7.3, BR9.4, BR9.7, BR12.2–BR12.4, BR13.4, BR14.3, BR15.2 | the rule, e.g. "Receiving has started on this order." |
| INSUFFICIENT_STOCK | 409 | BR10.3, BR14.1, BR14.2, BR15.1, BR16.1 | "Only 32 ctn available. Max 32 ctn.", with `max` |
| IDEMPOTENCY_KEY_REUSED | 409 | BR11.1 | "This action was already sent with different details." |
| LIMIT_REACHED | 422 | BR7.1 | "You can have at most 3 active warehouses." |
| RULE_REFUSED | 422 | BR7.4, BR8.3, BR9.6, BR14.2 | the rule, e.g. "A business needs at least one active Owner." |
| NOT_ON_ORDER | 422 | BR13.2 | "Not on this order" |
| ALREADY_COUNTED | 422 | BR13.2 | "Already counted in this delivery." |

These are additive codes under contract v1:
- RULE_REFUSED, NOT_ON_ORDER and ALREADY_COUNTED;
- the new endpoints `POST /purchase-orders/{id}/close-short` and `GET /picking/{dispatchOrderId}`;
- the query parameters `page`, `status`, `warehouseId` and `includeArchived`.

## Assumptions & Open Questions

None.
