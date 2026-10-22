---
title: "Mojud UX spines - Accessibility lens review"
reviewed: [DESIGN.md, EXPERIENCE.md, .memlog.md]
date: 2026-10-22
standard: WCAG 2.2 AA (AAA where the spine claims it) + warehouse-floor field conditions
---

# Accessibility review - Mojud DESIGN.md + EXPERIENCE.md

## Verdict

**REVISE BEFORE BUILD (pass with conditions).** The colour system is unusually solid: every text/fill pair the spine claims was recomputed and holds, warning and danger work as text in both modes, `control-border` correctly fixes the 1.4.11 failure of `border`, and "never colour alone" is applied to stock states, sync chips and toasts. The spine also gets many behaviour rules right (no gesture-only actions, drag-free sheets, live regions, reduced motion, no undo-by-timer, pre-filled defaults for 3.3.7).

What blocks a clean pass is geometry and the edges of the spec: the quantity entry does not fit the minimum supported width, the fixed bottom stack breaks reflow and focus visibility at zoom, the scanner's manual alternative is only offered after camera denial, the stock-ladder bar relies on colour between segments, and several tap targets are unsized despite the ">= 48px everywhere" claim.

| Severity | Count |
|---|---|
| Critical | 1 |
| High | 4 |
| Medium | 11 |
| Low | 10 |

## Contrast recomputation (WCAG 2.x relative luminance)

All values computed from DESIGN.md frontmatter hex tokens.

| Pair | Light | Dark | Required | Result |
|---|---|---|---|---|
| `text` / `surface` | 17.07 | 16.23 | 4.5 (AAA 7) | Pass AAA |
| `text` / `surface-alt` | 15.31 | 14.27 | 4.5 | Pass AAA |
| `text-muted` / `surface` | 8.32 | 9.43 | 4.5 | Pass AAA |
| `text-muted` / `surface-alt` | 7.46 | 8.29 | 4.5 | Pass AAA |
| `on-primary` / `primary` (Scan bar, buttons) | 8.06 | 9.60 | 4.5 | Pass AAA |
| `primary` / `surface` (links, focus ring) | 8.06 | 10.29 | 4.5 / 3 | Pass |
| `primary` / `surface-alt` (side nav, grouped areas) | 7.23 | 9.05 | 4.5 / 3 | Pass |
| `control-border` / `surface` | 3.97 | 4.43 | 3 (1.4.11) | Pass |
| `control-border` / `surface-alt` | 3.56 | 3.90 | 3 | Pass |
| `border` / `surface` | 2.48 | 2.18 | 3 if on a control | Fail - correctly restricted to decorative use |
| `on-warning` / `warning` (offline banner, offline toast) | 6.56 | 9.15 | 4.5 | Pass AA (not AAA) |
| `on-success` / `success` (toast) | 6.32 | 9.53 | 4.5 | Pass AA (not AAA) |
| `on-danger` / `danger` | 7.19 | 8.22 | 4.5 | Pass AAA |
| `on-info` / `info` | 7.30 | 8.74 | 4.5 | Pass AAA |
| `warning` as text / `surface` | 6.56 | 10.14 | 4.5 | Pass |
| `warning` as text / `surface-alt` (queued chip) | 5.88 | 8.92 | 4.5 | Pass AA |
| `danger` as text / `surface` (refusal, flag button, taka loss) | 7.19 | 8.26 | 4.5 | Pass AAA |
| `danger` as text / `surface-alt` | 6.44 | 7.26 | 4.5 | Pass AA |
| `info` / `success` as text on `surface` | 7.30 / 6.32 | 9.13 / 10.18 | 4.5 | Pass |
| Stock-state on-colours (Available, Reserved, Damaged, In transit, Unexplained) | 6.32 / 7.30 / 7.19 / 8.16 / 10.73 | 9.53 / 8.74 / 8.22 / 8.57 / 9.15 | 4.5 | Pass |
| Damaged hatch stripe (computed `#BB534D` L, `#D17169` D) vs on-colour | 4.71 | 5.42 | 4.5 | Pass (thin margin in light) |
| Unexplained fill / `surface` (pill edge) | **1.53** | 10.14 | 3 if needed to identify | Edge invisible in light; dashed inner outline (10.73) supplies the edge |
| Stacked-bar adjacent segments (Available vs Reserved / vs Damaged / Reserved vs Damaged) | **1.16 / 1.14 / 1.02** | **1.12 / 1.23 / 1.11** | 3 (1.4.11) or non-colour cue | Fail - see H3 |
| Focus ring `primary` vs `warning` fill | **1.23** | **1.01** | 3 (2.4.13 guidance; 2.4.7 visible) | Fail where a ring lands on a warning fill - see M1 |
| Focus ring `primary` vs `primary` fill (segment / selected chip) | **1.00** | **1.00** | 3 | Fail on the shared edge - see M1 |

