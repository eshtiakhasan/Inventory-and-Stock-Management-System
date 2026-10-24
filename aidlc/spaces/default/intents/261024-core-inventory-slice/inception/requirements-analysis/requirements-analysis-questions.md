# Requirements Analysis — Questions

> Context: the requirements will come from your PRD (`prd.md`, FR-1 to FR-54), limited to this round's scope (scope document and intent backlog), the wireframes, and the practices you approved. These questions settle the edges the earlier stages left open, including the two major concerns from the wireframe review. Each option names the PRD rule it follows where there is one.

## Q1. A worker saves a receiving line, then realises they miscounted. What happens this round?

Saving a line puts that stock into Available straight away, and stock records are never edited.

A. A saved line is final this round; the worker can't change it. Corrections come in a later round with Reversals (PRD FR-15)
B. Until "Mark delivery complete", the worker can save the line again; the difference is recorded as a new correcting stock movement, never by editing the old one
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q2. A delivery arrives only partly. Does the purchase order come back for the rest?

The PRD allows several deliveries (receipts) against one purchase order (FR-21).

A. Yes: after "Mark delivery complete" the purchase order becomes Partly received and stays in My tasks until it is fully received
B. No: one delivery per purchase order this round; whatever is missing stays a shortfall Issue
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q3. A double click, or a request retried after a slow network, could save the same thing twice. Should every save be protected so it is applied only once?

The PRD (FR-14) gives every action a unique ID so a repeat is applied only once. It also notes this makes the later offline mode easy to add.

A. Yes: every stock-changing action carries a unique ID and is applied only once, and save buttons are disabled while saving
B. Only disable the buttons while saving; no unique IDs this round
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q4. Products come in cartons and pieces. Where can quantities be entered in either unit?

The PRD (FR-9) lets every quantity be entered as cartons, pieces, or both (for example "3 ctn + 5 pcs"), stored in pieces, and shown as cartons plus leftover pieces.

A. Everywhere a quantity is entered (opening stock, purchase orders, receiving, dispatch orders, picking, damage)
B. Cartons only this round
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q5. After creating a purchase order or a dispatch order, what else can be done with it this round?

A. View its details, and cancel it: a purchase order before anything is received; a dispatch order before it is dispatched, releasing reserved stock (PRD FR-24)
B. View its details only; no edit or cancel
C. View, edit quantities, and cancel
D. Not yet defined
X. Other (please specify)

[Answer]: C

## Q6. How should sign-in be protected this round?

A. Passwords of at least 8 characters stored only as secure hashes; after 5 failed tries in a row, sign-in pauses for 15 minutes; the error never says which field was wrong (PRD FR-2, NFR-6)
B. Same, but no pause after failed tries
C. Not yet defined
X. Other (please specify)

[Answer]: B

## Q7. Shortfall, over-delivery and damage Issues are created this round, but the Issues inbox is a later round. Can anyone see them now?

A. Yes: a simple read-only Issues list for the Owner and Manager (type, product, warehouse, quantity, who raised it, when); no decisions yet
B. No screen this round; they are stored and checked by automated tests only
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q8. How should Flag damage behave in the unusual cases on the pick screen?

From the wireframe review: what happens when no line is selected, when the product is changed, and when there is no stock to replace the damaged carton.

A. Flag damage works only with a pick line selected (otherwise it is disabled, with "Select a line first"); the product stays that line's product; the quantity can't exceed what is reserved on the line; the replacement is reserved for the same line; if there is not enough Available stock, the line is marked short and a "dispatch short" Issue is created (PRD FR-29)
B. Same, but the worker may also flag a product that is not on the order, which is then taken from Available stock
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Consolidated Summary Confirmation

- Receiving corrections (Q1): a saved receiving line is final this round; corrections come later with Reversals.
- Partial deliveries (Q2): after "Mark delivery complete" a purchase order with missing stock becomes Partly received and stays in My tasks until fully received.
- Duplicate protection (Q3): every stock-changing action carries a unique ID and is applied only once; save buttons are disabled while saving.
- Units (Q4): cartons, pieces or both can be entered everywhere a quantity is entered; stored in pieces, shown as cartons plus leftover pieces.
- Orders (Q5): purchase orders and dispatch orders can be viewed, edited and cancelled. Edits and cancels are allowed only before work starts on them (no receipt yet; not yet dispatched), and a dispatch order can never reserve more than is Available.
- Sign-in (Q6): passwords of at least 8 characters, stored only as secure hashes; the error never says which field was wrong; no pause after failed tries this round.
- Issues (Q7): a simple read-only Issues list for the Owner and Manager; no decisions yet.
- Flag damage (Q8): only with a pick line selected; the product is that line's; the quantity can't exceed what is reserved on the line; the replacement is reserved for the same line; if there is not enough Available, the line is marked short and a "dispatch short" Issue is created.

Does this all look correct before I generate the requirements artifact?

- Looks correct
- Request changes

[Answer]: Looks correct
