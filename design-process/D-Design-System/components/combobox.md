# Combobox [drp-101]

**Type:** Form
**Category:** Searchable select (single choice)
**Purpose:** Let a User pick one record (Supplier, Product, Warehouse, User) from a long list by typing part of its name, with a listbox of matches under the field.

---

## Overview

The Combobox is an [Input Field](./input-field.md) that filters a list of records as the User types and shows the matches in a listbox. The User must choose one of the listed records; free text is never saved. It follows the WAI-ARIA 1.2 combobox pattern (list autocomplete, focus stays in the field, options highlighted with `aria-activedescendant`).

Page specs call it "searchable select (combobox)" ([09.7 Open Question 4](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.7-purchase-orders/09.7-purchase-orders.md)). It is a desk form control: phones get the same control at full width with the listbox inline below the field.

Use it when the list can be longer than about 6 items or grows over time (Suppliers, Products, Users). For a short, fixed set (up to 3 active Warehouses, 6 Roles) use [Choice Chip](./choice-chip.md) groups instead, as 09.6, 09.7 and 07.3 already do.

---

## Variants

| Variant | Field | Options | Extras | Pages |
|---|---|---|---|---|
| **entity** (default) | Input field, search icon left, min `{spacing.target-min}` | 48px rows: name exactly as entered, optional second line in `meta` / `meta-bn` (Role and Warehouse for Users; contact for Suppliers) | Optional "Add a new {thing}" text link under the field (not inside the listbox) | 09.7 Supplier; 06.1 person picker (desk); 03.2 Assign to (desk anchored form) |
| **product** | The DESIGN.md **Product search field**: min 56px, search icon left, 48px scan icon button right | 64px rows: name exactly as entered, SKU in `meta`, Alternate name line when it matched (DD-10); stock figures only where the page allows (07.3 shows Promisable at the chosen Warehouse; 08.1 and 09.7 show none) | Scan button fills the field; it never saves | 09.7 line Product, 07.3 Add product, 08.1 Product picker |

The product variant reuses the search behaviour of [07.1 Product search](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.1-product-search/07.1-product-search.md) (`role="combobox"` there too) and the visual of [Input Field, search variant (Product search field)](./input-field.md); this component adds the "choose exactly one" rule used inside forms.

Not covered: multi-select (08.1 checks several Products with checkbox rows; that stays a page pattern), and phone bottom-sheet pickers (03.2 Assign sheet, 06.1 person sheet), which remain [Bottom Sheet](./bottom-sheet.md) lists of 56px rows on phones.

---

## States

**Required States:**

- default (empty)
- focus / open (typing, listbox shown)
- option active (keyboard highlight)
- selected (value chosen)
- no match
- error
- disabled (offline / prerequisite)

**Optional States:**

- loading results
- read-only (form submitting)
- not on this phone (offline, data never loaded)

**State Descriptions:**

