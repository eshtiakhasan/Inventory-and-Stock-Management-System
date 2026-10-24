# Line-item Editor [frm-101]

**Type:** Form
**Category:** Form (repeatable line list, composite)
**Purpose:** Let an Owner, Manager or Sales rep build the list of Products on a Purchase order or Dispatch order: one line per Product with a quantity (and, for POs, a unit cost), add and remove lines, and see per-line limits and errors before saving.

---

## Overview

The Line-item Editor is a composite of existing parts:

- **Product** per line: [Combobox](./combobox.md), product variant (Product search field with a 48px scan button).
- **Quantity** per line: [Quantity Entry](./quantity-entry.md), **desk variant** (cartons + pieces fields, `inputmode="numeric"`, no 64px steppers; pieces ≥ Conversion factor roll into cartons on blur, FR-9).
- **Unit cost** per line (PO only): [Input Field](./input-field.md), **money variant** (৳ amount + "per {pack}" / "per {base}" [Choice Chip](./choice-chip.md) pair, result line "= ৳{x} per {base}").
- **Remove** per line: [Button Secondary](./button-secondary.md).
- **Add line** below the lines, and an optional **Total**.
- Layout borrowed from [Data Table](./data-table.md): a table of editable rows on wide screens, **one card per line** on phones.

Line errors feed the [Form Error Summary](./form-error-summary.md) as "Line {n}: …". Limits (Dispatch order: Promisable at the chosen Warehouse) use the [Refusal Message](./refusal-message.md) with "Use max".

Nothing is reserved or saved while lines are edited; the form's own Save / Send does that.

Page specs call it "line-item editor" ([09.7 Open Question 6](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.7-purchase-orders/09.7-purchase-orders.md)).

---

## Variants

| Variant | Columns per line | Add mode | Limits | Total | Page |
|---|---|---|---|---|---|
| **purchase order** | # · Product (+ fact line "SKU · 1 carton = 24 pieces") · Quantity (+ result "= 40 ctn + 12 pcs") · Unit cost (+ "= ৳60 per piece") · Value · Remove | **empty line**: "Add line" adds an empty line and focuses its Product field; the form starts with one empty line | None (ordering is not limited by stock) | "Total ৳{total}" (`title`, lakh grouping), Stock-value Roles only (DD-2) | 09.7 |
| **dispatch order** | Product name (H3) · "Promisable at {warehouse}: {qty}" + as-of · Quantity · "Max {qty}" · Refusal + Use max (conditional) · Remove | **search first**: "Add product" opens a Product search; choosing a result creates the line and focuses its carton field | Max = Promisable at the chosen Warehouse (FR-23); changing the Warehouse re-checks every line | None (no taka on dispatch orders) | 07.3 |
| **pick list** (candidate) | Product · Remove (no quantity) | search first, multi-choose | — | "{n} products chosen" | 08.1 "Chosen products" review list |

Shared rules: lines are numbered in order ("Line 1", "Line 2"); quantities are entered and shown in Pack + Base units and stored in Base units; names exactly as entered.

---

## States

**Required States:**

- default (one empty line, or one pre-filled line)
- filled
- line error
- over limit (refused)
- adding / removing a line
- submitting (read-only)
- no lines

**Optional States:**

- concurrent change (server max changed)
- loading Promisable
- offline
- line limit reached

**State Descriptions:**

