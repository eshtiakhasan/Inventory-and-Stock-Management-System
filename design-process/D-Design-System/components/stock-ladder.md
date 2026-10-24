# Stock Ladder [crd-001]

**Type:** Content
**Category:** Card
**Purpose:** Card showing On hand − Damaged − Reserved = Promisable per Warehouse.
**DESIGN.md key:** `stock-ladder` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

Rows: On hand, then "− Damaged", then "− Reserved", a rule, and the **Promisable** total in `qty-display`. Each minus row starts with its state icon. Optional decorative stacked bar underneath. In transit and Unexplained totals show as small pills. Footer "as of 10:42". One ladder per Warehouse the User can see; own Warehouse first.

---

## Variants

- **full** - Product stock (S6).
- **compact** - Promisable per Warehouse in search results (S5).

---

## States

**Required States:**

- default
- row focus

**Optional States:**

- offline (as of … (offline))
- loading (skeleton)
- hidden during count

**State Descriptions:**

**Offline:** footer "as of HH:MM (offline)".
**Loading:** skeleton rows, `aria-busy="true"`; last known data shows with its time.
**Hidden during count:** collapses to one [hidden-during-count](hidden-during-count.md) row for an assigned counter.

---

## Styling

### Visual Properties

**Size:** Rows min `{spacing.target-min}`.  
**Shape:** `{rounded.md}`.  
**Colors:** Card `{colors.surface}`; divider 1px `{colors.border}`; bar segments use state tokens with 2px `{colors.surface}` gaps.  
**Typography:** Rows `{typography.body}`; total `{typography.qty-display}` + unit in `{typography.body-strong}`; footer `{typography.meta}` / `{typography.meta-bn}`.  
**Spacing:** Card padding `{spacing.4}` [ASSUMPTION]; state icon inside any bar segment ≥ 24px wide.

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.stock-ladder`). Do not edit here; change DESIGN.md first.

```yaml
stock-ladder:
    background: '{colors.surface}'
    row-typography: '{typography.body}'
    total-typography: '{typography.qty-display}'
    divider: '1px {colors.border}'
    radius: '{rounded.md}'
    row-min-height: '{spacing.target-min}'
    bar: 'decorative (aria-hidden), 2px {colors.surface} gap between segments, Reserved dotted, Damaged hatched'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-owner-view.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-owner-view.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

Each row is a 48px target that opens movement history filtered by that state.

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** Rows as a list of links/buttons; stacked bar `aria-hidden="true"` (every value is in the rows). Never show the bar without the rows.

**Keyboard Support:** Tab through rows; Enter opens history.

**Screen Reader:** "Damaged, 2 cartons, link" … "Promisable, 40 cartons".

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

Western digits, units ("3 ctn + 5 pcs"), label terms from glossary.

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Product stock and compact search results.

### When Not to Use

Blind screens (S7, S10 receive, S11) - never.

### Best Practices

- Bar is decorative; Reserved dotted, Damaged hatched, Available solid.

---

## Used In

**Pages:** 1

**Page IDs:** 07.2

- [07.2-Product stock](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.2-product-stock/07.2-product-stock.md)

---

## Related Components

- [Stock State Pill [pil-001]](stock-state-pill.md) - In transit / Unexplained totals
- [Hidden During Count [txt-001]](hidden-during-count.md) - replacement

---

## Open Questions

1. Card padding is not in frontmatter.
2. Compact ladder layout in S5 results is not specified beyond 'Promisable per Warehouse in body-strong'.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.stock-ladder` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: crd-001
  name: Stock Ladder
  key: stock-ladder
  file: D-Design-System/components/stock-ladder.md
```
