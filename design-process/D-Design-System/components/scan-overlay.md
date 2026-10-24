# Scan Overlay [dlg-001]

**Type:** Feedback
**Category:** Full-screen dialog (camera)
**Purpose:** Full-screen camera viewfinder that reads a barcode, with Type code always available.
**DESIGN.md key:** `scan-overlay` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

Opens over the current page from the Scan bar, a Product field's scan button or Flag damage. Camera feed fills the screen; a rounded viewfinder frame sits in the upper middle with a one-line hint above it on a `scrim-dark` strip. Bottom third: a `surface` action bar with **Close** and **Type code**, each a 64px secondary button at least 9rem wide. In **Flag damage mode** the hint strip turns `danger` so the mode is never mistaken for a normal scan, and the scan itself saves.

---

## Variants

- **scan** - default; the scan identifies a Product and pre-fills (never records).
- **flag damage mode** - hint strip `{colors.danger}` fill, `{colors.on-danger}` text, warning icon: "Flag damage — scan the damaged item". The scan saves 1 of the scanned unit as damaged.
- **type code** - field for Barcode, SKU or name search, opened from the Type code button (or directly when the camera is unavailable).

---

## States

**Required States:**

- default (camera live)
- flag damage mode
- type code
- focus

**Optional States:**

- no read after ~8 s
- camera denied / unsupported
- not found
- not on this phone yet
- not in this task

**State Descriptions:**

**No read after ~8 s:** hint changes to "Can't scan? Type the code."
**Camera denied / unsupported:** "Camera not available — type the code or search" with the field focused (FR-39).
**Not found (online):** "Not found" + search field; Manager also sees "Link this barcode to a product" (FR-38).
**Not on this phone yet (offline):** "Not on this phone yet — connect to look it up." Nothing recorded.
**Not in this task:** "Not on this order" (or delivery / Transfer / count). Nothing recorded.

---

## Styling

### Visual Properties

**Size:** Full screen. Action bar buttons min `{spacing.target-floor}` (64px), each ≥ 9rem wide; they stack at 320 CSS px or large text.  
**Shape:** Viewfinder frame corners `{rounded.md}`.  
**Colors:** Edges under `{colors.scrim-dark}` in both modes (camera feed); frame corners 3px `{colors.on-primary}`; action bar `{colors.surface}`; flag-mode strip `{colors.danger}` / `{colors.on-danger}`.  
**Typography:** Hint `{typography.label-button}`; buttons per [button-secondary](button-secondary.md).  
**Spacing:** Action bar padding `{spacing.3}`; `{spacing.2}` between buttons [ASSUMPTION].

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.scan-overlay`). Do not edit here; change DESIGN.md first.

```yaml
scan-overlay:
    background: camera feed, edges under '{colors.scrim-dark}'
    frame: '3px {colors.on-primary} corners, {rounded.md}'
    header-typography: '{typography.label-button}'
    flag-mode-header: '{colors.danger} fill, {colors.on-danger} text, icon warning'
    action-bar: '{colors.surface} fill, two buttons at {spacing.target-floor}'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-picking.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-picking.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

On a read: short vibration where supported, overlay closes, the polite live region announces the match ("Rice 25 kg selected, 8 ctn" / "Rice 25 kg — Flagged 1 ctn damaged"). Camera closes after every successful scan. Close, Escape or Back closes without doing anything and returns focus to the opener. Type code result acts exactly like a scan, except in Flag damage mode where it opens the pre-filled Flag damage sheet.

### Animations

None. No slide-in; respects reduced motion.

---

## Accessibility

**ARIA Attributes:** `role="dialog"`, `aria-modal="true"`, named "Scan" (or "Flag damage — scan the damaged item"). Focus moves to the dialog heading on open; trapped inside; page behind inert.

**Keyboard Support:** Tab cycles Close / Type code; Escape closes.

**Screen Reader:** Announces the dialog name, then the hint. Match results go to the polite live region.

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

Hint in the chosen language only. Product names as entered. Quantities with Western digits and unit words.

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Every scan entry point.

### When Not to Use

Do not embed the camera inline in a page.

### Best Practices

- Type code is always visible, not only on camera failure.
- No torch control in v1.
- Never auto-record a scan except in Flag damage mode.

---

## Used In

**Pages:** 2

**Page IDs:** 01.3, 02.2

- [01.3-Scan overlay](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.3-scan-overlay/01.3-scan-overlay.md)
- [02.2-Flag damage](../../C-UX-Scenarios/02-karim-picks-and-flags-damage/02.2-flag-damage/02.2-flag-damage.md)

---

## Related Components

- [Scan Bar [bar-002]](scan-bar.md) - opener
- [Flag Damage Button [btn-004]](button-flag-damage.md) - opens flag damage mode
- [Bottom Sheet [sht-001]](bottom-sheet.md) - Flag damage sheet opened from Type code in flag mode
- [Button Secondary [btn-003]](button-secondary.md) - Close and Type code

---

## Open Questions

1. Hint text color on the `scrim-dark` strip (normal mode) is not in frontmatter; `on-primary` (white) is implied by the mocks.
2. The overlay uses `scrim-dark` in light mode too - confirm intentional (camera feed is dark in both themes).

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.scan-overlay` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: dlg-001
  name: Scan Overlay
  key: scan-overlay
  file: D-Design-System/components/scan-overlay.md
```

Variant explosion check (step-08d): 3 variants, within the recommended maximum of 5.
