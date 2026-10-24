# Step Card [crd-101]

**Type:** Layout
**Category:** Card (numbered step in an ordered process)
**Purpose:** Present one step of a multi-step desk flow (the Excel import steps) as a numbered card with its title, what it covers, its status, and the actions for that step.

---

## Overview

The Step Card is a calm `surface` card that carries a **step number**, an **H2 title**, a one-line **contents** description, a **status tag**, an optional **last-done line**, and the step's **actions** (for Excel import: Download template + [File Upload](./file-upload.md)). Cards are stacked in one column inside an ordered list, so the order is visible and announced, but the order is **advice, not a lock**: every card is always visible and usable unless a real data dependency blocks it, and then the card says why.

Page specs call it "import step card" ([09.3 Open Question 2](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.3-settings-excel-import/09.3-settings-excel-import.md)). The three cards on 09.3 are Products (1), Suppliers (2) and Opening stock (3).

The card is **not** one big target: it contains buttons, so the whole card is never clickable (same rule as Issue cards: buttons are never inside a tappable container).

---

## Variants

| Variant | Status tag | Extra content | Actions |
|---|---|---|---|
| **not done** (default) | "Not done yet" (2px `control-border`, `text`) | — | Download template (secondary) + File Upload, enabled |
| **done** | "Done" (solid 2px `success` border, `success` text, check icon) | Last-done line: "Last import: 48 products · 23 Oct 21:40 · Mr. Haque" | Same actions stay enabled (import more) |
| **blocked** | As not done | Visible reason in `body`, `text-muted` (e.g. "Import products first. Opening stock names products by SKU."), link to the page that fixes it when there is one | Download and Choose file as [Button Disabled](./button-disabled.md) (dashed, lock icon), focusable with the reason |
| **note** (optional, any status) | — | An extra advice line, e.g. "Add your warehouses first to get a low-stock column for each" with a link to 09.2 (Products card before any Warehouse exists) | Unchanged |

The status words come from the page (here: import). The card itself only defines the slots.

---

## States

**Required States:**

- default (not done)
- done
- blocked
- focus (inner actions)

**Optional States:**

- targeted (arrived via a link to this step)
- loading
- offline

**State Descriptions:**

| State | Appearance and behaviour |
|---|---|
| **Default** | `surface` card, 1px `border` edge, `{rounded.md}`; number badge left of the title; status tag at the title row end (wraps under the title on phone). |
| **Hover** | None on the card. Inner buttons follow their own hover. |
| **Focus** | Only the inner actions and links take focus, each with the [Focus Ring](./focus-ring.md). |
| **Done** | Status tag "Done" with check icon; last-done line under the contents line in `meta` / `meta-bn`. |
| **Blocked** | Actions disabled (dashed, lock icon), reason text visible under them; both buttons keep `aria-disabled` with the reason in their description. |
| **Targeted** | When the setup strip's "Next" link or a 04.1 checklist row points to this step (e.g. `#suppliers`), focus moves to the card's H2 (`tabindex="-1"`) and the card scrolls into view below the app bar. No highlight animation. |
| **Loading** | Skeleton card (heading line + two text lines) with `aria-busy="true"` until statuses are known; never shows a wrong "Done". |
| **Offline** | Download disabled with "Needs internet" unless the template is cached; File Upload disabled with "Needs internet". Status and last-done line show as last loaded. |

---

## Styling

### Visual Properties

**Size:**
- Card full width of the content column, max about 48rem on desktop (layout value from 09.3, not a token).
- Step number badge `{spacing.6}` (2rem) square with fully round corners (see Open Question 1).
- Status tag min 2rem (as [Task Status Tag](./task-status-tag.md)).
- Actions min `{spacing.target-min}`.

**Shape:** Card `{rounded.md}`; tag `{rounded.sm}`; badge round.

**Colors:**
- Card `{colors.surface}`, 1px `{colors.border}` edge (decorative; the card is not a control).
- Badge `{colors.surface-alt}` fill, 2px `{colors.control-border}` ring, number `{colors.text}`.
- Contents line `{colors.text-muted}`; last-done line `{colors.text-muted}`.
- Done tag `{colors.success}`; not-done tag border `{colors.control-border}`, text `{colors.text}`.
- Blocked reason `{colors.text-muted}`.

**Typography:**
- Step number `{typography.title}` (digits, `tabular-nums`).
- Title (H2) `{typography.title}`.
- Contents line `{typography.body}`.
- Last-done line `{typography.meta}` (EN) / `{typography.meta-bn}` (BN).
- Tag `{typography.body-strong}`.
- Blocked reason `{typography.body}`.

**Spacing:**
- Card padding `{spacing.5}` desktop / `{spacing.4}` phone.
- Element gap inside the card `{spacing.3}`.
- Gap between cards `{spacing.4}`.
- Badge to title `{spacing.3}`.
- Between the two actions `{spacing.3}` (≥ `{spacing.2}` minimum).

