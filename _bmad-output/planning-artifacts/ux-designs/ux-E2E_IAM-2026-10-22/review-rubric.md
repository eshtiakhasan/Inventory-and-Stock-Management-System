# Spine Pair Review — Mojud

Reviewed: `DESIGN.md` + `EXPERIENCE.md` (ux-E2E_IAM-2026-10-22), against the PRD (`prd-E2E_IAM-2026-10-22/prd.md`), `.memlog.md`, `.working/color-themes-1.html`, and the bmad-ux example spines and DESIGN.md spec. Spines were not edited.

## Overall verdict

**Adequate. Not ready to hand off as a contract until 1 critical and 7 high findings are fixed.**

The pair is mechanically clean:
- Every `{path.to.token}` resolves.
- Every color has a light/dark pair, and the hex values match the theme artifact exactly.
- The stated contrast ratios recompute correctly.
- Every FR (FR-1 to FR-54, plus FR-33a) is cited.
- All nine journeys have a protagonist, numbered steps, a climax and a failure path.
- The UJ-1 to UJ-7 names match the PRD verbatim.

The gaps are about commitments, not structure:

- **The effort budget breaks in one place.** The spine's own top rule is one scan + one tap, and the Flag damage flow (UJ-2) costs two taps.
- **Default quantities on picking are unclear.** Picking a whole line would take many scans and taps.
- **The two spines disagree about when both languages are shown,** and about how small Bangla text may be.
- **Some load-bearing pieces have no spec.** The camera overlay, the offline read scope, and the entry point for sending a Transfer are all unspecified.

A beginner builder would have to invent each of these, which is the outcome the spines exist to prevent.

| # | Category | Verdict |
|---|---|---|
| 1 | Flow coverage | adequate |
| 2 | Token completeness | adequate |
| 3 | Component coverage | thin |
| 4 | State coverage | adequate |
| 5 | Visual reference coverage | thin (expected pending) |
| 6 | Bloat & overspecification | adequate |
| 7 | Inheritance discipline | thin |
| 8 | Shape fit | strong |

Finding counts: **critical 1 · high 7 · medium 10 · low 20**.

## 1. Flow coverage — [adequate]

All nine Key Flows exist and are well formed (UJ-1 to UJ-7 from the PRD, UJ-8 and UJ-9 as spine journeys). The three surfaces with no flow (S15, S19, S27) are declared and accepted by decision. The problems are inside the flows.

### Findings

- **[critical]** UJ-2 breaks the spine's "design rule above all others" (NFR-2 names "flagging damage"). Karim scans (step 2), taps **Flag damage** to open the sheet (step 3), then taps the sheet's **Flag damage** button (step 4). That is one scan + **two** taps. The Component Patterns Flag damage row ("Scan + tap sheet button = the budget") ignores the tap that opens the sheet. Interaction Primitives says a second tap on the default path "fails this spine". (EXPERIENCE.md Key Flows UJ-2 steps 3–4; Component Patterns → Flag damage (sheet); Interaction Primitives → Budget.) *Fix:* choose one approach and commit to it.
  - Option A: the Flag damage button saves straight away with the defaults, and the toast offers "Change" to open the sheet for quantity, Reason or note.
  - Option B: the sheet opens first and the scan inside it saves, so the user taps once and then scans.
  - Then update the UJ-2 steps and the component row to match.
