# Refined Mockups — Questions

> Context: the wireframes (`ideation/rough-mockups/wireframes.md`) and user flows define this round's 14 screens as changes against your UX design. Your design system in `design-process/D-Design-System/` already specifies tokens (`design-tokens.md`, Jamdani Teal, light and dark) and about 40 components (buttons, quantity entry, task card, data table, side nav, confirmation dialog, toast and more). The stories (`stories.md`) and requirements set the behaviour. Screen states (loading, empty, error) and WCAG 2.1 AA are already decided in EXPERIENCE.md and the earlier answers, so they are not asked again.

## Q1. How should the design system's components be built in React?

Your UX docs say no component library was chosen and that the design tokens override any library defaults.

A. Build our own small set of React components from your design system specs, with the tokens as CSS variables; no outside UI library
B. Use a ready-made, accessible component library (for example Radix or MUI), styled with your tokens
C. Use a utility CSS framework (for example Tailwind) configured with your tokens, plus our own components
D. Not yet defined
X. Other (please specify)

[Answer]: A

## Q2. How detailed should the refined mockups be?

The receiving and picking screens already have HTML mockups (`mockups/key-receiving.html`, `key-picking.html`).

A. Written mockups: each screen's layout, components and states described against your design system and existing HTML mockups; no new HTML files
B. New HTML mockups for the screens that are new or changed this round (Setup home, settings lists, purchase orders, dispatch orders, Issues list, desktop pick and Flag damage form)
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q3. What desktop sizes should the layout target?

Phone layouts come in a later round.

A. Designed at 1280px wide; works from 1024px up; content limited to about 1200px wide on larger screens
B. Designed at 1440px wide only
C. Works from 768px (tablet) up
D. Not yet defined
X. Other (please specify)

[Answer]: A

## Q4. On the setup screens (warehouses, users, products, suppliers), how should adding and editing work?

A. A list with a side panel that opens for add or edit, as in the wireframes
B. A list, and a separate page for each add or edit
C. A list, and a pop-up dialog for add or edit
D. Not yet defined
X. Other (please specify)

[Answer]: A

## Consolidated Summary Confirmation

- Components (Q1): our own small set of React components built from your design system specs, with the design tokens as CSS variables; no outside UI library.
- Detail (Q2): written mockups describing each screen's layout, components and states against your design system and existing HTML mockups; no new HTML files.
- Sizes (Q3): designed at 1280px wide, working from 1024px up, with content limited to about 1200px wide on larger screens.
- Setup forms (Q4): a list with a side panel that opens for add or edit.

Does this all look correct before I generate the artifact?

- Looks correct
- Request changes

[Answer]: Looks correct
