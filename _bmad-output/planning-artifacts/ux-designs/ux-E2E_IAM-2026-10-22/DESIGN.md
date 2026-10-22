---
name: Mojud
description: Stock-control PWA for Bangladeshi FMCG distributors. Calm, professional, high-contrast; Bangla or English per User; big and bold where the warehouse floor needs it.
status: final
created: 2026-10-22
updated: 2026-10-23
sources:
  - _bmad-output/planning-artifacts/prds/prd-E2E_IAM-2026-10-22/prd.md
  - _bmad-output/planning-artifacts/prds/prd-E2E_IAM-2026-10-22/addendum.md
  - _bmad-output/planning-artifacts/briefs/brief-E2E_IAM-2026-10-22/brief.md
  - .memlog.md
  - .working/color-themes-1.html
  - .working/directions-1.html
colors:
  # Jamdani Teal - LIGHT (theme values from .working/color-themes-1.html .t1-light; derived tokens noted in Colors)
  primary: '#0B5A54'
  on-primary: '#FFFFFF'
  surface: '#FFFFFF'
  surface-alt: '#EDF4F2'
  text: '#0D1F1C'
  text-muted: '#3E524F'
  border: '#8FAAA5'
  control-border: '#6B8580'
  success: '#1B6E31'
  on-success: '#FFFFFF'
  warning: '#8A4F00'
  on-warning: '#FFFFFF'
  danger: '#A8231B'
  on-danger: '#FFFFFF'
  info: '#1D5799'
  on-info: '#FFFFFF'
  surface-disabled: '#E4EBE9'
  text-disabled: '#4F625F'
  scrim: '#0D1F1C80'
  state-available: '#1B6E31'
  on-state-available: '#FFFFFF'
  state-reserved: '#1D5799'
  on-state-reserved: '#FFFFFF'
  state-damaged: '#A8231B'
  on-state-damaged: '#FFFFFF'
  state-in-transit: '#5B3E96'
  on-state-in-transit: '#FFFFFF'
  state-unexplained: '#FFC94D'
  on-state-unexplained: '#2B1D00'
  # Jamdani Teal - DARK (theme values from .working/color-themes-1.html .t1-dark; derived tokens noted in Colors)
  primary-dark: '#63D5C6'
  on-primary-dark: '#00211E'
  surface-dark: '#0E1716'
  surface-alt-dark: '#18241F'
  text-dark: '#EAF4F1'
  text-muted-dark: '#AABFBA'
  border-dark: '#3D524D'
  control-border-dark: '#6B827C'
  success-dark: '#74D68C'
  on-success-dark: '#06210E'
  warning-dark: '#F4B65C'
  on-warning-dark: '#2B1D00'
  danger-dark: '#FF8F85'
  on-danger-dark: '#300704'
  info-dark: '#8DBBF2'
  on-info-dark: '#071A33'
  surface-disabled-dark: '#1E2A27'
  text-disabled-dark: '#A3B5B1'
  scrim-dark: '#00000099'
  state-available-dark: '#74D68C'
  on-state-available-dark: '#06210E'
  state-reserved-dark: '#8DBBF2'
  on-state-reserved-dark: '#071A33'
  state-damaged-dark: '#FF8F85'
  on-state-damaged-dark: '#300704'
  state-in-transit-dark: '#C4A8FF'
  on-state-in-transit-dark: '#1F0F45'
  state-unexplained-dark: '#F2D16B'
  on-state-unexplained-dark: '#2B1D00'
typography:
  # One stack for both languages. Noto Sans Bengali is listed so Bangla conjuncts render correctly on low-cost Android.
  # All sizes in rem (1rem = 16px at default text size) so they follow the phone's text-size setting.
  qty-display:
    fontFamily: 'system-ui, "Segoe UI", Roboto, "Noto Sans Bengali", "Nirmala UI", sans-serif'
    fontSize: 1.875rem
    fontWeight: 800
    lineHeight: 1.1
  amount-hero:
    fontFamily: 'system-ui, "Segoe UI", Roboto, "Noto Sans Bengali", "Nirmala UI", sans-serif'
    fontSize: 2rem
    fontWeight: 700
    lineHeight: 1.2
  headline:
    fontFamily: 'system-ui, "Segoe UI", Roboto, "Noto Sans Bengali", "Nirmala UI", sans-serif'
    fontSize: 1.25rem
    fontWeight: 700
    lineHeight: 1.4
  title:
    fontFamily: 'system-ui, "Segoe UI", Roboto, "Noto Sans Bengali", "Nirmala UI", sans-serif'
    fontSize: 1.0625rem
    fontWeight: 700
    lineHeight: 1.45
  body:
    fontFamily: 'system-ui, "Segoe UI", Roboto, "Noto Sans Bengali", "Nirmala UI", sans-serif'
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  body-strong:
    fontFamily: 'system-ui, "Segoe UI", Roboto, "Noto Sans Bengali", "Nirmala UI", sans-serif'
    fontSize: 1rem
    fontWeight: 600
    lineHeight: 1.5
  label-button:
    fontFamily: 'system-ui, "Segoe UI", Roboto, "Noto Sans Bengali", "Nirmala UI", sans-serif'
    fontSize: 1.125rem
    fontWeight: 700
    lineHeight: 1.4
  label-button-secondary:
    fontFamily: 'system-ui, "Segoe UI", Roboto, "Noto Sans Bengali", "Nirmala UI", sans-serif'
    fontSize: 1rem
    fontWeight: 600
    lineHeight: 1.4
  label-scan:
    fontFamily: 'system-ui, "Segoe UI", Roboto, "Noto Sans Bengali", "Nirmala UI", sans-serif'
    fontSize: 1.5rem
    fontWeight: 800
    lineHeight: 1.4
  label-scan-secondary:
    fontFamily: 'system-ui, "Segoe UI", Roboto, "Noto Sans Bengali", "Nirmala UI", sans-serif'
    fontSize: 1.125rem
    fontWeight: 600
    lineHeight: 1.4
  meta:
    # English UI only, and digits / timestamps / IDs in either language. Never carries Bangla words.
    fontFamily: 'system-ui, "Segoe UI", Roboto, "Noto Sans Bengali", "Nirmala UI", sans-serif'
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.4
  meta-bn:
    # Secondary text whenever the UI language is Bangla.
    fontFamily: 'system-ui, "Segoe UI", Roboto, "Noto Sans Bengali", "Nirmala UI", sans-serif'
    fontSize: 1rem
    fontWeight: 500
    lineHeight: 1.5
