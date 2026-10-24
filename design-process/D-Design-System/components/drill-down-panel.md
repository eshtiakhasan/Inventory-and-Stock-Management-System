# Drill-down Panel [cnt-001]

**Type:** Layout
**Category:** Detail panel
**Purpose:** Lists the Issues or Stock movements behind an owner figure.
**DESIGN.md key:** `drill-down-panel` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

Desktop: right-hand panel beside the tiles, 1px `border` left edge, min 22rem wide. Tablet: below the tiles. Phone: its own full-screen page. Heading in `headline` with figure name, total and month; 48px Close (desk) or Back (phone); rows min 64px, highest value first. Also the list + detail detail pane pattern on 09.2 / 09.7.

---

## Variants

- **desktop** - right panel.
- **tablet** - below the tiles.
- **phone** - full-screen page.

---

## States

**Required States:**

- default
- focus on heading

**Optional States:**

- empty
- loading
- offline

**State Descriptions:**

**Empty:** "No open discrepancy cases." (matching sentence).
**Loading:** skeleton rows.

---

## Styling

### Visual Properties

**Size:** Desktop min width 22rem; rows min `{spacing.target-floor}`; Close/Back `{spacing.target-min}`.  
**Shape:** Square panel.  
**Colors:** `{colors.surface}`; left edge 1px `{colors.border}` (desktop).  
**Typography:** Heading `{typography.headline}`; rows `{typography.body}` / `{typography.body-strong}`.  
**Spacing:** Padding `{spacing.gutter-desktop}` [ASSUMPTION].

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.drill-down-panel`). Do not edit here; change DESIGN.md first.

```yaml
drill-down-panel:
    background: '{colors.surface}'
    border-left: '1px {colors.border} (desktop)'
    row-min-height: '{spacing.target-floor}'
    heading-typography: '{typography.headline}'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-owner-view.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-owner-view.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

On open, focus moves to the heading; Close/Back returns focus to the tile. Rows open S13 or the movement.

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** `<section aria-labelledby>` (desktop) / page `h1` (phone).

**Keyboard Support:** Tab through rows; Escape closes on desktop [ASSUMPTION].

**Screen Reader:** Heading then rows.

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

Product names as entered; ৳ and units.

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Owner figure details; list + detail desk layouts.

### When Not to Use

Small pickers (bottom-sheet).

### Best Practices

- Only one panel open at a time.

---

## Used In

**Pages:** 3

**Page IDs:** 04.1, 09.2, 09.7

- [04.1-owner-view](../../C-UX-Scenarios/04-haque-traces-an-unexplained-loss/04.1-owner-view/04.1-owner-view.md)
- [09.2-settings-warehouses](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.2-settings-warehouses/09.2-settings-warehouses.md)
- [09.7-purchase-orders](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.7-purchase-orders/09.7-purchase-orders.md)

---

## Related Components

- [Owner Metric Tile [crd-004]](owner-metric-tile.md) - opener
- [Loss Row [lst-001]](loss-row.md) - opener

---

## Open Questions

1. 22rem min width appears in DESIGN.md prose only, not frontmatter.
2. Escape behaviour on the desktop panel is not specified.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.drill-down-panel` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: cnt-001
  name: Drill-down Panel
  key: drill-down-panel
  file: D-Design-System/components/drill-down-panel.md
```

Variant explosion check (step-08d): 3 variants, within the recommended maximum of 5.
