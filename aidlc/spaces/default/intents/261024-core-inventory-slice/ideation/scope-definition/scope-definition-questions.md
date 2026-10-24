# Scope Definition — Questions

> Context: the intent statement (`ideation/intent-capture/intent-statement.md`) puts scenarios 09 (sign-up), 01 (receive a delivery) and 02 (pick and flag damage) in this round, plus minimal setup screens. The feasibility assessment and constraint register add: no deadline, a beginner builder, typed SKU/search instead of camera scanning, and local Docker only. Scenario 09 in your UX scenarios also contains Excel import, which was moved to a later round. These questions settle the edges of the scope and the build order. There is no hard deadline (feasibility Q4), so no deadline question is asked.

## Q1. Warehouse workers must sign in before they can receive or pick. How much of sign-in (scenario 10) belongs in this round?

Scenario 09 creates the Owner's account; Karim the worker needs to sign in too, and that flow lives in scenario 10, which is not in this round yet.

A. Sign in and sign out for every user, plus the forced change of a temporary password on first sign-in
B. Sign in and sign out only; the Owner or Manager sets the worker's real password directly (no temporary-password step)
C. Sign in and sign out, plus temporary-password change and the "shared phone" setting from the PRD
D. Not yet defined
X. Other (please specify)

[Answer]: B

## Q2. Picking needs stock that is already Available. How does stock first get into a warehouse in this round?

A. Opening stock: a Manager enters a starting quantity and unit cost per product per warehouse (the PRD's opening balance)
B. Only by receiving Purchase orders; picking works on stock that was received first
C. Both: opening stock entry and receiving
D. Not yet defined
X. Other (please specify)

[Answer]: A

## Q3. Which of these supporting rules are MUST-haves this round? (select all that apply)

Anything not selected becomes a SHOULD-have for a later round.

A. Owner recovery code shown at sign-up, and recovery with it (so the Owner is never locked out)
B. Segregation of duties: the person who created a Purchase order cannot receive it
C. Stock screens: the stock ladder per product (on hand, damaged, reserved, promisable) and movement history
D. Unit cost and stock value (cost taken from the latest receipt, with a revalue record when it changes)
E. None of these: keep this round to the three scenarios and setup screens only
X. Other (please specify)

[Answer]: E

## Q4. In what order should the pieces be built?

A. Dependency-first: sign-up and sign-in, then setup screens, then receiving, then dispatch and picking, then damage flags
B. Risk-first: the stock record rules (never negative, permanent movements) first, then the screens on top
C. Value-first: receiving and picking first, using seeded setup data, then sign-up and setup screens
D. Not yet defined
X. Other (please specify)

[Answer]: A

## Q5. Which user roles exist in this round?

The setup screens are used by a Manager (creates Purchase orders) and a Sales rep (creates Dispatch orders), and these roles were not named in the intent statement.

A. All six PRD roles exist with their permissions, even if only some are exercised now (Owner, Manager, Supervisor, Warehouse worker, Sales rep, Accountant)
B. Only the roles this round needs: Owner, Manager, Sales rep, Warehouse worker
C. Owner and Warehouse worker only; the Owner does the Manager and Sales rep tasks
D. Not yet defined
X. Other (please specify)

[Answer]: A

## Consolidated Summary Confirmation

- Sign-in (Q1): sign in and sign out for every user; the Owner or Manager sets each user's password directly. No temporary-password step and no shared-phone setting this round.
- Getting stock in (Q2): a Manager enters opening stock (quantity and unit cost per product per warehouse) so there is Available stock to pick. Receiving Purchase orders also adds stock, as scenario 01 requires.
- Supporting rules (Q3): none of the extras are must-haves. Recovery code, segregation of duties, the stock ladder and movement history screens, and unit cost and stock value move to a later round.
- Build order (Q4): dependency-first: sign-up and sign-in, then setup screens, then receiving, then dispatch and picking, then damage flags.
- Roles (Q5): all six PRD roles exist with their permissions, even though only Owner, Manager, Sales rep and Warehouse worker are exercised now.

Does this all look correct before I generate the artifact?

- Looks correct
- Request changes

[Answer]: Looks correct
