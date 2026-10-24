// Secret scan, part of stage 1 of `npm run verify` (NFR1.12; security-design.md).
// Fails when .env is tracked, or when a project file sets a PASSWORD, SECRET
// or TOKEN to a value. Scans every file git tracks or would track (tracked
// plus untracked, minus ignored), except .env.example.
//
// Two documented exemptions keep the check precise without weakening it:
// - the local-only placeholder `local-dev-only` that NFR1.12 itself defines;
// - in source code, an unquoted value is an identifier (for example
//   `POSTGRES_PASSWORD: requiredText`), not a secret. Quoted string literals in
//   code are still checked.
import { spawnSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";

const PATTERN = /(PASSWORD|SECRET|TOKEN)\s*[=:]\s*(['"`]?)([^\s'"`,;)]{6,})/;
const ALLOWED_VALUES = new Set(["local-dev-only"]);
const CODE_FILE = /\.(c|m)?(j|t)sx?$/;
const MAX_BYTES = 1024 * 1024;

function listFiles() {
  const result = spawnSync(
    "git",
    ["ls-files", "--cached", "--others", "--exclude-standard", "-z"],
    {
      encoding: "utf8",
    },
  );
  if (result.status !== 0) {
    throw new Error(`git ls-files failed: ${result.stderr || result.error}`);
  }
  return result.stdout.split("\0").filter(Boolean);
}

function isTracked(path) {
  const result = spawnSync("git", ["ls-files", "--error-unmatch", path], {
    encoding: "utf8",
  });
  return result.status === 0;
}

/** The finding on one line, or undefined when the line is clean. */
export function findSecret(file, line) {
  const match = PATTERN.exec(line);
  if (!match) return undefined;
  const [, , quote, value] = match;
  if (ALLOWED_VALUES.has(value)) return undefined;
  if (CODE_FILE.test(file) && !quote) return undefined;
  return match[0];
}

function scan() {
  const findings = [];
  if (isTracked(".env")) {
    findings.push(
      ".env is tracked by git. Remove it with: git rm --cached .env",
    );
  }
  for (const file of listFiles()) {
    if (file === ".env.example") continue;
    let text;
    try {
      if (statSync(file).size > MAX_BYTES) continue;
      text = readFileSync(file, "utf8");
    } catch (error) {
      // A file listed by git but deleted in the working tree has nothing to scan.
      if (error.code === "ENOENT") continue;
      throw error;
    }
    if (text.includes("\u0000")) continue; // binary file
    text.split(/\r?\n/).forEach((line, index) => {
      const found = findSecret(file, line);
      if (found) findings.push(`${file}:${index + 1}: ${found}`);
    });
  }
  return findings;
}

const findings = scan();
if (findings.length > 0) {
  console.error("secret-scan: possible secrets found:");
  for (const finding of findings) console.error(`  ${finding}`);
  process.exit(1);
}
console.log("secret-scan: no secrets found and .env is not tracked.");
