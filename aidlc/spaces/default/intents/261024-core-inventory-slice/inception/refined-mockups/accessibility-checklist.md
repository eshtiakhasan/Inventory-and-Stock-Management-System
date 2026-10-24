# Accessibility Checklist — Mojud core slice

Target: WCAG 2.1 AA in both light and dark themes (rough-mockups Q4; requirements NFR6; story AC1.2.6). Applies to every screen in `mockups.md`; built from the wireframes' per-screen notes, `stories.md`, `requirements.md` and the team practices (tests before each merge).

## Global

- [ ] Every page declares `lang="en"` and a unique `<title>` ("{Screen} · Mojud").
- [ ] Landmarks: `header` (app bar), `nav` (side nav), `main`; a "Skip to content" link is the first focusable element.
- [ ] One `h1` per page (the screen title); headings in order, no skipped levels.
- [ ] Every interactive element is reachable and usable by keyboard, in visual order, with a visible `focus-ring` (never `outline: none`).
- [ ] Text contrast at least 4.5:1, large text and control outlines at least 3:1, checked in both themes. `border` is decorative only; control outlines use `control-border`.
- [ ] Interactive elements at least 48px tall (`{spacing.target-min}`); floor primary buttons and steppers 64px; at least 8px between targets.
- [ ] Status is never shown by color alone: online status, task status, stock states and Issue types carry an icon and text.
- [ ] Dynamic messages (toasts, refusals, result counts) are announced through a polite live region, once per change.
- [ ] Respect `prefers-reduced-motion`: no panel slide or toast animation when reduced motion is requested.
- [ ] Page works at 200% browser zoom without loss of content (horizontal scroll below 1024px is allowed this round).

## Forms (M1, M2, M4–M9, M13)

- [ ] Every field has a visible label above it, linked by `for`/`id`; hints and errors linked with `aria-describedby`.
- [ ] Errors are text naming the field and the fix, and typed values are kept.
- [ ] Sign-in and sign-up errors appear in a `form-error-summary` that receives focus.
- [ ] Disabled buttons stay focusable with `aria-disabled="true"` and a visible reason.
- [ ] Fieldsets with legends group Units and Opening stock on the product form.

## Dialogs and Panels (side-panel, confirmation-dialog, type-code-dialog, Flag damage)

- [ ] `role="dialog"` (or `alertdialog` for confirmations) with an accessible name.
- [ ] Focus moves into the dialog on open, is trapped while open, and returns to the opener on close.
- [ ] Escape closes; confirmations start with focus on Go back.

## Tables and Lists (M4–M10, M14)

- [ ] Data tables use real `table`, `th` with `scope`, and a caption.
- [ ] Row actions are named with their row ("Deactivate Gazipur").
- [ ] Task cards are links named by the card title; task lists are `ul` lists.

## Screen-specific

| Screen | Heading (h1) | Keyboard entry point | Notes |
|---|---|---|---|
| M1 Sign up | Create your business | Business name field | Password Show toggle is a button with `aria-pressed` |
| M2 Sign in | Sign in | Phone number field | Error summary focused on failure |
| M3 Setup home | Set up {business} | First setup card | Cards are links |
| M4 Warehouses | Warehouses | Add warehouse button | — |
| M5 Users | Users | Add user button | Role select is a labelled combobox |
| M6 Products | Products | Add product button | Fieldsets for groups |
| M7 Suppliers | Suppliers | Add supplier button | — |
| M8 Purchase orders | Purchase orders | New purchase order button | Line list announces added and removed lines |
| M9 Dispatch orders | Dispatch orders | New dispatch order button | Refusal linked to the quantity field |
| M10 My tasks | My tasks | First task card | — |
| M11 Receive | Receive PO-{n} | First line | Selected line marked `aria-current="true"`; no expected quantity in any attribute |
| M12 Pick | {Order number} | First line | Progress read as "8 of 20 cartons picked"; Flag damage named with the line's product |
| M13 Flag damage | Flag damage (h2 in dialog) | Flag damage button | Reasons are a radio group |
| M14 Issues | Issues | Issues table | Caption "Open issues" |
| M15 Coming later | Your screens are coming in a later round | Sign out button | — |

## How It Is Checked

- [ ] Automated: an accessibility checker (for example axe) runs against each screen in component tests; no violations allowed at AA.
- [ ] Manual keyboard pass on each screen before the unit is approved.
- [ ] Contrast checked for both themes from the token values.

## Assumptions & Open Questions

None.
