# Contract Summary — Mojud core slice

Contracts for the three units in `inception/units-generation/unit-of-work.md`, following the dependency graph in `unit-of-work-dependency.md`, the components in `inception/domain-design/components.md` and the requirements in `requirements.md`. Choices come from `contract-design-questions.md` (Q1–Q6). There are no external consumers this round.

## Contracts

| # | Provider Unit | Consumer | Mechanism | Owner |
|---|---|---|---|---|
| C1 | U1 walking-skeleton + U2 backend (backend service) | U1 + U3 web app | REST/JSON over HTTP, OpenAPI 3.1 | Backend service (U2 owns all paths except `/auth/*`, which U1 owns) |
| C2 | U1 IdentityAccess module | U2 modules (Catalogue, Purchasing, Dispatch, Issues, MyTasks) | In-process TypeScript interface | U1 |
| C3 | U2 StockLedger module | U2 Catalogue, Purchasing, Dispatch, Damage; U1 IdentityAccess (warehouse check) | In-process TypeScript interface inside one database transaction | U2 |
| C4 | U2 Issues module | U2 Purchasing, Dispatch, Damage | In-process TypeScript interface inside the caller's transaction | U2 |
| C5 | Each backend module | Other backend modules | Shared database: table ownership | Owning module |

## Cross-cutting Rules (all contracts)

