import {
  adminClient,
  emailOTPClient,
  inferAdditionalFields,
  multiSessionClient,
  passkeyClient,
  phoneNumberClient,
  usernameClient,
} from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'
import { toast } from 'sonner'

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [
    usernameClient(),
    phoneNumberClient(),
    emailOTPClient(),
    passkeyClient(),
    adminClient(),
    multiSessionClient(),
    inferAdditionalFields({
      user: {
        role: {
          type: 'string',
        },
      },
    }),
  ],
  fetchOptions: {
    onError(e) {
      if (e.error.status === 429) {
        toast.error('Too many requests. Please try again later.')
      }
    },
  },
})

export const { signUp, signIn, signOut, useSession } = authClient

authClient.$store.listen('$sessionSignal', async () => {})
