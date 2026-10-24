# UX Scenarios: Mojud (E2E_IAM)

> Scenario outlines connecting Trigger Map personas to concrete user journeys

**Created:** 2026-10-23
**Author:** eshtiakhasan with Claude (WDS Suggest mode)
**Method:** Whiteport Design Studio (WDS)
**Format:** Storyboard (dynamic app). Each page lists its on-page states for Phase 4.
**Sources:** [Trigger Map](../B-Trigger-Map/trigger-map.md), PRD §2.3, EXPERIENCE.md → Information Architecture (S1–S27) and Key Flows (UJ-1 … UJ-9)

---

## Scenario Summary

| ID | Scenario | Persona | Pages | Priority | Mockup | Status |
|----|----------|---------|-------|----------|--------|--------|
| 01 | [Karim Receives a Supplier Delivery Blind](01-karim-receives-a-delivery-blind/01-karim-receives-a-delivery-blind.md) | Karim the Warehouse Worker | 4 | ⭐ P1 | key-receiving.html | ✅ Specified |
| 02 | [Karim Picks an Order and Flags a Crushed Carton](02-karim-picks-and-flags-damage/02-karim-picks-and-flags-damage.md) | Karim the Warehouse Worker | 2 | ⭐ P1 | key-picking.html | ✅ Specified |
| 03 | [Nasima Clears the Inbox at Shift End](03-nasima-clears-the-inbox/03-nasima-clears-the-inbox.md) | Nasima the Supervisor | 2 | ⭐ P1 | key-issues-inbox.html | ✅ Specified |
| 04 | [Mr. Haque Traces an Unexplained Loss](04-haque-traces-an-unexplained-loss/04-haque-traces-an-unexplained-loss.md) | Mr. Haque the Owner | 2 | ⭐ P1 | key-owner-view.html | ✅ Specified |
| 05 | [Karim's Transfer Arrives Short](05-karims-transfer-arrives-short/05-karims-transfer-arrives-short.md) | Karim the Warehouse Worker | 3 | P2 | — | ✅ Specified |
| 06 | [Karim Proves Where a Carton Went](06-karim-proves-where-a-carton-went/06-karim-proves-where-a-carton-went.md) | Karim the Warehouse Worker | 1 | P2 | — | ✅ Specified |
| 07 | [Tanvir Promises Stock While the Customer Waits](07-tanvir-promises-stock-while-the-customer-waits/07-tanvir-promises-stock-while-the-customer-waits.md) | Tanvir the Sales Rep | 3 | P2 | — | ✅ Specified |
| 08 | [Rafiq the Manager Runs the Weekly Count](08-rafiq-runs-the-weekly-count/08-rafiq-runs-the-weekly-count.md) | Rafiq the Manager | 2 | P2 | — | ✅ Specified |
| 09 | [Mr. Haque Sets Up His Business](09-haque-sets-up-his-business/09-haque-sets-up-his-business.md) | Mr. Haque the Owner | 7 | P3 | — | ✅ Specified |
| 10 | [Karim Signs In on the Shared Warehouse Phone](10-karim-signs-in-on-the-shared-phone/10-karim-signs-in-on-the-shared-phone.md) | Karim the Warehouse Worker | 3 | P3 | — | ✅ Specified |
| 11 | [Mr. Haque Recovers His Account](11-haque-recovers-his-account/11-haque-recovers-his-account.md) | Mr. Haque the Owner | 1 | P3 | — | ✅ Specified |

---

## Scenarios

### [01: Karim Receives a Supplier Delivery Blind](01-karim-receives-a-delivery-blind/01-karim-receives-a-delivery-blind.md)
**Persona:** Karim the Warehouse Worker — Being blamed for gaps he didn't cause
**Pages:** My tasks, Receive PO (blind), Scan overlay, Offline queue
**User Value:** Every carton he counted is saved under his name, the shortfall is someone else's issue, and the next task is already on screen.
**Business Value:** Receipt recorded at source with who, when, where (SM-3 = 100%); 92 vs 100 Shortfall Issue raised automatically, so no silent loss enters stock.

### [02: Karim Picks an Order and Flags a Crushed Carton](02-karim-picks-and-flags-damage/02-karim-picks-and-flags-damage.md)
**Persona:** Karim the Warehouse Worker — Recording that slows him down
**Pages:** Pick Dispatch order, Flag damage
**User Value:** The crushed carton is flagged in one tap plus one scan, the order stays complete through automatic re-reservation, and the van leaves on time.
**Business Value:** Damage recorded the same minute it was found, with who/when/where; the carton leaves sellable stock immediately and the customer order isn't short.

### [03: Nasima Clears the Inbox at Shift End](03-nasima-clears-the-inbox/03-nasima-clears-the-inbox.md)
**Persona:** Nasima the Supervisor — Alert overload
**Pages:** Issues inbox, Issue detail
**User Value:** Inbox reads 'No open issues.' and every decision is recorded under her name with the evidence she saw.
**Business Value:** Damage flags decided within the shift (SM-5 24 h target); write-offs carry a Reason, so the owner's loss figures are explained.

### [04: Mr. Haque Traces an Unexplained Loss](04-haque-traces-an-unexplained-loss/04-haque-traces-an-unexplained-loss.md)
**Persona:** Mr. Haque the Owner — Finding losses too late
**Pages:** Owner view + drill-down, Low stock
**User Value:** Knows the ৳1,450 unexplained comes from two open count cases, has assigned one to the Manager, and has checked what's running low.
**Business Value:** Unexplained case assigned within minutes of being seen (SM-4, ≥ 80% resolved in 7 days); the owner sees value in Mojud, which is what keeps the pilot going (SM-7).

### [05: Karim's Transfer Arrives Short](05-karims-transfer-arrives-short/05-karims-transfer-arrives-short.md)
**Persona:** Karim the Warehouse Worker — Being blamed for gaps he didn't cause
**Pages:** Transfers, Send Transfer, Receive Transfer (blind)
**User Value:** Both counts, both people and both times are on record; the missing carton stays In transit and is clearly not his gap.
**Business Value:** The handoff gap is captured as a Transfer-shortage Issue instead of disappearing into month-end shrinkage.

### [06: Karim Proves Where a Carton Went](06-karim-proves-where-a-carton-went/06-karim-proves-where-a-carton-went.md)
**Persona:** Karim the Warehouse Worker — Being blamed for gaps he didn't cause
**Pages:** My record
**User Value:** His record shows he sent 20 ctn at 10:12 and Gazipur received 19 at 16:40; he hands the phone to the Manager and is cleared.
**Business Value:** Honest worker protected by the same record that holds people accountable, which builds floor trust and adoption.

### [07: Tanvir Promises Stock While the Customer Waits](07-tanvir-promises-stock-while-the-customer-waits/07-tanvir-promises-stock-while-the-customer-waits.md)
**Persona:** Tanvir the Sales Rep — Over-promising and losing face
**Pages:** Product search, Product stock, Dispatch orders
**User Value:** Within 10 seconds he sees Narayanganj 32 and Gazipur 20 promisable, and books 32 + 18 as two dispatch orders before hanging up.
**Business Value:** 50 units reserved immediately so no one else can promise them; no over-promise means no shortfall at the customer.

### [08: Rafiq the Manager Runs the Weekly Count](08-rafiq-runs-the-weekly-count/08-rafiq-runs-the-weekly-count.md)
**Persona:** Rafiq the Manager — Discrepancies with no trail
**Pages:** Stock counts, Count lines (blind)
**User Value:** 20 products counted blind by two workers, mismatches opened as cases, matched lines marked verified today.
**Business Value:** Accuracy measured weekly (SM-1) and every shortage held as Unexplained until resolved, never deleted.

### [09: Mr. Haque Sets Up His Business](09-haque-sets-up-his-business/09-haque-sets-up-his-business.md)
**Persona:** Mr. Haque the Owner — A tool staff won't use
**Pages:** Sign up, Settings: Warehouses, Settings: Excel import, Settings: Products, Settings: Suppliers, Settings: Users, Purchase orders
**User Value:** Two warehouses, his products, suppliers, opening stock and four staff are set up, and the first purchase order already shows as Karim's task.
**Business Value:** A distributor fully onboarded and ready for the 8-week proof (SM-7).

### [10: Karim Signs In on the Shared Warehouse Phone](10-karim-signs-in-on-the-shared-phone/10-karim-signs-in-on-the-shared-phone.md)
**Persona:** Karim the Warehouse Worker — Recording under someone else's name
**Pages:** Sign in, Change temporary password, Settings: Me
**User Value:** Signed in as himself, password set, interface in Bangla, app installed to the home screen, and his name showing in the app bar.
**Business Value:** Each floor action attributable to the right person (SM-3) from day one.

### [11: Mr. Haque Recovers His Account](11-haque-recovers-his-account/11-haque-recovers-his-account.md)
**Persona:** Mr. Haque the Owner — Data being lost or exposed
**Pages:** Owner recovery
**User Value:** Back in with a new password, and prompted to save a new recovery code.
**Business Value:** Owner retained; the data-trust fear is answered.

---

## Page Coverage Matrix

| Page | Scenario | Purpose in Flow |
|------|----------|----------------|
| 01.1 My tasks | 01 | See today's tasks with the supplier delivery at the top |
| 01.2 Receive PO (blind) | 01 | See the products on the delivery with no ordered quantities |
| 01.3 Scan overlay | 01 | Scan a carton barcode to jump to its line |
| 01.4 Offline queue | 01 | Confirm that the counts saved on the phone have synced |
| 02.1 Pick Dispatch order | 02 | See the order lines with big 'picked / ordered' progress and confirm each line |
| 02.2 Flag damage | 02 | Report the crushed carton in one scan |
| 03.1 Issues inbox | 03 | See every open issue ranked: assigned, then reserved stock, then value at risk, then age |
| 03.2 Issue detail | 03 | See the full evidence and history, then decide |
| 04.1 Owner view + drill-down | 04 | See this month's losses by Reason in taka, then the cases behind Unexplained |
| 04.2 Low stock | 04 | See which products are below their threshold per warehouse |
| 05.1 Transfers | 05 | See incoming and outgoing transfers and start a new one |
| 05.2 Send Transfer | 05 | Pick the destination, scan and count out each product, send |
| 05.3 Receive Transfer (blind) | 05 | The receiver counts what arrived without seeing the sent quantity |
| 06.1 My record | 06 | See his week's work and the cases linked to his actions, with their outcomes |
| 07.1 Product search | 07 | Find the product by typing a few letters in Bangla or English |
| 07.2 Product stock | 07 | See the stock ladder per warehouse: on hand, damaged, reserved, in transit, promisable |
| 07.3 Dispatch orders | 07 | Create the order, then a second one from Gazipur |
| 08.1 Stock counts | 08 | Start a count for chosen products at one warehouse and assign counters |
| 08.2 Count lines (blind) | 08 | Workers scan and count each product without seeing system quantities |
| 09.1 Sign up | 09 | Create the business and his owner account; save the one-time recovery code |
| 09.2 Settings: Warehouses | 09 | Add Narayanganj and Gazipur |
| 09.3 Settings: Excel import | 09 | Download templates, upload products, preview errors, confirm |
| 09.4 Settings: Products | 09 | Check the imported products: units, barcodes, thresholds, opening stock |
| 09.5 Settings: Suppliers | 09 | Check the imported suppliers |
| 09.6 Settings: Users | 09 | Add Nasima, Rahim, Karim and Tanvir with roles, assigned warehouses and temporary passwords |
| 09.7 Purchase orders | 09 | Create the first purchase order to a supplier |
| 10.1 Sign in | 10 | Sign in with phone number and temporary password |
| 10.2 Change temporary password | 10 | Set his own password before seeing anything else |
| 10.3 Settings: Me | 10 | Choose Bangla, install the app, see who is signed in |
| 11.1 Owner recovery | 11 | Enter phone number and recovery code, set a new password |

**Coverage:** 30/30 pages assigned to scenarios, each exactly once.

**Shared elements (not pages):** app bar with the signed-in name, bottom tab bar / desktop side nav per role, fixed Scan bar on floor screens, offline banner, toasts. Documented with the design system (Phase 7) and EXPERIENCE.md → Home and navigation per Role.

**Pages used across scenarios** (designed once, in their home scenario): My tasks (01.1) is the entry point for 02, 05 and 08; Issue detail (03.2) is used in 04 and 08; Owner view (04.1) is the landing page after 09 and 11.

---

## Next Phase

These scenario outlines feed into **Phase 4: UX Design**, in priority order. P1 scenarios 01–04 start from the existing BMAD mockups.

---

_Generated with Whiteport Design Studio framework_
