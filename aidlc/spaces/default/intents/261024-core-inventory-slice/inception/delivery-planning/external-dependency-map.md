# External Dependency Map — Mojud core slice

Things outside the project that the Bolts in `bolt-plan.md` rely on (a Bolt is one build pass that ends in running, tested code). The work is AI-built and local only (`unit-of-work.md`, `unit-of-work-dependency.md`, `contract-summary.md`, team practices in `team-practices.md`), so the list is short. Requirements (`requirements.md`), stories (`stories.md`), mockups (`mockups.md`), components (`components.md`) and the story map (`unit-of-work-story-map.md`) name no external systems.

| Dependency | Owner | Lead time | Blocks | If it slips |
|---|---|---|---|---|
| Docker Desktop with WSL 2 installed and running on the build machine | You | About 1 hour, plus a restart; may need virtualization turned on in BIOS | B1 (and everything after) | Use the allowed fallback: PostgreSQL alone in Docker, or PostgreSQL installed directly, with the backend and web app run by Node |
| Node.js (current LTS) on the build machine, for running tools outside Docker | You | Minutes | B1 | Run tools only inside Docker containers |
| Package registry (npm) reachable over the internet | npm | None | B1 and any Bolt adding a library | Retry later; nothing else depends on it |

No external APIs, data feeds, approvals or other teams are involved this round.

## Assumptions & Open Questions

None.
