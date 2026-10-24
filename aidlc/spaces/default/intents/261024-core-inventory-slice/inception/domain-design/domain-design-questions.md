# Domain Design — Questions

> Context: this stage names the logical building blocks (components) of the code, which component owns each piece of data, and how they call each other. It does not decide how they are deployed or the technology; those come later. Inputs: `requirements.md` (FR1–FR18), `stories.md` (US1.1–US5.3) and the team practices. Each question offers a recommendation first, with its trade-off.

## Q1. How should the system be split into building blocks?

A. By business area, seven blocks: Identity and access (businesses, users, roles, sign-in), Catalogue (warehouses, products, suppliers), Stock ledger (stock movements and balances), Purchasing (purchase orders and receiving), Dispatch (dispatch orders, picking and damage), Issues, and My tasks (a read-only view). Clear ownership, and each later round's feature has an obvious home; more pieces to wire together
B. Fewer, larger blocks, four: Identity, Setup (warehouses, products, suppliers), Stock (ledger), Orders (purchase orders, receiving, dispatch, picking, damage, issues). Simpler at first; Orders grows large and mixes many concerns
C. One block per screen. Easy to map to the UI; the same data ends up owned by several blocks
D. Not yet defined
X. Other (please specify)

[Answer]: A

## Q2. Who is allowed to change stock?

The rules "stock never goes negative", "movements are never edited" and "each action applies once" must hold everywhere (FR8).

A. Only the Stock ledger block writes stock movements; Purchasing, Dispatch and opening stock ask it to. All stock rules live in one place and are tested once
B. Each block writes its own stock movements, following shared rules. Fewer calls between blocks; the same rules are repeated in several places
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q3. How are Issues created when receiving or picking finds a problem?

A. The block that finds the problem calls the Issues block directly, in the same database transaction as the stock change, so a stock change and its Issue are saved together or not at all
B. The block publishes an event, and the Issues block reacts to it later. Looser coupling; an Issue can briefly lag or be lost if handling fails
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q4. Where does flagging damage live?

This round damage is only flagged from a pick line; later rounds add flagging from Available stock and Supervisor decisions.

A. In its own Damage block, called by Dispatch when picking. Ready for the later flag-from-stock and decision features
B. Inside Dispatch, since this round it only happens while picking. Fewer blocks now; must be moved out later
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q5. How is the My tasks list assembled?

A. A read-only My tasks block that asks Purchasing and Dispatch for open work in the worker's warehouses; it owns no data
B. Each of Purchasing and Dispatch exposes its own task list and the screen merges them
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Consolidated Summary Confirmation

- Building blocks (Q1 + Q4): eight blocks by business area: Identity and access, Catalogue, Stock ledger, Purchasing, Dispatch, Damage, Issues, and My tasks. (Choosing a separate Damage block in Q4 adds an eighth block to the seven in Q1.)
- Stock changes (Q2): only the Stock ledger writes stock movements; every other block asks it to. All stock rules live and are tested in one place.
- Issues (Q3): the block that finds a problem calls Issues directly, in the same database transaction as the stock change, so both are saved together or not at all.
- Damage (Q4): its own block, called by Dispatch when a worker flags damage while picking.
- My tasks (Q5): a read-only block that asks Purchasing and Dispatch for open work; it owns no data.

Does this all look correct before I generate the artifact?

- Looks correct
- Request changes

[Answer]: Looks correct
