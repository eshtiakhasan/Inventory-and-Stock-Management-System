# Setup Checklist [lst-101]

**Type:** Navigation
**Category:** Progress list (first-use onboarding)
**Purpose:** Guide a new Business's Owner or Manager through the five setup steps (Warehouses, Products, Suppliers, opening stock, Users) and show which are done, from the Owner view and from every Settings page.

---

## Overview

A new Business has no stock, so the Owner view has nothing to show. The Setup Checklist replaces the Owner view tiles with a short ordered list of setup steps, each a link to the Settings page that does it, with a Done / Not done yet tag (EXPERIENCE.md → State Patterns → First use; UJ-8 step 3). While setup is in progress, every Settings page and Excel import shows the same progress in a compact **setup strip** so the Owner can carry on to the next step without hunting.

Both variants read the same server flags so they always agree ([09.2 Technical Notes](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.2-settings-warehouses/09.2-settings-warehouses.md)):

- Step order: **1 Warehouses → 2 Products → 3 Suppliers → 4 Opening stock → 5 Users** [ASSUMPTION in EXPERIENCE.md UJ-8].
- A step is **Done** when at least one record of that kind exists.
- **First use ends** when opening stock exists; then the checklist and every strip disappear for good and the tiles show (04.1 Open Question 7).

Page specs call the strip "setup strip" (09.2 Open Question 3); the full list is `owner-view-first-use` on 04.1.

---

## Variants

| Variant | Where | Anatomy |
|---|---|---|
| **full checklist** (default) | [04.1 Owner view](../../C-UX-Scenarios/04-haque-traces-an-unexplained-loss/04.1-owner-view/04.1-owner-view.md), in place of the tiles | Card: H2 "Set up your business", one body sentence, then an ordered list of 5 step rows. Each row: step label (link), chevron-right, status tag on the right. Step 2 also carries a sibling text link "or add one by one" (to 09.4) |
| **strip** (compact) | Settings pages 09.2–09.6 and Excel import 09.3, under the section nav | `surface-alt` band, info icon: "Setting up · step {n} of 5" in `body-strong`, then two text links: "Next: {next step}" and "Back to setup list". One line when it fits, wraps otherwise |
| **read-only message** | 04.1 for the Accountant (cannot change settings, FR-4) | One `body` sentence, no list, no links: "The Owner or Manager is still setting up the business. The figures will show here after that." |

Owner and Manager see the same checklist and strip (FR-4: both manage settings). Other Roles never see either.

---

## States

**Required States:**

- default (no steps done)
- in progress (some steps done)
- step done
- hover / focus (step links)
- finished (component removed)

**Optional States:**

- loading
- offline
- error (status unavailable)

**State Descriptions:**

| State | Appearance and behaviour |
|---|---|
| **Default (nothing done)** | Straight after sign-up: all five tags "Not done yet" (2px `control-border`, `text`, no icon). Strip: "Setting up · step 1 of 5 · Next: Import products from Excel" on 09.2. |
| **In progress** | Done steps show the "Done" tag (solid 2px `success` border, `success` text, check icon); the others "Not done yet". Rows stay links in both cases (a Done step can still be opened to add more). |
| **Step done (live)** | When a record is saved on a Settings page, the strip's "Next" link updates to the first not-done step after this page's step, and the change is announced politely once. |
| **Hover** | Step label / strip links underline in `primary`. |
| **Focus** | Two-tone [Focus Ring](./focus-ring.md) around the focused row link or strip link. |
| **Finished** | Opening stock exists: the checklist is replaced by the Owner view tiles; strips are no longer rendered on any page. No celebration (State Patterns: plain). |
| **Loading** | Owner view: skeleton rows in the shape of the 5 steps (`aria-busy="true"`). Strip: not shown until its data is known (it must never flash and disappear). |
| **Offline** | Statuses as last loaded; links still navigate; Settings pages show their own "Needs internet" reasons (settings need a connection). No offline label inside the component. |
| **Error (status unavailable)** | Steps render as links without tags; no wrong "Done" is ever shown. The page's own load error sentence covers the failure. |

There is no disabled state: steps are advice, not locks. Step order is never enforced by the checklist (09.3 enforces its own data dependency for opening stock).

---

## Styling

