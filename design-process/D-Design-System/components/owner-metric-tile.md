# Owner Metric Tile [crd-004]

**Type:** Interactive
**Category:** Card (metric)
**Purpose:** Owner view figure tile that opens its drill-down panel.
**DESIGN.md key:** `owner-metric-tile` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

The whole card is one target, min 64px. Label in `body-strong`, taka value in `amount-hero`, a chevron icon. Unexplained values carry the question icon and dashed pattern next to the number. Selected while its drill-down is open; only one tile selected at a time.

---

## Variants

This component has no variants.

---

## States

**Required States:**

- default
- selected
- focus
- hover

**Optional States:**

- loading
- offline (as of)
- empty / first use

**State Descriptions:**

**Selected:** 2px `{colors.primary}` border, `{colors.surface-alt}` fill, text tag "Showing" with chevron-right; `aria-expanded="true"`. Distinct from the focus ring.
**Offline:** "as of HH:MM (offline)".

---

## Styling

### Visual Properties

**Size:** min-height `{spacing.target-floor}`.  
**Shape:** `{rounded.md}`.  
**Colors:** `{colors.surface}`, 1px `{colors.border}`; selected as above.  
**Typography:** Value `{typography.amount-hero}` (digits and ৳ only); label `{typography.body-strong}`.  
**Spacing:** Padding `{spacing.4}` [ASSUMPTION]; grid gap `{spacing.4}`.

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.owner-metric-tile`). Do not edit here; change DESIGN.md first.

```yaml
owner-metric-tile:
    background: '{colors.surface}'
    border: '1px solid {colors.border}'
    value-typography: '{typography.amount-hero}'
    label-typography: '{typography.body-strong}'
    radius: '{rounded.md}'
    min-height: '{spacing.target-floor}'
    selected: '2px {colors.primary} border, {colors.surface-alt} fill, text tag "Showing" with icon chevron-right'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-owner-view.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-owner-view.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

Click opens the drill-down; focus moves to the panel heading; Close/Back returns focus to the tile.

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** `<button aria-expanded aria-controls>`; name = label + value.

**Keyboard Support:** Enter / Space.

**Screen Reader:** "Unexplained, ৳45,000, button, expanded".

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

৳ with lakh grouping, Western digits; label in chosen language.

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Owner view figures.

### When Not to Use

Floor screens; Big & Bold weight on desk.

### Best Practices

- Never color alone for Unexplained - question icon + dashed pattern.

---

## Used In

**Pages:** 2

**Page IDs:** 03.1, 04.1

- [03.1-issues-inbox](../../C-UX-Scenarios/03-nasima-clears-the-inbox/03.1-issues-inbox/03.1-issues-inbox.md)
- [04.1-owner-view](../../C-UX-Scenarios/04-haque-traces-an-unexplained-loss/04.1-owner-view/04.1-owner-view.md)

---

## Related Components

- [Drill-down Panel [cnt-001]](drill-down-panel.md) - opened by tile
- [Stock State Pill [pil-001]](stock-state-pill.md) - compact Unexplained pill
- [Loss Row [lst-001]](loss-row.md) - losses card rows

---

## Open Questions

1. Tile padding is not in frontmatter.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.owner-metric-tile` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: crd-004
  name: Owner Metric Tile
  key: owner-metric-tile
  file: D-Design-System/components/owner-metric-tile.md
```
