# Task Card [crd-002]

**Type:** Interactive
**Category:** Card
**Purpose:** Card for a task in My tasks or a line within a task screen.
**DESIGN.md key:** `task-card` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

`surface` card, min 64px. Product or document name in `title`, quantity progress "12 / 20 ctn" in `body-strong` (picks only), status tag on the right. The whole card is one target and holds no other buttons. The current line gets a 5px `primary` left bar plus visually hidden "Current".

---

## Variants

- **task** - My tasks card (document; tap opens the task).
- **line** - a line on a task screen; selected line expands to its quantity entry and button.
- **draft transfer** - "Draft transfer · not sent" card with Draft tag (DD-5).

---

## States

**Required States:**

- default
- current (selected)
- focus
- pressed

**Optional States:**

- done
- not synced
- loading skeleton

**State Descriptions:**

**Current:** 5px `{colors.primary}` left bar + hidden text "Current"; distinct from focus ring.
**Blind screens:** show only "counted 12 ctn", never expected.
**Not synced:** status tag shows Not synced.

---

## Styling

### Visual Properties

**Size:** min-height `{spacing.target-floor}`.  
**Shape:** `{rounded.md}`.  
**Colors:** `{colors.surface}`; 1px `{colors.border}` (decorative); current bar `{colors.primary}`. Light shadow `0 1px 2px` ~6% at most; dark none.  
**Typography:** Name `{typography.title}`; progress `{typography.body-strong}`; secondary `{typography.meta}` / `{typography.meta-bn}`.  
**Spacing:** Padding `{spacing.3}`; `{spacing.2}` between cards.

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.task-card`). Do not edit here; change DESIGN.md first.

```yaml
task-card:
    background: '{colors.surface}'
    border: '1px solid {colors.border}'
    current-indicator: '5px left bar {colors.primary}'
    radius: '{rounded.md}'
    padding: '{spacing.3}'
    min-height: '{spacing.target-floor}'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-picking.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-picking.html), [key-receiving.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-receiving.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

Tap opens the task or selects the line. Expanded line contains quantity entry + floor primary button (the only case with controls inside; the card's tap target is then its header).

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** Task: the card is one link/button. Line: header button with `aria-expanded`; current line has visually hidden "Current".

**Keyboard Support:** Tab to card; Enter opens/selects.

**Screen Reader:** "Rice 25 kg, 12 of 20 cartons, In progress, Current".

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

Product names as entered; units and Western digits.

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

My tasks, task line lists.

### When Not to Use

Issues (use issue-card).

### Best Practices

- No nested buttons in task-mode cards.

---

## Used In

**Pages:** 9

**Page IDs:** 01.1, 01.2, 01.4, 02.1, 05.1, 05.2, 05.3, 06.1, 08.2

- [01.1-My tasks](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.1-my-tasks/01.1-my-tasks.md)
- [01.2-Receive PO (blind)](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.2-receive-po/01.2-receive-po.md)
- [01.4-Offline queue](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.4-offline-queue/01.4-offline-queue.md)
- [02.1-Pick Dispatch order](../../C-UX-Scenarios/02-karim-picks-and-flags-damage/02.1-pick-dispatch-order/02.1-pick-dispatch-order.md)
- [05.1-Transfers](../../C-UX-Scenarios/05-karims-transfer-arrives-short/05.1-transfers-list/05.1-transfers-list.md)
- [05.2-Send Transfer](../../C-UX-Scenarios/05-karims-transfer-arrives-short/05.2-send-transfer/05.2-send-transfer.md)
- [05.3-Receive Transfer (blind)](../../C-UX-Scenarios/05-karims-transfer-arrives-short/05.3-receive-transfer/05.3-receive-transfer.md)
- [06.1-My record](../../C-UX-Scenarios/06-karim-proves-where-a-carton-went/06.1-my-record/06.1-my-record.md)
- [08.2-Count lines (blind)](../../C-UX-Scenarios/08-rafiq-runs-the-weekly-count/08.2-count-lines/08.2-count-lines.md)

---

## Related Components

- [Task Status Tag [pil-002]](task-status-tag.md) - status
- [Quantity Entry [inp-001]](quantity-entry.md) - expanded line
- [Sync Status Chip [pil-003]](sync-status-chip.md) - queued lines

---

## Open Questions

1. The expanded line mixes a tappable header and inner controls; confirm structure (header button vs whole card) with the 01.2 / 02.1 specs.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.task-card` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: crd-002
  name: Task Card
  key: task-card
  file: D-Design-System/components/task-card.md
```

Variant explosion check (step-08d): 3 variants, within the recommended maximum of 5.
