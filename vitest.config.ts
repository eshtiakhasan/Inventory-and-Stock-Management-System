// Vitest projects for this monorepo: contracts, api and web (unit-test-instructions.md).
// Vitest 3.2 replaces vitest.workspace.ts with `test.projects` in the root config.
// Coverage is configured here once, because Vitest ignores per-project coverage
// options; the 80% line floor is enforced for each source folder separately.
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

// Load TEST_DATABASE_URL from .env into this process so the api global setup
// and its forked workers can read it (NFR7.2: no manual setup beyond .env).
const fileEnv = loadEnv("test", rootDir, "");
process.env.TEST_DATABASE_URL ??= fileEnv.TEST_DATABASE_URL;

const contractsSource = fileURLToPath(
  new URL("./packages/contracts/src/index.ts", import.meta.url),
);
const alias = { "@mojud/contracts": contractsSource };

const LINE_FLOOR = 80;

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: "contracts",
          root: "./packages/contracts",
          environment: "node",
          include: ["test/**/*.test.ts"],
        },
      },
      {
        resolve: { alias },
        test: {
          name: "api",
          root: "./apps/api",
          environment: "node",
          include: ["test/**/*.test.ts"],
          globalSetup: ["./test/globalSetup.ts"],
          pool: "forks",
          // Files share one test database, so they must run one at a time.
          // `fileParallelism` is a root-only option in Vitest 3, so the api
          // project runs all its files, in order, in a single fork instead.
          poolOptions: { forks: { singleFork: true } },
          testTimeout: 20000,
          hookTimeout: 30000,
        },
      },
      {
        plugins: [react()],
        resolve: { alias },
        test: {
          name: "web",
          root: "./apps/web",
          environment: "jsdom",
          include: ["test/**/*.test.{ts,tsx}"],
          setupFiles: ["./test/setup.ts"],
        },
      },
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      reportsDirectory: "./coverage",
      include: [
        "packages/contracts/src/**",
        "apps/api/src/**",
        "apps/web/src/**",
      ],
      exclude: [
        "apps/api/src/server.ts",
        "apps/api/src/migrate.ts",
        "apps/web/src/main.tsx",
        "**/*.d.ts",
        "**/*.test.*",
      ],
      thresholds: {
        lines: LINE_FLOOR,
        "packages/contracts/src/**": { lines: LINE_FLOOR },
        "apps/api/src/**": { lines: LINE_FLOOR },
        "apps/web/src/**": { lines: LINE_FLOOR },
      },
    },
  },
});
