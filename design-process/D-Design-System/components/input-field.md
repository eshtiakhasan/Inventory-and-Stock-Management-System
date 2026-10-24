# Input Field [inp-002]

**Type:** Form
**Category:** Text input
**Purpose:** Single text input with label, focus and error states; base for money, date and multiline variants.
**DESIGN.md key:** `input-field` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

Min 48px, 1px `control-border`, 2px `primary` focus, 2px `danger` error with message below. Password fields add a 48px show/hide button. Product search field is an input-field at 56px with a search icon left and a 48px scan icon button right (DESIGN.md prose; no frontmatter key).

---

## Variants

- **text** - default single line (names, phone, SKU, note).
- **password** - adds a 48px show/hide toggle; `autocomplete` rules per Accessibility Floor (Shared phone: `autocomplete="off"`).
- **search** - Product search field: min 56px, search icon left, 48px scan button right.
- **money** - (added 2026-10-24, step-08d) ৳ prefix, digits only, lakh grouping on blur (৳12,45,000), tabular-nums. Used for Unit cost (09.4, 09.7). Per-unit chips beside it are [choice-chip](choice-chip.md)s.
- **date** - (added 2026-10-24) native date picker; value shown as dd/MM/yyyy with Western digits. Used for PO expected date (09.7), Dispatch required date (07.3), history custom range (07.2).
- **multiline** - (added 2026-10-24) text area, min 3 lines of `body` (4.5rem), grows with content. Used for Supplier address (09.5) and Issue comments (03.2).

### Variant-Specific Styling

**Money:** ← Added 2026-10-24
- ৳ prefix inside the field, left, `{colors.text-muted}`, `{typography.body}`; not part of the value
- `inputmode="decimal"`; digits `{typography.body}` + `font-variant-numeric: tabular-nums`; right-aligned [ASSUMPTION]
- On focus: raw number (no commas); on blur: lakh grouping (12,45,000) in both languages, Western digits

**Date:** ← Added 2026-10-24
- `<input type="date">`; same border / focus / error tokens
- Display format dd/MM/yyyy, Western digits, in both languages; calendar icon from the browser

**Multiline:** ← Added 2026-10-24
- `<textarea>`; min-height 3 lines of `{typography.body}` (3 × 1.5rem = 4.5rem); auto-grows; no resize handle required
- Same border / focus / error tokens; `{rounded.sm}`

### Variant Usage

**Text / password / search:** see Used In
**Money:** 09.4, 09.7
**Date:** 07.2, 07.3, 09.7
**Multiline:** 03.2, 09.5

---

## States

**Required States:**

- default
- focus
- filled
- error
- disabled

**Optional States:**

- read-only
- offline
- loading (search results)

**State Descriptions:**

**Focus:** 2px `{colors.primary}` border (+ focus ring on keyboard focus).
**Error:** 2px `{colors.danger}` border; message below in `{colors.danger}` (refusal-message style); `aria-invalid`.
**Disabled:** `{colors.surface-disabled}` fill, `{colors.text-disabled}` text, dashed `{colors.control-border}`, visible reason.
**Offline:** fields on internet-only forms are disabled with "Needs internet" at form level; floor notes still work.

---

## Styling

### Visual Properties

**Size:** min-height `{spacing.target-min}` (search 56px = `{spacing.target-floor-secondary}`).  
**Shape:** `{rounded.sm}`.  
**Colors:** Field `{colors.surface}`; border 1px `{colors.control-border}` (4.0:1 / 4.4:1); text `{colors.text}`; label `{colors.text}`; hint `{colors.text-muted}`.  
**Typography:** `{typography.body}`; label `{typography.body-strong}` [ASSUMPTION: label token not in frontmatter].  
**Spacing:** Inner padding `{spacing.3}` [ASSUMPTION]; label `{spacing.1}` above; error `{spacing.1}` below.

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.input-field`). Do not edit here; change DESIGN.md first.

```yaml
input-field:
    min-height: '{spacing.target-min}'
    border: '1px solid {colors.control-border}'
    focus-border: '2px solid {colors.primary}'
    error-border: '2px solid {colors.danger}'
    radius: '{rounded.sm}'
    typography: '{typography.body}'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-picking.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-picking.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

