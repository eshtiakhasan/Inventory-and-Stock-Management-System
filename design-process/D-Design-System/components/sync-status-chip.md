# Sync Status Chip [pil-003]

**Type:** Feedback
**Category:** Status chip
**Purpose:** Shows a queued line's sync status: Not synced, or Not applied – sent to supervisor.
**DESIGN.md key:** `sync-status-chip` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

On queued lines in S3, S7–S11, S21, S20. "Not synced" while queued; disappears when the server accepts; turns into "Not applied – sent to supervisor" if refused (FR-44). The refused chip is tappable (48px) and explains why.

---

## Variants

- **queued** - `{colors.surface-alt}` fill, `{colors.warning}` text, 2px dashed `{colors.warning}`, hourglass icon.
- **not-applied** - `{colors.surface}` fill, `{colors.danger}` text, 2px solid `{colors.danger}`, alert icon; tappable.

---

## States

**Required States:**

- queued
- not-applied
- focus (not-applied)

**Optional States:**

- syncing
- another person's actions

**State Descriptions:**

**Syncing:** chips clear one by one in recorded order.
**Another person's:** shown only as a count in S21 / banner (DD-8); not editable.

---

## Styling

### Visual Properties

**Size:** min-height `{spacing.target-min}` when tappable; otherwise the 64px line is the target.  
**Shape:** `{rounded.sm}`.  
**Colors:** warning text on surface-alt 5.9:1 / 8.9:1; danger on surface 7.2:1 / 8.3:1.  
**Typography:** `{typography.body-strong}`.  
**Spacing:** Padding `{spacing.1}` × `{spacing.2}` [ASSUMPTION].

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.sync-status-chip`). Do not edit here; change DESIGN.md first.

```yaml
sync-status-chip:
    queued: '{colors.surface-alt} fill, {colors.warning} text, 2px dashed {colors.warning}, icon hourglass'
    not-applied: '{colors.surface} fill, {colors.danger} text, 2px solid {colors.danger}, icon alert'
    radius: '{rounded.sm}'
    typography: '{typography.body-strong}'
    min-height: '{spacing.target-min}'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-picking.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-picking.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

Tap not-applied: explains the reason and shows the Issue it raised.

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** Queued: plain text. Not-applied: `<button>`. Sync results announced in the polite region.

**Keyboard Support:** Not-applied: Enter / Space.

**Screen Reader:** "Not applied, sent to supervisor, button".

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

"সিঙ্ক বাকি" / "Not synced"; "প্রয়োগ হয়নি – সুপারভাইজারের কাছে পাঠানো হয়েছে" / "Not applied – sent to supervisor". No blame words.

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Queued lines.

### When Not to Use

Task-level status (task-status-tag).

### Best Practices

- Never silently drop a refused action.

---

## Used In

**Pages:** 8

**Page IDs:** 01.2, 01.4, 02.1, 05.1, 05.2, 05.3, 06.1, 08.2

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

- [Task Status Tag [pil-002]](task-status-tag.md) - task-level
- [Offline Banner [alt-001]](offline-banner.md) - queue count

---

## Open Questions

None.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.sync-status-chip` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: pil-003
  name: Sync Status Chip
  key: sync-status-chip
  file: D-Design-System/components/sync-status-chip.md
```
