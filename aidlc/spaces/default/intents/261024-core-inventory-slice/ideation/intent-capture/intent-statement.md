# Intent Statement — Mojud core slice

## Problem Statement

Small and mid-sized FMCG distributors and wholesalers in Bangladesh, with 1–3 warehouses and 5–30 staff, run their stock on Excel sheets, paper khatas and WhatsApp messages. Nobody trusts the stock numbers, and money (taka) is lost without anyone knowing where. [Q1]

Mojud gives these businesses one shared, trustworthy stock record. [Q1]

This piece of work builds the first core slice of Mojud as a working full-stack application. [desc]

## Target Customer

| Who | Role in the product | Pain today | Source |
|---|---|---|---|
| Owner | Pays for the product | Cannot trust stock numbers without visiting the warehouse, and cannot see where taka is being lost | [Q2] |
| Warehouse worker | Uses the product most | Recording work is slow, and they get blamed for stock gaps they did not cause | [Q2] |

## Success Metrics

This round is successful when every item below is demonstrably true. [Q3]

| # | Outcome | How it is checked | Source |
|---|---|---|---|
| S1 | An Owner can sign up and set up their business (scenario 09: Haque sets up his business) | The sign-up flow completes end to end in the running app | [Q3] [desc] |
| S2 | A Warehouse worker can blind-receive a Purchase order, and a shortfall is recorded as an Issue (scenario 01: Karim receives a delivery) | Receiving a PO with fewer items than ordered creates a shortfall Issue | [Q3] [desc] |
| S3 | A Warehouse worker can pick a Dispatch order and flag a damaged carton, with a replacement reserved automatically (scenario 02: Karim picks and flags damage) | Flagging damage during a pick moves the carton to damaged and reserves a replacement | [Q3] [desc] |
| S4 | Stock never goes negative, and every stock change is a permanent stock movement | Automated tests pass for the no-negative rule and for movement permanence | [Q3] |
| S5 | All of the above run on the developer's machine | The application starts locally with Docker Compose | [Q3] [desc] |

## Initiative Trigger

The PRD and UX design are finished, and this work turns them into working software as a learning and portfolio project. [Q4]

## Initial Scope Signal

**Workflow-selected:** the `mvp` workflow was selected for this piece of work. [scope]

**User-confirmed product boundary for this round:**

- In: scenario 09 (sign-up), scenario 01 (My tasks, receive PO, scan overlay) and scenario 02 (pick Dispatch order, flag damage). [desc]
- In: minimal setup screens to create Products, Suppliers, Purchase orders, Warehouses, Users and Dispatch orders, because the core scenarios start from records created by other roles. [Q9]
- Out (later rounds): the remaining scenarios. [desc]
- Out (later rounds): offline queue and sync, Supervisor decisions on Issues, Bangla language, and Excel import. [Q10]
- Out: cloud deployment; the app runs locally only. [desc]

## Assumptions & Open Questions

None.