The DESIGN.md contrast table is accurate to one decimal. The "AAA" label for body text is true; AAA is **not** reached by the toast and offline banner (6.3-6.6:1), which matters under glare - see L1.

## Findings

### Critical

**C1. Quantity entry cannot fit the minimum width it is designed for.**
Location: DESIGN.md -> Components -> Quantity entry; frontmatter `components.quantity-entry`; EXPERIENCE.md -> Component Patterns -> Quantity entry.
"Two side-by-side fields, cartons and pieces, each ... with 64px - / + steppers." At 360px with 16px gutters the content box is 328px; four 64px steppers take 256px, leaving ~32px per field after one 8px gap - too narrow for 30px/800 digits like "120". At 320 CSS px (1.4.10 reflow width) it is ~12px per field; at 200% text it is impossible. Result: horizontal scroll, clipped digits, or steppers shrunk below the glove floor, on the single most-used floor control (UJ-1, UJ-2, UJ-4, UJ-7). Fails 1.4.10 and the spine's own NFR-3 "no sideways scrolling".
Fix: stack the two rows vertically - each row is `[- 64] [field, min 96px] [+ 64]` with the pack-unit label above (fits 288px at 320 wide). Keep side-by-side only at >= 600px. State in EXPERIENCE.md that the pieces row is hidden for products with no Pack unit (already stated) so the default case is one row. Add the layout to the 360x760 "three-line order above the Scan bar" budget check.

### High

**H1. Fixed bottom stack breaks reflow and hides focused content at zoom (1.4.10, 1.4.4, 2.4.11).**
Location: DESIGN.md -> Layout & Spacing; EXPERIENCE.md -> Accessibility Floor (Text resize), Responsive & Platform.
The fixed region on floor home screens is Flag damage button (56) + Scan bar (72) + tab bar (64) = 192px, plus app bar with user name and an offline banner on top and a toast floating above. The spine tests only "200% text size on a 360px screen" and states floor surfaces are "designed only for" 360-599px. 1.4.10 requires 320 CSS px (400% zoom of 1280), and in landscape or at 400% the fixed chrome covers most or all of the viewport; tabbing/scrolling a field under the fixed stack fails 2.4.11 Focus Not Obscured. All type sizes are in px, so 1.4.4 text resize is not guaranteed.
Fix: (a) change the reflow requirement to "320 CSS px wide and 256 CSS px tall at 400% zoom, no loss of content or function"; (b) specify sizes in rem; (c) when viewport height < ~480 CSS px or text scale >= 150%, un-fix the tab bar (move to page end) and drop the Scan bar to 56px, keep only one fixed row; (d) set `scroll-padding-bottom` equal to the fixed stack height and scroll the focused field into view above it; (e) the toast must never overlap the focused element or the save button.

