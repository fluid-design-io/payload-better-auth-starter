/**
 * Test runner: global setup (services, test DB, migrate, dev server) then run test files.
 * - bun test:run: run with node --test; no path → discover all files, run each with tsx.
 * - bun test:run:single <path>: run with tsx so path is in argv; run that one file with node --test.
 * Starts the Next.js dev server on port 3456 and sets TEST_SERVER_URL for auth tests.
 */
import { execSync, spawn } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { getTestDatabaseUri } from "./test-db-uri";
import { waitForServer } from "./wait-for-server";

const TEST_SERVER_PORT = "3456";
const TEST_SERVER_URL = `http://localhost:${TEST_SERVER_PORT}`;

const testUri = getTestDatabaseUri();
process.env.DATABASE_URI = testUri;
(process.env as { NODE_ENV?: string }).NODE_ENV = "test";

function run(cmd: string, args: string[] = [], env?: NodeJS.ProcessEnv) {
  execSync(cmd + (args.length ? " " + args.join(" ") : ""), {
    stdio: "inherit",
    env: env ?? process.env,
  });
}

run("bun run dev:services");
run("bun run test:db:create");
run("bun payload migrate:create");
run("bun payload migrate:fresh --force-accept-warning");

const serverProcess = spawn(
  "bun",
  ["run", "dev:next", "-p", TEST_SERVER_PORT],
  {
    env: { ...process.env, PORT: TEST_SERVER_PORT },
    stdio: "pipe",
    cwd: process.cwd(),
  },
);

await waitForServer(TEST_SERVER_URL);
process.env.TEST_SERVER_URL = TEST_SERVER_URL;

const TESTS_DIR = "src/tests";
const SUBDIRS = ["requests", "services", "collections"] as const;

function discoverTestFiles(): string[] {
  const files: string[] = [];
  const entries = readdirSync(TESTS_DIR, { withFileTypes: true });
  for (const e of entries) {
    if (e.isFile() && e.name.endsWith(".ts")) {
      files.push(join(TESTS_DIR, e.name));
    }
  }
  for (const subdir of SUBDIRS) {
    const dir = join(TESTS_DIR, subdir);
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir)) {
      if (name.endsWith(".ts")) {
        files.push(join(dir, name));
      }
    }
  }
  return files.sort();
}

const args = process.argv.slice(2).filter((a) => a !== "--");
const pathArg = args[0];
const files = pathArg?.endsWith(".ts") ? [pathArg] : discoverTestFiles();
const singleFileMode = pathArg != null && files.length === 1;

const runTestFile = singleFileMode
  ? (file: string) => `node --test --import tsx ${file}`
  : (file: string) => `bun exec tsx ${file}`;

let exitCode = 0;
try {
  for (const file of files) {
    try {
      execSync(runTestFile(file), {
        stdio: "inherit",
        env: process.env,
      });
    } catch (err) {
      exitCode = (err as { status?: number }).status ?? 1;
      break;
    }
  }
} finally {
  serverProcess.kill("SIGTERM");
}
process.exit(exitCode);
