# Business Rules — backend

Rules for the backend unit (U2 in `unit-of-work.md`), from `requirements.md` (FR2–FR17, NFR2–NFR4), `stories.md` (US1.3–US5.3), the components in `components.md`, the contract in `contract-summary.md` and this stage's answers Q1–Q7. Rules BR1–BR5 belong to the walking skeleton and still apply (`construction/walking-skeleton/functional-design/rules.md`). Error codes and statuses are in `functional-spec.md` > Error Catalogue.

```yaml
rules:
  # ---------- Permissions (IdentityAccess) ----------
  - id: BR6.1
    statement: Every change is checked against the FR2.2 role table on the server
    category: authorization
    applies_to: every non-GET endpoint
    trigger: request authenticated
    logic: authorize(caller, action, warehouseId) with action one of manage_org, manage_catalogue, floor, manage_dispatch; IF the role is not allowed for the action THEN refuse
    violation: 403 FORBIDDEN
    source: FR2.2
  - id: BR6.2
    statement: Floor work is limited to assigned warehouses for Supervisors and Warehouse workers
    category: authorization
    applies_to: receiving, picking, damage, My tasks
    trigger: floor action on a warehouse
    logic: Owners and Managers may act in every warehouse of the business; IF a Supervisor or Warehouse worker is not assigned to the order's warehouse THEN refuse
    violation: 403 FORBIDDEN
    source: FR2.2
  - id: BR6.3
    statement: Reads are limited by role (Q5)
    category: authorization
    applies_to: every GET endpoint
    trigger: read request
    logic: >
      Owner, Manager: every list and detail. Sales rep: products, suppliers none, warehouses (all active),
      Available stock in any warehouse, all dispatch orders (list and detail). Supervisor, Warehouse worker:
      products, warehouses they are assigned to, Available stock in assigned warehouses, the receiving view
      and picking view of orders in assigned warehouses, My tasks. Accountant: nothing beyond /auth/me.
      Everything else is refused
    violation: 403 FORBIDDEN
    source: Q5, FR2.2
  - id: BR6.4
    statement: A Sales rep edits and cancels only dispatch orders they created
    category: authorization
    applies_to: dispatch order edit and cancel
    trigger: edit or cancel by a Sales rep
    logic: IF caller.role is sales_rep AND order.createdBy is not caller.userId THEN refuse
    violation: 403 FORBIDDEN
    source: FR14.2
  - id: BR6.5
    statement: Records of another business do not exist for the caller
    category: authorization
    applies_to: every endpoint with an ID
    trigger: record looked up by ID
    logic: every lookup includes businessId; IF not found in the caller's business THEN not found (this proves AC1.1.4, deferred from the skeleton)
    violation: 404 NOT_FOUND
    source: FR1.3, NFR2, BR3.1

  # ---------- Warehouses ----------
  - id: BR7.1
    statement: At most 3 active warehouses per business
    category: constraint
    applies_to: warehouse create and reactivate
    trigger: a warehouse would become active
    logic: lock the business's warehouse rows; IF 3 are already active THEN refuse
    violation: 422 LIMIT_REACHED "You can have at most 3 active warehouses."
    source: FR4.1
  - id: BR7.2
    statement: Active warehouse names are unique in the business, ignoring case
    category: constraint
    applies_to: Warehouse.name
    trigger: create, rename, reactivate
    logic: IF another active warehouse has the same trimmed name ignoring case THEN refuse
    violation: 409 DUPLICATE field name
    source: FR4.1 (two active warehouses with the same name could not be told apart in any list or task)
  - id: BR7.3
    statement: A warehouse in use cannot be deactivated (Q7)
    category: constraint
    applies_to: warehouse deactivate
    trigger: deactivate
    logic: lock the warehouse row FOR UPDATE (BR10.4); IF StockLedger.warehouseHoldsStock OR Purchasing.hasOpenOrders (draft, sent, partly_received) OR Dispatch.hasOpenOrders (open, part_dispatched) OR an active Supervisor, Warehouse worker or Sales rep would be left with no active warehouse THEN refuse, naming which; ELSE deactivate and remove the warehouse from users' assignments (reactivation does not restore them). The checks run through the module interfaces in functional-spec.md > Module Interfaces
    violation: 409 STATE_CONFLICT "This warehouse still holds stock.", "This warehouse has open orders." or "Move these users to another warehouse first."
    source: FR4.1, Q7
  - id: BR7.4
    statement: Inactive warehouses cannot be used for new work
    category: constraint
    applies_to: opening stock, new purchase orders, new dispatch orders, user assignment
    trigger: warehouse chosen
    logic: IF the warehouse is inactive THEN refuse
    violation: 422 RULE_REFUSED field warehouseId "This warehouse is deactivated."
    source: FR4.1

  # ---------- Users ----------
  - id: BR8.1
    statement: Users are added with name, phone, role, warehouses and a password
    category: validation
    applies_to: user create
    trigger: create
    logic: name 1–100; phone per BR1.2 and unique across all businesses (BR1.3); password 8–128 (BR1.4); role one of six; Supervisor, Warehouse worker and Sales rep need at least one active assigned warehouse, on create and on every change (a change of role to one of these, or of warehouseIds, that leaves none is refused); Owner, Manager and Accountant get none (they cover all)
    violation: 400 VALIDATION_FAILED with field; 409 DUPLICATE field phone
    source: FR3.1, FR2.1
  - id: BR8.2
    statement: Managers cannot manage Owners
    category: authorization
    applies_to: user create and change
    trigger: a Manager acts
    logic: IF the target user is an Owner, OR the new role is owner THEN refuse
    violation: 403 FORBIDDEN
    source: FR3.2
  - id: BR8.3
    statement: The last active Owner is protected
    category: constraint
    applies_to: user change
    trigger: deactivate or change role of an Owner
    logic: lock the business's owner rows; IF the target is the only active Owner THEN refuse
    violation: 422 RULE_REFUSED "A business needs at least one active Owner."
    source: FR3.2, FR3.3
  - id: BR8.4
    statement: Deactivating a user ends their sessions at once
    category: policy
    applies_to: user deactivate
    trigger: active set to false
    logic: delete all the user's sessions in the same transaction; their next request gets SESSION_ENDED (BR2.6); their past movements keep their name
    violation: not applicable
    source: FR3.3, AC1.3.6
  - id: BR8.5
    statement: Changing a password keeps the user signed in only on the session that made the change
    category: policy
    applies_to: user change with a new password
    trigger: password changed
    logic: hash the new password (BR1.5); delete the target user's sessions except the caller's own current session
    violation: not applicable
    source: NFR1

  # ---------- Catalogue ----------
  - id: BR9.1
    statement: SKU is unique in the business, ignoring case
    category: constraint
    applies_to: Product.sku
    trigger: create, edit
    logic: unique index on (businessId, lower(sku)); a violation is mapped to the error
    violation: 409 DUPLICATE field sku
    source: FR5.1
  - id: BR9.2
    statement: A barcode belongs to at most one product
    category: constraint
    applies_to: Product.baseBarcode, Product.packBarcode
    trigger: create, edit
    logic: IF the value is already any product's base or pack barcode in the business, or the same product uses it for both THEN refuse
    violation: 409 DUPLICATE field baseBarcode or packBarcode
    source: FR5.1
  - id: BR9.3
    statement: Pack size is a whole number of 2 or more, given together with a pack unit
    category: validation
    applies_to: Product.packSize
    trigger: create, edit
    logic: IF packUnitName is given without packSize, or packSize without packUnitName, or packSize < 2 or not whole THEN refuse
    violation: 400 VALIDATION_FAILED field packSize "Must be a whole number of 2 or more."
    source: FR5.1, AC1.4.4
  - id: BR9.4
    statement: Units cannot change once the product has stock movements
    category: constraint
    applies_to: product edit
    trigger: baseUnitName, packUnitName or packSize changed
    logic: IF StockLedger.productHasMovements(productId) THEN refuse (stored base quantities would change meaning)
    violation: 409 STATE_CONFLICT "Units can't change after stock is recorded."
    source: FR9.1, FR8.3
  - id: BR9.5
    statement: Product search matches name, SKU or barcode, ignoring case
    category: policy
    applies_to: GET /products?search=
    trigger: search text of 1 or more characters
    logic: name contains the text OR sku starts with it OR a barcode starts with it, ignoring case; at most 20 results, exact SKU or barcode matches first, then by name
    violation: not applicable
    source: FR5.2, FR13.1
  - id: BR9.6
    statement: Archived suppliers cannot be used on new purchase orders
    category: constraint
    applies_to: purchase order create and supplier change on edit
    trigger: supplier chosen
    logic: IF supplier.archived THEN refuse; archiving does not change existing orders; a supplier can be unarchived
    violation: 422 RULE_REFUSED field supplierId "This supplier is archived."
    source: FR6.1, AC1.4.6
  - id: BR9.7
    statement: Opening stock is entered once per product and warehouse
    category: constraint
    applies_to: opening stock
    trigger: opening stock submitted
    logic: quantity > 0 (BR18.1); unitCost decimal 0 or more with at most 4 places; Catalogue calls StockLedger.recordOpeningStock, which refuses IF a movement with reason opening_balance exists for the product and warehouse (also a unique partial index on stock_movements), ELSE moves external → available with reason opening_balance and sets StockCost; the product's opening-stock list comes from StockLedger.openingStockFor(productId)
    violation: 409 STATE_CONFLICT "Opening stock is already recorded for this warehouse."
    source: FR7.1

  # ---------- Stock ledger ----------
  - id: BR10.1
    statement: Movements are insert-only
    category: constraint
    applies_to: StockMovement
    trigger: always
    logic: no update or delete exists in code or API; the database role used by the app has no UPDATE or DELETE grant on stock_movements, and a trigger rejects both
    violation: not applicable (operation does not exist)
    source: FR8.2, AC2.1.3
  - id: BR10.2
    statement: Balances always equal the sum of movements
    category: constraint
    applies_to: StockBalance
    trigger: every move
    logic: in the same transaction as each movement, subtract from the from-state balance and add to the to-state balance (external has no balance); a test recomputes balances from movements. The app's runtime database role has no UPDATE or DELETE on stock_movements (BR10.1); tests reset data with TRUNCATE as the table owner (the migration role), which the trigger does not block
    violation: not applicable
    source: FR8.3, AC2.1.4
  - id: BR10.3
    statement: No balance ever goes below zero, and the refusal states the maximum
    category: constraint
    applies_to: every move out of available, reserved or damaged
    trigger: move
    logic: lock the balance row (SELECT … FOR UPDATE); IF quantity > balance THEN refuse with max = balance shown in the entry's units; a database check (quantity >= 0) is the last line of defence
    violation: 409 INSUFFICIENT_STOCK "Only {max} available. Max {max}." with max
    source: FR8.4, FR8.6, AC4.1.2, AC4.1.3
  - id: BR10.4
    statement: Concurrent requests lock in one fixed order
    category: policy
    applies_to: every stock-changing request
    trigger: transaction start
    logic: >
      Each workflow first computes the full set of balance rows it may touch (for damage: the line's product at the
      warehouse in available, reserved and damaged). Then, in this order: (1) insert the idempotency record (BR11.1);
      (2) lock the warehouse row, FOR SHARE when creating or changing orders or stock there, FOR UPDATE when
      deactivating it; (3) lock the parent order row FOR UPDATE if any; (4) INSERT the needed balance rows with
      quantity 0 ON CONFLICT DO NOTHING, sorted by productId, then warehouseId, then state in the order available,
      reserved, damaged; (5) SELECT those rows FOR UPDATE in the same sorted order; only then move. Nothing is locked
      in any other order, so simultaneous requests wait instead of deadlocking
    violation: not applicable
    source: FR8.6, NFR3
  - id: BR10.5
    statement: Every movement carries a unit cost (Q6)
    category: policy
    applies_to: StockMovement.unitCost
    trigger: move
    logic: opening stock uses the entered cost; receiving uses the purchase order line's cost; both update StockCost for the product and warehouse; all other moves use the StockCost value
    violation: not applicable
    source: FR8.1, Q6
  - id: BR10.6
    statement: Every movement records who, when, why and from what
    category: policy
    applies_to: StockMovement
    trigger: move
    logic: userId, serverTime (database now()), reason and source type and ID are required columns
    violation: not applicable
    source: FR8.1, NFR4

  # ---------- Apply once ----------
  - id: BR11.1
    statement: Every stock-changing request needs an Idempotency-Key and is applied once
    category: policy
    applies_to: endpoints marked x-idempotent in contract C1
    trigger: request received
    logic: >
      missing or non-UUID key → 400. The key belongs to (businessId, userId): another user's identical key is a
      different action. First statement in the transaction: INSERT the record (response columns empty) ON CONFLICT
      DO NOTHING RETURNING. If a row came back, this request is first: do the work, then UPDATE the record with the
      response status and body, then commit. If no row came back, SELECT the record FOR UPDATE (this waits until a
      running first request commits or rolls back): if it is now absent (the first rolled back), retry the INSERT
      once; if its hash differs, refuse; otherwise return its stored status and body with header
      Idempotent-Replay: true and change nothing. A request that fails rolls back and stores nothing, so the same
      key can be retried
    violation: 400 VALIDATION_FAILED field Idempotency-Key; 409 IDEMPOTENCY_KEY_REUSED
    source: FR8.5, AC3.2.4, AC5.1.5

  # ---------- Quantities ----------
  - id: BR18.1
    statement: Quantities are entered as cartons and pieces and stored in base units
    category: validation
    applies_to: every quantity input
    trigger: quantity received
    logic: cartons and pieces are whole numbers 0 or more, at most 1,000,000 each; IF the product has no pack unit AND cartons > 0 THEN refuse; base = cartons × packSize + pieces; IF base = 0 THEN refuse
    violation: 400 VALIDATION_FAILED field quantity
    source: FR9.1
  - id: BR18.2
    statement: Quantities are shown as cartons plus leftover pieces
    category: policy
    applies_to: every QuantityView
    trigger: response built
    logic: cartons = floor(base / packSize), pieces = base mod packSize; display "{c} {packUnit} + {p} {baseUnit}", dropping a zero part ("3 ctn", "5 pcs"), "0 {baseUnit}" for zero; no pack unit → "{base} {baseUnit}"
    violation: not applicable
    source: FR9.2

  # ---------- Purchasing ----------
  - id: BR12.1
    statement: A purchase order has one supplier, one warehouse and one line per product
    category: validation
    applies_to: purchase order create and edit
    trigger: save
    logic: supplier not archived (BR9.6); warehouse active (BR7.4); expectedDate required; 1–100 lines; each product once; quantity per BR18.1; cost entered per carton or per piece, stored per piece = per-carton cost ÷ packSize rounded to 4 places
    violation: 400 VALIDATION_FAILED; 422 RULE_REFUSED
    source: FR10.1, AC2.2.2
  - id: BR12.2
    statement: Status flow is Draft → Sent → Partly received → Received, or Cancelled
    category: state
    applies_to: PurchaseOrder.status
    trigger: send, receive, complete, close short, cancel
    logic: send only from draft; receiving only on sent or partly_received; cancel only from draft or sent with no saved receipt line; close short only from partly_received with no open receipt
    violation: 409 STATE_CONFLICT
    source: FR10.2
  - id: BR12.3
    statement: Orders can be edited or cancelled only before receiving starts
    category: state
    applies_to: purchase order edit and cancel
    trigger: edit or cancel
    logic: IF status is not draft or sent, OR any receipt line exists THEN refuse
    violation: 409 STATE_CONFLICT "Receiving has started on this order."
    source: FR10.3, AC2.2.4
  - id: BR12.4
    statement: Close short ends a Partly received order (Q2)
    category: state
    applies_to: POST /purchase-orders/{id}/close-short
    trigger: Owner or Manager closes
    logic: status partly_received and no open receipt → status received, closedShort true, finishedAt now; no movements; existing Issues stay
    violation: 409 STATE_CONFLICT
    source: Q2

  # ---------- Receiving ----------
  - id: BR13.1
    statement: The receiving view never contains ordered, remaining or expected quantities
    category: policy
    applies_to: GET /receiving/{id} and every receiving response
    trigger: response built
    logic: build the response from a dedicated type with only product, product name, counted-this-delivery and status; a test asserts the serialized body contains none of the ordered numbers or field names
    violation: not applicable
    source: FR12.1, AC3.2.1
  - id: BR13.2
    statement: Saving a counted line records it into Available at once and is final
    category: policy
    applies_to: POST /receiving/{id}/lines
    trigger: save line
    logic: order sent or partly_received and caller may work there (BR6.2); open the delivery's receipt if none is open; product must be on the order; one line per product per delivery; quantity per BR18.1; move external → available, reason received, cost = line's unitCostBase; add to line.receivedQtyBase; update StockCost
    violation: 422 NOT_ON_ORDER "Not on this order"; 422 ALREADY_COUNTED "Already counted in this delivery."
    source: FR12.2, FR12.3, AC3.2.2, AC3.2.3
  - id: BR13.3
    statement: Each delivery is counted blind from zero
    category: policy
    applies_to: receiving view
    trigger: view built
    logic: countedThisDelivery shows only lines saved in the open receipt; earlier deliveries are not shown
    violation: not applicable
    source: FR12.1, contract C1 open question
  - id: BR13.4
    statement: Mark delivery complete compares running totals with ordered, per line (Q1)
    category: policy
    applies_to: POST /receiving/{id}/complete
    trigger: complete
    logic: >
      an open receipt with at least one saved line must exist; close it; for each order line:
      missing = max(0, ordered − received); newShortfall = missing − shortfallRaised; IF > 0 raise a Shortfall
      Issue for it and add to shortfallRaised (because received only grows, a line's Shortfall is raised once, at
      its first short completion, and is not reduced when later deliveries close the gap: it stays as history);
      over = max(0, received − ordered); newOver = over − overRaised;
      IF > 0 raise an Over-delivery Issue and add to overRaised; then status = received IF every line has
      received ≥ ordered ELSE partly_received; no movement is recorded again; the response is "Receipt saved"
      with no quantities
    violation: 409 STATE_CONFLICT "Count at least one line first."
    source: FR12.4, Q1, AC3.2.5–AC3.2.7

  # ---------- Dispatch orders ----------
  - id: BR14.1
    statement: Saving a dispatch order reserves every line, never more than Available
    category: constraint
    applies_to: POST /dispatch-orders
    trigger: create
    logic: customerName 1–100; warehouse active, and for a Sales rep one of their assigned warehouses; neededBy required; 1–100 lines, each product once, quantity per BR18.1; move available → reserved per line (reason reserved, source dispatch_order) in lock order (BR10.4); IF any line exceeds Available the whole order is refused with that line's max and nothing is reserved
    violation: 409 INSUFFICIENT_STOCK field lines[i].quantity with max
    source: FR14.1, AC4.1.1–AC4.1.3
  - id: BR14.2
    statement: Editing a line sets its reservation to what is still needed
    category: constraint
    applies_to: PATCH /dispatch-orders/{id}
    trigger: edit (status open or part_dispatched)
    logic: >
      Every field is optional: customer name and needed-by can change alone. `lines` lists only the lines to change,
      add or remove; a line not sent keeps its quantities, including its short quantity. For a line sent with a new
      quantity n: n ≥ picked, else refuse; target reserved = n − picked; short becomes 0;
      IF target > reserved move the difference available → reserved (max n = picked + reserved + Available);
      IF target < reserved move the difference reserved → available (reason released); new lines reserve as in
      BR14.1; a line sent with remove must have picked 0, and it releases its reservation
    violation: 422 RULE_REFUSED "Already picked {picked}. Min {picked}."; 409 INSUFFICIENT_STOCK with max
    source: FR14.2, AC4.1.5, AC4.1.6
  - id: BR14.3
    statement: Cancelling releases all Reserved stock
    category: state
    applies_to: POST /dispatch-orders/{id}/cancel
    trigger: cancel (status open or part_dispatched) by creator, Manager or Owner
    logic: for each line, move reserved → available (reason released); cancelled += reserved + short; reserved = 0; short = 0, so the line invariant holds and the original ordered quantity stays visible; status = cancelled IF the sum of picked over all lines is 0 ELSE dispatched (the rest is cancelled, Q3)
    violation: 409 STATE_CONFLICT
    source: FR14.2, AC4.1.4, Q3

  # ---------- Picking ----------
  - id: BR15.1
    statement: Confirming a pick line moves stock out of Reserved as dispatched
    category: constraint
    applies_to: POST /picking/{id}/lines/{lineId}/confirm
    trigger: confirm line (status open or part_dispatched; BR6.2)
    logic: quantity per BR18.1; IF quantity > line.reserved THEN refuse with max = reserved; move reserved → external reason dispatched; picked += q; reserved −= q; order.pickedSinceConfirm = true
    violation: 409 INSUFFICIENT_STOCK "Max {reserved}" with max
    source: FR15.2, AC5.1.2, AC5.1.3
  - id: BR15.2
    statement: Confirm dispatch closes the pick
    category: state
    applies_to: POST /picking/{id}/confirm-dispatch
    trigger: confirm dispatch
    logic: >
      The result is dispatched IF every line has reserved = 0 and short = 0, ELSE part_dispatched. A Reserved
      remainder (not yet picked) stays Reserved for a later pick; a short quantity (no stock could be reserved after
      damage) stays short, with no reservation, until the order is edited or cancelled. Refuse IF the sum of picked
      over all lines is 0, OR IF nothing was picked since the last confirm (pickedSinceConfirm false) and the result
      equals the current status (nothing would change); so a part-dispatched order that an edit or cancel has fully
      settled can still be confirmed to dispatched. Then pickedSinceConfirm = false. shortLines in the response =
      number of lines with reserved > 0 or short > 0
    violation: 409 STATE_CONFLICT "Pick at least one line first."
    source: FR15.3, AC5.1.4, Q3

  # ---------- Damage ----------
  - id: BR16.1
    statement: Damage is flagged on a pick line, up to what is reserved on it
    category: constraint
    applies_to: POST /picking/{id}/lines/{lineId}/damage
    trigger: flag (status open or part_dispatched; BR6.2)
    logic: product is the line's product (not an input); quantity per BR18.1; reason damaged, expired or other; note up to 500; IF quantity > line.reserved THEN refuse with max = reserved
    violation: 409 INSUFFICIENT_STOCK "Max {reserved}" with max
    source: FR16.1, FR16.2, FR16.5, AC5.2.5
  - id: BR16.2
    statement: Flagged stock moves to Damaged, and a replacement is reserved for the same line
    category: policy
    applies_to: damage flag
    trigger: valid flag
    logic: >
      one transaction: move q reserved → damaged with the chosen reason; create DamageFlag and a Damage flag Issue;
      replacement = min(q, Available); IF replacement > 0 move it available → reserved for the line (reason reserved,
      source damage_flag with the new flag's ID);
      line.reserved = reserved − q + replacement; line.damaged += q; IF replacement < q THEN line.short += q − replacement
      and raise a Dispatch short Issue for q − replacement
    violation: not applicable
    source: FR16.3, FR16.4, AC5.2.3, AC5.2.4

  # ---------- Issues and My tasks ----------
  - id: BR17.1
    statement: Issues are raised only inside the transaction that caused them, and listed read-only
    category: policy
    applies_to: Issues
    trigger: shortfall, over-delivery, damage flag, dispatch short
    logic: raise() takes the caller's transaction; the list (Owner, Manager) is newest first with type, product, warehouse, quantity view, raised-by name and raisedAt; no update endpoint exists
    violation: 403 FORBIDDEN for other roles
    source: FR17.1, FR17.2, AC5.3.1–AC5.3.3
  - id: BR17.2
    statement: My tasks lists open receiving and picking work in the caller's warehouses (Q4)
    category: policy
    applies_to: GET /my-tasks
    trigger: request by a role with floor rights
    logic: >
      MyTasks owns no tables and reads only through Purchasing.receivingWork(businessId, warehouseIds, today) and
      Dispatch.pickingWork(businessId, warehouseIds, today);
      receive tasks: purchase orders sent or partly_received; pick tasks: dispatch orders open or part_dispatched;
      warehouses: assigned (Supervisor, Warehouse worker) or all (Owner, Manager); status new = nothing saved or
      picked yet, in_progress = any receipt line or pick exists, done = finished (received, dispatched) today in
      the business time zone (APP_TIMEZONE, default Asia/Dhaka); order: in_progress, then new, each by expected
      or needed-by date ascending then number, then done (most recent first)
    violation: 403 FORBIDDEN for Sales rep and Accountant
    source: FR11.1, FR11.2, AC3.1.1–AC3.1.4, Q4
```

