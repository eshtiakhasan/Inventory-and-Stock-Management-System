# Design Tokens

**Last Updated:** 2026-10-24
**Token Count:** 92 (58 colors, 12 typography, 18 spacing, 4 radius) plus elevation and focus-ring definitions
**Source of truth:** [DESIGN.md frontmatter](../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md) (`colors`, `typography`, `rounded`, `spacing`, `components.focus-ring`). This file mirrors it exactly; it adds no values. If a value here and in DESIGN.md disagree, DESIGN.md wins and this file is wrong.
**Index:** [00-design-system.md](00-design-system.md)

Reference syntax used in component files: `{colors.primary}`, `{typography.body}`, `{spacing.target-min}`, `{rounded.md}`, `{components.focus-ring}` (the DESIGN.md names, unchanged). Light tokens have plain names; dark tokens add `-dark`. Implementation can map them 1:1 to CSS custom properties (`--colors-primary`) or a Tailwind theme later; no naming change is needed.

---

## Colors

Theme: **Jamdani Teal**, light and dark both ship in v1. Hex values come from `.working/color-themes-1.html` (`.t1-light`, `.t1-dark`) except tokens marked **‡**, which DESIGN.md derives (`control-border`, all `on-success` / `on-warning` / `on-danger` / `on-info`, `surface-disabled`, `text-disabled`, `scrim`, `state-unexplained-dark`). DESIGN.md marks the derived hexes [ASSUMPTION: confirm visually].

### Base Colors

| Token (light) | Light | Token (dark) | Dark | Use | Not for |
|---|---|---|---|---|---|
| `primary` | `#0B5A54` | `primary-dark` | `#63D5C6` | Scan bar, primary buttons, active nav, selected states, links, current-line bar, count badge | Stock states, decoration, the focus ring |
| `on-primary` | `#FFFFFF` | `on-primary-dark` | `#00211E` | Text and icons on `primary`; scan-overlay frame corners | — |
| `surface` | `#FFFFFF` | `surface-dark` | `#0E1716` | Page and card backgrounds; focus ring inner line | — |
| `surface-alt` | `#EDF4F2` | `surface-alt-dark` | `#18241F` | Grouped areas, side nav, queued chips, selected tiles and chips, hidden-during-count | — |
| `text` | `#0D1F1C` | `text-dark` | `#EAF4F1` | Body text; focus ring outer line | — |
| `text-muted` | `#3E524F` | `text-muted-dark` | `#AABFBA` | Secondary text, timestamps, inactive tabs, disabled reasons, draft tag | — |
| `border` | `#8FAAA5` | `border-dark` | `#3D524D` | Decorative dividers only (card edges, list hairlines, fixed-zone top edge) | Input, button or control outlines (fails 3:1) |
| `control-border` ‡ | `#6B8580` | `control-border-dark` ‡ | `#6B827C` | Outlines of inputs, quantity fields, secondary buttons, chips, checkboxes, tags; dashed edge of disabled controls | — |

### Semantic Colors

| Token (light) | Light | Token (dark) | Dark | Use | Not for |
|---|---|---|---|---|---|
| `success` | `#1B6E31` | `success-dark` | `#74D68C` | "Saved" toast (with check icon), verified count lines, online icon, Done tag | Stock state badges (use `state-available`) |
| `on-success` ‡ | `#FFFFFF` | `on-success-dark` ‡ | `#06210E` | Text on `success` | — |
| `warning` | `#8A4F00` | `warning-dark` | `#F4B65C` | Offline banner, queued actions (Not synced), low stock, offline toast | Errors, the Unexplained state |
| `on-warning` ‡ | `#FFFFFF` | `on-warning-dark` ‡ | `#2B1D00` | Text on `warning` | — |
| `danger` | `#A8231B` | `danger-dark` | `#FF8F85` | Flag damage, refusals, sync conflicts (Not applied), losses in taka, destructive confirms | Primary actions, the Scan bar |
| `on-danger` ‡ | `#FFFFFF` | `on-danger-dark` ‡ | `#300704` | Text on `danger` | — |
| `info` | `#1D5799` | `info-dark` | `#8DBBF2` | Neutral notices ("as of 10:42") | — |
| `on-info` ‡ | `#FFFFFF` | `on-info-dark` ‡ | `#071A33` | Text on `info` | — |

