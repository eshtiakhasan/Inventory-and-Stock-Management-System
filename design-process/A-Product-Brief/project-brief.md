---
title: "Product Brief: Mojud (working name)"
phase: WDS Phase 1 — Product Brief
brief_level: complete
status: complete
created: 2026-10-23
seeded_from:
  - _bmad-output/planning-artifacts/briefs/brief-E2E_IAM-2026-10-22/brief.md
  - _bmad-output/planning-artifacts/briefs/brief-E2E_IAM-2026-10-22/addendum.md
  - _bmad-output/planning-artifacts/prds/prd-E2E_IAM-2026-10-22/prd.md
  - _bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/DESIGN.md
  - _bmad-output/planning-artifacts/ux-designs/ux-E2E_IAM-2026-10-22/EXPERIENCE.md
  - idea.md
---

# Product Brief: Mojud (working name)

> *Mojud* (মজুদ) means "stock" in Bangla. The name is temporary.

This WDS brief builds on the BMAD brief, PRD and UX documents listed above
rather than replacing them. Where those documents go into more detail, this
brief links to them instead of repeating it.

## Strategic Summary

Small Bangladeshi FMCG distributors run their warehouses on Excel, paper khatas
and WhatsApp. Their "stock" figure is a single number that mixes sellable,
damaged and already-promised units. Most changes happen outside the system:
damage is reported verbally and reservations are written in a sales notebook.
Gaps creep in at every handoff, and the owner only discovers the loss at month
end, as a shortfall nobody can explain.

The root cause is not missing software. **The people who record stock get
nothing back for doing it.** Effort flows up to managers, so recording is the
first thing dropped under pressure.

Mojud is a phone-first, offline-capable stock-control web app that reverses
this. Every recording takes about one scan and one tap, and it gives the worker
something straight back: their next task, confirmation that it was saved, and a
record that protects them from blame for gaps they didn't cause. The owner gets
promisable stock they can trust and losses in taka, each traceable to a
transaction, a person and a time.

## Vision

**"Every handoff counted. Every person protected."**

If Mojud earns trust with a handful of distributors, it becomes the record that
small Bangladeshi distributors run their warehouses on. It stays a focused
stock-control product: no POS, no invoicing, never an ERP.

## Positioning

- **For** owners of Bangladeshi FMCG distributors and wholesalers with 1–3
  warehouses and 5–30 staff
- **who** can't trust their stock numbers from a distance and find losses too late,
- **Mojud is** a stock-control web app (PWA)
- **that** shows promisable stock and traces every change to a person and a reason,
- **unlike** shop-level khata apps (TallyKhata, Hishabee) or brand-side DMS/ERP
  (Sokrio, TallyPrime, Odoo),
- **because** it's built for the warehouse floor first (Bangla, offline, one scan
  and one tap) and its accountability protects honest workers instead of policing them.

## Client Profile

- **Solo project.** The project owner is also the designer and builder.
  Decisions are made by their own judgement, informed by feedback from real
  distributors.
- **Internal driver:** learning end-to-end product design and delivery, with the
  intention of building something a real business could actually use.
- **No external sign-off.** There is no contract, client approval or
  procurement gate. Validation comes from distributor interviews and a pilot.

## Target Users

**Paying decision-maker (future):** the **owner**. They are not on the floor
every day and want *control*: to trust the numbers from a distance and stop
money leaking away.

**Daily users.** They adopt Mojud only if it gives them *relief*:

| Role | Surface | What success feels like |
|---|---|---|
| Warehouse worker | Floor (phone) | Records in seconds, knows the next task, isn't blamed for others' gaps |
| Supervisor | Floor (phone) | Clears one prioritised inbox and approves damage in one tap |
| Inventory manager | Desk + phone | Knows promisable stock per warehouse and resolves discrepancies with evidence |
| Sales rep | Phone | Promises quantities without having to call the warehouse |
| Accountant | Desk | Gets a stock value backed by a transaction trail |
| Owner | Desk + phone | Sees losses in taka and can follow any figure to its evidence |

Usage context: workers are standing, often one-handed, in dim or bright
warehouses, sometimes offline, and often on shared low-end Android phones.
Full journeys are in PRD §2.3 and EXPERIENCE.md → Key Flows (UJ-1 … UJ-9).

## Business Model

**None in v1. This is a free learning project.**

- No pricing, billing or subscription features are designed or built in v1.
- If a real distributor adopts it, a monetisation model gets decided then.
  Desk research suggests local SaaS pricing of about ৳1,000–3,000/month
  (`[ASSUMPTION]`, unverified; brief addendum A).
