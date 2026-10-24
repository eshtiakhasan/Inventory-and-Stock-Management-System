# Issue Card [crd-003]

**Type:** Content
**Category:** Card
**Purpose:** Inbox card for one Issue with title link, value or quantity, meta line and decision buttons.
**DESIGN.md key:** `issue-card` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

Top: the **title link** (Issue type + Product, `title`, min 48px) and the value at risk in taka (`title`, `danger`, right). Then one meta line ("1 carton · Narayanganj · Karim · 14:05"). Then up to two Issue decision buttons as siblings of the link - never inside a tappable container. Ranked by value at risk (FR-31).

---

## Variants

- **with value** - Owner, Manager, Accountant see ৳ value (DD-2).
- **quantity only** - Supervisor and Sales rep see quantity + unit instead.
- **open to decide** - one outlined Open to decide button.

---

## States

**Required States:**

- default
- title focus
- decided (removed)

**Optional States:**

- self-raised
- needs internet
- already decided
- assigned
- error

**State Descriptions:**

**Self-raised:** notice "You raised this — another person must decide" (lock icon) instead of buttons.
**Needs internet:** decision buttons disabled with reason.
**Already decided:** notice; card leaves the list; focus moves to the next card.
**Assigned:** task-status-tag styling, person icon + name.

---

## Styling

### Visual Properties

**Size:** Title link min `{spacing.target-min}`.  
**Shape:** `{rounded.md}`.  
**Colors:** `{colors.surface}`, 1px `{colors.border}`; value `{colors.danger}`; title link `{colors.primary}` underline on hover/focus.  
**Typography:** Title `{typography.title}`; value `{typography.title}` tabular-nums; meta `{typography.meta}` / `{typography.meta-bn}`.  
**Spacing:** Padding `{spacing.4}`; `{spacing.2}` between rows.

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.issue-card`). Do not edit here; change DESIGN.md first.

```yaml
issue-card:
    background: '{colors.surface}'
    border: '1px solid {colors.border}'
    radius: '{rounded.md}'
    padding: '{spacing.4}'
    title-link-typography: '{typography.title}'
    title-link-min-height: '{spacing.target-min}'
    value-typography: '{typography.title}'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-issues-inbox.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-issues-inbox.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

Title opens Issue detail (S13). Decisions are one tap.

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** `<article>` in a `<ul>`; title is an `<a>` inside a heading; decisions are sibling buttons. Removal announced in polite region.

**Keyboard Support:** Tab: title link, then decision buttons.

**Screen Reader:** "Damage flag, Rice 25 kg, link" … value … meta.

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

Issue type terms from glossary; ৳ with lakh grouping; Western digits.

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Issues inbox, desk lists of Issues.

### When Not to Use

Tasks (task-card).

### Best Practices

- Never make the whole card tappable.

---

## Used In

**Pages:** 2

**Page IDs:** 03.1, 03.2

- [03.1-issues-inbox](../../C-UX-Scenarios/03-nasima-clears-the-inbox/03.1-issues-inbox/03.1-issues-inbox.md)
- [03.2-issue-detail](../../C-UX-Scenarios/03-nasima-clears-the-inbox/03.2-issue-detail/03.2-issue-detail.md)

---

## Related Components

- [Issue Decision Button [btn-007]](issue-decision-button.md) - actions
- [Task Status Tag [pil-002]](task-status-tag.md) - Assigned tag styling

---

## Open Questions

None.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.issue-card` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: crd-003
  name: Issue Card
  key: issue-card
  file: D-Design-System/components/issue-card.md
```

Variant explosion check (step-08d): 3 variants, within the recommended maximum of 5.
