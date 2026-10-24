// `npm run logs:errors` (NFR8.14): prints the api log lines at error level or
// above (pino level >= 50) from the running Compose stack.
import { spawnSync } from "node:child_process";

const result = spawnSync(
  "docker",
  ["compose", "logs", "--no-color", "--no-log-prefix", "api"],
  {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  },
);
if (result.error || result.status !== 0) {
  console.error(
    `logs:errors: docker compose logs failed: ${result.error?.message ?? result.stderr}`,
  );
  process.exit(1);
}

let count = 0;
for (const line of result.stdout.split(/\r?\n/)) {
  if (!line.startsWith("{")) continue;
  let entry;
  try {
    entry = JSON.parse(line);
  } catch {
    continue; // not a pino line
  }
  if (typeof entry.level === "number" && entry.level >= 50) {
    console.log(line);
    count += 1;
  }
}
console.error(`logs:errors: ${count} line(s) at error level or above.`);
