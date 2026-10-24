// `npm run dev` (local-dev, infrastructure-specification.md): only the
// database runs in Docker; the API (tsx watch, port 3000) and the web app
// (Vite, port 5173, proxying /api) run on this machine with hot reload.
import { spawn, spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { npmCommand, parseEnvFile } from "./lib/npm.mjs";

if (!existsSync(".env")) {
  console.error("dev: .env is missing. Create it with: cp .env.example .env");
  process.exit(1);
}

const fileEnv = parseEnvFile(readFileSync(".env", "utf8"));
// Inside Compose the database host is db:5432; from this machine it is localhost:5433.
const databaseUrl = (fileEnv.DATABASE_URL ?? "").replace(
  "@db:5432/",
  "@localhost:5433/",
);
const env = {
  ...process.env,
  ...fileEnv,
  DATABASE_URL: databaseUrl,
  NODE_ENV: "development",
};
const [npmBin, npmArgs] = npmCommand();

function runOrExit(label, command, args) {
  console.log(`dev: ${label}`);
  const result = spawnSync(command, args, { stdio: "inherit", env });
  if (result.error || result.status !== 0) {
    console.error(
      `dev: ${label} failed${result.error ? `: ${result.error.message}` : ""}`,
    );
    process.exit(result.status ?? 1);
  }
}

runOrExit("starting the database", "docker", [
  "compose",
  "up",
  "-d",
  "--wait",
  "db",
]);
runOrExit("building @mojud/contracts", npmBin, [
  ...npmArgs,
  "run",
  "build",
  "-w",
  "@mojud/contracts",
]);
runOrExit("applying migrations", npmBin, [
  ...npmArgs,
  "run",
  "migrate",
  "-w",
  "@mojud/api",
]);

const children = [
  spawn(npmBin, [...npmArgs, "run", "dev", "-w", "@mojud/api"], {
    stdio: "inherit",
    env,
  }),
  spawn(npmBin, [...npmArgs, "run", "dev", "-w", "@mojud/web"], {
    stdio: "inherit",
    env,
  }),
];
console.log(
  "dev: API on http://localhost:3000, web app on http://localhost:5173 (Ctrl+C to stop)",
);

let stopping = false;
const stopAll = (code) => {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill("SIGTERM");
  process.exitCode = code;
};
for (const child of children) {
  child.on("exit", (code) => stopAll(code ?? 0));
  child.on("error", (error) => {
    console.error(`dev: a process failed to start: ${error.message}`);
    stopAll(1);
  });
}
process.on("SIGINT", () => stopAll(0));
process.on("SIGTERM", () => stopAll(0));
