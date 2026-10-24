import { screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { aSession, NOT_SIGNED_IN, renderApp, stubFetch } from "./helpers";

// Vitest stubs CSS imports, so the token file is read from disk. Under jsdom
// import.meta.url is not a file URL, so the path comes from __dirname.
const tokensCss = readFileSync(
  path.resolve(__dirname, "../src/styles/tokens.css"),
  "utf8",
);

const THEMES = ["light", "dark"] as const;

async function checkPage(
  path: string,
  fetchFn: typeof fetch,
  heading: string,
  theme: (typeof THEMES)[number],
) {
  document.documentElement.setAttribute("data-theme", theme);
  const { container } = renderApp({ path, fetchFn, probe: false });
  await screen.findByRole("heading", { level: 1, name: heading });
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  expect(screen.getByRole("main")).toBeInTheDocument();
  expect(await axe(container)).toHaveNoViolations();
}

describe("accessibility of the skeleton screens (NFR6.1)", () => {
  it.each(THEMES)(
    "Sign up has no axe violations in the %s theme",
    async (theme) => {
      await checkPage(
        "/signup",
        stubFetch({ "GET /api/v1/auth/me": NOT_SIGNED_IN }),
        "Create your business",
        theme,
      );
    },
  );

  it.each(THEMES)(
    "Sign in has no axe violations in the %s theme",
    async (theme) => {
      await checkPage(
        "/signin",
        stubFetch({ "GET /api/v1/auth/me": NOT_SIGNED_IN }),
        "Sign in",
        theme,
      );
    },
  );

  it.each(THEMES)(
    "the signed-in shell has no axe violations in the %s theme",
    async (theme) => {
      await checkPage(
        "/",
        stubFetch({
          "GET /api/v1/auth/me": { status: 200, body: aSession("owner") },
        }),
        "Setup home",
        theme,
      );
      expect(screen.getByRole("banner")).toBeInTheDocument();
      expect(
        screen.getByRole("navigation", { name: "Main" }),
      ).toBeInTheDocument();
    },
  );
});

// --- Token contrast (NFR6.2): text pairs must reach 4.5:1 in both themes. ---

function readBlock(selector: string): Record<string, string> {
  const start = tokensCss.indexOf(`${selector} {`);
  if (start === -1) throw new Error(`no ${selector} block in tokens.css`);
  const body = tokensCss.slice(start, tokensCss.indexOf("}", start));
  const values: Record<string, string> = {};
  for (const match of body.matchAll(/--(colors-[a-z-]+):\s*(#[0-9a-f]{6})/gi)) {
    if (match[1] && match[2]) values[match[1]] = match[2];
  }
  return values;
}

function luminance(hex: string): number {
  const channels = [1, 3, 5].map(
    (i) => parseInt(hex.slice(i, i + 2), 16) / 255,
  );
  const [r, g, b] = channels.map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  ) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [
    number,
    number,
  ];
  return (hi + 0.05) / (lo + 0.05);
}

const TEXT_PAIRS: readonly [string, string][] = [
  ["colors-text", "colors-surface"],
  ["colors-text", "colors-surface-alt"],
  ["colors-text-muted", "colors-surface"],
  ["colors-text-muted", "colors-surface-alt"],
  ["colors-on-primary", "colors-primary"],
  ["colors-primary", "colors-surface"],
  ["colors-primary", "colors-surface-alt"],
  ["colors-danger", "colors-surface"],
];

describe("token contrast (NFR6.2)", () => {
  const light = readBlock(":root");
  const darkAttribute = { ...light, ...readBlock(':root[data-theme="dark"]') };
  const darkDevice = {
    ...light,
    ...readBlock(':root:not([data-theme="light"])'),
  };

  it.each([
    ["light", light],
    ["dark (chosen)", darkAttribute],
    ["dark (device)", darkDevice],
  ] as const)(
    "every text pair reaches 4.5:1 in the %s theme",
    (_name, palette) => {
      for (const [fg, bg] of TEXT_PAIRS) {
        const fgValue = palette[fg];
        const bgValue = palette[bg];
        expect(fgValue, fg).toBeDefined();
        expect(bgValue, bg).toBeDefined();
        expect(
          contrast(fgValue ?? "", bgValue ?? ""),
          `${fg} on ${bg}`,
        ).toBeGreaterThanOrEqual(4.5);
      }
    },
  );

  it("uses the same dark values for the chosen and the device dark theme", () => {
    expect(readBlock(':root[data-theme="dark"]')).toEqual(
      readBlock(':root:not([data-theme="light"])'),
    );
  });
});
