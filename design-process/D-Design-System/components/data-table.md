# Data Table [tbl-101]

**Type:** Content
**Category:** Table / list (desk data)
**Purpose:** Show a list of records on desk surfaces as a real table on wide screens and as stacked two-line rows on phones, with one link per row that opens the record.

---

## Overview

The Data Table is the desk list used by Settings, Purchase orders, Dispatch orders, Transfers (desk roles) and Low stock. Page specs call it "settings list" ([09.2 → Shared Settings layout](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.2-settings-warehouses/09.2-settings-warehouses.md), Open Question 2 there). It is calm and flat (Calm Professional): rows on `surface`, hairline dividers, no zebra stripes, no shadows.

- **At 600px and wider** it renders as a semantic `<table>` with column headers. The record's name sits in a row-header cell and is the only link in the row.
- **Below 600px** (and inside a narrow list column of a list + detail layout) the same records render as **stacked two-line rows**: name on line 1, facts on line 2, still one link per row.

Use it for finite, ranked or sorted lists that people scan and open. It is not a spreadsheet: no inline editing (use [Line-item Editor](./line-item-editor.md)), no sorting controls in v1, no infinite scroll.

---

## Variants

| Variant | What changes | Pages |
|---|---|---|
| **navigable** (default) | Name cell / whole stacked row is a link to the record's detail or edit form; chevron-right (decorative) at the row end | 09.2, 09.4, 09.5, 09.6, 09.7 list, 07.3 list, 05.1 desk layout, 04.2 |
| **read-only** | No links, no chevron; rows are plain text. Used for previews and detail breakdowns | 09.3 preview "Rows ready to import", 09.7 PO detail "Lines" |
| **selectable (list + detail)** | Navigable, plus the row whose record is open in the detail panel is marked **selected** | 09.2–09.6 desktop, 09.7 and 07.3 desktop list |
| **grouped** | One table per group, each under an H2 (e.g. one per Warehouse in 04.2); or a collapsible group of rows behind a disclosure button (09.2 "Deactivated warehouses ({n})") | 04.2, 09.2 |
| **two-line row density** | Row min height `{spacing.target-floor}` because every row carries two lines (PO and Dispatch order rows, Low stock phone cards) | 09.7, 07.3, 04.2 |

Status inside a row always uses the [Task Status Tag](./task-status-tag.md) look (display only, icon + word). Quantities inside rows follow the unit rules in Content rules below.

---

## States

**Required States:**

- default
- hover (row link)
- focus (row link)
- selected (selectable variant)
- loading
- empty
- empty (filtered / no search result)
- error (load failed)
- offline

**Optional States:**

- show more (long lists)
- collapsed / expanded group (grouped variant)
- view-only row (row the User may read but not change)

**State Descriptions:**

| State | Appearance and behaviour |
|---|---|
| **Default** | Rows on `surface`, 1px `border` divider between rows, header row (table mode) in `body-strong` `text-muted`. Name in `title`; facts in `body` (table) or `meta` / `meta-bn` (stacked). |
| **Hover** (pointer) | The name link gets an underline in `primary`. The whole row may take a `surface-alt` fill as a pointer hint; the fill never carries meaning on its own. |
| **Focus** (keyboard) | Two-tone [Focus Ring](./focus-ring.md) on the name link (`:focus-visible` only). In stacked mode the link spans the whole row, so the ring outlines the whole row. |
| **Selected** | 4px `primary` left bar + `surface-alt` fill + visually hidden text "Selected" (09.2 Shared Settings layout). Distinct from focus (focus ring never uses `primary`). Only one row selected at a time. |
| **Loading** | Skeleton rows in the shape of the content (2 rows on short lists, as in 09.2), region marked `aria-busy="true"`. If data was loaded before, it shows at once with "as of HH:MM" instead of skeletons. Never a blank area. |
| **Empty** | The table is replaced by one sentence in `body` saying what will appear here; the page's create button stays in the toolbar (EXPERIENCE.md → State Patterns → Empty lists). |
| **Empty, filtered** | One sentence naming the filter or query ("No purchase orders match this filter.", "No supplier found for '{q}'") + the create button when the Role can create. |
| **Error** | Sentence "Couldn't load {things}. Try again." in `body` + [Button Secondary](./button-secondary.md) "Try again". Rows already shown stay. |
| **Offline** | Last loaded rows stay readable with an "as of HH:MM (offline)" line above the table; never-loaded data shows "Not on this phone yet — connect to look it up." Row links still open cached records; actions in the detail are disabled with "Needs internet". |
| **Show more** | After 30 rows (orders lists) or 50 rows (import preview), a [Button Secondary](./button-secondary.md) "Show more" loads the next batch. Focus moves to the first new row. No infinite scroll (EXPERIENCE.md → Banned). |
| **Group collapsed / expanded** | Disclosure button (min `{spacing.target-min}`, chevron, `aria-expanded`) above the group; collapsed by default; hidden entirely when the group is empty. |
| **View-only row** | Same row, opens a read-only detail. No visual difference in the list. |