| State | Appearance and behaviour |
|---|---|
| **Default** | PO: one empty line (Product field focused after the header fields). Dispatch from 07.2: one pre-filled Product line, quantity empty, "Max {qty}" shown. |
| **Filled** | Each line shows its fact / result lines; PO lines show Value right-aligned and the Total updates live (announced politely on blur only). |
| **Hover / focus** | Inner controls follow their own components; focus ring on the focused control. Rows and cards have no hover state. |
| **Line error** | The invalid control gets 2px `danger` border, `aria-invalid`, inline message; on submit the Form Error Summary lists it as "Line {n}: Enter a quantity." |
| **Over limit** (dispatch) | Quantity field `danger` border; Refusal Message under it ("Only 32 ctn available. Max 32 ctn.") with a 56px "Use max" button; checked about 0.5 s after typing stops, announced once (assertive); the form's Save is a [Button Disabled](./button-disabled.md) with the reason "Fix the quantity to save." The + stepper (if present) stops at the max. |
| **Concurrent change** | Server refuses on save because stock changed: "Stock changed just now. Max is now {qty}." on that line; focus moves to its Use max. Nothing saved. |
| **Duplicate Product** | PO: refused on the line, "Line {n}: {product} is already on line {m}." Dispatch: choosing a Product already on the order focuses its existing line instead (see Open Question 3). |
| **Adding** | New line appears at the end; focus to its Product field (PO) or its carton field (Dispatch). Polite announcement "Line 3 added". |
| **Removing** | Line removed at once, no dialog (nothing saved or reserved yet); focus moves to the next line's first field, or to Add line / Add product when it was the last. Polite announcement "Line 2 removed". |
| **No lines** | Submit refused: "Add at least one product." (`ERR_PO_NO_LINES`) shown at the Add button and in the summary. The Remove button is hidden while only one line exists (see Open Question 4). |
| **Line limit reached** | At 200 lines [ASSUMPTION, 09.7] Add line becomes disabled with the visible reason. |
| **Loading Promisable** | Dispatch lines show the last known figure with "as of HH:MM" while fresh data loads; never a blank max. |
| **Submitting** | All fields read-only, Add and Remove `aria-disabled`, values kept; the pressed form button shows the spinner (FR-14). |
| **Offline** | Order creation is online only (FR-41): the page's create entry is already disabled with "Needs internet"; if the connection drops while editing, typed lines stay and Save / Send become disabled with "Needs internet" visible. |

---

## Styling

### Visual Properties

**Size:**
- Every control ≥ `{spacing.target-min}`; Product field 56px (product search field); Use max `{spacing.target-floor-secondary}` (56px, from refusal-message).
- Desk table row min `{spacing.target-floor}` (lines hold two text rows: field + fact line).

**Shape:** Phone line cards `{rounded.md}`; fields per their components (`{rounded.sm}` inputs).

**Colors:**
- Table / card background `{colors.surface}`; row dividers and card edges `{colors.border}` (decorative).
- Column headers `{colors.text-muted}`.
- Fact / result / as-of lines `{colors.text-muted}`.
- Value and Total `{colors.text}`.
- Errors and refusals `{colors.danger}`.

**Typography:**
- Section heading "Lines" / "Products" (H2) `{typography.title}`.
- Column headers `{typography.body-strong}` (table mode).
- "Line {n}" label (phone card) `{typography.body-strong}`; Dispatch Product name (H3) `{typography.title}`.
- Fact / result lines `{typography.meta}` (EN) / `{typography.meta-bn}` (BN), `tabular-nums`.
- Promisable line `{typography.body}`; "Max {qty}" `{typography.body-strong}`.
- Value `{typography.body-strong}`, right-aligned; Total `{typography.title}`.

