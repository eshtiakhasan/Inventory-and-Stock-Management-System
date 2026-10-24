# Functional Design — walking-skeleton — Questions

> Context: the walking skeleton (U1 in `unit-of-work.md`) delivers sign-up, sign-in and sign-out end to end (US1.1, US1.2 in `unit-of-work-story-map.md`), using the IdentityAccess component (`components.md`) and the `/auth/*` contract (`contract-summary.md`). Requirements FR1.1–FR1.3, FR2.3 and FR18 apply. Most of it is settled; only these points are open.

## Q1. What phone number format should sign-up and sign-in accept?

People sign in with phone and password only (no business name), so a phone number must be unique across all businesses, not just within one.

A. Bangladesh mobile numbers: 11 digits starting with 01 (for example 01712345678); spaces, dashes and a leading +880 are accepted and removed before saving
B. Any phone number of 6 to 15 digits, with spaces and dashes removed
C. Not yet defined
X. Other (please specify)

[Answer]: B

## Q2. Which acceptance checks should the skeleton prove, given that other roles' users only arrive in a later unit?

The Units Generation review noted that some US1.1 and US1.2 checks need users of other roles (created in U2) or screens that only exist in U3.

A. The skeleton proves sign-up, sign-in, sign-out, the Owner's landing page, password hashing, the theme switch and business isolation for its own data; the other-role landings, deactivated users and the full accessibility pass are checked again in U2 and U3
B. The skeleton also adds test users of every role directly in the database, so every landing page is checked now
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q3. How long should a sign-in session last?

A. Ends after 12 hours without use, or at sign-out
B. Ends after 7 days without use, or at sign-out
C. Lasts until sign-out
D. Not yet defined
X. Other (please specify)

[Answer]: A

## Consolidated Summary Confirmation

- Phone numbers (Q1): any number of 6 to 15 digits; spaces and dashes are removed before saving; each number is unique across all businesses.
- Scope of checks (Q2): the skeleton proves sign-up, sign-in, sign-out, the Owner's landing page, password hashing, the theme switch and business isolation for its own data. Other roles' landing pages, deactivated users and the full accessibility pass are checked again in U2 and U3.
- Sessions (Q3): a session ends after 12 hours without use, or at sign-out.

Does this all look correct before I generate the artifact?

- Looks correct
- Request changes

[Answer]: Looks correct