rounded:
  sm: 6px
  md: 12px
  lg: 16px
  full: 9999px
spacing:
  '1': 0.25rem
  '2': 0.5rem
  '3': 0.75rem
  '4': 1rem
  '5': 1.5rem
  '6': 2rem
  gutter-phone: 1rem
  gutter-desktop: 1.5rem
  target-min: 3rem
  target-floor-secondary: 3.5rem
  target-floor: 4rem
  button-desk: 3.5rem
  scan-bar-height: 4.5rem
  scan-bar-height-compact: 3.5rem
  app-bar-height: 3.5rem
  app-bar-height-compact: 3rem
  short-screen: 30rem
  tiny-screen: 20rem
components:
  # Rule: {spacing.target-min} applies to every interactive element, including chips, links, banners, tags that act, and list rows.
  # Buttons and bars use min-height, never a fixed height, and never overflow: hidden on a label.
  app-bar:
    background: '{colors.surface}'
    border-bottom: '1px {colors.border}'
    min-height: '{spacing.app-bar-height}'
    title-typography: '{typography.headline}'
    user-typography: '{typography.body}'
    status-online: 'icon cloud-check + text "Online", {colors.success} icon, {colors.text} text'
    status-offline: 'icon cloud-off + text "Offline", {colors.warning} icon, {colors.text} text'
  scan-bar:
    background: '{colors.primary}'
    text: '{colors.on-primary}'
    typography: '{typography.label-scan}'
    secondary-typography: '{typography.label-scan-secondary}'
    min-height: '{spacing.scan-bar-height}'
    compact-min-height: '{spacing.scan-bar-height-compact}'
    radius: '{rounded.lg}'
    width: 'full width minus 2 x {spacing.gutter-phone}'
  scan-overlay:
    background: camera feed, edges under '{colors.scrim-dark}'
    frame: '3px {colors.on-primary} corners, {rounded.md}'
    header-typography: '{typography.label-button}'
    flag-mode-header: '{colors.danger} fill, {colors.on-danger} text, icon warning'
    action-bar: '{colors.surface} fill, two buttons at {spacing.target-floor}'
  button-primary-floor:
    background: '{colors.primary}'
    text: '{colors.on-primary}'
    typography: '{typography.label-button}'
    secondary-typography: '{typography.label-button-secondary}'
    min-height: '{spacing.target-floor}'
    radius: '{rounded.md}'
  button-primary:
    background: '{colors.primary}'
    text: '{colors.on-primary}'
    typography: '{typography.label-button}'
    min-height: '{spacing.button-desk}'
    radius: '{rounded.md}'
  button-secondary:
    background: '{colors.surface}'
    text: '{colors.primary}'
    border: '2px solid {colors.control-border}'
    typography: '{typography.label-button}'
    min-height: '{spacing.target-min}'
    floor-min-height: '{spacing.target-floor-secondary}'
    radius: '{rounded.md}'
  button-flag-damage:
    background: '{colors.surface}'
    text: '{colors.danger}'
    border: '2px solid {colors.danger}'
    typography: '{typography.label-button}'
    min-height: '{spacing.target-floor}'
    radius: '{rounded.md}'
  button-danger:
    background: '{colors.danger}'
    text: '{colors.on-danger}'
    typography: '{typography.label-button}'
    min-height: '{spacing.target-floor}'
    radius: '{rounded.md}'
  button-disabled:
    background: '{colors.surface-disabled}'
    text: '{colors.text-disabled}'
    border: '2px dashed {colors.control-border}'
    icon: 'lock or cloud-off'
    reason-text: '{typography.body} in {colors.text-muted}, visible next to the button'
  issue-decision-button:
    min-height: '{spacing.target-floor}'
    radius: '{rounded.md}'
    label-typography: '{typography.label-button}'
    effect-typography: '{typography.body}'
    recommended: '{colors.primary} fill, {colors.on-primary} text'
    alternative: '{colors.surface} fill, {colors.text} text, 2px {colors.control-border}'
  stock-state-pill:
    radius: '{rounded.full}'
    typography: '{typography.body-strong}'
    min-height: 2rem
    available: '{colors.state-available} / {colors.on-state-available}, icon check, solid'
    reserved: '{colors.state-reserved} / {colors.on-state-reserved}, icon diamond, solid'
    damaged: '{colors.state-damaged} / {colors.on-state-damaged}, icon cross, hatch on leading 12px only'
    in-transit: '{colors.state-in-transit} / {colors.on-state-in-transit}, icon arrow-right, solid'
    unexplained: '{colors.state-unexplained} / {colors.on-state-unexplained}, icon question, 2px dashed inner outline (always)'
  stock-ladder:
    background: '{colors.surface}'
    row-typography: '{typography.body}'
    total-typography: '{typography.qty-display}'
    divider: '1px {colors.border}'
    radius: '{rounded.md}'
    row-min-height: '{spacing.target-min}'
    bar: 'decorative (aria-hidden), 2px {colors.surface} gap between segments, Reserved dotted, Damaged hatched'
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
  input-field:
    min-height: '{spacing.target-min}'
    border: '1px solid {colors.control-border}'
    focus-border: '2px solid {colors.primary}'
    error-border: '2px solid {colors.danger}'
    radius: '{rounded.sm}'
    typography: '{typography.body}'
  choice-chip:
    min-height: '{spacing.target-min}'
    floor-min-height: '{spacing.target-floor-secondary}'
    border: '2px solid {colors.control-border}'
    selected: '{colors.surface-alt} fill, 2px {colors.primary} border, icon check'
    radius: '{rounded.sm}'
    typography: '{typography.body-strong}'
  task-card:
    background: '{colors.surface}'
    border: '1px solid {colors.border}'
    current-indicator: '5px left bar {colors.primary}'
    radius: '{rounded.md}'
    padding: '{spacing.3}'
    min-height: '{spacing.target-floor}'
  task-status-tag:
    border: '2px solid {colors.control-border}'
    text: '{colors.text}'
    typography: '{typography.body-strong}'
    radius: '{rounded.sm}'
    min-height: 2rem
    not-synced: '{colors.warning} text, 2px dashed {colors.warning}, icon hourglass'
    done: '{colors.success} text, 2px solid {colors.success}, icon check'
  issue-card:
    background: '{colors.surface}'
    border: '1px solid {colors.border}'
    radius: '{rounded.md}'
    padding: '{spacing.4}'
    title-link-typography: '{typography.title}'
    title-link-min-height: '{spacing.target-min}'
    value-typography: '{typography.title}'
  offline-banner:
    background: '{colors.warning}'
    text: '{colors.on-warning}'
    typography: '{typography.body-strong}'
    min-height: '{spacing.target-min}'
    icon: cloud-off
  sync-status-chip:
    queued: '{colors.surface-alt} fill, {colors.warning} text, 2px dashed {colors.warning}, icon hourglass'
    not-applied: '{colors.surface} fill, {colors.danger} text, 2px solid {colors.danger}, icon alert'
    radius: '{rounded.sm}'
    typography: '{typography.body-strong}'
    min-height: '{spacing.target-min}'
  confirmation-toast:
    background: '{colors.success}'
    text: '{colors.on-success}'
    offline-background: '{colors.warning}'
    offline-text: '{colors.on-warning}'
    typography: '{typography.body-strong}'
    radius: '{rounded.md}'
    action: 'text button, {colors.on-success} / {colors.on-warning} underlined label, min-height {spacing.target-min}'
  confirmation-dialog:
    background: '{colors.surface}'
    backdrop: '{colors.scrim}'
    radius: '{rounded.lg}'
    title-typography: '{typography.headline}'
    body-typography: '{typography.body}'
    confirm: '{components.button-primary} (or {components.button-danger} when the action removes or cancels)'
    go-back: '{components.button-secondary}'
  bottom-sheet:
    background: '{colors.surface}'
    backdrop: '{colors.scrim}'
    radius: '{rounded.lg} top corners'
    close-button: '{spacing.target-min}'
  refusal-message:
    background: '{colors.surface}'
    text: '{colors.danger}'
    border-left: '4px solid {colors.danger}'
    typography: '{typography.body-strong}'
    use-max-button: '{components.button-secondary} at {spacing.target-floor-secondary}'
  owner-metric-tile:
    background: '{colors.surface}'
    border: '1px solid {colors.border}'
    value-typography: '{typography.amount-hero}'
    label-typography: '{typography.body-strong}'
    radius: '{rounded.md}'
    min-height: '{spacing.target-floor}'
    selected: '2px {colors.primary} border, {colors.surface-alt} fill, text tag "Showing" with icon chevron-right'
  loss-row:
    min-height: '{spacing.target-min}'
    label-typography: '{typography.body}'
    value-typography: '{typography.body-strong}'
    value-color: '{colors.danger}'
    divider: '1px {colors.border}'
  month-selector:
    arrow-buttons: '{spacing.target-min} square, 2px {colors.control-border}'
    label-typography: '{typography.title}'
  drill-down-panel:
    background: '{colors.surface}'
    border-left: '1px {colors.border} (desktop)'
    row-min-height: '{spacing.target-floor}'
    heading-typography: '{typography.headline}'
  count-badge:
    background: '{colors.primary}'
    text: '{colors.on-primary}'
    typography: '{typography.meta}'
    radius: '{rounded.full}'
    min-size: 1.5rem
  bottom-tab-bar:
    background: '{colors.surface}'
    min-height: '{spacing.target-floor}'
    active: '{colors.primary} text + 3px top bar + filled icon'
    inactive: '{colors.text-muted}, outline icon'
  side-nav:
    background: '{colors.surface-alt}'
    active: '{colors.primary} text, {colors.surface} fill, 4px left bar'
    width: 13.75rem
  focus-ring:
    inner: '2px {colors.surface} (dark: {colors.surface-dark})'
    outer: '3px solid {colors.text} (dark: {colors.text-dark})'
    selector: ':focus-visible'