- **[high]** Scanning inside a pick task has a side effect that conflicts with flagging damage. The Scan bar rule says that inside a task, a scan "selects the matching line and adds 1 of the scanned unit". In UJ-2, Karim scans the *crushed* carton on S8, so that scan records it as picked before it is flagged. (Component Patterns → Scan bar; UJ-2 step 2.) *Fix:* define what a scan arms. One option: inside a task, a scan selects the line and pre-fills the quantity without counting it, and only the next tap (Save or Flag damage) decides what is recorded. State whether a scan ever records a Stock movement by itself.
- **[high]** The default pick quantity makes "picking a line" cost many scans and taps. The Quantity entry default is "1 of the scanned unit" everywhere, so a 20-carton line takes 20 scan+tap cycles or manual typing. NFR-2 budgets *a line*, not a unit. (Component Patterns → Quantity entry, Scan bar; UJ-2 step 1 "12 / 20 ctn".) *Fix:* on S8, default the quantity to the line's remaining quantity, so the scan confirms the Product and one tap confirms the line. For blind screens (S7, S10 receive, S11), state that no default can be meaningful, and that "one scan + one tap" there means scan + type + Save, as an explicit, recorded exception to NFR-2.
- **[high]** Send Transfer has no entry point for a Warehouse worker. Their tabs are Tasks · Scan · More, and My tasks lists only *incoming* Transfers (FR-53). More holds S19–S27, and the Orders/Transfers segment (S16) is not in the worker's navigation. UJ-5 step 1 says "the sender opens Send Transfer (S10)" with no way to get there. (EXPERIENCE.md IA → Home and navigation per Role; UJ-5 step 1; FR-26.) *Fix:* add a "Send Transfer" action somewhere a worker can reach, such as a My tasks header button or S6 floor actions, plus a Transfers entry under More. Then add the path to UJ-5 step 1.
- **[medium]** Flows that need more than one person are never walked:
  - Reversal request and approval (FR-15): the entry is cited only in the IA as "S6 … Reversal request entry".
  - Sync conflict decision by a Supervisor (Discard / Recount, FR-33a).
  - Owner password recovery with the recovery code (FR-54).

  Each one crosses Roles and runs into FR-5, so the order of steps is not obvious. (EXPERIENCE.md IA S6, S13, S2.) *Fix:* add a short failure path or a sub-flow for each, or name them as built-from-tables, the same way S15/S19/S27 are.
- **[low]** UJ-5 and UJ-7 have no named protagonist ("the sender", "the Manager"). This is tagged as an assumption because the PRD names no one, but the climax beats are harder to follow. *Fix:* give them illustrative names, as the PRD allows ("illustrative personas").
- **[low]** No flow reaches **Confirm dispatch** and the "next task" that follows (FR-25). UJ-2 ends mid-pick. *Fix:* add a final step to UJ-2, or a one-line note that ties Task card → "Confirm dispatch" → next task.

## 2. Token completeness — [adequate]

All 46 distinct token references resolve. Every color token has a `-dark` pair, so dark mode is fully covered. The contrast table covers the load-bearing pairs, and every ratio recomputes within 0.1. The `control-border` fix for the WCAG 1.4.11 failure is well reasoned. The findings are gaps around the edges, not missing core tokens.

### Findings

- **[medium]** In dark mode, `state-unexplained-dark` and `warning-dark` are the same hex (`#F4B65C`). The Unexplained pill, the offline banner, the queued sync chip and low stock all share one color. Only the icon and pattern tell them apart, and the owner view puts Unexplained next to other warning-toned figures. (DESIGN.md frontmatter `state-unexplained-dark`, `warning-dark`; Colors → Stock states.) *Fix:* shift one of them (for example, warm `state-unexplained-dark` toward `#FFD873`, or move `warning-dark` toward orange), or record a decision that the collision is accepted because the pattern and icon carry the meaning.
- **[medium]** There is no disabled-state token or visual spec. EXPERIENCE relies on disabled controls in several places:
  - "save stays disabled" (Refusal message);
  - "disabled with 'Needs internet'" (Offline);
  - disabled decision buttons offline (UJ-3).

  A disabled control must still be legible and must not look tappable. (DESIGN.md frontmatter `components`, Components; EXPERIENCE.md State Patterns → Offline, Refused.) *Fix:* add `text-disabled` / `surface-disabled` (light and dark), plus a Do/Don't on whether the reason text ("Needs internet") sits beside the button.
- **[medium]** Floor primary button height conflicts with the floor target rule. `button-primary` and `button-flag-damage` are 56px. DESIGN.md Layout says "floor primary actions 64–72px", and EXPERIENCE says "floor primary actions `{spacing.target-floor}` (64px)". "Mark delivery complete" and "Confirm dispatch" are floor primary actions. (DESIGN.md frontmatter `button-primary.height`, `button-flag-damage.height`; Layout & Spacing; EXPERIENCE.md Interaction Primitives.) *Fix:* add a `button-primary-floor` at `{spacing.target-floor}`, or state that 56px is the desk size and floor screens use 64px.
- **[low]** Some values are raw literals rather than tokens:
  - 56px button heights;
  - side-nav width 220px;
  - pill `min-height` 32px;
  - the two shadow values in Elevation;
  - the `scan-bar.position` prose string.

  There is also no scrim/overlay token for sheets and dialogs. (DESIGN.md frontmatter `components`; Elevation & Depth.) *Fix:* add `spacing.button-height`, `elevation.card` / `elevation.float`, `colors.scrim` / `scrim-dark`, or mark them as intentional literals.
