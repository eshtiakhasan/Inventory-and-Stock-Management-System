import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  aSession,
  callOf,
  NOT_SIGNED_IN,
  renderApp,
  stubFetch,
} from "./helpers";

const ME = "GET /api/v1/auth/me";
const SIGNIN = "POST /api/v1/auth/signin";

async function signIn(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Phone number"), "01711000001");
  await user.type(screen.getByTestId("signin-password-input"), "correct horse");
  await user.click(screen.getByTestId("signin-submit-button"));
}

describe("SignInPage (M2, US1.2)", () => {
  it("shows INVALID_CREDENTIALS in the summary, which takes focus, without naming a field", async () => {
    const user = userEvent.setup();
    renderApp({
      path: "/signin",
      fetchFn: stubFetch({
        [ME]: NOT_SIGNED_IN,
        [SIGNIN]: {
          status: 401,
          body: {
            code: "INVALID_CREDENTIALS",
            message: "Sign-in details are not correct.",
          },
        },
      }),
    });
    await screen.findByRole("heading", { name: "Sign in" });

    await signIn(user);

    const summary = await screen.findByTestId("signin-error-summary");
    expect(summary).toHaveTextContent("Sign-in details are not correct.");
    expect(summary).toHaveFocus();
    expect(screen.getByLabelText("Phone number")).not.toHaveAttribute(
      "aria-invalid",
    );
  });

  it("shows ACCOUNT_DEACTIVATED in the summary", async () => {
    const user = userEvent.setup();
    renderApp({
      path: "/signin",
      fetchFn: stubFetch({
        [ME]: NOT_SIGNED_IN,
        [SIGNIN]: {
          status: 401,
          body: {
            code: "ACCOUNT_DEACTIVATED",
            message: "This account is deactivated.",
          },
        },
      }),
    });
    await screen.findByRole("heading", { name: "Sign in" });

    await signIn(user);

    expect(await screen.findByTestId("signin-error-summary")).toHaveTextContent(
      "This account is deactivated.",
    );
  });

  it("returns to the page first asked for after signing in", async () => {
    const user = userEvent.setup();
    const fetchFn = stubFetch({
      [ME]: NOT_SIGNED_IN,
      [SIGNIN]: { status: 200, body: aSession("manager") },
    });
    renderApp({ path: "/dispatch-orders", fetchFn });
    await screen.findByRole("heading", { name: "Sign in" });
    expect(screen.getByTestId("location")).toHaveTextContent("/signin");
    expect(
      screen.queryByTestId("signin-session-ended"),
    ).not.toBeInTheDocument();

    await signIn(user);

    expect(
      await screen.findByRole("heading", { name: "Dispatch orders" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("location")).toHaveTextContent(
      "/dispatch-orders",
    );
    expect(callOf(fetchFn, 1).body).toEqual({
      phone: "01711000001",
      password: "correct horse",
    });
  });

  it("shows and hides the password with the Show/Hide button", async () => {
    const user = userEvent.setup();
    renderApp({ path: "/signin", fetchFn: stubFetch({ [ME]: NOT_SIGNED_IN }) });
    await screen.findByRole("heading", { name: "Sign in" });
    const password = screen.getByTestId("signin-password-input");
    const toggle = screen.getByTestId("signin-password-input-toggle");

    await user.type(password, "secret pass");
    await user.click(toggle);
    const shown = password.getAttribute("type");
    const pressedWhenShown = toggle.getAttribute("aria-pressed");
    await user.click(toggle);

    expect(shown).toBe("text");
    expect(pressedWhenShown).toBe("true");
    expect(toggle).toHaveTextContent("Show");
    expect(password).toHaveAttribute("type", "password");
    expect(password).toHaveValue("secret pass");
  });
});
