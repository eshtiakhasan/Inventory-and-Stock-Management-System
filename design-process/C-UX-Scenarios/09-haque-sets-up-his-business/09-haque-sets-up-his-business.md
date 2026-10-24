# 09: Mr. Haque Sets Up His Business

**Project:** Mojud (E2E_IAM)
**Created:** 2026-10-23
**Method:** Whiteport Design Studio (WDS)
**Priority:** P3
**Source journey:** UJ-8 (EXPERIENCE.md → Key Flows)

---

## Transaction (Q1)

**What this scenario covers:**
Move the business from Excel and khata onto Mojud in one evening, without a consultant.

---

## Business Goal (Q2)

**Goal:** Product proof
**Objective:** Objective 1 (SM-7): no pilot without a working setup

---

## User & Situation (Q3)

**Persona:** [Mr. Haque the Owner](../../B-Trigger-Map/personas/03-Haque-the-Owner.md) (Secondary)
**Situation:** Mr. Haque, Friday evening at home on his laptop, with his product list and supplier list open in Excel.

---

## Driving Forces (Q4)

**Hope:** Have his real stock in Mojud by Saturday morning.

**Worry:** Wasting an evening on a tool his staff won't use, or entering everything twice.

---

## Device & Starting Point (Q5 + Q6)

**Device:** Desktop at home
**Entry:** Opens the Mojud link he was sent and taps Sign up.

---

## Best Outcome (Q7)

**User Success:**
Two warehouses, his products, suppliers, opening stock and four staff are set up, and the first purchase order already shows as Karim's task.

**Business Success:**
A distributor fully onboarded and ready for the 8-week proof (SM-7).

---

## Shortest Path (Q8)

1. **Sign up** — Create the business and his owner account; save the one-time recovery code
2. **Settings: Warehouses** — Add Narayanganj and Gazipur
3. **Settings: Excel import** — Download templates, upload products, preview errors, confirm
4. **Settings: Products** — Check the imported products: units, barcodes, thresholds, opening stock
5. **Settings: Suppliers** — Check the imported suppliers
6. **Settings: Users** — Add Nasima, Rahim, Karim and Tanvir with roles, assigned warehouses and temporary passwords
7. **Purchase orders** — Create the first purchase order to a supplier ✓

---

## Trigger Map Connections

**Persona:** Mr. Haque the Owner (Secondary)

**Driving Forces Addressed:**
- ✅ **Want:** A tool he's proud of
- ✅ **Want:** Control from a distance
- ❌ **Fear:** A tool staff won't use
- ❌ **Fear:** Data being lost or exposed

**Business Goal:** Objective 1 (SM-7): no pilot without a working setup

---

## Scenario Steps

| Step | Folder | Purpose | Exit Action |
|------|--------|---------|-------------|
| 09.1 | `09.1-sign-up/` | Create the business and his owner account; save the one-time recovery code | Taps 'I have saved it' and lands on the Owner view first-use state (04.1) |
| 09.2 | `09.2-settings-warehouses/` | Add Narayanganj and Gazipur | Goes to Excel import from the setup checklist |
| 09.3 | `09.3-settings-excel-import/` | Download templates, upload products, preview errors, confirm | Confirms import; error rows skipped |
| 09.4 | `09.4-settings-products/` | Check the imported products: units, barcodes, thresholds, opening stock | Moves on to suppliers |
| 09.5 | `09.5-settings-suppliers/` | Check the imported suppliers | Moves on to users |
| 09.6 | `09.6-settings-users/` | Add Nasima, Rahim, Karim and Tanvir with roles, assigned warehouses and temporary passwords | Opens Purchase orders |
| 09.7 | `09.7-purchase-orders/` | Create the first purchase order to a supplier | Sends it; it appears as a receipt task on the Narayanganj phones ✓ |

**First step** (09.1) includes full entry context (Q3 + Q4 + Q5 + Q6).
**On-step interactions** are listed in each page file and become storyboard items in Phase 4.
