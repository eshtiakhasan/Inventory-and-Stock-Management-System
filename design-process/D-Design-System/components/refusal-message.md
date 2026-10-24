# Refusal Message [alt-002]

**Type:** Feedback
**Category:** Inline alert
**Purpose:** Inline message stating the maximum when a quantity breaks the no-negative rule.
**DESIGN.md key:** `refusal-message` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

Under the quantity entry: 4px `danger` left bar, `danger` text naming the max in the entry's units ("Only 32 ctn available. Max 32 ctn."), plus a 56px secondary "Use max" button. Its styling is reused for inline form errors and the new form error summary.

---

## Variants

- **quantity** - with Use max.
- **concurrent change** - "Stock changed just now. Max is now 30 ctn."; focus moves to Use max.
- **form message** - styling only, no Use max (sign-in, recovery, settings forms).

---

## States

**Required States:**

- default

**Optional States:**

- concurrent change

**State Descriptions:**

Checked after about 0.5 s pause; announced once per change in the assertive region. Save stays disabled (focusable, reason in description) until valid.

---

## Styling

### Visual Properties

**Size:** Use max `{spacing.target-floor-secondary}`.  
**Shape:** Left bar only; no radius [ASSUMPTION].  
**Colors:** `{colors.surface}`; `{colors.danger}` text and 4px left bar (7.2:1 / 8.3:1).  
**Typography:** `{typography.body-strong}`.  
**Spacing:** Padding-left `{spacing.3}` [ASSUMPTION]; `{spacing.2}` above Use max.

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.refusal-message`). Do not edit here; change DESIGN.md first.

```yaml
refusal-message:
    background: '{colors.surface}'
    text: '{colors.danger}'
    border-left: '4px solid {colors.danger}'
    typography: '{typography.body-strong}'
    use-max-button: '{components.button-secondary} at {spacing.target-floor-secondary}'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-picking.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-picking.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

Use max sets the field to the max.

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** Field `aria-describedby` → message; message in the assertive region once per change.

**Keyboard Support:** Tab reaches Use max.

**Screen Reader:** "Only 32 cartons available. Max 32 cartons."

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

Names the limit in the entry's units; never "Invalid quantity"; no blame words.

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

No-negative refusals; send-refused draft lines; inline form errors.

### When Not to Use

Offline / sync status.

### Best Practices

- Always offer Use max for quantity refusals.

---

## Used In

**Pages:** 17

**Page IDs:** 02.1, 02.2, 03.1, 03.2, 05.2, 07.2, 07.3, 09.1, 09.2, 09.3, 09.4, 09.5, 09.6, 09.7, 10.1, 10.2, 11.1

- [02.1-Pick Dispatch order](../../C-UX-Scenarios/02-karim-picks-and-flags-damage/02.1-pick-dispatch-order/02.1-pick-dispatch-order.md)
- [02.2-Flag damage](../../C-UX-Scenarios/02-karim-picks-and-flags-damage/02.2-flag-damage/02.2-flag-damage.md)
- [03.1-issues-inbox](../../C-UX-Scenarios/03-nasima-clears-the-inbox/03.1-issues-inbox/03.1-issues-inbox.md)
- [03.2-issue-detail](../../C-UX-Scenarios/03-nasima-clears-the-inbox/03.2-issue-detail/03.2-issue-detail.md)
- [05.2-Send Transfer](../../C-UX-Scenarios/05-karims-transfer-arrives-short/05.2-send-transfer/05.2-send-transfer.md)
- [07.2-Product stock](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.2-product-stock/07.2-product-stock.md)
- [07.3-Dispatch orders](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.3-dispatch-orders/07.3-dispatch-orders.md)
- [09.1-sign-up](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.1-sign-up/09.1-sign-up.md)
- [09.2-settings-warehouses](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.2-settings-warehouses/09.2-settings-warehouses.md)
- [09.3-settings-excel-import](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.3-settings-excel-import/09.3-settings-excel-import.md)
- [09.4-settings-products](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.4-settings-products/09.4-settings-products.md)
- [09.5-settings-suppliers](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.5-settings-suppliers/09.5-settings-suppliers.md)
- [09.6-settings-users](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.6-settings-users/09.6-settings-users.md)
- [09.7-purchase-orders](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.7-purchase-orders/09.7-purchase-orders.md)
- [10.1-Sign in](../../C-UX-Scenarios/10-karim-signs-in-on-the-shared-phone/10.1-sign-in/10.1-sign-in.md)
- [10.2-Change temporary password](../../C-UX-Scenarios/10-karim-signs-in-on-the-shared-phone/10.2-change-temporary-password/10.2-change-temporary-password.md)
- [11.1-Owner recovery](../../C-UX-Scenarios/11-haque-recovers-his-account/11.1-owner-recovery/11.1-owner-recovery.md)

---

## Related Components

- [Quantity Entry [inp-001]](quantity-entry.md) - host
- [Button Secondary [btn-003]](button-secondary.md) - Use max
- [form-error-summary [alt-101]](form-error-summary.md) - built from these tokens (new, alt-101)

---

## Open Questions

1. No icon specified; DESIGN.md relies on bar + text. Consider an alert icon for 'never color alone' (text already names the problem).

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.refusal-message` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: alt-002
  name: Refusal Message
  key: refusal-message
  file: D-Design-System/components/refusal-message.md
```

Variant explosion check (step-08d): 3 variants, within the recommended maximum of 5.
