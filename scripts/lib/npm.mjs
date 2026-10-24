// Runs npm without a shell, the same way on Windows, macOS and Linux.
// Under `npm run`, npm sets npm_execpath to its own CLI script; otherwise the
// CLI that ships next to the running node binary is used.
import { existsSync } from "node:fs";
import path from "node:path";

/** [command, leadingArgs] that start npm with the current node binary. */
export function npmCommand() {
  const candidates = [
    process.env.npm_execpath,
    path.join(
      path.dirname(process.execPath),
      "node_modules",
      "npm",
      "bin",
      "npm-cli.js",
    ),
    path.join(
      path.dirname(process.execPath),
      "..",
      "lib",
      "node_modules",
      "npm",
      "bin",
      "npm-cli.js",
    ),
  ];
  const cli = candidates.find(
    (candidate) =>
      candidate && candidate.endsWith(".js") && existsSync(candidate),
  );
  if (!cli) {
    throw new Error(
      "Cannot find the npm CLI. Run this script through npm, for example: npm run verify",
    );
  }
  return [process.execPath, [cli]];
}

/** Reads KEY=VALUE lines from a .env file (comments and blank lines skipped). */
export function parseEnvFile(text) {
  const values = {};
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const index = line.indexOf("=");
    if (index === -1) continue;
    const key = line.slice(0, index).trim();
    let value = line.slice(index + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    values[key] = value;
  }
  return values;
}