| State | Appearance and behaviour |
|---|---|
| **Default (empty)** | Label above in `body-strong`; field with 1px `control-border`, `{rounded.sm}`, `body` text; search icon left (decorative); no placeholder used as label. Listbox closed. |
| **Hover** (pointer) | Field border unchanged (no hover-only meaning); cursor text. Option rows under the pointer take the active style. |
| **Focus / open** | 2px `primary` field border + [Focus Ring](./focus-ring.md) on `:focus-visible`. Typing (or Down arrow / Alt+Down) opens the listbox directly under the field. Matches update while typing (local lists at once; server search < 1 s, NFR-1). |
| **Option active** | The highlighted option: `surface-alt` fill + 4px `primary` left bar (as Side nav active). Text stays `text`. DOM focus stays in the field. |
| **Option selected** | The option matching the current value shows a check icon + `body-strong` name, so the chosen one is never marked by color alone. |
| **Selected (closed)** | Field shows the chosen record's name exactly as entered; a 48px **Clear** icon button appears at the field end (visible text label for screen readers "Clear supplier"). For the product variant the fact line under the field shows "SKU · 1 carton = 24 pieces". |
| **Loading results** | First line of the listbox reads "Searching…" in `body` `text-muted`; `aria-busy="true"` on the listbox. No spinner on the field. |
| **No match** | Listbox shows one non-selectable line: "No supplier called '{q}'" (entity) or "No product found for '{q}'" (product). The "Add a new {thing}" link under the field stays reachable. |
| **Error** | 2px `danger` border, `aria-invalid="true"`, message under the field in `body-strong` `danger` with alert icon ("Choose a supplier."), linked by `aria-describedby`. Shown on blur of a touched field or on submit; listed in the [Form Error Summary](./form-error-summary.md) when there are 2+ errors. |
| **Typed but not chosen** | On blur with text that is not a chosen record, the text stays (never lost) and the field shows the error "Choose a {thing} from the list." on submit. Free text is never saved. |
| **Disabled** | [Button Disabled](./button-disabled.md) language for fields: `surface-disabled` fill, `text-disabled` text, 1px dashed `control-border`, lock or cloud-off icon, and a visible reason under it ("Needs internet", "Add a supplier first."). Stays focusable (`aria-disabled="true"`) with the reason in its description. |
| **Read-only (submitting)** | While the form saves, the field is read-only (`aria-readonly="true"`), listbox closed, value kept. |
| **Not on this phone** | Offline and the list was never loaded: listbox line "Not on this phone yet — connect to look it up." Nothing can be chosen. |

---

## Styling

### Visual Properties

**Size:**
- Entity field min height `{spacing.target-min}` (48px); product field 56px (DESIGN.md Product search field; nearest token `{spacing.target-floor-secondary}` = 3.5rem, see Open Question 2).
- Scan and Clear icon buttons `{spacing.target-min}` square.
- Option rows min `{spacing.target-min}` (entity), `{spacing.target-floor}` (product, 64px).
- Listbox shows about 6 entity options or 4 product options before it scrolls internally.

**Shape:** Field `{rounded.sm}`; listbox `{rounded.sm}`.

**Colors:**
- Field background `{colors.surface}`, text `{colors.text}`, border `{colors.control-border}` (1px), focus border `{colors.primary}` (2px), error border `{colors.danger}` (2px).
- Listbox background `{colors.surface}`, 1px `{colors.control-border}` edge (so the popup has a visible boundary; `border` would fail 3:1).
- Active option `{colors.surface-alt}` fill + `{colors.primary}` 4px left bar.
- Secondary option line `{colors.text-muted}`.
- No-match and loading lines `{colors.text-muted}`.

**Typography:**
- Label `{typography.body-strong}`; field value `{typography.body}`.
- Option name `{typography.body}` (selected: `{typography.body-strong}`); product option name `{typography.body-strong}`.
- Option second line / fact line `{typography.meta}` (EN) / `{typography.meta-bn}` (BN); SKUs and digits always `tabular-nums`.
- Error `{typography.body-strong}` in `danger`.

**Spacing:**
- Label to field `{spacing.1}`; field to fact line / error `{spacing.1}`.
- Field inner padding `{spacing.3}` horizontal; icon to text `{spacing.2}`.
- Option padding `{spacing.2}` vertical, `{spacing.3}` horizontal.
- Listbox offset from field `{spacing.1}`.
- "Add a new {thing}" link `{spacing.2}` below the field (min `{spacing.target-min}` tall).

### Design Tokens

