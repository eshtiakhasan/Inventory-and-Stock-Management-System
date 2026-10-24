# Button Disabled [btn-006]

**Type:** Interactive
**Category:** Button state
**Purpose:** Shared disabled treatment for any button: dashed edge, icon and a visible reason.
**DESIGN.md key:** `button-disabled` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

Not a separate button but the disabled appearance applied to any button. Flat `surface-disabled` fill, `text-disabled` text, 2px **dashed** `control-border`, a lock or cloud-off icon, and the reason ("Needs internet", "Enter a quantity") visible beside or under it. Never a faded primary button.

---

## Variants

- **locked** - lock icon (rule or permission reason).
- **needs internet** - cloud-off icon, reason "Needs internet" / "ইন্টারনেট লাগবে".

---

## States

**Required States:**

- disabled (focusable)

**Optional States:**

- focus

**State Descriptions:**

Stays focusable (`aria-disabled="true"`) so keyboard and screen-reader users find the reason.

---

## Styling

### Visual Properties

**Size:** Same min-height as the button it replaces.  
**Shape:** Same radius as the button it replaces.  
**Colors:** `{colors.surface-disabled}` / `{colors.text-disabled}` (5.4:1 / 6.9:1); dashed `{colors.control-border}` (3.3:1 / 3.6:1 vs surface-disabled).  
**Typography:** Label as the original button; reason `{typography.body}` in `{colors.text-muted}`.  
**Spacing:** Reason `{spacing.1}` below or `{spacing.2}` beside [ASSUMPTION].

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.button-disabled`). Do not edit here; change DESIGN.md first.

```yaml
button-disabled:
    background: '{colors.surface-disabled}'
    text: '{colors.text-disabled}'
    border: '2px dashed {colors.control-border}'
    icon: 'lock or cloud-off'
    reason-text: '{typography.body} in {colors.text-muted}, visible next to the button'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-picking.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-picking.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

Activation does nothing (or re-announces the reason).

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** `aria-disabled="true"`; `aria-describedby` → reason text. Do not use the `disabled` attribute (removes focus).

**Keyboard Support:** Focusable; Enter / Space does nothing.

**Screen Reader:** "Decide, button, unavailable, Needs internet".

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

Reason in the chosen language, plain and calm.

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Any action unavailable now (offline, invalid input, permission).

### When Not to Use

Actions outside the Role (hide them instead).

### Best Practices

- Reason never only in a tooltip.

---

## Used In

**Pages:** 22

**Page IDs:** 01.2, 02.1, 02.2, 03.1, 03.2, 05.2, 05.3, 07.2, 07.3, 08.1, 08.2, 09.1, 09.2, 09.3, 09.4, 09.5, 09.6, 09.7, 10.1, 10.2, 10.3, 11.1

- [01.2-Receive PO (blind)](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.2-receive-po/01.2-receive-po.md)
- [02.1-Pick Dispatch order](../../C-UX-Scenarios/02-karim-picks-and-flags-damage/02.1-pick-dispatch-order/02.1-pick-dispatch-order.md)
- [02.2-Flag damage](../../C-UX-Scenarios/02-karim-picks-and-flags-damage/02.2-flag-damage/02.2-flag-damage.md)
- [03.1-issues-inbox](../../C-UX-Scenarios/03-nasima-clears-the-inbox/03.1-issues-inbox/03.1-issues-inbox.md)
- [03.2-issue-detail](../../C-UX-Scenarios/03-nasima-clears-the-inbox/03.2-issue-detail/03.2-issue-detail.md)
- [05.2-Send Transfer](../../C-UX-Scenarios/05-karims-transfer-arrives-short/05.2-send-transfer/05.2-send-transfer.md)
- [05.3-Receive Transfer (blind)](../../C-UX-Scenarios/05-karims-transfer-arrives-short/05.3-receive-transfer/05.3-receive-transfer.md)
- [07.2-Product stock](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.2-product-stock/07.2-product-stock.md)
- [07.3-Dispatch orders](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.3-dispatch-orders/07.3-dispatch-orders.md)
- [08.1-Stock counts](../../C-UX-Scenarios/08-rafiq-runs-the-weekly-count/08.1-stock-counts/08.1-stock-counts.md)
- [08.2-Count lines (blind)](../../C-UX-Scenarios/08-rafiq-runs-the-weekly-count/08.2-count-lines/08.2-count-lines.md)
- [09.1-sign-up](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.1-sign-up/09.1-sign-up.md)
- [09.2-settings-warehouses](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.2-settings-warehouses/09.2-settings-warehouses.md)
- [09.3-settings-excel-import](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.3-settings-excel-import/09.3-settings-excel-import.md)
- [09.4-settings-products](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.4-settings-products/09.4-settings-products.md)
- [09.5-settings-suppliers](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.5-settings-suppliers/09.5-settings-suppliers.md)
- [09.6-settings-users](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.6-settings-users/09.6-settings-users.md)
- [09.7-purchase-orders](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.7-purchase-orders/09.7-purchase-orders.md)
- [10.1-Sign in](../../C-UX-Scenarios/10-karim-signs-in-on-the-shared-phone/10.1-sign-in/10.1-sign-in.md)
- [10.2-Change temporary password](../../C-UX-Scenarios/10-karim-signs-in-on-the-shared-phone/10.2-change-temporary-password/10.2-change-temporary-password.md)
- [10.3-Settings: Me](../../C-UX-Scenarios/10-karim-signs-in-on-the-shared-phone/10.3-settings-me/10.3-settings-me.md)
- [11.1-Owner recovery](../../C-UX-Scenarios/11-haque-recovers-his-account/11.1-owner-recovery/11.1-owner-recovery.md)

---

## Related Components

- [Button Primary (desk) [btn-002]](button-primary.md) - host
- [Issue Decision Button [btn-007]](issue-decision-button.md) - offline state
- [Month Selector [nav-002]](month-selector.md) - next on current month

---

## Open Questions

1. Frontmatter has no min-height, radius or typography for `button-disabled`; this spec inherits from the host button.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.button-disabled` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: btn-006
  name: Button Disabled
  key: button-disabled
  file: D-Design-System/components/button-disabled.md
```
