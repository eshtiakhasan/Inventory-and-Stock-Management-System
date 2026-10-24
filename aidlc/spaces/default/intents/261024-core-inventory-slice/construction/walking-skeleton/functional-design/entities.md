# Entities — walking-skeleton

Entities for the walking skeleton (U1 in `unit-of-work.md`), the IdentityAccess part from `components.md`, delivering US1.1 and US1.2 (`unit-of-work-story-map.md`) against FR1.1–FR1.3 in `requirements.md` and the `/auth/*` contract in `contract-summary.md`. Warehouses and user-warehouse assignment are added in the backend unit (U2).

```yaml
entities:
  - name: Business
    description: One customer company using Mojud; every record belongs to exactly one business
    attributes:
      - { name: id, type: identifier, required: true, unique: true, default: generated }
      - { name: name, type: text, required: true, min: 1, max: 100, constraints: [trimmed, not blank] }
      - { name: createdAt, type: timestamp, required: true, default: now }
    relationships:
      - { to: User, cardinality: one-to-many, direction: Business has Users }

  - name: User
    description: A person who signs in; belongs to one business and has one role
    attributes:
      - { name: id, type: identifier, required: true, unique: true, default: generated }
      - { name: businessId, type: identifier, required: true, references: Business.id }
      - { name: name, type: text, required: true, min: 1, max: 100, constraints: [trimmed, not blank] }
      - { name: phone, type: text, required: true, unique: true, constraints: [digits only after normalization, 6 to 15 digits, unique across all businesses] }
      - { name: role, type: enum, required: true, allowed: [owner, manager, supervisor, warehouse_worker, sales_rep, accountant] }
      - { name: passwordHash, type: text, required: true, constraints: [salted slow hash, never returned or logged] }
      - { name: active, type: boolean, required: true, default: true }
      - { name: createdAt, type: timestamp, required: true, default: now }
    constraints:
      - every business has at least one active user with role owner (holds from sign-up; enforced on change in U2)
    relationships:
      - { to: Business, cardinality: many-to-one, direction: User belongs to Business }
      - { to: Session, cardinality: one-to-many, direction: User has Sessions }

  - name: Session
    description: A signed-in browser session referenced by an HttpOnly cookie
    attributes:
      - { name: id, type: opaque random token, required: true, unique: true, constraints: [at least 128 bits of randomness] }
      - { name: userId, type: identifier, required: true, references: User.id }
      - { name: csrfToken, type: opaque random token, required: true }
      - { name: createdAt, type: timestamp, required: true, default: now }
      - { name: lastUsedAt, type: timestamp, required: true, default: now }
      - { name: expiresAt, type: timestamp, required: true, constraints: [lastUsedAt plus 12 hours] }
    relationships:
      - { to: User, cardinality: many-to-one, direction: Session belongs to User }
```

## Summary

| Entity | Purpose | Key rules |
|---|---|---|
| Business | The customer company | Name required; owns every other record |
| User | A person who signs in | Phone unique across all businesses; one of six roles; password stored only as a hash |
| Session | A signed-in browser | Ends 12 hours after last use or at sign-out; carries the CSRF token |

## Assumptions & Open Questions

None.