---

# Mojud — Design Spine

> Visual identity. Behavior lives in `EXPERIENCE.md`. The source sketches for this spine are `.working/color-themes-1.html` and `.working/directions-1.html`.
>
> Spines win on conflict with mocks in .working/ or mockups/.

## Brand & Style

Mojud is a serious business tool that a distributor owner is proud to hand to staff: **clean, modern, professional, trustworthy** (memlog). The direction is a **hybrid**: the whole product follows *Calm Professional* (white app bars, quiet cards, one teal accent kept for the next action, balanced density), and the warehouse-floor screens borrow two things from *Big & Bold Floor*: a large fixed bottom **Scan bar** and **big quantity numbers** (`.working/directions-1.html`, sections 1 and 2; memlog). The directions mock's own palette and its Bangla-digit prose are overridden by the memlog.

The theme is **Jamdani Teal**: a deep green-teal that reads as steady and trustworthy, rooted in a Bangladeshi textile reference (memlog). Light and dark both ship in v1, because some warehouses are dim (memlog).

Bangla and English are equal citizens. Each User sees the whole interface in the language they chose. Only the Scan bar and floor primary buttons show Bangla and English together (memlog decision; see Typography → Language display). Bangla is never a smaller, lighter afterthought.

## Colors

Hex values are taken exactly from `.working/color-themes-1.html` (`.t1-light`, `.t1-dark`), except these **derived** tokens, which are not in the theme file: `control-border`, all `on-success` / `on-warning` / `on-danger` / `on-info`, `surface-disabled`, `text-disabled`, `scrim`, and `state-unexplained-dark` (all with their `-dark` pairs where they exist). Light tokens have plain names; dark tokens add `-dark`.

