---
title: "Addendum: Inventory and Stock Control for Bangladeshi FMCG Distributors"
created: 2026-10-22
updated: 2026-10-22
---

# Addendum: Inventory and Stock Control for Bangladeshi FMCG Distributors

This addendum holds detail that supports the brief but is too deep for it, or belongs in downstream documents (PRD, architecture).

## A. Competitive and market landscape (desk research, Oct 2026)

Figures are as reported by the sources and have not been checked with vendors or distributors.

### Existing tools

| Tool | What it is | Relevance to our customer |
|---|---|---|
| TallyKhata (Progoti Systems) | Bangla digital khata for shops: sales, purchases, stock, expenses, QR payments; works offline. Claims 1M+ MAU and 1 crore (10 million) downloads. | Shop-level. No evidence found of multiple warehouses or transfers. |
| Hishabee | Smartphone "digital manager": sales, inventory, dues, online selling. No public pricing. | Shop-level. |
| TallyPrime (Tally Solutions) | Desktop accounting with multiple godowns and stock transfer entries. | Accounting-first. No evidence found of Bangla UI or floor-level capture. |
| Sokrio | Dhaka-based distributor management system (DMS) for FMCG brands: sales force, orders, inventory. Seed funding from BVCL (2024). | Sold to brands, not to small distributors. |
| Field Buzz | Mobile software for FMCG field agents' orders, deliveries and credit. | Field sales, not warehouse control. |
| Generic local packages (BDStall listings) | Distribution management roughly ৳12,500–55,000 one-time; a wholesale ERP at ৳55,000 that includes warehouses and transfers. | Desktop or ERP style, licensed one-time. |
| Odoo partners (Metamorphosis, Brain Station 23, BJIT, Bdcalling, Xsellence) | ERP implementation projects. | Heavier than this product's scope. |

**Gap pattern (inference):** available tools are either shop-level khata apps or brand-side DMS/ERP. No Bangla, offline, warehouse-focused tool was found that handles damage, stock counts and transfers for small distributors.

### Segment size

- No authoritative count of FMCG distributors in Bangladesh was found. This is the biggest evidence gap.
- There are about 2M micro-merchant retailers, mostly cash-based (UNCDF).
- Innovision (2025) reports that many FMCG firms still rely on manual reporting and fragmented inventory tracking.
- Mokam/ShopUp reports 200+ distribution centres (company claim).

### Price points (thin evidence)

- Generic inventory SaaS listings start at about ৳1,000/month (BDStall).
- HisabPlus POS starts at about ৳1,500/month and rises with modules and branches.
- A working range of ৳1,000–3,000/month is plausible but unverified.

### Connectivity

- 72.4% of households own a smartphone: 80.8% urban, 68.8% rural (BBS FY2024-25).
- 59.2% of individuals use the internet and 65.6% own a mobile phone (BBS, Apr–Jun 2026).
- Individual smartphone use is 41% urban and 26% rural (GSMA 2024).
- Implication: warehouse staff may share low-end phones, which supports offline-first and shared-device design.

### To verify with primary research

- Number of FMCG distributors in the target band (1–3 warehouses, 5–30 staff)
- Hishabee and TallyKhata pricing and multi-warehouse capability
- Whether any local tool handles damage capture or stock counts

### Sources

- https://www.tallykhata.com/en/home-eng/
- https://blog.hishabee.io/?p=327
- https://tallysolutions.com/bd/en/inventory-management-software
- https://tallysolutions.com/business-guides/accounting-software-for-distributors-multi-godown-stock-management/
- https://startupbangladesh.vc/?p=20673
- https://www.gsma.com/mobilefordevelopment/wp-content/uploads/2020/05/Field-Buzz-Deploying-mobile-technology-to-manage-last-mile-distribution-and-operations-in-Bangladesh.pdf
- https://www.bdstall.com/details/distribution-management-software-with-powerful-inventory-19299/
- https://www.bdstall.com/details/distribution-wholesale-management-erp-software-169576/
- https://www.bdstall.com/details/inventory-software-on-monthly-subscription-84899/
- https://hisabplus.com/cheap-pos-software-bangladesh
- https://www.uncdf.org/article/7065/digital-transformations-of-fast-moving-consumer-goods-fmcg-supply-chain-operations-and-payments-in-bangladesh-challenges-opportunities-and-way-forward
- https://innovision-bd.com/reports/digital-transformation-of-fmcg-supply-chain-operations-and-payments-in-bangladesh
- https://futurestartup.com/?p=32707
- https://www.dhakatribune.com/business/420730/bbs-survey-66%25-of-population-own-a-mobile-phone
- https://meatechwatch.com/2025/12/22/steady-rise-in-internet-use-across-bangladesh-bbs-survey-shows/
- https://www.tbsnews.net/node/1013061

## B. Post-v1 backlog (from the 2026-10-22 brainstorm)

**SHOULD (next after v1)**

- Photo capture on damage reports (optional in v1, because reporting must work without a photo)
- Risk-based extra checks, starting with one rule: high-value items need a second count
- Best-before date per receipt, plus a near-expiry list
- Weighted-average valuation, month-end period lock, and accounting export
- Freshness stamp on availability (last counted date and number of movements since)
- Soft hold: a sales rep reserves stock for about 30 minutes during a customer call
- Expected arrival dates for incoming stock shown next to availability

**COULD (later)**

- Realistic incoming dates based on each supplier's on-time history
- Risk levels that rise after discrepancies and fall after clean counts
- Drift rate per location as a health measure
- Grouping similar damage reports into one card
- Seal or QR checks on transfers
- Discrepancy cause analytics
- Tally integration

## C. Design principles (detail for PRD and architecture)

1. Show promisable stock, never one bare on-hand number.
2. The ledger has three kinds of append-only entry: **Move** (location or state), **Transform** (for example carton → pieces, with cost carried over) and **Revalue** (value only).
3. An "Unknown / unlocated" state holds count shortages, with their value, until they are explained.
4. Every record gives the person recording it something back straight away.
5. Recording effort budget: routine low-risk actions take at most about 1 scan + 1 tap, with fields pre-filled from context.
6. Offline-first, delivered as a PWA: scans queue on the device and sync later.
7. Friction follows risk. Controls are automatic, based on risk, and configurable per business.
8. Every figure shown to the owner can be traced back to evidence and acted on. The "Trust Score" idea was rejected.
9. Segregation of duties: receiving is blind, transfers need a count at the receiving end, and nobody approves their own records.
10. Protect honest workers: the same record that holds people accountable also proves what they did.
