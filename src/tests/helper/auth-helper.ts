/**
 * Auth helper for tests: create users via Better Auth signUpEmail (so both the user
 * and the accounts row with hashed password exist), then return session headers for
 * payload.auth({ headers }) and request-like usage.
 * Requires TEST_SERVER_URL (run tests via bun test:run or bun test:run:single so the dev server is started).
 */
import type { User } from '@/payload-types'
import { randomBytes } from 'node:crypto'

/** Minimal type so the helper works with the real Payload + Better Auth instance. */
type PayloadWithAuth = {
  auth: (args: { headers: Headers }) => Promise<{ user: User | null }>
  update: (args: {
    collection: 'users'
    id: string
    data: Record<string, unknown>
    overrideAccess?: boolean
  }) => Promise<User>
  findByID: (args: { collection: 'users'; id: string }) => Promise<User>
  betterAuth: {
    api: {
      getSession: (args: { headers: HeadersInit }) => Promise<{
        user: User | unknown
        session: unknown
      } | null>
    }
  }
}

function uniqueEmail(): string {
  return `test-${Date.now()}-${randomBytes(4).toString('hex')}@test.local`
}

export function getTestServerUrl(): string | undefined {
  return process.env.TEST_SERVER_URL
}

/**
 * Copy session cookies from a sign-in Response into a Headers object suitable for
 * the next request (payload.auth({ headers })).
 */
function copySessionCookiesToRequestHeaders(response: Response): Headers {
  const requestHeaders = new Headers()
  const h = response.headers as Headers & { getSetCookie?(): string[] }
  if (typeof h.getSetCookie === 'function') {
    const cookies = h.getSetCookie.call(response.headers)
    const cookieValue = cookies
      .map((c) => c.split(';')[0]?.trim() ?? '')
      .filter(Boolean)
      .join('; ')
    if (cookieValue) requestHeaders.set('cookie', cookieValue)
  } else {
    const setCookie = response.headers.get('set-cookie')
    if (setCookie)
      requestHeaders.set(
        'cookie',
        setCookie.split(';')[0]?.trim() ?? setCookie,
      )
  }
  return requestHeaders
}

export interface SignUpAndGetHeadersOptions {
  email?: string
  password: string
  name?: string
  role?: 'admin' | 'user'
  emailVerified?: boolean
}

export interface AuthHelperResult {
  user: User
  session: unknown
  headers: Headers
}

const TEST_SERVER_REQUIRED =
  'TEST_SERVER_URL must be set; run tests via pnpm test:run so the dev server is started'

async function authResultFromSignInResponse(
  payload: PayloadWithAuth,
  signInResponse: Response,
): Promise<AuthHelperResult> {
  const headers = copySessionCookiesToRequestHeaders(signInResponse)
  const sessionResult = await payload.betterAuth.api.getSession({ headers })
  if (!sessionResult?.user) {
    throw new Error(
      'getSession after signIn returned no user; session cookies may not have been set',
    )
  }
  const user = await payload.findByID({
    collection: 'users',
    id: (sessionResult.user as { id: string }).id,
  })
  return {
    user,
    session: sessionResult.session,
    headers,
  }
}

/**
 * Create a user via Better Auth sign-up (HTTP to dev server), optionally update
 * role/emailVerified, then sign in and return user + session headers.
 */
export async function signUpAndGetHeaders(
  payload: PayloadWithAuth,
  options: SignUpAndGetHeadersOptions,
): Promise<AuthHelperResult> {
  const baseUrl = getTestServerUrl()
  if (!baseUrl) throw new Error(TEST_SERVER_REQUIRED)

  const email = options.email ?? uniqueEmail()
  const password = options.password
  const name = options.name ?? 'Test User'

  const signUpRes = await fetch(`${baseUrl}/api/auth/sign-up/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })
  if (!signUpRes.ok) {
    const text = await signUpRes.text()
    throw new Error(`signUp (server) failed: ${signUpRes.status} ${text}`)
  }
  const signUpBody = (await signUpRes.json()) as {
    user?: { id: string; email: string }
  }
  const userId = signUpBody?.user?.id
  if (!userId) {
    throw new Error(
      `signUp (server) returned no user: ${JSON.stringify(signUpBody)}`,
    )
  }

  const updateData: Record<string, unknown> = {
    emailVerified: options.emailVerified ?? true,
    role: [options.role ?? 'user'],
  }

  await payload.update({
    collection: 'users',
    id: userId,
    data: updateData,
    overrideAccess: true,
  })

  const signInRes = await fetch(`${baseUrl}/api/auth/sign-in/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!signInRes.ok) {
    const text = await signInRes.text()
    throw new Error(`signIn (server) failed: ${signInRes.status} ${text}`)
  }

  return authResultFromSignInResponse(payload, signInRes)
}

const TEST_PASSWORD = 'test-password'

/**
 * Create a user with the given role via sign-up,
 * then sign in and return { user, headers, session } so tests can run as that user.
 */
export async function asUser(
  payload: PayloadWithAuth,
  role: 'admin' | 'user',
): Promise<AuthHelperResult> {
  return signUpAndGetHeaders(payload, {
    email: uniqueEmail(),
    password: TEST_PASSWORD,
    name: `Test ${role}`,
    role,
    emailVerified: true,
  })
}

/**
 * Sign in with existing email/password and return user + session headers.
 * Use when the user was already created via sign-up (e.g. signUpAndGetHeaders or the app).
 */
export async function loginAs(
  payload: PayloadWithAuth,
  email: string,
  password: string,
): Promise<AuthHelperResult> {
  const baseUrl = getTestServerUrl()
  if (!baseUrl) throw new Error(TEST_SERVER_REQUIRED)

  const signInRes = await fetch(`${baseUrl}/api/auth/sign-in/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!signInRes.ok) {
    const text = await signInRes.text()
    throw new Error(`loginAs (server) failed: ${signInRes.status} ${text}`)
  }

  return authResultFromSignInResponse(payload, signInRes)
}
