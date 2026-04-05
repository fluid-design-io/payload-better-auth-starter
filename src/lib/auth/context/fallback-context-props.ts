import type { Account, DeviceSession, Session } from '@/lib/auth/types'

import type { TypedUser } from 'payload'

/**
 * Resolved placeholder promises for Suspense fallback so the auth UI tree matches
 * the real provider shape without calling `headers()` before the shell streams.
 */
export const fallbackBetterAuthContextProps = {
  sessionPromise: Promise.resolve(null) as Promise<Session | null>,
  userAccountsPromise: Promise.resolve(null) as Promise<Account[] | null>,
  deviceSessionsPromise: Promise.resolve(null) as Promise<DeviceSession[] | null>,
  currentUserPromise: Promise.resolve(null) as Promise<TypedUser | null>,
}
