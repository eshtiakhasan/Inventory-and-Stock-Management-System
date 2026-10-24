# Count Badge [bdg-001]

**Type:** Content
**Category:** Badge
**Purpose:** Number of open Issues the User can decide, on the Issues tab and side-nav item.
**DESIGN.md key:** `count-badge` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

Small rounded-full badge with digits. Only on the Issues tab and side-nav item; no other badges or notifications in v1 (PRD §6). Caps at "99+"; hidden at 0.

---

## Variants

This component has no variants.

---

## States

**Required States:**

- default
- hidden (0)

**Optional States:**

- capped (99+)

**State Descriptions:**

**Default:** `{colors.primary}` fill, `{colors.on-primary}` digits. **Hidden:** removed at 0. **Capped:** "99+".

---

## Styling

### Visual Properties

**Size:** Min size 1.5rem (24px).  
**Shape:** `{rounded.full}`.  
**Colors:** `{colors.primary}` / `{colors.on-primary}`.  
**Typography:** `{typography.meta}` - digits only, so `meta` is allowed in a Bangla UI.  
**Spacing:** Horizontal padding `{spacing.1}` [ASSUMPTION].

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.count-badge`). Do not edit here; change DESIGN.md first.

```yaml
count-badge:
    background: '{colors.primary}'
    text: '{colors.on-primary}'
    typography: '{typography.meta}'
    radius: '{rounded.full}'
    min-size: 1.5rem
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-issues-inbox.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-issues-inbox.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

None; display only. The tab or nav item is the target.

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** Badge itself `aria-hidden="true"`; the count is included in the tab's accessible name.

**Keyboard Support:** Not focusable.

**Screen Reader:** Announced as part of the tab name: "Issues, 4 open".

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

Western digits only.

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Issues tab and side-nav Issues item.

### When Not to Use

Anywhere else.

### Best Practices

- Never use the badge as the only signal; the inbox itself is the source.

---

## Used In

**Pages:** 5

**Page IDs:** 01.1, 03.1, 04.1, 07.1, 08.1

- [01.1-My tasks](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.1-my-tasks/01.1-my-tasks.md)
- [03.1-issues-inbox](../../C-UX-Scenarios/03-nasima-clears-the-inbox/03.1-issues-inbox/03.1-issues-inbox.md)
- [04.1-owner-view](../../C-UX-Scenarios/04-haque-traces-an-unexplained-loss/04.1-owner-view/04.1-owner-view.md)
- [07.1-Product search](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.1-product-search/07.1-product-search.md)
- [08.1-Stock counts](../../C-UX-Scenarios/08-rafiq-runs-the-weekly-count/08.1-stock-counts/08.1-stock-counts.md)

---

## Related Components

- [Bottom Tab Bar [bar-003]](bottom-tab-bar.md) - host
- [Side Nav [nav-001]](side-nav.md) - host

---

## Open Questions

1. Badge padding and position offset relative to the tab icon are not specified.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.count-badge` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: bdg-001
  name: Count Badge
  key: count-badge
  file: D-Design-System/components/count-badge.md
```
