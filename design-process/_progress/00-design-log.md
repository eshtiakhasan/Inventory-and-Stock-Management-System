# Design Log — Mojud (E2E_IAM)

## Current

| Task | Started |
|---|---|
| Review open questions and [BN: verify] strings before development handoff | 2026-10-24 |

## Decisions

| Date | Phase | Decision |
|---|---|---|
| 2026-10-23 | Setup | WDS is the single source of truth for UX. BMAD brief, PRD, DESIGN.md, EXPERIENCE.md and the 4 mockups are inputs, not to be redone. |
| 2026-10-23 | Setup | WDS outputs go to `design-process/` (`design_artifacts` in `_bmad/wds/config.yaml`). |
| 2026-10-23 | 1 | Complete brief, seeded from existing docs. Business model: free learning project in v1. Client: solo owner. SEO and contact strategy marked not applicable. |
| 2026-10-23 | 2 | Trigger map built from existing docs. Persona priority: Karim (Worker) > Mr. Haque (Owner) > Nasima (Supervisor); Sales rep, Manager and Accountant are supporting groups. Fears are inferred and need validating in interviews. Issues inbox and Owner view get deep design despite low scores (override). |
| 2026-10-23 | 3 | 11 scenarios, 30 pages, Suggest mode, storyboard format; every page in exactly one scenario. P1 = 01 Receiving, 02 Picking/damage, 03 Inbox, 04 Owner loss trace (each with a BMAD mockup). Manager named "Rafiq" (illustrative). Purchase orders sit in setup (09). Scenario 01 uses the offline case as its sunshine path so the Offline queue page has a home. |
| 2026-10-23 | 4 | Cross-cutting decisions DD-1…DD-4 (stock moves on each Save line; ৳ ranks the inbox but is shown only to value roles; low stock = Promisable ≤ threshold; Scan bar on floor screens only) → `C-UX-Scenarios/00-design-decisions.md`. Upstream PRD/DESIGN.md edits pending. |
| 2026-10-24 | 4 | DD-1 amended and DD-5…DD-10 added: transfers are drafts until sent; count discrepancies apply at Close count (late lines become an Issue); counters can't see system quantities during a count; shared-phone setting, with queued actions syncing as their author; Owner Orders tab; product alternate names. Draft-transfer Issue decisions: Keep draft / Discard draft. Assumptions marked. |
| 2026-10-24 | 4 | Upstream applied: PRD, DESIGN.md and EXPERIENCE.md updated with DD-1…DD-10 (change logs in each). |
| 2026-10-24 | 7 | Mode: custom (no component library). DESIGN.md frontmatter is the single source of token values. Duplicate detection: desk quantity entry, money input, date input and text area are variants; data-table, combobox, section-nav, setup-checklist, form-error-summary, recovery-code, file-upload, step-card and line-item-editor are new. |
| 2026-10-23 | 4 | Activity [P] Specify, with mockups standing in for sketches. Specs use BN + EN (not SE/EN) and DESIGN.md token names until Phase 7 builds D-Design-System. EXPERIENCE.md wins over the mockups where they differ. |

## Design Loop Status

| Page | Status | Date |
|---|---|---|
| 01.1–01.4, 02.1–02.2, 03.1–03.2, 04.1–04.2 | specifying | 2026-10-23 |
| 01.1–01.4, 02.1–02.2, 03.1–03.2, 04.1–04.2 | specified (151 open questions, Bangla strings marked [BN: verify]) | 2026-10-23 |
| 05.1 – 11.1 (20 pages) | outlined | 2026-10-23 |
| 01–04 (10 pages) | DD-1…DD-4 applied | 2026-10-23 |
| 05.1 – 11.1 (20 pages) | specified | 2026-10-23 |
| All 30 pages | DD-5…DD-10 applied | 2026-10-24 |
| All 30 pages | linked to D-Design-System; consistency pass done | 2026-10-24 |

## Completed

- [x] Phase 1: Product Brief → `A-Product-Brief/project-brief.md`
- [x] Phase 2: Trigger Map → `B-Trigger-Map/trigger-map.md`, `personas/`, `feature-impact-analysis.md`
- [x] Phase 3: Scenarios → `C-UX-Scenarios/00-ux-scenarios.md` + 11 scenario folders, 30 page folders
- [x] Phase 4: UX Design → 30 page specs + `C-UX-Scenarios/00-design-decisions.md`

## Backlog

- [x] Phase 4: specify P1 pages (01–04)
- [x] Resolve cross-cutting P1 open questions before P2/P3 (DD-1…DD-4)
- [x] Phase 4: specify P2/P3 pages (05–11). All 30 pages specified: 377 open questions, 76 resolved
- [x] Decide the next round of cross-cutting questions (DD-5…DD-10)
- [x] Apply upstream edits to the PRD, DESIGN.md and EXPERIENCE.md
- [ ] Native-speaker review of strings marked [BN: verify]
- [ ] Triage the remaining open questions (462 open / 138 resolved across specs and components)
- [ ] Validate `[ASSUMPTION]` items with distributors (24 h draft deadline, Shared phone default, 5 alternate names, 5-tab bar at 320 px, signed action tokens)
- [ ] Phase 4 [H] Design Delivery, or architecture next
- [x] Phase 7: Design System → `D-Design-System/` (00-design-system.md, design-tokens.md, 42 components, catalog.html); 30 specs linked to it; cross-page inconsistencies fixed