### Design Tokens

```yaml
colors:
  card-background: '{colors.surface}'          # dark: '{colors.surface-dark}'
  card-border: '{colors.border}'               # dark: '{colors.border-dark}'
  badge-background: '{colors.surface-alt}'     # dark: '{colors.surface-alt-dark}'
  badge-ring: '{colors.control-border}'        # 2px; dark: '{colors.control-border-dark}'
  badge-text: '{colors.text}'                  # dark: '{colors.text-dark}'
  secondary-text: '{colors.text-muted}'        # dark: '{colors.text-muted-dark}'
  tag-done: '{colors.success}'                 # dark: '{colors.success-dark}'
  tag-not-done-border: '{colors.control-border}' # dark: '{colors.control-border-dark}'

typography:
  number: '{typography.title}'
  title: '{typography.title}'
  contents: '{typography.body}'
  last-done-en: '{typography.meta}'
  last-done-bn: '{typography.meta-bn}'
  tag: '{typography.body-strong}'

spacing:
  padding-desktop: '{spacing.5}'
  padding-phone: '{spacing.4}'
  inner-gap: '{spacing.3}'
  card-gap: '{spacing.4}'
  badge-size: '{spacing.6}'

effects:
  card-radius: '{rounded.md}'
  badge-radius: '{rounded.full}'     # see Open Question 1
  shadow-light: 'card shadow per DESIGN.md Elevation (0 1px 2px, ~6%)'
  shadow-dark: none                   # dark mode: no shadows
  focus: '{components.focus-ring}'
```

### Figma Reference

Not applicable.

### Library Component

Not applicable.

---

## Behavior

### Interactions

**Card:** Not interactive. No click handler on the card.

**Download template:** [Button Secondary](./button-secondary.md) with download icon; downloads an `.xlsx` built for this Business now (09.3).

**File Upload:** See [File Upload](./file-upload.md); choosing a file opens the page's preview.

**Status update:** After a confirmed import the page returns to the cards with this card in the done variant and the last-done line filled in.

**Blocked → unblocked:** When the dependency is met (Products exist), the opening stock card's actions become enabled on the next load; no animation.

**Keyboard:** Tab through the card's links and buttons in reading order.

### Animations

None.

---

## Responsive Behaviour

| Width | Behaviour |
|---|---|
| **Phone, 320–599px** | Card full width; title row: badge + title, status tag wraps under the title; actions stacked full width (Download, then Choose file); hint under the button; no drop zone. |
| **Tablet / desktop, ≥ 600px** | Card up to 48rem wide in one column; tag at the right of the title row; Download button on its own row above the drop zone (09.3 desktop sketch). |
| **200% text / 400% zoom** | Everything wraps; badge keeps its size; tag wraps under the title. |

---

## Accessibility

**ARIA Attributes:**
- Cards in an `ol` (one `li` per step), each `li` contains a `section` labelled by its H2.
- H2 accessible name includes the step: "Step 1, Products" ("ধাপ 1, পণ্য" [BN: verify]); the visible badge number is `aria-hidden="true"` so the number is not read twice.
- Status tag: plain text inside the section (not a control).
- Blocked actions: `aria-disabled="true"` + `aria-describedby` the reason.
- H2 has `tabindex="-1"` so links to a step can move focus there.

**Keyboard Support:**
- Tab / Shift+Tab: inner actions and links.
- Enter / Space: activate.

**Screen Reader:**
"List, 3 items. Step 1, Products, heading level 2. Name, alternate names, SKU, category, units, barcodes, low-stock thresholds. Not done yet. Download Products template, button. Choose file, button."

**Never color alone:** status is a word, plus a check icon when done; blocked is dashed + lock icon + reason text.

**Targets:** every action ≥ `{spacing.target-min}`, `{spacing.3}` apart.

---

## Content Rules

- One language per User. Titles are nouns ("Products"); the contents line lists what the step covers in plain words.
- Western digits in step numbers, counts, dates and times.
- Names in the last-done line exactly as entered.
- No glyphs; the step number is text in a shape, never a glyph character such as a circled digit.

