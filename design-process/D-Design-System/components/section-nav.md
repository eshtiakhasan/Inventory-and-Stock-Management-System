# Section Nav [nav-101]

**Type:** Navigation
**Category:** Sub-navigation (secondary navigation inside a top-level area)
**Purpose:** Let Owners and Managers move between the Settings sections (Warehouses, Products, Suppliers, Excel import, Users, Me) without going back to the side nav or the More menu.

---

## Overview

Section Nav is the row of section links under the H1 of every Settings page on tablet and desktop, and its phone counterpart, the **Settings index** (a list of rows reached from More → Settings, with a "Settings" Back button on each section page). Page specs call it "settings section links" ([09.2 → Shared Settings layout](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.2-settings-warehouses/09.2-settings-warehouses.md), Open Question 1 there).

The links are real links to real URLs (`/settings/{section}`); they are not tabs. The current section is marked by a bar and weight, never by color alone. The order follows the setup checklist on 04.1: **Warehouses · Products · Suppliers · Excel import · Users · Me**.

It sits one level below the [Side Nav](./side-nav.md) (desktop) and [Bottom Tab Bar](./bottom-tab-bar.md) (phone): those stay on screen with "Settings" (desktop) or "More" (phone) current.

---

## Variants

| Variant | Where | Anatomy |
|---|---|---|
| **links row** (default) | Tablet and desktop, ≥ 600px, under the H1 and page description | `nav` with a list of 6 inline links; the current link has a 3px `primary` bottom bar; links wrap to a second line, never scroll sideways |
| **index list** | Phone, < 600px: the page opened by More → Settings | List of rows, one per section, min `{spacing.target-min}`, label + chevron-right, 1px `border` dividers; each section page then shows a **Back** button "Settings" at the left of the app bar that returns to this index with scroll kept |
| **single section** (role variant) | Every Role except Owner and Manager | Only "Me" exists, so no section nav is rendered at all; More → Settings opens [10.3 Settings: Me](../../C-UX-Scenarios/10-karim-signs-in-on-the-shared-phone/10.3-settings-me/10.3-settings-me.md) directly |

Owner and Manager see all six sections. Sections a Role cannot use are **hidden**, never disabled (EXPERIENCE.md → Buttons and tabs a Role cannot use are hidden).

---

## States

**Required States:**

- default (link)
- hover
- focus
- current

**Optional States:**

- offline
- wrapped (second line)

**State Descriptions:**