**Spacing:**
- Table row padding `{spacing.3}` vertical; cell gap `{spacing.3}`.
- Phone card padding `{spacing.4}` (09.7) and gap between cards `{spacing.3}` (see Open Question 6 for 07.3's `{spacing.3}` padding).
- Within a line: label to field `{spacing.1}`; field to fact line `{spacing.1}`; refusal `{spacing.2}` above, Use max `{spacing.2}` below the text.
- Add button `{spacing.3}` below the last line; `{spacing.6}` between the editor's end and the form actions, so Send is never confused with a line's Remove (09.7).

### Design Tokens

```yaml
colors:
  background: '{colors.surface}'               # dark: '{colors.surface-dark}'
  divider: '{colors.border}'                   # dark: '{colors.border-dark}'
  header-text: '{colors.text-muted}'           # dark: '{colors.text-muted-dark}'
  fact-text: '{colors.text-muted}'             # dark: '{colors.text-muted-dark}'
  value-text: '{colors.text}'                  # dark: '{colors.text-dark}'
  error: '{colors.danger}'                     # dark: '{colors.danger-dark}'

typography:
  section-heading: '{typography.title}'
  column-header: '{typography.body-strong}'
  line-label: '{typography.body-strong}'
  product-name-dispatch: '{typography.title}'
  fact-en: '{typography.meta}'
  fact-bn: '{typography.meta-bn}'
  max-line: '{typography.body-strong}'
  value: '{typography.body-strong}'
  total: '{typography.title}'

spacing:
  row-min-height: '{spacing.target-floor}'
  row-padding-y: '{spacing.3}'
  card-padding: '{spacing.4}'
  card-gap: '{spacing.3}'
  actions-gap-above: '{spacing.6}'
  control-min: '{spacing.target-min}'

effects:
  card-radius: '{rounded.md}'
  shadow: none
  parts:
    product: '{components.input-field} (Product search field; see combobox.md)'
    quantity: '{components.quantity-entry} (desk variant)'
    unit-cost: '{components.input-field} (money variant) + {components.choice-chip}'
    remove: '{components.button-secondary}'
    refusal: '{components.refusal-message}'
  focus: '{components.focus-ring}'
```

### Figma Reference

Not applicable.

### Library Component

Not applicable.

---

## Behavior

### Interactions

**Product (per line, PO):** Combobox product variant. Required; active Products only. A scan fills the field and sets the unit row from the Barcode (Pack barcode → cartons, Base barcode → pieces); it never saves. After choosing, the fact line shows "SKU · 1 {pack} = {factor} {base}".

**Add product (Dispatch):** Opens one Product search below the lines; results show Promisable at the chosen Warehouse only; choosing (or scanning) creates the line.

**Quantity:** Desk quantity entry. Either or both fields; total must be > 0; whole numbers; pieces field hidden for Products with no Pack unit; pieces ≥ factor roll into cartons on blur ("27 pcs" → "1 ctn + 3 pcs" for 24/ctn). PO: no maximum. Dispatch: max = Promisable; typing above the max is allowed so the Refusal can explain it.

**Unit cost (PO):** Money input + per-unit chips; stored per Base unit; pre-filled with the Product's current Unit cost per Pack unit when known [ASSUMPTION, 09.7]; required, > 0, up to 2 decimals.

**Value and Total (PO):** Value = Base-unit quantity × cost per Base unit; Total sums Values; both update live; Total announced politely on blur.

**Use max (Dispatch):** Sets the quantity to the max, clears the Refusal, focuses the carton field.

**Remove:** Removes the line without a dialog; accessible name "Remove line 2, Sugar 1 kg".

**Validation timing:** On blur of touched fields and on submit (never per keystroke), except the Dispatch max check (about 0.5 s after typing stops, EXPERIENCE.md → Refusal message). Save draft (PO) checks only header fields and allows incomplete lines, flagged; Send / Save order checks every line.

**Keyboard:** Within a line, Tab order is Product → Scan → Cartons → Pieces → Cost → per-unit chips → Remove; then the next line. Enter inside an open combobox chooses the option; elsewhere Enter submits the desk form (EXPERIENCE.md → Keyboard).

### Animations

None. Lines are added and removed without slide or fade (honours reduced motion by default).

---

## Responsive Behaviour

| Width | Behaviour |
|---|---|
| **Phone, 320–599px** | One card per line: "Line {n}" label, Product field (full width) + scan button, quantity rows (Cartons / Pieces fields side by side when they fit, stacked otherwise), cost field + per-unit chips, Value, Remove (full width) at the card end. Add line full width below the cards. Total below Add. Tab bar hidden on PO Create; actions at the end of content. |
| **Tablet / desktop, ≥ 600px** | PO: a table with column headers (# · Product · Quantity · Unit cost · Value · Remove) using the full content width (list hidden on Create, 09.7). Dispatch: line cards in the form column (07.3). |
| **200% text / 400% zoom** | Table switches to cards; amounts never truncate; long Product names wrap. |
| **Keyboard on phone** | The focused field scrolls above the keyboard (`scroll-padding`); the Remove button of a line is never adjacent to the form's primary button (`{spacing.6}` gap). |

---

## Accessibility

**ARIA Attributes:**
- Wrapper `section` labelled by the H2 ("Lines" / "Products").
- Table mode: real `<table>` with `th scope="col"`; each line's `#` cell is the row header. Phone: each card is a `fieldset` whose `legend` is "Line {n}" (PO) or the Product name (Dispatch).
- Every control's accessible name includes the line: "Line 2, Product", "Line 2, Cartons", "Line 2, Unit cost" (09.7).
- Invalid controls: `aria-invalid="true"` + `aria-describedby` to the inline error or Refusal.
- Remove: "Remove line {n}, {product}"; Use max: "Use max, {qty}".
- Add / remove / total changes go to the polite region; refusals to the assertive region, once per change.
- Save disabled for an over-limit line: `aria-disabled` with the reason in its description (focusable).

**Keyboard Support:**
- Tab / Shift+Tab: through controls in line order.
- Enter / Space: activate buttons and chips.
- Arrow keys: inside the combobox listbox and the per-unit chip radio group only.

**Screen Reader:**
"Lines, table, 2 rows … Line 1, Product, combo box, Rice 25 kg … Line 1, Cartons, edit text, 100." Adding announces "Line 3 added"; removing "Line 2 removed".

**Never color alone:** errors and refusals have icons + words; Value / Total are text.

**Targets:** all controls ≥ `{spacing.target-min}`; ≥ `{spacing.2}` between Remove and neighbouring controls.

---

## Content Rules

- One language per User (desk forms). Product names exactly as entered.
- Quantities as units ("40 ctn + 12 pcs" / "40 কার্টন + 12 পিস"), Western digits, `tabular-nums`.
- Taka with ৳ and lakh grouping, PO only and only to Stock-value Roles (DD-2); dispatch orders show no taka to anyone.
- Refusals name the limit in the entry's units ("Only 32 ctn available. Max 32 ctn.").
- No glyphs; icons are SVG.

| Translation Key | BN | EN | Source |
|---|---|---|---|
| `po.form.lines` / `po.form.lineN` | "লাইন" [BN: verify] / "লাইন {n}" [BN: verify] | "Lines" / "Line {n}" | 09.7 |
| `dispatch.products` | "পণ্য" | "Products" | 07.3 |
| `po.form.product` | "পণ্য" | "Product" | 09.7 |
| `settings.products.units` | "1 {pack} = {factor} {base}" | "1 {pack} = {factor} {base}s" | 09.7 |
| `qty.ctnLabel` / `qty.pcsLabel` | "কার্টন" / "পিস" | "Cartons" / "Pieces" | 09.7 |
| `qty.display` | "{c} কার্টন + {p} পিস" | "{c} ctn + {p} pcs" | 09.7 |
| `settings.products.form.perPack` / `.perBase` | "প্রতি {pack}" / "প্রতি {base}" | "per {pack}" / "per {base}" | 09.7 |
| `settings.products.form.costResult` | "= প্রতি {base} ৳{cost}" [BN: verify] | "= ৳{cost} per {base}" | 09.7 |
| `po.form.lineValue` | "মূল্য ৳{value}" | "Value ৳{value}" | 09.7 |
| `po.form.removeLine` | "লাইন সরান" [BN: verify] | "Remove line" | 09.7 |
| `dispatch.line.remove` | "সরান" [BN: verify] | "Remove" | 07.3 |
| `po.form.addLine` | "লাইন যোগ করুন" [BN: verify] | "Add line" | 09.7 |
| `dispatch.addProduct` | "পণ্য যোগ করুন" [BN: verify] | "Add product" | 07.3 |
| `po.form.total` | "মোট ৳{total}" | "Total ৳{total}" | 09.7 |
| `dispatch.line.promisable` | "{warehouse}-এ বিক্রয়যোগ্য: {qty}" [BN: verify] | "Promisable at {warehouse}: {qty}" | 07.3 |
| `qty.max` | "সর্বোচ্চ {qty}" | "Max {qty}" | 07.3 |
| `qty.refused.max` | "মাত্র {qty} আছে। সর্বোচ্চ {qty}।" [BN: verify] | "Only {qty} available. Max {qty}." | 07.3 |
| `qty.refused.changed` | "মজুদ এইমাত্র বদলেছে। এখন সর্বোচ্চ {qty}।" [BN: verify] | "Stock changed just now. Max is now {qty}." | 07.3 |
| `action.useMax` | "সর্বোচ্চ দিন" | "Use max" | 07.3 |
| `dispatch.save.fixQty` | "সেভ করতে পরিমাণ ঠিক করুন।" [BN: verify] | "Fix the quantity to save." | 07.3 |
| `ERR_PO_NO_LINES` | "অন্তত একটি পণ্য যোগ করুন।" [BN: verify] | "Add at least one product." | 09.7 |
| `ERR_PO_LINE_PRODUCT` | "লাইন {n}: একটি পণ্য বেছে নিন।" [BN: verify] | "Line {n}: Choose a product." | 09.7 |
| `ERR_PO_LINE_DUP` | "লাইন {n}: {product} লাইন {m}-এ আগে থেকেই আছে।" [BN: verify] | "Line {n}: {product} is already on line {m}." | 09.7 |
| `ERR_PO_LINE_QTY` | "লাইন {n}: পরিমাণ দিন।" [BN: verify] | "Line {n}: Enter a quantity." | 09.7 |
| `ERR_PO_LINE_COST` | "লাইন {n}: একক মূল্য দিন।" [BN: verify] | "Line {n}: Enter the unit cost." | 09.7 |
| `lineEditor.added` / `lineEditor.removed` (new keys, polite region) | "লাইন {n} যোগ হয়েছে" [BN: verify] / "লাইন {n} সরানো হয়েছে" [BN: verify] | "Line {n} added" / "Line {n} removed" | new |

---

## Usage

### When to Use

- Desk forms that build a document from several Products with quantities: Purchase orders, Dispatch orders (and, as a candidate, a count's chosen Products).

### When Not to Use

- Recording counted, received or picked quantities on the floor: use [Task Card](./task-card.md) lines with the floor [Quantity Entry](./quantity-entry.md) (64px steppers, bilingual Save line).
- Opening stock per Warehouse in Settings: 09.4 uses one desk quantity entry per Warehouse row, not a line list.
- Read-only order lines: use [Data Table](./data-table.md) read-only variant (09.7 PO detail).

### Best Practices

- Keep one Product per line; refuse or redirect duplicates.
- Never reserve or save on line edits; only the form's action saves.
- Keep line numbers stable while editing; renumber only after a removal.
- Leave `{spacing.6}` between the last line and the form's primary action.

---

## Used on Pages

**Pages:** 2 (+1 candidate)

- [09.7 Purchase orders](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.7-purchase-orders/09.7-purchase-orders.md) — `purchase-orders-form-lines`, `-line-product`, `-line-qty`, `-line-cost`, `-line-value`, `purchase-orders-form-add-line`, `purchase-orders-form-total` (purchase order variant).
- [07.3 Dispatch orders](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.3-dispatch-orders/07.3-dispatch-orders.md) — `dispatch-create-line` and children, `dispatch-create-add` (dispatch order variant).
- Candidate: [08.1 Stock counts](../../C-UX-Scenarios/08-rafiq-runs-the-weekly-count/08.1-stock-counts/08.1-stock-counts.md) — `counts-start-products` review list (pick list variant; 09.7 Open Question 6 names S17).

---

## Related Components

- [Combobox](./combobox.md) — Product per line (product variant).
- [Quantity Entry](./quantity-entry.md) — desk variant per line (floor variant on 07.3 today, see Open Question 1).
- [Input Field](./input-field.md) — money variant for Unit cost; date variant for the form's dates.
- [Choice Chip](./choice-chip.md) — per-unit cost chips.
- [Refusal Message](./refusal-message.md) — over-limit lines with Use max.
- [Data Table](./data-table.md) — header and row styling in table mode.
- [Form Error Summary](./form-error-summary.md) — "Line {n}: …" items.
- [Button Secondary](./button-secondary.md) / [Button Disabled](./button-disabled.md) — Add, Remove, Use max, disabled Save.

---

## Open Questions

| # | Question | Context | Status |
|---|---|---|---|
| 1 | Quantity control: 09.7 uses the desk quantity entry (no steppers); 07.3 uses the floor quantity-entry with 64px steppers on a desk surface. This component specifies the desk variant for both | Spec inconsistency; 09.7 Open Question 3, 09.4 Open Question 1 | 🔴 Open |
| 2 | Add mode: 09.7 "Add line" (empty line, then choose Product) vs 07.3 "Add product" (search first, line created on choice). One mode for both? | Spec inconsistency | 🔴 Open |
| 3 | Duplicate Product: 09.7 refuses with "is already on line {m}"; 07.3 focuses the existing line | Spec inconsistency | 🔴 Open |
| 4 | Remove on the only line: 07.3 hides it; 09.7 does not say. This file hides it in both | Spec gap | 🔴 Open |
| 5 | Remove label and icon: 09.7 "Remove line" with cross icon; 07.3 "Remove" with trash icon | Spec inconsistency (strings and icon) | 🔴 Open |
| 6 | Line card padding on phone: 09.7 `{spacing.4}`, 07.3 `{spacing.3}` | Spec inconsistency | 🔴 Open |
| 7 | Up to 200 lines per order | 09.7 [ASSUMPTION] | 🔴 Open |
| 8 | Unit cost pre-filled from the Product's Unit cost? Expected date required to send? | 09.7 Open Question 11 | 🔴 Open |
| 9 | Use the editor for 08.1 chosen-products review (no quantities)? | 09.7 Open Question 6 | 🔴 Open |

**Status Legend:** 🔴 Open | 🟡 In Discussion | 🟢 Resolved

---

## Version History

**Created:** 2026-10-24
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created component (WDS Phase 7, new composite; from 09.7 Open Question 6).