There is no disabled state for the table itself. A row the Role must not see is not rendered (FR-4: hidden, not disabled).

---

## Styling

### Visual Properties

**Size:**
- Row min height `{spacing.target-min}` (48px) for one-line rows; `{spacing.target-floor}` (64px) for two-line rows.
- Header row min height `{spacing.target-min}`.
- Max content width for read tables on desktop about 56rem so columns stay readable (04.2 [ASSUMPTION]; not a token).

**Shape:** No outer radius on the table; when a table sits inside a card the card supplies `{rounded.md}`.

**Colors:**
- Row background `{colors.surface}`; selected row `{colors.surface-alt}`.
- Dividers `{colors.border}` (decorative only, correct use of `border`).
- Header text `{colors.text-muted}`; cell text `{colors.text}`; secondary facts `{colors.text-muted}`.
- Name link `{colors.primary}` text in navigable variant (8.1:1 on `surface`, 7.2:1 on `surface-alt`); `{colors.text}` in read-only variant.
- Selected bar `{colors.primary}`.

**Typography:**
- Column header `{typography.body-strong}`, `text-muted` (see Open Question 1).
- Name / row header `{typography.title}`.
- Cells `{typography.body}` (table mode); second line `{typography.meta}` in English, `{typography.meta-bn}` in Bangla (stacked mode).
- Numbers, dates, quantities and taka use `font-variant-numeric: tabular-nums`; numeric columns right-aligned.

**Spacing:**
- Cell / row padding `{spacing.3}` vertical, `{spacing.4}` horizontal (09.2); 04.2 read table uses `{spacing.2}` vertical, `{spacing.3}` horizontal.
- Rows flush, separated only by the 1px divider.
- Gap from table to "Show more" `{spacing.3}`.

### Design Tokens

```yaml
colors:
  row-background: '{colors.surface}'            # dark: '{colors.surface-dark}'
  row-selected-background: '{colors.surface-alt}' # dark: '{colors.surface-alt-dark}'
  row-selected-bar: '{colors.primary}'          # 4px left bar; dark: '{colors.primary-dark}'
  divider: '{colors.border}'                    # dark: '{colors.border-dark}'
  header-text: '{colors.text-muted}'            # dark: '{colors.text-muted-dark}'
  cell-text: '{colors.text}'                    # dark: '{colors.text-dark}'
  fact-text: '{colors.text-muted}'              # dark: '{colors.text-muted-dark}'
  name-link: '{colors.primary}'                 # dark: '{colors.primary-dark}'
  skeleton: '{colors.surface-alt}'              # dark: '{colors.surface-alt-dark}' (see Open Question 4)

typography:
  header: '{typography.body-strong}'
  name: '{typography.title}'
  cell: '{typography.body}'
  fact-en: '{typography.meta}'
  fact-bn: '{typography.meta-bn}'

spacing:
  row-min-height: '{spacing.target-min}'
  row-min-height-two-line: '{spacing.target-floor}'
  cell-padding-y: '{spacing.3}'
  cell-padding-x: '{spacing.4}'

effects:
  shadow: none            # light and dark; hierarchy from tone and dividers
  focus: '{components.focus-ring}'
```

### Figma Reference

Not applicable (no Figma file; DESIGN.md is the source).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

