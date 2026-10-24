# Loss Row [lst-001]

**Type:** Interactive
**Category:** List row
**Purpose:** Row in Losses by Reason: Reason left, taka right; opens the drill-down.
**DESIGN.md key:** `loss-row` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

List of rows, no chart in v1: Reason name in `body` left, taka in `body-strong` `danger` right, tabular digits; 48px rows, 1px `border` dividers; total row in `title`. Each row is a target. Also used (layout only) for open-Issues and Stock-value rows on 04.1 with `text` color amounts.

---

## Variants

- **reason** - default.
- **total** - label and amount in `{typography.title}`.
- **neutral amount** - `{colors.text}` amount (Stock value, open Issues rows on 04.1).

---

## States

**Required States:**

- default
- focus
- hover

**Optional States:**

- zero
- loading

**State Descriptions:**

**Zero:** ৳0 still shown [ASSUMPTION].

---

## Styling

### Visual Properties

**Size:** min-height `{spacing.target-min}`.  
**Shape:** None (rows in a card).  
**Colors:** Value `{colors.danger}`; divider 1px `{colors.border}`.  
**Typography:** Label `{typography.body}`; value `{typography.body-strong}` tabular-nums.  
**Spacing:** Row padding `{spacing.2}` vertical [ASSUMPTION].

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.loss-row`). Do not edit here; change DESIGN.md first.

```yaml
loss-row:
    min-height: '{spacing.target-min}'
    label-typography: '{typography.body}'
    value-typography: '{typography.body-strong}'
    value-color: '{colors.danger}'
    divider: '1px {colors.border}'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-owner-view.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-owner-view.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

Row opens drill-down for that Reason.

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** Each row a button or link with name "Damaged, ৳12,000".

**Keyboard Support:** Tab / Enter.

**Screen Reader:** "Damaged, ৳12,000, button".

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

Reason codes from glossary.

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Owner view losses.

### When Not to Use

Charts (banned in v1).

### Best Practices

- Tabular digits so amounts line up.

---

## Used In

**Pages:** 1

**Page IDs:** 04.1

- [04.1-owner-view](../../C-UX-Scenarios/04-haque-traces-an-unexplained-loss/04.1-owner-view/04.1-owner-view.md)

---

## Related Components

- [Month Selector [nav-002]](month-selector.md) - period
- [Drill-down Panel [cnt-001]](drill-down-panel.md) - detail
- [Owner Metric Tile [crd-004]](owner-metric-tile.md) - card styling

---

## Open Questions

None.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.loss-row` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: lst-001
  name: Loss Row
  key: loss-row
  file: D-Design-System/components/loss-row.md
```

Variant explosion check (step-08d): 3 variants, within the recommended maximum of 5.
