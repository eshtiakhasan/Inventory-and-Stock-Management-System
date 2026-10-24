# Confirmation Toast [tst-001]

**Type:** Feedback
**Category:** Toast
**Purpose:** Short confirmation after every action: Saved, or Saved on phone, will sync.
**DESIGN.md key:** `confirmation-toast` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

Floats above the fixed bottom zone; never covers the focused element or the save button (moves under the app bar if it would). Success fill online, warning fill when saved offline. Optional underlined text action ("Change qty/reason"). No Undo button.

---

## Variants

- **online** - `{colors.success}` fill, `{colors.on-success}` text, check icon.
- **offline** - `{colors.warning}` fill, `{colors.on-warning}` text, hourglass icon.
- **with action** - adds underlined text button (min 48px).

---

## States

**Required States:**

- online
- offline

**Optional States:**

- with action
- combined ("Saved 3 lines")

**State Descriptions:**

Stays 5 s or until the next action; with action at least 10 s [ASSUMPTION: 5 s / 10 s]. Rapid saves combine.

---

## Styling

### Visual Properties

**Size:** Width: content width within gutters [ASSUMPTION]; action min-height `{spacing.target-min}`.  
**Shape:** `{rounded.md}`.  
**Colors:** See variants (6.3:1 / 9.5:1; 6.6:1 / 9.1:1). Light shadow `0 6px 16px` ~25%; dark none.  
**Typography:** `{typography.body-strong}`.  
**Spacing:** `{spacing.2}` above the fixed bottom zone [ASSUMPTION].

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.confirmation-toast`). Do not edit here; change DESIGN.md first.

```yaml
confirmation-toast:
    background: '{colors.success}'
    text: '{colors.on-success}'
    offline-background: '{colors.warning}'
    offline-text: '{colors.on-warning}'
    typography: '{typography.body-strong}'
    radius: '{rounded.md}'
    action: 'text button, {colors.on-success} / {colors.on-warning} underlined label, min-height {spacing.target-min}'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-picking.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-picking.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

Does not steal focus or block the next scan.

### Animations

None (appears without animation; reduced motion respected).

---

## Accessibility

**ARIA Attributes:** Text goes to the page's single polite `role="status"` region (replaced, not re-created). Action is a real button reachable by Tab.

**Keyboard Support:** Action reachable by Tab while visible.

**Screen Reader:** "Saved" / "Saved on phone, will sync".

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

"সেভ হয়েছে" / "Saved"; "ফোনে সেভ হয়েছে, নেট এলে সিঙ্ক হবে" / "Saved on phone, will sync". Never glyph checkmarks in strings.

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

After every save.

### When Not to Use

As the only place a result is shown - the screen also shows it.

### Best Practices

- Nothing important only in a toast.

---

## Used In

**Pages:** 21

**Page IDs:** 01.1, 01.2, 02.1, 02.2, 03.1, 03.2, 05.2, 05.3, 07.2, 07.3, 08.1, 08.2, 09.1, 09.2, 09.3, 09.4, 09.5, 09.6, 09.7, 10.2, 10.3

- [01.1-My tasks](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.1-my-tasks/01.1-my-tasks.md)
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
- [10.2-Change temporary password](../../C-UX-Scenarios/10-karim-signs-in-on-the-shared-phone/10.2-change-temporary-password/10.2-change-temporary-password.md)
- [10.3-Settings: Me](../../C-UX-Scenarios/10-karim-signs-in-on-the-shared-phone/10.3-settings-me/10.3-settings-me.md)

---

## Related Components

- [Floor Primary Button [btn-001]](button-primary-floor.md) - trigger
- [Offline Banner [alt-001]](offline-banner.md) - offline context

---

## Open Questions

1. Toast width, offset above the fixed zone and shadow exact values (DESIGN.md gives ~25%) are not tokenised.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.confirmation-toast` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: tst-001
  name: Confirmation Toast
  key: confirmation-toast
  file: D-Design-System/components/confirmation-toast.md
```

Variant explosion check (step-08d): 3 variants, within the recommended maximum of 5.