| Role | Light | Dark | Use | Not for |
|---|---|---|---|---|
| `primary` | `#0B5A54` | `#63D5C6` | Scan bar, primary buttons, active nav, selected states, links | Stock states, decoration, the focus ring |
| `surface` / `surface-alt` | `#FFFFFF` / `#EDF4F2` | `#0E1716` / `#18241F` | Page and card backgrounds; `surface-alt` for grouped areas, side nav, queued chips, selected tiles | — |
| `text` / `text-muted` | `#0D1F1C` / `#3E524F` | `#EAF4F1` / `#AABFBA` | Body text / secondary text, timestamps; `text` is also the focus ring's outer line | — |
| `border` | `#8FAAA5` | `#3D524D` | **Decorative dividers only** (card edges, list hairlines) | Input, button or control outlines — fails 3:1 |
| `control-border` | `#6B8580` | `#6B827C` | Outlines of inputs, quantity fields, secondary buttons, chips, checkboxes | — |
| `success` | `#1B6E31` | `#74D68C` | "Saved" toast (with check icon), verified count lines, online icon | Stock state badges (use `state-available`) |
| `warning` | `#8A4F00` | `#F4B65C` | Offline banner, queued actions, low stock | Errors, the Unexplained state |
| `danger` | `#A8231B` | `#FF8F85` | Flag damage, refusals, sync conflicts, losses in taka | Primary actions |
| `info` | `#1D5799` | `#8DBBF2` | Neutral notices ("as of 10:42") | — |
| `surface-disabled` / `text-disabled` | `#E4EBE9` / `#4F625F` | `#1E2A27` / `#A3B5B1` | Disabled buttons and fields (with a dashed `control-border` and a reason) | Anything a user can act on |
| `scrim` | `#0D1F1C` at 50% | `#000000` at 60% | Backdrop behind bottom sheets, dialogs and the scan overlay's edges | — |

### Contrast (WCAG 2.x, computed)

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
| **`control-border` vs `surface`** | **4.0:1** | **4.4:1** | ≥ 3:1 (WCAG 1.4.11) |
| **`control-border` vs `surface-alt`** | **3.6:1** | **3.9:1** | ≥ 3:1 |

Light and dark tokens side by side on a desk screen: [mockups/key-owner-view.html](mockups/key-owner-view.html) (Owner view, light + dark).

`control-border` exists because the theme's `border` fails the 3:1 non-text contrast rule for control boundaries (memlog assumption entry). `#6B8580` / `#6B827C` are the theme's border hue darkened (light) or lightened (dark) until they pass on both surfaces. [ASSUMPTION: exact hex chosen by the distill step; confirm visually.]

`surface-disabled` / `text-disabled` are derived so a disabled control is still readable but clearly not the same as an enabled one: flat grey-green fill, dashed edge, an icon, and a visible reason. [ASSUMPTION: derived hex; confirm visually.]

### Stock states

The five Stock states (PRD Glossary) each have a fill and an on-color. **Color is never the only signal:** every state also carries an icon, a text label and, for two states, a pattern.