Paste and password managers allowed (except Shared phone password). Enter submits desk forms.

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** Visible `<label for>`; `aria-describedby` → hint and error; `aria-invalid` on error; correct `autocomplete` (`tel`, `current-password`, `new-password`, `one-time-code`).

**Keyboard Support:** Standard text input.

**Screen Reader:** Label, value, hint, error.

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

Labels and hints in the chosen language; user-entered names stored and shown exactly as typed.

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Any free-text, money, date or long text entry.

### When Not to Use

Quantities (use quantity-entry); fixed options (use choice-chip or combobox).

### Best Practices

- Never placeholder-only labels.
- Money always ৳ with lakh grouping.

---

## Used In

**Pages:** 17

**Page IDs:** 01.3, 02.2, 03.2, 07.1, 07.2, 07.3, 08.1, 09.1, 09.2, 09.4, 09.5, 09.6, 09.7, 10.1, 10.2, 10.3, 11.1

- [01.3-Scan overlay](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.3-scan-overlay/01.3-scan-overlay.md)
- [02.2-Flag damage](../../C-UX-Scenarios/02-karim-picks-and-flags-damage/02.2-flag-damage/02.2-flag-damage.md)
- [03.2-issue-detail](../../C-UX-Scenarios/03-nasima-clears-the-inbox/03.2-issue-detail/03.2-issue-detail.md)
- [07.1-Product search](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.1-product-search/07.1-product-search.md)
- [07.2-Product stock](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.2-product-stock/07.2-product-stock.md)
- [07.3-Dispatch orders](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.3-dispatch-orders/07.3-dispatch-orders.md)
- [08.1-Stock counts](../../C-UX-Scenarios/08-rafiq-runs-the-weekly-count/08.1-stock-counts/08.1-stock-counts.md)
- [09.1-sign-up](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.1-sign-up/09.1-sign-up.md)
- [09.2-settings-warehouses](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.2-settings-warehouses/09.2-settings-warehouses.md)
- [09.4-settings-products](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.4-settings-products/09.4-settings-products.md)
- [09.5-settings-suppliers](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.5-settings-suppliers/09.5-settings-suppliers.md)
- [09.6-settings-users](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.6-settings-users/09.6-settings-users.md)
- [09.7-purchase-orders](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.7-purchase-orders/09.7-purchase-orders.md)
- [10.1-Sign in](../../C-UX-Scenarios/10-karim-signs-in-on-the-shared-phone/10.1-sign-in/10.1-sign-in.md)
- [10.2-Change temporary password](../../C-UX-Scenarios/10-karim-signs-in-on-the-shared-phone/10.2-change-temporary-password/10.2-change-temporary-password.md)
- [10.3-Settings: Me](../../C-UX-Scenarios/10-karim-signs-in-on-the-shared-phone/10.3-settings-me/10.3-settings-me.md)
- [11.1-Owner recovery](../../C-UX-Scenarios/11-haque-recovers-his-account/11.1-owner-recovery/11.1-owner-recovery.md)

**Variant usage:** money: 09.4, 09.7; date: 07.2, 07.3, 09.7; multiline: 03.2, 09.5

---

## Related Components

- [Quantity Entry [inp-001]](quantity-entry.md) - numeric quantities
- [combobox [drp-101]](combobox.md) - searchable select (new, drp-101)
- [form-error-summary [alt-101]](form-error-summary.md) - form-level errors (new, alt-101)

---

## Open Questions

1. Label typography and inner padding are not in frontmatter.
2. Product search field (56px) and password toggle exist only in DESIGN.md prose, not as frontmatter keys.
3. Money: decimals allowed for Unit cost? (paisa) - not specified.
4. Multiline min-height 4.5rem is derived, not a spacing token.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.input-field` (WDS Phase 7, Create).
- 2026-10-24: Added variants `money`, `date`, `multiline` (step-08d, duplicate detection: page-spec requests in 09.4, 09.5, 09.7, 07.3, 03.2 matched input-field).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: inp-002
  name: Input Field
  key: input-field
  file: D-Design-System/components/input-field.md
```

Variant explosion check (step-08d): this component has 6 variants, above the recommended maximum of 5. They share one token set (border, focus, error, radius, typography), so they stay together for now; splitting `multiline` (and possibly `search`) into their own components is an open question.
