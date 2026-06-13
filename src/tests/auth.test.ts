/**
 * Auth flow test against the running server (route -> Better Auth -> Payload -> DB).
 *
 * This template requires email verification before sign-in, so the happy path is:
 * sign up -> verify email -> sign in -> read session. We verify the email directly
 * in the DB (see helper/db.ts) instead of parsing the verification email.
 * Use this as the template for your own authenticated tests.
 */
import { expect, test } from 'bun:test'
import { verifyUserEmail } from './helper/db'
import { getSession, signIn, signUp, uniqueEmail } from './helper/http'

test('sign-up creates a user but does not start a session (verification required)', async () => {
	const { userId, cookie } = await signUp()
	expect(userId).toBeTruthy()
	// No auto sign-in until the email is verified.
	expect(cookie).toBe('')
})

test('sign-in is rejected until the email is verified', async () => {
	const { user } = await signUp()
	await expect(signIn(user.email, user.password)).rejects.toThrow(/EMAIL_NOT_VERIFIED/)
})

test('after verifying, the user can sign in and the session resolves to them', async () => {
	const { user, userId } = await signUp()
	await verifyUserEmail(user.email)

	const cookie = await signIn(user.email, user.password)
	const session = await getSession(cookie)

	expect(session.status).toBe(200)
	expect(session.body?.user?.id).toBe(userId)
	expect(session.body?.user?.email).toBe(user.email)
})

test('a wrong password is rejected', async () => {
	const { user } = await signUp({ email: uniqueEmail() })
	await verifyUserEmail(user.email)
	await expect(signIn(user.email, 'wrong-password')).rejects.toThrow()
})
