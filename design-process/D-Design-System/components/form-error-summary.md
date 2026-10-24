# Form Error Summary [alt-101]

**Type:** Feedback
**Category:** Alert (form validation)
**Purpose:** After a failed submit with two or more problems, list every problem at the top of the form, each as a link that moves focus to the field to fix.

---

## Overview

Desk forms in Mojud validate on blur (touched fields) and on submit. When a submit finds **2 or more** errors, the Form Error Summary appears at the top of the form: a count sentence ("3 fields need fixing:") and one link per error, in the same order as the fields. Each link moves focus to its field. With exactly **1** error there is no summary; focus moves straight to that field.

The same block also carries **form-level messages** that do not belong to one field: a server refusal (phone number already used) or a save failure ("Couldn't create the business. Try again." + Try again).

It is built from [Refusal Message](./refusal-message.md) tokens (4px `danger` left bar, `danger` text, `body-strong`) so a problem looks the same everywhere in the product. Inline field errors stay under each field; the summary never replaces them.

Page specs call it "form error summary" ([09.1 Open Question 7](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.1-sign-up/09.1-sign-up.md), [09.2 Open Question 4](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.2-settings-warehouses/09.2-settings-warehouses.md)).

---

## Variants

| Variant | Content | Pages |
|---|---|---|
| **field list** (default) | Count sentence + list of links, one per field error, using the inline error text | 09.1, 09.2, 09.4, 09.5, 09.6 |
| **line list** | Same, but line errors are prefixed with the line: "Line 2: Enter the unit cost." Header-field errors come first, then lines in order | 09.7 (and any [Line-item Editor](./line-item-editor.md) form, 07.3) |
| **form message** | One sentence, no list, optionally with a [Button Secondary](./button-secondary.md) "Try again". For server or save errors and for generic refusals that must not say which field is wrong | 09.1 server error / phone in use, 09.2 "Couldn't save. Try again.", 11.1 `recovery-message` (same styling) |

A form message and a field list can show together (server refusal plus field errors): the form message first, then the count sentence and links.

---

## States

**Required States:**

- hidden (no submit yet, or no errors)
- shown (errors listed)
- updated (resubmitted, different errors)
- link hover / focus

**Optional States:**

- form message with Try again
- retrying (Try again pressed)

**State Descriptions:**

| State | Appearance and behaviour |
|---|---|
| **Hidden** | Not rendered and takes no space. Inline errors may still show on blurred fields. |
| **Shown** | Block at the top of the form (after the form title, before the first field): alert icon + count sentence in `body-strong` `danger`; under it a list of links in `body`, `danger`, always underlined. Focus moves to the block (see Behavior). |
| **Updated** | On the next submit the contents are replaced, not re-created: fixed fields drop out of the list, new ones appear. When everything is valid the block is removed and the form submits. The block does not change while the User types (inline errors update on blur). |
| **Link hover** | Underline thickens (2px); no color change. |
| **Link focus** | [Focus Ring](./focus-ring.md) around the link. |
| **Form message + Try again** | Sentence in `body-strong` `danger`, then a 48px "Try again" secondary button. Typed values are always kept. |
| **Retrying** | Try again shows a spinner inside the button and `aria-disabled`; the retry reuses the same request ID (FR-14) so nothing is created twice. |

No disabled, loading or empty state of its own. Offline never produces a summary: submit buttons are already disabled with "Needs internet" visible.

---

## Styling

### Visual Properties

**Size:** Full form width. Each link row min `{spacing.target-min}` tall (links are targets). Try again min `{spacing.target-min}`.

**Shape:** No radius on the left bar; block corners square on the bar side, matching [Refusal Message](./refusal-message.md).

**Colors:**
- Background `{colors.surface}`.
- Left bar 4px `{colors.danger}`.
- Count sentence and links `{colors.danger}` (7.2:1 light, 8.3:1 dark on surface).
- Alert icon `{colors.danger}`.

**Typography:**
- Count sentence / form message `{typography.body-strong}`.
- Error links `{typography.body}`, underlined.

**Spacing:**
- Padding `{spacing.3}` vertical, `{spacing.4}` horizontal (left of the bar).
- Icon to sentence `{spacing.2}`; sentence to list `{spacing.2}`; between links `{spacing.2}` (≥ minimum target gap).
- Block to first field `{spacing.5}`.

