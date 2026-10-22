---
title: "Mojud - Experience"
name: Mojud
status: final
created: 2026-10-22
updated: 2026-10-23
sources:
  - _bmad-output/planning-artifacts/prds/prd-E2E_IAM-2026-10-22/prd.md
  - _bmad-output/planning-artifacts/prds/prd-E2E_IAM-2026-10-22/addendum.md
  - _bmad-output/planning-artifacts/briefs/brief-E2E_IAM-2026-10-22/brief.md
  - .memlog.md
  - .working/directions-1.html
  - .working/color-themes-1.html
---

# Mojud — Experience Spine

> This document (the experience "spine") says how Mojud behaves. Visual identity lives in `DESIGN.md`; its tokens are referenced as `{path.to.token}`. Product requirements live in the PRD and are cited by ID (FR-n, UJ-n, NFR-n), not repeated. "memlog" means the design decision log, `.memlog.md`.
>
> Spines win on conflict with mocks in .working/ or mockups/.

## Foundation

- **Form factor:** a responsive web app, **installable as a PWA** (FR-40), no app store and no native app (PRD §6). Two kinds of surface:
  - **Floor surfaces** — phone only, designed at 360px wide and working from 320 CSS px (NFR-3, WCAG 1.4.10), used standing, often one-handed, in dim or bright warehouses, sometimes offline. Used by Warehouse workers and Supervisors.
  - **Desk surfaces** — work on desktop browsers *and* phones (NFR-3). Used by Owner, Manager, Accountant and Sales rep (the Sales rep mostly on a phone, UJ-4).
- **UI system:** none chosen. [ASSUMPTION: no component library (shadcn, MUI…) is named; the PRD addendum says no technology stack has been chosen. If one is picked at architecture, DESIGN.md tokens override its defaults and this spine stays the behavioral delta.]
- **Visual identity:** `DESIGN.md` (Jamdani Teal, hybrid Calm Professional + Big & Bold floor). Light and dark both ship in v1 (memlog). [ASSUMPTION: mode follows the device setting by default, with a manual Light / Dark / Device switch in More → Settings.]
- **Languages:** Bangla and English, switchable at any time per User (FR-45). The whole interface shows the chosen language; only the Scan bar and floor primary buttons show both (memlog decision; Voice and Tone). Western digits in both (memlog, FR-45).
- **Offline data on each phone** (memlog decision): the open tasks for the User's Assigned Warehouses with their lines; the Product catalogue with Barcodes, Pack units and Conversion factors; and the last-known stock, always labelled "as of HH:MM". Anything else shows **"Not on this phone yet"** (State Patterns). [ASSUMPTION: last-known stock covers the Products in the User's Assigned Warehouses and refreshes on every online sync.]
- **Design rule above all others:** each routine floor action costs **at most one scan and one tap** when defaults are accepted (NFR-2, memlog). Blind screens are the one recorded exception (Interaction Primitives → Budget).

## Information Architecture

### Surfaces

Every PRD feature lands on a surface. "Journey" shows which Key Flow reaches it; "—" means no journey lands there (see *Surfaces without a journey* below). UJ-8 and UJ-9 are spine journeys, not PRD journeys.

