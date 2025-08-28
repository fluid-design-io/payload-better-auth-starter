'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { authClient } from '@/lib/auth/client'

import { AuthUIProvider } from '@daveyplate/better-auth-ui'

export function BetterAuthUIProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={router.refresh}
      credentials={{
        forgotPassword: true,
      }}
      account={{}}
      passkey
      emailOTP
      basePath="/"
      signUp={{
        fields: ['name'],
      }}
      Link={Link}
      deleteUser={{
        verification: true,
      }}
    >
      {children}
    </AuthUIProvider>
  )
}
