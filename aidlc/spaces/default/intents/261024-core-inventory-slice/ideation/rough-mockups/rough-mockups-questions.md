# Rough Mockups — Questions

> Context: the scope document and intent backlog (`ideation/scope-definition/`) fix this round to sign-up and sign-in, setup screens, opening stock, purchase orders, My tasks, blind receiving, dispatch orders, picking and flagging damage. The intent statement sets the success outcomes. You already have a detailed UX design: `EXPERIENCE.md` (screens S1–S27, navigation per role, states), `DESIGN.md` (visual identity), four HTML mockups (receiving, picking, issues inbox, owner view), the scenario page specs in `design-process/C-UX-Scenarios/`, and a design system in `design-process/D-Design-System/`. These questions decide how this round uses that design, given what was cut (no camera, no offline, English only, no Issues inbox, no owner view).

## Q1. How should this stage use your existing UX design?

A. Treat the existing design (EXPERIENCE.md, DESIGN.md, scenario specs, design system) as the source of truth; the rough mockups only list this round's screens and show what changes because of the cuts
B. Redraw this round's screens from scratch as simple wireframes, using the existing design only as inspiration
C. Skip wireframes; just list the screens and point to the existing specs
D. Not yet defined
X. Other (please specify)

[Answer]: A

## Q2. Which screen sizes must this round support?

Your design makes floor screens (My tasks, receiving, picking) phone-first at 360px wide, and desk screens (setup, orders) work on desktop and phone. This round runs only on your laptop.

A. Follow the design: floor screens phone-first, desk screens desktop and phone (check phone layouts in the browser's phone view)
B. Desktop only this round; phone layouts later
C. Phone-first for every screen
D. Not yet defined
X. Other (please specify)

[Answer]: B

## Q3. Several role home screens in your design are out of scope this round (Issues inbox for Manager and Supervisor, Owner view for Owner and Accountant). Where should each role land after sign-in?

A. Owner and Manager land on a simple Setup home (Warehouses, Users, Products, Suppliers, Purchase orders, Dispatch orders); Sales rep on Dispatch orders; Warehouse worker on My tasks; Supervisor and Accountant on a "coming in a later round" page
B. Keep the designed homes and tabs, with "coming in a later round" placeholders where a screen is not built yet
C. One shared home with links filtered by role
D. Not yet defined
X. Other (please specify)

[Answer]: A

## Q4. How much accessibility should this round meet?

Your design targets WCAG 2.1 AA (the common web accessibility standard: contrast, keyboard use, screen-reader labels) and large touch targets (48–64px).

A. Keep the design's target: WCAG 2.1 AA and its touch-target sizes
B. Basic only this round: labels on every field, keyboard use and readable contrast; the full audit later
C. Not a concern this round
D. Not yet defined
X. Other (please specify)

[Answer]: A

## Q5. Your design ships light and dark themes. Which this round?

A. Light theme only; dark theme in a later round
B. Both light and dark now
C. Not yet defined
D. Not applicable
X. Other (please specify)

[Answer]: B

## Q6. Without the camera, how should "Flag damage" work on the pick screen?

Your design's camera path is one tap plus one scan. Without a camera, it opens a sheet with a product field.

A. Tapping Flag damage on a pick line opens the sheet pre-filled with that line's product, quantity 1 and reason "damaged"; one tap saves (product can be changed by typing or search)
B. Tapping Flag damage opens an empty sheet; the worker types or searches the product, then saves
C. Not yet defined
D. Not applicable
X. Other (please specify)

[Answer]: A

## Consolidated Summary Confirmation

- Design source (Q1): the existing UX design (EXPERIENCE.md, DESIGN.md, the scenario page specs and the design system) stays the source of truth. The rough mockups list this round's screens and show only what changes because of this round's cuts.
- Screen sizes (Q2): desktop only this round. The floor screens' phone layouts (360px) come in a later round.
- Home per role (Q3): Owner and Manager land on a Setup home (Warehouses, Users, Products, Suppliers, Purchase orders, Dispatch orders); Sales rep on Dispatch orders; Warehouse worker on My tasks; Supervisor and Accountant on a "coming in a later round" page.
- Accessibility (Q4): keep the design's target, WCAG 2.1 AA, and its touch-target sizes.
- Themes (Q5): light and dark both ship now.
- Flag damage without camera (Q6): tapping Flag damage on a pick line opens the sheet pre-filled with that line's product, quantity 1 and reason "damaged"; one tap saves.

Does this all look correct before I generate the artifact?

- Looks correct
- Request changes

[Answer]: Looks correct