| # | Surface | Kind | Roles (per FR-4) | Delivers | Journey |
|---|---|---|---|---|---|
| S1 | Sign up | Desk | New Owner | FR-1, one-time recovery code (FR-54) | UJ-8 |
| S2 | Sign in / Owner recovery / Change temporary password | Both | All | FR-2, FR-54 | UJ-8 |
| S3 | **My tasks** (+ "Send Transfer" button in its header) | Floor | Warehouse worker, Supervisor | FR-53; next task after every action; entry to FR-26 | UJ-1, UJ-2, UJ-5 |
| S4 | **Scan overlay** (camera, always-visible "Type code", Flag damage mode) | Floor, global | All with floor actions or search | FR-38, FR-39, FR-29; "Not found" → search, Manager links barcode | UJ-1, UJ-2 |
| S5 | **Product search** | Both | All | FR-8 | UJ-4 |
| S6 | **Product stock** (stock ladder per Warehouse, Stock value where allowed, movement history) | Both | All (value: Owner, Manager, Accountant) | FR-12, FR-17, FR-18; Reversal request entry (FR-15) | UJ-4 |
| S7 | **Receive PO** (blind) | Floor | Warehouse worker, Supervisor, Manager, Owner | FR-21, FR-22, FR-9 | UJ-1 |
| S8 | **Pick Dispatch order** | Floor | Same as S7 | FR-25, flag from Reserved (FR-29) | UJ-2 |
| S9 | **Flag damage** (scan-to-save mode on S4; bottom sheet for "Change qty/reason" and the no-camera path) | Floor | Warehouse worker, Supervisor (+ Manager, Owner) | FR-29 | UJ-2 |
| S10 | **Send Transfer** / **Receive Transfer** (blind) | Floor | Same as S7 | FR-26, FR-27, FR-28 | UJ-5 |
| S11 | **Count lines** (blind) | Floor | Assigned counters | FR-35 | UJ-7 |
| S12 | **Issues inbox** | Both | Owner, Manager, Supervisor (assigned), Sales rep (own Dispatch orders) | FR-31, FR-33 | UJ-3, UJ-5, UJ-6 |
| S13 | **Issue detail** (evidence, history, decisions, comment) | Both | As S12 | FR-32, FR-33a, FR-30, FR-37, FR-5 | UJ-3, UJ-5, UJ-6, UJ-7 |
| S14 | **Dispatch orders** (list, create, change, cancel) | Both | Sales rep, Manager, Owner | FR-23, FR-24 | UJ-4 |
| S15 | **Purchase orders** (list, create, close short) | Desk | Manager, Owner | FR-20, FR-22 | — (PO creation precedes UJ-1) |
| S16 | **Transfers** (incoming / outgoing list, "Send Transfer") | Both | Floor roles, Manager, Owner | FR-26–FR-28 status | UJ-5 |
| S17 | **Stock counts** (start, assign, progress, close) | Desk | Manager, Owner | FR-34, FR-36 | UJ-7 |
| S18 | **Owner view** + drill-down panel | Both | Owner, Manager, Accountant | FR-48, FR-49 | UJ-6 |
| S19 | **Low stock** | Both | All | FR-50 | — |
| S20 | **My record** | Both | All (own); Owner, Manager (anyone's) | FR-51, Sync conflict outcomes (FR-44) | UJ-9 |
| S21 | **Offline queue** | Floor | Anyone who recorded offline | FR-42, FR-44 | UJ-1 (edge case) |
| S22 | **Settings: Users** | Desk | Owner, Manager | FR-3, password reset (FR-54) | UJ-8 |
| S23 | **Settings: Warehouses** | Desk | Owner, Manager | FR-10 | UJ-8 |
| S24 | **Settings: Products** (create, edit, archive, thresholds, opening stock, barcode link) | Desk | Manager, Owner | FR-6, FR-7, FR-16, FR-38 link | UJ-8 |
| S25 | **Settings: Suppliers** | Desk | Manager, Owner | FR-19 | UJ-8 |
| S26 | **Settings: Excel import** (templates, upload, preview, confirm) | Desk | Manager, Owner | FR-46, FR-47 | UJ-8 |
| S27 | **Settings: Me** (language, theme, recovery code, install app, sign out) | Both | All | FR-45, FR-54, FR-40, FR-2 | — (spine-only by decision) |

### Home and navigation per Role

[ASSUMPTION: the home screen per Role and the tab set are not decided in the memlog or PRD. They are derived from the PRD JTBD table (§2.1) and the Calm Professional mock's "Tasks · Scan · More" tab bar.]

| Role | Home | Phone bottom tabs | Desktop side nav |
|---|---|---|---|
| Warehouse worker | My tasks (S3) | Tasks · Scan · More | — (phone only) |
| Supervisor | Issues inbox (S12) | Issues · Tasks · Scan · More | — (phone first) |
| Sales rep | Product search (S5) | Stock · Orders · Issues · More | Stock · Orders · Issues |
| Manager | Issues inbox (S12) | Issues · Stock · Counts · More | Overview · Issues · Stock · Orders · Counts · Settings |
| Owner | Owner view (S18) — UJ-6 "opens the owner view from home" | Overview · Issues · Stock · More | Overview · Issues · Stock · Orders · Counts · Settings |
| Accountant | Owner view (S18) | Overview · Stock · More | Overview · Stock |

- **Orders** groups Dispatch orders (S14), Purchase orders (S15) and Transfers (S16) as segments; each Role sees only the segments FR-4 allows.
- **More** holds Transfers (S16, for Warehouse workers and Supervisors, who have no Orders tab), Low stock (S19), My record (S20), Offline queue (S21) and Settings (S22–S27). The offline banner also links straight to S21.
- **Send Transfer** (FR-26) is reachable for Warehouse workers and Supervisors from a button in the My tasks header and from More → Transfers. Both open S10 in send mode.
- **Scan** is a tab *and* the fixed Scan bar on floor screens. What a scan does depends on where it happens (Interaction Primitives → When does a scan record). It never records a Stock movement by itself, except in Flag damage mode.
- Navigation depth: at most one level under a tab, plus one bottom sheet. Back always returns to the list it came from with scroll position kept.
- Buttons and tabs a Role cannot use are **hidden**; the server still enforces FR-4.

### Surfaces without a journey

UJ-8 (onboarding) reaches S1, S2, S22–S26; UJ-9 (My record) reaches S20. These are built from this spine's tables alone:

- **S27 Settings: Me**, **S15 Purchase orders**, **S19 Low stock** — no journey planned (decision).
- **Cross-Role sub-flows built from tables:** Reversal request and approval (S6 movement history → Reversal request Issue in S13, decided by a different Owner or Manager, FR-15, FR-5); Sync conflict decision (S13, Issue decisions table, FR-33a); Owner recovery with the recovery code (S2, FR-54).

## Voice and Tone

Rules for the words on screen (microcopy). Brand voice lives in `DESIGN.md` → Brand & Style.

- **Language display** (memlog decision): every string is in the User's chosen language — tabs, toasts, banners, chips, pills, cards, dialogs, desk screens, Reasons. **Two exceptions show Bangla and English together, Bangla first:** the **Scan bar**, and **floor primary buttons**: Confirm line, Save line, Flag damage (button and sheet button), Mark delivery complete, Finish receipt (Transfer), Confirm dispatch, Send Transfer (finish), and the confirm button of a dialog on a floor screen. This overrides the mocks' bilingual-everywhere text.
- **Bangla is first-class.** Write the Bangla string from the meaning, not word-for-word from English.
- **Western digits (0–9)** in both languages, always (memlog; FR-45). "৩টি" in mocks becomes "3টি".
- **Quantities read as units, never raw base counts:** "3 ctn + 5 pcs" / "3 কার্টন + 5 পিস" (FR-9).
- **Money in taka with the ৳ sign** and South Asian grouping, e.g. ৳12,45,000 (owner mock). Decided: lakh-style grouping in both languages.
- **Product, Supplier and customer names exactly as entered** — never translated (FR-45).
- **Short, plain, calm.** Say what happened and what to do next. No blame words ("you made an error"); the system protects the worker (PRD §1).
- **Refusals name the limit in the entry's units:** "Only 32 ctn available. Max 32 ctn." — never just "Invalid quantity" (FR-13).
- **Use PRD Glossary terms exactly** in English. One Bangla term per Glossary term, everywhere.
- **No glyph characters in UI strings** (no check marks, crosses, stars or emoji). Status is shown by an inline SVG icon next to the text (Accessibility Floor → Never color alone); the strings below are the text only.

| Do | Don't |
|---|---|
| "Saved" / "সেভ হয়েছে", with the success icon | "Success!" or "Operation completed" |
| "Saved on phone, will sync" (FR-52) | "Network error" |
| "Not applied – sent to supervisor" (FR-44) | "Sync failed" |
| "Only 32 ctn available. Max 32 ctn." | "Quantity exceeds limit" |
| "Sign-in details are not correct." (FR-2: don't say which field) | "Wrong password" |
| "Not on this phone yet — connect to look it up." | "Product not found" (when it may exist on the server) |

### UI glossary (Bangla + English)

English terms are the PRD Glossary terms and UI labels. [ASSUMPTION: every Bangla string below needs native-speaker review before build; ones marked † appear in the `.working/` mocks, the rest are new.] All numbers in these strings use Western digits.

**Stock and places**

| English | Bangla |
|---|---|
| Available | উপলব্ধ † |
| Reserved | বুক করা † |
| Damaged | ক্ষতিগ্রস্ত † |
| In transit | পথে আছে † |
| Unexplained | অব্যাখ্যাত † |
| On hand | হাতে আছে † |
| Promisable quantity | বিক্রয়যোগ্য পরিমাণ († "বিক্রয়যোগ্য") |
| Warehouse | গুদাম † |
| Product | পণ্য † |
| carton (ctn) / piece (pcs) | কার্টন † / পিস † |
| Pack unit / Base unit | প্যাক একক / মূল একক |
| Stock movement | মজুদ চলাচল |
| Stock value | মজুদের মূল্য † |
| Low stock / Low-stock threshold | কম মজুদ † / কম মজুদের সীমা |
| Supplier | সরবরাহকারী |
| SKU / Barcode | SKU / বারকোড |
| Unit cost | একক মূল্য |
| Write-off | বাদ দেওয়া (ক্ষতি হিসেবে) |
| verified | যাচাই হয়েছে |
| as of 10:42 | 10:42 পর্যন্ত |

**Documents, Roles and navigation**

| English | Bangla |
|---|---|
| Dispatch order | ডিসপ্যাচ অর্ডার († "ডিসপ্যাচ") |
| Purchase order / Receipt | ক্রয় অর্ডার / গ্রহণ († "গ্রহণ") |
| Transfer | স্থানান্তর |
| Stock count | মজুদ গণনা |
| Discrepancy case | গরমিল কেস † |
| Issues inbox / Issue | সমস্যার তালিকা / সমস্যা |
| Owner / Manager / Supervisor | মালিক / ম্যানেজার / সুপারভাইজার |
| Warehouse worker / Sales rep / Accountant | গুদাম কর্মী / সেলস প্রতিনিধি / হিসাবরক্ষক |
| My tasks / My record | আমার কাজ † / আমার রেকর্ড |
| Overview / Stock / Orders / Counts | সারসংক্ষেপ † / মজুদ / অর্ডার † / গণনা |
| Tasks / Issues / More / Settings | কাজ / সমস্যা / আরও / সেটিংস † |
| Offline queue | অফলাইন সারি |
| Search | খুঁজুন |
| Sign in / Sign out | সাইন ইন / সাইন আউট |
| Password / Recovery code | পাসওয়ার্ড / রিকভারি কোড |

**Actions and messages**

| English | Bangla |
|---|---|
| Scan | স্ক্যান করুন † |
| Type code | কোড লিখুন |
| Close / Go back | বন্ধ † / ফিরে যান |
| Flag damage | ক্ষতি জানান † |
| Change qty/reason | পরিমাণ/কারণ বদলান |
| Confirm line / Save line | লাইন নিশ্চিত করুন / লাইন সেভ করুন |
| Mark delivery complete | ডেলিভারি সম্পূর্ণ |
| Finish receipt | গ্রহণ সম্পন্ন করুন |
| Confirm dispatch | ডিসপ্যাচ নিশ্চিত করুন |
| Send Transfer | স্থানান্তর পাঠান |
| Use max | সর্বোচ্চ দিন |
| Assign to… | দায়িত্ব দিন… |
| Open to decide | খুলে সিদ্ধান্ত নিন |
| Review | দেখুন † |
| History / Comment | ইতিহাস † / মন্তব্য † |
| Sent / Difference / Open | পাঠানো † / পার্থক্য † / খোলা † |
| New / In progress / Current | নতুন / চলছে / বর্তমান |
| Done | সম্পন্ন |
| Showing | দেখানো হচ্ছে |
| Previous month / Next month | আগের মাস / পরের মাস |
| Saved (shown with the success icon) | সেভ হয়েছে † |
| Saved on phone, will sync | ফোনে সেভ হয়েছে, নেট এলে সিঙ্ক হবে |
| Offline / Online | অফলাইন † / অনলাইন † |
| … actions waiting | …টি কাজ অপেক্ষায় † |
| Not synced | সিঙ্ক বাকি † |
| Not applied – sent to supervisor | প্রয়োগ হয়নি – সুপারভাইজারের কাছে পাঠানো হয়েছে |
| Needs internet | ইন্টারনেট লাগবে |
| Not found | পাওয়া যায়নি |
| Not on this phone yet | এই ফোনে এখনও নেই |
| Already decided by {name} at {time} | {name} {time}-এ সিদ্ধান্ত নিয়েছেন |
| Reason | কারণ † |

**Floor screen strings from the mockups**

[ASSUMPTION: drafts taken from the `mockups/` files; each needs native-speaker review before build.] {qty}, {n} and {total} are filled in at run time with Western digits.

| English | Bangla |
|---|---|
| Flag damage — scan the damaged item (Flag damage mode hint) | ক্ষতি জানান — ক্ষতিগ্রস্ত পণ্যটি স্ক্যান করুন |
| Flagged 1 ctn damaged (toast) | সেভ হয়েছে · 1 কার্টন ক্ষতিগ্রস্ত |
| Max 8 ctn (pick max line) | সর্বোচ্চ 8 কার্টন |
| Decrease cartons / Increase cartons (stepper names) | কার্টন কমান / কার্টন বাড়ান |
| Decrease pieces / Increase pieces (stepper names) | পিস কমান / পিস বাড়ান |
| counted / not counted yet | গোনা হয়েছে / এখনও গোনা হয়নি |
| Finish this delivery? (blind dialog title) | এই ডেলিভারি শেষ করবেন? |
| {n} of {total} lines counted. Lines with no count are saved as not received in this delivery. (blind dialog sentence) | {total}টির মধ্যে {n}টি লাইন গোনা হয়েছে। যে লাইন গোনা হয়নি, তা এই ডেলিভারিতে পাওয়া যায়নি হিসেবে সেভ হবে। |
| Receipt saved | গ্রহণ সেভ হয়েছে |
| Incoming Transfer (task card title) | স্থানান্তর গ্রহণ |

**Decision effect lines** (second line of an Issue decision button)

[ASSUMPTION: drafts from `mockups/key-issues-inbox.html` or new; native-speaker review needed.]

| English | Bangla |
|---|---|
| write off {qty} | {qty} বাদ |
| back to Available | উপলব্ধে ফেরত |
| open a count | গণনা খুলবে |
| not applied | প্রয়োগ হবে না |
| goes to Available · choose Warehouse (Found) | উপলব্ধে যাবে · গুদাম বাছুন |
| write off {qty} in transit (Transfer loss) | পথে থাকা {qty} বাদ |
| keep PO open / close line | ক্রয় অর্ডার খোলা থাকবে / লাইন বন্ধ হবে |
| extra stays Available / request Reversal | বাড়তি উপলব্ধে থাকবে / রিভার্সাল অনুরোধ |
| no change | কোনো পরিবর্তন নেই |

**Issue types (FR-33a)**

| English | Bangla |
|---|---|
| Damage flag | ক্ষতি জানানো † |
| Shortfall | কম ডেলিভারি |
| Over-delivery | বেশি ডেলিভারি |
| Transfer shortage | স্থানান্তরে ঘাটতি † |
| Transfer overage | স্থানান্তরে বেশি |
| Transfer overdue | স্থানান্তর দেরিতে |
| Discrepancy case | গরমিল কেস † |
| Dispatch short | ডিসপ্যাচে ঘাটতি |
| Sync conflict | সিঙ্ক দ্বন্দ্ব † |
| Reversal request | রিভার্সাল অনুরোধ |

**Decision labels (FR-33a, FR-37)**

| English | Bangla |
|---|---|
| Approve / Reject | অনুমোদন / প্রত্যাখ্যান |
| Accept short / Expect rest | কম মেনে নিন / বাকিটা আসবে |
| Accept / Correct count | মেনে নিন / গণনা সংশোধন |
| Found / Transfer loss | পাওয়া গেছে † / স্থানান্তরে ক্ষতি † |
| Sender undercounted / Recount | প্রেরক কম গুনেছেন / আবার গণনা † |
| Still coming | এখনও আসছে |
| Reduce order / Keep open | অর্ডার কমান / খোলা রাখুন |
| Discard | বাতিল † |
| Confirmed loss | নিশ্চিত হারানো † |
| Surplus confirmed / Surplus rejected (miscount) | বাড়তি নিশ্চিত / বাড়তি নয় (ভুল গণনা) |

**Reason codes**

| English | Bangla |
|---|---|
| received | গৃহীত |
| damaged | ক্ষতিগ্রস্ত † |
| expired | মেয়াদোত্তীর্ণ † |
| other | অন্যান্য † |
| dispatched | ডিসপ্যাচ হয়েছে |
| opening balance | প্রারম্ভিক মজুদ |
| count shortage | গণনায় ঘাটতি |
| transfer loss | স্থানান্তরে ক্ষতি † |
| confirmed loss | নিশ্চিত হারানো † |
| theft suspected | চুরির সন্দেহ |
| receiving error | গ্রহণে ভুল |
| picking error | পিকিংয়ে ভুল |
| unrecorded damage | রেকর্ড না হওয়া ক্ষতি |
| unknown | অজানা |

Conflict note: the owner mock labels "Damaged" losses as "নষ্ট"; the stock-state term is "ক্ষতিগ্রস্ত". Use one term — ক্ষতিগ্রস্ত — for the Stock state and the "damaged" Reason. [ASSUMPTION: native reviewer may prefer নষ্ট for the Reason.]

## Component Patterns

This section covers behavior only. Visual specs are in `DESIGN.md` → Components under the same names.

Mocks: Scan overlay (Flag damage mode), Floor primary button, Quantity entry pick pre-fill, Flag damage and offline toasts in [mockups/key-picking.html](mockups/key-picking.html); blind Quantity entry, Line completion and its Confirmation dialog in [mockups/key-receiving.html](mockups/key-receiving.html); Issue card and Issue decision buttons in [mockups/key-issues-inbox.html](mockups/key-issues-inbox.html); Owner metric tile and Drill-down panel in [mockups/key-owner-view.html](mockups/key-owner-view.html).

| Component | Where | Behavioral rules |
|---|---|---|
| **App bar** | Top of every screen | Shows the screen title, the signed-in User's name (floor screens; shared phones) and the online status as icon + text ("Online" / "Offline"), never color alone, so the screen always shows online or offline (FR-42). Sticky; compacts on short screens and scrolls away only below 20rem tall (DESIGN.md → Layout). |
| **Scan bar** | Fixed bottom of every floor screen (S3, S6, S7, S8, S10, S11) | One tap opens the **Scan overlay** (S4). What the scan then does follows Interaction Primitives → When does a scan record. Camera denied or unsupported → tapping the bar opens Type code directly (FR-39). Never covered by the keyboard: it hides while a field is focused and returns on blur. |
| **Scan overlay** | S4, opened from the Scan bar, a Product field's scan button, or Flag damage | `role="dialog"` named "Scan" (or "Flag damage — scan the damaged item" in Flag damage mode). On open, focus goes to the dialog heading; the camera starts (permission asked the first time only). **"Type code" is always visible**, not only on camera failure: it opens a field that takes a Barcode, SKU or name search; choosing a result acts exactly like a scan, except in Flag damage mode, where it opens the pre-filled Flag damage sheet. **Close** (and Escape / Back) closes without doing anything and returns focus to the control that opened it. After about 8 s without a read the hint changes to "Can't scan? Type the code." On a read: short vibration where supported, the overlay closes, and the polite live region announces the match ("Rice 25 kg selected, 8 ctn" / "Rice 25 kg — Flagged 1 ctn damaged"). The camera closes after every successful scan. Unknown Barcode → "Not found" with search (FR-38); offline and not in the catalogue on the phone → "Not on this phone yet". |
| **Floor primary button** | Selected line (Confirm line, Save line); end of task lists (Mark delivery complete, Finish receipt, Confirm dispatch, Send Transfer) | Disables on tap until saved (FR-14). After saving, the toast shows, the line shows its new state, and focus returns to the Scan bar. Line buttons sit directly under the line's quantity entry, inside the scrolling content, and scroll into view above the fixed zone and the keyboard. |
| **Stock ladder** | S6; compact version in S5 results | Shows On hand → − Damaged → − Reserved → **Promisable** per Warehouse, plus In transit and Unexplained totals (FR-12). One ladder per Warehouse the User can see; the User's own Warehouse first. Shows "as of HH:MM" (FR-12); offline it reads "as of HH:MM (offline)" (FR-42). Each row is a 48px target that opens movement history filtered by that state. The stacked bar is hidden from screen readers; the rows carry every value. |
| **Stock-state pill** | Ladder, task lines, Issue cards | Always icon + label + quantity; never color alone. Read as "Damaged, 8 cartons". |
| **Quantity entry** | S7, S8, S9, S10, S11, S14 | Carton and piece rows (FR-9), stacked on phones; stored in Base units. Pre-fill follows the screen: **pick** (S8) = the full remaining line quantity; **Flag damage sheet** = 1 of the scanned unit or the saved flag's quantity; **blind screens and Send Transfer** = empty (no default), with the scanned unit's row focused. − / + steppers (64px) allow entry without typing; typing uses the numeric keypad. Pieces ≥ Conversion factor roll into cartons on blur ("27 pcs" → "1 ctn + 3 pcs" for 24/ctn). Shows the max inline when a limit exists (Dispatch order: Promisable; pick: remaining on the line). Blind screens (S7, S10 receive, S11) **never** show expected, ordered, sent or system quantities (FR-21, FR-27, FR-35). |
| **Task card** | S3, S7, S8, S10, S11 | Tap opens the task (the whole card is one target; it holds no other buttons). The current line has the left bar. Picks show progress "12 / 20 ctn"; blind screens show only "counted 12 ctn". Status tag shows New, In progress, Done or Not synced. |
| **Task status tag** | Task cards | Display only, not tappable. "New" until the first line is saved; "In progress" after; "Done" when the task is finished (every line picked or counted, or the finishing button confirmed); "Not synced" while any of its lines is queued, shown in place of the others. A line on its own also shows "Done" once fully picked or counted. [ASSUMPTION: these four values.] |
| **Line completion** | S7, S8, S10 receive | **Mark delivery complete** (S7), **Finish receipt** (S10 receive) and **Confirm dispatch** (S8) are available at any time — not only when every line is counted — at the end of the line list. Each opens a Confirmation dialog. S7 / S10: "Finish this delivery? 3 of 5 lines counted. Lines with no count are saved as not received in this delivery." (counts lines, never quantities, so it stays blind; FR-21, FR-22). S8: shown only when lines are short — "2 lines are short. Short quantities stay Reserved." (FR-25). |
| **Flag damage** | Flag damage button above the Scan bar on S6 and S8 | Tap **Flag damage** → the Scan overlay opens in **Flag damage mode** → **the scan itself saves** 1 of the scanned unit (Pack barcode → 1 carton, Base barcode → 1 piece) with Reason "damaged" (FR-29; memlog decision). One tap + one scan. On S8 it flags from Reserved on that order's line and a replacement is reserved automatically; a Product not on the order flags from Available. On S6 it flags from Available at the User's Warehouse. [ASSUMPTION: Product not on the order flags from Available.] The toast reads "Flagged 1 ctn damaged" with a **Change qty/reason** action. Close exits the mode without saving. If nothing is Available or Reserved to flag, nothing is saved and a Refusal states the max. Without a camera, Flag damage opens the sheet with a Product field (type or search). |
| **Flag damage** (sheet) | Opened by "Change qty/reason", Type code in Flag damage mode, or the no-camera path | Pre-filled: Product, quantity, Reason "damaged". Reason chips: damaged / expired / other; optional note. The sheet's one big button saves. From "Change qty/reason" it records a correction linked to the saved flag; the original record is never edited (FR-11). [ASSUMPTION: how the correction is recorded is an architecture decision; it must stay append-only.] "Change qty/reason" is also available on the flag in My record until the flag is decided. [ASSUMPTION] |
| **Bottom sheet** | S9 and small pickers | Over a scrim; page behind is inert; focus moves into the sheet and is trapped; Close, Escape and Back close it and return focus. Tapping the backdrop closes the sheet only when nothing has been changed; once a field is changed, the backdrop does nothing and only Close or the save button leave. |
| **Confirmation dialog** | Actions listed in Interaction Primitives → Confirm vs undo | `role="alertdialog"`; title is a question, description is the one-sentence consequence. Labels name the action ("Finish delivery", "Cancel order"), never "OK". Initial focus on **Go back**. Escape / Back = Go back. The backdrop does nothing. Confirm uses danger style when it cancels, removes or deactivates something. |
| **Issue card** | S12 | Shows type, Product, Warehouse, quantity, value at risk, raised by, age (FR-31) — e.g. "Damage flag · Rice 25 kg · 1 carton · Narayanganj · Karim · 14:05". The **title is a link** to Issue detail (S13); the decision buttons are **sibling buttons**, never inside a tappable card. Card buttons follow the Issue decisions table below; a decision on the card is **one tap** (FR-30). If FR-5 blocks this User, no buttons show, only "You raised this — another person must decide". |
| **Issue decision button** | S12 cards, S13 | Two-line label: decision + effect, e.g. "Approve · write off 1 ctn". The button grows taller instead of shrinking text (Bangla ≥ 16px). One tap decides; no dialog (FR-30). Offline: disabled, with "Needs internet" shown beside it. |
| **Issue detail** | S13 | Evidence (both counts, both Users, both times for Transfer Issues, FR-28; counted vs On hand for Discrepancy cases, FR-37), history, all decisions for the type, optional comment, and (Owner/Manager) "Assign to…" (FR-33). Decisions needing a choice open one small picker: Transfer shortage "Found" asks which Warehouse; "Confirmed loss" asks a Reason from the FR-37 list. |
| **Offline banner** | Under the app bar while offline | Appears within 2 s of losing connection, stays until back online. Shows count of queued actions (FR-42). Tap opens Offline queue (S21). When online with items still syncing it shows "Syncing 3…", then disappears. From 20 h of queued actions it changes to "Connect within 4 hours to keep recording" (State Patterns). Never blocks recording. |
| **Sync-status chip** | Queued lines in S3, S7–S11, S21, S20 | "Not synced" while queued; disappears when the server accepts; turns into "Not applied – sent to supervisor" if refused (FR-44). Tapping the refused chip (48px target) explains why and shows the Issue it raised. |
| **Confirmation toast** | After every action | "Saved" (with the success icon) online or "Saved on phone, will sync" offline (FR-52). Above the fixed bottom zone; never covers the focused element or the save button (moves under the app bar if it would). A toast moved under the app bar may briefly cover the first list item, but never the focused element. Stays 5 s or until the next action, whichever comes first; a toast with an action ("Change qty/reason") stays at least 10 s. Rapid saves combine ("Saved 3 lines"). Does not steal focus or block the next scan. The next task is already on screen underneath (FR-53, FR-25). No Undo button (Decided — see Interaction Primitives). [ASSUMPTION: 5 s and 10 s.] |
| **Refusal message** | Under quantity entry; Issue detail | Shown when a quantity exceeds what the no-negative rule allows (FR-13), stating the max in the entry's units. Checked as the User types with about 0.5 s pause, announced once per change. Offers one "Use max" button. Save stays disabled (focusable, with the reason in its description) until the quantity is valid. [ASSUMPTION: "Use max" shortcut.] |
| **Disabled button** | Any | Stays focusable (`aria-disabled`) and its reason is visible next to it ("Needs internet", "Enter a quantity"), not only in a tooltip. |
| **Product search field** | S5, S14, S24, Type code | Results while typing (FR-8, NFR-1: < 1 s), case-insensitive, Bangla or English names, SKU or barcode. Each result shows name, SKU and the compact ladder (Promisable per Warehouse) so a Sales rep has the answer without opening the Product (UJ-4). Offline: searches the catalogue on the phone, stock "as of". |
| **Owner metric tile** | S18 | The whole tile is one target that opens the **drill-down panel** for that figure (FR-49). While its panel is open the tile is **selected** (`aria-expanded="true"`, "Showing" tag); only one tile is selected at a time. |
| **Losses by Reason** | S18 | Rows, not a chart: damaged, expired, other, transfer loss, confirmed loss, then the total, for the chosen month (FR-48). Unexplained is its own tile with the current value. Each row opens the drill-down for that Reason. |
| **Month selector** | S18 losses | Previous / next month buttons named "Previous month" / "Next month"; the month name in the chosen language. Defaults to the current month; next is disabled on the current month. Changes only the loss figures; Stock value, Unexplained and open Issues are always "now". |
| **Drill-down panel** | S18 | Lists the Issues or Stock movements behind the figure: Product, quantity, value, User, time (FR-49), highest value first. [ASSUMPTION: sort order.] Each row opens S13 or the movement. On open, focus moves to the panel heading; Close (desk) or Back (phone) returns focus to the tile. Empty: "No open discrepancy cases." (or the matching sentence). |
| **Bottom tab bar / Side nav** | All home surfaces | Tabs per Role (IA table). Labels in the chosen language only. Side nav marks the current item with `aria-current="page"`. |
| **Count badge** | Issues tab and side-nav item only | Count of open Issues the User can decide. The tab's name includes it ("Issues, 4 open"). Hidden at 0. [ASSUMPTION: a count badge on the Issues tab only; no other badges, no notifications (PRD §6).] |
| **Language switch** | S27, and on S2 before sign-in | One tap toggles বাংলা / English; applies instantly without reload and is remembered for the User (FR-45). |

### Issue decisions per Issue type

From FR-33a and FR-37 (card buttons for Damage flag, Transfer shortage and Sync conflict mocked in [mockups/key-issues-inbox.html](mockups/key-issues-inbox.html)). **Recommended** = filled button; **alternative** = outlined. Where a decision needs a choice, or the type needs its evidence read first, the card shows one outlined **"Open to decide"** button instead of decision buttons, so a write-off is never the only one-tap option.

| Issue type | Card buttons (one tap) | Recommended (filled) | Alternative (outlined) | Detail only because |
|---|---|---|---|---|
| Damage flag | Approve · write off {qty}; Reject · back to Available | Approve | Reject | — |
| Shortfall | Expect rest · keep PO open; Accept short · close line | Expect rest [ASSUMPTION] | Accept short | — |
| Over-delivery | Accept · extra stays Available; Correct count · request Reversal | Accept [ASSUMPTION] | Correct count | — |
| Transfer shortage | Open to decide | Found (asks Warehouse) [ASSUMPTION] | Transfer loss · write off {qty} | Found needs a Warehouse |
| Transfer overage | Recount · receiver counts again; Sender undercounted · move {qty} | Recount [ASSUMPTION] | Sender undercounted | — |
| Transfer overdue | Still coming · check in 24 h; Transfer loss · write off {qty} | Still coming [ASSUMPTION] | Transfer loss | — |
| Discrepancy case (shortage) | Open to decide | Found · back to Available [ASSUMPTION] | Confirmed loss (asks Reason) | Confirmed loss needs a Reason; evidence first |
| Discrepancy case (surplus) | Open to decide | Surplus rejected · no change [ASSUMPTION] | Surplus confirmed · add {qty} | Evidence first (FR-37) |
| Dispatch short | Keep open · line stays open; Reduce order · reduce line | Keep open [ASSUMPTION] | Reduce order | — |
| Sync conflict | Recount · open a count; Discard · not applied | Recount [ASSUMPTION] | Discard | — |
| Reversal request | Open to decide | Approve · record Reversal [ASSUMPTION] | Reject · no change | Original movement must be seen first |

## State Patterns

| State | Where | Treatment |
|---|---|---|
| **Empty — My tasks** | S3 | "All tasks done for today" with today's short summary (dispatched, received, flagged) from My record (Calm mock). Scan bar and "Send Transfer" stay. |
| **Empty — Issues inbox** | S12 | "No open issues." Plain; no celebration. |
| **Empty — lists** (orders, counts, low stock, search, offline queue, My record) | S14–S17, S19, S5, S21, S20 | One line saying what will appear here and, where the Role can create, one button ("Create Dispatch order"). Search: "No product found for '…'" + "Scan instead". |
| **First use (no data)** | S18, S6 for a new Business | Points the Manager/Owner to Settings: add Warehouses, Products, opening stock or Excel import (FR-16, FR-46). [ASSUMPTION: copy and order of setup steps.] |
| **Loading** | All | Skeleton rows in the shape of the content (`aria-busy="true"` on the region); never a blank screen. Last known data shows immediately with "as of HH:MM" while fresh data loads. Spinner only inside buttons while saving (< 2 s, NFR-1). |
| **Offline** | All | App bar shows "Offline"; offline banner with queue count. Floor actions listed in FR-41 work and queue, using the data on the phone (Foundation → Offline data). Other actions (create Dispatch order, decide Issues, settings) are disabled with "Needs internet" shown beside them. Stock figures read "as of HH:MM (offline)" (FR-42). Decided: deciding Issues needs a connection, as FR-41 lists only floor actions. |
| **Not on this phone yet** | S4, S5, S6, task lists (offline) | A scanned Barcode or searched Product that is not in the catalogue on the phone, or stock never loaded on it: "Not on this phone yet — connect to look it up." Nothing is recorded. A task assigned while the phone was offline appears after the next sync. |
| **Offline too long — warning** | All floor screens | From 20 h of queued actions the banner reads "Connect within 4 hours to keep recording. Your saved work is safe." Announced once. [ASSUMPTION: 4 h warning, follows FR-41's provisional 24 h.] |
| **Offline too long** | All floor screens | At 24 h of queued actions: "Connect to Wi-Fi or mobile data to keep recording. Your saved work is safe." Recording pauses after the line being entered is finished — it never interrupts a line (FR-41). Queue is kept. |
| **Never signed in online on this device** | S2 | Offline sign-in is refused: "Connect once to sign in on this phone" (FR-41). |
| **Sign-in paused** | S2 | After 5 failed tries: "Too many tries. Try again in 15 minutes." as text, announced once, no ticking countdown (FR-2). |
| **Syncing** | Banner, chips | "Syncing 3…" counting down; chips clear one by one in the order recorded (FR-43). No action needed. |
| **Sync conflict** | Chip, S21, S20 | Line marked **"Not applied – sent to supervisor"** (FR-44) in the queue and My record, with the reason (e.g. "would make stock negative"). The worker does nothing else; the Supervisor gets a Sync conflict Issue. Never silently dropped. |
| **Refused by the no-negative rule** | Quantity entry (online) | Inline Refusal message with the max; save disabled until fixed (FR-13). Concurrent change (NFR-4) → "Stock changed just now. Max is now 30 ctn." with focus moved to "Use max". |
| **Refused by segregation of duties** | S13, S7, S10 receive | Plain sentence naming the rule: "You sent this Transfer, so someone else must receive it." (FR-5). Owner self-approval, when allowed, shows a second-step "Approve as Owner (marked self-approved)". |
| **Already decided** | S12, S13 | When another User decided or reassigned the Issue first (NFR-4): "Already decided by Nasima at 14:20: Approve." (or "Assigned to {name}"). Nothing changes stock twice; the card leaves the list and focus moves to the next card. |
| **Blind** | S7, S10 receive, S11 | No expected quantity anywhere — not on screen, not in the page code, `aria-*` attributes or hidden text — including after save and in the Mark delivery complete dialog (FR-21, FR-27, FR-35). After finishing, the worker sees only "Receipt saved"; any Shortfall goes to the Supervisor, not to the worker's screen (UJ-1). |
| **Error — server / unknown** | All | "Something went wrong. Your work is saved on this phone." if queued; otherwise "Couldn't save. Try again." with a Retry button. Never lose typed quantities. |
| **Not found (barcode)** | S4 (online) | "Not found" + search field; Manager also sees "Link this barcode to a product" (FR-38). |
| **Not in this task** | S7, S8, S10, S11 | A scanned Product that is not on the open task: "Not on this order" (or delivery / Transfer / count). Nothing is recorded. |
| **Camera permission denied / unsupported** | S4 | "Camera not available — type the code or search" with the field focused (FR-39). Scan bar label changes to match. |
| **Permission (Role)** | All | Actions outside the Role are hidden; deep links to a hidden screen show "You don't have access to this." |
| **Focus** | All | Visible `{components.focus-ring}` on keyboard focus; after a save, focus returns to the Scan bar on floor screens. |
| **Dark mode** | All | Same layouts; tokens swap to `-dark` set. Hatched, dotted and dashed state patterns stay visible. |

## Interaction Primitives

- **When does a scan record?** A scan **only identifies a Product and pre-fills**. It never records a Stock movement by itself — **except in Flag damage mode, where the scan saves** (memlog decisions). Scans inside a task never auto-record. Scanning the same Product again re-selects its line and changes nothing.

  | Where the scan happens | What the scan does | What records it |
  |---|---|---|
  | Scan tab, My tasks, S5, S6 (no mode) | Opens Product stock (S6) | — |
  | Pick Dispatch order (S8) | Selects the line and pre-fills the **full remaining line quantity** | One tap on **Confirm line** (adjust first if short) |
  | Receive PO (S7), Receive Transfer (S10), Count lines (S11) — blind | Selects the line, sets the unit from the Barcode, quantity **empty**, focus in the field | Type or step the count, tap **Save line** |
  | Send Transfer (S10) | Adds or selects the Product line, unit from the Barcode, quantity empty | Type or step the count, tap **Save line** |
  | **Flag damage mode** (after tapping Flag damage on S6 or S8) | **Saves** 1 of the scanned unit as damaged, Reason "damaged" | The scan itself |
  | Any Product field (S14, S24, search) | Fills the field | The form's own save |

- **Budget: one scan + one tap** per routine floor action with defaults accepted (NFR-2):
  - **Pick a line:** 1 scan + 1 tap (Confirm line). Ticking a line without scanning is also allowed: Confirm line alone (FR-25).
  - **Flag damage:** 1 tap (Flag damage) + 1 scan.
  - **Receive a line / count a line (blind):** 1 scan + the count + 1 tap. **Recorded exception to NFR-2:** blind screens have no quantity default, because any default would be a guess or a hint at the expected quantity (FR-21, FR-27, FR-35). Steppers allow entry without typing.
  - Any other floor design that needs a second tap on the default path fails this spine.
- **Tap to act.** No swipe-only, long-press-only or double-tap-only actions. Anything a gesture does must also be a visible button.
- **Target sizes:** every interactive element ≥ `{spacing.target-min}` (48px), including chips, links, banners and list rows; floor secondary controls `{spacing.target-floor-secondary}` (56px); floor primary buttons `{spacing.target-floor}` (64px) everywhere; the Scan bar `{spacing.scan-bar-height}` (72px). At least `{spacing.2}` (8px) between adjacent targets.
- **Glove- and thumb-friendly:** primary actions in the bottom third of the screen; no small icons as the only control; steppers are 64px; nothing important in the top corners on floor screens.
- **Defaults do the work:** pick quantity = remaining on the line; Flag damage = 1 of the scanned unit; Reason defaults per action (FR-29); current Warehouse defaults to the User's own. Blind screens: no quantity default (above).
- **Duplicate-safe:** every save button disables on tap until done; double taps never record twice (FR-14).
- **Confirm vs undo policy (Decided):** v1 has no Undo. The PRD makes every Stock movement permanent (FR-11) and corrections go through Reject or a Reversal approved by a second person (FR-15) instead. "Change qty/reason" after a Damage flag is a linked correction, not an undo.
  - **No confirmation dialog** on routine floor actions (save a receive line, confirm a pick line, flag damage, save a count line, send/receive Transfer line) or on one-tap Issue decisions (FR-30) — a dialog would break the budget. The decision button's label states its effect ("Approve · write off 1 ctn").
  - **Confirmation dialog** only for actions that close or remove something in one go: Mark delivery complete (S7), Finish receipt (S10), Confirm dispatch with lines short (S8), Close Stock count (S17), Cancel Dispatch order (S14), Close PO short (S15), Confirm Excel import (S26), Deactivate User / Warehouse, Archive Product, Regenerate recovery code. The dialog repeats the consequence in one sentence.
  - **Mistakes:** floor users tell a Supervisor; wrong Damage flags are fixed by "Change qty/reason" before a decision, or by Reject; Owner/Manager request a Reversal from movement history (S6).
- **Keyboard:** numeric keypad for quantities; Enter saves on desktop forms; the Scan bar hides while the on-screen keyboard is open.
- **Feedback on scan:** short vibration where the browser supports it (Decided), the overlay closes, the matched line is selected and keeps its current-line bar (not only a timed highlight), and the live region announces the match. [ASSUMPTION: no sound by default.]
- **Banned:** carousels, swipe-to-delete, infinite-scroll on Issues (it is ranked and finite), pop-up notifications (PRD §6), charts in v1 (owner figures are rows and tiles), animations longer than 200ms.

## Accessibility Floor

This section covers behavior only. Visual contrast lives in `DESIGN.md` → Colors.

- **Target:** WCAG 2.2 AA across both languages and both modes. [ASSUMPTION: the memlog says "high contrast" and "accessibility" are priorities; AA is the formal floor, and the token set already reaches AAA for body text.]
- **Never color alone:** Stock states, sync status, online/offline, selection and refusals always pair color with icon + text (and pattern for Damaged/Unexplained). Icons are inline SVG hidden from screen readers; the text label is the name. No emoji or font glyphs as icons.
- **Language of parts:** the page has `lang="bn"` or `lang="en"` for the chosen language. Bilingual labels (Scan bar, floor primary buttons) mark each part with `<span lang="bn">` and `<span lang="en">` and get their accessible name from that visible text — **no `aria-label` on bilingual controls**; the visible text starts the accessible name. User-entered names are not marked. QA with TalkBack with and without the Google Bangla voice installed.
- **Screen readers:** every control has a name in the current language. One polite live region (`role="status"`) and one assertive region exist from page load; their text is replaced, not re-created. Toasts, scan matches, online/offline changes and sync results go to the polite region; refusals to the assertive region, once per change.
- **Forms and errors:** invalid quantity fields set `aria-invalid="true"` and `aria-describedby` to the Refusal message; disabled save buttons use `aria-disabled` with the reason in their description.
- **Sign-in and recovery (S1, S2, S27):** paste and password managers are allowed on every field. Phone `autocomplete="tel"`, passwords `current-password` / `new-password`, recovery code `one-time-code`. Show-password toggle (48px). The recovery code is shown in groups and accepted case-insensitively with spaces and dashes ignored.
- **Focus:** focus order follows visual order; `:focus-visible` ring only for keyboard focus. Sheets and dialogs trap focus and return it on close; Escape / Back closes them. The focused element is never hidden under the app bar, the fixed bottom zone or a toast (`scroll-padding` per DESIGN.md → Layout).
- **Reflow and text size:** works at 320 CSS px wide and at 256 CSS px tall (400% zoom) with no loss of content or function, and at 200% text size; sizes are in rem. On short screens, landscape or large text, only the Scan bar stays fixed (DESIGN.md → Layout). Content survives WCAG 1.4.12 text-spacing overrides in both languages with no clipping or overlap (acceptance check). Labels wrap instead of truncating.
- **Orientation:** never locked; floor screens work in landscape.
- **Desk structure:** "Skip to content" link, `nav` and `main` landmarks, one `h1` per surface, a page title per route, and focus moves to the `h1` after a route change. In list + detail layouts, after a decision focus stays in the list and the removal is announced.
- **Reduced motion:** honor the device setting — no slide-ins, toasts appear without animation.
- **Time:** nothing important is shown only in a toast; the result is also visible on screen (line state, next task). Toast timings in Component Patterns. No timeouts on input except the FR-2 sign-in pause, which states its wait time. The 24 h offline cap is warned 4 h ahead.
- **Low literacy and new staff:** icons accompany every floor action label; NFR-11 (complete a Receipt and a Damage flag after a 10-minute demo, no manual) is the usability test bar, run with low-literacy participants and one TalkBack user.

## Responsive & Platform

- **Phone (320–599px):** single column, bottom tab bar, fixed Scan bar on floor screens, bottom sheets for small tasks, quantity entry stacked. Floor surfaces are designed for this size (360px reference).
- **Tablet / small laptop (600–1023px):** desk surfaces use two columns where useful (list + detail); the owner drill-down sits below the tiles. [ASSUMPTION: breakpoint values.]
- **Desktop (≥ 1024px):** side nav replaces the tab bar; Owner view, Issues, Stock counts, POs and Settings use list + detail layouts; the owner drill-down is a right-hand panel. No floor-only screens in desktop nav.
- **PWA:** installable (FR-40); an "Install app" entry in Settings → Me and a one-time prompt after first sign-in. [ASSUMPTION: one-time prompt.] Offline recording needs one online sign-in per device (FR-41).
- **Camera:** needs HTTPS and permission (addendum). Ask for camera permission the first time the Scan bar is tapped, not on load.
- **Shared phones:** open question (PRD §9 Q2). Until answered, sign-out stays one tap away in More, and the signed-in User's name shows in the app bar on floor screens so a shared phone never records under the wrong person (Decided).
- **Low-cost Android:** test on a low-end device in Chrome; Bangla rendering is checked there (addendum).

## Key Flows

Journey names and personas for UJ-1 to UJ-7 are verbatim from the PRD (§2.3). UJ-8 and UJ-9 are spine journeys added to close surface gaps (memlog); they reuse PRD personas.

### UJ-1. Rahim receives a supplier delivery without seeing the order.

Rahim, Warehouse worker, Narayanganj Warehouse, phone in hand at the loading bay.

Mock: [mockups/key-receiving.html](mockups/key-receiving.html) — steps 2-6: blind counting, the blind confirm dialog, then My tasks with the next task.

1. Rahim opens Mojud; home is **My tasks** (S3). The Sent PO shows as a task card (FR-53).
2. He taps it. **Receive PO** (S7) lists the Products with no ordered quantities (FR-21).
3. He taps the **Scan bar** and scans a carton's Barcode. The overlay closes and the line is selected with the carton row focused and empty — nothing is recorded yet.
4. He types the counted cartons — 92 — and taps **Save line**. Toast "Saved" (FR-52). This is the blind-screen exception to the budget: scan + count + tap.
5. He repeats for each line he has goods for, then taps **Mark delivery complete** — available at any time — and confirms in the one dialog ("3 of 3 lines counted").
6. **Climax:** the screen shows "Receipt saved" and the **next task** is already in front of him (FR-53). He never sees the 100 ordered; the Shortfall Issue goes quietly to a Supervisor's inbox (FR-22).

Failure path — network drops midway: the app bar shows "Offline" and the banner appears; each Save shows "Saved on phone, will sync" and lines carry "Not synced" chips (FR-41, FR-42). When the connection returns they sync in order (FR-43). If the server refuses one, its chip becomes "Not applied – sent to supervisor" (FR-44). A Product whose Barcode is not on the phone shows "Not on this phone yet".

### UJ-2. Karim flags a crushed carton while picking.

Karim, Warehouse worker, picking a Dispatch order.

Mock: [mockups/key-picking.html](mockups/key-picking.html) — steps 2-4: scan pre-fill + Confirm line, Flag damage mode and its toast, plus the offline failure path.

1. From My tasks Karim opens the Dispatch order; **Pick Dispatch order** (S8) shows lines with big "12 / 20 ctn" progress.
2. He scans a carton for the first line. The line is selected and pre-filled with the full remaining 8 ctn; he taps **Confirm line**. One scan + one tap; the line shows "20 / 20 ctn".
3. On the next line he finds a crushed carton. He taps **Flag damage** above the Scan bar; the camera opens in Flag damage mode, clearly marked in red.
4. He scans the crushed carton. **That scan saves the flag**: 1 carton, Reason "damaged", from Reserved on this order (FR-29). Toast "Flagged 1 ctn damaged" with **Change qty/reason**.
5. **Climax:** one tap and one scan, and the line's count is unchanged because a replacement carton is reserved automatically. Karim keeps picking without a second thought (FR-29). The flag records who, when and where (FR-11).
6. When the lines are done he taps **Confirm dispatch**; the next task from My tasks is on screen (FR-25, FR-53).

Failure path — two cartons were crushed: he taps **Change qty/reason** in the toast (or on the flag in My record) and sets 2. Not enough Available for the replacement: the line shows "Short 1 ctn" and a Dispatch-short Issue goes to the order's creator (FR-29). Camera unavailable: Flag damage opens the sheet, he types the code and taps the sheet's Flag damage button. Offline: the flag queues like any floor action (FR-41).

### UJ-3. Nasima clears the issues inbox at shift end.

Nasima, Supervisor, Narayanganj.

Mock: [mockups/key-issues-inbox.html](mockups/key-issues-inbox.html) — steps 1-4: ranked inbox with per-type card buttons, and an Issue detail.

1. Nasima opens Mojud; home is the **Issues inbox** (S12), highest money at risk first (FR-31).
2. The top card reads "Damage flag · Rice 25 kg · 1 carton · Narayanganj · Karim · 14:05".
3. She taps **Approve · write off 1 ctn** on the card. One tap; the carton is written off with Reason "damaged" (FR-30). Toast "Saved"; the card leaves the list.
4. She opens the next flag's detail (S13), sees the carton was fine, and taps **Reject · back to Available**; it returns to Available (FR-30).
5. **Climax:** the inbox reads "No open issues." — the shift is closed with every decision recorded under her name (FR-30).

Failure path — an Issue Nasima raised herself shows no decision buttons, only "You raised this — another person must decide" (FR-5). Another Supervisor decided a card first: "Already decided by … at …" and nothing changes twice. Offline: decision buttons are disabled with "Needs internet" (Decided, see State Patterns).

### UJ-4. Tanvir checks stock with a customer on the phone.

Tanvir, Sales rep, customer waiting on the line.

1. Tanvir's home is **Product search** (S5). He types the first letters of the Product (Bangla or English).
2. Results appear while he types; the Product shows **Promisable** per Warehouse: Narayanganj 32, Gazipur 20 (FR-8, FR-12).
3. He taps **Create Dispatch order** from the result, Narayanganj, quantity 32, and saves (FR-23).
4. He creates a second order: Gazipur, 18.
5. **Climax:** both orders save and the Promisable figures drop at once — those 50 units are Reserved and no colleague can promise them again (FR-23). Under 10 seconds to the first answer (SM-6).

Failure path — he types 40 for Narayanganj: the **Refusal message** reads "Only 32 ctn available. Max 32 ctn." with "Use max"; save stays disabled (FR-13, FR-23).

### UJ-5. A transfer between warehouses arrives short.

A Gazipur Warehouse worker (sender) and a Narayanganj Warehouse worker (receiver). [ASSUMPTION: the PRD gives no persona names; the spine keeps them unnamed.]

1. At Gazipur, the sender taps **Send Transfer** in the My tasks header (or More → Transfers), picks Narayanganj, scans each Product, enters 50 cartons counted out, saves the line and taps **Send Transfer**. The 50 move to In transit (FR-26).
2. At Narayanganj, the receiver sees "Incoming Transfer" in My tasks and opens **Receive Transfer** — blind, no sent quantity shown (FR-27).
3. The receiver scans, counts 40, saves the line, then taps **Finish receipt** and confirms.
4. The 40 move to Available at Narayanganj; the receiver sees "Saved" and the next task.
5. **Climax:** a Transfer-shortage Issue appears in the destination Supervisor's inbox showing both counts (50 / 40), both workers and both times; the missing 10 stay In transit, linked to the Transfer — nothing silently deleted (FR-28).

Failure path — the sender tries to receive their own Transfer: refused with "You sent this Transfer, so someone else must receive it." (FR-5). Not received in 48 h → Transfer-overdue Issue (FR-28).

### UJ-6. The owner follows an unexplained loss back to its source.

Mr. Haque, Owner, at home on a laptop or phone.

Mock: [mockups/key-owner-view.html](mockups/key-owner-view.html) — steps 1-3: Owner view with the Unexplained tile selected and the drill-down open (light + dark).

1. Mr. Haque opens Mojud; home is the **Owner view** (S18).
2. He sees this month's losses by Reason as rows: damaged ৳11,200, expired ৳4,900, confirmed loss ৳2,300, plus ৳1,450 **Unexplained** (FR-48), the Unexplained tile carrying its question icon and dashed pattern. The month selector reads the current month.
3. He taps the "Unexplained" tile. It shows as selected, and the drill-down panel lists open Discrepancy cases: Product, Warehouse, quantity, the Stock count that found it, and who counted (FR-49).
4. He opens one case (S13) and taps **Assign to…**, choosing the Manager (FR-33).
5. **Climax:** the case now shows "Assigned to Manager" and sits at the top of the Manager's inbox — Mr. Haque has turned a taka figure into a named person's task without visiting the warehouse (FR-31, FR-33).

Failure path — no cases open: the Unexplained tile reads ৳0 and the drill-down says "No open discrepancy cases."

### UJ-7. The manager runs a weekly count of one aisle's products.

The Manager (unnamed in the PRD), at a desk, and two Warehouse workers on the floor.

1. The Manager opens **Stock counts** (S17), taps **Start count**, picks Narayanganj and a chosen list of 20 Products, assigns two workers (FR-34).
2. The workers see "Count lines" in My tasks and open **Count lines** (S11): no system quantities shown (FR-35).
3. Each worker scans a Product, enters the count, taps **Save line** — scan + count + tap, the blind-screen exception to the budget.
4. The Manager watches progress in S17 and taps **Close count**, confirming once.
5. Mojud compares each line with On hand; mismatches open Discrepancy cases and shortages move to Unexplained (FR-36).
6. **Climax:** the Manager works through the cases from the Issues inbox via "Open to decide", resolving each as **Found** or **Confirmed loss** with a Reason (FR-37); matched lines show "verified" — today's date becomes their last verified date (FR-36).

Failure path — the Manager tries to resolve a line they counted themselves: refused (FR-5). A count line recorded offline queues and syncs like any floor action (FR-41).

### UJ-8. Mr. Haque sets up his business on Mojud.

Mr. Haque, Owner (persona from UJ-6), on a laptop at home, with his product list in Excel.

1. Mr. Haque opens **Sign up** (S1) and enters the Business name, his name, phone number and password; his password manager can fill and save it (FR-1).
2. Mojud shows his **recovery code** once, in groups, with a plain warning that it will not be shown again and a **Copy** button; he taps "I have saved it" to continue (FR-1, FR-54). [ASSUMPTION: Copy button and "I have saved it" step; the code can be regenerated later in Settings: Me (S27).]
3. Home is the **Owner view** (S18) in its first-use state, pointing to setup (State Patterns → First use). [ASSUMPTION: a short setup checklist in the order Warehouses → Products → Suppliers → opening stock → Users.]
4. In **Settings: Warehouses** (S23) he adds Narayanganj and Gazipur (FR-10).
5. In **Settings: Excel import** (S26) he downloads the Products, Suppliers and opening stock templates (FR-46) and fills them in Excel. [ASSUMPTION: templates have one header row with column names in English and Bangla.]
6. He uploads the Products file. The preview lists the valid rows and each error with its row number and reason, e.g. "Row 14: Conversion factor missing" (FR-47). He taps **Confirm import** and confirms once; error rows are skipped. The Products appear in **Settings: Products** (S24). [ASSUMPTION: Products are imported before opening stock, because opening stock rows name Products that must already exist.]
7. He repeats for Suppliers, which appear in **Settings: Suppliers** (S25) (FR-19), and then for opening stock per Warehouse; each opening stock row becomes an "opening balance" Stock movement (FR-16, FR-47).
8. In **Settings: Users** (S22) he adds Nasima (Supervisor), Rahim and Karim (Warehouse workers) and Tanvir (Sales rep), each with a Role, Assigned Warehouses and a temporary password (FR-3). [ASSUMPTION: Mr. Haque passes the temporary passwords on in person; Mojud sends no SMS (FR-2).]
9. **Climax:** he searches for Rice 25 kg and opens **Product stock** (S6): for the first time the **stock ladder** shows real opening stock — Narayanganj and Gazipur, On hand through Promisable — and Stock value in taka (FR-12, FR-18). Mojud now holds his business.

Failure path — a 4th Warehouse is refused with a clear message naming the limit of 3 (FR-10). An import file where every row has an error shows only the error list and no **Confirm import** button; nothing is saved (FR-47) [ASSUMPTION: confirm hidden when there are no valid rows]. When Rahim first signs in (S2) with his temporary password he must set his own before he sees My tasks (FR-54).

FR-4 note: FR-46 and FR-47 say "A Manager"; the FR-4 table gives the Owner the same rights, and the table wins.

### UJ-9. Karim's own record shows where a carton went missing.

Karim, Warehouse worker at Narayanganj (persona from UJ-2), on his phone, after the Manager asks him about a missing carton of Rice 25 kg.

1. From **More**, Karim opens **My record** (S20) and chooses **This week** (FR-51).
2. The summary shows his work in plain counts: Dispatch lines picked, Receipt and Transfer lines counted, Count lines confirmed "verified", and Damage flags raised with how many were approved or rejected (FR-51).
3. Below are the Discrepancy cases and Sync conflicts linked to his own actions, each with its outcome (FR-51). One linked Transfer line reads "Sent · Rice 25 kg · 20 ctn · to Gazipur · Mon 10:12 · shortage open". [ASSUMPTION: Transfer Issues on a Transfer the User sent or received also list as linked cases, though FR-51 names only Discrepancy cases and Sync conflicts; each line is tappable and opens the matching movement or Issue in read-only form.]
4. He taps it. The evidence shows both counts, both Users and both times: sent 20 ctn by Karim at 10:12, received 19 ctn by the Gazipur receiver at 16:40; the missing carton stays In transit, linked to the Transfer (FR-28). [ASSUMPTION: the sender can view this evidence read-only from My record even though they cannot decide the Issue (FR-4, FR-5).]
5. He also sees Wednesday's Count line for Rice 25 kg at Narayanganj marked "verified" — his shelf count matched On hand, so no Discrepancy case opened on his line (FR-36, FR-51). Had it not matched, the linked Discrepancy case would show the counter, the counted quantity, the On hand quantity and the times (FR-37).
6. He hands the phone to the Manager, or the Manager opens Karim's record from their own screen (S20 lets Owner and Manager see anyone's record).
7. **Climax:** Karim is cleared by his own record — the evidence shows the gap happened after his handoff (in transit or at Gazipur's receipt), not at his step, and the case belongs to the Gazipur Supervisor (FR-28, FR-31). No one had to take his word for it.

Failure path — if his own action is where the gap happened, the record shows it the same way, with the outcome and no blame words (Voice and Tone). Actions he recorded offline and not yet synced show "Not synced"; a refused one shows "Not applied – sent to supervisor" with its reason (FR-44). Offline, the record reads "as of HH:MM (offline)" (FR-42). [ASSUMPTION: My record shows queued actions with their chips before they sync.]