```yaml
colors:
  field-background: '{colors.surface}'          # dark: '{colors.surface-dark}'
  field-text: '{colors.text}'                   # dark: '{colors.text-dark}'
  field-border: '{colors.control-border}'       # 1px; dark: '{colors.control-border-dark}'
  field-border-focus: '{colors.primary}'        # 2px; dark: '{colors.primary-dark}'
  field-border-error: '{colors.danger}'         # 2px; dark: '{colors.danger-dark}'
  listbox-background: '{colors.surface}'        # dark: '{colors.surface-alt-dark}' (raised, no shadow in dark)
  listbox-border: '{colors.control-border}'     # dark: '{colors.control-border-dark}'
  option-active-background: '{colors.surface-alt}' # dark: '{colors.surface-dark}' on the raised listbox
  option-active-bar: '{colors.primary}'         # dark: '{colors.primary-dark}'
  option-secondary-text: '{colors.text-muted}'  # dark: '{colors.text-muted-dark}'
  disabled-background: '{colors.surface-disabled}' # dark: '{colors.surface-disabled-dark}'
  disabled-text: '{colors.text-disabled}'       # dark: '{colors.text-disabled-dark}'

typography:
  label: '{typography.body-strong}'
  value: '{typography.body}'
  option: '{typography.body}'
  option-selected: '{typography.body-strong}'
  option-meta-en: '{typography.meta}'
  option-meta-bn: '{typography.meta-bn}'
  error: '{typography.body-strong}'

spacing:
  field-min-height: '{spacing.target-min}'
  product-field-min-height: '{spacing.target-floor-secondary}'  # 3.5rem; see Open Question 2
  icon-button: '{spacing.target-min}'
  option-min-height: '{spacing.target-min}'
  product-option-min-height: '{spacing.target-floor}'

effects:
  field-radius: '{rounded.sm}'
  listbox-radius: '{rounded.sm}'
  listbox-shadow-light: 'see Open Question 1 (DESIGN.md defines only card and dialog shadows)'
  listbox-shadow-dark: none
  focus: '{components.focus-ring}'
```

### Figma Reference

Not applicable.

### Library Component

Not applicable (no library chosen). Any implementation must keep the ARIA 1.2 combobox pattern below.

---

## Behavior

### Interactions

**Typing:** Filters case-insensitively; matches Bangla and English text; names are matched and shown exactly as entered. The product variant matches main name, Alternate names, SKU and Barcode (DD-10, FR-8) and shows "Also called: {altName}" when the match came from an Alternate name. Only active records are offered (archived Suppliers and Products, deactivated Warehouses and Users never appear).

**Choosing:** Click / tap an option, or Enter on the active option. The listbox closes, the field shows the name, focus stays in the field. In a line-item editor, choosing a Product moves focus to that line's first quantity field (07.3) [see Open Question 4].

**Clear:** The Clear button empties the value and returns focus to the field.

**Scan (product variant):** The 48px scan button opens the [Scan overlay](./scan-overlay.md). A read fills the field with the matched Product and sets the unit row from the Barcode (Pack barcode to cartons, Base barcode to pieces, FR-38). It never saves anything (EXPERIENCE.md → "Any Product field … fills the field"). Unknown barcode: the overlay's "Not found" path.

**Add a new {thing}:** A text link under the field (entity variant, 09.7 Supplier). It opens the create form for that record and returns with the new record chosen and the rest of the form kept [ASSUMPTION in 09.7].

**Duplicate on a line form:** When the chosen Product is already on another line, the line-item editor decides what happens (see [Line-item Editor](./line-item-editor.md)).

**Hover:** Highlights options under the pointer.

**Focus:** Focus never moves into the listbox; the active option is announced via `aria-activedescendant`.

**Keyboard:** See Accessibility.

### Animations

None. The listbox appears and disappears without animation.

---

## Responsive Behaviour

| Width | Behaviour |
|---|---|
| **Phone, 320–599px** | Field full width. The listbox opens **inline** under the field and pushes content down (no floating popup), so the on-screen keyboard never covers it. The page scrolls the field to the top of the visible area above the keyboard (`scroll-padding` per DESIGN.md → Focus never hidden). |
| **Tablet and desktop, ≥ 600px** | Listbox floats under the field, same width as the field (min 16rem), and scrolls internally. It closes on outside click. |
| **Reflow** | Long names and Bangla second lines wrap inside options; option rows grow taller, never clip. |

---

## Accessibility

