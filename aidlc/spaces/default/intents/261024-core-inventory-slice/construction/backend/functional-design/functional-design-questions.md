# Functional Design — backend — Questions

> Context: the backend unit (U2 in `unit-of-work.md`) adds warehouses, users and permissions, products, suppliers, opening stock, the stock ledger, purchase orders with blind receiving, dispatch orders with picking and damage, Issues and My tasks (FR2–FR17 in `requirements.md`; components in `components.md`; API in `contract-summary.md`). Most rules are settled. These points are not.

## Q1. A Partly received purchase order gets a second delivery. How are Shortfall and Over-delivery worked out when that delivery is marked complete?

A. Compare the total received across all deliveries with the ordered quantity, per line. Raise a new Shortfall only for what is still missing, or an Over-delivery only for what is newly over. Earlier Issues stay as they are.
B. Compare only this delivery's counts with what was still missing before it
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q2. Some purchase orders will never be fully delivered. How does such an order leave My tasks?

A. An Owner or Manager can "Close short" a Partly received order. It becomes Received, leaves My tasks, and the Shortfall Issues already raised stay as the record.
B. It stays Partly received and in My tasks until someone cancels it (cancel allowed after partial receipt)
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q3. A dispatch order is Part-dispatched: short quantities stay Reserved. What happens next?

A. It stays in My tasks. A worker can pick and confirm the remaining quantities later, which makes it Dispatched. The creator, a Manager or the Owner can cancel the rest, which releases it to Available and makes the order Dispatched. "Confirm dispatch" with nothing picked is refused.
B. It leaves My tasks; only a Manager can reopen it for picking
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q4. What do the task statuses in My tasks mean?

A. New: nothing saved or picked yet. In progress: at least one line saved or picked. Done: finished today. Done tasks stay at the bottom of the list until midnight, then disappear.
B. New and In progress as in A; finished tasks disappear at once (no Done in the list)
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q5. Who may read lists and details? (FR2.2 covers changes, not reads.)

A. Owner and Manager read everything in their business. Warehouse workers and Supervisors read products (for Type code) and only the receiving and picking views of orders in their assigned warehouses, plus My tasks. Sales reps read products, warehouses, Available stock, and dispatch orders: all of them, but they can edit only their own. Accountants read nothing new this round.
B. Every signed-in user can read every list in their business; only changes are limited by FR2.2
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q6. Which unit cost goes on stock movements other than opening stock and receiving (reserve, release, dispatch, damage)?

A. The latest known cost for that product at that warehouse, meaning the last opening-stock or received cost. Stock value is not calculated this round, but the record is ready for it.
B. No cost (empty) on those movements this round
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q7. Besides holding stock, should anything else block deactivating a warehouse?

A. Yes. Open purchase orders (Draft, Sent, Partly received) and open dispatch orders (Open, Part-dispatched) for that warehouse also block it, with a message naming the rule.
B. No. Only stock blocks it, as FR4.1 says.
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Consolidated Summary Confirmation

- Second delivery (Q1): totals across all deliveries are compared with ordered quantities per line; only what is still missing or newly over raises a new Issue.
- Short orders (Q2): an Owner or Manager can "Close short" a Partly received order; it becomes Received and leaves My tasks.
- Part-dispatched (Q3): stays in My tasks and the rest can be picked later; the creator, a Manager or the Owner can cancel the rest; confirming dispatch with nothing picked is refused.
- Task status (Q4): New, In progress, and Done until midnight at the bottom of the list.
- Reads (Q5): Owner and Manager read everything; workers and Supervisors read products and the receiving and picking views in their warehouses; Sales reps read products, warehouses, Available stock and all dispatch orders but edit only their own; Accountants read nothing new.
- Movement cost (Q6): the latest known cost (last opening or received cost) for that product at that warehouse.
- Warehouse deactivation (Q7): stock and open purchase or dispatch orders both block it.

Does this all look correct before I generate the artifact?

- Looks correct
- Request changes

[Answer]: Looks correct
