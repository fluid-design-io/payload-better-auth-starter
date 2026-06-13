/**
 * Smoke tests: the server is up and the two public surfaces respond.
 *
 * - Payload REST API (`/api/<collection>`)
 * - Better Auth (`/api/auth/*`)
 *
 * These are read-only and a good first thing to run after cloning the template.
 */
import { expect, test } from 'bun:test'
import { api, getSession } from './helper/http'

test('Payload REST API responds with a paginated list', async () => {
	const res = await api<{ docs: unknown[] }>('/api/blog?limit=1')
	expect(res.status).toBe(200)
	expect(Array.isArray(res.body.docs)).toBe(true)
})

test('Better Auth session endpoint responds for an anonymous request', async () => {
	const res = await getSession('')
	expect(res.status).toBe(200)
	// No cookie -> no session.
	expect(res.body?.user ?? null).toBeNull()
})