### Design Tokens

```yaml
colors:
  background: '{colors.surface}'      # dark: '{colors.surface-dark}'
  bar: '{colors.danger}'              # 4px left; dark: '{colors.danger-dark}'
  text: '{colors.danger}'             # dark: '{colors.danger-dark}'
  link: '{colors.danger}'             # underlined; dark: '{colors.danger-dark}'
  icon: '{colors.danger}'             # dark: '{colors.danger-dark}'

typography:
  heading: '{typography.body-strong}'
  link: '{typography.body}'

spacing:
  padding-y: '{spacing.3}'
  padding-x: '{spacing.4}'
  item-gap: '{spacing.2}'
  link-min-height: '{spacing.target-min}'
  margin-below: '{spacing.5}'

effects:
  shadow: none
  base-component: '{components.refusal-message}'
  focus: '{components.focus-ring}'
```

### Figma Reference

Not applicable.

### Library Component

Not applicable.

---

## Behavior

### Interactions

**On submit with 2+ errors:** Render the block, move focus to it (the block has `tabindex="-1"` and is labelled by its count sentence), scroll it into view below the sticky app bar (`scroll-padding-top`). See Open Question 1 on announcement.

**On submit with exactly 1 error:** No block; focus moves to that field; its inline error is announced through `aria-describedby`.

**Click / Enter on a link:** Moves focus to the field (or, for a chip group, to the group's first chip; for a line, to the line's first invalid control) and scrolls it into view with its label visible above it. The field already shows its inline error.

**Form message:** Server and save errors replace the block's sentence; typed values are kept. "Try again" resends the same request.

**Hover:** Thicker underline on links.

**Keyboard:** Tab moves through the links in order, then into the form.

### Animations

None.

---

## Responsive Behaviour

| Width | Behaviour |
|---|---|
| **Phone, 320–599px** | Full width of the form inside the page gutter; long Bangla sentences wrap; links wrap onto several lines and keep 48px targets. |
| **Tablet / desktop** | Full width of the form (desktop detail panel min 26rem, or the centred sign-up card). |
| **200% text / 400% zoom** | Wraps; never truncates. |

---

## Accessibility

**ARIA Attributes:**
- Container: `tabindex="-1"`, `aria-labelledby` the count sentence; region kept in the DOM after first use so its contents can be replaced, not re-created.
- Links: real `<a href="#{field-id}">` elements (work without script); script moves focus to the control.
- Fields keep `aria-invalid="true"` and `aria-describedby` to their own inline error.
- Alert icon `aria-hidden="true"`.

**Keyboard Support:**
- Tab / Shift+Tab: through the links.
- Enter: go to the field.

**Screen Reader:**
On submit, the count sentence and the first error are read once ("3 fields need fixing: Name: Enter a name for the warehouse. …"). One announcement per submit; never repeated while the User types.

**Never color alone:** alert icon + the words of each error; links are always underlined.

**Targets:** each link ≥ `{spacing.target-min}` tall.

---

## Content Rules

- One language per User. Error text is the **same text** as the inline error under the field, so the User recognises it.
- Say what to do, calmly, no blame words ("Choose a supplier.", not "Invalid supplier").
- Line errors start with "Line {n}: " / "লাইন {n}: ".
- Western digits; no glyphs.
- Generic security messages (sign-in, recovery) never say which field is wrong (FR-2): use the form message variant, no field list.

| Translation Key | BN | EN | Source |
|---|---|---|---|
| `form.errorSummary` | "{n}টি ঘর ঠিক করতে হবে:" [BN: verify] | "{n} fields need fixing:" | 09.1, 09.2 |
| `common.saveError` | "সেভ করা যায়নি। আবার চেষ্টা করুন।" [BN: verify] | "Couldn't save. Try again." | 09.2 |
| `common.retry` | "আবার চেষ্টা করুন" [BN: verify] | "Try again" | 09.2 |
| `signup.error.create` | "ব্যবসা তৈরি করা যায়নি। আবার চেষ্টা করুন।" [BN: verify] | "Couldn't create the business. Try again." | 09.1 |
| `ERR_PO_LINE_COST` | "লাইন {n}: একক মূল্য দিন।" [BN: verify] | "Line {n}: Enter the unit cost." | 09.7 |
| `ERR_PO_LINE_DUP` | "লাইন {n}: {product} লাইন {m}-এ আগে থেকেই আছে।" [BN: verify] | "Line {n}: {product} is already on line {m}." | 09.7 |
| `ERR_WH_NAME_REQUIRED` | "গুদামের একটি নাম লিখুন।" [BN: verify] | "Enter a name for the warehouse." | 09.2 |
| `recovery.use.error.wrong` | "এই তথ্য সঠিক নয়। ফোন নম্বর আর রিকভারি কোড আবার দেখুন। [BN: verify]" | "These details are not correct. Check the phone number and recovery code." | 11.1 (form message variant) |