**Click / tap:** On the name link (table mode) or anywhere on the stacked row (stacked mode) opens the record: on desktop list + detail layouts it opens the right-hand detail panel and marks the row selected; on tablet and phone it opens the detail as its own full-screen view (a real history entry). Back returns to the list with scroll position and filters kept.

**Hover:** Underline on the name link; optional `surface-alt` row fill (pointer only).

**Focus:** One tab stop per row (the link). Cells are not focusable.

**Keyboard:** Tab / Shift+Tab move between row links; Enter opens. No arrow-key grid navigation (this is a list of links, not a data grid).

**Sorting:** Fixed per page (for example open orders by date soonest first, Products by name, low stock out-of-stock first). No sort controls in v1 (04.2 Technical Notes).

**After a save in the detail:** The edited row updates in place; focus returns to that row's link (or the new row after an add). After a removal (deactivate, archive, decided) focus moves to the next row and the change is announced politely.

### Animations

None. Rows appear without slide-ins; any hover fill change is instant or at most 150ms and is removed under `prefers-reduced-motion`.

---

## Responsive Behaviour

| Width | Layout |
|---|---|
| **Phone, 320–599px** (360px design width) | Stacked rows, one `ul` of row links. Line 1: name in `title` (+ status tag right, wraps under the name if it does not fit). Line 2: facts joined with " · " in `meta` / `meta-bn`. Row min height `{spacing.target-floor}` when two lines. No column headers. Never scrolls sideways. |
| **Tablet, 600–1023px** | Real `<table>` with headers when the list has the full content width; stacked rows when the list sits in a narrow column beside a detail view. |
| **Desktop, ≥ 1024px** | Real `<table>` in full-width pages (09.4, 04.2, 09.3 preview). In list + detail pages the list column (min 22rem) uses stacked two-line rows and the detail opens in the right panel (09.7, 07.3); Settings pages (09.2) keep the table with the detail panel beside it. |
| **Reflow (400% zoom, 320 CSS px)** | Table switches to stacked rows; long Bangla labels and file or product names wrap (`overflow-wrap: anywhere` for file names). |

---

## Accessibility

**ARIA Attributes:**
- Table mode: native `<table>` labelled by the section H2 (`aria-labelledby`) or a `<caption>`; `th scope="col"` for headers; the name cell is `th scope="row"` containing the link.
- Stacked mode: `ul` / `li`, each `li` holds one `<a>` whose accessible name carries the whole row: e.g. "DO-1043, Molla Store, Open, Narayanganj, required 24 October, Rice 25 kg 32 cartons" (07.3).
- Selected row: visually hidden "Selected" text inside the link (09.2). [Open Question 3: also `aria-current="true"`.]
- Loading: `aria-busy="true"` on the list region.
- Group disclosure: `button` with `aria-expanded` and `aria-controls`.
- Chevrons and status icons: inline SVG `aria-hidden="true"`; the status word is text.

**Keyboard Support:**
- Tab: next row link; Shift+Tab: previous.
- Enter: open the record.
- Space / Enter on a group disclosure: expand / collapse.

**Screen Reader:**
Announces the table name, column count and, per row, the row header link then each cell with its column header. In stacked mode each row is one link with the full sentence. Changes after a save or removal are announced in the page's polite live region (`role="status"`), once.

**Never color alone:** status is icon + word; selection is bar + fill + hidden text; low / out-of-stock is icon + text (04.2).

**Targets:** every row link ≥ `{spacing.target-min}`; adjacent targets ≥ `{spacing.2}` apart. Only one interactive element per row; buttons never sit inside a row link (sibling only, as the refused sync chip in 05.1).

---

## Content Rules

- Language: one language per User (desk surface, no bilingual parts). `lang` comes from the page; user-entered names are not marked.
- **Names exactly as entered** (Products, Suppliers, Warehouses, Users, customers), never translated (FR-45). Product rows matched by an Alternate name show "Also called: {altName}" / "অন্য নাম: {names}" [BN: verify] under the name (DD-10; key `import.col.altNames`).
- **Western digits (0–9)** in both languages; `tabular-nums`.
- **Quantities as units**, never raw base counts: "40 ctn + 12 pcs" / "40 কার্টন + 12 পিস" (FR-9; key `qty.display`).
- **Taka** with ৳ and lakh grouping (৳1,78,320), and only for Roles allowed to see Stock value (DD-2). Sales rep and floor roles never see a ৳ column.
- Dates dd/MM/yyyy with Western digits.
- No glyph characters in cell text (no check marks or crosses); icons are SVG beside the word.
- Unsure Bangla is marked [BN: verify].