**H2. The scanner's accessible alternative is conditional; scan results are not announced.**
Location: EXPERIENCE.md -> Component Patterns -> Scan bar; State Patterns -> Camera permission denied; Interaction Primitives -> Feedback on scan; IA S4.
Manual "Type SKU / search" appears only when the camera is denied or unsupported. Screen-reader users cannot aim a camera; sighted workers hit glare, dim aisles, torn or curved labels and gloves. The camera overlay itself has no specified close control, focus handling or name. Success feedback is vibration (unsupported on iOS Safari) plus a "brief" highlight - nothing for screen readers.
Fix: put a persistent 56-64px "টাইপ করুন · Type code" button inside the camera overlay and a search/type entry on every task screen, always, not only on denial; give the overlay `role="dialog"`, a 48px+ labelled close button, focus on open and return-to-Scan-bar on close; announce each match via the polite live region ("Rice 25 kg selected, 1 carton"); keep the matched line in its persistent selected state (left bar), not only a timed highlight; add a timeout hint in the overlay after ~8 s without a read ("Can't scan? Type the code").

**H3. Stock-ladder stacked bar separates segments by colour only (1.4.1, 1.4.11).**
Location: DESIGN.md -> Components -> Stock ladder ("one-line stacked bar (Damaged hatched, Reserved, Available)").
Adjacent segment contrast is 1.02-1.23:1 in both modes. Available vs Reserved is distinguishable only by hue; red/green-deficient users (about 8% of men) cannot separate Damaged from Available either, beyond the hatch. Segment widths carry quantity information.
Fix: either mark the bar decorative (`aria-hidden="true"`, with an explicit note that every value is in the ladder rows above it), and/or add 2px `surface` gaps between segments, a distinct pattern for Reserved (e.g. dots) and the state icon in any segment wide enough (>= 24px). Do not introduce a bar without the rows.