## Rules Summary

| ID | Rule | Category | Source |
|---|---|---|---|
| BR6.1–BR6.5 | Role table, warehouse scope, read limits, own dispatch orders, other businesses are 404 | authorization | FR2.2, Q5, FR1.3 |
| BR7.1–BR7.4 | 3 active warehouses, unique names, in-use warehouses stay active, inactive not usable | constraint | FR4.1, Q7 |
| BR8.1–BR8.5 | User fields, Managers vs Owners, last Owner, deactivation and password change end sessions | validation, authorization | FR3 |
| BR9.1–BR9.7 | SKU, barcode, pack size, unit lock, search, archived suppliers, opening stock once | constraint | FR5–FR7 |
| BR10.1–BR10.6 | Insert-only, balances = sum, never negative with max, lock order, cost, audit fields | constraint | FR8, NFR3, NFR4, Q6 |
| BR11.1 | Apply each action once | policy | FR8.5 |
| BR18.1–BR18.2 | Cartons and pieces in, base units stored, display form | validation | FR9 |
| BR12.1–BR12.4 | Purchase order fields, status flow, edit before receiving, close short | state | FR10, Q2 |
| BR13.1–BR13.4 | Blind view, final saved lines, blind per delivery, running-total completion | policy | FR12, Q1 |
| BR14.1–BR14.3 | Reserve on create, edit sets reservation, cancel releases | constraint | FR14, Q3 |
| BR15.1–BR15.2 | Confirm line, confirm dispatch | state | FR15, Q3 |
| BR16.1–BR16.2 | Flag up to reserved, replacement or short | policy | FR16 |
| BR17.1–BR17.2 | Issues in the same transaction, My tasks | policy | FR11, FR17, Q4 |

## Assumptions & Open Questions

None.
