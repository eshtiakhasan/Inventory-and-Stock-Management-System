# Bottom Tab Bar [bar-003]

**Type:** Navigation
**Category:** Primary navigation (phone)
**Purpose:** Phone-width primary navigation between a Role's home surfaces.
**DESIGN.md key:** `bottom-tab-bar` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

Three to five tabs per Role (five only for the Owner: Overview · Issues · Stock · Orders · More, DD-9). Each tab is an equal share of the width, icon + one-word label in the chosen language. Part of the fixed bottom zone on home screens; on short screens it moves to the end of the content. Replaced by the side nav at ≥ 1024px.

---

## Variants

This component has no variants. Tab count (3–5) varies by Role.

---

## States

**Required States:**

- default
- active tab
- inactive tab
- focus

**Optional States:**

- with count badge (Issues tab)
- two-line labels

**State Descriptions:**

**Active:** `{colors.primary}` text, 3px `{colors.primary}` top bar, filled icon; `aria-current="page"`.
**Inactive:** `{colors.text-muted}` text, outline icon.
**Two-line labels:** at 320 CSS px with five tabs Bangla labels wrap and the bar grows taller; labels never shrink.
**Offline:** unchanged; destinations that need internet show their own disabled states.

---

## Styling

### Visual Properties

**Size:** min-height `{spacing.target-floor}` (64px); each tab an equal share of the width and at least `{spacing.target-min}` tall.  
**Shape:** Square, full width.  
**Colors:** Background `{colors.surface}`; active `{colors.primary}`; inactive `{colors.text-muted}`; top edge 1px `{colors.border}` (fixed bottom zone).  
**Typography:** Labels in `{typography.body-strong}` [ASSUMPTION: DESIGN.md does not name the tab label token; see Open Questions].  
**Spacing:** Icon above label, `{spacing.1}` gap [ASSUMPTION]; at least `{spacing.2}` between adjacent targets is satisfied by equal-width tabs.

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.bottom-tab-bar`). Do not edit here; change DESIGN.md first.

```yaml
bottom-tab-bar:
    background: '{colors.surface}'
    min-height: '{spacing.target-floor}'
    active: '{colors.primary} text + 3px top bar + filled icon'
    inactive: '{colors.text-muted}, outline icon'
    max-tabs: 5
    tab-min-width: 'equal share of width; at 320 CSS px with 5 tabs, labels wrap to two lines'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-receiving.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-receiving.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

Tap switches to the tab's home surface with scroll position of that tab kept. No swipe between tabs.

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** `<nav aria-label="Main">` (localised) containing links; current tab `aria-current="page"`. Issues tab name includes the badge count ("Issues, 4 open").

**Keyboard Support:** Tab moves between tabs; Enter activates.

**Screen Reader:** "Issues, 4 open, link, current page".

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

One-word labels in the chosen language only (UI glossary: কাজ / সমস্যা / মজুদ / অর্ডার / আরও / সারসংক্ষেপ). Never bilingual.

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Phone and tablet widths (< 1024px) on every home surface.

### When Not to Use

Desktop (use side-nav); inside task screens (S6–S11), which have Back instead.

### Best Practices

- Maximum five tabs.
- Let labels wrap rather than shrink or truncate.
- Only the Issues tab carries a badge.

---

## Used In

**Pages:** 13

**Page IDs:** 01.1, 03.1, 04.1, 04.2, 05.1, 06.1, 07.1, 07.2, 07.3, 08.1, 09.2, 09.7, 10.3

- [01.1-My tasks](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.1-my-tasks/01.1-my-tasks.md)
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

- [Side Nav [nav-001]](side-nav.md) - desktop equivalent
- [Count Badge [bdg-001]](count-badge.md) - on the Issues tab
- [Scan Bar [bar-002]](scan-bar.md) - shares the fixed bottom zone on floor-role homes

---

## Open Questions

1. Typography token for tab labels is not in DESIGN.md frontmatter (`body-strong` assumed).
2. Icon-to-label gap is not specified.
3. Five Bangla tabs at 320 CSS px still need verification on a low-cost phone (DD-9 [ASSUMPTION]).

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.bottom-tab-bar` (WDS Phase 7, Create).
- 2026-10-24: Up to 5 tabs; Bangla labels wrap at 320 CSS px (DD-9).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: bar-003
  name: Bottom Tab Bar
  key: bottom-tab-bar
  file: D-Design-System/components/bottom-tab-bar.md
```
