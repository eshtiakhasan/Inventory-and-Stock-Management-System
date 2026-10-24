# Task Status Tag [pil-002]

**Type:** Content
**Category:** Status tag
**Purpose:** Display-only status on task cards: New, In progress, Not synced, Done, Draft.
**DESIGN.md key:** `task-status-tag` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

`{rounded.sm}`, 2px border, `body-strong`, min 32px, icon + word. Display only, not tappable. "Not synced" replaces other values while any line is queued. Also reused (styling only) for other display tags, e.g. "Assigned to" on Issue cards.

---

## Variants

- **new** - `{colors.text}` text, 2px `{colors.control-border}`.
- **in-progress** - `{colors.text}` text, 2px `{colors.control-border}`.
- **not-synced** - `{colors.warning}` text, 2px dashed `{colors.warning}`, hourglass icon.
- **done** - `{colors.success}` text, 2px solid `{colors.success}`, check icon.
- **draft** - (added 2026-10-24, DD-5) `{colors.text-muted}` text, 2px dashed `{colors.control-border}`, pencil icon. Used on "Draft transfer · not sent" cards so a draft never looks like queued work.

---

## States

**Required States:**

- new
- in-progress
- not-synced
- done
- draft

**Optional States:**

- none

**State Descriptions:**

One value at a time; order of precedence: Not synced > Draft > Done > In progress > New [ASSUMPTION: precedence of Draft vs Not synced].

---

## Styling

### Visual Properties

**Size:** min-height 2rem (32px).  
**Shape:** `{rounded.sm}`.  
**Colors:** See variants. warning on surface 6.6:1 / 10.1:1; success on surface 6.3:1 / 10.2:1 (computed here; not in DESIGN.md table).  
**Typography:** `{typography.body-strong}`.  
**Spacing:** Padding `{spacing.1}` × `{spacing.2}` [ASSUMPTION].

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.task-status-tag`). Do not edit here; change DESIGN.md first.

```yaml
task-status-tag:
    border: '2px solid {colors.control-border}'
    text: '{colors.text}'
    typography: '{typography.body-strong}'
    radius: '{rounded.sm}'
    min-height: 2rem
    not-synced: '{colors.warning} text, 2px dashed {colors.warning}, icon hourglass'
    done: '{colors.success} text, 2px solid {colors.success}, icon check'
    draft: '{colors.text-muted} text, 2px dashed {colors.control-border}, icon pencil'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-picking.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-picking.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

None.

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** Plain text; icon `aria-hidden`.

**Keyboard Support:** Not focusable.

**Screen Reader:** Read as part of the card: "Not synced".

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

নতুন / চলছে / সিঙ্ক বাকি / সম্পন্ন / খসড়া [BN: verify].

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Task cards and lines.

### When Not to Use

Stock states (stock-state-pill); tappable sync status (sync-status-chip).

### Best Practices

- Never color alone - every value has a word, and three have icons.

---

## Used In

**Pages:** 17

**Page IDs:** 01.1, 01.2, 02.1, 03.1, 04.1, 04.2, 05.1, 06.1, 07.2, 07.3, 08.1, 08.2, 09.2, 09.3, 09.4, 09.6, 09.7

- [01.1-My tasks](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.1-my-tasks/01.1-my-tasks.md)
- [01.2-Receive PO (blind)](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.2-receive-po/01.2-receive-po.md)
- [02.1-Pick Dispatch order](../../C-UX-Scenarios/02-karim-picks-and-flags-damage/02.1-pick-dispatch-order/02.1-pick-dispatch-order.md)
- [03.1-issues-inbox](../../C-UX-Scenarios/03-nasima-clears-the-inbox/03.1-issues-inbox/03.1-issues-inbox.md)
- [04.1-owner-view](../../C-UX-Scenarios/04-haque-traces-an-unexplained-loss/04.1-owner-view/04.1-owner-view.md)
- [04.2-low-stock](../../C-UX-Scenarios/04-haque-traces-an-unexplained-loss/04.2-low-stock/04.2-low-stock.md)
- [05.1-Transfers](../../C-UX-Scenarios/05-karims-transfer-arrives-short/05.1-transfers-list/05.1-transfers-list.md)
- [06.1-My record](../../C-UX-Scenarios/06-karim-proves-where-a-carton-went/06.1-my-record/06.1-my-record.md)
- [07.2-Product stock](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.2-product-stock/07.2-product-stock.md)
- [07.3-Dispatch orders](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.3-dispatch-orders/07.3-dispatch-orders.md)
- [08.1-Stock counts](../../C-UX-Scenarios/08-rafiq-runs-the-weekly-count/08.1-stock-counts/08.1-stock-counts.md)
- [08.2-Count lines (blind)](../../C-UX-Scenarios/08-rafiq-runs-the-weekly-count/08.2-count-lines/08.2-count-lines.md)
- [09.2-settings-warehouses](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.2-settings-warehouses/09.2-settings-warehouses.md)
- [09.3-settings-excel-import](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.3-settings-excel-import/09.3-settings-excel-import.md)
- [09.4-settings-products](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.4-settings-products/09.4-settings-products.md)
- [09.6-settings-users](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.6-settings-users/09.6-settings-users.md)
- [09.7-purchase-orders](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.7-purchase-orders/09.7-purchase-orders.md)

---

## Related Components

- [Task Card [crd-002]](task-card.md) - host
- [Sync Status Chip [pil-003]](sync-status-chip.md) - tappable sync chip

---

## Open Questions

1. New and In progress have no icon - acceptable because text differs, but confirm.
2. Draft vs Not synced precedence for an offline-saved draft.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.task-status-tag` (WDS Phase 7, Create).
- 2026-10-24: `draft` variant included (DESIGN.md change log, DD-5).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: pil-002
  name: Task Status Tag
  key: task-status-tag
  file: D-Design-System/components/task-status-tag.md
```

Variant explosion check (step-08d): 5 variants, within the recommended maximum of 5.
