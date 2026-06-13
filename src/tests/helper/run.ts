/**
 * Test runner.
 *
 * Tests run over HTTP against a real Next.js server so they never have to import
 * the Payload config in-process. This is both simpler and avoids loading the
 * server-only module graph (Lexical etc.) into the test runtime.
 *
 * Flow:
 *   1. Bring up Docker services (Postgres).
 *   2. Ensure the dedicated test database exists.
 *   3. Truncate all tables so each run starts from a clean slate (no-op when the
 *      schema doesn't exist yet).
 *   4. Start `next dev` on a separate port pointed at the test DB. The Postgres
 *      adapter's dev `push` creates the schema on boot — no migration step.
 *   5. Run the discovered `*.test.ts` files with `bun test`.
 *   6. Stop the server.
 *
 * Usage:
 *   bun run test:run                         # all test files
 *   bun run test:run:single -- ./src/tests/auth.test.ts   # one file
 *
 * Note: Next 16 allows only one dev server per project, so stop your `bun run dev`
 * server before running the suite.
 */
import { execSync, spawn, spawnSync } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { getTestDatabaseUri } from './test-db-uri'
import { waitForServer } from './wait-for-server'

const TEST_SERVER_PORT = '3456'
const TEST_SERVER_URL = `http://localhost:${TEST_SERVER_PORT}`
const TESTS_DIR = 'src/tests'
const TEST_SUBDIRS = ['requests', 'services', 'collections'] as const
const TEST_FILE_PATTERN = /\.(test|spec)\.tsx?$/

const testUri = getTestDatabaseUri()
process.env.DATABASE_URI = testUri
;(process.env as { NODE_ENV?: string }).NODE_ENV = 'test'

function run(cmd: string) {
	execSync(cmd, { stdio: 'inherit', env: process.env })
}

/**
 * Truncate every table in the test DB so the run starts clean. Safe no-op on a
 * fresh database (no tables yet) — the server's dev `push` creates them on boot.
 *
 * Uses spawnSync with an args array (no shell) so the `$$` dollar-quoting in the
 * PL/pgSQL block is passed to psql literally instead of being expanded by the shell.
 */
function truncateTestDb() {
	const sql =
		"DO $$ DECLARE r RECORD; BEGIN FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname='public') LOOP EXECUTE 'TRUNCATE TABLE \"' || r.tablename || '\" RESTART IDENTITY CASCADE'; END LOOP; END $$;"
	const result = spawnSync(
		'docker',
		['exec', 'acme-postgres', 'psql', '-U', 'postgres', '-d', 'acme-website_test', '-c', sql],
		{ stdio: 'inherit' },
	)
	if (result.status !== 0) throw new Error('Failed to truncate test database')
}

function discoverTestFiles(): string[] {
	const files: string[] = []
	const collect = (dir: string) => {
		if (!existsSync(dir)) return
		for (const entry of readdirSync(dir, { withFileTypes: true })) {
			if (entry.isFile() && TEST_FILE_PATTERN.test(entry.name)) {
				files.push(join(dir, entry.name))
			}
		}
	}
	collect(TESTS_DIR)
	for (const sub of TEST_SUBDIRS) collect(join(TESTS_DIR, sub))
	return files.toSorted()
}

const pathArg = process.argv.slice(2).find((a) => a !== '--')
const testPaths =
	pathArg && TEST_FILE_PATTERN.test(pathArg)
		? [pathArg.startsWith('.') || pathArg.startsWith('/') ? pathArg : `./${pathArg}`]
		: discoverTestFiles()

if (testPaths.length === 0) {
	console.error('No test files found.')
	process.exit(1)
}

run('bun run dev:services')
run('bun run test:db:create')
truncateTestDb()

const server = spawn('bun', ['run', 'dev:next', '--', '-p', TEST_SERVER_PORT], {
	env: { ...process.env, PORT: TEST_SERVER_PORT },
	stdio: 'inherit',
	cwd: process.cwd(),
})

let exitCode = 0
try {
	await waitForServer(`${TEST_SERVER_URL}/api/blog?limit=1`)
	process.env.TEST_SERVER_URL = TEST_SERVER_URL

	const result = spawnSync('bun', ['test', ...testPaths], {
		stdio: 'inherit',
		env: process.env,
		cwd: process.cwd(),
	})
	exitCode = result.status ?? 1
} finally {
	server.kill('SIGTERM')
}

process.exit(exitCode)
