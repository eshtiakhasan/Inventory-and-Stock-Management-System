# Hidden During Count [txt-001]

**Type:** Content
**Category:** Placeholder
**Purpose:** Replaces stock figures for a User assigned to an open Blind count (DD-7).
**DESIGN.md key:** `hidden-during-count` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

Replaces a stock figure, ladder, pill or low-stock tag for an assigned counter while a Blind count is open, for the counted Products at that Warehouse. Eye-off icon + "Hidden during count". No digits, no bar, no state color, so nothing hints at the quantity. A ladder collapses to one such row. The server never sends the figures (FR-35).

---

## Variants

- **inline** - replaces a single figure or pill.
- **row** - replaces a whole stock ladder.

---

## States

**Required States:**

- default

**Optional States:**

- offline

**State Descriptions:**

**Offline:** unchanged; the figures were never sent, so offline data has none either.

---

## Styling

### Visual Properties

**Size:** min-height same as the figure it replaces.  
**Shape:** `{rounded.sm}`.  
**Colors:** `{colors.surface-alt}` fill; `{colors.text-muted}` text (7.5:1 / 8.3:1).  
**Typography:** `{typography.body-strong}`.  
**Spacing:** Padding `{spacing.2}` [ASSUMPTION].

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.hidden-during-count`). Do not edit here; change DESIGN.md first.

```yaml
hidden-during-count:
    background: '{colors.surface-alt}'
    text: '{colors.text-muted}'
    typography: '{typography.body-strong}'
    icon: eye-off
    radius: '{rounded.sm}'
    min-height: 'same as the figure it replaces'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: none (added 2026-10-24, DD-7).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

None. If it sits in a row that was a target, the row still opens history but movement quantities are hidden too.

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** Plain text; icon `aria-hidden`. Nothing hidden in `aria-*`, hidden text or page code.

**Keyboard Support:** Not focusable on its own.

**Screen Reader:** "Hidden during count".

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

"Hidden during count" / "গণনা চলছে, তাই লুকানো" [BN: verify].

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

S5, S6, S19, S4 scan results, S8/S10 line hints for assigned counters during an open count.

### When Not to Use

For anyone not assigned to the count; after Close count.

### Best Practices

- Never show a skeleton or spinner instead (it would hint data exists).

---

## Used In

**Pages:** 7

**Page IDs:** 01.3, 04.2, 07.1, 07.2, 08.1, 08.2, 09.2

- [01.3-Scan overlay](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.3-scan-overlay/01.3-scan-overlay.md)
- [04.2-low-stock](../../C-UX-Scenarios/04-haque-traces-an-unexplained-loss/04.2-low-stock/04.2-low-stock.md)
- [07.1-Product search](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.1-product-search/07.1-product-search.md)
- [07.2-Product stock](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.2-product-stock/07.2-product-stock.md)
- [08.1-Stock counts](../../C-UX-Scenarios/08-rafiq-runs-the-weekly-count/08.1-stock-counts/08.1-stock-counts.md)
- [08.2-Count lines (blind)](../../C-UX-Scenarios/08-rafiq-runs-the-weekly-count/08.2-count-lines/08.2-count-lines.md)
- [09.2-settings-warehouses](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.2-settings-warehouses/09.2-settings-warehouses.md)

---

## Related Components

- [Stock Ladder [crd-001]](stock-ladder.md) - replaced
- [Stock State Pill [pil-001]](stock-state-pill.md) - replaced

---

## Open Questions

1. Bangla string marked [BN: verify].
2. Icon size and padding not in frontmatter.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.hidden-during-count` (WDS Phase 7, Create).
- 2026-10-24: Component added to DESIGN.md by DD-7 (change log 2026-10-24).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: txt-001
  name: Hidden During Count
  key: hidden-during-count
  file: D-Design-System/components/hidden-during-count.md
```