### Disabled and Overlay

| Token (light) | Light | Token (dark) | Dark | Use | Not for |
|---|---|---|---|---|---|
| `surface-disabled` ‡ | `#E4EBE9` | `surface-disabled-dark` ‡ | `#1E2A27` | Disabled button and field fill (with dashed `control-border` and a reason) | Anything a user can act on |
| `text-disabled` ‡ | `#4F625F` | `text-disabled-dark` ‡ | `#A3B5B1` | Disabled label text | Anything a user can act on |
| `scrim` ‡ | `#0D1F1C80` | `scrim-dark` ‡ | `#00000099` | Backdrop behind bottom sheets and dialogs (`#0D1F1C` at 50%) | — |

`scrim` = `text` at 50% alpha (`#0D1F1C80`); `scrim-dark` = black at 60% (`#00000099`). The Scan overlay uses `scrim-dark` in both themes (camera feed).

### Stock State Colors

Color is never the only signal: every state also has an icon, a text label and, for two states, a pattern.

| Token (light) | Light | Token (dark) | Dark | Use | Not for |
|---|---|---|---|---|---|
| `state-available` | `#1B6E31` | `state-available-dark` | `#74D68C` | Available pill / bar segment (check icon, solid) | Success messages |
| `on-state-available` | `#FFFFFF` | `on-state-available-dark` | `#06210E` | Text on Available | — |
| `state-reserved` | `#1D5799` | `state-reserved-dark` | `#8DBBF2` | Reserved pill / bar segment (diamond icon; dotted in bar) | — |
| `on-state-reserved` | `#FFFFFF` | `on-state-reserved-dark` | `#071A33` | Text on Reserved | — |
| `state-damaged` | `#A8231B` | `state-damaged-dark` | `#FF8F85` | Damaged pill / bar segment (cross icon, diagonal hatch) | — |
| `on-state-damaged` | `#FFFFFF` | `on-state-damaged-dark` | `#300704` | Text on Damaged | — |
| `state-in-transit` | `#5B3E96` | `state-in-transit-dark` | `#C4A8FF` | In transit pill (arrow-right icon, solid) | — |
| `on-state-in-transit` | `#FFFFFF` | `on-state-in-transit-dark` | `#1F0F45` | Text on In transit | — |
| `state-unexplained` | `#FFC94D` | `state-unexplained-dark` ‡ | `#F2D16B` | Unexplained pill (question icon, dashed inner outline always) | Warnings |
| `on-state-unexplained` | `#2B1D00` | `on-state-unexplained-dark` | `#2B1D00` | Text and dashed outline on Unexplained | — |

| State | Icon | Pattern |
|---|---|---|
| Available | check | solid |
| Reserved | diamond | solid (dotted in the stacked bar) |
| Damaged | cross | diagonal hatch `repeating-linear-gradient(135deg, fill 0 7px, mix(78% fill, 22% on-color) 7px 10px)`; on the pill only the leading 12px |
| In transit | arrow-right | solid |
| Unexplained | question | 2px dashed inner outline in the on-color, inset 4px, always (compact uses too) |

Dark Unexplained was moved from the theme's `#F4B65C` (same as `warning-dark`) to `#F2D16B` so it never looks like the offline banner. The two still differ mainly by hue (1.2:1 lightness), so Unexplained always adds icon and dashed outline, and `warning` never uses a filled pill.

### Contrast (WCAG 2.x)

From DESIGN.md → Colors → Contrast (computed there):

