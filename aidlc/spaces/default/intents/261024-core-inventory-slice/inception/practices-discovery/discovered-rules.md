# Discovered Rules — Mojud core slice

> Only hard constraints the builder stated are listed here, confirmed in the interview (Q4, Q6). The source of each rule is given in brackets.

## Mandated

- ALWAYS build the application with TypeScript, using a React frontend, a Node backend and a PostgreSQL database. (Initial request; constraint register C-T1; interview Q6)
- ALWAYS run the application locally on the builder's machine, normally started with Docker Compose; if Docker cannot be made to work, running only the database in Docker or using a locally installed PostgreSQL is allowed. (Initial request; constraint register C-T2; intent statement S5; interview Q4 option B, Q6)

## Forbidden

- NEVER deploy the application to a cloud environment in this round. (Initial request; constraint register C-T2; scope document "Out of Scope"; interview Q6)