Plural note: "{n} fields need fixing" is only used for n ≥ 2, so no singular form is needed.

---

## Usage

### When to Use

- Any desk form with 3 or more fields, after a submit that finds 2 or more errors.
- Any form-level server or save error.

### When Not to Use

- Quantity limits on floor screens: use [Refusal Message](./refusal-message.md) under the quantity entry (with "Use max").
- Excel row errors: 09.3 lists them in its own error list (refusal-message style items without links).
- Live, per-keystroke validation: not used anywhere in Mojud.

### Best Practices

- Keep inline errors under fields; the summary is an index, not a replacement.
- Keep submit buttons enabled so validation can re-run and move focus (no dead buttons), except the documented server-limit cases.
- Never clear typed values on error. The one exception in the specs: 10.1 clears the password field after a refused sign-in.

---

## Used on Pages

**Pages:** 8

- [09.1 Sign up](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.1-sign-up/09.1-sign-up.md) — `sign-up-error-summary`, `sign-up-status-error` (form message + Try again).
- [09.2 Settings: Warehouses](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.2-settings-warehouses/09.2-settings-warehouses.md) — shared Settings form pattern (defines use for all Settings forms).
- [09.4 Settings: Products](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.4-settings-products/09.4-settings-products.md) — product form.
- [09.5 Settings: Suppliers](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.5-settings-suppliers/09.5-settings-suppliers.md) — supplier form.
- [09.6 Settings: Users](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.6-settings-users/09.6-settings-users.md) — user form.
- [09.7 Purchase orders](../../C-UX-Scenarios/09-haque-sets-up-his-business/09.7-purchase-orders/09.7-purchase-orders.md) — line list variant ("Line 2: Unit cost missing" style).
- [11.1 Owner recovery](../../C-UX-Scenarios/11-haque-recovers-his-account/11.1-owner-recovery/11.1-owner-recovery.md) — `recovery-message` (form message variant styling).
- [10.1 Sign in](../../C-UX-Scenarios/10-karim-signs-in-on-the-shared-phone/10.1-sign-in/10.1-sign-in.md) — generic sign-in refusal uses the same form message styling (FR-2).

---

## Related Components

- [Refusal Message](./refusal-message.md) — token source.
- [Input Field](./input-field.md) — inline error under each field.
- [Combobox](./combobox.md), [Line-item Editor](./line-item-editor.md) — sources of listed errors.
- [Button Secondary](./button-secondary.md) — Try again.

---

## Open Questions

| # | Question | Context | Status |
|---|---|---|---|
| 1 | Announcement and focus on submit: 09.1 makes the summary a `role="alert"` region ("one assertive region for the error summary") and its Form States say Create business "moves focus to the first error"; 09.2 Form States say Save "moves focus to the field". This file moves focus to the summary and does not use `role="alert"` (to avoid a double announcement) | Spec inconsistency between 09.1 sections and 09.2; needs one rule | 🔴 Open |
| 2 | Link color: `danger` underlined (this file) or `primary` like other links? `danger` keeps the block visually one message | DESIGN.md does not specify links inside a refusal | 🔴 Open |
| 3 | Count wording when field errors and a server message appear together | Not specified in any spec | 🔴 Open |
| 4 | Should 11.1 / 10.1 generic refusals be documented as this component's form message variant, or stay a separate "form message"? | 11.1 calls it "Form message" with refusal-message styling | 🔴 Open |

**Status Legend:** 🔴 Open | 🟡 In Discussion | 🟢 Resolved

---

## Version History

**Created:** 2026-10-24
**Last Updated:** 2026-10-24

**Changes:**

- 2026-10-24: Created component (WDS Phase 7, new; from 09.1 Open Question 7 and 09.2 Open Question 4).
