import { defineConfig, devices } from "@playwright/test";

// Browser smoke test, run by `npm run verify` stage 5 against the Compose
// stack (cicd-pipeline.md). It is not part of the unit test run.
export default defineConfig({
  testDir: "./e2e",
  outputDir: "../../test-results",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 60_000,
  reporter: [["list"]],
  use: {
    baseURL: process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:8080",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 800 },
      },
    },
  ],
});