**H4. Several tap targets are unsized, contradicting the ">= 48px everywhere" rule (2.5.8; spine's own target claim).**
Location: DESIGN.md -> Components -> Sync-status chip (`typography.meta`, `rounded.sm`, no height), Owner metric tile ("Review ->" link), Refusal message ("Use max (32)" button), Offline banner (tappable, no height); EXPERIENCE.md -> Component Patterns (Sync-status chip "Tapping the refused chip explains why", Owner metric tile "Every figure is tappable"), My record list lines.
A 14px chip with typical padding is ~22-26px tall - at or below the 2.5.8 24px minimum and far below the gloved floor need. "Use max" is the key recovery path in UJ-4 and floor quantity refusals.
Fix: give each a token: sync chip visual can stay compact but its hit area is the whole 64px task line (or a 48px min-height chip); "Use max (n)" is a 56px secondary button; offline banner min-height 48px; each metric tile is one 48px+ target (whole card), not a small link plus separate figures; inline links in desk lists >= 44px row height. Add a frontmatter rule `target-min applies to every interactive element, including chips and links`.

### Medium

**M1. Focus ring disappears on same-colour or warning fills and is indistinguishable from selection (2.4.7, 2.4.11/2.4.13 guidance).**
Location: DESIGN.md -> frontmatter `components.focus-ring`, Components -> Focus ring, Language switch, Flag damage sheet choice chips, Task card current-indicator, Bottom tab bar.
The single 3px `primary` ring is 1.00:1 against `primary` fills (selected language segment, selected reason chip border, approve button when rings overlap neighbours) and 1.23 / 1.01 against `warning` (any focusable inside the offline banner or offline toast). It is also the same colour as the "current line" bar, the active-tab bar and the selected-chip border, so focus vs selection is ambiguous for keyboard and switch users.
Fix: two-tone ring - 2px `surface` inner gap + 3px `text` (light `#0D1F1C`, dark `#EAF4F1`) outer, or `primary` outer with a `text`-colour inner line; this gives >= 3:1 against every fill in the palette. Use `:focus-visible` so touch taps do not show it.

**M2. Bangla type rules contradict the tokens.**
Location: DESIGN.md -> Typography (rules "line-height >= 1.4" and "Bangla never below 16px") vs frontmatter `label-button` (1.3), `label-scan` (1.2), `meta` (14px) usage.
`label-button` carries Bangla on every button ("ক্ষতি জানান") at 1.3; the Scan bar label "স্ক্যান করুন" is Bangla at 1.2 (the rationale "digits plus one short word" is wrong for it). `meta` (14px) is the sync-status chip type, which holds Bangla ("সিঙ্ক বাকি", "প্রয়োগ হয়নি – সুপারভাইজারের কাছে পাঠানো হয়েছে"), the owner-tile labels and the Issue history list. Fixed-height containers (72/64/56px) plus tight line-height risk clipping ু ূ ৃ below and ি ী ে above, and stacked conjuncts like ক্ষ, স্ক্য.
Fix: raise `label-button` to 1.4 and `label-scan` to 1.35 minimum with `min-height` (not fixed `height`) on buttons and bar; add `meta-bn` 16px / 1.5 and require it whenever the string is Bangla; never set `overflow: hidden` on labelled controls. Verify on a low-end Android with Noto Sans Bengali and the system font.

**M3. Text spacing (1.4.12) and bilingual label fit are unspecified.**
Location: DESIGN.md -> Layout & Spacing, Components -> Bottom tab bar ("icon + bilingual label", 3-4 tabs); EXPERIENCE.md -> Voice and Tone (bilingual chrome).
Four tabs at 360px are ~82-90px wide; a bilingual label at 16px does not fit, so it will be truncated or shrunk below the Bangla 16px rule. Nothing states that content survives line-height 1.5 / letter 0.12em / word 0.16em / paragraph 2em overrides.
Fix: tabs show the chosen language only (icon + one word), bilingual only on the Scan bar and primary floor buttons; add an acceptance check "no clipping or overlap with WCAG 1.4.12 text-spacing bookmarklet in both languages"; allow labels to wrap to two lines inside min-height containers.

**M4. Toast timing and live-region mechanics (4.1.3, 2.2.1 spirit).**
Location: EXPERIENCE.md -> Component Patterns -> Confirmation toast; Accessibility Floor -> Time.
2.5 s is short for slower readers of Bangla and for workers looking at the carton, not the screen. The spine correctly says nothing is shown only in a toast, but does not specify that the live region is a persistent element (inserting a new region with the toast is often not announced on TalkBack), nor what happens to queued announcements when toasts stack during rapid scanning.
Fix: toast stays >= 5 s or until the next action, whichever is first; live region `role="status"` exists in the DOM from page load and its text is replaced, not re-created; rapid saves coalesce ("Saved 3 lines"); the persistent on-screen result (line state "counted 12 ctn", chip) is the source of truth.

**M5. Refusal/error semantics are incomplete (3.3.1, 3.3.3, 4.1.2).**
Location: EXPERIENCE.md -> Component Patterns -> Refusal message; State Patterns -> Refused by the no-negative rule; Accessibility Floor (assertive live region).
"Shown immediately" + assertive region will re-announce on every keystroke (typing "4", "40"). The disabled Save gives no reason when focused. The max is stated in cartons ("Max 32") though the entry is cartons + pieces.
Fix: validate on input with ~500 ms debounce and announce once per state change; set `aria-invalid="true"` and `aria-describedby` from both quantity fields to the message; use `aria-disabled` (still focusable) on Save with the reason in its description; state the max in the entry's units ("Max 32 ctn" or "Max 32 ctn + 5 pcs"); the "Stock changed just now" message should also move focus to "Use max".

**M6. No disabled-state token or treatment.**
Location: DESIGN.md -> frontmatter components (none define `disabled`); EXPERIENCE.md -> State Patterns -> Offline ("disabled with 'Needs internet'"), Refusal ("save disabled").
Disabled controls are exempt from contrast, but users must still recognise them and learn why. Low-opacity primary buttons in glare look identical to enabled ones.
Fix: define `button-disabled` (e.g. `surface-alt` fill, `text-muted` text, dashed `control-border`, lock or cloud-off icon) and require the visible reason text next to it ("Needs internet"), not only a tooltip.

**M7. Accessible authentication not specified (3.3.8, 1.3.5).**
Location: EXPERIENCE.md -> IA S1, S2, S27; UJ-8 steps 2 and failure path; Voice and Tone (sign-in message).
Phone + password sign-in, temporary-password change and recovery-code entry are a cognitive function test unless paste and password managers are allowed. Nothing says so; the recovery code is "shown once" with Copy, but its re-entry format is undefined.
Fix: state "paste allowed; `autocomplete="tel"`, `current-password` / `new-password`, `one-time-code` on the recovery field; show-password toggle (48px); recovery code formatted in groups, case-insensitive, separators ignored on entry"; the FR-2 lockout message shows the wait time as text and announces it once (not a ticking live region).

**M8. 24-hour offline cap stops work without warning (2.2.1 spirit, 3.3.4 spirit).**
Location: EXPERIENCE.md -> State Patterns -> Offline too long.
Recording simply pauses at 24 h. A worker mid-receipt is blocked with no advance notice.
Fix: banner escalates at 20 h ("Connect within 4 hours to keep recording"), the stop never interrupts a line already being entered (finish current line, then pause), and the message names what to do (Wi-Fi / mobile data) and that queued work is safe.

**M9. Desktop keyboard and SPA structure unspecified (2.1.1, 2.4.1, 2.4.2, 2.4.3, 4.1.2).**
Location: EXPERIENCE.md -> Component Patterns -> Issue card, Owner metric tile, Bottom tab bar / Side nav; Responsive & Platform -> Desktop.
The Issue card makes the whole body tappable and also holds two buttons - a nested-interactive pattern that breaks keyboard and screen-reader use. No skip link, landmarks, heading structure, per-route document title or focus placement on route change are specified for the Owner/Manager desk surfaces. Month selector and drill-downs have no keyboard spec.
Fix: Issue card = heading link (card title) + two sibling buttons, never a clickable container with buttons inside; add "skip to content", `nav`/`main` landmarks, one `h1` per surface, `document.title` per route, and move focus to the `h1` after route change; side nav uses `aria-current="page"`; list+detail panes keep focus in the list after a decision and announce the removal.

**M10. Glyph icons will be read aloud oddly and may not render (1.1.1, 1.3.1).**
Location: DESIGN.md -> frontmatter `stock-state-pill`, `sync-status-chip`, `offline-banner`; Components (✓ ◆ ✕ ➜ ? ⏳ ⚠ !).
Screen readers read "black diamond", "heavy wide-headed rightwards arrow", "hourglass" before the label; ⏳ is a colour emoji and ➜ is missing from some low-cost Android system fonts (tofu boxes), which removes the non-colour cue the spine relies on.
Fix: ship the state icons as inline SVG with `aria-hidden="true"`; the text label carries the name; keep the glyph list in DESIGN.md as the visual reference only.

**M11. Language of parts for bilingual names is not implementable as written (3.1.2, 2.5.3).**
Location: EXPERIENCE.md -> Accessibility Floor -> Screen readers; Voice and Tone (bilingual chrome); DESIGN.md -> Scan bar, Buttons.
"Set lang on mixed-language spans" works for visible text, but if bilingual buttons get an `aria-label`, the label has a single language and TalkBack reads the English half with a Bangla voice (or vice versa). Bangla TTS voice may not be installed on target phones.
Fix: no `aria-label` on bilingual controls - the accessible name comes from visible text with `<span lang="bn">` / `<span lang="en">`; the visible label text must start the accessible name (2.5.3); user-entered names stay unmarked (they inherit page language; acceptable). Add a QA step: TalkBack with Google Bangla voice installed and not installed.

### Low

**L1. Glare margin on status fills.** DESIGN.md -> Colors contrast table. Toast (6.32) and offline banner (6.56) are AA, not AAA; under direct sunlight these are the messages workers most need. Fix: consider darker light-mode `success` (~`#145726`) and `warning` (~`#7A4500`) to reach >= 7:1, or accept and note.

**L2. Semantic colour collisions.** DESIGN.md -> Colors. `state-unexplained-dark` = `warning-dark` (`#F4B65C`); `success` = `state-available`; `info` = `state-reserved`; `danger` = `state-damaged`. Icons separate them, but in dark mode an Unexplained pill and a queued/offline chip look the same colour. Fix: shift `state-unexplained-dark` toward a yellower hue (e.g. `#F2D16B`, recheck on-colour) or document the overlap as accepted.

**L3. Unexplained pill edge in light mode (1.53:1).** DESIGN.md -> Stock states. The dashed inner outline provides the edge; ensure the compact variants (S5 results, owner tile) never drop the outline. Fix: make the outline part of the component, not optional styling.

**L4. Damaged hatch behind text.** DESIGN.md -> Stock states. White on the light stripe is 4.71:1 (passes), but stripes behind Bangla glyphs reduce legibility on cheap screens. Fix: hatch only the pill's leading 12px or a ring, keep the label on solid fill.

**L5. Floor secondary buttons at 48px.** DESIGN.md frontmatter `button-secondary`, Language switch, reason chips. Meets the stated minimum, but below the 64px glove floor for floor-screen actions. Fix: 56px+ for any secondary control on floor surfaces (S3-S11).

**L6. Vibration-only preference.** EXPERIENCE.md -> Interaction Primitives -> Feedback on scan. Fix: Settings: Me toggles for vibration and an optional beep (noise environments vary; some users need sound, some cannot have it).

**L7. Orientation.** EXPERIENCE.md -> Responsive & Platform. Not stated (1.3.4). Fix: never lock orientation; floor layouts must work in landscape for mounted/cart phones.

**L8. Session expiry and shared phones.** EXPERIENCE.md -> Responsive & Platform -> Shared phones; Accessibility Floor -> Time. Session lifetime is undefined. Fix: if a session expires, keep all entered and queued data and return the user to the same screen after re-auth (2.2.5); warn before any server-side timeout with an extend option (2.2.1).

**L9. Blind values must be absent from the accessibility tree.** EXPERIENCE.md -> State Patterns -> Blind. Fix: state explicitly that expected/sent/system quantities are not in the DOM, `aria-*` attributes or hidden text on S7, S10 receive, S11 (screen-reader users would otherwise hear them).

**L10. Smaller semantics.** EXPERIENCE.md -> Loading, Bottom tab bar badge, dialogs. Fix: skeleton regions `aria-busy="true"`; Issues tab name includes the count ("Issues, 4 open"); confirmation dialogs put initial focus on the non-destructive choice and repeat the consequence as the dialog description; usability test (NFR-11) includes low-literacy participants and one TalkBack user.

## What the spine already gets right (keep)

- Recomputed contrast claims are accurate; `control-border` fix for 1.4.11 is correct in both modes.
- Never colour alone for stock states, sync status, online/offline and refusals; patterns for Damaged and Unexplained.
- No swipe/long-press/double-tap-only actions; drag-free sheets with a close button (2.5.1, 2.5.7).
- Steppers as a non-typing alternative; numeric keypad; pre-filled defaults and pre-filled Flag damage sheet (3.3.7).
- Refusals name the limit and offer a fix (3.3.3); blame-free copy.
- Polite/assertive live regions named; reduced motion honoured; animations <= 200 ms.
- Focus trap and return in sheets; Escape/Back closes; focus returns to Scan bar after save.
- "Nothing important only in a toast" rule; user name visible on shared floor phones.