| Pair | Light | Dark | Target |
|---|---|---|---|
| `text` on `surface` | 17.1:1 | 16.2:1 | AAA |
| `text` on `surface-alt` | 15.3:1 | 14.3:1 | AAA |
| `text-muted` on `surface` | 8.3:1 | 9.4:1 | AAA |
| `text-muted` on `surface-alt` | 7.5:1 | 8.3:1 | AAA |
| `on-primary` on `primary` (Scan bar) | 8.1:1 | 9.6:1 | AAA |
| `primary` on `surface` (links) | 8.1:1 | 10.3:1 | ≥ 4.5:1 |
| `primary` on `surface-alt` (side nav) | 7.2:1 | 9.1:1 | ≥ 4.5:1 |
| `on-warning` on `warning` (offline banner) | 6.6:1 | 9.1:1 | AA |
| `warning` text on `surface-alt` (queued chip) | 5.9:1 | 8.9:1 | AA |
| `on-success` on `success` (toast) | 6.3:1 | 9.5:1 | AA |
| `on-danger` on `danger` | 7.2:1 | 8.2:1 | AAA |
| `danger` text on `surface` (refusal, flag button) | 7.2:1 | 8.3:1 | AAA |
| `text-disabled` on `surface-disabled` | 5.4:1 | 6.9:1 | legible (disabled is exempt; kept AA anyway) |
| `control-border` vs `surface-disabled` (dashed edge) | 3.3:1 | 3.6:1 | ≥ 3:1 |
| `border` vs `surface` | **2.5:1 FAIL** | **2.2:1 FAIL** | decorative only |
| `control-border` vs `surface` | 4.0:1 | 4.4:1 | ≥ 3:1 (WCAG 1.4.11) |
| `control-border` vs `surface-alt` | 3.6:1 | 3.9:1 | ≥ 3:1 |

Stock-state on-color contrast (DESIGN.md → Stock states): Available 6.3 / 9.5, Reserved 7.3 / 8.7, Damaged 7.2 / 8.2, In transit 8.2 / 8.6, Unexplained 10.7 / 11.0. Unexplained fill vs white `surface` is only 1.5:1, so the dashed outline is its visible edge in light mode; `state-unexplained-dark` vs `surface-dark` is 12.2:1.

Pairs used by components but **not listed in DESIGN.md** (computed during Phase 7 with the WCAG 2.x formula; informational, they change no value):

| Pair | Light | Dark | Used by |
|---|---|---|---|
| `success` text on `surface` | 6.3:1 | 10.2:1 | task-status-tag done |
| `warning` text on `surface` | 6.6:1 | 10.1:1 | task-status-tag not-synced |
| `info` text on `surface` | 7.3:1 | 9.1:1 | "as of" notices (04.1) |
| `on-info` on `info` | 7.3:1 | 8.7:1 | not used by any component yet |
| `danger` text on `surface-alt` | 6.4:1 | 7.3:1 | danger values inside selected tiles |

---

## Typography

### Font Family

One stack for both languages (every typography token uses it):

```yaml
fontFamily: 'system-ui, "Segoe UI", Roboto, "Noto Sans Bengali", "Nirmala UI", sans-serif'
```

Noto Sans Bengali is named so Bangla conjuncts render correctly on low-cost Android. Self-hosting it for offline use is an open architecture decision (DESIGN.md [ASSUMPTION]).

### Type Scale

All sizes in rem (1rem = 16px at default text size) so text follows the phone's text-size setting.

