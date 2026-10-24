# Quantity Entry [inp-001]

**Type:** Form
**Category:** Numeric entry
**Purpose:** Carton and piece entry with steppers, stored in Base units.
**DESIGN.md key:** `quantity-entry` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

One row per unit (cartons, pieces; the pieces row is hidden when the Product has no Pack unit). Floor: `[− 64px] [field ≥ 6rem] [+ 64px]` with `qty-display` digits. Pieces ≥ Conversion factor roll into cartons on blur ("27 pcs" → "1 ctn + 3 pcs" for 24/ctn). Shows the max inline when a limit exists.

---

## Variants

- **floor** - (original) stacked rows below 600px: `[− {spacing.target-floor}] [field min 6rem] [+ {spacing.target-floor}]`; side by side at ≥ 600px. Fits 288px at 320 CSS px (64 + 8 + ≥96 + 8 + 64).
- **desk** - (added 2026-10-24, step-08d) compact entry for desk forms (09.4 opening stock, 09.7 PO lines): two [input-field](input-field.md)-sized number fields labelled "{Pack}s" and "{Base}s", min-height `{spacing.target-min}` (48px), no 64px steppers, `inputmode="numeric"`, a result line under them in `meta` / `meta-bn` ("= 1 ctn + 3 pcs"). Stacked below 600px, side by side at ≥ 600px. Same roll-over and refusal rules as floor.

### Variant-Specific Styling

**Floor:**
- Field min-height `{spacing.target-floor}`, steppers `{spacing.target-floor}` square
- Digits `{typography.qty-display}` (tabular-nums), unit label `{typography.body-strong}`
- Border 2px `{colors.control-border}`, `{rounded.md}`

**Desk:** ← Added 2026-10-24
- Field min-height `{spacing.target-min}`, no steppers
- Digits `{typography.body}` with `font-variant-numeric: tabular-nums` [ASSUMPTION: no desk quantity typography token; `qty-display` is floor weight, which DESIGN.md says not to bring to desk screens]
- Border 1px `{colors.control-border}`, `{rounded.sm}` (input-field tokens); focus / error as input-field
- Result line `{typography.meta}` / `{typography.meta-bn}`, `{colors.text-muted}`

### Variant Usage

**Floor:** 01.2, 02.1, 02.2, 05.2, 05.3, 07.3, 08.2
**Desk:** 09.4, 09.7 (07.3 Create on desk is an open question in 09.7)

---

## States

**Required States:**

- default (empty)
- pre-filled
- focus
- error (refused)

**Optional States:**

- with max
- rolled over
- disabled
- offline

**State Descriptions:**

**Pre-fill per screen:** pick (S8) = full remaining line quantity; Flag damage sheet = 1 of the scanned unit; blind screens and Send Transfer = empty, scanned unit's row focused.
**Focus:** 2px `{colors.primary}` border plus the focus ring on keyboard focus.
**Error:** 2px `{colors.danger}` border, `aria-invalid="true"`, [refusal-message](refusal-message.md) below.
**With max:** "Max 8 ctn" inline where a limit exists (Dispatch order: Promisable; pick: remaining).
**Blind:** never shows expected, ordered, sent or system quantities (FR-21, FR-27, FR-35).
**Offline:** works; limits checked against data on the phone; server may later refuse (Sync conflict).

---

## Styling

### Visual Properties

**Size:** Floor: field min-height `{spacing.target-floor}`, field min width 6rem, steppers `{spacing.target-floor}`. Desk: `{spacing.target-min}`.  
**Shape:** `{rounded.md}` (floor); `{rounded.sm}` (desk).  
**Colors:** Border `{colors.control-border}`; focus `{colors.primary}`; error `{colors.danger}`; field `{colors.surface}`.  
**Typography:** Floor digits `{typography.qty-display}`; unit `{typography.body-strong}`.  
**Spacing:** `{spacing.2}` between stepper, field and stepper; `{spacing.2}` between rows.

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.quantity-entry`). Do not edit here; change DESIGN.md first.

```yaml
quantity-entry:
    layout: 'stacked rows below 600px: [- {spacing.target-floor}] [field min 6rem] [+ {spacing.target-floor}]'
    field-min-height: '{spacing.target-floor}'
    value-typography: '{typography.qty-display}'
    unit-typography: '{typography.body-strong}'
    stepper-size: '{spacing.target-floor}'
    border: '2px solid {colors.control-border}'
    focus-border: '2px solid {colors.primary}'
    error-border: '2px solid {colors.danger}'
    radius: '{rounded.md}'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-picking.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-picking.html), [key-receiving.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-receiving.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

Steppers change by 1 unit; typing uses the numeric keypad; roll-over on blur; refusal checked after ~0.5 s pause.

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** Each row a labelled `<input inputmode="numeric">` (label = unit name); steppers are buttons named "Decrease cartons" / "Increase cartons" (localised). `aria-invalid` + `aria-describedby` → refusal. Blind screens: no expected value in any attribute.

**Keyboard Support:** Tab: − / field / +; arrow keys do not change values [ASSUMPTION]; Enter saves on desk forms.

**Screen Reader:** "Cartons, edit text, 40"; refusal announced once per change in the assertive region.

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

Unit names from glossary (কার্টন / পিস); Western digits; never raw base counts.

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Any quantity entry.

### When Not to Use

Money (use input-field money variant).

### Best Practices

- Store Base units; display Pack + Base.
- Never a quantity default on blind screens.

---

## Used In

**Pages:** 7

**Page IDs:** 01.2, 02.1, 02.2, 05.2, 05.3, 07.3, 08.2

- [01.2-Receive PO (blind)](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.2-receive-po/01.2-receive-po.md)
- [02.1-Pick Dispatch order](../../C-UX-Scenarios/02-karim-picks-and-flags-damage/02.1-pick-dispatch-order/02.1-pick-dispatch-order.md)
- [02.2-Flag damage](../../C-UX-Scenarios/02-karim-picks-and-flags-damage/02.2-flag-damage/02.2-flag-damage.md)
- [05.2-Send Transfer](../../C-UX-Scenarios/05-karims-transfer-arrives-short/05.2-send-transfer/05.2-send-transfer.md)
- [05.3-Receive Transfer (blind)](../../C-UX-Scenarios/05-karims-transfer-arrives-short/05.3-receive-transfer/05.3-receive-transfer.md)
- [07.3-Dispatch orders](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.3-dispatch-orders/07.3-dispatch-orders.md)
- [08.2-Count lines (blind)](../../C-UX-Scenarios/08-rafiq-runs-the-weekly-count/08.2-count-lines/08.2-count-lines.md)

**Variant usage:** desk: 09.4, 09.7

---

## Related Components

- [Refusal Message [alt-002]](refusal-message.md) - error
- [Input Field [inp-002]](input-field.md) - desk variant uses its tokens
- [Floor Primary Button [btn-001]](button-primary-floor.md) - Save / Confirm line under it

---

## Open Questions

1. Desk variant digit typography (no token).
2. Arrow-key stepping behaviour not specified.
3. Whether 07.3 Dispatch order create on desk uses floor or desk variant (09.7 OQ 3).

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.quantity-entry` (WDS Phase 7, Create).
- 2026-10-24: Added variant `desk` alongside `floor` (step-08d, duplicate detection: 09.4 Open Question 1, 09.7 Open Question 3).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: inp-001
  name: Quantity Entry
  key: quantity-entry
  file: D-Design-System/components/quantity-entry.md
```
