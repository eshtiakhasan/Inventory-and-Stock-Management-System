# Scalability Requirements — walking-skeleton

U1 runs on one machine for one builder (`requirements.md` NFR8; constraint register C-T2). Scaling out is not a goal this round. These requirements only keep later scaling possible without a rewrite.

## Load Projections

| Item | This round |
|---|---|
| Businesses | Under 10 (demo data) |
| Users | Under 50 |
| Simultaneous users | Up to 5 browser sessions on one machine |
| Sessions stored | Under 1,000, kept small by the daily clean-up (BR2.3) |

## Requirements

| ID | Requirement | Check |
|---|---|---|
| NFR8.1 | The backend keeps no session or user state in memory. All session data is in PostgreSQL, so more backend instances could run later with no code change. | Review; an integration test restarts the backend and the session still works |
| NFR8.2 | Database connections come from one pool (at most 10 connections), set by `DB_POOL_MAX`. | Config test |
| NFR8.3 | Indexes support the U1 lookups: unique index on `users.phone`, primary key on `sessions.id_hash`, index on `sessions.expires_at` for the clean-up, and an index on `users.business_id`. | Migration review |

## Capacity Planning and Scaling Triggers

None are needed this round. The app is revisited for scaling when a cloud deployment is planned, which is out of scope (`project.md` Forbidden).

## Assumptions & Open Questions

None.
