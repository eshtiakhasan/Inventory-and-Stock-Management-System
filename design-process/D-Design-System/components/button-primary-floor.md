# Floor Primary Button [btn-001]

**Type:** Interactive
**Category:** Button
**Purpose:** 64px full-width bilingual button that records or finishes floor work.
**DESIGN.md key:** `button-primary-floor` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

Used for Confirm line, Save line, Mark delivery complete, Finish receipt, Confirm dispatch, Send Transfer (finish) and the confirm button of a dialog on a floor screen. Bilingual: Bangla in `label-button`, English in `label-button-secondary`, on one line when it fits, otherwise two.

---

## Variants

This component has no variants. The danger-filled Flag damage sheet button uses [button-danger](button-danger.md).

---

## States

**Required States:**

- default
- pressed
- focus
- loading (saving)
- disabled (aria-disabled)

**Optional States:**

- offline

**State Descriptions:**

**Default:** `{colors.primary}` fill, `{colors.on-primary}` text.
**Loading:** disables on tap until saved (FR-14); spinner inside the button (< 2 s). Double taps never record twice.
**Disabled:** uses [button-disabled](button-disabled.md) styling with a visible reason ("Enter a quantity"); stays focusable via `aria-disabled`.
**Offline:** floor actions still work and queue; the toast then reads "Saved on phone, will sync".

---

## Styling

### Visual Properties

**Size:** Full width; min-height `{spacing.target-floor}` (64px).  
**Shape:** `{rounded.md}`.  
**Colors:** `{colors.primary}` / `{colors.on-primary}` (8.1:1 / 9.6:1).  
**Typography:** Bangla `{typography.label-button}` (18px / 700); English `{typography.label-button-secondary}` (16px / 600).  
**Spacing:** Sits `{spacing.3}` below the line's quantity entry; inside scrolling content.

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.button-primary-floor`). Do not edit here; change DESIGN.md first.

```yaml
button-primary-floor:
    background: '{colors.primary}'
    text: '{colors.on-primary}'
    typography: '{typography.label-button}'
    secondary-typography: '{typography.label-button-secondary}'
    min-height: '{spacing.target-floor}'
    radius: '{rounded.md}'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-picking.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-picking.html), [key-receiving.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-receiving.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

After saving: toast shows, the line shows its new state, and focus returns to the Scan bar. Line buttons scroll into view above the fixed zone and the keyboard.

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** Native `<button>`; accessible name from visible text with `<span lang="bn">` and `<span lang="en">`; **no `aria-label`**. `aria-disabled="true"` + `aria-describedby` reason when disabled; `aria-busy` while saving.

**Keyboard Support:** Enter / Space.

**Screen Reader:** "লাইন সেভ করুন Save line, button".

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

Bilingual exception; Bangla first. Strings from the UI glossary (e.g. "লাইন নিশ্চিত করুন · Confirm line").

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Primary record/finish action on floor screens.

### When Not to Use

Desk screens (use button-primary); non-recording actions.

### Best Practices

- One per line, one finish button per task list.
- Never fade to show disabled.

---

## Used In

**Pages:** 5

**Page IDs:** 01.2, 02.1, 05.2, 05.3, 08.2

- [01.2-Receive PO (blind)](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.2-receive-po/01.2-receive-po.md)
- [02.1-Pick Dispatch order](../../C-UX-Scenarios/02-karim-picks-and-flags-damage/02.1-pick-dispatch-order/02.1-pick-dispatch-order.md)
- [05.2-Send Transfer](../../C-UX-Scenarios/05-karims-transfer-arrives-short/05.2-send-transfer/05.2-send-transfer.md)
- [05.3-Receive Transfer (blind)](../../C-UX-Scenarios/05-karims-transfer-arrives-short/05.3-receive-transfer/05.3-receive-transfer.md)
- [08.2-Count lines (blind)](../../C-UX-Scenarios/08-rafiq-runs-the-weekly-count/08.2-count-lines/08.2-count-lines.md)

---

## Related Components

- [Button Primary (desk) [btn-002]](button-primary.md) - desk counterpart
- [Button Disabled [btn-006]](button-disabled.md) - disabled styling
- [Confirmation Toast [tst-001]](confirmation-toast.md) - feedback after save

---

## Open Questions

None.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.button-primary-floor` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: btn-001
  name: Floor Primary Button
  key: button-primary-floor
  file: D-Design-System/components/button-primary-floor.md
```
