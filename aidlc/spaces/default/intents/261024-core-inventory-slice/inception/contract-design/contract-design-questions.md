# Contract Design — Questions

> Context: Units Generation (`unit-of-work.md`, `unit-of-work-dependency.md`) gives three units in one modular monolith. The boundaries that need a formal contract are the HTTP API between the web app (U1 shell, U3 screens) and the backend service (U1 and U2), and the in-process interfaces between backend modules, including the shared-transaction rule (ADR-003). This round has no external consumers. The architecture review of Domain Design left two open points that these contracts must settle: who authorizes Stock ledger reads, and whether "apply once" covers a whole request.

## Q1. What style should the web app ↔ backend API use?

A. REST with JSON, under one base path, described in an OpenAPI spec that is the source of truth
B. GraphQL with one schema
C. A TypeScript-only RPC library (for example tRPC), with no separate spec file
D. Not yet defined
X. Other (please specify)

[Answer]: A

## Q2. How should the browser stay signed in?

A. A server-side session referenced by an HttpOnly, SameSite cookie, plus a CSRF token on every change request. The token never reaches page scripts
B. A signed token (JWT) kept in browser storage and sent in a header. Simpler server, but readable by page scripts if one is ever compromised
C. A signed token (JWT) in an HttpOnly cookie
D. Not yet defined
X. Other (please specify)

[Answer]: A

## Q3. How do the web app and the backend share request and response shapes?

A. One shared TypeScript package of request and response types, kept in line with the OpenAPI spec, used by both sides
B. Each side defines its own types
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q4. How should "apply each action once" work on the API?

Some requests make several stock changes (flagging damage also reserves a replacement; confirming dispatch covers several lines).

A. One unique key per user action, sent in an `Idempotency-Key` header on every stock-changing request; the backend saves the whole response with the key in the same transaction, and a repeat returns the saved response without changing anything
B. A unique ID per stock movement inside the request body
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q5. What should errors look like?

A. One JSON error shape everywhere: a stable error code, a plain message, the field it concerns, and the maximum allowed when a quantity is refused, with standard HTTP status codes
B. Each endpoint chooses its own error shape
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q6. How should the API be versioned?

A. A version in the path (`/api/v1`); only additive changes within a version, and clients ignore fields they don't know
B. No versioning; the web app and backend always ship together
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Consolidated Summary Confirmation

- API style (Q1): REST with JSON, described in an OpenAPI spec that is the source of truth.
- Sign-in (Q2): a server-side session in an HttpOnly, SameSite cookie, with a CSRF token on every change request.
- Shared shapes (Q3): one shared TypeScript package of request and response types, kept in line with the OpenAPI spec.
- Apply once (Q4): one `Idempotency-Key` header per user action on every stock-changing request; the whole response is saved with the key in the same transaction, and a repeat returns it unchanged.
- Errors (Q5): one JSON error shape with a stable code, message, field and, for refused quantities, the maximum; standard HTTP status codes.
- Versioning (Q6): `/api/v1` in the path; only additive changes within a version; clients ignore unknown fields.

Does this all look correct before I generate the artifact?

- Looks correct
- Request changes

[Answer]: Looks correct
