# Business Rules — walking-skeleton

Rules for sign-up, sign-in, sessions, business isolation and the app shell in U1 (`unit-of-work.md`; stories in `unit-of-work-story-map.md`), from `requirements.md`, the IdentityAccess component in `components.md` and the `/auth/*` contract in `contract-summary.md`.

```yaml
rules:
  - id: BR1.1
    statement: Sign-up requires business name, your name, phone number and password
    category: validation
    applies_to: sign-up
    trigger: sign-up submitted
    logic: IF businessName, name or phone is missing or blank after trimming, OR password is missing or empty THEN refuse with VALIDATION_FAILED naming each field; names longer than 100 characters are refused the same way. Passwords are never trimmed
    violation: 400 VALIDATION_FAILED with field; nothing saved; typed values kept on screen
    source: FR1.1
  - id: BR1.2
    statement: Phone numbers are normalized and must be 6 to 15 digits
    category: validation
    applies_to: sign-up, sign-in
    trigger: phone received
    logic: remove spaces and dashes; IF the result is not 6 to 15 digits THEN refuse
    violation: sign-up 400 VALIDATION_FAILED field phone; sign-in is treated as wrong details (BR2.1)
    source: FR1.1, FR1.2
  - id: BR1.3
    statement: A phone number belongs to at most one user across all businesses
    category: constraint
    applies_to: User.phone
    trigger: sign-up (and user creation in U2)
    logic: IF a user with the same normalized phone exists in any business THEN refuse. The check is backed by a uniqueness constraint, so when two sign-ups with the same phone arrive at the same moment, the one that fails inside its transaction is also reported as DUPLICATE and saves nothing
    violation: 409 DUPLICATE field phone, "This phone number is already registered"
    source: FR1.1
  - id: BR1.4
    statement: Passwords are 8 to 128 characters
    category: validation
    applies_to: sign-up
    trigger: password received
    logic: count every character exactly as typed (no trimming); IF length < 8 THEN refuse with "At least 8 characters."; IF length > 128 THEN refuse
    violation: 400 VALIDATION_FAILED field password
    source: FR1.1
  - id: BR1.5
    statement: Passwords are stored only as a salted slow hash
    category: policy
    applies_to: User.passwordHash
    trigger: user created or password set
    logic: hash with a per-password salt using a slow password-hashing function; never store, return or log the plain password
    violation: not applicable (design-time guarantee, checked by test)
    source: NFR1
  - id: BR1.6
    statement: Sign-up creates the business and its first Owner together, then signs the Owner in
    category: policy
    applies_to: Business, User, Session
    trigger: valid sign-up
    logic: in one transaction create Business and a User with role owner and active true; IF any step fails THEN nothing is saved; on success create a Session (BR2.3)
    violation: 500 INTERNAL_ERROR "Couldn't save. Try again." (BR2.8); no partial business; a phone uniqueness failure inside the transaction is 409 DUPLICATE (BR1.3)
    source: FR1.1
  - id: BR2.1
    statement: Sign-in failures never reveal which field was wrong
    category: authorization
    applies_to: sign-in
    trigger: sign-in submitted
    logic: IF phone or password is missing or empty, OR the phone is not valid after normalization, OR no user has that phone, OR the password does not match THEN refuse with the same code, message and similar response time
    violation: 401 INVALID_CREDENTIALS "Sign-in details are not correct."
    source: FR1.2
  - id: BR2.2
    statement: Deactivated users cannot sign in
    category: authorization
    applies_to: sign-in
    trigger: phone and password match
    logic: IF the phone and password match AND user.active is false THEN refuse (the deactivated message is only shown after a correct password)
    violation: 401 ACCOUNT_DEACTIVATED "This account is deactivated."
    source: FR1.2
  - id: BR2.3
    statement: A session ends 12 hours after its last use
    category: policy
    applies_to: Session
    trigger: any authenticated request
    logic: expired sessions stay stored until their next use; IF the cookie names a stored session AND now > expiresAt THEN delete it and refuse with SESSION_ENDED; ELSE set lastUsedAt to now and expiresAt to now plus 12 hours. A stored session never used again is removed by a daily clean-up after 7 days past expiry
    violation: 401 SESSION_ENDED
    source: contract C1 (Q3 of this stage)
  - id: BR2.4
    statement: Signing out ends the session at once
    category: policy
    applies_to: Session
    trigger: sign-out
    logic: delete the session and clear the cookie; a later request with the old cookie names no stored session and is refused as NOT_SIGNED_IN (the same as having no cookie)
    violation: 401 NOT_SIGNED_IN on later requests
    source: FR1.2
  - id: BR2.5
    statement: Every change request carries the session's CSRF token
    category: authorization
    applies_to: all non-GET requests except sign-up and sign-in
    trigger: request received
    logic: IF the X-CSRF-Token header is missing or differs from the session's csrfToken THEN refuse
    violation: 403 FORBIDDEN
    source: contract C1
  - id: BR2.6
    statement: Every authenticated request runs as an active user
    category: authorization
    applies_to: all authenticated requests
    trigger: session resolved to a caller
    logic: IF the session's user is inactive THEN delete the session and refuse
    violation: 401 SESSION_ENDED
    source: FR2.2, contract C1
  - id: BR3.1
    statement: A caller only ever sees their own business's records
    category: authorization
    applies_to: every query
    trigger: any data read or write
    logic: the caller context always carries businessId; every data-access function takes it as a required argument and scopes its query by it; IF a record belongs to another business THEN behave as if it does not exist. In this unit the only data reads are the caller's own user and business, so the 404 path is first exercised by record-by-ID endpoints in the backend unit
    violation: 404 NOT_FOUND
    source: FR1.3, NFR2
  - id: BR2.7
    statement: The caller context handed to every module is complete and safe
    category: authorization
    applies_to: IdentityAccess interface (contract C2)
    trigger: request authenticated (WF4)
    logic: resolveCaller returns userId, businessId, businessName, name, role and warehouseIds; in this unit warehouseIds is always an empty list (warehouse assignment arrives in the backend unit). authorize is delivered in this unit with one rule (the caller is signed in and active); the role table and warehouse scope are added to it in the backend unit
    violation: 401 per WF4
    source: contract C2, FR2.2
  - id: BR2.8
    statement: Unexpected server failures save nothing and return a stable code
    category: policy
    applies_to: all endpoints
    trigger: an unexpected error during a request
    logic: roll back the request's transaction; respond with INTERNAL_ERROR and "Couldn't save. Try again."; never include internal details
    violation: 500 INTERNAL_ERROR
    source: phases/construction Error Handling
  - id: BR4.1
    statement: Each role lands on its own home after sign-in
    category: policy
    applies_to: web app
    trigger: successful sign-up or sign-in, or opening the app while signed in
    logic: owner or manager → Setup home; sales_rep → Dispatch orders; warehouse_worker → My tasks; supervisor or accountant → "coming in a later round"
    violation: not applicable
    source: FR2.3
  - id: BR5.1
    statement: The theme follows the device until the user chooses, and the choice is remembered in that browser
    category: policy
    applies_to: web app
    trigger: page load, theme switch
    logic: IF a saved choice exists THEN apply it before first paint; ELSE follow the device setting
    violation: not applicable
    source: FR18.2
  - id: BR5.2
    statement: All screen text comes from one English translation file
    category: policy
    applies_to: web app
    trigger: any text shown
    logic: screens look up text by key; no screen text is written directly in components
    violation: not applicable (checked in review)
    source: FR18.1
```

