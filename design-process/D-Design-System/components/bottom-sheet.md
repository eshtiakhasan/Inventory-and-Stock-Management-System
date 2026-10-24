# Bottom Sheet [sht-001]

**Type:** Feedback
**Category:** Sheet
**Purpose:** Small task or picker that slides up from the bottom over a scrim.
**DESIGN.md key:** `bottom-sheet` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

Used for the Flag damage sheet, history filters, small pickers (Warehouse for "Found", Reason for "Confirmed loss") and the offline queue detail. Max 90% of the viewport height with its own scroll; 48px close button at top-right of the sheet (not the screen corner).

---

## Variants

This component has no variants. Content varies (Flag damage sheet, filter sheet, picker).

---

## States

**Required States:**

- default
- changed (dirty)
- focus

**Optional States:**

- saving
- offline

**State Descriptions:**

**Default:** tapping the backdrop closes the sheet only when nothing has been changed.
**Changed:** once a field changes, the backdrop does nothing; only Close or the save button leave.
**Saving:** the sheet's primary button shows its loading state.
**Offline:** floor actions inside (Flag damage) save and queue; internet-only actions show Needs internet.

---

## Styling

### Visual Properties

**Size:** Full width; max height 90% of the viewport; close button `{spacing.target-min}`.  
**Shape:** `{rounded.lg}` top corners only.  
**Colors:** `{colors.surface}` over `{colors.scrim}` / `{colors.scrim-dark}`. Light shadow `0 6px 16px` at ~25%; dark none.  
**Typography:** Heading `{typography.title}` (Product name) or `{typography.headline}` [ASSUMPTION: sheet heading token not fixed].  
**Spacing:** Padding `{spacing.4}`; gutters `{spacing.gutter-phone}`.

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.bottom-sheet`). Do not edit here; change DESIGN.md first.

```yaml
bottom-sheet:
    background: '{colors.surface}'
    backdrop: '{colors.scrim}'
    radius: '{rounded.lg} top corners'
    close-button: '{spacing.target-min}'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-picking.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-picking.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

Close, Escape and Back close it and return focus to the opener.

### Animations

No slide-in when reduced motion is on; otherwise ≤ 200ms.

---

## Accessibility

**ARIA Attributes:** `role="dialog"`, `aria-modal="true"`, labelled by its heading. Page behind inert; focus moves in and is trapped.

**Keyboard Support:** Tab cycles inside; Escape closes.

**Screen Reader:** Announces the sheet heading.

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

Chosen language only, except a floor primary button inside it (bilingual).

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Small tasks and pickers on phone.

### When Not to Use

Confirmations (use confirmation-dialog); long forms (use a page).

### Best Practices

- Never let a backdrop tap discard changed input.
- Keep the save button reachable above the keyboard.

---

## Used In

**Pages:** 5

**Page IDs:** 01.4, 02.2, 03.2, 06.1, 07.2

- [01.4-Offline queue](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.4-offline-queue/01.4-offline-queue.md)
- [02.2-Flag damage](../../C-UX-Scenarios/02-karim-picks-and-flags-damage/02.2-flag-damage/02.2-flag-damage.md)
- [03.2-issue-detail](../../C-UX-Scenarios/03-nasima-clears-the-inbox/03.2-issue-detail/03.2-issue-detail.md)
- [06.1-My record](../../C-UX-Scenarios/06-karim-proves-where-a-carton-went/06.1-my-record/06.1-my-record.md)
- [07.2-Product stock](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.2-product-stock/07.2-product-stock.md)

---

## Related Components

- [Confirmation Dialog [dlg-002]](confirmation-dialog.md) - for confirmations
- [Button Danger [btn-005]](button-danger.md) - Flag damage sheet save
- [Quantity Entry [inp-001]](quantity-entry.md) - inside the Flag damage sheet
- [Choice Chip [tgl-001]](choice-chip.md) - reason chips

---

## Open Questions

1. Sheet heading typography is not in frontmatter.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.bottom-sheet` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: sht-001
  name: Bottom Sheet
  key: bottom-sheet
  file: D-Design-System/components/bottom-sheet.md
```
