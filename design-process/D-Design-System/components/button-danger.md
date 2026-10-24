# Button Danger [btn-005]

**Type:** Interactive
**Category:** Button
**Purpose:** Filled red button for actions that cancel, remove or deactivate, and the Flag damage sheet save.
**DESIGN.md key:** `button-danger` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

`danger` fill with `on-danger` text. Used as the confirm of danger confirmation dialogs (Discard draft, Cancel order, Deactivate, Archive, Sign out anyway) and as the Flag damage sheet's 64px bilingual save.

---

## Variants

- **desk** - chosen language only.
- **floor** - bilingual (Flag damage sheet: "ক্ষতি জানান · Flag damage").

---

## States

**Required States:**

- default
- pressed
- focus
- loading
- disabled

**Optional States:**

- offline

**State Descriptions:**

**Default:** `{colors.danger}` / `{colors.on-danger}` (7.2:1 / 8.2:1).
**Disabled:** [button-disabled](button-disabled.md).

---

## Styling

### Visual Properties

**Size:** min-height `{spacing.target-floor}` (64px).  
**Shape:** `{rounded.md}`.  
**Colors:** `{colors.danger}` / `{colors.on-danger}`.  
**Typography:** `{typography.label-button}`.  
**Spacing:** As button-primary.

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.button-danger`). Do not edit here; change DESIGN.md first.

```yaml
button-danger:
    background: '{colors.danger}'
    text: '{colors.on-danger}'
    typography: '{typography.label-button}'
    min-height: '{spacing.target-floor}'
    radius: '{rounded.md}'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-picking.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-picking.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

As button-primary.

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** Native `<button>`.

**Keyboard Support:** Enter / Space.

**Screen Reader:** Label + state.

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

Label names the action ("Discard draft"), never "OK" or "Yes".

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Destructive confirms; Flag damage sheet save.

### When Not to Use

Primary actions; the Scan bar.

### Best Practices

- Never the default-focused button in a dialog (focus starts on Go back).

---

## Used In

**Pages:** 9

**Page IDs:** 02.2, 07.3, 09.2, 09.3, 09.4, 09.5, 09.6, 09.7, 11.1

- [02.2-Flag damage](../../C-UX-Scenarios/02-karim-picks-and-flags-damage/02.2-flag-damage/02.2-flag-damage.md)
- [07.3-Dispatch orders](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.3-dispatch-orders/07.3-dispatch-orders.md)
- [09.2-settings-warehouses](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.2-settings-warehouses/09.2-settings-warehouses.md)
- [09.3-settings-excel-import](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.3-settings-excel-import/09.3-settings-excel-import.md)
- [09.4-settings-products](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.4-settings-products/09.4-settings-products.md)
- [09.5-settings-suppliers](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.5-settings-suppliers/09.5-settings-suppliers.md)
- [09.6-settings-users](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.6-settings-users/09.6-settings-users.md)
- [09.7-purchase-orders](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.7-purchase-orders/09.7-purchase-orders.md)
- [11.1-Owner recovery](../../C-UX-Scenarios/11-haque-recovers-his-account/11.1-owner-recovery/11.1-owner-recovery.md)

---

## Related Components

- [Confirmation Dialog [dlg-002]](confirmation-dialog.md) - host
- [Bottom Sheet [sht-001]](bottom-sheet.md) - Flag damage sheet

---

## Open Questions

1. Desk height: frontmatter sets 64px for every use; desk `button-primary` is 56px.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.button-danger` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: btn-005
  name: Button Danger
  key: button-danger
  file: D-Design-System/components/button-danger.md
```
