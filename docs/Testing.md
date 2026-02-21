# Testing

This doc explains how the test suite is structured and how it runs so you can add or change tests confidently.

## How it works

- **Two commands:** `bun run test:run` runs all test files (no path argument). `bun run test:run:single -- <path>` runs one test file.
- **Two processes:** The **runner** starts the Next.js dev server on port 3456 (using the test DB), then runs `bun test` with the discovered test files. Tests that need HTTP use `TEST_SERVER_URL`.
- **One database:** Tests use the same Postgres instance as dev (via `bun run dev:services` / [docker-compose.yml](../../docker-compose.yml)) but a **separate** DB, `acme-website_test`, so dev data is never touched. The server and all test files use this DB (via `DATABASE_URI` set by the runner).

## Directory structure

```
src/tests/
├── helper/           # Shared runner and utilities (do not put test files here)
│   ├── run.ts        # Test runner: services, DB, migrate, start server, discover & run test files
│   ├── auth-helper.ts # asUser, signUpAndGetHeaders, loginAs (uses TEST_SERVER_URL when set)
│   ├── clear-test-db.ts
│   ├── test-db-uri.ts
│   └── wait-for-server.ts
├── factories/        # Build/create helpers (e.g. genre) for test data
├── auth.test.ts      # Top-level: auth flow (sign up/sign in via HTTP, payload.auth)
├── payload-db.test.ts # Top-level: Payload + DB smoke test
├── requests/         # Tests that hit the app over HTTP (routes, API)
├── services/         # Tests that import and call services in-process (real Payload + test DB)
└── collections/      # Tests for collection-level behaviour (same discovery as above)
```

The **runner** discovers tests by:

1. Adding every top-level `*.test.ts` / `*.spec.ts` / `*_test.ts` file in `src/tests/` (e.g. `auth.test.ts`, `payload-db.test.ts`).
2. Adding every matching file in `src/tests/requests/`, `src/tests/services/`, and `src/tests/collections/` (if those folders exist).

So: put route/API tests in `requests/`, service-layer tests in `services/`, collection tests in `collections/`, and one-off or global tests as top-level files. Test files must be named `*.test.ts`, `*.spec.ts`, or `*_test.ts` so Bun’s runner discovers them.

## How tests run

- **Service tests** (e.g. in `services/`): They call `getPayload()` in the test process and use the **test DB**. They import services (e.g. `AccessControlService`, `FinanceService`) and call them directly—no HTTP for the code under test. They may use `asUser(payload, ...)` or `signUpAndGetHeaders(...)`, which **do** use HTTP to the dev server when `TEST_SERVER_URL` is set, to get real session cookies; then the test continues in-process with that user and Payload.
- **Request/route tests** (e.g. in `requests/`): They use `fetch(TEST_SERVER_URL + '/api/...', { headers: { cookie: ... } })` to hit the **real** Next.js server. So the full stack (route → auth → services → DB) is exercised over HTTP.
- **Cleanup:** Tests that mutate the DB typically call `clearTestDb(payload)` in an `afterEach` or `afterAll` hook so the next test or file starts from a clean state (or rely on the runner’s single DB for the run).

## Commands

| Command | What it does |
| --- | --- |
| `bun run test` | Run `bun test src/tests` directly (no server started). Use when the server is already up or for tests that don't need HTTP. Full E2E/auth flow requires `test:run`. |
| `bun run test:run` | Full run: dev:services, test DB create, migrate, start dev server on 3456, run all discovered test files with `bun test`, then stop the server. Does **not** accept a path—use `test:run:single` for one file. |
| `bun run test:run:single -- ./src/tests/auth.test.ts` | Run one test file. Pass the path after `--`; server is still started and only that file runs. |
| `bun run test:payload-db` | Run only `payload-db.test.ts`; does **not** start the server. Use for a quick DB smoke test when services are already up. Tests that need `TEST_SERVER_URL` (auth, route tests) will fail without the full `bun run test:run`. |

Keep port **3456** free for the test server (don’t use it for local dev).

## Multi-test files (describe + test convention)

Files with more than one scenario should use **describe** and multiple **test** calls with lifecycle hooks. Use Bun’s `beforeAll` / `beforeEach` / `afterEach` / `afterAll` from `bun:test`; do not use Node’s subtests (`t.test`).

**Convention:**

- Wrap scenarios in **`describe('SuiteName', () => { ... })`**.
- Declare shared variables with `let` at the top of the describe callback (e.g. `payload`, `filmId`).
- **beforeEach:** create payload and shared fixtures (language, film, etc.).
- **afterEach:** `await clearTestDb(payload)` only.
- **afterAll:** any final cleanup (no `process.exit`).
- Each scenario as **`test('description', async () => { ... })`**.
- Do not call `clearTestDb` inside a test; cleanup is done in afterEach/afterAll.

**Minimal example** (use this pattern for multi-scenario service tests):

```ts
import { getPayload } from "../../lib/payload/get-payload";
import { clearTestDb } from "../helper/clear-test-db";
import { createTestLanguage, createTestFilm } from "../helper/fixtures";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from "bun:test";

describe("MyService", () => {
  let payload: Awaited<ReturnType<typeof getPayload>>;
  let filmId: string;

  beforeAll(async () => {
    payload = await getPayload();
  });

  beforeEach(async () => {
    const lang = await createTestLanguage(payload);
    const film = await createTestFilm(payload, { languageId: lang.id });
    filmId = film.id;
  });

  afterEach(async () => {
    await clearTestDb(payload);
  });

  afterAll(async () => {
    // optional final cleanup
  });

  test("scenario one: empty state", async () => {
    // use payload, filmId, fixtures…
    expect(payload).toBeDefined();
  });

  test("scenario two: with data", async () => {
    // optional extra fixtures here; shared ones from beforeEach
    expect(filmId).toBeDefined();
  });
});
```

Single-test files (e.g. `auth.test.ts`, `payload-db.test.ts`) can use a single `test(...)` with `beforeAll` / `afterEach` and no describe.
