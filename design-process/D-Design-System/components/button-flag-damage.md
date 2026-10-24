# Flag Damage Button [btn-004]

**Type:** Interactive
**Category:** Button
**Purpose:** Danger-outline floor button that starts Flag damage mode.
**DESIGN.md key:** `button-flag-damage` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

Sits directly above the Scan bar on S6 (Product stock) and S8 (Pick). Bilingual "ক্ষতি জানান · Flag damage" with a warning icon. Moves to the end of the content on short screens.

---

## Variants

This component has no variants.

---

## States

**Required States:**

- default
- pressed
- focus

**Optional States:**

- offline
- short-screen position

**State Descriptions:**

**Default:** `{colors.surface}` fill, `{colors.danger}` text and 2px border, warning icon.
**Offline:** works; the flag queues.

---

## Styling

### Visual Properties

**Size:** Full width; min-height `{spacing.target-floor}`.  
**Shape:** `{rounded.md}`.  
**Colors:** `{colors.danger}` on `{colors.surface}` (7.2:1 / 8.3:1).  
**Typography:** `{typography.label-button}` (BN) + `{typography.label-button-secondary}` (EN) [ASSUMPTION: frontmatter lists only `label-button`; bilingual split follows the floor primary rule].  
**Spacing:** Fixed bottom zone, `{spacing.3}` above the Scan bar.

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.button-flag-damage`). Do not edit here; change DESIGN.md first.

```yaml
button-flag-damage:
    background: '{colors.surface}'
    text: '{colors.danger}'
    border: '2px solid {colors.danger}'
    typography: '{typography.label-button}'
    min-height: '{spacing.target-floor}'
    radius: '{rounded.md}'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-picking.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-picking.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

Tap opens the [Scan overlay](scan-overlay.md) in flag damage mode. One tap + one scan saves. Without a camera it opens the Flag damage sheet.

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** Native `<button>`; bilingual spans, no `aria-label`.

**Keyboard Support:** Enter / Space.

**Screen Reader:** "ক্ষতি জানান Flag damage, button".

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

Bilingual (listed among floor primary buttons in EXPERIENCE.md → Voice and Tone).

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

S6, S8 only.

### When Not to Use

Desk screens; as a destructive confirm (use button-danger).

### Best Practices

- Never style as filled red; the filled danger button is reserved for the sheet's save.

---

## Used In

**Pages:** 2

**Page IDs:** 02.1, 07.2

- [02.1-Pick Dispatch order](../../C-UX-Scenarios/02-karim-picks-and-flags-damage/02.1-pick-dispatch-order/02.1-pick-dispatch-order.md)
- [07.2-Product stock](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.2-product-stock/07.2-product-stock.md)

---

## Related Components

- [Scan Overlay [dlg-001]](scan-overlay.md) - opens flag mode
- [Button Danger [btn-005]](button-danger.md) - sheet save
- [Scan Bar [bar-002]](scan-bar.md) - sits below it

---

## Open Questions

1. Frontmatter gives only `typography.label-button`; whether the English part uses `label-button-secondary` should be confirmed.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.button-flag-damage` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: btn-004
  name: Flag Damage Button
  key: button-flag-damage
  file: D-Design-System/components/button-flag-damage.md
```
