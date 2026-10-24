# File Upload [inp-101]

**Type:** Form
**Category:** Input (single file, Excel)
**Purpose:** Let an Owner or Manager choose one Excel file (or drop it on desktop) so Mojud can check it, show whole-file problems right where he chose it, and replace the file with another one from the preview.

---

## Overview

File Upload is a real **Choose file** button that opens the system file picker, with a short hint under it ("Excel (.xlsx) only."). On tablet and desktop the button sits inside a **drop zone** that also accepts a dragged file; drag and drop is only a shortcut, never required. After a file is chosen, Mojud uploads it at once and hands over to the page's preview; nothing is saved until the User confirms on that preview (FR-47).

Whole-file problems (wrong type, too big, wrong template, no rows, unreadable) are refused **under the button** and never reach the preview. Row problems belong to the preview.

Once a file is in the preview, the page shows a **file line** ("File: haque-products.xlsx · 51 rows") and a **Choose another file** button that replaces it. Together these are the "file chip" and "replace" parts of this component.

Page specs call it "file upload" ([09.3 Open Question 1](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.3-settings-excel-import/09.3-settings-excel-import.md)).

---

## Variants

| Variant | Where | Anatomy |
|---|---|---|
| **drop zone** (default, ≥ 600px) | 09.3 step cards on tablet / desktop | Dashed box (2px `control-border`, `{rounded.md}`, `surface`, padding `{spacing.5}`) holding [Button Secondary](./button-secondary.md) "Choose file", the text "or drag the file here." and the hint "Excel (.xlsx) only." |
| **button only** (< 600px) | 09.3 step cards on phone | "Choose file" full width + hint under it; no drop zone, no drag text |
| **replace** | 09.3 preview (View B) action bar and result | [Button Secondary](./button-secondary.md) "Choose another file" opening the same picker; the new check replaces the old preview completely |
| **file line** (selected file) | 09.3 preview header | File icon (decorative) + "File: {fileName} · {n} rows" in `body`; file name exactly as chosen, breaks anywhere |

One file at a time. No multiple-file selection.

---

## States

**Required States:**

- default
- hover / focus (button)
- drag over (drop zone)
- uploading / checking (hand-off)
- refused (file-level error)
- disabled (prerequisite missing)
- offline

**Optional States:**

- file selected (file line shown)
- replaced

**State Descriptions:**

| State | Appearance and behaviour |
|---|---|
| **Default** | Drop zone with 2px **dashed** `control-border` on `surface`; Choose file (secondary button); "or drag the file here." in `body`; hint "Excel (.xlsx) only." in `body`, `text-muted`. Phone: button + hint only. |
| **Hover** (pointer over button) | Button hover per [Button Secondary](./button-secondary.md). The zone itself has no hover state. |
| **Focus** | [Focus Ring](./focus-ring.md) on Choose file only. The zone is never a tab stop. |
| **Drag over** | While a file is dragged over the zone: border 2px **solid** `primary`, fill `surface-alt`, text replaced by "Drop the file to check it" in `body-strong`. Leaving the zone restores the default. |
| **Uploading / checking** | Choosing or dropping a file uploads it at once; the page opens the preview in its **Checking** state ("Checking {n} rows…", skeleton rows, `aria-busy="true"`, Cancel available). The upload button is not shown with a spinner because the view changes immediately. |
| **Refused** | A [Refusal Message](./refusal-message.md) (4px `danger` bar, `danger` text, `body-strong`, alert icon) under the button with the reason (Content Rules). Announced once in the assertive region. The zone keeps its default look; choosing another file clears the message. |
| **Disabled (prerequisite)** | Choose file becomes a [Button Disabled](./button-disabled.md): `surface-disabled` fill, `text-disabled` text, 2px dashed `control-border`, lock icon, and the reason visible under it ("Import products first. Opening stock names products by SKU."). No drop zone shown; drops are ignored. Stays focusable (`aria-disabled`) with the reason in its description. |
| **Offline** | Same disabled look with cloud-off icon and "Needs internet" visible beside the button. Drops are ignored. |
| **File selected** | In the preview: file line "File: {fileName} · {n} rows" plus Choose another file in the action bar. |
| **Replaced** | Choose another file → new check; nothing from the old preview is kept. |

---

## Styling

### Visual Properties

**Size:**
- Choose file / Choose another file min `{spacing.target-min}`.
- Drop zone full width of its card; min height fits button + two text lines (no fixed height).

**Shape:** Drop zone `{rounded.md}`; button `{rounded.md}`.

**Colors:**
- Zone `{colors.surface}` with 2px dashed `{colors.control-border}` (4.0:1 / 4.4:1 against surface).
- Drag over: 2px solid `{colors.primary}`, fill `{colors.surface-alt}`.
- Drag text `{colors.text}`; hint `{colors.text-muted}`.
- Refusal: bar and text `{colors.danger}`.
- Disabled: `{colors.surface-disabled}` / `{colors.text-disabled}` with dashed `{colors.control-border}`.

