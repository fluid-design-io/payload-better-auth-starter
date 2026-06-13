# Testing

A small, HTTP-based test suite you can use as a starting point for your own tests.

## How it works

Tests talk to a running Next.js server **over HTTP** (`fetch`). They never import
the Payload config in-process. This keeps the test runtime simple and avoids
loading the server-only module graph (Lexical, the config, plugins) into the test
process — which is also what lets the suite run cleanly under `bun test`.

The runner ([`src/tests/helper/run.ts`](../src/tests/helper/run.ts)):

1. Starts Docker services (Postgres) via `docker compose`.
2. Ensures the dedicated test database `acme-website_test` exists (your dev data is
   never touched).
3. Truncates all tables so each run starts from a clean slate.
4. Starts `next dev` on port **3456** pointed at the test DB. The Postgres
   adapter's dev `push` creates the schema on boot — there is **no migration step**.
5. Runs the discovered `*.test.ts` files with `bun test`, with `TEST_SERVER_URL`
   set so the HTTP helpers know where to send requests.
6. Stops the server.

> **Next 16 allows only one dev server per project.** Stop your `bun run dev`
> server before running the suite, or the test server won't be able to start.

## Commands

| Command                                               | What it does                                       |
| ----------------------------------------------------- | -------------------------------------------------- |
| `bun run test`                                        | Run the whole suite (same as `test:run`).          |
| `bun run test:run`                                    | Run the whole suite.                               |
| `bun run test:run:single -- ./src/tests/auth.test.ts` | Run a single test file (pass the path after `--`). |

Keep port **3456** free for the test server (don't use it for local dev).

## Directory layout

```
src/tests/
├── helper/
│   ├── run.ts            # runner: services, test DB, start server, run tests
│   ├── http.ts           # fetch helpers: api(), signUp(), signIn(), getSession()
│   ├── wait-for-server.ts
│   └── test-db-uri.ts
├── smoke.test.ts         # REST API + Better Auth respond
└── auth.test.ts          # sign up -> sign in -> read session
```

The runner also discovers `*.test.ts` / `*.spec.ts` files in `requests/`,
`services/`, and `collections/` if you create them.

## Writing a test

Use the helpers in [`http.ts`](../src/tests/helper/http.ts) — everything is a
`fetch` against the running server:

```ts
import { expect, test } from 'bun:test'
import { api, signUp, getSession } from './helper/http'

test('an authenticated request works', async () => {
	const { userId, cookie } = await signUp()

	const session = await getSession(cookie)
	expect(session.body?.user?.id).toBe(userId)

	// Authenticated Payload REST call: pass the session cookie through.
	const me = await api(`/api/users/${userId}`, { cookie })
	expect(me.status).toBe(200)
})
```

Tests should use **unique data** (e.g. `uniqueEmail()`) so they don't collide;
the runner truncates the DB once per run, not between individual tests.
