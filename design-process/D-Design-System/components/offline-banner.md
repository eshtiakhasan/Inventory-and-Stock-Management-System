# Offline Banner [alt-001]

**Type:** Feedback
**Category:** Banner
**Purpose:** Full-width strip under the app bar while offline, with queued-action count.
**DESIGN.md key:** `offline-banner` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

Appears within 2 s of losing connection and stays until back online. `warning` fill, cloud-off icon, text with the queued count ("Offline · 3 actions waiting"). Tap opens the Offline queue (S21). Never blocks recording.

---

## Variants

- **offline** - "Offline · {n} actions waiting".
- **syncing** - "Syncing 3…" when back online with items still syncing; then disappears.
- **20 h warning** - "Connect within 4 hours to keep recording. Your saved work is safe."
- **24 h paused** - "Connect to Wi-Fi or mobile data to keep recording. Your saved work is safe."
- **another person** - adds "{n} actions from another person waiting to sync" (DD-8).

---

## States

**Required States:**

- offline
- focus

**Optional States:**

- syncing
- 20 h warning
- 24 h paused

**State Descriptions:**

Announced once per change via the polite region (20 h warning announced once).

---

## Styling

### Visual Properties

**Size:** Full width; min-height `{spacing.target-min}`.  
**Shape:** Square [ASSUMPTION: no radius in frontmatter].  
**Colors:** `{colors.warning}` / `{colors.on-warning}` (6.6:1 / 9.1:1).  
**Typography:** `{typography.body-strong}`.  
**Spacing:** Padding `{spacing.2}` × `{spacing.gutter-phone}` [ASSUMPTION].

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.offline-banner`). Do not edit here; change DESIGN.md first.

```yaml
offline-banner:
    background: '{colors.warning}'
    text: '{colors.on-warning}'
    typography: '{typography.body-strong}'
    min-height: '{spacing.target-min}'
    icon: cloud-off
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-picking.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-picking.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

Tap opens Offline queue (S21).

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** A link/button whose text is the message; changes go to the polite live region.

**Keyboard Support:** Enter opens the queue.

**Screen Reader:** "Offline, 3 actions waiting, link".

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

Chosen language, Western digits ("অফলাইন · 3টি কাজ অপেক্ষায়").

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Whenever offline or syncing.

### When Not to Use

Errors unrelated to connection.

### Best Practices

- Never use warning for errors or the Unexplained state.

---

## Used In

**Pages:** 24

**Page IDs:** 01.1, 01.2, 01.4, 02.1, 03.1, 04.1, 04.2, 05.1, 05.2, 05.3, 06.1, 07.1, 07.2, 07.3, 08.1, 08.2, 09.1, 09.2, 09.3, 09.7, 10.1, 10.2, 10.3, 11.1

- [01.1-My tasks](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.1-my-tasks/01.1-my-tasks.md)
- [01.2-Receive PO (blind)](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.2-receive-po/01.2-receive-po.md)
- [01.4-Offline queue](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.4-offline-queue/01.4-offline-queue.md)
- [02.1-Pick Dispatch order](../../C-UX-Scenarios/02-karim-picks-and-flags-damage/02.1-pick-dispatch-order/02.1-pick-dispatch-order.md)
- [03.1-issues-inbox](../../C-UX-Scenarios/03-nasima-clears-the-inbox/03.1-issues-inbox/03.1-issues-inbox.md)
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
- [09.7-purchase-orders](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.7-purchase-orders/09.7-purchase-orders.md)
- [10.1-Sign in](../../C-UX-Scenarios/10-karim-signs-in-on-the-shared-phone/10.1-sign-in/10.1-sign-in.md)
- [10.2-Change temporary password](../../C-UX-Scenarios/10-karim-signs-in-on-the-shared-phone/10.2-change-temporary-password/10.2-change-temporary-password.md)
- [10.3-Settings: Me](../../C-UX-Scenarios/10-karim-signs-in-on-the-shared-phone/10.3-settings-me/10.3-settings-me.md)
- [11.1-Owner recovery](../../C-UX-Scenarios/11-haque-recovers-his-account/11.1-owner-recovery/11.1-owner-recovery.md)

---

## Related Components

- [App Bar [bar-001]](app-bar.md) - sits under it
- [Sync Status Chip [pil-003]](sync-status-chip.md) - per-line status

---

## Open Questions

1. Radius and padding not in frontmatter.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.offline-banner` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: alt-001
  name: Offline Banner
  key: offline-banner
  file: D-Design-System/components/offline-banner.md
```

Variant explosion check (step-08d): 5 variants, within the recommended maximum of 5.
