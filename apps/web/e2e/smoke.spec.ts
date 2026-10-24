/**
 * Smoke test of the running stack (verify stage 5; cicd-pipeline.md):
 * sign-up -> home -> sign-out -> sign-in, the timing targets (NFR5.1-NFR5.4),
 * the keyboard path (NFR6.2), the web security headers (NFR1.14) and the dark
 * theme applied on first load (BR5.1).
 */
import { expect, test, type APIResponse, type Page } from "@playwright/test";

const LIMIT_MS = 2000;
const ME_MEDIAN_LIMIT_MS = 200;

// Unique per run, so a repeated run never hits DUPLICATE: "01" + 9 digits = 11 digits (BR1.2).
const phone = `01${String(Date.now()).slice(-9)}`;
const password = "smoke-test-password";
const businessName = `Smoke Traders ${phone}`;

test.describe.configure({ mode: "serial" });

function expectWebHeaders(response: APIResponse, label: string): void {
  const headers = response.headers();
  expect(headers["x-content-type-options"], label).toBe("nosniff");
  expect(headers["x-frame-options"], label).toBe("DENY");
  expect(headers["referrer-policy"], label).toBe("same-origin");
  expect(headers["content-security-policy"], label).toContain(
    "default-src 'self'",
  );
  expect(headers["content-security-policy"], label).not.toContain(
    "script-src 'unsafe-inline'",
  );
}

async function timed(action: () => Promise<void>): Promise<number> {
  const start = Date.now();
  await action();
  return Date.now() - start;
}

async function expectHeading(page: Page, name: string): Promise<void> {
  await expect(page.getByRole("heading", { level: 1, name })).toBeVisible();
}

test("serves the web app with security headers on /, an asset and /theme-init.js", async ({
  request,
}) => {
  const root = await request.get("/");
  expect(root.status()).toBe(200);
  expectWebHeaders(root, "/");
  const html = await root.text();
  expect(html.indexOf("/theme-init.js")).toBeLessThan(html.indexOf("</head>"));

  const assetPath = /src="(\/assets\/[^"]+\.js)"/.exec(html)?.[1];
  expect(assetPath, "an /assets/ script in index.html").toBeDefined();
  const asset = await request.get(assetPath ?? "");
  expect(asset.status()).toBe(200);
  expectWebHeaders(asset, assetPath ?? "asset");
  expect(asset.headers()["cache-control"]).toContain("immutable");

  const themeInit = await request.get("/theme-init.js");
  expect(themeInit.status()).toBe(200);
  expectWebHeaders(themeInit, "/theme-init.js");
  expect(themeInit.headers()["cache-control"]).toContain("no-cache");
});

test("signs up, lands on Setup home, signs out and signs in again within 2 s each", async ({
  page,
}) => {
  const firstLoad = await timed(async () => {
    await page.goto("/signin");
    await expectHeading(page, "Sign in");
  });
  expect(firstLoad, "first load (NFR5.4)").toBeLessThanOrEqual(LIMIT_MS);

  await page.goto("/signup");
  await page.getByTestId("signup-business-name-input").fill(businessName);
  await page.getByTestId("signup-name-input").fill("Smoke Owner");
  await page.getByTestId("signup-phone-input").fill(phone);
  await page.getByTestId("signup-password-input").fill(password);
  let signUpResponseMs = 0;
  const signUp = await timed(async () => {
    const start = Date.now();
    const response = page.waitForResponse("**/api/v1/auth/signup");
    await page.getByTestId("signup-submit-button").click();
    await response;
    signUpResponseMs = Date.now() - start;
    await expectHeading(page, "Setup home");
  });
  console.log(
    `first load ${firstLoad} ms; sign-up ${signUp} ms (API answered after ${signUpResponseMs} ms)`,
  );
  expect(signUp, "sign-up (NFR5.1)").toBeLessThanOrEqual(LIMIT_MS);
  await expect(
    page.getByText(`Setting up ${businessName} starts here.`),
  ).toBeVisible();

  await page.getByTestId("app-bar-sign-out-button").click();
  await expectHeading(page, "Sign in");

  await page.getByTestId("signin-phone-input").fill(phone);
  await page.getByTestId("signin-password-input").fill(password);
  const signIn = await timed(async () => {
    await page.getByTestId("signin-submit-button").click();
    await expectHeading(page, "Setup home");
  });
  console.log(`sign-in ${signIn} ms`);
  expect(signIn, "sign-in (NFR5.2)").toBeLessThanOrEqual(LIMIT_MS);

  // NFR5.3: 20 /auth/me calls after a warm-up; median server time from X-Response-Time.
  await page.request.get("/api/v1/auth/me");
  const durations: number[] = [];
  for (let i = 0; i < 20; i += 1) {
    const response = await page.request.get("/api/v1/auth/me");
    expect(response.status()).toBe(200);
    durations.push(
      Number.parseFloat(response.headers()["x-response-time"] ?? "NaN"),
    );
  }
  durations.sort((a, b) => a - b);
  const median = ((durations[9] ?? NaN) + (durations[10] ?? NaN)) / 2;
  console.log(
    `/auth/me median server time: ${median} ms (budget 50 ms, fails above ${ME_MEDIAN_LIMIT_MS} ms)`,
  );
  expect(median).toBeLessThanOrEqual(ME_MEDIAN_LIMIT_MS);
});

test("signs in with the keyboard only, using the skip link, with visible focus", async ({
  page,
}) => {
  await page.goto("/signin");
  await expectHeading(page, "Sign in");

  await page.keyboard.press("Tab");
  const skipLink = page.getByTestId("skip-link");
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeInViewport();
  const outline = await skipLink.evaluate(
    (el) => getComputedStyle(el).outlineStyle,
  );
  expect(outline).not.toBe("none");

  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  await expect(page.getByTestId("signin-phone-input")).toBeFocused();
  await page.keyboard.type(phone);
  await page.keyboard.press("Tab");
  await expect(page.getByTestId("signin-password-input")).toBeFocused();
  await page.keyboard.type(password);
  await page.keyboard.press("Enter");

  await expectHeading(page, "Setup home");
});

test("applies a saved dark theme on first load", async ({ page }) => {
  await page.addInitScript(() =>
    window.localStorage.setItem("mojud-theme", "dark"),
  );

  await page.goto("/signin");
  await expectHeading(page, "Sign in");

  expect(
    await page.evaluate(() =>
      document.documentElement.getAttribute("data-theme"),
    ),
  ).toBe("dark");
  const background = await page.evaluate(
    () => getComputedStyle(document.body).backgroundColor,
  );
  expect(background).toBe("rgb(14, 23, 22)");
});
