# Side Nav [nav-001]

**Type:** Navigation
**Category:** Primary navigation (desktop)
**Purpose:** Left navigation on desktop (≥ 1024px) desk surfaces.
**DESIGN.md key:** `side-nav` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

Desktop-only left column that replaces the bottom tab bar. Lists the same destinations as the Role's tabs plus items from More. No floor-only screens appear in desktop nav.

---

## Variants

This component has no variants.

---

## States

**Required States:**

- default
- active item
- hover
- focus

**Optional States:**

- with count badge (Issues item)

**State Descriptions:**

**Active:** item on `{colors.surface}` fill with `{colors.primary}` text and a 4px `{colors.primary}` left bar; `aria-current="page"`.
**Inactive:** `{colors.text}` on `{colors.surface-alt}`.
**Hover:** underline on the label [ASSUMPTION: hover not specified in DESIGN.md].

---

## Styling

### Visual Properties

**Size:** Width 13.75rem; items min `{spacing.target-min}` tall.  
**Shape:** Square column; items square with left bar.  
**Colors:** Background `{colors.surface-alt}`; active `{colors.surface}` fill + `{colors.primary}` text (7.2:1 on surface-alt light / 9.1:1 dark).  
**Typography:** Items `{typography.body-strong}` [ASSUMPTION: not named in DESIGN.md].  
**Spacing:** Item padding `{spacing.3}` × `{spacing.4}` [ASSUMPTION].

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.side-nav`). Do not edit here; change DESIGN.md first.

```yaml
side-nav:
    background: '{colors.surface-alt}'
    active: '{colors.primary} text, {colors.surface} fill, 4px left bar'
    width: 13.75rem
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-owner-view.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-owner-view.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

Click navigates; focus moves to the new page's `h1`.

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** `<nav>` landmark; current item `aria-current="page"`; Issues item name includes the count.

**Keyboard Support:** Tab through items; Enter activates. A "Skip to content" link precedes it.

**Screen Reader:** "Issues, 4 open, link, current page".

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

Labels in the chosen language only.

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Desktop widths on desk surfaces.

### When Not to Use

Phone or tablet (use bottom-tab-bar).

### Best Practices

- Mirror the Role's tab order.
- Never use teal for decoration in the nav; only for the active item.

---

## Used In

**Pages:** 12

**Page IDs:** 03.1, 04.1, 04.2, 05.1, 06.1, 07.1, 07.2, 07.3, 08.1, 09.2, 09.7, 10.3

- [03.1-issues-inbox](../../C-UX-Scenarios/03-nasima-clears-the-inbox/03.1-issues-inbox/03.1-issues-inbox.md)
- [04.1-owner-view](../../C-UX-Scenarios/04-haque-traces-an-unexplained-loss/04.1-owner-view/04.1-owner-view.md)
- [04.2-low-stock](../../C-UX-Scenarios/04-haque-traces-an-unexplained-loss/04.2-low-stock/04.2-low-stock.md)
- [05.1-Transfers](../../C-UX-Scenarios/05-karims-transfer-arrives-short/05.1-transfers-list/05.1-transfers-list.md)
- [06.1-My record](../../C-UX-Scenarios/06-karim-proves-where-a-carton-went/06.1-my-record/06.1-my-record.md)
- [07.1-Product search](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.1-product-search/07.1-product-search.md)
- [07.2-Product stock](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.2-product-stock/07.2-product-stock.md)
- [07.3-Dispatch orders](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.3-dispatch-orders/07.3-dispatch-orders.md)
- [08.1-Stock counts](../../C-UX-Scenarios/08-rafiq-runs-the-weekly-count/08.1-stock-counts/08.1-stock-counts.md)
- [09.2-settings-warehouses](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.2-settings-warehouses/09.2-settings-warehouses.md)
- [09.7-purchase-orders](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.7-purchase-orders/09.7-purchase-orders.md)
- [10.3-Settings: Me](../../C-UX-Scenarios/10-karim-signs-in-on-the-shared-phone/10.3-settings-me/10.3-settings-me.md)

---

## Related Components

- [Bottom Tab Bar [bar-003]](bottom-tab-bar.md) - phone equivalent
- [Count Badge [bdg-001]](count-badge.md) - Issues item
- [section-nav [nav-101]](section-nav.md) - secondary navigation inside Settings / Orders (new component)

---

## Open Questions

1. Typography, item padding and hover treatment are not in DESIGN.md frontmatter.
2. Width 13.75rem is a raw value, not a `{spacing.*}` token.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.side-nav` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: nav-001
  name: Side Nav
  key: side-nav
  file: D-Design-System/components/side-nav.md
```
