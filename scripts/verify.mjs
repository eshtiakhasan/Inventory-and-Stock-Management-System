// `npm run verify`: the approved verification command and the local pipeline
// (cicd-pipeline.md). Stages 0-5 stop at the first failure; stage 6 always
// tears the throw-away `mojud-verify` Compose project down once stage 2 has
// started, including after Ctrl+C. The exit code is the first failing stage's.
import { spawnSync } from "node:child_process";
import { npmCommand } from "./lib/npm.mjs";

const PROJECT = "mojud-verify";
const [npmBin, npmArgs] = npmCommand();

const npm = (...args) => ({ command: npmBin, args: [...npmArgs, ...args] });
const node = (...args) => ({ command: process.execPath, args });
const compose = (...args) => ({
  command: "docker",
  args: ["compose", "-p", PROJECT, ...args],
});

const STAGES = [
  { id: 0, name: "Preflight", steps: [node("scripts/preflight.mjs")] },
  {
    id: 1,
    name: "Static checks",
    steps: [
      npm("run", "lint"),
      npm("run", "typecheck"),
      npm("run", "format:check"),
      node("scripts/secret-scan.mjs"),
    ],
  },
  {
    id: 2,
    name: "Start database",
    startsStack: true,
    steps: [compose("up", "-d", "--wait", "db")],
  },
  {
    id: 3,
    name: "Unit and integration tests",
    steps: [npm("run", "test:coverage")],
  },
  {
    id: 4,
    name: "Build and start full stack",
    steps: [compose("up", "-d", "--build", "--wait", "--wait-timeout", "60")],
  },
  { id: 5, name: "Smoke test", steps: [npm("run", "test:smoke")] },
];

let stackStarted = false;
let interrupted = false;
const onSignal = (signal) => {
  interrupted = true;
  console.error(`\nverify: ${signal} received; tearing down.`);
};
process.on("SIGINT", onSignal);
process.on("SIGTERM", onSignal);

function runStep(step) {
  console.log(
    `\n> ${[step.command === process.execPath ? "node" : step.command, ...step.args].join(" ")}`,
  );
  const result = spawnSync(step.command, step.args, { stdio: "inherit" });
  if (result.error) {
    console.error(
      `verify: could not start ${step.command}: ${result.error.message}`,
    );
    return 1;
  }
  if (result.signal) {
    interrupted = true;
    return 130;
  }
  return result.status ?? 1;
}

function teardown() {
  console.log(`\n=== Stage 6: Tear down (${PROJECT}) ===`);
  const code = runStep(compose("down", "-v"));
  if (code !== 0)
    console.error(
      `verify: teardown exited with ${code}; check with: docker compose -p ${PROJECT} ps`,
    );
}

let exitCode = 0;
let failedStage;
try {
  for (const stage of STAGES) {
    console.log(`\n=== Stage ${stage.id}: ${stage.name} ===`);
    if (stage.startsStack) stackStarted = true;
    for (const step of stage.steps) {
      const code = runStep(step);
      if (code !== 0 || interrupted) {
        exitCode = code || 130;
        failedStage = stage;
        break;
      }
    }
    if (failedStage) break;
  }
} finally {
  if (stackStarted) teardown();
}

if (failedStage) {
  console.error(
    `\nverify: FAILED at stage ${failedStage.id} (${failedStage.name}).`,
  );
} else {
  console.log("\nverify: all stages passed.");
}
process.exit(exitCode);