- **[low]** The Scan bar's English sub-label is "on-primary at lighter weight", but `label-scan` defines only weight 800. No token exists for the second line. (DESIGN.md Components → Scan bar.) *Fix:* add a `label-scan-secondary` token, or reuse `body-strong`.
- **[low]** The provenance claim is slightly wrong. Colors says every hex comes from the theme file "except `control-border`". However, `on-success`, `on-warning`, `on-danger` and `on-info` (light and dark) do not exist in `.t1-light` / `.t1-dark` either. (DESIGN.md Colors intro, line 263.) *Fix:* list them as derived as well.
- **[low]** The contrast table leaves out text-in-color combinations that the components use. All of them pass when computed:

  | Pair | Light | Dark | Where |
  |---|---|---|---|
  | `warning` text on `surface-alt` | 5.9:1 | 8.9:1 | queued chip |
  | `danger` text on `surface` | 7.2:1 | 8.3:1 | refusal, flag button |
  | `primary` on `surface-alt` | 7.2:1 | 9.1:1 | side nav |

  (DESIGN.md Colors → Contrast.) *Fix:* add these three rows so the consumer does not have to re-derive them.

## 3. Component coverage — [thin]

There are 16 Component Patterns rows, which match DESIGN.md names closely. However, several components the flows depend on have no row in either spine, and two rows lack the rules that their one-tap promises need.

### Findings

- **[high]** **Camera scan overlay (S4)** has no DESIGN.md Components entry and no Component Patterns row, yet it is the most-used floor surface. The undefined parts are:
  - viewfinder framing;
  - cancel/close position and size;
  - torch toggle;
  - the "type SKU / search" fallback control inside the camera;
  - whether the camera stays open for repeated scans or closes after each one;
  - what the user sees while it decodes.

  (EXPERIENCE.md IA S4; Component Patterns → Scan bar "opens the camera (S4) in place".) *Fix:* add a "Scan overlay" row to both spines. Bilingual close and manual entry buttons should be at least 48px in the bottom third, there should be a visible frame, and the camera should close on success (or stay open in a task, whichever is decided).
- **[medium]** **Confirmation dialog** is required for nine or more actions (Interaction Primitives → Confirm vs undo) but has no visual or behavioral row. Missing: button order, which button is the default or focused one, destructive (`danger`) styling for Cancel order or Deactivate, the scrim, and Bangla-first labels. *Fix:* add it to both spines. It should state the consequence in one sentence, put the confirm button bottom-right on desk and full-width at the bottom on phones, and focus Cancel by default for destructive actions.
- **[medium]** **Online/offline indicator.** FR-42 says the screen *always* shows online *or* offline. Only the offline banner is specified, while "online dot" appears in Colors (`success` row) and in Shapes (`rounded.full`) without a component. (DESIGN.md Colors, Shapes; EXPERIENCE.md Component Patterns → Offline banner.) *Fix:* add an "Online status dot" in the app bar (colored dot + icon + text label, so color is never the only signal), or record that the absence of the banner counts as "online" and note this as an interpretation of FR-42.
- **[medium]** The per-line **Save** control on floor task screens has no spec, even though it is the "one tap" the whole budget rests on. UJ-1 step 4 and UJ-7 step 3 say "taps Save". The Quantity entry and Task card rows never say where Save sits, how big it is, or whether it is the Scan bar area, an inline button, or Enter on the keypad. The Scan bar also hides while the keyboard is open. (EXPERIENCE.md Component Patterns → Quantity entry, Task card; DESIGN.md Components.) *Fix:* specify a line Save button: full-width, `{spacing.target-floor}`, directly above the Scan bar, and visible above the on-screen keyboard.
- **[medium]** The Issue card's "two most common decisions for that Issue type" are not defined. For Transfer shortage, **Found** needs a Warehouse picker. For a Discrepancy case, **Confirmed loss** needs a Reason. Either of these as a card button breaks the "one tap from the inbox" promise. (EXPERIENCE.md Component Patterns → Issue card, Issue detail; FR-33a.) *Fix:* add a per-Issue-type table that lists the two card buttons, their labels (with effect, e.g. "Approve · write off 1 ctn"), and which decisions are detail-only because they need a choice.
- **[low]** Several components appear in only one spine:
  - Button (primary/secondary), Input field, Flag damage button and Focus ring have no Component Patterns rows. Focus is partly covered in State Patterns.
  - App bar (the signed-in User name, the banner position), Movement history list + filters (FR-17), choice chips / pickers, skeleton rows and the Month selector have no DESIGN.md visual spec.

  *Fix:* add one-line rows, or a "standard controls" sentence that states their behavior.
