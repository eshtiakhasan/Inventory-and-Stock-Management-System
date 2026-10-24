# Design System Mapping — Mojud core slice

How this round's screens (`mockups.md`) use your design system (`design-process/D-Design-System/`). Components are built as our own React components from those specs, with the tokens as CSS variables and no outside UI library (Q1). Sources: wireframes, `stories.md`, `requirements.md`, `team-practices.md` (strict TypeScript, ESLint, Prettier).

## Tokens

- All tokens in `design-tokens.md` (colors, typography, spacing, radius, elevation, focus ring) become CSS custom properties named after the token path, for example `--colors-primary`, `--spacing-target-min`, `--typography-body-size`.
- Light values sit on `:root`; dark values (`-dark` tokens) are applied under `[data-theme="dark"]`, and under `@media (prefers-color-scheme: dark)` when the theme is "Device".
- DESIGN.md stays the source of truth; if a value differs, DESIGN.md wins.

## Components Used This Round

| Design-system component | Used on | Notes for this round |
|---|---|---|
| `app-bar` | All signed-in screens | Desktop layout; online status always "Online"; adds `theme-switch` |
| `side-nav` | All signed-in screens | Items per role (wireframes App Shell) |
| `focus-ring` | All | Unchanged |
| `button-primary` | M1–M9, M11, M12 | Desk height `{spacing.button-desk}` (56px) |
| `button-secondary` | All | Unchanged |
| `button-primary-floor` | M11 Save line, M12 Confirm line | Keeps 64px height on desktop |
| `button-flag-damage` | M12 | Disabled state with reason when no line is selected |
| `button-danger` | M4, M5, M7, M9, M13 | Destructive confirms; Flag damage save |
| `button-disabled` | Wherever a reason is shown | Stays focusable (`aria-disabled`) |
| `input-field` | M1, M2, M4–M9, M13 | Unchanged |
| `combobox` | M5, M8, M9 | Product search inside it uses the same matching as `type-code-dialog` |
| `choice-chip` | M5 warehouses, M13 reasons | Unchanged |
| `quantity-entry` | M6, M8, M9, M11, M12, M13 | Cartons + pieces; blind on M11 (empty, no max shown) |
| `line-item-editor` | M8, M9 | Unchanged |
| `data-table` | M4–M9, M14 | Unchanged; pagination at 50 rows |
| `task-card` | M10, M11, M12 line rows | Unchanged |
| `task-status-tag` | M8, M9, M10 | Values this round: New, In progress, Done, plus order statuses |
| `stock-state-pill` | M12 | Damaged only this round |
| `refusal-message` | M1, M4–M6, M9, M11–M13 | Unchanged |
| `form-error-summary` | M1, M2 | Unchanged |
| `confirmation-dialog` | M4, M5, M7, M9, M11, M12 | Initial focus on Go back |
| `confirmation-toast` | All saves | Top-right on desktop |
| `bottom-sheet` | M13 | Rendered as a centred desktop dialog |
| `setup-checklist` | M3 first use | Unchanged |

## New Components (specified in `interaction-spec.md`)

`setup-card`, `side-panel`, `type-code-dialog`, `theme-switch`, `issues-table` (a configured `data-table`).

## Not Used This Round

`scan-bar`, `scan-overlay` (camera), `bottom-tab-bar`, `offline-banner`, `sync-status-chip`, `count-badge`, `issue-card`, `issue-decision-button`, `owner-metric-tile`, `loss-row`, `month-selector`, `drill-down-panel`, `stock-ladder`, `hidden-during-count`, `recovery-code`, `file-upload`, `step-card`, `section-nav`.

## Responsive Behaviour

| Width | Behaviour |
|---|---|
| Below 1024px | Not supported this round; a `meta` notice "Mojud works best on a wider screen for now" shows below 1024px, and the layout scrolls horizontally rather than breaking |
| 1024–1279px | Side nav 200px; two-column task screens keep a 60/40 split |
| 1280px (design width) | Side nav 240px; content up to 1200px |
| Above 1440px | Content stays 1200px wide, centred |

## Assumptions & Open Questions

None.
