# Button Secondary [btn-003]

**Type:** Interactive
**Category:** Button
**Purpose:** Outline button for secondary actions (Go back, Use max, Close, Type code, Retry).
**DESIGN.md key:** `button-secondary` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

Outline in `control-border` with `primary` text. Min 48px on desk, 56px on floor screens. Also used for the Scan overlay's 64px Close / Type code and the Refusal message's Use max.

---

## Variants

- **desk** - min-height `{spacing.target-min}` (48px).
- **floor** - min-height `{spacing.target-floor-secondary}` (56px).

---

## States

**Required States:**

- default
- hover
- pressed
- focus
- disabled

**Optional States:**

- loading

**State Descriptions:**

**Default:** `{colors.surface}` fill, `{colors.primary}` text, 2px `{colors.control-border}`.
**Disabled:** [button-disabled](button-disabled.md).

---

## Styling

### Visual Properties

**Size:** Desk `{spacing.target-min}`; floor `{spacing.target-floor-secondary}`.  
**Shape:** `{rounded.md}`.  
**Colors:** `{colors.surface}` / `{colors.primary}` / 2px `{colors.control-border}` (4.0:1 / 4.4:1 vs surface).  
**Typography:** `{typography.label-button}`.  
**Spacing:** At least `{spacing.2}` from adjacent targets.

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.button-secondary`). Do not edit here; change DESIGN.md first.

```yaml
button-secondary:
    background: '{colors.surface}'
    text: '{colors.primary}'
    border: '2px solid {colors.control-border}'
    typography: '{typography.label-button}'
    min-height: '{spacing.target-min}'
    floor-min-height: '{spacing.target-floor-secondary}'
    radius: '{rounded.md}'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-picking.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-picking.html), [key-receiving.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-receiving.html).

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

Chosen language only (not bilingual, even on floor screens).

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Secondary and cancel-style actions.

### When Not to Use

The main action of a section.

### Best Practices

- Use `control-border`, never `border`, for the outline.

---

## Used In

**Pages:** 28

**Page IDs:** 01.1, 01.2, 01.3, 02.1, 02.2, 03.1, 03.2, 04.1, 04.2, 05.1, 05.2, 05.3, 06.1, 07.1, 07.2, 07.3, 08.1, 08.2, 09.1, 09.2, 09.3, 09.4, 09.5, 09.6, 09.7, 10.1, 10.3, 11.1

- [01.1-My tasks](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.1-my-tasks/01.1-my-tasks.md)
- [01.2-Receive PO (blind)](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.2-receive-po/01.2-receive-po.md)
- [01.3-Scan overlay](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.3-scan-overlay/01.3-scan-overlay.md)
- [02.1-Pick Dispatch order](../../C-UX-Scenarios/02-karim-picks-and-flags-damage/02.1-pick-dispatch-order/02.1-pick-dispatch-order.md)
- [02.2-Flag damage](../../C-UX-Scenarios/02-karim-picks-and-flags-damage/02.2-flag-damage/02.2-flag-damage.md)
- [03.1-issues-inbox](../../C-UX-Scenarios/03-nasima-clears-the-inbox/03.1-issues-inbox/03.1-issues-inbox.md)
- [03.2-issue-detail](../../C-UX-Scenarios/03-nasima-clears-the-inbox/03.2-issue-detail/03.2-issue-detail.md)
- [04.1-owner-view](../../C-UX-Scenarios/04-haque-traces-an-unexplained-loss/04.1-owner-view/04.1-owner-view.md)
- [04.2-low-stock](../../C-UX-Scenarios/04-haque-traces-an-unexplained-loss/04.2-low-stock/04.2-low-stock.md)
- [05.1-Transfers](../../C-UX-Scenarios/05-karims-transfer-arrives-short/05.1-transfers-list/05.1-transfers-list.md)
- [05.2-Send Transfer](../../C-UX-Scenarios/05-karims-transfer-arrives-short/05.2-send-transfer/05.2-send-transfer.md)
- [05.3-Receive Transfer (blind)](../../C-UX-Scenarios/05-karims-transfer-arrives-short/05.3-receive-transfer/05.3-receive-transfer.md)
- [06.1-My record](../../C-UX-Scenarios/06-karim-proves-where-a-carton-went/06.1-my-record/06.1-my-record.md)
- [07.1-Product search](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.1-product-search/07.1-product-search.md)
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
- [10.3-Settings: Me](../../C-UX-Scenarios/10-karim-signs-in-on-the-shared-phone/10.3-settings-me/10.3-settings-me.md)
- [11.1-Owner recovery](../../C-UX-Scenarios/11-haque-recovers-his-account/11.1-owner-recovery/11.1-owner-recovery.md)

---

## Related Components

- [Button Primary (desk) [btn-002]](button-primary.md) - pair
- [Refusal Message [alt-002]](refusal-message.md) - Use max
- [Confirmation Dialog [dlg-002]](confirmation-dialog.md) - Go back

---

## Open Questions

1. Scan overlay uses secondary buttons at 64px (`target-floor`), a third height not listed in the `button-secondary` frontmatter.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.button-secondary` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: btn-003
  name: Button Secondary
  key: button-secondary
  file: D-Design-System/components/button-secondary.md
```
