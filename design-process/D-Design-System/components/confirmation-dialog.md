# Confirmation Dialog [dlg-002]

**Type:** Feedback
**Category:** Alert dialog
**Purpose:** Confirms an action that closes or removes something in one go.
**DESIGN.md key:** `confirmation-dialog` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

Used only for the list in EXPERIENCE.md → Confirm vs undo: Mark delivery complete, Finish receipt, Confirm dispatch with lines short, Close Stock count, Discard draft Transfer, Sign out with unsynced actions, Cancel Dispatch order, Close PO short, Confirm Excel import, Deactivate User / Warehouse, Archive Product, Regenerate recovery code. Never on routine floor actions or one-tap Issue decisions. Title is a question; body is one consequence sentence.

---

## Variants

- **confirm** - confirm button is [button-primary](button-primary.md).
- **danger** - confirm is [button-danger](button-danger.md) when the action cancels, removes or deactivates something.
- **floor** - on floor screens the confirm button is a [button-primary-floor](button-primary-floor.md) (64px, bilingual).
- **layout:** phones = bottom-anchored card, buttons full width stacked, confirm at the bottom, Go back above it; desk = centered card, buttons right-aligned, confirm rightmost.

---

## States

**Required States:**

- default
- focus on Go back

**Optional States:**

- confirm loading
- offline
- with warning line

**State Descriptions:**

**Default:** initial focus on **Go back**.
**Confirm loading:** spinner inside the confirm button while saving (< 2 s); both buttons disabled to prevent double submits.
**With warning line:** e.g. Close count "2 lines from Karim not received yet" (DD-6).
**Offline:** actions that need internet never open the dialog; their trigger button shows the Needs internet disabled state instead.

---

## Styling

### Visual Properties

**Size:** Phone: full width minus `{spacing.2}` inset; desk: max width [ASSUMPTION: not specified].  
**Shape:** `{rounded.lg}`.  
**Colors:** Card `{colors.surface}` over `{colors.scrim}` / `{colors.scrim-dark}`. Light mode shadow `0 6px 16px` at ~25%; dark mode no shadow.  
**Typography:** Title `{typography.headline}`; sentence `{typography.body}`.  
**Spacing:** Padding `{spacing.4}` (top `{spacing.5}`); button gap `{spacing.3}` (as specified on 01.2).

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.confirmation-dialog`). Do not edit here; change DESIGN.md first.

```yaml
confirmation-dialog:
    background: '{colors.surface}'
    backdrop: '{colors.scrim}'
    radius: '{rounded.lg}'
    title-typography: '{typography.headline}'
    body-typography: '{typography.body}'
    confirm: '{components.button-primary} (or {components.button-danger} when the action removes or cancels)'
    go-back: '{components.button-secondary}'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-receiving.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-receiving.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

Escape / Back = Go back. The backdrop does nothing. Confirm runs the action and closes; focus returns to the opener or the next logical element.

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** `role="alertdialog"`, `aria-modal="true"`, `aria-labelledby` = title, `aria-describedby` = consequence sentence. Page behind inert; focus trapped.

**Keyboard Support:** Tab cycles buttons; Escape = Go back; Enter on focused button.

**Screen Reader:** Announces title (question) and the consequence sentence.

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

Labels name the action ("Finish delivery", "Cancel order"), never "OK". Go back = "ফিরে যান" / "Go back". Blind dialogs count lines, never quantities.

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Irreversible closing or removing actions from the Confirm vs undo list.

### When Not to Use

Routine floor saves, one-tap Issue decisions, anything with an Undo-like correction path.

### Best Practices

- One consequence sentence only.
- Danger style only when something is cancelled, removed or deactivated.

---

## Used In

**Pages:** 14

**Page IDs:** 01.2, 02.1, 05.3, 07.2, 07.3, 08.1, 09.2, 09.3, 09.4, 09.5, 09.6, 09.7, 10.3, 11.1

- [01.2-Receive PO (blind)](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.2-receive-po/01.2-receive-po.md)
- [02.1-Pick Dispatch order](../../C-UX-Scenarios/02-karim-picks-and-flags-damage/02.1-pick-dispatch-order/02.1-pick-dispatch-order.md)
- [05.3-Receive Transfer (blind)](../../C-UX-Scenarios/05-karims-transfer-arrives-short/05.3-receive-transfer/05.3-receive-transfer.md)
- [07.2-Product stock](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.2-product-stock/07.2-product-stock.md)
- [07.3-Dispatch orders](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.3-dispatch-orders/07.3-dispatch-orders.md)
- [08.1-Stock counts](../../C-UX-Scenarios/08-rafiq-runs-the-weekly-count/08.1-stock-counts/08.1-stock-counts.md)
- [09.2-settings-warehouses](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.2-settings-warehouses/09.2-settings-warehouses.md)
- [09.3-settings-excel-import](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.3-settings-excel-import/09.3-settings-excel-import.md)
- [09.4-settings-products](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.4-settings-products/09.4-settings-products.md)
- [09.5-settings-suppliers](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.5-settings-suppliers/09.5-settings-suppliers.md)
- [09.6-settings-users](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.6-settings-users/09.6-settings-users.md)
- [09.7-purchase-orders](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.7-purchase-orders/09.7-purchase-orders.md)
- [10.3-Settings: Me](../../C-UX-Scenarios/10-karim-signs-in-on-the-shared-phone/10.3-settings-me/10.3-settings-me.md)
- [11.1-Owner recovery](../../C-UX-Scenarios/11-haque-recovers-his-account/11.1-owner-recovery/11.1-owner-recovery.md)

---

## Related Components

- [Button Primary (desk) [btn-002]](button-primary.md) - confirm
- [Button Danger [btn-005]](button-danger.md) - destructive confirm
- [Button Secondary [btn-003]](button-secondary.md) - Go back
- [Bottom Sheet [sht-001]](bottom-sheet.md) - for small tasks rather than confirmations

---

## Open Questions

1. Desk dialog max width is not specified.
2. `button-danger` frontmatter min-height is `{spacing.target-floor}` (64px) even on desk, while desk `button-primary` is `{spacing.button-desk}` (56px): two confirm styles in desk dialogs would differ in height.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.confirmation-dialog` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: dlg-002
  name: Confirmation Dialog
  key: confirmation-dialog
  file: D-Design-System/components/confirmation-dialog.md
```

Variant explosion check (step-08d): 4 variants, within the recommended maximum of 5.