| State | Light fill / on | Dark fill / on | On-color contrast | Icon (SVG) | Pattern |
|---|---|---|---|---|---|
| Available | `#1B6E31` / `#FFFFFF` | `#74D68C` / `#06210E` | 6.3:1 / 9.5:1 | check | solid |
| Reserved | `#1D5799` / `#FFFFFF` | `#8DBBF2` / `#071A33` | 7.3:1 / 8.7:1 | diamond | solid (dotted in the stacked bar) |
| Damaged | `#A8231B` / `#FFFFFF` | `#FF8F85` / `#300704` | 7.2:1 / 8.2:1 | cross | **diagonal hatch** |
| In transit | `#5B3E96` / `#FFFFFF` | `#C4A8FF` / `#1F0F45` | 8.2:1 / 8.6:1 | arrow-right | solid |
| Unexplained | `#FFC94D` / `#2B1D00` | `#F2D16B` / `#2B1D00` | 10.7:1 / 11.0:1 | question | **dashed inner outline** |

- **Damaged hatch:** `repeating-linear-gradient(135deg, fill 0 7px, mix(78% fill, 22% on-color) 7px 10px)` — from the theme artifact. On the pill, the hatch covers only the leading 12px (behind the icon); the label sits on solid fill so Bangla stays clean on cheap screens.
- **Unexplained dashed:** `2px dashed` outline in the on-color, inset 4px. It is part of the component, never optional: compact variants (search results, owner tiles) keep it. In light mode the Unexplained fill is only 1.5:1 against white `surface`, so this dark dashed outline is also what gives the pill a visible edge.
- **Dark-mode Unexplained vs warning.** The theme gave `state-unexplained-dark` the same hex as `warning-dark` (`#F4B65C`). It is moved to a yellower `#F2D16B` so an Unexplained pill no longer looks like the offline banner or a queued chip. Computed: `on-state-unexplained-dark` on it 11.0:1 (AAA); fill vs `surface-dark` 12.2:1 (visible edge). The two fills are close in lightness (1.2:1), so they differ by hue, and Unexplained always adds its question icon and dashed outline; warning never uses a filled pill. [ASSUMPTION: derived hex; confirm visually on a low-cost phone.]
- On-color text on a hatched Damaged fill keeps ≥ 4.5:1 because the hatch only mixes 22% toward the on-color.

## Typography

One font stack serves both languages: `system-ui, "Segoe UI", Roboto, "Noto Sans Bengali", "Nirmala UI", sans-serif` (from both creative artifacts). Noto Sans Bengali is named so Bangla conjunct characters render correctly; the PRD addendum warns this must be tested on low-cost phones. [ASSUMPTION: whether to self-host Noto Sans Bengali as a web font for offline use is an architecture decision.]

All sizes are in **rem** (1rem = 16px at default text size), so text grows with the phone's text-size setting. Pixel values below are at the default size.

| Token | Size / weight / line-height | Use |
|---|---|---|
| `qty-display` | 1.875rem (30) / 800 / 1.1 | Digits only: the quantity to pick, count or receive; the Promisable total. The unit word sits beside it in `body-strong` |
| `amount-hero` | 2rem (32) / 700 / 1.2 | Digits and ৳ only: taka figures on the owner view |
| `headline` | 1.25rem (20) / 700 / 1.4 | Screen titles, dialog titles |
| `title` | 1.0625rem (17) / 700 / 1.45 | Card titles: Product name, Issue type |
| `body` / `body-strong` | 1rem (16) / 400 or 600 / 1.5 | All running text and labels |
| `label-button` | 1.125rem (18) / 700 / 1.4 | Buttons; first line of a bilingual floor button |
| `label-button-secondary` | 1rem (16) / 600 / 1.4 | Second line of a bilingual floor button; decision-effect lines use `body` |
| `label-scan` | 1.5rem (24) / 800 / 1.4 | Scan bar, Bangla part |
| `label-scan-secondary` | 1.125rem (18) / 600 / 1.4 | Scan bar, English part |
| `meta` | 0.875rem (14) / 500 / 1.4 | English UI secondary text; digits, timestamps and IDs in either language |
| `meta-bn` | 1rem (16) / 500 / 1.5 | Secondary text whenever the UI language is Bangla |

Rules:

- **Bangla line-height.** Bangla has vowel signs above and below the letter and stacked conjuncts, so it needs more vertical room than English. **Every token that may carry Bangla has a line-height of at least 1.4**; body text is 1.5. Only `qty-display` and `amount-hero` go tighter, and they never hold Bangla words (digits and ৳ only). [ASSUMPTION: 1.4–1.5 is a starting point; verify with real Bangla strings on a 360px phone.]
- **Bangla never below 16px (1rem).** `meta` (14px) never carries Bangla words. Any secondary text in a Bangla UI uses `meta-bn`. Where a component below lists `meta`, read it as `meta` in English and `meta-bn` in Bangla.
- **Language display** (memlog decision). Every string is in the User's chosen language. Two exceptions show both languages together, Bangla first, English second: the **Scan bar** and **floor primary buttons** (the 64px buttons on floor surfaces that record or finish work; full list in EXPERIENCE.md → Voice and Tone). Everything else — tabs, toasts, banners, pills, cards, dialog body text, desk screens — shows one language.
- **Labels wrap, never clip.** Buttons, the Scan bar, tabs and chips use `min-height`, allow a second line, and never set `overflow: hidden` on a label.
- **Western digits (0–9) in both languages** (memlog; PRD FR-45). Quantities use `font-variant-numeric: tabular-nums` so columns line up.
- Weights 800 on floor numbers and the Scan bar come from Big & Bold Floor, softened from its 900. [ASSUMPTION: 800 chosen so Bangla glyphs do not clog on cheap screens.]
- No all-caps (Bangla has no case; keep both languages consistent).

## Layout & Spacing

