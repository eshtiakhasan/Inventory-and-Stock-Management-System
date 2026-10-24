# Stock State Pill [pil-001]

**Type:** Content
**Category:** Status pill
**Purpose:** Shows one Stock state with icon, label and quantity - never color alone.
**DESIGN.md key:** `stock-state-pill` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

Rounded-full pill: icon + label (chosen language) + quantity. Not itself a tap target; when interactive it sits inside a 48px row. Five states, each with fill, on-color, icon and (Damaged, Unexplained) a pattern.

---

## Variants

- **available** - `{colors.state-available}` / `{colors.on-state-available}`, check icon, solid.
- **reserved** - `{colors.state-reserved}` / `{colors.on-state-reserved}`, diamond icon, solid.
- **damaged** - `{colors.state-damaged}` / `{colors.on-state-damaged}`, cross icon, diagonal hatch on the leading 12px only.
- **in-transit** - `{colors.state-in-transit}` / `{colors.on-state-in-transit}`, arrow-right icon, solid.
- **unexplained** - `{colors.state-unexplained}` / `{colors.on-state-unexplained}`, question icon, 2px dashed inner outline in the on-color, inset 4px (always, including compact uses).
- **compact** - used in search results and owner tiles; keeps icon and pattern.

---

## States

**Required States:**

- default per state

**Optional States:**

- compact
- hidden during count

**State Descriptions:**

**Hidden during count:** replaced by [hidden-during-count](hidden-during-count.md) for an assigned counter.
**Dark mode:** swaps to `-dark` tokens; hatch and dashed patterns stay visible.

---

## Styling

### Visual Properties

**Size:** min-height 2rem (32px).  
**Shape:** `{rounded.full}`.  
**Colors:** See Variants. On-color contrast: 6.3 / 7.3 / 7.2 / 8.2 / 10.7 (light), 9.5 / 8.7 / 8.2 / 8.6 / 11.0 (dark).  
**Typography:** `{typography.body-strong}`; quantity tabular-nums.  
**Spacing:** Horizontal padding `{spacing.2}`–`{spacing.3}`, icon gap `{spacing.1}` [ASSUMPTION].

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.stock-state-pill`). Do not edit here; change DESIGN.md first.

```yaml
stock-state-pill:
    radius: '{rounded.full}'
    typography: '{typography.body-strong}'
    min-height: 2rem
    available: '{colors.state-available} / {colors.on-state-available}, icon check, solid'
    reserved: '{colors.state-reserved} / {colors.on-state-reserved}, icon diamond, solid'
    damaged: '{colors.state-damaged} / {colors.on-state-damaged}, icon cross, hatch on leading 12px only'
    in-transit: '{colors.state-in-transit} / {colors.on-state-in-transit}, icon arrow-right, solid'
    unexplained: '{colors.state-unexplained} / {colors.on-state-unexplained}, icon question, 2px dashed inner outline (always)'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-owner-view.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-owner-view.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

None (display).

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** Plain text; icon `aria-hidden`. Hatch and outline are CSS only.

**Keyboard Support:** Not focusable.

**Screen Reader:** "Damaged, 8 cartons".

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

Label from UI glossary (উপলব্ধ, বুক করা, ক্ষতিগ্রস্ত, পথে আছে, অব্যাখ্যাত); quantity in units with Western digits.

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Ladder totals, task lines, Issue cards, search results, owner tiles.

### When Not to Use

Sync or task status (use sync-status-chip / task-status-tag); warnings (warning never uses a filled pill).

### Best Practices

- Damaged hatch: `repeating-linear-gradient(135deg, fill 0 7px, mix(78% fill, 22% on-color) 7px 10px)` on the leading 12px only.
- Unexplained always has its dashed outline - in light mode it is the pill's only visible edge (fill is 1.5:1 vs white).

---

## Used In

**Pages:** 9

**Page IDs:** 02.1, 03.2, 04.1, 06.1, 07.1, 07.2, 07.3, 08.1, 09.4

- [02.1-Pick Dispatch order](../../C-UX-Scenarios/02-karim-picks-and-flags-damage/02.1-pick-dispatch-order/02.1-pick-dispatch-order.md)
- [03.2-issue-detail](../../C-UX-Scenarios/03-nasima-clears-the-inbox/03.2-issue-detail/03.2-issue-detail.md)
- [04.1-owner-view](../../C-UX-Scenarios/04-haque-traces-an-unexplained-loss/04.1-owner-view/04.1-owner-view.md)
- [06.1-My record](../../C-UX-Scenarios/06-karim-proves-where-a-carton-went/06.1-my-record/06.1-my-record.md)
- [07.1-Product search](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.1-product-search/07.1-product-search.md)
- [07.2-Product stock](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.2-product-stock/07.2-product-stock.md)
- [07.3-Dispatch orders](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.3-dispatch-orders/07.3-dispatch-orders.md)
- [08.1-Stock counts](../../C-UX-Scenarios/08-rafiq-runs-the-weekly-count/08.1-stock-counts/08.1-stock-counts.md)
- [09.4-settings-products](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.4-settings-products/09.4-settings-products.md)

---

## Related Components

- [Stock Ladder [crd-001]](stock-ladder.md) - host
- [Hidden During Count [txt-001]](hidden-during-count.md) - replacement during blind count
- [Owner Metric Tile [crd-004]](owner-metric-tile.md) - compact use

---

## Open Questions

1. Pill padding and icon size are not in frontmatter.
2. Dark Unexplained `#F2D16B` is [ASSUMPTION: confirm on a low-cost phone] in DESIGN.md.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.stock-state-pill` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: pil-001
  name: Stock State Pill
  key: stock-state-pill
  file: D-Design-System/components/stock-state-pill.md
```

Variant explosion check (step-08d): this component has 6 variants, above the recommended maximum of 5. They share one token set (border, focus, error, radius, typography), so they stay together for now; splitting `multiline` (and possibly `search`) into their own components is an open question.