### Visual Properties

**Size:** Step rows min `{spacing.target-min}`; strip links min `{spacing.target-min}` tall each; status tag min 2rem (as [Task Status Tag](./task-status-tag.md)).

**Shape:** Full checklist card `{rounded.md}`; strip band `{rounded.md}`; status tags `{rounded.sm}`.

**Colors:**
- Card `{colors.surface}`, 1px `{colors.border}` edge; step dividers `{colors.border}`.
- Strip band `{colors.surface-alt}`; info icon `{colors.info}`; text `{colors.text}`.
- Step and strip links `{colors.primary}` (7.2:1 on `surface-alt` light, 9.1:1 dark).
- Done tag: `{colors.success}` text and 2px solid `{colors.success}` border, check icon.
- Not done yet tag: `{colors.text}` text, 2px `{colors.control-border}` border.
- Chevron `{colors.text-muted}`.

**Typography:**
- Card heading `{typography.headline}` (H2).
- Card body `{typography.body}`.
- Step labels `{typography.body-strong}`; "or add one by one" `{typography.body}`.
- Strip progress `{typography.body-strong}`; strip links `{typography.body}`.
- Tags `{typography.body-strong}`.

**Spacing:**
- Card padding `{spacing.4}` phone / `{spacing.5}` desktop; element gap `{spacing.3}`; step rows flush with dividers.
- Strip padding `{spacing.3}` vertical, `{spacing.4}` horizontal; icon to text `{spacing.2}`; gap between strip links ≥ `{spacing.2}`.
- Strip sits `{spacing.5}` above the page's next section (09.2 section gap).

### Design Tokens

```yaml
colors:
  card-background: '{colors.surface}'          # dark: '{colors.surface-dark}'
  card-border: '{colors.border}'               # dark: '{colors.border-dark}'
  divider: '{colors.border}'                   # dark: '{colors.border-dark}'
  strip-background: '{colors.surface-alt}'     # dark: '{colors.surface-alt-dark}'
  strip-icon: '{colors.info}'                  # dark: '{colors.info-dark}'
  text: '{colors.text}'                        # dark: '{colors.text-dark}'
  link: '{colors.primary}'                     # dark: '{colors.primary-dark}'
  chevron: '{colors.text-muted}'               # dark: '{colors.text-muted-dark}'
  tag-done: '{colors.success}'                 # text + 2px solid border; dark: '{colors.success-dark}'
  tag-not-done-border: '{colors.control-border}' # dark: '{colors.control-border-dark}'

typography:
  heading: '{typography.headline}'
  body: '{typography.body}'
  step-label: '{typography.body-strong}'
  strip-progress: '{typography.body-strong}'
  strip-link: '{typography.body}'
  tag: '{typography.body-strong}'

spacing:
  row-min-height: '{spacing.target-min}'
  card-padding-phone: '{spacing.4}'
  card-padding-desktop: '{spacing.5}'
  strip-padding-y: '{spacing.3}'
  strip-padding-x: '{spacing.4}'

effects:
  card-radius: '{rounded.md}'
  strip-radius: '{rounded.md}'
  tag-radius: '{rounded.sm}'
  shadow-light: 'card shadow per DESIGN.md Elevation (0 1px 2px, ~6%)'
  shadow-dark: none
  focus: '{components.focus-ring}'
```

### Figma Reference

Not applicable.

### Library Component

Not applicable.

---

## Behavior

### Interactions

**Step row (full checklist):** The step label is the link (row min 48px, chevron decorative). It opens the step's page: 1 → 09.2 Warehouses; 2 → 09.3 Excel import (Products card); 3 → 09.5 Suppliers; 4 → 09.3 Excel import (opening stock card); 5 → 09.6 Users. Step 2's "or add one by one" is a **sibling** text link to 09.4, never nested inside the row link.

**Strip "Next: {step}":** Goes to the first step after this page's step that is not Done. On 09.2 after the first Warehouse is saved it reads "Next: Import products from Excel" (scenario exit). Where the next step lives on the same page (09.3 → Suppliers card), the link targets that card and focus moves to the card's H2 [ASSUMPTION in 09.3].

**Strip "Back to setup list":** Goes to 04.1 Owner view (first-use state).

