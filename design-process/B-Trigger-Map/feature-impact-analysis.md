# Feature Impact Analysis: Mojud (E2E_IAM)

> Scope is already fixed: all 18 v1 features are MUST (brief → Scope, PRD §7.1).
> This analysis does **not** cut scope. It decides **how much design depth**
> each feature gets in Phase 4.

## Scoring

**Primary persona (Karim, Worker):** High = 5 pts | Medium = 3 pts | Low = 1 pt
**Other personas (Haque, Owner; Nasima, Supervisor):** High = 3 pts | Medium = 1 pt | Low = 0 pts

**Max possible score:** 11 (3 personas)
**Deep-design threshold:** 8+, or Primary High (5)

## Prioritized Features

| Rank | Feature (brief #) | Worker | Owner | Supervisor | Score | Design depth |
|---|---|---|---|---|---|---|
| 1 | Damage flag + one-tap approval (8) | H 5 | H 3 | H 3 | 11 | Deep |
| 2 | Append-only ledger / instant proof (3) | H 5 | H 3 | M 1 | 9 | Deep |
| 2 | Blind receiving against PO (5) | H 5 | H 3 | M 1 | 9 | Deep |
| 2 | Transfers with receiving count (7) | H 5 | H 3 | M 1 | 9 | Deep |
| 2 | Bangla + English (13) | H 5 | M 1 | H 3 | 9 | Deep (cross-cutting) |
| 6 | Dispatch with reservation / picking (6) | H 5 | M 1 | M 1 | 7 | Deep (Primary High) |
| 6 | Offline scan queue (16) | H 5 | M 1 | M 1 | 7 | Deep (Primary High) |
| 6 | Stock states + promisable (4) | M 3 | H 3 | M 1 | 7 | Standard |
| 6 | Stock counts + discrepancy cases (10) | M 3 | H 3 | M 1 | 7 | Standard |
| 6 | Roles + segregation of duties (11) | M 3 | H 3 | M 1 | 7 | Standard |
| 11 | Camera barcode scanning (12) | H 5 | L 0 | M 1 | 6 | Deep (Primary High) |
| 11 | My tasks (FR-53) | H 5 | L 0 | M 1 | 6 | Deep (Primary High) |
| 11 | My record (17) | H 5 | M 1 | L 0 | 6 | Deep (Primary High) |
| 14 | Prioritised issues inbox (9) | L 1 | M 1 | H 3 | 5 | **Deep (override)** |
| 15 | Excel import (14) | L 1 | H 3 | L 0 | 4 | Standard |
| 15 | Low stock + owner losses in taka (15) | L 1 | H 3 | L 0 | 4 | **Deep (override)** |
| 17 | Product catalogue, ctn ↔ pcs (1) | M 3 | L 0 | L 0 | 3 | Light (enabler) |
| 18 | Warehouses 1–3 (2) | L 1 | M 1 | L 0 | 2 | Light (enabler) |
| 18 | Basic stock value (18) | L 1 | M 1 | L 0 | 2 | Light |

## Decisions

**Deep design** (full scenario, every state, Bangla and English copy, offline behaviour):
- Damage flag + approval, ledger proof, blind receiving, transfers, Bangla/English,
  picking, offline queue, scanning, My tasks, My record
- **Overrides:** the Issues inbox (score 5) and Owner view (score 4) fall below the
  threshold on points, but each is *the* main surface for the secondary or tertiary
  persona and directly carries objectives 4 and 5. Both already have reference
  mockups (`key-issues-inbox.html`, `key-owner-view.html`).

**Standard design** (scenario + main states):
- Promisable stock (sales rep search), stock counts and cases, roles and SoD, Excel import

**Light design** (functional desk screens following DESIGN.md patterns):
- Product catalogue, warehouses, stock value

## Mapping to existing mockups

| Mockup | Feature(s) | Persona |
|---|---|---|
| `key-receiving.html` | Blind receiving (5), scanning (12) | Karim |
| `key-picking.html` | Picking (6), damage flag (8) | Karim |
| `key-issues-inbox.html` | Issues inbox (9), damage approval (8) | Nasima |
| `key-owner-view.html` | Owner losses (15), drill-down | Mr. Haque |

---

_Generated with Whiteport Design Studio framework_
_Strategic input for Phase 3: UX Scenarios and Phase 4: UX Design_
