# Button Primary (desk) [btn-002]

**Type:** Interactive
**Category:** Button
**Purpose:** Main action on desk screens and forms.
**DESIGN.md key:** `button-primary` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

Desk primary button, min 56px, `primary` fill. Label in the chosen language only (not bilingual). One per section.

---

## Variants

This component has no variants.

---

## States

**Required States:**

- default
- hover
- pressed
- focus
- loading
- disabled (aria-disabled)

**Optional States:**

- offline (Needs internet)

**State Descriptions:**

**Hover:** underline the label [ASSUMPTION: no hover token in DESIGN.md].
**Loading:** spinner inside, disabled until done.
**Disabled / Offline:** switches to [button-disabled](button-disabled.md) with lock or cloud-off icon and visible reason ("Needs internet").

---

## Styling

### Visual Properties

**Size:** min-height `{spacing.button-desk}` (56px).  
**Shape:** `{rounded.md}`.  
**Colors:** `{colors.primary}` / `{colors.on-primary}`.  
**Typography:** `{typography.label-button}`.  
**Spacing:** Horizontal padding `{spacing.4}` [ASSUMPTION].

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.button-primary`). Do not edit here; change DESIGN.md first.

```yaml
button-primary:
    background: '{colors.primary}'
    text: '{colors.on-primary}'
    typography: '{typography.label-button}'
    min-height: '{spacing.button-desk}'
    radius: '{rounded.md}'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-owner-view.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-owner-view.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

Click / Enter runs the action. Enter submits desktop forms.

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** Native `<button>`; `aria-disabled` + described-by reason when disabled; `aria-busy` while saving.

**Keyboard Support:** Enter / Space.

**Screen Reader:** Label + state.

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

Chosen language only; label names the action.

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Desk forms and pages; dialog confirm on desk.

### When Not to Use

Floor screens (use button-primary-floor).

### Best Practices

- One primary per section.
- Right-aligned in desk dialogs, confirm rightmost.

---

## Used In

**Pages:** 17

**Page IDs:** 03.2, 05.1, 05.3, 07.2, 07.3, 08.1, 09.1, 09.2, 09.3, 09.4, 09.5, 09.6, 09.7, 10.1, 10.2, 10.3, 11.1

- [03.2-issue-detail](../../C-UX-Scenarios/03-nasima-clears-the-inbox/03.2-issue-detail/03.2-issue-detail.md)
- [05.1-Transfers](../../C-UX-Scenarios/05-karims-transfer-arrives-short/05.1-transfers-list/05.1-transfers-list.md)
- [05.3-Receive Transfer (blind)](../../C-UX-Scenarios/05-karims-transfer-arrives-short/05.3-receive-transfer/05.3-receive-transfer.md)
- [07.2-Product stock](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.2-product-stock/07.2-product-stock.md)
- [07.3-Dispatch orders](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.3-dispatch-orders/07.3-dispatch-orders.md)
- [08.1-Stock counts](../../C-UX-Scenarios/08-rafiq-runs-the-weekly-count/08.1-stock-counts/08.1-stock-counts.md)
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

- [Floor Primary Button [btn-001]](button-primary-floor.md) - floor counterpart
- [Button Secondary [btn-003]](button-secondary.md) - pair
- [Button Danger [btn-005]](button-danger.md) - destructive alternative

---

## Open Questions

1. Horizontal padding and hover treatment are not in frontmatter.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.button-primary` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: btn-002
  name: Button Primary (desk)
  key: button-primary
  file: D-Design-System/components/button-primary.md
```