**Strip {n}:** This page's step number in the 04.1 order (Warehouses 1, Products 2, Suppliers 3, opening stock 4, Users 5). A page that serves two steps (09.3: Products and opening stock) shows the first of its steps that is not Done.

**Not sticky:** The strip scrolls with content; it is never fixed.

**Keyboard:** Tab through links in reading order; Enter follows.

### Animations

None. Tags change state without animation; the strip disappears without transition when first use ends.

---

## Responsive Behaviour

| Width | Behaviour |
|---|---|
| **Phone, 320–599px** | Full checklist card full width in the Owner view column. Strip under the H1 (no section nav row on phone); its three parts stack on separate lines (progress, Next, Back to setup list), as in the 09.2 phone sketch. Tags wrap under the step label if they do not fit. |
| **Tablet and desktop, ≥ 600px** | Checklist card in the Owner view content area (one column). Strip on one line with " · " separators when it fits (09.3 desktop), otherwise on up to three lines (09.2 desktop). |
| **200% text / 400% zoom** | Everything wraps; links keep 48px targets; no clipping. |

---

## Accessibility

**ARIA Attributes:**
- Full checklist: `section` labelled by its H2; steps in an `ol` (order matters).
- Each step link's accessible name includes the step and its status: "Step 2, Import products from Excel, Not done yet". The status tag text is inside or referenced by the link (`aria-describedby`); the tag itself is display only.
- Strip: `section` with `aria-label="Setup progress"` ("সেট আপের অগ্রগতি" [BN: verify]); not a live region.
- Info icon, chevrons and check icons: inline SVG `aria-hidden="true"`.

**Keyboard Support:**
- Tab / Shift+Tab: move between step links (and the sibling "or add one by one" link).
- Enter: open the step.

**Screen Reader:**
"Set up your business, heading level 2 … list, 5 items. Step 1, Add warehouses, Done, link." When a save changes the strip's Next step, the polite region (`role="status"`) announces the new "Next: …" once.

**Never color alone:** Done = check icon + word "Done" + solid border; Not done yet = word only, no color meaning.

**Targets:** Every link ≥ `{spacing.target-min}`; `{spacing.2}` between the step row link and the sibling link.

---

## Content Rules

- One language per User. Step names are verbs + nouns ("Add warehouses").
- Western digits in "step 2 of 5".
- No glyphs; use " · " (middle dot with spaces) as the separator, as the page specs do.
- No celebration copy when finished.

| Translation Key | BN | EN | Source |
|---|---|---|---|
| `owner.firstUse.heading` | "আপনার ব্যবসা সেট আপ করুন" [BN: verify] | "Set up your business" | 04.1 |
| `owner.firstUse.body` | "গুদাম, পণ্য আর প্রারম্ভিক মজুদ যোগ করলে মজুদের মূল্য ও ক্ষতি এখানে দেখা যাবে।" [BN: verify] | "Add your warehouses, products and opening stock. Your stock value and losses will show here." | 04.1 |
| `owner.firstUse.step.warehouses` | "গুদাম যোগ করুন" | "Add warehouses" | 04.1 |
| `owner.firstUse.step.products` | "Excel থেকে পণ্য আনুন" [BN: verify] | "Import products from Excel" | 04.1 |
| `owner.firstUse.step.productsManual` | "অথবা একটি একটি করে যোগ করুন" [BN: verify] | "or add one by one" | 04.1 |
| `owner.firstUse.step.suppliers` | "সরবরাহকারী যোগ করুন" | "Add suppliers" | 04.1 |
| `owner.firstUse.step.openingStock` | "প্রারম্ভিক মজুদ যোগ করুন" | "Add opening stock" | 04.1 |
| `owner.firstUse.step.users` | "ব্যবহারকারী যোগ করুন" [BN: verify] | "Add users" | 04.1 |
| `common.done` | "সম্পন্ন" | "Done" | 04.1 |
| `owner.firstUse.notDone` | "এখনও হয়নি" [BN: verify] | "Not done yet" | 04.1 |
| `owner.firstUse.accountant` | "মালিক বা ম্যানেজার এখনও ব্যবসা সেট আপ করছেন। এরপর হিসাব এখানে দেখা যাবে।" [BN: verify] | "The Owner or Manager is still setting up the business. The figures will show here after that." | 04.1 |
| `settings.setup.progress` | "সেট আপ চলছে · ধাপ {n}/5" [BN: verify] | "Setting up · step {n} of 5" | 09.2 |
| `settings.setup.next` | "এরপর: {step}" [BN: verify] | "Next: {step}" | 09.2 |
| `settings.setup.backToList` | "সেট আপের তালিকায় ফিরুন" [BN: verify] | "Back to setup list" | 09.2 |
| `settings.setup.regionLabel` (new key) | "সেট আপের অগ্রগতি" [BN: verify] | "Setup progress" | new |

