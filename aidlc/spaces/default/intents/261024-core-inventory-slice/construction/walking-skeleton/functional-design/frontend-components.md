# Frontend Components — walking-skeleton

The web-app part of U1 (`unit-of-work.md`): app shell, sign-up, sign-in and role landing, built as our own components from the design system with tokens as CSS variables (refined mockups M1, M2, M15 and the layout frame). Inputs: `unit-of-work-story-map.md` (US1.1, US1.2), `requirements.md` (FR1, FR2.3, FR18), `components.md` (WebApp), `contract-summary.md` (`/auth/*`, CSRF).

## Component Hierarchy

```
App
+-- ThemeProvider            (applies saved or device theme before first paint; BR5.1)
+-- I18nProvider             (English translation file; BR5.2)
+-- SessionProvider          (calls /auth/me; holds caller and CSRF token)
+-- Router
    +-- PublicLayout
    |   +-- SignUpPage       (M1)
    |   +-- SignInPage       (M2)
    +-- SignedInLayout       (requires a caller; otherwise redirects to Sign in)
        +-- AppBar           (title, name and role, "Online", ThemeSwitch, Sign out)
        +-- SideNav          (role items; aria-current on the active one)
        +-- RoleHome         (redirects to the role's home; BR4.1)
            +-- SetupHomePlaceholder      (owner, manager)
            +-- DispatchOrdersPlaceholder (sales_rep)
            +-- MyTasksPlaceholder        (warehouse_worker)
            +-- ComingLaterPage           (supervisor, accountant; M15)
```

Shared building blocks: `InputField`, `PasswordField` (Show/Hide), `ButtonPrimary`, `ButtonSecondary`, `FormErrorSummary`, `RefusalMessage`, `ThemeSwitch`, `SkipLink`.

## Props and State

| Component | Props | State |
|---|---|---|
| SessionProvider | children | caller (or none), csrfToken, loading |
| SignUpPage | — | fields {businessName, name, phone, password}, fieldErrors, formError, saving |
| SignInPage | — | fields {phone, password}, formError, saving |
| AppBar | title | — (reads caller from SessionProvider) |
| SideNav | items by role | — |
| ThemeSwitch | — | choice: light, dark or device |
| InputField | id, label, hint, value, error, onChange, type | — |
| ButtonPrimary | label, busy, disabledReason, onClick | — |

## Interaction Flows

- **Sign up:** fields validated when leaving a field (required, phone 6–15 digits, password at least 8). Submit disables the button and shows a spinner; a server field error appears under that field; other errors appear in `FormErrorSummary`, which takes focus. Typed values are always kept. Success goes to the role home.
- **Sign in:** submit; on 401 INVALID_CREDENTIALS or ACCOUNT_DEACTIVATED the summary shows the server message and takes focus. Success goes to the page the person first asked for, if any, otherwise the role home.
- **Sign out:** Sign out sends the CSRF token, then shows Sign in.
- **401 handling:** responses from `/auth/signin` and `/auth/signup` are always shown on their own form. The first `/auth/me` call at app load shows Sign in with no message on any 401. Any other call: SESSION_ENDED returns the person to Sign in with "Your session ended. Sign in again."; NOT_SIGNED_IN returns them to Sign in with no message. In both cases the current page is remembered and reopened after signing in.
- **Theme:** ThemeSwitch saves the choice in browser storage; "Device" removes the saved choice.

## Routes

| Path | Who may open it | If not allowed |
|---|---|---|
| `/signup` | Not signed in | Signed in: go to role home |
| `/signin` | Not signed in | Signed in: go to role home |
| `/` | Signed in | Not signed in: go to `/signin`, then back here |
| `/setup` | Owner, Manager | Other roles: their own home |
| `/dispatch-orders` | Owner, Manager, Sales rep | Other roles: their own home |
| `/my-tasks` | Warehouse worker | Other roles: their own home |
| `/later` | Supervisor, Accountant | Other roles: their own home |

`/` redirects to the role's home (BR4.1). Later units add routes behind the same rules.

## Side Navigation per Role (this unit)

| Role | Items |
|---|---|
| Owner, Manager | Setup home |
| Sales rep | Dispatch orders |
| Warehouse worker | My tasks |
| Supervisor, Accountant | none (only Sign out in the app bar) |

## Placeholder Pages (this unit)

Each placeholder shows its page title as `h1` and one line: "Setting up {business name} starts here." (Setup home), "Dispatch orders will appear here." (Dispatch orders), "Your tasks will appear here." (My tasks). The Supervisor and Accountant page is the "coming in a later round" page (M15). Later units replace the placeholders with the real screens.

## Form Validation

| Field | Rule | Message |
|---|---|---|
| Business name | Required, at most 100 characters | "Enter your business name." |
| Your name | Required, at most 100 characters | "Enter your name." |
| Phone number | 6–15 digits after removing spaces and dashes | "Enter a phone number of 6 to 15 digits." |
| Password | At least 8 characters, at most 128, counted as typed (never trimmed) | "At least 8 characters." |

The server checks the same rules (BR1.1–BR1.4); the client check only gives faster feedback.

## API Integration

| Call | When | Notes |
|---|---|---|
| `GET /api/v1/auth/me` | App load | 401 means not signed in |
| `POST /api/v1/auth/signup` | Sign up | Response holds caller and CSRF token |
| `POST /api/v1/auth/signin` | Sign in | Same |
| `POST /api/v1/auth/signout` | Sign out | Sends `X-CSRF-Token` |

One API client adds credentials (cookie) to every call, adds `X-CSRF-Token` to every non-GET call, and turns the shared error shape into field or form messages. Types come from `@mojud/contracts`.

## Accessibility

Every page has one `h1`, `header`/`nav`/`main` landmarks and a skip link; labels sit above fields; errors are linked with `aria-describedby`; focus is visible in both themes; status is never shown by color alone (accessibility checklist).

## Assumptions & Open Questions

None.
