# Testing

This doc explains how the test suite is structured and how it runs so you can add or change tests confidently.

## How it works

- **Two commands:** `bun test:run` runs all test files (no path argument). `bun test:run:single <path>` runs one test file.
- **Two processes:** The **runner** starts the Next.js dev server on port 3456 (using the test DB), then runs each test file in a child process (tsx for full run, `node --test` for single). Tests that need HTTP use `TEST_SERVER_URL`.
- **One database:** Tests use the same Postgres instance as dev (via `bun run dev:services` / [docker-compose.yml](../../docker-compose.yml)) but a **separate** DB, `acme-website_test`, so dev data is never touched. The server and all test files use this DB (via `DATABASE_URI` set by the runner).

## Directory structure

```
src/tests/
├── helper/           # Shared runner and utilities (do not put test files here)
│   ├── run.ts        # Test runner: services, DB, migrate, start server, discover & run .ts files
│   ├── auth-helper.ts # asUser, signUpAndGetHeaders, loginAs (uses TEST_SERVER_URL when set)

│   ├── clear-test-db.ts
│   ├── test-db-uri.ts
│   └── wait-for-server.ts
├── factories/        # Build/create helpers (e.g. genre) for test data
├── auth.ts           # Top-level: auth flow (sign up/sign in via HTTP, payload.auth)
├── payload-db.ts     # Top-level: Payload + DB smoke test
├── requests/         # Tests that hit the app over HTTP (routes, API)
├── services/         # Tests that import and call services in-process (real Payload + test DB)
└── collections/      # Tests for collection-level behaviour (same discovery as above)
```

The **runner** discovers tests by:

1. Adding every top-level `*.ts` file in `src/tests/` (e.g. `auth.ts`, `payload-db.ts`).
2. Adding every `*.ts` file in `src/tests/requests/`, `src/tests/services/`, and `src/tests/collections/` (if those folders exist).

So: put route/API tests in `requests/`, service-layer tests in `services/`, collection tests in `collections/`, and one-off or global tests as top-level `.ts` files.

## How tests run

- **Service tests** (e.g. in `services/`): They call `getPayload()` in the test process and use the **test DB**. They import services (e.g. `AccessControlService`, `FinanceService`) and call them directly—no HTTP for the code under test. They may use `asUser(payload, ...)` or `signUpAndGetHeaders(...)`, which **do** use HTTP to the dev server when `TEST_SERVER_URL` is set, to get real session cookies; then the test continues in-process with that user and Payload.
- **Request/route tests** (e.g. in `requests/`): They use `fetch(TEST_SERVER_URL + '/api/...', { headers: { cookie: ... } })` to hit the **real** Next.js server. So the full stack (route → auth → services → DB) is exercised over HTTP.
- **Cleanup:** Tests that mutate the DB typically call `clearTestDb(payload)` in an `after` hook so the next test file starts from a clean state (or rely on the runner’s single DB for the run).

## Commands

| Command                                                         | What it does                                                                                                                                                                                                           |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bun test:run`                                                  | Full run: dev:services, test DB create, migrate, start dev server on 3456, run all discovered test files (each with tsx), then stop the server. Does **not** accept a path—use `test:run:single` for one file.         |
| `bun test:run:single src/tests/requests/films-finance-route.ts` | Run one test file. Pass the path as the first argument; server is still started and only that file runs (with `node --test`). Required for single-file runs because `node --test` in `test:run` does not forward argv. |
| `bun test:payload-db`                                           | Run only `payload-db.ts`; does **not** start the server. Use for a quick DB smoke test when services are already up. Tests that need `TEST_SERVER_URL` (auth, route tests) will fail without the full `bun test:run`.  |

Keep port **3456** free for the test server (don’t use it for local dev).

## Multi-test files (subtest convention)

Files with more than one scenario should use **one top-level test** and **subtests** so lifecycle hooks and cleanup run correctly. Avoid multiple top-level `test(...)` calls with shared `before`/`after`; that can leave the runner in a bad state or skip cleanup.

**Convention:**

- One top-level `test('SuiteName', async (t) => { ... })`.
- Declare shared variables with `let` at the top of the callback (e.g. `payload`, `filmId`).
- **beforeEach:** create payload and shared fixtures (language, film, etc.).
- **afterEach:** `await clearTestDb(payload)` only (no exit).
- **after:** `await clearTestDb(payload); process.exit(0);`
- Each scenario as **`await t.test('description', async () => { ... })`**.
- Do not call `clearTestDb` inside a subtest; cleanup is done in afterEach and after.

**Minimal example** (use this pattern for multi-scenario service tests):

```ts
import { getPayload } from "../../lib/payload/get-payload";
import { clearTestDb } from "../helper/clear-test-db";
import { createTestLanguage, createTestFilm } from "../helper/fixtures";
import { after, afterEach, beforeEach, test } from "node:test";

test("MyService", async (t) => {
  let payload: Awaited<ReturnType<typeof getPayload>>;
  let filmId: string;

  beforeEach(async () => {
    payload = await getPayload();
    const lang = await createTestLanguage(payload);
    const film = await createTestFilm(payload, { languageId: lang.id });
    filmId = film.id;
  });

  afterEach(async () => {
    await clearTestDb(payload);
  });

  after(async () => {
    process.exit(0);
  });

  await t.test("scenario one: empty state", async () => {
    // use payload, filmId, fixtures…
  });

  await t.test("scenario two: with data", async () => {
    // optional extra fixtures here; shared ones from beforeEach
  });
});
```

Single-test files (e.g. `auth.ts`, `payload-db.ts`) can keep a single `test(...)` with `before`/`after` and no subtests.