| State | Appearance and behaviour |
|---|---|
| **Default** | Link text in `primary`, `body` weight, no underline at rest; min `{spacing.target-min}` tall with the label vertically centred. |
| **Hover** (pointer) | Underline in `primary`. No fill change. |
| **Focus** (keyboard) | Two-tone [Focus Ring](./focus-ring.md) around the link on `:focus-visible`. The ring never uses `primary`, so focus never looks like the current bar. |
| **Current** | `body-strong` weight, 3px `primary` bottom bar under the link, `aria-current="page"`. Still a link (reloads the section's list view; useful from a deep detail URL). |
| **Wrapped** | When the six labels do not fit in one row (long Bangla labels, 200% text), the row wraps to a second line; each line keeps the 48px targets and the `{spacing.2}` gap. |
| **Offline** | No visual change. Links still navigate; the target page shows its last loaded data with "as of HH:MM (offline)" and its own "Needs internet" reasons. |
| **Index row, current** | Phone index has no current row (the index is its own page). |

No loading, empty, error or disabled states: the nav is static and Role-filtered on the server.

---

## Styling

### Visual Properties

**Size:** Each link min height `{spacing.target-min}`; index rows min `{spacing.target-min}`; app-bar Back button min `{spacing.target-min}`.

**Shape:** No pills or boxes; plain text links with a bottom bar on the current one. Index rows are flush list rows.

**Colors:**
- Link text `{colors.primary}` on `{colors.surface}` (8.1:1 light, 10.3:1 dark).
- Current bar `{colors.primary}`, 3px.
- Optional 1px `{colors.border}` hairline under the whole row (decorative).
- Index rows: label `{colors.text}`, chevron `{colors.text-muted}`, dividers `{colors.border}`.

**Typography:**
- Links `{typography.body}`; current link `{typography.body-strong}` (see Open Question 1).
- Index row labels `{typography.body-strong}`.
- Bangla labels use the same tokens (both ≥ 16px, line-height ≥ 1.4).

**Spacing:**
- Link horizontal padding `{spacing.3}`; gap between links ≥ `{spacing.2}`.
- Row placed `{spacing.3}` below the page description and `{spacing.5}` above the setup strip or first section of the page.
- Index row padding `{spacing.3}` vertical, `{spacing.4}` horizontal.

### Design Tokens

```yaml
colors:
  link-text: '{colors.primary}'           # dark: '{colors.primary-dark}'
  current-bar: '{colors.primary}'         # 3px bottom bar; dark: '{colors.primary-dark}'
  row-hairline: '{colors.border}'         # decorative; dark: '{colors.border-dark}'
  index-label: '{colors.text}'            # dark: '{colors.text-dark}'
  index-chevron: '{colors.text-muted}'    # dark: '{colors.text-muted-dark}'
  background: '{colors.surface}'          # dark: '{colors.surface-dark}'

typography:
  link: '{typography.body}'
  link-current: '{typography.body-strong}'
  index-label: '{typography.body-strong}'

spacing:
  target: '{spacing.target-min}'
  link-padding-x: '{spacing.3}'
  link-gap: '{spacing.2}'
  index-row-padding-y: '{spacing.3}'
  index-row-padding-x: '{spacing.4}'

effects:
  shadow: none
  focus: '{components.focus-ring}'
```

### Figma Reference

Not applicable.

### Library Component

Not applicable.

---

## Behavior

### Interactions

**Click / tap:** Navigates to `/settings/{section}` (list view of that section). Focus moves to the new page's H1 (EXPERIENCE.md → Desk structure). If the current page has an edited form, the shared "Discard changes?" [Confirmation Dialog](./confirmation-dialog.md) appears first (09.2 Unsaved changes).

**Hover:** Underline.

**Focus:** Normal tab order; one tab stop per link.

**Keyboard:** Tab / Shift+Tab between links; Enter follows the link. No arrow-key roving (these are links, not a tablist).

**Phone index:** Tapping a row opens that section; its app bar shows Back "Settings"; Back (button, Android Back or browser Back) returns to the index with scroll kept.

### Animations

None (the current bar moves with the page change, no transition).

---

## Responsive Behaviour

| Width | Behaviour |
|---|---|
| **Phone, 320–599px** | Links row not shown. Settings index page + per-page Back button "Settings" in the app bar. Bottom tab bar keeps More active. |
| **Tablet, 600–1023px** | Links row under the H1; wraps to two lines when needed. Bottom tab bar (More active) still present. |
| **Desktop, ≥ 1024px** | Links row under the H1, inside the content column beside the side nav ("Settings" current). |
| **200% text / 400% zoom** | Row wraps; no horizontal scrolling; targets stay 48px. |

---

## Accessibility

**ARIA Attributes:**
- `<nav aria-label="Settings sections">` ("সেটিংসের অংশ" [BN: verify]) containing a `ul` of links.
- Current link: `aria-current="page"`.
- No `role="tablist"`; the links change the URL.
- Index page: `ul` of links; chevrons are inline SVG `aria-hidden="true"`.
- Back button: accessible name "Settings" ("সেটিংস"), chevron-left icon `aria-hidden`.

**Keyboard Support:**
- Tab: next link; Shift+Tab: previous.
- Enter: open section.

**Screen Reader:**
"Settings sections, navigation, list, 6 items … Products, link, current page." Focus lands on the new page's H1 after navigation.

**Never color alone:** current section = 3px bar + bolder weight + `aria-current`.

**Targets:** ≥ `{spacing.target-min}` per link with ≥ `{spacing.2}` between links.

---

## Content Rules

- One language per User; labels short, one or two words.
- Order is fixed: Warehouses, Products, Suppliers, Excel import, Users, Me.
- No glyphs; the phone chevron is an SVG icon.

| Translation Key | BN | EN | Source |
|---|---|---|---|
| `settings.sectionsNav` | "সেটিংসের অংশ" [BN: verify] | "Settings sections" | 09.2 |
| `settings.section.warehouses` | "গুদাম" | "Warehouses" | 09.2 |
| `settings.section.products` | "পণ্য" | "Products" | 09.2 |
| `settings.section.suppliers` | "সরবরাহকারী" | "Suppliers" | 09.2 |
| `settings.section.import` | "Excel থেকে আনুন" [BN: verify] | "Excel import" | 09.2 |
| `settings.section.users` | "ব্যবহারকারী" [BN: verify] | "Users" | 09.2 |
| `settings.nav.me` | "আমি" [BN: verify] | "Me" | 09.2, 10.3 |
| `settings.back` | "সেটিংস" | "Settings" | 09.2 |
| `nav.settings` | "সেটিংস" | "Settings" | 09.2 |
| `common.noAccess` | "আপনার এটি দেখার অনুমতি নেই।" [BN: verify] | "You don't have access to this." | 09.2 (deep link to a hidden section) |

---

## Usage

### When to Use

- Moving between sibling pages of one top-level area that each have their own URL (Settings S22–S27).

### When Not to Use

- Switching views of one list in place (Orders: Dispatch orders / Purchase orders / Transfers; Transfers: Incoming / Outgoing / Drafts). Those use a segmented control (07.3 `dispatch-segments`, 05.1 `transfers-segments`), see Open Question 3.
- Top-level navigation: [Side Nav](./side-nav.md) and [Bottom Tab Bar](./bottom-tab-bar.md).
- Steps of a process: [Setup Checklist](./setup-checklist.md) or [Step Card](./step-card.md).

### Best Practices

- Keep the order identical on every Settings page and on the phone index.
- Hide sections the Role cannot use; never show them disabled.
- Do not add counts or badges to section links (no notifications in v1).

---

## Used on Pages

**Pages:** 6

- [09.2 Settings: Warehouses](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.2-settings-warehouses/09.2-settings-warehouses.md) — `settings-layout-section-links` (defines the pattern; phone Settings index and Back).
- [09.3 Settings: Excel import](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.3-settings-excel-import/09.3-settings-excel-import.md) — "Excel import" current.
- [09.4 Settings: Products](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.4-settings-products/09.4-settings-products.md) — "Products" current.
- [09.5 Settings: Suppliers](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.5-settings-suppliers/09.5-settings-suppliers.md) — "Suppliers" current.
- [09.6 Settings: Users](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.6-settings-users/09.6-settings-users.md) — "Users" current.
- [10.3 Settings: Me](../../C-UX-Scenarios/10-karim-signs-in-on-the-shared-phone/10.3-settings-me/10.3-settings-me.md) — "Me" current for Owner / Manager; no nav for other Roles.

---

## Related Components

- [Side Nav](./side-nav.md) — parent level on desktop ("Settings" current).
- [Bottom Tab Bar](./bottom-tab-bar.md) — parent level on phone ("More" current).
- [App Bar](./app-bar.md) — hosts the phone Back button "Settings".
- [Setup Checklist](./setup-checklist.md) — its compact strip sits under this nav during first use.
- [Choice Chip](./choice-chip.md) / [Language switch (DESIGN.md → Frame and navigation)](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md) — styles used by the Orders and Transfers segmented controls (not this component).

---

## Open Questions

| # | Question | Context | Status |
|---|---|---|---|
| 1 | 09.2 says every link is `body-strong` and the current one is marked by "bar + weight". If all links are already `body-strong`, weight cannot mark the current one. This file sets non-current links to `body` and the current to `body-strong` | Internal inconsistency in 09.2 | 🔴 Open |
| 2 | Label for the "Me" section: 09.2 `settings.section.me` = "Me" / "আমার সেটিংস"; 10.3 index item `settings.nav.me` = "Me" / "আমি"; 10.3 page title = "My settings" / "আমার সেটিংস"; 11.1 warning text says "My settings". Pick one key and one label pair | Spec inconsistency between 09.2, 10.3 and 11.1 | 🟢 Resolved: one key `settings.nav.me` = "Me" / "আমি" in 09.2 and 10.3 |
| 3 | One component for Settings section links and the Orders / Transfers segments? 09.2 Open Question 1 suggests it. They differ: segments switch a list in place and are styled differently on each page (07.3: choice-chip style with `primary` fill + check; 05.1: Language-switch style; DESIGN.md choice-chip selected = `surface-alt` fill + `primary` border + check) | Spec inconsistency between 07.3, 05.1 and DESIGN.md; recommend a separate segmented-control component | 🟢 Resolved: no. section-nav covers Settings only; Orders and Transfers segments use the `choice-chip` desk group in 05.1, 07.3 and 09.7 |
| 4 | Section order (Warehouses first) follows 04.1 setup order; EXPERIENCE.md numbers S22 Users first | 09.2 Open Question 9 | 🔴 Open |
| 5 | Should the tablet range (600–1023px) use the links row or the phone index? This file uses the links row, as 09.2 says "tablet and desktop" | Breakpoints are an EXPERIENCE.md [ASSUMPTION] | 🔴 Open |

**Status Legend:** 🔴 Open | 🟡 In Discussion | 🟢 Resolved

---

## Version History

**Created:** 2026-10-24
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created component (WDS Phase 7, new; from 09.2 Open Question 1).