| Translation Key | BN | EN | Source |
|---|---|---|---|
| `import.step.products.title` / `.suppliers.title` / `.openingStock.title` | "পণ্য" / "সরবরাহকারী" / "প্রারম্ভিক মজুদ" | "Products" / "Suppliers" / "Opening stock" | 09.3 |
| `import.step.products.contents` | "নাম, অন্য নাম, SKU, ক্যাটাগরি, একক, বারকোড, কম মজুদের সীমা।" [BN: verify] | "Name, alternate names, SKU, category, units, barcodes, low-stock thresholds." | 09.3 |
| `import.step.suppliers.contents` | "নাম, যোগাযোগের ব্যক্তি, ফোন, ঠিকানা।" [BN: verify] | "Name, contact person, phone, address." | 09.3 |
| `import.step.openingStock.contents` | "প্রতিটি গুদামে প্রতিটি পণ্যের পরিমাণ ও একক মূল্য।" [BN: verify] | "Quantity and unit cost of each product at each warehouse." | 09.3 |
| `import.status.notYet` / `import.status.done` | "এখনও হয়নি" [BN: verify] / "হয়েছে" [BN: verify] | "Not done yet" / "Done" | 09.3 |
| `import.lastImport` | "শেষবার: {n}টি {thing} · {date} {time} · {name}" [BN: verify] | "Last import: {n} {things} · {date} {time} · {name}" | 09.3 |
| `import.download.products` / `.suppliers` / `.openingStock` | "পণ্যের টেমপ্লেট ডাউনলোড করুন" / "সরবরাহকারীর টেমপ্লেট ডাউনলোড করুন" / "প্রারম্ভিক মজুদের টেমপ্লেট ডাউনলোড করুন" [BN: verify] | "Download Products template" / "Download Suppliers template" / "Download opening stock template" | 09.3 |
| `import.openingStock.needsProducts` | "আগে পণ্য আনুন। প্রারম্ভিক মজুদে পণ্যের নাম SKU দিয়ে লেখা হয়।" [BN: verify] | "Import products first. Opening stock names products by SKU." | 09.3 |
| `import.openingStock.needsWarehouses` | "আগে একটি গুদাম যোগ করুন।" [BN: verify] | "Add a warehouse first." | 09.3 |
| `import.orderNote` (above the list) | "এই ক্রমে আনুন। প্রারম্ভিক মজুদের জন্য আগে পণ্য থাকতে হবে।" [BN: verify] | "Import in this order. Opening stock needs your products to exist first." | 09.3 |
| `stepCard.stepLabel` (new key, H2 prefix) | "ধাপ {n}, {title}" [BN: verify] | "Step {n}, {title}" | new (09.3 states the name, no key) |

---

## Usage

### When to Use

- A short, ordered set (2 to 5) of independent steps on one desk page, each with its own actions and status.

### When Not to Use

- Cross-page onboarding progress: use [Setup Checklist](./setup-checklist.md).
- Floor task lists: use [Task Card](./task-card.md).
- Wizards that must lock order: Mojud has none in v1; do not fake a lock with this card.

### Best Practices

- Always show all steps; explain blocks with a reason, never hide the step.
- Keep each card to one job; long previews go on their own view.
- Put the order rationale once, above the list (09.3 order note), not in every card.

---

## Used on Pages

**Pages:** 1

- [09.3 Settings: Excel import](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.3-settings-excel-import/09.3-settings-excel-import.md) — `settings-import-steps`, `settings-import-step-{type}` (products, suppliers, opening-stock), `settings-import-step-status`, `settings-import-step-last`, `settings-import-step-download`, `settings-import-step-opening-blocked`.

Entry links that target a card: [04.1 Owner view](../../C-UX-Scenarios/04-haque-traces-an-unexplained-loss/04.1-owner-view/04.1-owner-view.md) checklist steps 2 and 4; the 09.2 / 09.4 setup strip "Next" link.

---

## Related Components

- [File Upload](./file-upload.md) — the main action inside each card.
- [Task Status Tag](./task-status-tag.md) — look of the status tag.
- [Button Secondary](./button-secondary.md) / [Button Disabled](./button-disabled.md) — Download and blocked actions.
- [Setup Checklist](./setup-checklist.md) — links into these cards.

---

## Open Questions

| # | Question | Context | Status |
|---|---|---|---|
| 1 | Step number badge shape: 09.3 specifies a 2rem **circle**, but DESIGN.md → Shapes reserves `{rounded.full}` for Stock-state pills and the count badge only | Spec vs DESIGN.md conflict; alternative is a `{rounded.sm}` square badge | 🔴 Open |
| 2 | Status "Done" counts confirmed imports only, while 04.1 marks the Products step Done for any Product (typed or imported); the two can disagree on screen | Spec inconsistency 09.3 vs 04.1 | 🟢 Resolved: "Done" means at least one record exists (typed or imported), the same server flag as the 04.1 checklist; 09.3 updated |
| 3 | Reuse for other multi-step desk flows (none in v1 besides import)? Keep the generic slot names so it can be reused | Future use | 🔴 Open |
| 4 | Card edge uses decorative `border` (2.5:1); acceptable because the card is not a control, per DESIGN.md | Confirm with accessibility review | 🔴 Open |

**Status Legend:** 🔴 Open | 🟡 In Discussion | 🟢 Resolved

---

## Version History

**Created:** 2026-10-24
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created component (WDS Phase 7, new; from 09.3 Open Question 2).
