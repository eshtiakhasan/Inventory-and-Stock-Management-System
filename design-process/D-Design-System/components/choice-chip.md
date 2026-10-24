# Choice Chip [tgl-001]

**Type:** Form
**Category:** Selectable chip
**Purpose:** Selectable option chip (Reasons, filters, per-unit choice) with selection shown by check icon, not color alone.
**DESIGN.md key:** `choice-chip` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

2px `control-border` outline, `{rounded.sm}`, min 48px (56px on floor). Selected: `surface-alt` fill, 2px `primary` border and a check icon. Single-select groups (Reason) behave as radio buttons; filter groups as checkboxes.

---

## Variants

- **desk** - min-height `{spacing.target-min}`.
- **floor** - min-height `{spacing.target-floor-secondary}` (Flag damage reasons).
- **removable filter** - active-filter chip with a remove icon ("Remove filter: Narayanganj").

---

## States

**Required States:**

- default
- selected
- focus

**Optional States:**

- disabled
- offline

**State Descriptions:**

**Selected:** `{colors.surface-alt}` fill, 2px `{colors.primary}` border, check icon.
**Disabled:** button-disabled treatment.

---

## Styling

### Visual Properties

**Size:** See variants.  
**Shape:** `{rounded.sm}`.  
**Colors:** Border `{colors.control-border}` (3.6:1 vs surface-alt); selected `{colors.primary}`.  
**Typography:** `{typography.body-strong}`.  
**Spacing:** `{spacing.2}` between chips; wrap to new lines, never scroll sideways.

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.choice-chip`). Do not edit here; change DESIGN.md first.

```yaml
choice-chip:
    min-height: '{spacing.target-min}'
    floor-min-height: '{spacing.target-floor-secondary}'
    border: '2px solid {colors.control-border}'
    selected: '{colors.surface-alt} fill, 2px {colors.primary} border, icon check'
    radius: '{rounded.sm}'
    typography: '{typography.body-strong}'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-picking.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-picking.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

Tap toggles selection.

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** Single-select: `role="radiogroup"` + `role="radio"`/`aria-checked`, or native radios styled as chips. Multi-select: `aria-pressed` toggle buttons or checkboxes. Group has a visible legend.

**Keyboard Support:** Radio group: arrow keys move selection; Tab enters/leaves group. Toggle chips: Tab + Space.

**Screen Reader:** "Expired, radio button, 2 of 3, selected".

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

Reason codes from glossary in the chosen language.

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

2–6 short options.

### When Not to Use

Long lists (use combobox); navigation segments (use section-nav).

### Best Practices

- Selection never by color alone (check icon + border).

---

## Used In

**Pages:** 14

**Page IDs:** 02.2, 03.2, 04.2, 05.1, 05.2, 06.1, 07.2, 07.3, 08.1, 09.4, 09.5, 09.6, 09.7, 10.3

- [02.2-Flag damage](../../C-UX-Scenarios/02-karim-picks-and-flags-damage/02.2-flag-damage/02.2-flag-damage.md)
- [03.2-issue-detail](../../C-UX-Scenarios/03-nasima-clears-the-inbox/03.2-issue-detail/03.2-issue-detail.md)
- [04.2-low-stock](../../C-UX-Scenarios/04-haque-traces-an-unexplained-loss/04.2-low-stock/04.2-low-stock.md)
- [05.1-Transfers](../../C-UX-Scenarios/05-karims-transfer-arrives-short/05.1-transfers-list/05.1-transfers-list.md)
- [05.2-Send Transfer](../../C-UX-Scenarios/05-karims-transfer-arrives-short/05.2-send-transfer/05.2-send-transfer.md)
- [06.1-My record](../../C-UX-Scenarios/06-karim-proves-where-a-carton-went/06.1-my-record/06.1-my-record.md)
- [07.2-Product stock](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.2-product-stock/07.2-product-stock.md)
- [07.3-Dispatch orders](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.3-dispatch-orders/07.3-dispatch-orders.md)
- [08.1-Stock counts](../../C-UX-Scenarios/08-rafiq-runs-the-weekly-count/08.1-stock-counts/08.1-stock-counts.md)
- [09.4-settings-products](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.4-settings-products/09.4-settings-products.md)
- [09.5-settings-suppliers](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.5-settings-suppliers/09.5-settings-suppliers.md)
- [09.6-settings-users](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.6-settings-users/09.6-settings-users.md)
- [09.7-purchase-orders](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.7-purchase-orders/09.7-purchase-orders.md)
- [10.3-Settings: Me](../../C-UX-Scenarios/10-karim-signs-in-on-the-shared-phone/10.3-settings-me/10.3-settings-me.md)

---

## Related Components

- [Bottom Sheet [sht-001]](bottom-sheet.md) - Flag damage reasons
- [Input Field [inp-002]](input-field.md) - money variant per-unit chips

---

## Open Questions

1. DESIGN.md language switch uses `primary` fill for selection while choice-chip uses `surface-alt` + `primary` border - two selection styles.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.choice-chip` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: tgl-001
  name: Choice Chip
  key: choice-chip
  file: D-Design-System/components/choice-chip.md
```

Variant explosion check (step-08d): 3 variants, within the recommended maximum of 5.