---

## Usage

### When to Use

- First use of a new Business, on the Owner view (full) and on the pages that do setup work (strip).

### When Not to Use

- Ongoing to-do lists or tasks: floor work uses [Task Card](./task-card.md) in My tasks.
- Multi-step flows inside one page: use [Step Card](./step-card.md).
- Moving between Settings sections: use [Section Nav](./section-nav.md).

### Best Practices

- Keep the same order and Done rule in both variants (one server source).
- Never lock a step; explain data dependencies on the target page instead.
- Remove the component entirely when first use ends; do not leave a "100%" state behind.

---

## Used on Pages

**Pages:** 6

- [04.1 Owner view](../../C-UX-Scenarios/04-haque-traces-an-unexplained-loss/04.1-owner-view/04.1-owner-view.md) — `owner-view-first-use` (full checklist), `owner-view-first-use-accountant` (read-only message).
- [09.2 Settings: Warehouses](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.2-settings-warehouses/09.2-settings-warehouses.md) — `settings-layout-setup-strip` (step 1; defines the strip).
- [09.3 Settings: Excel import](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.3-settings-excel-import/09.3-settings-excel-import.md) — `settings-import-setup-strip` (steps 2 and 4).
- [09.4 Settings: Products](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.4-settings-products/09.4-settings-products.md) — `settings-products-setup-strip` (step 2).
- [09.5 Settings: Suppliers](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.5-settings-suppliers/09.5-settings-suppliers.md) — strip (step 3).
- [09.6 Settings: Users](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.6-settings-users/09.6-settings-users.md) — strip (step 5).

---

## Related Components

- [Task Status Tag](./task-status-tag.md) — look of the Done / Not done yet tags.
- [Section Nav](./section-nav.md) — sits directly above the strip on Settings pages.
- [Step Card](./step-card.md) — Excel import cards targeted by steps 2 and 4.
- [Owner Metric Tile](./owner-metric-tile.md) — what replaces the checklist when first use ends.

---

## Open Questions

| # | Question | Context | Status |
|---|---|---|---|
| 1 | When does first use end, and is "one record exists" the right Done rule? | 04.1 Open Question 7; EXPERIENCE.md [ASSUMPTION] on copy and step order | 🔴 Open |
| 2 | Two different "done" ideas for Products: the checklist step is Done when any Product exists (typed or imported); 09.3's step card says "Imported" only after a confirmed import | Spec inconsistency between 04.1 and 09.3 (intentional per 09.3, but the two can disagree on screen) | 🟢 Resolved: one meaning of "Done" (record exists, typed or imported) in 04.1 and 09.3 |
| 3 | Strip on 09.3 serves two steps (2 and 4) and its "Next: Add suppliers" link targets 09.3's card 2, while the checklist's step 3 targets 09.5 | 09.3 [ASSUMPTION]; same step, two destinations | 🔴 Open |
| 4 | Scenario 09 goes 09.5 then 09.6, but step 4 (opening stock) sits between them in the checklist order | 09.5 Open Question 3 | 🔴 Open |
| 5 | Should Done tags in the checklist be non-interactive text inside the link, or outside it as a sibling? This file keeps them inside the row (display only) | Avoids nested interactive elements either way | 🔴 Open |
| 6 | Strip info icon color: `info` is used here; DESIGN.md does not name an icon color for notices | Token use check | 🔴 Open |

**Status Legend:** 🔴 Open | 🟡 In Discussion | 🟢 Resolved

---

## Version History

**Created:** 2026-10-24
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created component (WDS Phase 7, new; from 09.2 Open Question 3 and 04.1 first-use section).
