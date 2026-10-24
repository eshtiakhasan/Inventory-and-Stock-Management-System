# Issue Decision Button [btn-007]

**Type:** Interactive
**Category:** Button
**Purpose:** Two-line one-tap decision on an Issue: decision + effect.
**DESIGN.md key:** `issue-decision-button` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

Decision in `label-button`, effect underneath in `body` ("Approve · write off 1 ctn"). Recommended = filled `primary`; alternative = outlined. Side by side when both fit in two lines; stacked full width otherwise (always stacked at 320 CSS px or text ≥ 150%). One tap decides; no dialog (FR-30). Where a decision needs a choice, the card shows one outlined "Open to decide" instead.

---

## Variants

- **recommended** - `{colors.primary}` fill, `{colors.on-primary}` text.
- **alternative** - `{colors.surface}` fill, `{colors.text}` text, 2px `{colors.control-border}`.
- **open to decide** - alternative styling, single line, navigates to Issue detail.

---

## States

**Required States:**

- default
- pressed
- focus
- loading
- offline (Needs internet)

**Optional States:**

- already decided

**State Descriptions:**

**Offline:** disabled ([button-disabled](button-disabled.md), cloud-off) with "Needs internet" beside it.
**Already decided:** the decision row is replaced by "Already decided by {name} at {time}: {decision}"; the card leaves the list.
**Self-raised (FR-5):** no buttons; notice "You raised this — another person must decide".

---

## Styling

### Visual Properties

**Size:** min-height `{spacing.target-floor}` (64px); grows taller rather than shrink text.  
**Shape:** `{rounded.md}`.  
**Colors:** See variants.  
**Typography:** Decision `{typography.label-button}`; effect `{typography.body}`; both ≥ 16px in Bangla.  
**Spacing:** `{spacing.2}` between buttons.

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.issue-decision-button`). Do not edit here; change DESIGN.md first.

```yaml
issue-decision-button:
    min-height: '{spacing.target-floor}'
    radius: '{rounded.md}'
    label-typography: '{typography.label-button}'
    effect-typography: '{typography.body}'
    recommended: '{colors.primary} fill, {colors.on-primary} text'
    alternative: '{colors.surface} fill, {colors.text} text, 2px {colors.control-border}'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-issues-inbox.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-issues-inbox.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

One tap records the decision; toast confirms; focus stays in the list and moves to the next card.

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** Native `<button>`, siblings of the card title link (never nested in a tappable card). Name = decision + effect.

**Keyboard Support:** Enter / Space.

**Screen Reader:** "Approve, write off 1 carton, button".

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

Chosen language only. Labels from the UI glossary decision tables; quantities with Western digits and units.

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Issue cards (S12) and Issue detail (S13).

### When Not to Use

Generic actions.

### Best Practices

- A write-off is never the only one-tap option.
- Recommended per Issue type from EXPERIENCE.md → Issue decisions.

---

## Used In

**Pages:** 3

**Page IDs:** 03.1, 03.2, 08.1

- [03.1-issues-inbox](../../C-UX-Scenarios/03-nasima-clears-the-inbox/03.1-issues-inbox/03.1-issues-inbox.md)
- [03.2-issue-detail](../../C-UX-Scenarios/03-nasima-clears-the-inbox/03.2-issue-detail/03.2-issue-detail.md)
- [08.1-Stock counts](../../C-UX-Scenarios/08-rafiq-runs-the-weekly-count/08.1-stock-counts/08.1-stock-counts.md)

---

## Related Components

- [Issue Card [crd-003]](issue-card.md) - host
- [Button Disabled [btn-006]](button-disabled.md) - offline

---

## Open Questions

None.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.issue-decision-button` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: btn-007
  name: Issue Decision Button
  key: issue-decision-button
  file: D-Design-System/components/issue-decision-button.md
```

Variant explosion check (step-08d): 3 variants, within the recommended maximum of 5.
