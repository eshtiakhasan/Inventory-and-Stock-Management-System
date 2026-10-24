# Architecture Decisions — Mojud core slice

Decisions made while designing the components in `components.md`, from `requirements.md`, `stories.md`, the team practices and the answers in `domain-design-questions.md`.

## ADR-001: Split the system into blocks by business area

### Status: Accepted

### Context
The round covers sign-up and access, setup data, a stock record, purchasing with blind receiving, dispatch with picking, damage and Issues (FR1–FR18). One beginner builder will maintain it, and later rounds add transfers, counts, decisions and an owner view. Clear ownership of each piece of data keeps changes local.

### Decision
Eight business blocks: IdentityAccess, Catalogue, StockLedger, Purchasing, Dispatch, Damage, Issues and MyTasks, plus the WebApp user interface (Q1, Q4).

### Consequences
- Positive: every entity has one owner; each later feature has an obvious home; blocks can be tested on their own.
- Negative: more interfaces to define and wire together than a four-block split.
- Security: authorization lives in one block (IdentityAccess) that every other block calls, so permission rules are not scattered.

### Alternatives Rejected
- Four larger blocks (Identity, Setup, Stock, Orders): simpler at first, but Orders would mix purchasing, dispatch, damage and Issues and grow too large to reason about.
- One block per screen: the same data would be owned by several blocks.

## ADR-002: The Stock ledger is the only writer of stock movements

### Status: Accepted

### Context
Stock must never go negative, movements must never be edited, each action must apply once, and simultaneous requests must not oversell (FR8, NFR3). These rules are the product's core promise.

### Decision
Only StockLedger writes movements and balances. Catalogue, Purchasing, Dispatch and Damage ask it to (Q2). It serializes changes to the same product and warehouse and records processed action IDs.

### Consequences
- Positive: one place to implement and test every stock rule; no other block can bypass them.
- Negative: every stock-changing flow makes a call into StockLedger; it becomes a hot spot that must stay simple and fast.
- Security: a single write path makes the audit trail complete (NFR4) and limits where data integrity can be broken.

### Alternatives Rejected
- Each block writes its own movements under shared rules: fewer calls, but the same rules repeated in several places and easy to get inconsistent.

## ADR-003: Issues are created in the same transaction as the stock change

### Context
A shortfall, over-delivery, damage flag or short line must never exist without its Issue, and an Issue must never exist for a stock change that did not happen.

### Decision
Purchasing, Dispatch and Damage call Issues directly and synchronously, inside the same database transaction as the stock change (Q3).

### Consequences
- Positive: stock changes and Issues are saved together or not at all; simple to reason about and test.
- Negative: these blocks must share one database transaction boundary, which constrains Units Generation to keep them in one deployable, or to add a more complex coordination pattern.
- Security: no gap where a loss is recorded without anyone being told.

### Alternatives Rejected
- Events handled later by Issues: looser coupling, but an Issue can lag or be lost if handling fails, and it needs extra infrastructure.

## ADR-004: Damage is its own block

### Context
This round, damage is flagged only from a pick line (FR16). Later rounds add flagging from Available stock and Supervisor decisions (approve as write-off, reject back to Available).

### Decision
A separate Damage block owns damage flags, the Reserved-to-Damaged movement request and the Damage flag Issue; Dispatch calls it (Q4).

### Consequences
- Positive: later damage features extend one block without touching Dispatch.
- Negative: one more block and interface this round.
- Security: none beyond the shared authorization done by Dispatch before it calls Damage.

### Alternatives Rejected
- Damage inside Dispatch: fewer blocks now, but must be moved out when flagging from stock arrives.

## ADR-005: My tasks is a read-only composition

### Context
The worker's list combines receiving work (Purchasing) and picking work (Dispatch) in their assigned warehouses (FR11).

### Decision
A MyTasks block owns no data and asks Purchasing and Dispatch for open work, scoped by IdentityAccess (Q5).

### Consequences
- Positive: one place for task ordering and status rules; no duplicated task data to keep in sync.
- Negative: an extra call per page load; acceptable at this round's scale.
- Security: warehouse scoping is applied once, from the worker's assigned warehouses.

### Alternatives Rejected
- Each block exposes its own list and the screen merges them: ordering and status rules would live in the user interface.

## ADR-006: Warehouses belong to IdentityAccess, not Catalogue

### Context
The Q1 option listed warehouses under Catalogue. But every block's access check is scoped by warehouse (FR2.2), so IdentityAccess must know warehouses, and Catalogue must call IdentityAccess to authorize. With warehouses in Catalogue, IdentityAccess would also call Catalogue to validate assigned warehouses, creating a cycle.

### Decision
IdentityAccess owns Business, Warehouse, User and Session. Catalogue owns Product and Supplier.

### Consequences
- Positive: no dependency cycle; access scoping and the warehouses it scopes live together.
- Negative: differs from the wording of the Q1 option; the person sees this at the approval gate.
- Security: warehouse scoping checks need no cross-block call, so they cannot be skipped by a failed call.

### Alternatives Rejected
- Warehouses in Catalogue with a cycle between Catalogue and IdentityAccess: harder to test and to split later.
- Passing authorization context from the user interface only: rejected because the server must enforce permissions itself (FR2.2).

## ADR-007: Dispatch orchestrates the replacement after damage

### Context
After damage is flagged, a replacement must be reserved for the same order line, or the line marked short with a Dispatch short Issue (FR16.3, FR16.4). The line belongs to Dispatch.

### Decision
Dispatch calls Damage to record the flag, then itself asks StockLedger for the replacement reservation and raises the Dispatch short Issue when needed, all in one transaction.

### Consequences
- Positive: Damage never calls back into Dispatch, so the graph stays acyclic; the line's reserved and short quantities have one owner.
- Negative: the damage flow spans two blocks, so its tests must cover both together.
- Security: none beyond ADR-002.

### Alternatives Rejected
- Damage reserves the replacement and updates the line: Damage would need to call Dispatch, creating a cycle.
