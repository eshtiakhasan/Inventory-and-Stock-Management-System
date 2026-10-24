# App Bar [bar-001]

**Type:** Navigation
**Category:** Frame
**Purpose:** Top bar of every screen: screen title, signed-in User and online status.
**DESIGN.md key:** `app-bar` ([DESIGN.md → Components](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md#components); behaviour in [EXPERIENCE.md → Component Patterns](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md#component-patterns))
**Tokens:** [design-tokens.md](../design-tokens.md) · **Index:** [00-design-system.md](../00-design-system.md#components)

---

## Overview

Sticky bar at the top of every screen. Left: Back (where the screen sits one level down) and the screen title in `headline`, which is the page `h1`. Right, on floor screens: the signed-in User's name and the online status as icon + text, so a shared phone never records under the wrong person and the worker always knows whether the phone is online (FR-42). Desk screens add the Business name. A secondary line (`meta` / `meta-bn`) may sit under the title for context such as "Supplier · Warehouse".

---

## Variants

- **floor** - title + User name + online status (two lines on the right if needed).
- **desk** - title + Business name + User name + online status.
- **compact** - short screens (viewport shorter than `{spacing.short-screen}`) or text size ≥ 150%: min height `{spacing.app-bar-height-compact}`, shows User name and status only; the title scrolls with the content. Below `{spacing.tiny-screen}` tall the bar is not sticky.

---

## States

**Required States:**

- default
- online
- offline
- compact

**Optional States:**

- with Back button
- with secondary line

**State Descriptions:**

**Online:** cloud-check icon in `{colors.success}` + "Online" / "অনলাইন" in `{colors.text}`.
**Offline:** cloud-off icon in `{colors.warning}` + "Offline" / "অফলাইন" in `{colors.text}`. The offline banner appears under the bar at the same time.
**Compact:** see Variants. Focus never hides under the bar: pages set `scroll-padding-top` to the bar height.

---

## Styling

### Visual Properties

**Size:** min-height `{spacing.app-bar-height}` (56px); compact `{spacing.app-bar-height-compact}` (48px). Back button 48px square (`{spacing.target-min}`).  
**Shape:** Square edges, full width; 1px bottom border.  
**Colors:** Background `{colors.surface}`; bottom edge 1px `{colors.border}` (decorative); title and User name `{colors.text}`; status icon `{colors.success}` / `{colors.warning}`; Back icon `{colors.primary}`.  
**Typography:** Title `{typography.headline}`; User name `{typography.body}`; status text `{typography.body}`; secondary line `{typography.meta}` (EN) / `{typography.meta-bn}` (BN).  
**Spacing:** Side padding `{spacing.gutter-phone}` (phone) / `{spacing.gutter-desktop}` (desk); `{spacing.1}` left when a Back button is present.

Dark mode: every `{colors.X}` resolves to `{colors.X-dark}` (see [design-tokens.md](../design-tokens.md#colors)). Values marked [ASSUMPTION] are not in DESIGN.md and are listed under Open Questions or the index's token gaps.

### Design Tokens

Verbatim from the DESIGN.md frontmatter (`components.app-bar`). Do not edit here; change DESIGN.md first.

```yaml
app-bar:
    background: '{colors.surface}'
    border-bottom: '1px {colors.border}'
    min-height: '{spacing.app-bar-height}'
    title-typography: '{typography.headline}'
    user-typography: '{typography.body}'
    status-online: 'icon cloud-check + text "Online", {colors.success} icon, {colors.text} text'
    status-offline: 'icon cloud-off + text "Offline", {colors.warning} icon, {colors.text} text'
```

### Figma Reference

None. Custom design system without a Figma library. Visual reference: [key-picking.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-picking.html), [key-owner-view.html](../../../_bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/mockups/key-owner-view.html).

### Library Component

Not applicable (no component library chosen).

---

## Behavior

### Interactions

Back returns to the parent screen with scroll kept. The status area is not interactive. The bar stays sticky; it compacts on short screens and scrolls away only below `{spacing.tiny-screen}` tall.

### Animations

None. Any motion ≤ 200ms and off under reduced motion (EXPERIENCE.md → Interaction Primitives).

---

## Accessibility

**ARIA Attributes:** `<header>` landmark containing the page `h1`. Status text is plain text (not `aria-live`); online/offline changes are announced through the page's single polite live region. Icons `aria-hidden="true"`. Back button has an accessible name naming its destination (e.g. "My tasks").

**Keyboard Support:** Tab reaches Back (if present); nothing else in the bar is focusable on floor screens.

**Screen Reader:** Reads the `h1` title; status reads as "Online" / "Offline" text, never as a colored dot.

**Floor rules:** targets ≥ `{spacing.target-min}` (48px) for anything interactive; never color alone (icon + text, pattern for Damaged / Unexplained); visible [focus ring](focus-ring.md) on `:focus-visible`; works at 320 CSS px, 200% text and in both themes.

---

## Content Rules

Title and status in the User's chosen language. User, Business, Supplier and Warehouse names exactly as entered, not translated, not marked with `lang`. Western digits in any IDs ("PO-0311").

General: one language per User except the Scan bar and floor primary buttons (Bangla first); Bangla never below 16px and never in `meta`; Western digits 0-9 with tabular numerals for quantities and money; Product, Supplier and customer names exactly as entered.

---

## Usage

### When to Use

Every screen.

### When Not to Use

Inside sheets or dialogs (they have their own heading and close button).

### Best Practices

- Never show online status as a colored dot alone.
- Keep the User name visible on every floor screen (shared phones).
- Do not put actions in the top corners of floor screens (thumb reach).

---

## Used In

**Pages:** 24

**Page IDs:** 01.1, 01.2, 01.4, 02.1, 03.1, 03.2, 04.1, 04.2, 05.1, 05.2, 05.3, 06.1, 07.1, 07.2, 07.3, 08.1, 08.2, 09.1, 09.2, 09.7, 10.1, 10.2, 10.3, 11.1

- [01.1-My tasks](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.1-my-tasks/01.1-my-tasks.md)
- [01.2-Receive PO (blind)](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.2-receive-po/01.2-receive-po.md)
- [01.4-Offline queue](../../C-UX-Scenarios/01-karim-receives-a-delivery-blind/01.4-offline-queue/01.4-offline-queue.md)
- [02.1-Pick Dispatch order](../../C-UX-Scenarios/02-karim-picks-and-flags-damage/02.1-pick-dispatch-order/02.1-pick-dispatch-order.md)
- [03.1-issues-inbox](../../C-UX-Scenarios/03-nasima-clears-the-inbox/03.1-issues-inbox/03.1-issues-inbox.md)
- [03.2-issue-detail](../../C-UX-Scenarios/03-nasima-clears-the-inbox/03.2-issue-detail/03.2-issue-detail.md)
- [04.1-owner-view](../../C-UX-Scenarios/04-haque-traces-an-unexplained-loss/04.1-owner-view/04.1-owner-view.md)
- [04.2-low-stock](../../C-UX-Scenarios/04-haque-traces-an-unexplained-loss/04.2-low-stock/04.2-low-stock.md)
- [05.1-Transfers](../../C-UX-Scenarios/05-karims-transfer-arrives-short/05.1-transfers-list/05.1-transfers-list.md)
- [05.2-Send Transfer](../../C-UX-Scenarios/05-karims-transfer-arrives-short/05.2-send-transfer/05.2-send-transfer.md)
- [05.3-Receive Transfer (blind)](../../C-UX-Scenarios/05-karims-transfer-arrives-short/05.3-receive-transfer/05.3-receive-transfer.md)
- [06.1-My record](../../C-UX-Scenarios/06-karim-proves-where-a-carton-went/06.1-my-record/06.1-my-record.md)
- [07.1-Product search](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.1-product-search/07.1-product-search.md)
- [07.2-Product stock](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.2-product-stock/07.2-product-stock.md)
- [07.3-Dispatch orders](../../C-UX-Scenarios/07-tanvir-promises-stock-while-the-customer-waits/07.3-dispatch-orders/07.3-dispatch-orders.md)
- [08.1-Stock counts](../../C-UX-Scenarios/08-rafiq-runs-the-weekly-count/08.1-stock-counts/08.1-stock-counts.md)
- [08.2-Count lines (blind)](../../C-UX-Scenarios/08-rafiq-runs-the-weekly-count/08.2-count-lines/08.2-count-lines.md)
- [09.1-sign-up](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.1-sign-up/09.1-sign-up.md)
- [09.2-settings-warehouses](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.2-settings-warehouses/09.2-settings-warehouses.md)
- [09.7-purchase-orders](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.7-purchase-orders/09.7-purchase-orders.md)
- [10.1-Sign in](../../C-UX-Scenarios/10-karim-signs-in-on-the-shared-phone/10.1-sign-in/10.1-sign-in.md)
- [10.2-Change temporary password](../../C-UX-Scenarios/10-karim-signs-in-on-the-shared-phone/10.2-change-temporary-password/10.2-change-temporary-password.md)
- [10.3-Settings: Me](../../C-UX-Scenarios/10-karim-signs-in-on-the-shared-phone/10.3-settings-me/10.3-settings-me.md)
- [11.1-Owner recovery](../../C-UX-Scenarios/11-haque-recovers-his-account/11.1-owner-recovery/11.1-owner-recovery.md)

---

## Related Components

- [Offline Banner [alt-001]](offline-banner.md) - appears directly under the app bar while offline
- [Side Nav [nav-001]](side-nav.md) - desk navigation beside the content
- [Focus Ring [div-001]](focus-ring.md) - Back button focus

---

## Open Questions

1. Desk app bar: DESIGN.md does not say whether the Business name sits left or right of the User name, or how it wraps at 600–1023px.

---

## Version History

**Created:** 2026-10-24  
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created from DESIGN.md frontmatter `components.app-bar` (WDS Phase 7, Create).

---

## Notes

Component reference for page specs:

```yaml
component_reference:
  id: bar-001
  name: App Bar
  key: app-bar
  file: D-Design-System/components/app-bar.md
```

Variant explosion check (step-08d): 3 variants, within the recommended maximum of 5.