- **[low]** The frontmatter `components` has no entries for Flag damage sheet, Issue detail, Product search field, Language switch, or the stock-ladder stacked bar, though each is described in prose. (DESIGN.md frontmatter vs Components.) *Fix:* add token entries so a resolver can consume them, or accept prose-only for these.
- **[low]** The Scan bar rule contradicts itself: "Never hidden by the keyboard: while a field is focused the bar hides and returns on blur." (EXPERIENCE.md Component Patterns → Scan bar.) *Fix:* reword to "Never covered by the keyboard: it hides while a field is focused and returns on blur."

## 4. State coverage — [adequate]

The State Patterns table is strong. It covers:
- empty, first use, loading, offline, offline too long, never signed in, syncing, sync conflict;
- no-negative refusal, including the concurrent change case (NFR-4);
- segregation-of-duties refusal, blind, server error;
- barcode not found, camera denied, Role permission, focus, dark mode.

Walking S1–S27 found the gaps below.

### Findings

- **[high]** The offline read scope is not committed. State Patterns says FR-41 floor actions "work and queue" offline. But scanning a line in an offline task needs the Barcode → Product lookup, the task lines and the Pack-unit conversion to be on the device already. Nothing says which data is cached: My tasks, open task lines, the Product/Barcode catalog, the last stock ladder. It also says nothing about what the user sees when a barcode or Product is not cached, or when S5/S6 are opened offline for a Product never viewed. Architecture needs this as an input. (EXPERIENCE.md State Patterns → Offline, Not found; Foundation.) *Fix:* add an "Offline data" line: cached = My tasks + their lines, the full Product/Barcode catalog, and the last-seen ladders. Add a state row for "Not on this phone yet — connect to look it up".
- **[medium]** There is no state for an Issue that is already decided or reassigned when the user taps a one-tap decision. Two Supervisors, or a Manager's "Assign to…", can race. (EXPERIENCE.md S12/S13; NFR-4.) *Fix:* add a row: "Already decided by {name} at {time}." The card leaves the list, and nothing changes stock twice.
- **[low]** The sign-in pause after 5 failed attempts (FR-2) has no state row or copy. Only the Accessibility Floor mentions that it "states its wait time". *Fix:* add a row for S2, e.g. "Too many tries. Try again in 15 minutes."
- **[low]** Missing empty and refusal states:
  - S21 Offline queue with nothing queued;
  - S20 My record for a brand-new User;
  - FR-7 archive refused (stock above zero);
  - FR-10 deactivating a Warehouse that still has On hand;
  - FR-3 removing the last active Owner.

  *Fix:* add one line each to State Patterns.
- **[low]** No state for a User who is deactivated, or whose password is reset, while their phone holds queued offline actions. *Fix:* state that the queue still syncs under the original User (or is refused into Sync conflicts), and that the device is then signed out.

## 5. Visual reference coverage — [thin (expected pending)]

`mockups/`, `wireframes/` and `imports/` are empty, and the key-screen mocks are being rendered in `.working/`. The memlog commits to four of them: Picking + Scan bar (with the Flag damage sheet and offline), Blind receiving, Issues inbox, and Owner view.

### Findings

- **[low]** EXPERIENCE.md IA has no "→ Composition reference: mockups/…" line (see the example spines). DESIGN.md marks the Flag damage sheet and Issue detail as "[ASSUMPTION: layout not mocked]". *Fix:* when the mocks are promoted, add the composition reference line, and confirm the Picking mock includes the sheet. Issue detail stays unmocked unless it is added.
- **[low]** Both frontmatters cite `.working/color-themes-1.html` and `.working/directions-1.html` as sources. These are scratch files that may not survive promotion. *Fix:* promote them to `imports/` (or `mockups/`) and update the source paths.