| Translation Key | BN | EN | Source |
|---|---|---|---|
| `settings.warehouses.col.name` / `.users` / `.status` | "নাম", "ব্যবহারকারী" [BN: verify], "অবস্থা" [BN: verify] | "Name", "Users", "Status" | 09.2 |
| `po.col.product` / `.ordered` / `.received` / `.toCome` / `.unitCost` / `.value` | "পণ্য", "অর্ডার করা" [BN: verify], "গৃহীত", "বাকি আছে" [BN: verify], "একক মূল্য", "মূল্য" | "Product", "Ordered", "Received", "Still to come", "Unit cost", "Value" | 09.7 |
| `po.row.facts` | "{warehouse} · আসার তারিখ {date} · {n}টি লাইন · ৳{total}" [BN: verify] | "{warehouse} · Expected {date} · {n} lines · ৳{total}" | 09.7 |
| `dispatch.row.required` / `dispatch.row.more` | "প্রয়োজন {date}" [BN: verify] / "+{n}টি আরও" [BN: verify] | "Required {date}" / "+{n} more" | 07.3 |
| `import.preview.readyHeading` | "আনার জন্য তৈরি সারি" [BN: verify] | "Rows ready to import" | 09.3 |
| `settings.warehouses.deactivatedGroup` | "নিষ্ক্রিয় গুদাম ({n})" [BN: verify] | "Deactivated warehouses ({n})" | 09.2 |
| `settings.warehouses.empty` | "এখনও কোনো গুদাম নেই। যেখানে মজুদ রাখেন সেই জায়গাগুলো যোগ করুন, সর্বোচ্চ 3টি।" [BN: verify] | "No warehouses yet. Add the places where you keep stock, up to 3." | 09.2 |
| `po.empty` / `po.emptyFiltered` | "এখনও কোনো ক্রয় অর্ডার নেই। সরবরাহকারীর কাছ থেকে মাল আসার আগে এখানে অর্ডার তৈরি করুন।" [BN: verify] / "এই ফিল্টারে কোনো ক্রয় অর্ডার নেই।" [BN: verify] | "No purchase orders yet. Create one before goods arrive from a supplier." / "No purchase orders match this filter." | 09.7 |
| `settings.warehouses.error.load` (pattern `{section}.error.load`) | "গুদামের তালিকা আনা যায়নি। আবার চেষ্টা করুন।" [BN: verify] | "Couldn't load warehouses. Try again." | 09.2 |
| `common.retry` | "আবার চেষ্টা করুন" [BN: verify] | "Try again" | 09.2 |
| `common.asOfOffline` | "{time} পর্যন্ত (অফলাইন)" [BN: verify] | "as of {time} (offline)" | 09.2 |
| `common.showMore` (new key) | "আরও দেখুন" [BN: verify] | "Show more" | new |
| `common.selected` (new key, visually hidden) | "বাছাই করা" [BN: verify] | "Selected" | 09.2 (string), key new |

---

## Usage

### When to Use

- Desk lists of records that open into a detail or edit form (Settings, Orders).
- Read-only breakdowns with several attributes per record (import preview, PO lines, low stock per Warehouse).

### When Not to Use

- Floor task lists: use [Task Card](./task-card.md) (64px, whole card one target, current-line bar).
- Ranked Issues: use [Issue Card](./issue-card.md) (decision buttons are siblings of the title link).
- Editable rows: use [Line-item Editor](./line-item-editor.md).
- Setup steps: use [Setup Checklist](./setup-checklist.md).
- Owner figures by Reason: use [Loss Row](./loss-row.md).

### Best Practices

- Exactly one link per row; never put buttons inside a row link.
- Keep the row's first column the human name; IDs and SKUs go second.
- Show counts and limits above the table ("2 of 3 active warehouses", "48 products").
- Use "Show more" in fixed batches; never infinite scroll.

---

## Used on Pages

