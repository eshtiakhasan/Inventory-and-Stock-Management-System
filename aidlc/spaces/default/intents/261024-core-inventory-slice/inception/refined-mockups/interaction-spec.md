# Interaction Specification — Mojud core slice

Behaviour for the screens in `mockups.md`. Existing design-system components keep the behaviour in their own spec files (`design-process/D-Design-System/components/`) and in EXPERIENCE.md; this file specifies only the five **new** components and the round's interaction rules. Format follows the component spec template. Sources: wireframes, user-flow, `stories.md`, `requirements.md`, `team-practices.md`.

## Round-wide Interaction Rules

| Rule | Behaviour | Source |
|---|---|---|
| Save buttons | Disable on click until the server answers; a repeated click never sends a second action; each stock action carries a unique action ID | FR8.5, AC3.2.4 |
| Refusals | Shown inline under the field with the maximum in the entry's units, plus "Use max" where a maximum exists; Save stays disabled (focusable, reason visible) until valid | FR8.4, EXPERIENCE Refusal message |
| Confirmations | `confirmation-dialog` only for: Mark delivery complete, Confirm dispatch with short lines, cancel an order, deactivate a warehouse or user, archive a supplier | wireframes, EXPERIENCE Confirm vs undo |
| Toasts | "Saved" after each save; "Flagged 1 ctn damaged" after Flag damage; 5 seconds or until the next action | FR8, EXPERIENCE Confirmation toast |
| Loading | Skeleton rows in tables and lists (`aria-busy="true"`); spinner only inside a saving button | EXPERIENCE State Patterns |
| Server or network error | "Couldn't save. Try again." with Retry; typed values kept | EXPERIENCE State Patterns |
| Unsaved side-panel changes | Closing a changed panel asks "Discard changes?" | corner checklist (unsaved input) |
| Permission | Screens and actions outside the role are hidden; a direct link shows "You don't have access to this." | FR2.2 |

## setup-card (new)

| Field | Value |
|---|---|
| Component | setup-card |
| Description | One tile on the Setup home linking to a settings area, with a count |
| Category | navigation |

States:

| State | Description | Trigger |
|---|---|---|
| default | Title (`title`) and count line (`meta`) | page load |
| hover | `surface-alt` background | mouseover |
| focus | `focus-ring` | Tab |
| empty | Count reads "None yet" | no records |

Props: `title` (string, required), `count` (string, required), `href` (string, required).

Responsive: 3 per row at 1024px and up (only desktop this round).

Accessibility: rendered as a link whose name is the title plus count ("Warehouses, 2 active"); Enter follows it; heading level h2 inside the link.

## side-panel (new)

| Field | Value |
|---|---|
| Component | side-panel |
| Description | Add/edit form that slides in from the right over a list page (Q4) |
| Category | layout |

States:

| State | Description | Trigger |
|---|---|---|
| closed | Not rendered | default |
| open | 400px (560px for products) panel, `scrim` over the list | Add or Edit |
| saving | Save shows a spinner, fields read-only | Save |
| error | Field errors under fields, kept values | validation or server refusal |
| dirty-close | "Discard changes?" confirmation | Close with changes |

Props: `title` (string, required), `width` (number, optional, default 400), `onSave` (function, required), `onClose` (function, required).

Accessibility: `role="dialog"` with `aria-labelledby` the panel title; focus moves to the first field on open and is trapped; Escape closes (asking first if dirty); focus returns to the Add/Edit button that opened it.

## type-code-dialog (new)

| Field | Value |
|---|---|
| Component | type-code-dialog |
| Description | Desktop replacement for the camera Scan overlay: find a product by SKU, barcode number or name (FR13.1) |
| Category | input |

States:

| State | Description | Trigger |
|---|---|---|
| default | Empty search field focused | open |
| loading | Results area shows skeleton rows | typing pause (300ms) |
| results | Up to 10 matches: name and SKU | matches found |
| empty | "No product found for '…'" | no matches |
| not-on-task | "Not on this order" (receive or pick) or "No open task has this product" (My tasks) | chosen product not applicable |

Props: `context` ("my-tasks" or "task"), `taskProductIds` (array, optional), `onSelect` (function, required).

Accessibility: `role="dialog"` named "Type code"; results are a `listbox` with arrow-key navigation and Enter to choose; result count announced politely; Escape closes and returns focus to the Type code button.

## theme-switch (new)

| Field | Value |
|---|---|
| Component | theme-switch |
| Description | Chooses Light, Dark or Device theme (FR18.2) |
| Category | input |

Behaviour: three-option select in the app bar. Default "Device" follows the operating system setting; a choice is saved in the browser and applied before first paint on later visits so the page does not flash.

Accessibility: a native select labelled "Theme"; both themes meet WCAG 2.1 AA contrast (accessibility checklist).

## issues-table (new usage of data-table)

| Field | Value |
|---|---|
| Component | issues-table |
| Description | Read-only list of Issues for Owner and Manager (FR17.2) |
| Category | display |

Behaviour: `data-table` columns Type (icon + text), Product, Warehouse, Quantity (cartons + pieces), Raised by, Age ("12 min ago"); sorted newest first; no row actions; 50 rows per page with Previous / Next.

Accessibility: real table with header cells and a caption "Open issues"; type shown by icon and text, never color alone.

## Screen Flows With State Transitions

### Receive (M11)

| From | Action | To | Result |
|---|---|---|---|
| Line not counted | Select line, enter count, Save line | Line counted (read-only) | Movement to Available, toast "Saved" |
| Any | Type code, product not on order | Same | "Not on this order", nothing recorded |
| Some lines counted | Mark delivery complete → Confirm | My tasks | "Receipt saved"; PO Partly received or Received; Issues created in the background |
| Dialog open | Go back / Escape | Same | Nothing changes |

### Pick (M12, M13)

| From | Action | To | Result |
|---|---|---|---|
| Line selected | Confirm line | Line progress updated | Movement out of Reserved, toast "Saved" |
| No line selected | Flag damage | — | Disabled; reason "Select a line first" |
| Line selected | Flag damage → Flag damage (form) | Line shows "Damaged, 1 ctn" | Damaged +1; replacement reserved or line marked short |
| Lines short | Confirm dispatch → Confirm | My tasks | Short quantities stay Reserved; order Part-dispatched |
| All picked | Confirm dispatch | My tasks | Order Dispatched; leaves My tasks |

### Dispatch order (M9)

| From | Action | To | Result |
|---|---|---|---|
| Form | Quantity above Available | Same | Refusal with max and Use max |
| Form | Save order | List | Stock Reserved, toast "Saved" |
| Detail, nothing picked | Cancel → Confirm | List | Reserved stock back to Available |

## Assumptions & Open Questions

- [assumption] An order whose lines are all fully picked becomes Dispatched and leaves My tasks when "Confirm dispatch" is pressed; one with short lines becomes Part-dispatched and stays in My tasks until its remaining quantity is picked or the order is cancelled. This settles the open point from the user-stories review (R-01) at the design level; Functional Design confirms it.