**Typography:**
- Drag text and hint `{typography.body}`; drag-over text `{typography.body-strong}`.
- Button `{typography.label-button}` (via button-secondary).
- File line `{typography.body}`, `tabular-nums` for the row count.
- Refusal `{typography.body-strong}`.

**Spacing:**
- Zone padding `{spacing.5}`.
- Button to drag text `{spacing.2}`; drag text to hint `{spacing.1}`.
- Refusal `{spacing.2}` under the button / zone.

### Design Tokens

```yaml
colors:
  zone-background: '{colors.surface}'           # dark: '{colors.surface-dark}'
  zone-border: '{colors.control-border}'        # 2px dashed; dark: '{colors.control-border-dark}'
  zone-drag-border: '{colors.primary}'          # 2px solid; dark: '{colors.primary-dark}'
  zone-drag-background: '{colors.surface-alt}'  # dark: '{colors.surface-alt-dark}'
  text: '{colors.text}'                         # dark: '{colors.text-dark}'
  hint: '{colors.text-muted}'                   # dark: '{colors.text-muted-dark}'
  refusal: '{colors.danger}'                    # dark: '{colors.danger-dark}'
  disabled-background: '{colors.surface-disabled}' # dark: '{colors.surface-disabled-dark}'
  disabled-text: '{colors.text-disabled}'       # dark: '{colors.text-disabled-dark}'

typography:
  text: '{typography.body}'
  drag-over-text: '{typography.body-strong}'
  file-line: '{typography.body}'
  refusal: '{typography.body-strong}'

spacing:
  zone-padding: '{spacing.5}'
  button-min-height: '{spacing.target-min}'
  refusal-gap: '{spacing.2}'

effects:
  zone-radius: '{rounded.md}'
  shadow: none
  button: '{components.button-secondary}'
  disabled-button: '{components.button-disabled}'
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

**Choose file (click / Enter / Space):** Opens a hidden `<input type="file" accept=".xlsx">`. Picking a file starts the upload and check at once.

**Drag and drop (pointer, ≥ 600px):** Dropping one file on the zone does the same as choosing it. Dropping more than one file refuses with "Choose one file at a time." [new string]. Dropping outside the zone does nothing (the browser must not open the file: prevent default on the page).

**Cancel during check:** The preview's Cancel returns to the step card with focus on its Choose file button. Nothing was saved.

**Choose another file:** Same picker; the new file replaces the old preview.

**File-level checks** (before any preview; 09.3 Form Validation): type `.xlsx` only, ≤ 5 MB and ≤ 5,000 data rows, header matches this step's template (either language), Low-stock threshold columns name active Warehouses, at least one data row, readable.

**Duplicate safety:** One upload per choice; one check ID; reload never re-imports (import happens only on the preview's Confirm import, FR-14).

**Keyboard:** Fully usable without drag and drop.

### Animations

None. Drag-over styling switches instantly.

---

## Responsive Behaviour

| Width | Behaviour |
|---|---|
| **Phone, 320–599px** | Button only (full width) + hint; no drop zone or drag text. |
| **Tablet / desktop, ≥ 600px** | Drop zone with the button inside, full width of the step card. |
| **200% text / 400% zoom** | Zone grows; texts wrap; file names break anywhere (`overflow-wrap: anywhere`). |

---

## Accessibility

**ARIA Attributes:**
- The visible control is a `<button>` (not a styled `<label>`); the native file input is visually hidden and `tabindex="-1"`, triggered by the button.
- Button description (`aria-describedby`): the step card heading ("Step 1, Products") and the hint, so three "Choose file" buttons on one page are distinguishable.
- Refused: the refusal message is linked by `aria-describedby` and sent once to the assertive region.
- Disabled: `aria-disabled="true"` with the reason in the description; never `disabled` (stays focusable).
- Drop zone: no role, not focusable, drag text is plain text. Icons `aria-hidden`.

**Keyboard Support:**
- Tab: to Choose file.
- Enter / Space: open the picker.

**Screen Reader:**
"Choose file, button, Step 1, Products. Excel (.xlsx) only." After a refusal: the reason is announced once. When the check finishes, focus moves to the preview heading and its summary is read once (09.3).

**Never color alone:** drag-over changes border style (dashed to solid) and the text, not only the color; refusals carry an icon and words.

**Targets:** Choose file ≥ `{spacing.target-min}`; the drop zone is larger than any target but is never the only way.

---

## Content Rules

- One language per User. File names shown exactly as chosen, never translated.
- Western digits in sizes and row counts ("5,000 rows").
- Say how to fix the file, calmly.
- No glyphs; icons are SVG.

| Translation Key | BN | EN | Source |
|---|---|---|---|
| `import.upload.choose` | "ফাইল বেছে নিন" [BN: verify] | "Choose file" | 09.3 |
| `import.upload.drag` | "অথবা ফাইলটি এখানে টেনে আনুন।" [BN: verify] | "or drag the file here." | 09.3 |
| `import.upload.hint` | "শুধু Excel (.xlsx)।" [BN: verify] | "Excel (.xlsx) only." | 09.3 |
| `import.upload.drop` | "চেক করতে ফাইলটি ছেড়ে দিন" [BN: verify] | "Drop the file to check it" | 09.3 |
| `import.preview.file` | "ফাইল: {fileName} · {n}টি সারি" [BN: verify] | "File: {fileName} · {n} rows" | 09.3 |
| `import.preview.reupload` | "অন্য ফাইল বেছে নিন" [BN: verify] | "Choose another file" | 09.3 |
| `ERR_IMPORT_FILE_TYPE` | "একটি Excel ফাইল (.xlsx) বেছে নিন।" [BN: verify] | "Choose an Excel file (.xlsx)." | 09.3 |
| `ERR_IMPORT_FILE_SIZE` | "ফাইলটি অনেক বড়। সর্বোচ্চ 5,000 সারি দিন, অথবা দুটি ফাইলে ভাগ করুন।" [BN: verify] | "This file is too big. Use up to 5,000 rows, or split it into two files." | 09.3 |
| `ERR_IMPORT_WRONG_TEMPLATE` | "এটি {type}-এর টেমপ্লেট নয়। {type}-এর টেমপ্লেট ডাউনলোড করে সারিগুলো তাতে কপি করুন।" [BN: verify] | "This is not the {type} template. Download the {type} template and copy your rows into it." | 09.3 |
| `ERR_IMPORT_UNKNOWN_WAREHOUSE_COL` | "'{column}' কলামটি কোনো গুদামের সাথে মেলে না। নতুন টেমপ্লেট ডাউনলোড করুন।" [BN: verify] | "Column '{column}' does not match a warehouse. Download a new template." | 09.3 |
| `ERR_IMPORT_EMPTY` | "হেডারের নিচে কোনো সারি নেই।" [BN: verify] | "The file has no rows under the header." | 09.3 |
| `ERR_IMPORT_UNREADABLE` | "ফাইলটি খোলা যাচ্ছে না। Excel-এ .xlsx হিসেবে আবার সেভ করে চেষ্টা করুন।" [BN: verify] | "This file can't be opened. Save it again in Excel as .xlsx and try again." | 09.3 |
| `import.openingStock.needsProducts` | "আগে পণ্য আনুন। প্রারম্ভিক মজুদে পণ্যের নাম SKU দিয়ে লেখা হয়।" [BN: verify] | "Import products first. Opening stock names products by SKU." | 09.3 |
| `import.openingStock.needsWarehouses` | "আগে একটি গুদাম যোগ করুন।" [BN: verify] | "Add a warehouse first." | 09.3 |
| `common.needsInternet` | "ইন্টারনেট লাগবে" | "Needs internet" | 09.2 |
| `import.upload.oneFile` (new key) | "একবারে একটি ফাইল বেছে নিন।" [BN: verify] | "Choose one file at a time." | new |

---

## Usage

### When to Use

- Bringing a whole list into Mojud from a spreadsheet (Excel import).

### When Not to Use

- Photos or evidence attachments (none in v1).
- Typing a barcode or code: use [Input Field](./input-field.md) or the [Scan Overlay](./scan-overlay.md).

### Best Practices

- Keep the button the main path; drag and drop is a desktop bonus.
- Refuse whole-file problems immediately; leave row problems to the preview.
- Never save on upload; saving needs an explicit confirm.

---

## Used on Pages

**Pages:** 1

- [09.3 Settings: Excel import](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.3-settings-excel-import/09.3-settings-excel-import.md) — `settings-import-step-upload` (inside each [Step Card](./step-card.md)), `settings-import-step-opening-blocked` (disabled), `settings-import-status-file-refusal` (refused), `settings-import-preview-file` (file line), `settings-import-preview-reupload` (replace).

---

## Related Components

- [Step Card](./step-card.md) — hosts one File Upload per import type.
- [Button Secondary](./button-secondary.md) / [Button Disabled](./button-disabled.md) — the button itself.
- [Refusal Message](./refusal-message.md) — file-level refusal.
- [Data Table](./data-table.md) — the preview's ready rows after the check.

---

## Open Questions

| # | Question | Context | Status |
|---|---|---|---|
| 1 | The drop zone uses a 2px **dashed** `control-border`, which DESIGN.md also uses for disabled buttons and draft tags. Could a dashed zone read as "disabled"? It contains an enabled solid-outline button, which may be enough | Visual-language overlap | 🔴 Open |
| 2 | Accept `.xls` or `.csv` too? Limits 5 MB / 5,000 rows | 09.3 Open Question 8 | 🔴 Open |
| 3 | Behaviour when 2+ files are dropped: refuse (this file) or take the first? | Not in 09.3 | 🔴 Open |
| 4 | Should the tablet range (600–1023px) show the drop zone? 09.3 says "desktop and tablet"; touch tablets rarely drag files | Breakpoint check | 🔴 Open |
| 5 | Is a separate "file chip" with a remove button needed? 09.3 uses a plain file line + Choose another file; there is nothing to remove because nothing is saved | Brief mentions a file chip; specs do not | 🔴 Open |

**Status Legend:** 🔴 Open | 🟡 In Discussion | 🟢 Resolved

---

## Version History

**Created:** 2026-10-24
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created component (WDS Phase 7, new; from 09.3 Open Question 1).
