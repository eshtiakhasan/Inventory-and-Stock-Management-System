# Personas — Mojud core slice

Plain role names are used in the stories (user-stories Q2). Each role below is drawn from `requirements.md` (FR2.1, FR2.3) and the PRD's jobs-to-be-done; the named personas in `design-process/B-Trigger-Map/personas/` remain the deeper background.

## Owner

- **Role:** pays for Mojud, creates the business, has every permission this round.
- **Goals:** get the business set up quickly; trust that stock numbers are right without visiting the warehouse.
- **Pain points:** Excel and paper records nobody trusts; losses with no explanation.
- **Tech comfort:** medium; uses a desktop browser for setup.
- **Frequency this round:** setup, then occasional checks of the Issues list.
- **Lands on:** Setup home.

## Manager

- **Role:** runs stock day to day; sets up products, suppliers, opening stock and purchase orders; can do anything the Owner can except manage Owners.
- **Goals:** get products and opening stock in correctly; send purchase orders; see problems that need attention.
- **Pain points:** discrepancies with no trail of who did what.
- **Tech comfort:** medium to high; desktop.
- **Frequency this round:** daily.
- **Lands on:** Setup home.

## Sales rep

- **Role:** creates dispatch orders for customers.
- **Goals:** promise only what is really available, and know it is held for the customer.
- **Pain points:** promising stock that turns out not to exist.
- **Tech comfort:** medium.
- **Frequency this round:** several times a day.
- **Lands on:** Dispatch orders.

## Warehouse worker (primary user)

- **Role:** receives supplier deliveries, picks dispatch orders and flags damage, in assigned warehouses only.
- **Goals:** see the next task without asking; record work fast; know it was saved; have a record that protects them from blame.
- **Pain points:** slow paperwork; being blamed for gaps they did not cause.
- **Tech comfort:** low to medium.
- **Frequency this round:** all day.
- **Lands on:** My tasks.

## Supervisor and Accountant

These roles exist with their permissions (FR2.1) but have no screens this round; they land on a "coming in a later round" page (FR2.3).

## Relationships and Priority

| Priority | Role | Why |
|---|---|---|
| 1 | Warehouse worker | Every stock record starts with their actions; the product fails if they don't record |
| 2 | Manager | Creates the records the worker acts on |
| 3 | Sales rep | Creates the demand the worker picks |
| 4 | Owner | Creates the business; benefits from trustworthy records |

The Owner creates the business and users; the Manager sets up products, stock and purchase orders; the Sales rep orders stock for customers; the Warehouse worker receives and picks.

## Assumptions & Open Questions

None.