## 6. Bloat & overspecification — [adequate]

EXPERIENCE.md is about 2.5 times the length of the examples, but nearly all of it is load-bearing: the 27-surface IA, the per-Role navigation, the bilingual glossary, and the nine flows. The numeric details (2 s banner, ~2.5 s toast, ≤ 200 ms animation) are tagged and appropriate.

### Findings

- **[low]** Process residue in the contract. "Surface closure gaps (Pass 1)" ("Pass 1 found 12 surfaces…") and the "FR-4 note" at the end of UJ-8 record how the spine was made, not what to build. (EXPERIENCE.md IA → Surface closure gaps; UJ-8 trailing note.) *Fix:* keep only the three-bullet "Still without a journey" list, and move the history to `.memlog.md`.
- **[low]** DESIGN.md Components prose carries behavior that belongs in EXPERIENCE: "drag-free" on the sheet, the result row contents of Product search, and when "Mark delivery complete" appears. *Fix:* keep DESIGN to anatomy, color, size and state appearance, and point to EXPERIENCE for the rest.
- **[low]** UJ-9 encodes a PRD gap (Transfer Issues listed in My record, beyond FR-51) as three inline assumptions. *Fix:* raise it as a PRD change request (it is already in the memlog), and keep the flow assumption to one line.

## 7. Inheritance discipline — [thin]

Several things resolve cleanly:
- the PRD, addendum, brief and memlog sources all exist;
- UJ-1 to UJ-7 titles and personas are verbatim;
- English glossary terms use PRD casing;
- component names match across both spines;
- every token reference resolves.

The two spines contradict each other on two load-bearing text rules, and the Bangla glossary misses many terms that appear on screen.

### Findings

- **[high]** The two spines contradict each other on when both languages are shown.
  - EXPERIENCE Voice and Tone: only floor-screen primary buttons and the Scan bar show both languages; "everything else shows the chosen language only."
  - DESIGN.md specifies bilingual "Bangla · English" text for all Buttons ("Bilingual label: Bangla first"), the Stock-state pill label, the Confirmation toast ("Bangla first"), the Offline banner example, Product search results, Task card titles and "দেখুন · Review →".

  This decides whether the i18n layer renders one locale or two at once. (EXPERIENCE.md Voice and Tone first bullet; DESIGN.md Components → Button, Stock-state pill, Confirmation toast, Offline banner, Owner metric tile, Task card.) *Fix:* pick one rule. The memlog favours simplicity, which points to the EXPERIENCE rule. Then rewrite the DESIGN component examples to show the single-language form and name the two bilingual exceptions explicitly.
- **[high]** The 14px `meta` style is used for Bangla text, which breaks DESIGN.md's own rule that Bangla is never below 16px on a phone. The Typography rules say `meta` is only for "digits, timestamps, IDs and English secondary labels". Yet `meta` is the typography for:
  - `sync-status-chip`, which carries "সিঙ্ক বাকি" or "প্রয়োগ হয়নি – …";
  - the `owner-metric-tile` label, which carries Bangla Reason names;
  - the Issue card meta line ("1 carton · Narayanganj · …", which reads "কার্টন" in Bangla);
  - the Issue detail history list.

  (DESIGN.md frontmatter `sync-status-chip.typography`, `owner-metric-tile.label-typography`; Typography rules; Components → Issue card, Issue detail.) *Fix:* add a 16px `meta-bn` (or make `meta` 16px when `lang="bn"`), and switch those components to it.
- **[medium]** The UI glossary leaves out many PRD Glossary terms and decision labels that appear on floor and inbox screens. FR-45 requires Reasons to appear in the chosen language. "One Bangla term per Glossary term, everywhere" cannot hold while these are missing:
  - **Issue types and terms:** Damage flag (the Issue-card title), Shortfall, Over-delivery, Transfer shortage / overage / overdue, Dispatch short, Sync conflict, Reversal (request).
  - **Catalog and data terms:** Supplier, SKU, Barcode, Unit cost, Low-stock threshold, Offline queue, Stock movement, and the six Role names.
  - **Decision labels:** Found, Confirmed loss, Accept short, Expect rest, Accept, Correct count, Sender undercounted, Recount, Still coming, Transfer loss, Reduce order, Keep open, Discard.
  - **Reason codes:** received, damaged, expired, other, dispatched, opening balance, count shortage, transfer loss, theft suspected, receiving error, picking error, unrecorded damage, unknown.

  (EXPERIENCE.md Voice and Tone → UI glossary.) *Fix:* extend the table, with all new rows tagged for native-speaker review as the existing ones are.
