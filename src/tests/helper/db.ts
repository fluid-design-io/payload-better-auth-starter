/**
 * Direct test-database access for test setup that can't be done over HTTP.
 *
 * Uses Bun's built-in SQL client against the test DATABASE_URI — it talks to
 * Postgres directly and never imports the Payload config, so it stays out of the
 * server-only module graph. Only ever points at the dedicated `_test` database.
 */
import { SQL } from 'bun'

function connect(): SQL {
	const uri = process.env.DATABASE_URI
	if (!uri || !/_test\b/.test(uri)) {
		throw new Error('DATABASE_URI must point at the _test database for DB helpers')
	}
	return new SQL(uri)
}

/**
 * Mark a user's email as verified.
 *
 * This template requires email verification before sign-in (see
 * `src/lib/auth/options.ts`). In a real flow the user clicks the link from the
 * verification email; in tests we flip the flag directly so we can exercise the
 * authenticated path without parsing email.
 */
export async function verifyUserEmail(email: string): Promise<void> {
	const sql = connect()
	try {
		await sql`UPDATE users SET email_verified = true WHERE email = ${email}`
	} finally {
		await sql.end()
	}
}