Scale: 0.25 / 0.5 / 0.75 / 1 / 1.5 / 2 rem (4 / 8 / 12 / 16 / 24 / 32 px; `{spacing.1}`…`{spacing.6}`). Phone side gutter `{spacing.gutter-phone}` (16px); desktop `{spacing.gutter-desktop}` (24px).

- **Phone (floor) screens:** single column, no sideways scrolling from 320 CSS px wide up (WCAG 1.4.10; PRD NFR-3 sets 360px as the design width). Content scrolls above a **fixed bottom zone**:
  - task and stock screens (S6–S11): optional Flag damage button (`{spacing.target-floor}`) + Scan bar (`{spacing.scan-bar-height}`);
  - home screens: Scan bar + bottom tab bar (`{spacing.target-floor}`);
  - `{spacing.3}` padding between and around the rows; 1px `border` top edge.
- **Short screens, landscape and zoom.** When the viewport is shorter than `{spacing.short-screen}` (30rem, about 480 CSS px), or the text size is 150% or more, only **one** row stays fixed: the Scan bar at `{spacing.scan-bar-height-compact}`. The tab bar and Flag damage button move to the end of the content. The app bar compacts to `{spacing.app-bar-height-compact}` (user name and online status only; the title scrolls with content). Below `{spacing.tiny-screen}` (20rem tall, e.g. 400% zoom in landscape) nothing is fixed; the Scan bar sits at the end of the content and the app bar scrolls.
- **Focus never hidden.** Pages set `scroll-padding-top` to the sticky app bar height and `scroll-padding-bottom` to the fixed bottom zone height + `{spacing.2}`, and the focused field scrolls into view above the zone.
- **Quantity entry** stacks its carton and pieces rows below 600px (fits 288px at 320 CSS px: 64 + 8 + ≥96 + 8 + 64). Side by side only at 600px and up.
- **Desktop (owner/manager) screens:** left side nav + content area; owner view uses a two-column card grid that collapses to one column on phones. [ASSUMPTION: breakpoints — see EXPERIENCE.md Responsive & Platform.]
- **Target sizes:** every interactive element ≥ `{spacing.target-min}` (48px), including chips, links, banners and list rows. Floor secondary controls `{spacing.target-floor-secondary}` (56px). Floor primary buttons `{spacing.target-floor}` (64px) everywhere; Scan bar 72px.
- Calm Professional density: medium. On a 360×760 screen at default text size, the active line expanded to its stacked quantity entry plus the start of the next line fit above the fixed bottom zone. Longer orders scroll; the fixed zone never hides the focused line (see Focus never hidden).

## Elevation & Depth

Calm and flat. Hierarchy comes from tone and borders, not shadow.

- Light mode: cards sit on `surface` with a 1px `border` and at most a subtle shadow (`0 1px 2px` at ~6% opacity, from the Calm mock). The toast, bottom sheets and dialogs get one stronger shadow (`0 6px 16px` at ~25%) because they float over content.
- Dark mode: no shadows. Raised things use `surface-alt-dark` instead.
- Sheets and dialogs sit over a `{colors.scrim}` backdrop; the page behind is inert.
- The fixed bottom zone has a 1px `border` top edge, no shadow.

## Shapes

- `{rounded.sm}` 6px — inputs, choice chips, status tags, sync-status chips.
- `{rounded.md}` 12px — cards, buttons, toasts, quantity fields.
- `{rounded.lg}` 16px — the Scan bar (from Big & Bold), sheet top corners, dialogs.
- `{rounded.full}` — Stock-state pills and the count badge only.

Soft corners everywhere; no sharp-cornered surfaces, no pill-shaped buttons.

## Components

Anatomy, color, size and state appearance. Behavior for each lives in `EXPERIENCE.md` → Component Patterns under the same name. Icons are **inline SVG** with `aria-hidden="true"`; the visible text carries the name. Icon names here (check, cross, cloud-off…) describe the drawing, not a font glyph.

Mocks: [mockups/key-picking.html](mockups/key-picking.html) (App bar, Scan bar, Scan overlay in Flag damage mode, Floor primary button, Flag damage button, Quantity entry, Task status tag, Offline banner, toasts); [mockups/key-receiving.html](mockups/key-receiving.html) (stacked Quantity entry, Confirmation dialog, Bottom tab bar); [mockups/key-issues-inbox.html](mockups/key-issues-inbox.html) (Issue card, Issue decision buttons, Issue detail, Count badge); [mockups/key-owner-view.html](mockups/key-owner-view.html) (Owner metric tile, Losses by Reason, Drill-down panel, Side nav).

### Frame and navigation