- **Base path and versioning (Q6):** every HTTP path is under `/api/v1`. Within v1 only additive changes are allowed; clients ignore unknown fields; removing or renaming a field needs `/api/v2`.
- **Session (Q2):** `POST /auth/signin` and `/auth/signup` set an HttpOnly, `SameSite=Lax` session cookie. `GET /auth/me` returns the caller and a CSRF token; every non-GET request must send it in `X-CSRF-Token`. A deactivated user's session is refused on its next request (401 `SESSION_ENDED`).
- **Authorization:** every endpoint resolves the session into a caller context (business, user, role, assigned warehouses) through C2 and applies the FR2.2 role table and warehouse scope before any module does work. This includes stock reads (`GET /stock/available`), which settles the open Domain Design point that Stock ledger reads were unchecked. Records of another business are always reported as 404.
- **Apply once (Q4):** every stock-changing request (marked `x-idempotent: true` below) requires an `Idempotency-Key` header (a UUID created once per user action). The backend stores the key with the complete response in the same transaction as all rows the request writes (movements, receipt lines, damage flags, Issues, line quantities). A repeat with the same key returns the stored response with header `Idempotent-Replay: true` and changes nothing. The same key with a different body returns 409 `IDEMPOTENCY_KEY_REUSED`.
- **Errors (Q5):** one shape, `Error`, with standard status codes: 400 validation, 401 not signed in or session ended, 403 not allowed, 404 not found (including other businesses' records), 409 conflict (state no longer allows the action, or not enough stock), 422 business rule refused.
- **Quantities:** inputs are `{ cartons, pieces }` (either may be 0); the backend converts to base units. Outputs include base units and a display form ("3 ctn + 5 pcs").
- **Blind receiving:** the receiving view contract has no ordered, remaining or expected quantity field at all (FR12.1).
- **Shared types (Q3):** the package `@mojud/contracts` holds TypeScript types matching this OpenAPI spec; both the web app and backend import them. The OpenAPI spec is the source of truth; type changes follow it.

## C1 — Backend HTTP API (OpenAPI)

```yaml
openapi: 3.1.0
info:
  title: Mojud core slice API
  version: 1.0.0
servers:
  - url: /api/v1
security:
  - sessionCookie: []
components:
  securitySchemes:
    sessionCookie:
      type: apiKey
      in: cookie
      name: mojud_session
  parameters:
    IdempotencyKey:
      name: Idempotency-Key
      in: header
      required: true
      schema: { type: string, format: uuid }
    CsrfToken:
      name: X-CSRF-Token
      in: header
      required: true
      schema: { type: string }
  schemas:
    Error:
      type: object
      required: [code, message]
      properties:
        code: { type: string, examples: [VALIDATION_FAILED, NOT_SIGNED_IN, SESSION_ENDED, FORBIDDEN, NOT_FOUND, INSUFFICIENT_STOCK, STATE_CONFLICT, IDEMPOTENCY_KEY_REUSED, LIMIT_REACHED, DUPLICATE] }
        message: { type: string }
        field: { type: string }
        max: { $ref: '#/components/schemas/QuantityView' }
    QuantityInput:
      type: object
      required: [cartons, pieces]
      properties:
        cartons: { type: integer, minimum: 0 }
        pieces: { type: integer, minimum: 0 }
    QuantityView:
      type: object
      required: [base, display]
      properties:
        base: { type: integer }
        cartons: { type: integer }
        pieces: { type: integer }
        display: { type: string, examples: ["3 ctn + 5 pcs"] }
    Role:
      type: string
      enum: [owner, manager, supervisor, warehouse_worker, sales_rep, accountant]
    Caller:
      type: object
      required: [userId, businessId, businessName, name, role, warehouseIds, csrfToken]
      properties:
        userId: { type: string, format: uuid }
        businessId: { type: string, format: uuid }
        businessName: { type: string }
        name: { type: string }
        role: { $ref: '#/components/schemas/Role' }
        warehouseIds: { type: array, items: { type: string, format: uuid } }
        csrfToken: { type: string }
    Warehouse:
      type: object
      properties:
        id: { type: string, format: uuid }
        name: { type: string }
        active: { type: boolean }
    User:
      type: object
      properties:
        id: { type: string, format: uuid }
        name: { type: string }
        phone: { type: string }
        role: { $ref: '#/components/schemas/Role' }
        warehouseIds: { type: array, items: { type: string, format: uuid } }
        active: { type: boolean }
    Product:
      type: object
      properties:
        id: { type: string, format: uuid }
        name: { type: string }
        sku: { type: string }
        category: { type: string }
        baseUnitName: { type: string }
        packUnitName: { type: [string, 'null'] }
        packSize: { type: [integer, 'null'], minimum: 2 }
        baseBarcode: { type: [string, 'null'] }
        packBarcode: { type: [string, 'null'] }
        openingStock:
          type: array
          items:
            type: object
            properties:
              warehouseId: { type: string, format: uuid }
              quantity: { $ref: '#/components/schemas/QuantityView' }
              recordedAt: { type: string, format: date-time }
    Supplier:
      type: object
      properties:
        id: { type: string, format: uuid }
        name: { type: string }
        contactPerson: { type: string }
        phone: { type: string }
        address: { type: string }
        archived: { type: boolean }
    PurchaseOrder:
      type: object
      properties:
        id: { type: string, format: uuid }
        number: { type: string, examples: [PO-12] }
        supplierId: { type: string, format: uuid }
        warehouseId: { type: string, format: uuid }
        expectedDate: { type: string, format: date }
        status: { type: string, enum: [draft, sent, partly_received, received, cancelled] }
        lines:
          type: array
          items:
            type: object
            properties:
              id: { type: string, format: uuid }
              productId: { type: string, format: uuid }
              ordered: { $ref: '#/components/schemas/QuantityView' }
              unitCostBase: { type: string, description: decimal string per base unit }
    ReceivingView:
      description: Blind view; deliberately has no ordered, remaining or expected quantity.
      type: object
      properties:
        purchaseOrderId: { type: string, format: uuid }
        number: { type: string }
        supplierName: { type: string }
        warehouseName: { type: string }
        lines:
          type: array
          items:
            type: object
            properties:
              productId: { type: string, format: uuid }
              productName: { type: string }
              countedThisDelivery: { $ref: '#/components/schemas/QuantityView' }
              status: { type: string, enum: [not_counted, counted] }
    DispatchOrder:
      type: object
      properties:
        id: { type: string, format: uuid }
        number: { type: string, examples: [DO-31] }
        customerName: { type: string }
        warehouseId: { type: string, format: uuid }
        neededBy: { type: string, format: date }
        status: { type: string, enum: [open, part_dispatched, dispatched, cancelled] }
        lines:
          type: array
          items:
            type: object
            properties:
              id: { type: string, format: uuid }
              productId: { type: string, format: uuid }
              productName: { type: string }
              ordered: { $ref: '#/components/schemas/QuantityView' }
              reserved: { $ref: '#/components/schemas/QuantityView' }
              picked: { $ref: '#/components/schemas/QuantityView' }
              short: { $ref: '#/components/schemas/QuantityView' }
              damaged: { $ref: '#/components/schemas/QuantityView' }
    Issue:
      type: object
      properties:
        id: { type: string, format: uuid }
        type: { type: string, enum: [shortfall, over_delivery, damage_flag, dispatch_short] }
        productName: { type: string }
        warehouseName: { type: string }
        quantity: { $ref: '#/components/schemas/QuantityView' }
        raisedBy: { type: string }
        raisedAt: { type: string, format: date-time }
    Task:
      type: object
      properties:
        kind: { type: string, enum: [receive, pick] }
        id: { type: string, format: uuid }
        title: { type: string }
        subtitle: { type: string }
        status: { type: string, enum: [new, in_progress, done] }
        neededBy: { type: [string, 'null'], format: date }
paths:
  /auth/signup:
    post:
      security: []
      summary: Create a business and its first Owner, and sign in (FR1.1)
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required: [businessName, name, phone, password]
              properties:
                businessName: { type: string }
                name: { type: string }
                phone: { type: string }
                password: { type: string, minLength: 8 }
      responses:
        '201': { description: Created and signed in, content: { application/json: { schema: { $ref: '#/components/schemas/Caller' } } } }
        '400': { description: Validation failed, content: { application/json: { schema: { $ref: '#/components/schemas/Error' } } } }
        '409': { description: Phone already registered (code DUPLICATE, field phone) }
  /auth/signin:
    post:
      security: []
      summary: Sign in (FR1.2); the error never names which field was wrong
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required: [phone, password]
              properties:
                phone: { type: string }
                password: { type: string }
      responses:
        '200': { description: Signed in, content: { application/json: { schema: { $ref: '#/components/schemas/Caller' } } } }
        '401': { description: Sign-in details are not correct, or account deactivated }
  /auth/signout:
    post:
      parameters: [{ $ref: '#/components/parameters/CsrfToken' }]
      responses:
        '204': { description: Session ended }
  /auth/me:
    get:
      responses:
        '200': { description: Current caller and CSRF token, content: { application/json: { schema: { $ref: '#/components/schemas/Caller' } } } }
        '401': { description: Not signed in or session ended }
  /warehouses:
    get:
      responses: { '200': { description: Warehouses of the business } }
    post:
      summary: Owner or Manager; at most 3 active (FR4.1)
      parameters: [{ $ref: '#/components/parameters/CsrfToken' }]
      responses:
        '201': { description: Created }
        '422': { description: LIMIT_REACHED }
  /warehouses/{id}:
    patch:
      summary: Rename or deactivate; deactivation refused while it holds stock
      parameters: [{ $ref: '#/components/parameters/CsrfToken' }]
      responses:
        '200': { description: Updated }
        '409': { description: STATE_CONFLICT (holds stock) }
  /users:
    get:
      responses: { '200': { description: Users of the business } }
    post:
      summary: Owner or Manager (Managers cannot create Owners) (FR3.1, FR3.2)
      parameters: [{ $ref: '#/components/parameters/CsrfToken' }]
      responses:
        '201': { description: Created }
        '409': { description: DUPLICATE phone }
  /users/{id}:
    patch:
      summary: Change role, warehouses or password; deactivate. Last active Owner protected
      parameters: [{ $ref: '#/components/parameters/CsrfToken' }]
      responses:
        '200': { description: Updated }
        '422': { description: Refused by rule }
  /products:
    get:
      summary: List or search by name, SKU or barcode, case-insensitive (FR5.2)
      parameters:
        - { name: search, in: query, schema: { type: string } }
      responses: { '200': { description: Products } }
    post:
      parameters: [{ $ref: '#/components/parameters/CsrfToken' }]
      responses:
        '201': { description: Created }
        '409': { description: DUPLICATE sku or barcode }
  /products/{id}:
    patch:
      parameters: [{ $ref: '#/components/parameters/CsrfToken' }]
      responses: { '200': { description: Updated } }
  /products/{id}/opening-stock:
    post:
      summary: Once per product and warehouse (FR7.1)
      x-idempotent: true
      parameters:
        - { $ref: '#/components/parameters/CsrfToken' }
        - { $ref: '#/components/parameters/IdempotencyKey' }
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required: [warehouseId, quantity, unitCostBase]
              properties:
                warehouseId: { type: string, format: uuid }
                quantity: { $ref: '#/components/schemas/QuantityInput' }
                unitCostBase: { type: string }
      responses:
        '201': { description: Recorded }
        '409': { description: STATE_CONFLICT (already recorded) }
  /suppliers:
    get:
      responses: { '200': { description: Suppliers } }
    post:
      parameters: [{ $ref: '#/components/parameters/CsrfToken' }]
      responses: { '201': { description: Created } }
  /suppliers/{id}:
    patch:
      summary: Edit or archive
      parameters: [{ $ref: '#/components/parameters/CsrfToken' }]
      responses: { '200': { description: Updated } }
  /stock/available:
    get:
      summary: Available quantity for a product at a warehouse; role and warehouse scope checked
      parameters:
        - { name: productId, in: query, required: true, schema: { type: string, format: uuid } }
        - { name: warehouseId, in: query, required: true, schema: { type: string, format: uuid } }
      responses:
        '200': { description: Available, content: { application/json: { schema: { $ref: '#/components/schemas/QuantityView' } } } }
  /purchase-orders:
    get:
      responses: { '200': { description: Purchase orders } }
    post:
      parameters: [{ $ref: '#/components/parameters/CsrfToken' }]
      responses: { '201': { description: Created as draft } }
  /purchase-orders/{id}:
    get:
      responses: { '200': { description: Detail, content: { application/json: { schema: { $ref: '#/components/schemas/PurchaseOrder' } } } } }
    patch:
      summary: Edit; refused once receiving has started (FR10.3)
      parameters: [{ $ref: '#/components/parameters/CsrfToken' }]
      responses:
        '200': { description: Updated }
        '409': { description: STATE_CONFLICT }
  /purchase-orders/{id}/send:
    post:
      parameters: [{ $ref: '#/components/parameters/CsrfToken' }]
      responses: { '200': { description: Status sent } }
  /purchase-orders/{id}/cancel:
    post:
      parameters: [{ $ref: '#/components/parameters/CsrfToken' }]
      responses:
        '200': { description: Cancelled }
        '409': { description: STATE_CONFLICT }
  /receiving/{purchaseOrderId}:
    get:
      summary: Blind receiving view for a Sent or Partly received order in an assigned warehouse
      responses:
        '200': { description: Blind view, content: { application/json: { schema: { $ref: '#/components/schemas/ReceivingView' } } } }
  /receiving/{purchaseOrderId}/lines:
    post:
      summary: Save a counted line; moves stock into Available (FR12.2)
      x-idempotent: true
      parameters:
        - { $ref: '#/components/parameters/CsrfToken' }
        - { $ref: '#/components/parameters/IdempotencyKey' }
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required: [productId, quantity]
              properties:
                productId: { type: string, format: uuid }
                quantity: { $ref: '#/components/schemas/QuantityInput' }
      responses:
        '201': { description: Saved }
        '422': { description: NOT_ON_ORDER or line already saved }
  /receiving/{purchaseOrderId}/complete:
    post:
      summary: Mark delivery complete; raises Issues; response never includes ordered quantities
      x-idempotent: true
      parameters:
        - { $ref: '#/components/parameters/CsrfToken' }
        - { $ref: '#/components/parameters/IdempotencyKey' }
      responses:
        '200': { description: Receipt saved }
  /dispatch-orders:
    get:
      responses: { '200': { description: Dispatch orders } }
    post:
      summary: Create and reserve; never more than Available (FR14.1)
      x-idempotent: true
      parameters:
        - { $ref: '#/components/parameters/CsrfToken' }
        - { $ref: '#/components/parameters/IdempotencyKey' }
      responses:
        '201': { description: Created and reserved }
        '409': { description: INSUFFICIENT_STOCK with max }
  /dispatch-orders/{id}:
    get:
      responses: { '200': { description: Detail, content: { application/json: { schema: { $ref: '#/components/schemas/DispatchOrder' } } } } }
    patch:
      summary: Edit quantities; never below picked; increases limited by Available
      x-idempotent: true
      parameters:
        - { $ref: '#/components/parameters/CsrfToken' }
        - { $ref: '#/components/parameters/IdempotencyKey' }
      responses:
        '200': { description: Updated }
        '409': { description: INSUFFICIENT_STOCK or STATE_CONFLICT }
  /dispatch-orders/{id}/cancel:
    post:
      summary: Cancel before dispatch; releases Reserved stock
      x-idempotent: true
      parameters:
        - { $ref: '#/components/parameters/CsrfToken' }
        - { $ref: '#/components/parameters/IdempotencyKey' }
      responses:
        '200': { description: Cancelled }
        '409': { description: STATE_CONFLICT }
  /picking/{dispatchOrderId}/lines/{lineId}/confirm:
    post:
      summary: Confirm picked quantity; moves it out of Reserved (FR15.2)
      x-idempotent: true
      parameters:
        - { $ref: '#/components/parameters/CsrfToken' }
        - { $ref: '#/components/parameters/IdempotencyKey' }
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required: [quantity]
              properties:
                quantity: { $ref: '#/components/schemas/QuantityInput' }
      responses:
        '200': { description: Line updated }
        '409': { description: INSUFFICIENT_STOCK with max }
  /picking/{dispatchOrderId}/lines/{lineId}/damage:
    post:
      summary: Flag damage on the line; reserves a replacement or marks the line short (FR16)
      x-idempotent: true
      parameters:
        - { $ref: '#/components/parameters/CsrfToken' }
        - { $ref: '#/components/parameters/IdempotencyKey' }
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required: [quantity, reason]
              properties:
                quantity: { $ref: '#/components/schemas/QuantityInput' }
                reason: { type: string, enum: [damaged, expired, other] }
                note: { type: string }
      responses:
        '200': { description: Flagged; returns the updated line }
        '409': { description: INSUFFICIENT_STOCK with max (more than reserved on the line) }
  /picking/{dispatchOrderId}/confirm-dispatch:
    post:
      summary: Close the pick; Dispatched or Part-dispatched
      x-idempotent: true
      parameters:
        - { $ref: '#/components/parameters/CsrfToken' }
        - { $ref: '#/components/parameters/IdempotencyKey' }
      responses:
        '200': { description: Order status updated }
  /issues:
    get:
      summary: Read-only list, Owner and Manager only (FR17.2)
      responses:
        '200': { description: Issues, content: { application/json: { schema: { type: array, items: { $ref: '#/components/schemas/Issue' } } } } }
  /my-tasks:
    get:
      summary: Open receiving and picking work in the caller's warehouses (FR11)
      responses:
        '200': { description: Tasks, content: { application/json: { schema: { type: array, items: { $ref: '#/components/schemas/Task' } } } } }
```

## C2–C4 — In-process Module Interfaces (shared schema)

```yaml
shared-schema: backend-module-interfaces
version: 1
interfaces:
  IdentityAccess:            # C2, owner U1
    resolveCaller:
      input: { sessionId: string }
      output: { userId, businessId, role, warehouseIds }
      errors: [SESSION_ENDED, NOT_SIGNED_IN]
    authorize:
      input: { caller: CallerContext, action: string, warehouseId: string | null }
      output: void
      errors: [FORBIDDEN]
  StockLedger:               # C3, owner U2
    rule: every call runs inside the caller's database transaction (tx argument); callers authorize first
    move:
      input: { tx, caller, productId, warehouseId, fromState: available|reserved|damaged|external, toState: available|reserved|damaged|external, quantityBase: integer > 0, unitCost, reason, source: { type, id } }
      output: { movementId }
      errors: [INSUFFICIENT_STOCK (with max)]
    available:
      input: { tx?, businessId, productId, warehouseId }
      output: { quantityBase }
    warehouseHoldsStock:
      input: { tx?, businessId, warehouseId }
      output: boolean
  Issues:                    # C4, owner U2
    raise:
      input: { tx, caller, type: shortfall|over_delivery|damage_flag|dispatch_short, productId, warehouseId, quantityBase, source: { type, id } }
      output: { issueId }
  Idempotency:               # owner U2, used by every x-idempotent endpoint
    rule: key, request hash and full response are stored in the same transaction as all rows the request writes
    begin:
      input: { tx, businessId, key, requestHash }
      output: { replay: storedResponse | null }
      errors: [IDEMPOTENCY_KEY_REUSED]
    finish:
      input: { tx, businessId, key, response }
      output: void
```

## C5 — Table Ownership (shared database)

```yaml
shared-schema: database-ownership
rule: only the owning module writes its tables; other modules read only through the owner's interface
tables:
  IdentityAccess: [businesses, warehouses, users, user_warehouses, sessions]
  Catalogue: [products, suppliers]
  StockLedger: [stock_movements, stock_balances, idempotency_records]
  Purchasing: [purchase_orders, purchase_order_lines, receipts, receipt_lines]
  Dispatch: [dispatch_orders, dispatch_order_lines]
  Damage: [damage_flags]
  Issues: [issues]
notes:
  - user_warehouses is created in U2's migration; in U1 the caller's warehouseIds is an empty list
  - stock_movements is insert-only; no update or delete statement exists in the code
```

## Contract Ownership Rules

- The backend service owns the OpenAPI spec (C1): U1 owns `/auth/*`, U2 owns every other path. The web app consumes it.
- Each module owns its interface (C2–C4) and its tables (C5); no module reads another's tables directly.
- Breaking changes need a new API version (`/api/v2`) or, for in-process interfaces, a change to every caller in the same commit with the owner's tests updated.
- Additive changes are safe: new optional fields and new endpoints; consumers ignore unknown fields.
- `@mojud/contracts` types are updated in the same commit as the OpenAPI spec.

## Open Questions

| Contract | Question | Blocks |
|---|---|---|
| C1 `/receiving/{id}` | What a second delivery on a Partly received order shows: `countedThisDelivery` starts at zero per delivery (assumed), with no earlier counts shown, to keep the count blind | U2, U3 |
| C1 `/picking/.../confirm-dispatch` | Confirming dispatch with nothing picked: refused with STATE_CONFLICT (assumed) or allowed as a no-op | U2 |

## Assumptions & Open Questions

- [assumption] Session lifetime is 12 hours of inactivity; the cookie is not `Secure` on `localhost` (no HTTPS this round, per the requirements assumption) and becomes `Secure` when deployed.