| Token | Size (px at default) | Weight | Line-height | Bangla allowed | Use |
|---|---|---|---|---|---|
| `qty-display` | 1.875rem (30px) | 800 | 1.1 | No (digits / ৳ only) | Digits only: quantity to pick, count or receive; Promisable total. Unit word beside it in `body-strong`. Never Bangla words. |
| `amount-hero` | 2rem (32px) | 700 | 1.2 | No (digits / ৳ only) | Digits and ৳ only: taka figures on the owner view. Never Bangla words. |
| `headline` | 1.25rem (20px) | 700 | 1.4 | Yes | Screen titles (`h1`), dialog titles, drill-down heading. |
| `title` | 1.0625rem (17px) | 700 | 1.45 | Yes | Card titles: Product name, Issue type; month selector; loss total row. |
| `body` | 1rem (16px) | 400 | 1.5 | Yes | All running text and field values. |
| `body-strong` | 1rem (16px) | 600 | 1.5 | Yes | Labels, tags, pills, chips, toasts, banners, emphasised values. |
| `label-button` | 1.125rem (18px) | 700 | 1.4 | Yes | Buttons; first (Bangla) line of a bilingual floor button; decision line of an Issue decision button. |
| `label-button-secondary` | 1rem (16px) | 600 | 1.4 | Yes | Second (English) line of a bilingual floor button. |
| `label-scan` | 1.5rem (24px) | 800 | 1.4 | Yes | Scan bar, Bangla part. |
| `label-scan-secondary` | 1.125rem (18px) | 600 | 1.4 | Yes | Scan bar, English part. |
| `meta` | 0.875rem (14px) | 500 | 1.4 | No (English and digits only) | English UI secondary text; digits, timestamps and IDs in either language. Never carries Bangla words. |
| `meta-bn` | 1rem (16px) | 500 | 1.5 | Yes | Secondary text whenever the UI language is Bangla. |

### Bangla Rules

- **Line-height:** every token that may carry Bangla has line-height ≥ 1.4; body text 1.5. Only `qty-display` and `amount-hero` go tighter, and they never hold Bangla words. [DESIGN.md ASSUMPTION: verify with real Bangla strings on a 360px phone.]
- **Never below 16px:** `meta` (14px) never carries Bangla words. In a Bangla UI, any secondary text uses `meta-bn`. Wherever a component says `meta`, read it as `meta` in English and `meta-bn` in Bangla.
- **Language display:** every string in the User's chosen language. Only the Scan bar and floor primary buttons show both, Bangla first.
- **Labels wrap, never clip:** min-height, no `overflow: hidden` on labels.
- **Western digits (0-9)** in both languages; quantities and money use `font-variant-numeric: tabular-nums`.
- **Weights:** 800 on floor numbers and the Scan bar (softened from 900 so Bangla glyphs do not clog).
- **No all-caps.**
- **Money:** ৳ sign with lakh-style grouping in both languages (৳12,45,000) (EXPERIENCE.md → Voice and Tone).

---

## Spacing

Scale 4 / 8 / 12 / 16 / 24 / 32 px plus named layout and target tokens. All values from DESIGN.md `spacing`.

| Token | Value | px | Use |
|---|---|---|---|
| `{spacing.1}` | 0.25rem | 4px | Tight gaps: icon-to-text, label above field. |
| `{spacing.2}` | 0.5rem | 8px | Gap between adjacent targets (minimum), between cards, quantity-entry row gaps; scroll-padding extra. |
| `{spacing.3}` | 0.75rem | 12px | Card padding (task-card), fixed bottom zone padding and row gaps, section gaps. |
| `{spacing.4}` | 1rem | 16px | Card padding (issue-card), dialog padding. |
| `{spacing.5}` | 1.5rem | 24px | Dialog top padding, larger section gaps. |
| `{spacing.6}` | 2rem | 32px | Largest layout gap. |
| `{spacing.gutter-phone}` | 1rem | 16px | Phone side gutter (16px); Scan bar width = full width minus 2 × gutter. |
| `{spacing.gutter-desktop}` | 1.5rem | 24px | Desktop side gutter (24px). |
| `{spacing.target-min}` | 3rem | 48px | Minimum size of every interactive element (48px): chips, links, banners, list rows, desk secondary buttons, input fields. |
| `{spacing.target-floor-secondary}` | 3.5rem | 56px | Floor secondary controls (56px): floor secondary buttons, floor chips, Use max. |
| `{spacing.target-floor}` | 4rem | 64px | Floor primary buttons, steppers, task cards, tab bar, decision buttons (64px). |
| `{spacing.button-desk}` | 3.5rem | 56px | Desk primary button min-height (56px). |
| `{spacing.scan-bar-height}` | 4.5rem | 72px | Scan bar min-height (72px). |
| `{spacing.scan-bar-height-compact}` | 3.5rem | 56px | Scan bar on short screens / large text (56px). |
| `{spacing.app-bar-height}` | 3.5rem | 56px | App bar min-height (56px). |
| `{spacing.app-bar-height-compact}` | 3rem | 48px | App bar on short screens (48px). |
| `{spacing.short-screen}` | 30rem | 480px | Viewport-height threshold (30rem ≈ 480 CSS px): below it only the compact Scan bar stays fixed. |
| `{spacing.tiny-screen}` | 20rem | 320px | Viewport-height threshold (20rem): below it nothing is fixed. |

