# Month Selector [nav-002]

**Type:** Navigation
**Category:** Period stepper
**Purpose:** Steps the Owner view loss figures back and forward one month.
**DESIGN.md key:** `month-selector` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

[chevron-left] month year [chevron-right]. Two 48px square outline buttons with the month in `title` between them. Changes only the loss figures; Stock value, Unexplained and open Issues are always "now".

---

## Variants

This component has no variants.

---

## States

**Required States:**

- default
- next disabled (current month)
- focus

**Optional States:**

- offline

**State Descriptions:**

**Default:** both buttons enabled, 2px `{colors.control-border}` outline.
**Next disabled:** on the current month the next button uses the [button-disabled](button-disabled.md) treatment (dashed edge) and stays focusable with `aria-disabled="true"`.
**Offline:** figures are "as of"; months not on the phone show their own empty / Needs internet state [ASSUMPTION].

---

## Styling

### Visual Properties

**Size:** Arrow buttons `{spacing.target-min}` square.  
**Shape:** Buttons `{rounded.md}` [ASSUMPTION: radius not given for the arrows; buttons use md].  
**Colors:** Arrow outline `{colors.control-border}`; chevron `{colors.primary}`; month label `{colors.text}`.  
**Typography:** Month label `{typography.title}`.  
**Spacing:** `{spacing.2}` between buttons and label.

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.month-selector`). Do not edit here; change DESIGN.md first.

```yaml
month-selector:
    arrow-buttons: '{spacing.target-min} square, 2px {colors.control-border}'
    label-typography: '{typography.title}'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-owner-view.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-owner-view.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

Previous / next changes the month and refreshes loss figures. Defaults to the current month.

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** Buttons named "Previous month" / "Next month" (localised). Month label in a `aria-live="polite"` text update via the page's live region.

**Keyboard Support:** Tab to each button; Enter / Space activates.

**Screen Reader:** "Previous month, button" … "October 2026".

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

Month name in the chosen language; year in Western digits.

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Owner view losses section.

### When Not to Use

General date filtering (use input-field date variant or chips).

### Best Practices

- Disable next on the current month - never allow future months.

---

## Used In

**Pages:** 1

**Page IDs:** 04.1

- [04.1-owner-view](../../C-UX-Scenarios/04-haque-traces-an-unexplained-loss/04.1-owner-view/04.1-owner-view.md)

---

## Related Components

- [Loss Row [lst-001]](loss-row.md) - rows the selector changes
- [Button Disabled [btn-006]](button-disabled.md) - next button on current month

---

## Open Questions

1. Arrow button radius and chevron color are not in DESIGN.md frontmatter.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.month-selector` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: nav-002
  name: Month Selector
  key: month-selector
  file: D-Design-System/components/month-selector.md
```
