# Mojud Design System

**Project:** Mojud (E2E_IAM), stock-control PWA for Bangladeshi FMCG distributors
**Phase:** WDS 7, Design System (Create)
**Created:** 2026-10-24 · **Last Updated:** 2026-10-24
**Components:** 33 from DESIGN.md + 9 new = 42 · **Tokens:** 92 ([design-tokens.md](design-tokens.md))

---

## Purpose

One place for page specs, the catalog and the build to look up Mojud's tokens and components by name. It turns the DESIGN.md frontmatter (visual tokens and component styling) and EXPERIENCE.md (behaviour) into one file per component, with variants, states, accessibility, content rules and the pages that use it. Page specs in `C-UX-Scenarios/` can link here instead of to DESIGN.md.

## Mode

**Custom design system** (WDS Mode B, without Figma). No component library has been chosen (no shadcn, MUI or Radix), so there is no `component-library-config.md` and no `figma-mappings.md`. The visual references are the four BMAD mockups in `_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/`. Tokens use the DESIGN.md names (`{colors.primary}`, `{spacing.target-min}`) and map 1:1 to CSS custom properties or a Tailwind theme later.

## Source-of-truth rule

1. **Token values:** the [DESIGN.md frontmatter](../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md) is the single source of truth. This folder mirrors it exactly and never adds or changes a value. Each component file's **Design Tokens** block is copied verbatim from `components.<key>`.
2. **Behaviour:** [EXPERIENCE.md → Component Patterns](../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns), [State Patterns](../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#state-patterns) and [Accessibility Floor](../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#accessibility-floor).
3. **Cross-cutting decisions:** [00-design-decisions.md](../C-UX-Scenarios/00-design-decisions.md) (DD-1 to DD-10) wins over both spines where they disagree.
4. **To change a value:** edit DESIGN.md first (with a change-log line), then update this folder. A value that is needed here but missing from DESIGN.md goes under [Open Questions and token gaps](#open-questions-and-token-gaps); it is never invented. Anything marked [ASSUMPTION] in a component file is a proposal awaiting that decision.

## Naming conventions

- **Files:** `components/<key>.md`, where `<key>` is the DESIGN.md component key (e.g. [components/scan-bar.md](components/scan-bar.md)). New components use the same kebab-case style.
- **WDS IDs:** `<prefix>-<nnn>`, using the step-08b prefixes (`btn`, `inp`, `crd`, `drp`, `tgl`, `alt`, `bdg`, `txt`, `lst`, `tbl`, `frm`, `cnt`, `div`) plus the project prefixes `nav` (navigation), `bar` (app-bar, scan-bar, bottom-tab-bar), `tst` (toast), `pil` (pill / tag / chip), `sht` (sheet) and `dlg` (dialog). **001–099** are components seeded from DESIGN.md; **101+** are new Phase 7 components.
- **Token references:** `{colors.X}`, `{typography.X}`, `{spacing.X}`, `{rounded.X}`, `{components.X}`; dark values add `-dark`.
- **Variants:** lower-case kebab names inside a component (`floor`, `desk`, `money`). Specs reference them as component → variant, e.g. `quantity-entry` → `desk`.
- **Anchors for page specs:** `00-design-system.md#spacing-scale`, `#type-scale`, `#color-tokens`, `#components`, `#patterns`.

---

## Spacing Scale

Full table with usage: [design-tokens.md → Spacing](design-tokens.md#spacing).

| Token | Value | Token | Value |
|---|---|---|---|
| `{spacing.1}` | 0.25rem (4px) | `{spacing.target-min}` | 3rem (48px) |
| `{spacing.2}` | 0.5rem (8px) | `{spacing.target-floor-secondary}` | 3.5rem (56px) |
| `{spacing.3}` | 0.75rem (12px) | `{spacing.target-floor}` | 4rem (64px) |
| `{spacing.4}` | 1rem (16px) | `{spacing.button-desk}` | 3.5rem (56px) |
| `{spacing.5}` | 1.5rem (24px) | `{spacing.scan-bar-height}` / `{spacing.scan-bar-height-compact}` | 4.5rem (72px) / 3.5rem (56px) |
| `{spacing.6}` | 2rem (32px) | `{spacing.app-bar-height}` / `{spacing.app-bar-height-compact}` | 3.5rem (56px) / 3rem (48px) |
| `{spacing.gutter-phone}` | 1rem (16px) | `{spacing.short-screen}` | 30rem (viewport-height threshold) |
| `{spacing.gutter-desktop}` | 1.5rem (24px) | `{spacing.tiny-screen}` | 20rem (viewport-height threshold) |

## Type Scale

Full table and Bangla rules: [design-tokens.md → Typography](design-tokens.md#typography). All tokens share one font stack: `system-ui, "Segoe UI", Roboto, "Noto Sans Bengali", "Nirmala UI", sans-serif`.

| Token | Size / weight / line-height | Can carry Bangla |
|---|---|---|
| `qty-display` | 1.875rem (30px) / 800 / 1.1 | No (digits only) |
| `amount-hero` | 2rem (32px) / 700 / 1.2 | No (digits and ৳ only) |
| `headline` | 1.25rem (20px) / 700 / 1.4 | Yes |
| `title` | 1.0625rem (17px) / 700 / 1.45 | Yes |
| `body` / `body-strong` | 1rem (16px) / 400 or 600 / 1.5 | Yes |
| `label-button` | 1.125rem (18px) / 700 / 1.4 | Yes |
| `label-button-secondary` | 1rem (16px) / 600 / 1.4 | Yes |
| `label-scan` | 1.5rem (24px) / 800 / 1.4 | Yes |
| `label-scan-secondary` | 1.125rem (18px) / 600 / 1.4 | Yes |
| `meta` | 0.875rem (14px) / 500 / 1.4 | **No** (English, digits, timestamps, IDs) |
| `meta-bn` | 1rem (16px) / 500 / 1.5 | Yes (secondary text in a Bangla UI) |

## Color Tokens

Full light and dark tables, usage and contrast: [design-tokens.md → Colors](design-tokens.md#colors). Theme: **Jamdani Teal**.

| Group | Tokens |
|---|---|
| Base | `primary`, `on-primary`, `surface`, `surface-alt`, `text`, `text-muted`, `border` (decorative only; fails 3:1), `control-border` (every control outline) |
| Semantic | `success`, `warning`, `danger`, `info` and their `on-*` pairs |
| Disabled and overlay | `surface-disabled`, `text-disabled`, `scrim` |
| Stock states | `state-available`, `state-reserved`, `state-damaged`, `state-in-transit`, `state-unexplained` and their `on-state-*` pairs; always with icon and label (plus a pattern for Damaged and Unexplained) |
| Dark | every token above with a `-dark` suffix (29 pairs, 58 color tokens in all) |

---

## Components

### From DESIGN.md (33)

| Component key | WDS ID | Category | File | Used on pages |
|---|---|---|---|---|
| `app-bar` | bar-001 | Navigation | [app-bar.md](components/app-bar.md) | 01.1, 01.2, 01.4, 02.1, 03.1, 03.2, 04.1, 04.2, 05.1, 05.2, 05.3, 06.1, 07.1, 07.2, 07.3, 08.1, 08.2, 09.1, 09.2, 09.7, 10.1, 10.2, 10.3, 11.1 |
| `scan-bar` | bar-002 | Interactive | [scan-bar.md](components/scan-bar.md) | 01.1, 01.2, 02.1, 05.2, 05.3, 07.2, 08.2 |
| `bottom-tab-bar` | bar-003 | Navigation | [bottom-tab-bar.md](components/bottom-tab-bar.md) | 01.1, 03.1, 04.1, 04.2, 05.1, 06.1, 07.1, 07.2, 07.3, 08.1, 09.2, 09.7, 10.3 |
| `side-nav` | nav-001 | Navigation | [side-nav.md](components/side-nav.md) | 03.1, 04.1, 04.2, 05.1, 06.1, 07.1, 07.2, 07.3, 08.1, 09.2, 09.7, 10.3 |
| `month-selector` | nav-002 | Navigation | [month-selector.md](components/month-selector.md) | 04.1 |
| `count-badge` | bdg-001 | Content | [count-badge.md](components/count-badge.md) | 01.1, 03.1, 04.1, 07.1, 08.1 |
| `focus-ring` | div-001 | Interactive | [focus-ring.md](components/focus-ring.md) | 01.1, 01.2, 01.3, 01.4, 02.1, 02.2, 03.1, 03.2, 04.1, 04.2, 05.1, 05.2, 05.3, 06.1, 07.1, 07.2, 07.3, 08.1, 08.2, 09.1, 09.2, 09.3, 10.1, 10.2, 10.3, 11.1 |
| `scan-overlay` | dlg-001 | Feedback | [scan-overlay.md](components/scan-overlay.md) | 01.3, 02.2 |
| `confirmation-dialog` | dlg-002 | Feedback | [confirmation-dialog.md](components/confirmation-dialog.md) | 01.2, 02.1, 05.3, 07.2, 07.3, 08.1, 09.2, 09.3, 09.4, 09.5, 09.6, 09.7, 10.3, 11.1 |
| `bottom-sheet` | sht-001 | Feedback | [bottom-sheet.md](components/bottom-sheet.md) | 01.4, 02.2, 03.2, 06.1, 07.2 |
| `button-primary-floor` | btn-001 | Interactive | [button-primary-floor.md](components/button-primary-floor.md) | 01.2, 02.1, 05.2, 05.3, 08.2 |
| `button-primary` | btn-002 | Interactive | [button-primary.md](components/button-primary.md) | 03.2, 05.1, 05.3, 07.2, 07.3, 08.1, 09.1, 09.2, 09.3, 09.4, 09.5, 09.6, 09.7, 10.1, 10.2, 10.3, 11.1 |
| `button-secondary` | btn-003 | Interactive | [button-secondary.md](components/button-secondary.md) | 01.1, 01.2, 01.3, 02.1, 02.2, 03.1, 03.2, 04.1, 04.2, 05.1, 05.2, 05.3, 06.1, 07.1, 07.2, 07.3, 08.1, 08.2, 09.1, 09.2, 09.3, 09.4, 09.5, 09.6, 09.7, 10.1, 10.3, 11.1 |
| `button-flag-damage` | btn-004 | Interactive | [button-flag-damage.md](components/button-flag-damage.md) | 02.1, 07.2 |
| `button-danger` | btn-005 | Interactive | [button-danger.md](components/button-danger.md) | 02.2, 07.3, 09.2, 09.3, 09.4, 09.5, 09.6, 09.7, 11.1 |
| `button-disabled` | btn-006 | Interactive | [button-disabled.md](components/button-disabled.md) | 01.2, 02.1, 02.2, 03.1, 03.2, 05.2, 05.3, 07.2, 07.3, 08.1, 08.2, 09.1, 09.2, 09.3, 09.4, 09.5, 09.6, 09.7, 10.1, 10.2, 10.3, 11.1 |
| `issue-decision-button` | btn-007 | Interactive | [issue-decision-button.md](components/issue-decision-button.md) | 03.1, 03.2, 08.1 |
| `stock-state-pill` | pil-001 | Content | [stock-state-pill.md](components/stock-state-pill.md) | 02.1, 03.2, 04.1, 06.1, 07.1, 07.2, 07.3, 08.1, 09.4 |
| `stock-ladder` | crd-001 | Content | [stock-ladder.md](components/stock-ladder.md) | 07.2 |
| `hidden-during-count` | txt-001 | Content | [hidden-during-count.md](components/hidden-during-count.md) | 01.3, 04.2, 07.1, 07.2, 08.1, 08.2, 09.2 |
| `quantity-entry` | inp-001 | Form | [quantity-entry.md](components/quantity-entry.md) | 01.2, 02.1, 02.2, 05.2, 05.3, 07.3, 08.2 |
| `input-field` | inp-002 | Form | [input-field.md](components/input-field.md) | 01.3, 02.2, 03.2, 07.1, 07.2, 07.3, 08.1, 09.1, 09.2, 09.4, 09.5, 09.6, 09.7, 10.1, 10.2, 10.3, 11.1 |
| `choice-chip` | tgl-001 | Form | [choice-chip.md](components/choice-chip.md) | 02.2, 03.2, 04.2, 05.1, 05.2, 06.1, 07.2, 07.3, 08.1, 09.4, 09.5, 09.6, 09.7, 10.3 |
| `task-card` | crd-002 | Interactive | [task-card.md](components/task-card.md) | 01.1, 01.2, 01.4, 02.1, 05.1, 05.2, 05.3, 06.1, 08.2 |
| `task-status-tag` | pil-002 | Content | [task-status-tag.md](components/task-status-tag.md) | 01.1, 01.2, 02.1, 03.1, 04.1, 04.2, 05.1, 06.1, 07.2, 07.3, 08.1, 08.2, 09.2, 09.3, 09.4, 09.6, 09.7 |
| `sync-status-chip` | pil-003 | Feedback | [sync-status-chip.md](components/sync-status-chip.md) | 01.2, 01.4, 02.1, 05.1, 05.2, 05.3, 06.1, 08.2 |
| `offline-banner` | alt-001 | Feedback | [offline-banner.md](components/offline-banner.md) | 01.1, 01.2, 01.4, 02.1, 03.1, 04.1, 04.2, 05.1, 05.2, 05.3, 06.1, 07.1, 07.2, 07.3, 08.1, 08.2, 09.1, 09.2, 09.3, 09.7, 10.1, 10.2, 10.3, 11.1 |
| `confirmation-toast` | tst-001 | Feedback | [confirmation-toast.md](components/confirmation-toast.md) | 01.1, 01.2, 02.1, 02.2, 03.1, 03.2, 05.2, 05.3, 07.2, 07.3, 08.1, 08.2, 09.1, 09.2, 09.3, 09.4, 09.5, 09.6, 09.7, 10.2, 10.3 |
| `refusal-message` | alt-002 | Feedback | [refusal-message.md](components/refusal-message.md) | 02.1, 02.2, 03.1, 03.2, 05.2, 07.2, 07.3, 09.1, 09.2, 09.3, 09.4, 09.5, 09.6, 09.7, 10.1, 10.2, 11.1 |
| `issue-card` | crd-003 | Content | [issue-card.md](components/issue-card.md) | 03.1, 03.2 |
| `owner-metric-tile` | crd-004 | Interactive | [owner-metric-tile.md](components/owner-metric-tile.md) | 03.1, 04.1 |
| `loss-row` | lst-001 | Interactive | [loss-row.md](components/loss-row.md) | 04.1 |
| `drill-down-panel` | cnt-001 | Layout | [drill-down-panel.md](components/drill-down-panel.md) | 04.1, 09.2, 09.7 |

Page IDs come from a search of the page specs in `C-UX-Scenarios/` for each component key (for `hidden-during-count`, the phrase "Hidden during count"). Each component file links the pages.

### New in Phase 7 (9)

These are specified in separate files (step-08b; duplicate detection found no existing match). Their WDS IDs start at 101. Page IDs are taken from the page-spec open questions that requested each component; the component file is authoritative.

| Component key | WDS ID | Category | File | Used on pages |
|---|---|---|---|---|
| `data-table` | tbl-101 | Content | [data-table.md](components/data-table.md) | 08.1, 09.2, 09.4, 09.5, 09.6, 09.7 |
| `combobox` | drp-101 | Form | [combobox.md](components/combobox.md) | 03.2, 07.1, 09.7 |
| `section-nav` | nav-101 | Navigation | [section-nav.md](components/section-nav.md) | 05.1, 07.3, 09.2, 09.3, 09.4, 09.5, 09.6, 10.3 |
| `setup-checklist` | lst-101 | Content | [setup-checklist.md](components/setup-checklist.md) | 04.1, 09.2 |
| `form-error-summary` | alt-101 | Feedback | [form-error-summary.md](components/form-error-summary.md) | 09.1, 09.2, 09.4, 09.5, 09.6, 09.7 |
| `recovery-code` | txt-101 | Content | [recovery-code.md](components/recovery-code.md) | 09.1, 09.6, 10.3, 11.1 |
| `file-upload` | inp-101 | Form | [file-upload.md](components/file-upload.md) | 09.3 |
| `step-card` | crd-101 | Content | [step-card.md](components/step-card.md) | 09.3 |
| `line-item-editor` | frm-101 | Form | [line-item-editor.md](components/line-item-editor.md) | 07.3, 08.1, 09.7 |

| Component key | WDS ID | What it is |
|---|---|---|
| `data-table` | tbl-101 | Settings list / desk data table that becomes stacked rows on phone |
| `combobox` | drp-101 | Searchable select (Supplier picker, Assign to…) |
| `section-nav` | nav-101 | Secondary navigation (Settings section links). Orders and Transfers segments use the `choice-chip` desk group |
| `setup-checklist` | lst-101 | First-use setup steps and setup strip |
| `form-error-summary` | alt-101 | Form-level error summary built from refusal-message tokens |
| `recovery-code` | txt-101 | Grouped, selectable recovery code / temporary password display |
| `file-upload` | inp-101 | File picker button + optional drop zone (Excel import) |
| `step-card` | crd-101 | Numbered import step card with status, download and upload |
| `line-item-editor` | frm-101 | Line items: table on desktop, cards on phone (PO, Dispatch order, count Products) |

### Variants added by duplicate detection (step-08d)

| Component | Variant | Why it is a variant, not a new component | Pages |
|---|---|---|---|
| [input-field](components/input-field.md) | `money` (৳ prefix, lakh grouping on blur, tabular-nums) | Same border, focus, error, radius and type tokens | 09.4, 09.7 |
| [input-field](components/input-field.md) | `date` (native picker, dd/MM/yyyy, Western digits) | Same tokens | 07.2, 07.3, 09.7 |
| [input-field](components/input-field.md) | `multiline` (text area, min 3 lines, grows) | Same tokens | 03.2, 09.5 |
| [quantity-entry](components/quantity-entry.md) | `desk` (48px fields, no 64px steppers, side by side at ≥ 600px) | Same carton/piece model, roll-over and refusal rules as `floor` | 09.4, 09.7 |

[task-status-tag](components/task-status-tag.md) includes the `draft` variant from DD-5. [hidden-during-count](components/hidden-during-count.md) is the DD-7 addition.

DESIGN.md prose also describes a **Language switch**, a **Product search field**, a **Flag damage sheet** and an **Issue detail** layout, none of which has a frontmatter key. The Product search field is documented as `input-field` → `search`, the Flag damage sheet under [bottom-sheet](components/bottom-sheet.md), and Issue detail under [issue-card](components/issue-card.md). The Language switch is an open question below.

---

## Patterns

Patterns that span several components. Behaviour details live in EXPERIENCE.md; token values live in DESIGN.md.

### Fixed bottom zone

On floor screens the main actions sit in a zone fixed to the bottom of the screen, and the content scrolls above it.

| Screen type | Fixed rows |
|---|---|
| Task and stock screens (S6–S11) | Optional [Flag damage button](components/button-flag-damage.md) (`{spacing.target-floor}`) + [Scan bar](components/scan-bar.md) (`{spacing.scan-bar-height}`) |
| Floor-role home (My tasks, for Warehouse workers and Supervisors) | Scan bar + [bottom tab bar](components/bottom-tab-bar.md) |
| Desk-role home (Issues inbox, Owner view, Sales rep Product search) | Bottom tab bar only; no Scan bar (DD-4) |

The zone has `{spacing.3}` padding, a 1px `{colors.border}` top edge and no shadow. On short screens (shorter than `{spacing.short-screen}`, or text at 150% or more) only the compact Scan bar stays fixed and the other rows move to the end of the content. Below `{spacing.tiny-screen}` nothing is fixed. Pages set `scroll-padding-bottom` to the zone height + `{spacing.2}`, so focus is never hidden behind the zone. Toasts float above it.

### Blind screen

Receive PO (S7), Receive Transfer (S10 receive) and Count lines (S11) never show expected, ordered, sent or system quantities: not on screen, in the page code, in `aria-*` attributes, in hidden text or in the confirm dialog. [Quantity entry](components/quantity-entry.md) starts empty, [task cards](components/task-card.md) show only the worker's own count, and the [confirmation dialog](components/confirmation-dialog.md) counts lines, never quantities. While a count is open, assigned counters see [Hidden during count](components/hidden-during-count.md) in place of stock figures (DD-7).

### Bilingual floor buttons

Only the [Scan bar](components/scan-bar.md) and the floor primary buttons show Bangla and English together, Bangla first. The floor primary buttons are [button-primary-floor](components/button-primary-floor.md), [button-flag-damage](components/button-flag-damage.md), the Flag damage sheet's [button-danger](components/button-danger.md), and the confirm button of a dialog on a floor screen. They use `label-button` + `label-button-secondary` (the Scan bar uses `label-scan` + `label-scan-secondary`). Each part is wrapped in `<span lang="bn">` or `<span lang="en">`, and the accessible name comes from the visible text, never from `aria-label`. Everything else is in the User's chosen language only.

### Offline and sync

- The [app bar](components/app-bar.md) shows "Online" or "Offline" as icon + text.
- The [offline banner](components/offline-banner.md) sits under the app bar with the queue count. It has syncing, 20 h warning and 24 h paused variants.
- Floor actions work offline and queue. The [toast](components/confirmation-toast.md) then reads "Saved on phone, will sync" on `warning`.
- Queued lines carry a [sync status chip](components/sync-status-chip.md). A line the server refuses becomes "Not applied – sent to supervisor".
- Actions that need internet (deciding Issues, settings, creating orders) use [button-disabled](components/button-disabled.md) with "Needs internet".
- Stock figures read "as of HH:MM (offline)". Queued actions stay with their author after sign-out (DD-8).

### Role-based visibility

- Actions outside a Role are **hidden**, not disabled. Deep links to a hidden screen show "You don't have access to this."
- Taka values appear only for the Owner, Manager and Accountant. Supervisors and Sales reps see quantity and unit instead ([issue-card](components/issue-card.md), DD-2).
- Each Role has its own tabs, five at most ([bottom tab bar](components/bottom-tab-bar.md), DD-9). Floor roles get the Scan bar on their home screen; desk roles do not (DD-4).
- Segregation of duties (FR-5): a self-raised Issue shows a notice instead of decision buttons, and the sender of a Transfer cannot receive it.
- The blind-count restriction is enforced by the server, not only hidden in the UI (DD-7).

### List + detail desk layout

At 1024px and wider, desk surfaces (Owner view, Issues, Stock counts, POs, Settings) use the [side nav](components/side-nav.md) plus a list and a detail pane. The detail pane follows the [drill-down panel](components/drill-down-panel.md): a right-hand panel with a 1px `{colors.border}` left edge on desktop, below the list on tablet (600–1023px), and its own full-screen page on phone. Opening it moves focus to the pane heading; Close or Back returns focus to the row. After a decision, focus stays in the list and the removal is announced. Lists use the [data table](components/data-table.md) on desk and stacked rows on phone.

---

## Open Questions and token gaps

These are values a component needs that DESIGN.md does not define. None were invented; the component files mark proposals [ASSUMPTION].

1. **Breakpoints:** 600px and 1024px are prose, marked [ASSUMPTION] in EXPERIENCE.md. There are no breakpoint tokens.
2. **Elevation:** prose with approximate opacities (~6%, ~25%). There are no shadow tokens.
3. **Sizes that are not tokens:** side-nav width 13.75rem; pill and tag min-height 2rem; count-badge 1.5rem; quantity field min width 6rem; drill-down min width 22rem and scan-overlay button min width 9rem (both prose only); indicator bars of 3, 4 and 5px.
4. **Missing typography assignments:** tab-bar and side-nav labels, input labels, sheet headings, and the digits of the desk `quantity-entry` (floor `qty-display` is too heavy for desk screens).
5. **Missing padding values:** buttons, pills, tags, chips, input fields, offline banner, toast, metric tile and ladder card.
6. **No component keys** for the Language switch, the Product search field and the password show/hide toggle (all prose only). The Language switch needs a key (proposed: `language-switch`, `tgl-002`). Its selection style (`primary` fill) also differs from `choice-chip` (`surface-alt` fill + `primary` border).
7. **`button-danger` height:** min `{spacing.target-floor}` (64px) everywhere, while the desk `button-primary` is `{spacing.button-desk}` (56px). The two buttons in a desk danger dialog would not match.
8. **`button-disabled`** has no size, radius or typography of its own. This system assumes it inherits them from the host button; confirm.
9. **`button-flag-damage`** lists only `label-button`. The English half of its bilingual label presumably uses `label-button-secondary`.
10. **`button-secondary`** at 64px in the Scan overlay is a third height that its frontmatter does not list.
11. **Scan overlay hint text color** on the `scrim-dark` strip (normal mode) is not specified.
12. **Gaps in the contrast table:** `success`, `warning` and `info` text on `surface`, `on-info` on `info`, and `danger` on `surface-alt` are not in DESIGN.md. The values computed in [design-tokens.md](design-tokens.md#contrast-wcag-2x) all pass AA.
13. **`primary` on `surface-alt` (dark):** DESIGN.md gives 9.1:1; recomputing gives 9.0:1 (a rounding difference only).
14. **`input-field` now has 6 variants,** one more than step-08d's recommended maximum of 5. Splitting out `multiline` is an option.
15. **`refusal-message`** has no icon and relies on the bar and the text. The text names the problem, so color is not the only signal.
16. **Desk money input:** DESIGN.md does not say whether Unit cost accepts decimals (paisa).

---

## Changelog

| Date | Change |
|---|---|
| 2026-10-24 | Created from DESIGN.md: frontmatter `colors`, `typography`, `rounded`, `spacing` and `components`, plus the 2026-10-24 change log (DD-4; DD-5 `draft` tag; DD-7 `hidden-during-count`; DD-9 five tabs). Adds 33 component files, design-tokens.md and this index. Variants added: `input-field` → `money`, `date`, `multiline`; `quantity-entry` → `desk`. Registers the 9 new components (tbl-101 to frm-101). |