Rules: every interactive element ≥ `{spacing.target-min}`; at least `{spacing.2}` between adjacent targets; use `min-height`, never fixed heights.

---

## Layout

### Breakpoints

DESIGN.md has **no breakpoint tokens**. The values used in the spines are prose, and EXPERIENCE.md marks them [ASSUMPTION]:

| Name | Range | Source |
|---|---|---|
| phone | 320–599px (360px design width) | EXPERIENCE.md → Responsive & Platform |
| tablet / small laptop | 600–1023px | EXPERIENCE.md → Responsive & Platform |
| desktop | ≥ 1024px | EXPERIENCE.md → Responsive & Platform |
| short screen | viewport height < `{spacing.short-screen}` or text ≥ 150% | DESIGN.md → Layout & Spacing |
| tiny screen | viewport height < `{spacing.tiny-screen}` | DESIGN.md → Layout & Spacing |

### Fixed sizes in DESIGN.md that are not spacing tokens

Listed so implementers do not invent alternatives; candidates for tokens (see index → Open Questions): side-nav width 13.75rem; stock-state-pill and task-status-tag min-height 2rem; count-badge min-size 1.5rem; quantity field min width 6rem; drill-down panel min width 22rem (prose); scan-overlay buttons min width 9rem (prose); bar widths 3px (tab), 4px (side nav, refusal), 5px (current line).

---

## Effects

### Border Radius

| Token | Value | Use |
|---|---|---|
| `{rounded.sm}` | 6px | Inputs, choice chips, status tags, sync-status chips, hidden-during-count. |
| `{rounded.md}` | 12px | Cards, buttons, toasts, quantity fields, viewfinder corners. |
| `{rounded.lg}` | 16px | Scan bar, sheet top corners, dialogs. |
| `{rounded.full}` | 9999px | Stock-state pills and the count badge only. |

Soft corners everywhere; no sharp-cornered surfaces, no pill-shaped buttons.

### Elevation

Calm and flat; hierarchy from tone and borders. DESIGN.md gives these as prose (approximate opacity), not tokens:

| Level | Light | Dark | Used by |
|---|---|---|---|
| card | 1px `border` and at most `0 1px 2px` at ~6% opacity | no shadow; raised things use `surface-alt-dark` | cards |
| floating | `0 6px 16px` at ~25% opacity | no shadow; `surface-alt-dark` | toast, bottom sheets, dialogs |
| fixed bottom zone | 1px `border` top edge, no shadow | same | Scan bar zone |

Sheets and dialogs sit over `{colors.scrim}`; the page behind is inert.

### Focus Ring

From `components.focus-ring`:

```yaml
inner: '2px {colors.surface} (dark: {colors.surface-dark})'
outer: '3px solid {colors.text} (dark: {colors.text-dark})'
selector: ':focus-visible'
```

One of the two lines is always ≥ 3:1 against whatever it touches: inner `surface` vs `primary` 8.1:1 / 10.3:1, vs `warning` 6.6:1 / 10.1:1, vs `danger` 7.2:1 / 8.3:1; outer `text` vs `surface` 17.1:1 / 16.2:1. It never uses `primary`. Component: [focus-ring.md](components/focus-ring.md).

### Transitions

No transition tokens. EXPERIENCE.md bans animations longer than 200ms and requires reduced-motion support (no slide-ins; toasts appear without animation).

---

## Component-Specific Tokens

Component token blocks live in each component file under **Design Tokens**, copied verbatim from DESIGN.md `components.<key>`. See the [component table](00-design-system.md#components).
