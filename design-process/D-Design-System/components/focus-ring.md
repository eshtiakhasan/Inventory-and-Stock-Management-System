# Focus Ring [div-001]

**Type:** Interactive
**Category:** Focus indicator (style primitive)
**Purpose:** Two-tone keyboard focus indicator applied to every focusable element.
**DESIGN.md key:** `focus-ring` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

Shown on `:focus-visible` only: a 2px inner line in `surface` plus a 3px outer line in `text`. One of the two lines is always ≥ 3:1 against whatever it touches. It never uses `primary`, so focus is never confused with selection (primary border + check) or the current-line bar. WDS prefix note: no step-08b prefix exists for focus indicators; `div` (line / stroke primitive) is the closest.

---

## Variants

- **light** - inner `{colors.surface}`, outer `{colors.text}`.
- **dark** - inner `{colors.surface-dark}`, outer `{colors.text-dark}`.

---

## States

**Required States:**

- visible on keyboard focus

**Optional States:**

- none

**State Descriptions:**

Applies only for `:focus-visible`; mouse and touch focus show no ring.

---

## Styling

### Visual Properties

**Size:** Inner 2px + outer 3px (5px total).  
**Shape:** Follows the element's radius.  
**Colors:** Inner `{colors.surface}` / `{colors.surface-dark}`; outer `{colors.text}` / `{colors.text-dark}`. Contrast: inner surface vs primary 8.1:1 / 10.3:1, vs warning 6.6:1 / 10.1:1, vs danger 7.2:1 / 8.3:1; outer text vs surface 17.1:1 / 16.2:1.  
**Typography:** n/a  
**Spacing:** Drawn outside the element (e.g. `box-shadow: 0 0 0 2px inner, 0 0 0 5px outer`) so it does not shift layout [ASSUMPTION: implementation technique].

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.focus-ring`). Do not edit here; change DESIGN.md first.

```yaml
focus-ring:
    inner: '2px {colors.surface} (dark: {colors.surface-dark})'
    outer: '3px solid {colors.text} (dark: {colors.text-dark})'
    selector: ':focus-visible'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: all key mocks.

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

None.

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** n/a

**Keyboard Support:** Appears on every Tab stop.

**Screen Reader:** n/a

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

n/a

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Every focusable element.

### When Not to Use

Never replace with `primary` outlines or remove with `outline: none` without this replacement.

### Best Practices

- Focused elements are never hidden under the app bar, fixed bottom zone or a toast (`scroll-padding`).
- Test on teal, amber and red fills in both modes.

---

## Used In

**Pages:** 26

**Page IDs:** 01.1, 01.2, 01.3, 01.4, 02.1, 02.2, 03.1, 03.2, 04.1, 04.2, 05.1, 05.2, 05.3, 06.1, 07.1, 07.2, 07.3, 08.1, 08.2, 09.1, 09.2, 09.3, 10.1, 10.2, 10.3, 11.1

- [01.1-My tasks](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.1-my-tasks/01.1-my-tasks.md)
- [01.2-Receive PO (blind)](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.2-receive-po/01.2-receive-po.md)
- [01.3-Scan overlay](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.3-scan-overlay/01.3-scan-overlay.md)
- [01.4-Offline queue](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.4-offline-queue/01.4-offline-queue.md)
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
- [10.1-Sign in](../../C-UX-Scenarios/10-karim-signs-in-on-the-shared-phone/10.1-sign-in/10.1-sign-in.md)
- [10.2-Change temporary password](../../C-UX-Scenarios/10-karim-signs-in-on-the-shared-phone/10.2-change-temporary-password/10.2-change-temporary-password.md)
- [10.3-Settings: Me](../../C-UX-Scenarios/10-karim-signs-in-on-the-shared-phone/10.3-settings-me/10.3-settings-me.md)
- [11.1-Owner recovery](../../C-UX-Scenarios/11-haque-recovers-his-account/11.1-owner-recovery/11.1-owner-recovery.md)

---

## Related Components

- [Owner Metric Tile [crd-004]](owner-metric-tile.md) - selected state must stay distinct from focus
- [Task Card [crd-002]](task-card.md) - current-line bar must stay distinct from focus

---

## Open Questions

1. Implementation (box-shadow vs outline + outline-offset) is not fixed; Windows High Contrast mode needs an `outline` fallback.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.focus-ring` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: div-001
  name: Focus Ring
  key: focus-ring
  file: D-Design-System/components/focus-ring.md
```