- **Design implication:** don't spend design effort on onboarding funnels,
  plans, trials or upgrade prompts. Business setup (UJ-8) only needs to work
  for a pilot.

## Success Criteria

`[ASSUMPTION]` These targets are provisional until validated with real users.

**Primary (product proof):** one real distributor replaces Excel or khata with
Mojud for **8 consecutive weeks**.

**Secondary:**
- Inventory record accuracy ≥ 97% of counted lines after 3 months
- 100% of stock changes record who, when, why and where (enforced by the system)
- Unexplained loss in taka falls month on month, and ≥ 80% of discrepancy cases are resolved within 7 days
- ≥ 90% of damage is flagged within the same shift it was found
- ≥ 80% of floor and sales staff record in the app every working week
- A routine scan takes ≤ 5 s, and a sales rep finds the promisable quantity in ≤ 10 s

**Design-specific:** each routine floor action costs **at most one scan and one
tap** when defaults are accepted (NFR-2).

## Competitive Landscape

| Alternative | Why it doesn't serve our customer |
|---|---|
| Excel / khata / WhatsApp (status quo) | One bare number, no trail, nobody can trace losses |
| TallyKhata, Hishabee | Built for a single shop; no multi-warehouse, transfers or counts |
| TallyPrime | Accounting-first desktop tool, with no floor-level capture or Bangla floor UX |
| Sokrio, Field Buzz | Sold to brands for field sales, not to small distributors for warehouse control |
| Odoo / local ERPs | Too heavy and too expensive to implement for a 5–30 person business |

**Why Mojud wins (positioning, not a moat):** floor-first effort budget, Bangla
and offline, and accountability that protects workers. The market gap is
`[ASSUMPTION]` until checked with 3–5 distributors. Sources: brief addendum A.

## Constraints & Context

- **Team:** solo. Scope must be buildable by one person in small increments,
  starting with core stock tracking (PRD §7.2).
- **Budget:** none. Prefer free, open tooling.
- **Platform:** responsive web app installable as a PWA. No native apps. Floor
  screens are designed at 360px and work from 320px.
- **Offline-first:** scans queue on the device and sync later. Each device needs
  one online sign-in first.
- **Devices:** shared, low-end Android phones on Chrome. Camera scanning needs
  HTTPS and permission.
- **Scope:** the 18 v1 features in the brief and PRD §7.1. Explicitly out:
  POS, invoicing, accounting ledger, batch/serial, BOM, bins, multi-company and
  people risk scores.
- **Tech stack:** not chosen yet, and no component library. DESIGN.md tokens
  are the source of visual truth.
- **Accessibility:** WCAG 2.x AA floor (EXPERIENCE.md → Accessibility Floor).

## Platform Strategy

| Surface | Devices | Users |
|---|---|---|
| **Floor** | Phone only, bottom tab bar, fixed Scan bar | Worker, Supervisor |
| **Desk** | Desktop and phone; side nav at ≥ 1024px, list + detail layouts | Owner, Manager, Accountant, Sales rep |

Light and dark modes both ship in v1. Details: EXPERIENCE.md → Responsive & Platform.

## Tone of Voice

**Short, plain, calm, and on the worker's side.**

| Attribute | Means | Example |
|---|---|---|
| Plain | Say what happened and what to do next | "Saved on phone, will sync" (not "Network error") |
| Calm | No alarm, no exclamation marks | "Saved" (not "Success!") |
| Protective | No blame words, ever | "Not applied – sent to supervisor" (not "Sync failed") |
| Precise | Limits are stated in the user's own units | "Only 32 ctn available. Max 32 ctn." |
| Bilingual-equal | Bangla is written from the meaning, never as a smaller afterthought | Scan bar and floor primary buttons show Bangla first, then English |

Language rules: the whole UI uses the language the user chose; Western digits
in both languages; taka with lakh grouping (৳12,45,000); product and party
names exactly as entered. Full rules and glossary: EXPERIENCE.md → Voice and
Tone. Brand style ("Jamdani Teal", Calm Professional with a Big & Bold floor):
DESIGN.md → Brand & Style.

## Not Applicable to This Product

- **SEO and keyword map:** the app sits behind a login, with no public marketing site in v1.
- **Contact strategy:** none in v1. Revisit if a public site is added.

## Open Questions (carried from the BMAD brief and PRD)

- Do staff have, or share, smartphones good enough for camera scanning? (PRD §9 Q2, shared phones)
- Will staff accept more accountability if it visibly protects them too?
- What security and backup promises do owners need before trusting a new web app?
- Is the market gap real? Needs 3–5 distributor interviews.

---

**Status:** Product Brief Complete
**Next Phase:** Trigger Mapping (Phase 2)
**Last Updated:** 2026-10-23