## Rules Summary

| ID | Rule | Category | Source |
|---|---|---|---|
| BR1.1 | Sign-up fields required | validation | FR1.1 |
| BR1.2 | Phone normalized, 6–15 digits | validation | FR1.1, FR1.2 |
| BR1.3 | Phone unique across all businesses | constraint | FR1.1 |
| BR1.4 | Password 8–128 characters | validation | FR1.1 |
| BR1.5 | Password stored only as salted slow hash | policy | NFR1 |
| BR1.6 | Business and Owner created together | policy | FR1.1 |
| BR2.1 | Sign-in failure never names the field | authorization | FR1.2 |
| BR2.2 | Deactivated users cannot sign in | authorization | FR1.2 |
| BR2.3 | Session ends 12 hours after last use | policy | C1 |
| BR2.4 | Sign-out ends the session | policy | FR1.2 |
| BR2.5 | CSRF token on change requests | authorization | C1 |
| BR2.6 | Requests run as an active user | authorization | FR2.2 |
| BR2.7 | Caller context fields; authorize in U1 | authorization | C2, FR2.2 |
| BR2.8 | Unexpected failures save nothing, code INTERNAL_ERROR | policy | construction rules |
| BR3.1 | Business isolation | authorization | FR1.3, NFR2 |
| BR4.1 | Role landing pages | policy | FR2.3 |
| BR5.1 | Theme choice | policy | FR18.2 |
| BR5.2 | Translation file | policy | FR18.1 |

## Assumptions & Open Questions

None.