- **[low]** The `sources` lists mix two path bases. PRD, addendum and brief are repo-relative, while `.memlog.md` and `.working/…` are relative to the ux folder. A consumer that resolves against the repo root fails on three entries. (Both frontmatters.) *Fix:* make all of them repo-relative, or use the `{planning_artifacts}/…` form from the examples.

## 8. Shape fit — [strong]

DESIGN.md body sections follow the canonical order exactly: Brand & Style → Colors → Typography → Layout & Spacing → Elevation & Depth → Shapes → Components → Do's and Don'ts. The frontmatter keys match the spec (`name`, `description`, `colors`, `typography`, `rounded`, `spacing`, `components`). EXPERIENCE.md has Foundation, Information Architecture (with a composition reference pending), Voice and Tone, Component Patterns, State Patterns, Interaction Primitives, Accessibility Floor, Responsive & Platform and Key Flows. Both spines carry the "behavior lives in / visual lives in" cross-pointers.

### Findings

- **[low]** EXPERIENCE.md has no Inspiration & Anti-patterns section. The banned list lives in Interaction Primitives, and the rejections are spread across the memlog: Reports nav dropped, bin locations dropped, no badges or notifications. *Fix:* add a short section (for example: lifted from Big & Bold Floor = Scan bar; rejected = streaks, push notifications, Bangla digits, an Undo toast), or note that it is omitted on purpose.
- **[low]** DESIGN.md frontmatter adds keys outside the spec (`status`, `created`, `updated`, `sources`). This is harmless, but a strict spec linter may flag it. *Fix:* keep them, and make sure any lint step allows extra keys.

## Mechanical notes

- **Sources:** `prd.md`, PRD `addendum.md`, brief `brief.md`, `.memlog.md`, `.working/color-themes-1.html` and `.working/directions-1.html` all exist.
- **Token references:** 46 distinct `{colors|typography|rounded|spacing|components}.…` references across both spines, all resolved against the DESIGN.md frontmatter. `{path.to.token}` in the EXPERIENCE.md intro is the syntax placeholder, not a reference.
- **Hex parity:** all 21 theme variables in `.t1-light` / `.t1-dark` match the DESIGN.md tokens exactly. The derived tokens not in the theme file are `control-border`, `control-border-dark`, `on-success`, `on-warning`, `on-danger`, `on-info` and their `-dark` pairs.
- **Contrast recompute** (WCAG 2.x relative luminance, light/dark): text/surface 17.07/16.23 · on-primary/primary 8.06/9.60 · control-border/surface 3.97/4.43 · control-border/surface-alt 3.56/3.90 · border/surface 2.48/2.18 · Unexplained on-color 10.73/9.15 · Unexplained fill vs surface (light) 1.53. All stated values match to one decimal place.
- **Dark-mode collision:** `state-unexplained-dark` = `warning-dark` = `#F4B65C`. Also by design, in both modes: `state-available` = `success`, `state-reserved` = `info`, `state-damaged` = `danger`.
- **FR citation sweep:** FR-1 to FR-54 and FR-33a are all cited in EXPERIENCE.md.
- **UJ names:** UJ-1 to UJ-7 headings match PRD §2.3 verbatim. UJ-8 and UJ-9 are declared spine journeys that reuse PRD personas.
- **Surfaces without a journey:** S15, S19 and S27, each declared spine-only by decision (accepted, not counted as misses).
- **Assumption tags:** DESIGN.md 7, EXPERIENCE.md 25, all intentional per the brief. They are not counted as findings unless they hide a contradiction.
- **Visual folders:** `mockups/`, `wireframes/` and `imports/` are empty, and `.working/` holds only the two direction/theme HTMLs. Key-screen mocks are pending.
