# 07: Tanvir Promises Stock While the Customer Waits

**Project:** Mojud (E2E_IAM)
**Created:** 2026-10-23
**Method:** Whiteport Design Studio (WDS)
**Priority:** P2
**Source journey:** UJ-4 (EXPERIENCE.md → Key Flows)

---

## Transaction (Q1)

**What this scenario covers:**
Promise a customer a quantity he can really deliver, while they're still on the phone.

---

## Business Goal (Q2)

**Goal:** Record accuracy feeds trust; supporting the promisable-stock promise
**Objective:** SM-6 (promisable quantity found in ≤ 10 s); Objective 3 indirectly

---

## User & Situation (Q3)

**Persona:** Tanvir the Sales Rep (supporting group, see trigger-map.md) (Supporting)
**Situation:** Tanvir, a sales rep, in a rickshaw between shops; a regular retailer calls wanting 50 cartons of Rice 25 kg delivered tomorrow.

---

## Driving Forces (Q4)

**Hope:** Say yes on the call and have it hold.

**Worry:** Promising stock that is damaged or already promised to a colleague's customer.

---

## Device & Starting Point (Q5 + Q6)

**Device:** Mobile
**Entry:** Opens Mojud on his phone; his home is Product search.

---

## Best Outcome (Q7)

**User Success:**
Within 10 seconds he sees Narayanganj 32 and Gazipur 20 promisable, and books 32 + 18 as two dispatch orders before hanging up.

**Business Success:**
50 units reserved immediately so no one else can promise them; no over-promise means no shortfall at the customer.

---

## Shortest Path (Q8)

1. **Product search** — Find the product by typing a few letters in Bangla or English
2. **Product stock** — See the stock ladder per warehouse: on hand, damaged, reserved, in transit, promisable
3. **Dispatch orders** — Create the order, then a second one from Gazipur ✓

---

## Trigger Map Connections

**Persona:** Tanvir the Sales Rep (Supporting)

**Driving Forces Addressed:**
- ✅ **Want:** Promise confidently
- ❌ **Fear:** Over-promising and losing face

**Business Goal:** SM-6 (promisable quantity found in ≤ 10 s); Objective 3 indirectly

---

## Scenario Steps

| Step | Folder | Purpose | Exit Action |
|------|--------|---------|-------------|
| 07.1 | `07.1-product-search/` | Find the product by typing a few letters in Bangla or English | Taps the product in the live results |
| 07.2 | `07.2-product-stock/` | See the stock ladder per warehouse: on hand, damaged, reserved, in transit, promisable | Taps Create Dispatch order from the Narayanganj row |
| 07.3 | `07.3-dispatch-orders/` | Create the order, then a second one from Gazipur | Saves both; promisable drops at once ✓ |

**First step** (07.1) includes full entry context (Q3 + Q4 + Q5 + Q6).
**On-step interactions** are listed in each page file and become storyboard items in Phase 4.