- **App bar** — `surface`, 1px `border` bottom, min 56px. Left: screen title in `headline`. Right (floor screens), two lines if needed: the signed-in User's name in `body`, and the online status as icon + text — cloud-check + "Online" or cloud-off + "Offline" — never a colored dot alone. Desk screens add the Business name. Compact form on short screens: name + status only.
- **Scan bar** — Sits at the bottom of every floor screen. Full width minus gutters, min 72px, `{colors.primary}` fill, scan icon, "স্ক্যান করুন" in `label-scan` then "Scan" in `label-scan-secondary`, both `on-primary`. One line when it fits, two lines otherwise. Compact form 56px.
- **Scan overlay** — Full screen over the current page. The camera feed fills the screen; a rounded viewfinder frame (3px `on-primary` corners) sits in the upper middle with a one-line hint above it in `label-button` on a `scrim-dark` strip ("Point at the barcode"). Bottom third: a `surface` action bar with two side-by-side 64px buttons — **Close** (secondary, icon cross) and **Type code** (secondary, icon keyboard), each at least 9rem wide; they stack at 320 CSS px or large text. In **Flag damage mode** the hint strip becomes a `danger` fill with `on-danger` text and the warning icon ("Flag damage — scan the damaged item"), so the mode is never mistaken for a normal scan. No torch control in v1.
- **Bottom tab bar** — min 64px, three or four tabs, icon + one-word label in the chosen language (wraps to two lines rather than shrink), active tab in `primary` with a 3px top bar and a filled icon.
- **Side nav** — Desktop only, `surface-alt`, active item on `surface` with `primary` text and a 4px left bar.
- **Count badge** — On the Issues tab and side-nav item only. `primary` fill, `on-primary` digits in `meta`, rounded-full, min 24px; "99+" cap; hidden at 0.
- **Language switch** — Two-segment control "বাংলা | English", 48px, `control-border` outline; selected segment `primary` fill with `on-primary` text and a check icon. Each segment's text is marked with its own language.
- **Focus ring** — Two-tone, on `:focus-visible` only: 2px inner line in `surface` + 3px outer line in `text` (dark: `surface-dark` + `text-dark`). One of the two lines is always ≥ 3:1 against whatever it touches: inner `surface` vs `primary` 8.1:1 / 10.3:1, vs `warning` 6.6:1 / 10.1:1, vs `danger` 7.2:1 / 8.3:1; outer `text` vs `surface` 17.1:1 / 16.2:1. It never uses `primary`, so focus is never confused with selection (`primary` border + check) or the current-line bar.

### Buttons

- **Floor primary button** — `primary` fill, `on-primary` text, min 64px, full width. Bilingual: Bangla in `label-button`, English in `label-button-secondary` on the same line when it fits, otherwise on a second line. Used for Confirm line, Save line, Mark delivery complete, Confirm dispatch, Send Transfer (finish), and dialog confirm buttons on floor screens.
- **Button (primary / secondary)** — Desk primary min 56px in `primary`; secondary is an outline in `control-border`, min 48px on desk and 56px on floor screens. Labels in the chosen language only.
- **Disabled button** — `surface-disabled` fill, `text-disabled` text, 2px **dashed** `control-border`, plus an icon (lock, or cloud-off when it needs internet). The reason ("Needs internet") is visible text beside or under it, never only a tooltip. Never shown as a faded primary button.
- **Flag damage button** — Outline in `danger`, min 64px, full width, warning icon. Bilingual: "ক্ষতি জানান · Flag damage". Sits directly above the Scan bar on S6 and S8 (Calm mock); it moves to the end of the content on short screens.

### Inputs

- **Input field** — min 48px, 1px `control-border`, 2px `primary` focus, 2px `danger` error with message below. Password fields add a 48px show/hide button.
- **Quantity entry** — Below 600px: **stacked rows**, one per unit. Each row: unit name above (`body-strong`, e.g. "কার্টন" / "Cartons"), then `[− 64px] [field, min 6rem, flexible] [+ 64px]` with `qty-display` digits. The pieces row is hidden for products with no Pack unit. `control-border` outline, `primary` 2px when focused, `danger` 2px when invalid. At 600px and up the two rows may sit side by side.
- **Choice chip** — 2px `control-border` outline, `{rounded.sm}`, min 48px (56px on floor). Selected: `surface-alt` fill, 2px `primary` border and a check icon, so selection never relies on color alone.
- **Product search field** — Input field, min 56px, search icon left and a 48px scan icon button right; results as 64px rows: name exactly as entered, SKU in `meta`, compact Promisable figures per Warehouse in `body-strong`.

### Stock display

- **Stock-state pill** — Rounded-full, icon + label (chosen language) + quantity, min 32px tall; patterns as in Colors → Stock states. It is not itself a tap target; when interactive it sits inside a 48px row.
- **Stock ladder** — A card listing On hand, then "− Damaged", then "− Reserved", with a rule and the **Promisable** total in `qty-display`. Rows min 48px. Each minus row starts with its state icon. Under it, an optional one-line stacked bar (Damaged hatched, Reserved dotted, Available solid) with 2px `surface` gaps between segments and the state icon inside any segment at least 24px wide. The bar is **decorative** (`aria-hidden`); every value is in the rows above it, and the bar is never shown without them. In transit and Unexplained totals show as small pills. Footer line "as of 10:42" in `meta` / `meta-bn`.

### Tasks and sync

- **Task card** — `surface` card, min 64px. Product or document name in `title`, quantity progress "12 / 20 ctn" in `body-strong` (picks only), **status tag** on the right. The current line gets a 5px `primary` left bar plus visually hidden text "Current" for screen readers.
- **Task status tag** — `{rounded.sm}`, 2px `control-border`, `body-strong`, min 32px, icon + word: "New", "In progress", "Not synced" (dashed `warning` border and text, hourglass icon) or "Done" (solid `success` border and text, check icon). Display only.
- **Offline banner** — Full-width strip under the app bar, min 48px, `warning` fill, `on-warning` text, cloud-off icon. Text in the chosen language with Western digits, e.g. "অফলাইন · 3টি কাজ অপেক্ষায়" or "Offline · 3 actions waiting".
- **Sync-status chip** — On a queued line: hourglass + "Not synced" (dashed `warning` border) or alert icon + "Not applied – sent to supervisor" (solid `danger` border). `body-strong`; min 48px when tappable (the refused chip), otherwise the whole 64px line is the target.

