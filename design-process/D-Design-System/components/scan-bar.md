# Scan Bar [bar-002]

**Type:** Interactive
**Category:** Fixed bottom action
**Purpose:** Large fixed bottom bar on floor screens that opens the Scan overlay.
**DESIGN.md key:** `scan-bar` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

The single most important floor control. Sits in the fixed bottom zone of every floor screen (My tasks and the task screens S3, S6–S11) for floor roles; never on desk-role home screens (DD-4). Shows a scan icon, "স্ক্যান করুন" in `label-scan` and "Scan" in `label-scan-secondary`, Bangla first. It is one of only two bilingual components (with the floor primary button).

---

## Variants

- **default** - min height `{spacing.scan-bar-height}` (72px).
- **compact** - min height `{spacing.scan-bar-height-compact}` (56px) on short screens (< `{spacing.short-screen}` tall) or text ≥ 150%; it is then the only fixed row. Below `{spacing.tiny-screen}` tall it sits at the end of the content instead of being fixed.
- **camera unavailable** - label changes to match the Type code path ("Camera not available — type the code or search"); tapping opens Type code directly (FR-39).

---

## States

**Required States:**

- default
- pressed
- focus
- hidden (keyboard open)

**Optional States:**

- compact
- camera unavailable
- offline

**State Descriptions:**

**Default:** `{colors.primary}` fill, `{colors.on-primary}` icon and text.
**Focus:** `{components.focus-ring}`; the inner `{colors.surface}` line separates the ring from the teal fill (8.1:1 / 10.3:1).
**Hidden:** while a text field is focused and the on-screen keyboard is open; returns on blur.
**Offline:** unchanged. Scanning works offline against the catalogue on the phone; unknown Products show "Not on this phone yet".
**Disabled:** not used. When recording pauses (24 h offline cap) the overlay explains it; the bar stays available.

---

## Styling

### Visual Properties

**Size:** Full width minus 2 × `{spacing.gutter-phone}`; min-height `{spacing.scan-bar-height}` (compact `{spacing.scan-bar-height-compact}`).  
**Shape:** `{rounded.lg}` (16px).  
**Colors:** Background `{colors.primary}`; text and icon `{colors.on-primary}` (8.1:1 light / 9.6:1 dark, AAA).  
**Typography:** Bangla part `{typography.label-scan}` (24px / 800); English part `{typography.label-scan-secondary}` (18px / 600). One line when it fits, two lines otherwise; never clipped.  
**Spacing:** Fixed bottom zone padding `{spacing.3}`, 1px `{colors.border}` top edge, no shadow.

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.scan-bar`). Do not edit here; change DESIGN.md first.

```yaml
scan-bar:
    background: '{colors.primary}'
    text: '{colors.on-primary}'
    typography: '{typography.label-scan}'
    secondary-typography: '{typography.label-scan-secondary}'
    min-height: '{spacing.scan-bar-height}'
    compact-min-height: '{spacing.scan-bar-height-compact}'
    radius: '{rounded.lg}'
    width: 'full width minus 2 x {spacing.gutter-phone}'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-picking.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-picking.html), [key-receiving.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-receiving.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

One tap opens the [Scan overlay](scan-overlay.md). Focus returns to the Scan bar after every save on floor screens. Camera permission is asked the first time it is tapped, not on page load.

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** Native `<button>`. Accessible name comes from the visible text: `<span lang="bn">স্ক্যান করুন</span> <span lang="en">Scan</span>`. **No `aria-label`.** Icon `aria-hidden="true"`.

**Keyboard Support:** Enter / Space opens the overlay. Tab order: last focusable element of the page.

**Screen Reader:** "স্ক্যান করুন Scan, button" (each part in its own language voice where TalkBack has one).

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

Bilingual exception (DESIGN.md → Typography → Language display). Text: "স্ক্যান করুন" + "Scan". No other text.

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Floor screens for floor roles: My tasks and task screens.

### When Not to Use

Desk-role home screens (Issues inbox, Owner view, Sales rep Product search) - scanning there goes through the Scan tab or the search field's scan button (DD-4).

### Best Practices

- Only one fixed row on short screens: this one.
- Never cover it with a toast; the toast floats above the fixed zone.
- Never use red for the Scan bar.

---

## Used In

**Pages:** 7

**Page IDs:** 01.1, 01.2, 02.1, 05.2, 05.3, 07.2, 08.2

- [01.1-My tasks](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.1-my-tasks/01.1-my-tasks.md)
- [01.2-Receive PO (blind)](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.2-receive-po/01.2-receive-po.md)
- [02.1-Pick Dispatch order](../../C-UX-Scenarios/02-karim-picks-and-flags-damage/02.1-pick-dispatch-order/02.1-pick-dispatch-order.md)
- [05.2-Send Transfer](../../C-UX-Scenarios/05-karims-transfer-arrives-short/05.2-send-transfer/05.2-send-transfer.md)
- [05.3-Receive Transfer (blind)](../../C-UX-Scenarios/05-karims-transfer-arrives-short/05.3-receive-transfer/05.3-receive-transfer.md)
- [07.2-Product stock](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.2-product-stock/07.2-product-stock.md)
- [08.2-Count lines (blind)](../../C-UX-Scenarios/08-rafiq-runs-the-weekly-count/08.2-count-lines/08.2-count-lines.md)

---

## Related Components

- [Scan Overlay [dlg-001]](scan-overlay.md) - opened by the Scan bar
- [Flag Damage Button [btn-004]](button-flag-damage.md) - sits directly above it on S6 and S8
- [Bottom Tab Bar [bar-003]](bottom-tab-bar.md) - below it on floor-role home screens

---

## Open Questions

1. Fixed bottom zone order on floor-role home screens (Scan bar above or below the tab bar) is described as "Scan bar + bottom tab bar"; mocks show Scan bar above. Confirm.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.scan-bar` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: bar-002
  name: Scan Bar
  key: scan-bar
  file: D-Design-System/components/scan-bar.md
```

Variant explosion check (step-08d): 3 variants, within the recommended maximum of 5.
