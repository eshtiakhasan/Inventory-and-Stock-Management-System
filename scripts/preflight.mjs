// Stage 0 of `npm run verify` (cicd-pipeline.md): checks the machine before
// anything starts. Exits 1 with one line per problem and how to fix it.
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import net from "node:net";
import { fileURLToPath } from "node:url";

export const MIN_COMPOSE = { major: 2, minor: 24 };
const PORTS = [8080, 5433];

/** Parses "v2.24.6", "2.29.1-desktop.1" or "5.6.1" into numbers; null if unreadable. */
export function parseComposeVersion(text) {
  const match = /(\d+)\.(\d+)(?:\.(\d+))?/.exec(String(text));
  if (!match) return null;
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3] ?? 0),
  };
}

/** True for any version at or above 2.24, compared numerically (5.x included). */
export function isComposeSupported(version, minimum = MIN_COMPOSE) {
  if (!version) return false;
  if (version.major !== minimum.major) return version.major > minimum.major;
  return version.minor >= minimum.minor;
}

function run(command, args) {
  return spawnSync(command, args, { encoding: "utf8" });
}

function portIsFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(false));
    server.once("listening", () => server.close(() => resolve(true)));
    server.listen(port, "127.0.0.1");
  });
}

async function chromiumInstalled() {
  try {
    const { chromium } = await import("@playwright/test");
    return existsSync(chromium.executablePath());
  } catch {
    return false;
  }
}

export async function preflight() {
  const problems = [];

  const docker = run("docker", ["info", "--format", "{{.ServerVersion}}"]);
  if (docker.error || docker.status !== 0) {
    problems.push("Docker is not running. Start Docker Desktop and try again.");
  } else {
    const compose = run("docker", ["compose", "version", "--short"]);
    const version = parseComposeVersion(compose.stdout);
    if (compose.status !== 0 || !isComposeSupported(version)) {
      const found = compose.stdout?.trim() || "not found";
      problems.push(
        `Docker Compose ${MIN_COMPOSE.major}.${MIN_COMPOSE.minor} or later is needed (found ${found}). Update Docker Desktop.`,
      );
    }
  }

  if (!existsSync(".env")) {
    problems.push(".env is missing. Create it with: cp .env.example .env");
  }

  for (const port of PORTS) {
    if (!(await portIsFree(port))) {
      problems.push(
        `Port ${port} is in use. Stop the dev stack with: npm run down`,
      );
    }
  }

  if (!(await chromiumInstalled())) {
    problems.push(
      "The Playwright Chromium browser is not installed. Install it with: npx playwright install chromium",
    );
  }

  return problems;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const problems = await preflight();
  if (problems.length > 0) {
    for (const problem of problems) console.error(`preflight: ${problem}`);
    process.exit(1);
  }
  console.log(
    "preflight: Docker, Compose, .env, ports 8080 and 5433, and Chromium are ready.",
  );
}
