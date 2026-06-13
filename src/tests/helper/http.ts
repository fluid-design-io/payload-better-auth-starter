/**
 * HTTP helpers for the test suite.
 *
 * Tests talk to the running Next.js server over HTTP only — they never import the
 * Payload config in-process. This keeps the test runtime free of the server-only
 * module graph (Lexical, the Payload config, etc.) so it runs cleanly under
 * `bun test`. The server is started by the runner (see run.ts), which exposes its
 * URL via TEST_SERVER_URL.
 */
import { randomBytes } from 'node:crypto'

const SERVER_REQUIRED =
	'TEST_SERVER_URL is not set. Run the suite via `bun run test:run` so the server is started.'

export function baseUrl(): string {
	const url = process.env.TEST_SERVER_URL
	if (!url) throw new Error(SERVER_REQUIRED)
	return url.replace(/\/$/, '')
}

/** A unique throwaway email so repeated runs never collide. */
export function uniqueEmail(): string {
	return `test-${Date.now()}-${randomBytes(4).toString('hex')}@test.local`
}

export interface ApiResponse<T = unknown> {
	status: number
	ok: boolean
	body: T
	/** Session cookies set by the response, ready to pass back as a `cookie` header. */
	cookie: string
}

/** Extract Set-Cookie values from a response into a single `cookie` header string. */
function readCookies(res: Response): string {
	const h = res.headers as Headers & { getSetCookie?(): string[] }
	const all = typeof h.getSetCookie === 'function' ? h.getSetCookie() : []
	if (all.length > 0) {
		return all
			.map((c) => c.split(';')[0]?.trim() ?? '')
			.filter(Boolean)
			.join('; ')
	}
	const single = res.headers.get('set-cookie')
	return single ? (single.split(';')[0]?.trim() ?? '') : ''
}

/** Thin fetch wrapper: JSON in/out, returns status + parsed body + any session cookies. */
export async function api<T = unknown>(
	path: string,
	init: RequestInit & { cookie?: string } = {},
): Promise<ApiResponse<T>> {
	const { cookie, headers, body, ...rest } = init
	const res = await fetch(`${baseUrl()}${path}`, {
		...rest,
		headers: {
			'Content-Type': 'application/json',
			...(cookie ? { cookie } : {}),
			...headers,
		},
		body,
	})

	const text = await res.text()
	let parsed: unknown = text
	try {
		parsed = text ? JSON.parse(text) : null
	} catch {
		// non-JSON body; leave as text
	}

	return {
		status: res.status,
		ok: res.ok,
		body: parsed as T,
		cookie: readCookies(res),
	}
}

export interface TestUser {
	email: string
	password: string
	name: string
}

/** Sign up a new user via Better Auth. Returns the user and its session cookie. */
export async function signUp(
	overrides: Partial<TestUser> = {},
): Promise<{ user: TestUser; userId: string; cookie: string }> {
	const user: TestUser = {
		email: overrides.email ?? uniqueEmail(),
		password: overrides.password ?? 'test-password-123',
		name: overrides.name ?? 'Test User',
	}

	const res = await api<{ user?: { id: string } }>('/api/auth/sign-up/email', {
		method: 'POST',
		body: JSON.stringify(user),
	})
	if (!res.ok || !res.body?.user?.id) {
		throw new Error(`sign-up failed: ${res.status} ${JSON.stringify(res.body)}`)
	}

	return { user, userId: res.body.user.id, cookie: res.cookie }
}

/** Sign in an existing user. Returns the session cookie. */
export async function signIn(email: string, password: string): Promise<string> {
	const res = await api('/api/auth/sign-in/email', {
		method: 'POST',
		body: JSON.stringify({ email, password }),
	})
	if (!res.ok || !res.cookie) {
		throw new Error(`sign-in failed: ${res.status} ${JSON.stringify(res.body)}`)
	}
	return res.cookie
}

/** Fetch the current session for a given session cookie. */
export async function getSession(cookie: string) {
	return api<{ user?: { id: string; email: string } } | null>('/api/auth/get-session', {
		cookie,
	})
}