### Feedback, dialogs and sheets

- **Confirmation toast** — Floats above the fixed bottom zone. `success` fill with check icon when online; `warning` fill with hourglass when saved offline. `body-strong`, chosen language. An optional action ("Change qty/reason") is an underlined text button, min 48px tall.
- **Confirmation dialog** — Centered card on desk, bottom-anchored card on phones, `{rounded.lg}`, over `scrim`. Title in `headline` (a question), one consequence sentence in `body`. Buttons: phones — full width, stacked, confirm at the bottom, "Go back" above it; desk — right-aligned, confirm rightmost. Confirm is `primary`, or `danger` fill when the action cancels, removes or deactivates something. On floor screens the confirm button is a floor primary button (64px, bilingual).
- **Bottom sheet** — `surface`, `{rounded.lg}` top corners, over `scrim`, max 90% of the viewport height, its own scroll; close button 48px.
- **Flag damage** (sheet) — Bottom sheet on `surface` over `scrim`, `{rounded.lg}` top corners, close button 48px at top-right of the sheet (not the screen corner). Product name in `title`, Quantity entry, Reason as three choice chips (damaged / expired / other) at 56px, optional note Input field, and one full-width 64px `danger`-fill button with `on-danger` text "ক্ষতি জানান · Flag damage". Used for "Change qty/reason" and when the camera is not used. [ASSUMPTION: sheet layout not mocked beyond the picking key screen.]
- **Refusal message** — Inline under the quantity entry: 4px `danger` left bar, text in `danger`, states the maximum in the entry's units in `body-strong`, plus a 56px secondary "Use max" button.

### Issues

- **Issue card** — `surface`, 1px `border`, 16px padding. Top: the **title link** (Issue type + Product in `title`, min 48px, `primary` underline on hover/focus) and value at risk in taka in `title`, `danger` text, aligned right. Then one secondary line (`meta` / `meta-bn`): "1 carton · Narayanganj · Karim · 14:05". Then up to two **Issue decision buttons** as siblings of the link, never inside a tappable container.
- **Issue decision button** — min 64px, `{rounded.md}`. Two lines: the decision in `label-button`, the effect under it in `body` ("write off 1 ctn"); both lines ≥ 16px in Bangla, and the button grows taller rather than shrink text. **Recommended** decision: `primary` fill. **Alternative**: `surface` fill, `text`, 2px `control-border`. Side by side when both fit in two lines; stacked full width otherwise (always stacked at 320 CSS px or text ≥ 150%). The per-Issue-type choice of recommended button is in EXPERIENCE.md → Issue decisions.
- **Issue detail** — Full screen. Header = Issue card content; below, an evidence block on `surface-alt` (two-column "Sender / Receiver" or "Counted / On hand" with `qty-display` numbers), a history list in `meta` / `meta-bn` with 48px rows, a comment field, then all decision buttons stacked at the bottom. [ASSUMPTION: layout not mocked beyond the inbox key screen.]

### Owner view

- **Owner metric tile** — The whole card is one target, min 64px. Label in `body-strong`, taka value in `amount-hero`, a chevron icon. Unexplained values carry the question icon and dashed pattern next to the number, not color alone. **Selected** (its drill-down is open): 2px `primary` border, `surface-alt` fill and a "Showing" tag with chevron — distinct from the focus ring.
- **Losses by Reason** — A list of rows, no chart in v1: Reason name in `body` left, taka in `body-strong` `danger` right, tabular digits; 48px rows, 1px `border` dividers; a total row in `title`. Each row is a target.
- **Month selector** — [chevron-left] month year [chevron-right]: two 48px square outline buttons with chevron icons and the month in `title` between them. The next-month button is disabled (dashed) on the current month.
- **Drill-down panel** — Desktop: a right-hand panel beside the tiles, 1px `border` left edge, min 22rem wide. Tablet: below the tiles. Phone: its own full-screen page. Heading in `headline` with figure name, total and month; 48px Close (desk) or Back (phone); rows min 64px.

## Do's and Don'ts

| Do | Don't |
|---|---|
| Pair every Stock state color with its icon, label and (Damaged, Unexplained) pattern | Show a Stock state by color alone |
| Use `control-border` on every input, stepper, chip and outline button | Use `border` for anything a user must find and tap |
| Keep Bangla at ≥ 16px with line-height ≥ 1.4; use `meta-bn` for Bangla secondary text | Put Bangla in `meta`, or shrink Bangla to fit English layouts |
| Show one language, except the Scan bar and floor primary buttons | Make every label bilingual |
| Western digits 0–9 in both languages, tabular numerals | Bangla digits anywhere in v1 |
| Use `primary` only for the next action, selection and navigation | Use teal for status, decoration or the focus ring |
| Size every interactive thing ≥ 48px, floor primary buttons 64px | Leave chips, links or banners unsized |
| Use rem and min-height; let labels wrap | Fix heights in px or clip labels |
| Draw icons as SVG with the text label as the name | Use emoji or font glyphs as icons |
| Show disabled controls dashed, with an icon and a visible reason | Fade a primary button to show it is disabled |
| Test every screen in light and dark | Ship a screen checked in one mode only |
| Use `danger` for damage, refusals and losses | Use red for the Scan bar or ordinary primary buttons |
| Keep the floor screens big (72px Scan bar, 30px quantities) and the desk screens calm | Bring Big & Bold weight into the owner view |
