import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  aSession,
  callOf,
  NOT_SIGNED_IN,
  renderApp,
  stubFetch,
  type StubResponse,
} from "./helpers";

const SIGNUP = "POST /api/v1/auth/signup";
const ME = "GET /api/v1/auth/me";

async function fillForm(
  user: ReturnType<typeof userEvent.setup>,
  phone = "01711 000-001",
) {
  await user.type(screen.getByLabelText("Business name"), "Haque Traders");
  await user.type(screen.getByLabelText("Your name"), "Abdul Haque");
  await user.type(screen.getByLabelText("Phone number"), phone);
  await user.type(screen.getByTestId("signup-password-input"), "correct horse");
}

describe("SignUpPage (M1, US1.1)", () => {
  it("checks each field when the person leaves it, with the messages from the form rules", async () => {
    const user = userEvent.setup();
    renderApp({ path: "/signup", fetchFn: stubFetch({ [ME]: NOT_SIGNED_IN }) });
    await screen.findByRole("heading", { name: "Create your business" });

    await user.click(screen.getByLabelText("Business name"));
    await user.click(screen.getByLabelText("Your name"));
    await user.type(screen.getByLabelText("Phone number"), "12-34");
    await user.type(screen.getByTestId("signup-password-input"), "short");
    await user.tab();

    expect(screen.getByText("Enter your business name.")).toBeInTheDocument();
    expect(
      screen.getByText("Enter a phone number of 6 to 15 digits."),
    ).toBeInTheDocument();
    // The hint and the error share the text, so the error is checked by its id.
    const password = screen.getByTestId("signup-password-input");
    expect(password).toHaveAttribute("aria-invalid", "true");
    expect(document.getElementById("signup-password-error")).toHaveTextContent(
      "At least 8 characters.",
    );
    expect(screen.getByLabelText("Business name")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByText("Enter your name.")).toBeInTheDocument();
  });

  it("lists two or more problems in the error summary on submit and moves focus to it", async () => {
    const user = userEvent.setup();
    const fetchFn = stubFetch({ [ME]: NOT_SIGNED_IN });
    renderApp({ path: "/signup", fetchFn });
    await screen.findByRole("heading", { name: "Create your business" });

    await user.click(screen.getByTestId("signup-submit-button"));

    const summary = screen.getByTestId("signup-error-summary");
    expect(summary).toHaveFocus();
    expect(summary).toHaveTextContent("4 fields need fixing:");
    expect(fetchFn).toHaveBeenCalledTimes(1);
  });

  it("shows a server field error under the field and keeps every typed value", async () => {
    const user = userEvent.setup();
    renderApp({
      path: "/signup",
      fetchFn: stubFetch({
        [ME]: NOT_SIGNED_IN,
        [SIGNUP]: {
          status: 409,
          body: {
            code: "DUPLICATE",
            field: "phone",
            message: "This phone number is already registered",
          },
        },
      }),
    });
    await screen.findByRole("heading", { name: "Create your business" });
    await fillForm(user);

    await user.click(screen.getByTestId("signup-submit-button"));

    const phone = await screen.findByLabelText("Phone number");
    await waitFor(() =>
      expect(
        screen.getByText("This phone number is already registered"),
      ).toBeInTheDocument(),
    );
    expect(phone).toHaveAttribute("aria-invalid", "true");
    expect(phone).toHaveFocus();
    expect(phone).toHaveValue("01711 000-001");
    expect(screen.getByLabelText("Business name")).toHaveValue("Haque Traders");
  });

  it('shows "Couldn\'t save. Try again." in the focused summary on a server failure, keeping values', async () => {
    const user = userEvent.setup();
    renderApp({
      path: "/signup",
      fetchFn: stubFetch({
        [ME]: NOT_SIGNED_IN,
        [SIGNUP]: {
          status: 500,
          body: { code: "INTERNAL_ERROR", message: "x", requestId: "r-1" },
        },
      }),
    });
    await screen.findByRole("heading", { name: "Create your business" });
    await fillForm(user);

    await user.click(screen.getByTestId("signup-submit-button"));

    const summary = await screen.findByTestId("signup-error-summary");
    expect(summary).toHaveTextContent("Couldn't save. Try again.");
    expect(summary).toHaveFocus();
    expect(screen.getByLabelText("Your name")).toHaveValue("Abdul Haque");
  });

  it("shows the button as busy while saving, sends one request, then opens the Setup home", async () => {
    const user = userEvent.setup();
    let release: (value: StubResponse) => void = () => undefined;
    const pending = new Promise<StubResponse>((resolve) => {
      release = resolve;
    });
    const fetchFn = stubFetch({ [ME]: NOT_SIGNED_IN, [SIGNUP]: () => pending });
    renderApp({ path: "/signup", fetchFn });
    await screen.findByRole("heading", { name: "Create your business" });
    await fillForm(user);

    await user.click(screen.getByTestId("signup-submit-button"));
    const button = screen.getByTestId("signup-submit-button");
    await waitFor(() => expect(button).toHaveAttribute("aria-busy", "true"));
    await user.click(button);
    release({ status: 201, body: aSession("owner") });

    expect(
      await screen.findByRole("heading", { name: "Setup home" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Setting up Haque Traders starts here."),
    ).toBeInTheDocument();
    expect(screen.getByTestId("location")).toHaveTextContent("/setup");
    expect(fetchFn).toHaveBeenCalledTimes(2);
    const signUpCall = callOf(fetchFn, 1);
    expect(signUpCall.credentials).toBe("include");
    expect(signUpCall.body).toEqual({
      businessName: "Haque Traders",
      name: "Abdul Haque",
      phone: "01711 000-001",
      password: "correct horse",
    });
  });
});
