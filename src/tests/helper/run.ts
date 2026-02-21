/**
 * Test runner: global setup (services, test DB, migrate, dev server) then run test files.
 * - bun test:run: discover *.test.ts files, start server, run bun test with all paths.
 * - bun test:run:single <path>: start server, run bun test with that one file (path with ./ or full).
 * Starts the Next.js dev server on port 3456 and sets TEST_SERVER_URL for auth tests.
 */
import { execSync, spawn, spawnSync } from "node:child_process";
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
run("bun run payload", ["migrate:fresh", "--force-accept-warning"]);

const serverProc = spawn("bun", ["run", "dev:next", "-p", TEST_SERVER_PORT], {
  env: { ...process.env, PORT: TEST_SERVER_PORT },
  stdio: "inherit",
  cwd: process.cwd(),
});

await waitForServer(TEST_SERVER_URL);
process.env.TEST_SERVER_URL = TEST_SERVER_URL;

const TESTS_DIR = "src/tests";
const SUBDIRS = ["requests", "services", "collections"] as const;

const TEST_FILE_PATTERN = /\.(test|spec)\.(ts|tsx)$/;

function discoverTestFiles(): string[] {
  const files: string[] = [];
  const entries = readdirSync(TESTS_DIR, { withFileTypes: true });
  for (const e of entries) {
    if (
      e.isFile() &&
      (TEST_FILE_PATTERN.test(e.name) || /_test\.(ts|tsx)$/.test(e.name))
    ) {
      files.push(join(TESTS_DIR, e.name));
    }
  }
  for (const subdir of SUBDIRS) {
    const dir = join(TESTS_DIR, subdir);
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir)) {
      if (TEST_FILE_PATTERN.test(name) || /_test\.(ts|tsx)$/.test(name)) {
        files.push(join(dir, name));
      }
    }
  }
  return files.sort();
}

const args = process.argv.slice(2).filter((a) => a !== "--");
const pathArg = args[0];
const singleFileMode =
  pathArg != null &&
  (pathArg.endsWith(".test.ts") ||
    pathArg.endsWith(".test.tsx") ||
    pathArg.endsWith(".spec.ts") ||
    pathArg.endsWith(".spec.tsx") ||
    pathArg.includes("_test."));

const testPaths = singleFileMode
  ? [pathArg.startsWith("./") || pathArg.startsWith("/") ? pathArg : `./${pathArg}`]
  : discoverTestFiles();

let exitCode = 0;
try {
  if (testPaths.length === 0) {
    console.error("No test files found.");
    exitCode = 1;
  } else {
    const result = spawnSync("bun", ["test", ...testPaths], {
      stdio: "inherit",
      env: process.env,
      cwd: process.cwd(),
    });
    exitCode = result.status ?? 1;
  }
} finally {
  serverProc.kill("SIGTERM");
}
process.exit(exitCode);