**Pages:** 9 (+1 candidate)

- [09.2 Settings: Warehouses](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.2-settings-warehouses/09.2-settings-warehouses.md) — `settings-warehouses-list` (navigable, selectable, collapsible "Deactivated" group); defines the shared pattern.
- [09.3 Settings: Excel import](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.3-settings-excel-import/09.3-settings-excel-import.md) — `settings-import-preview-ready-list` (read-only, 50 rows + Show more, hidden when ready = 0).
- [09.4 Settings: Products](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.4-settings-products/09.4-settings-products.md) — `settings-products-list` (navigable; Alternate-name line).
- [09.5 Settings: Suppliers](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.5-settings-suppliers/09.5-settings-suppliers.md) — supplier list (navigable).
- [09.6 Settings: Users](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.6-settings-users/09.6-settings-users.md) — user list (navigable).
- [09.7 Purchase orders](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.7-purchase-orders/09.7-purchase-orders.md) — `purchase-orders-row-{id}` (two-line rows) and `purchase-orders-detail-lines` (read-only).
- [07.3 Dispatch orders](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.3-dispatch-orders/07.3-dispatch-orders.md) — `dispatch-list-row` (two-line rows, 64px, selectable on desktop).
- [05.1 Transfers](../../C-UX-Scenarios/05-karims-transfer-arrives-short/05.1-transfers-list/05.1-transfers-list.md) — desk-role layout with From / To columns (05.1 Open Question 6); floor roles keep task cards.
- [04.2 Low stock](../../C-UX-Scenarios/04-haque-traces-an-unexplained-loss/04.2-low-stock/04.2-low-stock.md) — `low-stock-group-*` (grouped per Warehouse; row cards on phone, table from 600px).
- Candidate: [08.1 Stock counts](../../C-UX-Scenarios/08-rafiq-runs-the-weekly-count/08.1-stock-counts/08.1-stock-counts.md) count list (named in 09.2 Open Question 2 as S17).

---

## Related Components

- [Task Status Tag](./task-status-tag.md) — status look inside rows (display only).
- [Drill-down Panel](./drill-down-panel.md) — frame of the desktop detail panel opened from a selected row.
- [Choice Chip](./choice-chip.md) — filter chips above the table.
- [Button Primary](./button-primary.md) / [Button Secondary](./button-secondary.md) — toolbar create button, Show more, Try again.
- [Line-item Editor](./line-item-editor.md) — the editable sibling; reuses this table's header and row styling.
- [Setup Checklist](./setup-checklist.md) — shares row link sizing.

---

## Open Questions

| # | Question | Context | Status |
|---|---|---|---|
| 1 | Column header typography: `body-strong` `text-muted` (09.2, 09.3, 09.7) or `meta` / `meta-bn` `text-muted` (04.2)? | Spec inconsistency between pages using this component; this file uses `body-strong` | 🔴 Open |
| 2 | Cell padding: `{spacing.3}` / `{spacing.4}` (09.2) vs `{spacing.2}` / `{spacing.3}` (04.2 read table). One density or two? | Spec inconsistency | 🔴 Open |
| 3 | Selected row: add `aria-current="true"` besides the visually hidden "Selected"? | 09.2 specifies hidden text only | 🔴 Open |
| 4 | Skeleton row color: DESIGN.md has no skeleton token; `surface-alt` proposed | Missing token | 🔴 Open |
| 5 | Breakpoint 600px for table vs stacked rows is an EXPERIENCE.md [ASSUMPTION] | Responsive & Platform | 🔴 Open |
| 6 | Desk Transfers layout (From / To columns + filters) not yet in EXPERIENCE.md | 05.1 Open Question 6 | 🔴 Open |
| 7 | Row hover fill: allowed as a pointer hint, or underline only? | Not specified in DESIGN.md | 🔴 Open |

**Status Legend:** 🔴 Open | 🟡 In Discussion | 🟢 Resolved

---

## Version History

**Created:** 2026-10-24
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created component (WDS Phase 7, new component; from 09.2 Open Question 2 "settings list").

---

## Notes

Token values come only from DESIGN.md frontmatter; widths such as 22rem / 26rem panels and the 56rem read width are layout values from the page specs, not tokens.