**ARIA Attributes:**
- Input: `role="combobox"`, `aria-expanded="true|false"`, `aria-controls="{listbox-id}"`, `aria-autocomplete="list"`, `aria-activedescendant="{option-id}"` while an option is active; labelled by a visible `<label>`.
- Listbox: `role="listbox"`, labelled by the same label.
- Options: `role="option"`, `aria-selected="true"` on the chosen one.
- Error: `aria-invalid="true"`, `aria-describedby` to the message; required: `aria-required="true"`.
- Disabled: `aria-disabled="true"` (stays focusable) with the reason in `aria-describedby`.
- In a line editor the label includes the line: "Line 2, Product" (09.7).
- Scan and Clear icon buttons have text names in the current language ("Scan", "Clear supplier"); the icons are `aria-hidden`.

**Keyboard Support:**
- Type: filter and open.
- Down / Up: open the listbox; move the active option.
- Alt+Down: open without moving; Alt+Up: close.
- Enter: choose the active option (when the listbox is open Enter never submits the form; when it is closed, Enter follows the form's own submit rule).
- Escape: close the listbox; a second Escape clears typed text that was not chosen.
- Home / End: move the caret in the field.
- Tab: leave the field without choosing (no auto-select on Tab).

**Screen Reader:**
Announces "Supplier, combo box, collapsed / expanded", then each active option by name (and second line). The result count is announced once per pause in the polite region ("5 suppliers"). No-match and "Not on this phone yet" lines are announced politely.

**Targets:** field, options, Scan and Clear all ≥ `{spacing.target-min}`; `{spacing.2}` between field and adjacent buttons.

---

## Content Rules

- One language per User (desk forms). Record names are never translated or marked with `lang`.
- Western digits in SKUs, counts and dates.
- No glyph characters; icons are SVG.
- Labels are nouns ("Supplier"); helper text says what to type, not a placeholder.

| Translation Key | BN | EN | Source |
|---|---|---|---|
| `po.form.supplier` | "সরবরাহকারী" | "Supplier" | 09.7 |
| `po.form.addSupplier` | "নতুন সরবরাহকারী যোগ করুন" [BN: verify] | "Add a new supplier" | 09.7 |
| `po.form.noSupplierMatch` | "'{q}' নামে কোনো সরবরাহকারী নেই" [BN: verify] | "No supplier called '{q}'" | 09.7 |
| `ERR_PO_SUPPLIER_REQUIRED` | "একজন সরবরাহকারী বেছে নিন।" [BN: verify] | "Choose a supplier." | 09.7 |
| `po.form.product` | "পণ্য" | "Product" | 09.7 |
| `search.field.label` | "পণ্যের নাম, SKU বা বারকোড" [BN: verify] | "Product name, SKU or barcode" | 07.3, 08.1 |
| `scan.open` | "স্ক্যান করুন" | "Scan" | 09.4 |
| product no match (07.1 key) | "'{q}'-এর জন্য কোনো পণ্য পাওয়া যায়নি" [BN: verify] | "No product found for '{q}'" | EXPERIENCE.md → Empty lists |
| `import.col.altNames` | "অন্য নাম: {names}" [BN: verify] | "Also called: {names}" | 09.3 |
| `myrecord.person.sheetTitle` | "কার রেকর্ড দেখবেন? [BN: verify]" | "Whose record?" | 06.1 |
| `issues.assign.title` | "কাকে দায়িত্ব দেবেন?" [BN: verify] | "Assign to" | 03.2 |
| `common.needsInternet` | "ইন্টারনেট লাগবে" | "Needs internet" | 09.2 |
| `combobox.clear` (new key) | "{label} মুছুন" [BN: verify] | "Clear {label}" | new |
| `combobox.searching` (new key) | "খোঁজা হচ্ছে…" [BN: verify] | "Searching…" | new |
| `combobox.resultCount` (new key) | "{n}টি ফল" [BN: verify] | "{n} results" | new |
| `combobox.chooseFromList` (new key) | "তালিকা থেকে একটি {thing} বেছে নিন।" [BN: verify] | "Choose a {thing} from the list." | new |

---

## Usage

### When to Use

- Picking one record from a list that can be long or grow (Suppliers, Products, Users).
- Inside desk forms where the chosen record is saved with the form.

### When Not to Use

- 2 to 6 fixed choices (Warehouse up to 3, Role, Reason, filters): use [Choice Chip](./choice-chip.md) groups.
- Looking something up to open it (no form): use [Input Field, search variant (Product search field)](./input-field.md) on 07.1.
- Phone pickers that act at once (Assign to, person picker, Found → Warehouse): use a [Bottom Sheet](./bottom-sheet.md) list.
- Free text with suggestions (07.3 Customer name): use [Input Field](./input-field.md); suggestions there are optional and never required.

### Best Practices

- Always pair with a visible label; never use the placeholder as the label.
- Offer the "Add a new {thing}" escape hatch next to the field, not as a fake option.
- Keep typed text on blur and on errors; never clear what the User typed.

---

## Used on Pages

**Pages:** 5

- [09.7 Purchase orders](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.7-purchase-orders/09.7-purchase-orders.md) — `purchase-orders-form-supplier` (entity) and `purchase-orders-form-line-product` (product, inside the line-item editor).
- [07.3 Dispatch orders](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.3-dispatch-orders/07.3-dispatch-orders.md) — `dispatch-create-add` (product; results show Promisable at the chosen Warehouse).
- [08.1 Stock counts](../../C-UX-Scenarios/08-rafiq-runs-the-weekly-count/08.1-stock-counts/08.1-stock-counts.md) — `counts-start-products` search part (product; no stock figures; multi-choice handled by the page).
- [06.1 My record](../../C-UX-Scenarios/06-karim-proves-where-a-carton-went/06.1-my-record/06.1-my-record.md) — `myrecord-person` on desk ("desk: a dropdown"; entity, Users).
- [03.2 Issue detail](../../C-UX-Scenarios/03-nasima-clears-the-inbox/03.2-issue-detail/03.2-issue-detail.md) — `issue-detail-assign` on desktop, where pickers open as a small anchored dialog (entity, eligible Users); 09.7 Open Question 4 suggests it.

---

## Related Components

- [Input Field](./input-field.md) — base tokens (border, focus, error, radius).
- [Input Field, search variant (Product search field)](./input-field.md) — visual base of the product variant.
- [Choice Chip](./choice-chip.md) — alternative for short fixed sets.
- [Bottom Sheet](./bottom-sheet.md) — phone picker alternative.
- [Line-item Editor](./line-item-editor.md) — hosts the product variant per line.
- [Form Error Summary](./form-error-summary.md) — lists combobox errors after submit.
- [Scan Overlay](./scan-overlay.md) — opened by the product variant's scan button.

---

## Open Questions

| # | Question | Context | Status |
|---|---|---|---|
| 1 | Light-mode elevation of the floating listbox: DESIGN.md gives a subtle card shadow (`0 1px 2px` ~6%) and a strong one for toasts, sheets and dialogs (`0 6px 16px` ~25%). Which applies to a listbox? | Missing elevation token; dark mode uses `surface-alt-dark`, no shadow | 🔴 Open |
| 2 | Product field height 56px has no exact token name; `{spacing.target-floor-secondary}` and `{spacing.button-desk}` are both 3.5rem | Token naming gap | 🔴 Open |
| 3 | 06.1 person picker and 03.2 Assign to on desktop: combobox (typing) or a plain anchored list? Both lists are short (eligible Users, at most 30) | Page specs say "dropdown" / "anchored dialog" | 🔴 Open |
| 4 | 09.7 line Product uses the Product search field per line, 07.3 uses one "Add product" search that creates lines. Same component, two flows | Spec inconsistency; see Line-item Editor | 🔴 Open |
| 5 | Should Enter on desktop forms submit when the listbox is closed (EXPERIENCE.md "Enter saves on desktop forms")? This file says yes | Interaction rule check | 🔴 Open |

**Status Legend:** 🔴 Open | 🟡 In Discussion | 🟢 Resolved

---

## Version History

**Created:** 2026-10-24
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created component (WDS Phase 7, new; from 09.7 Open Question 4).
