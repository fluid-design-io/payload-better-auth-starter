import { headers } from 'next/headers'
import type { ReactNode } from 'react'
import { Suspense } from 'react'

import { BetterAuthUIProvider } from '@/components/layout/better-auth-ui-provider'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { Toaster } from '@/components/ui/sonner'

import { BetterAuthProvider } from '@/lib/auth/context'
import { fallbackBetterAuthContextProps } from '@/lib/auth/context/fallback-context-props'
import { getContextProps } from '@/lib/auth/context/get-context-props'

async function AuthTreeWithContext({ children }: { children: ReactNode }) {
  await headers()
  return (
    <BetterAuthProvider {...getContextProps()}>
      <BetterAuthUIProvider>{children}</BetterAuthUIProvider>
    </BetterAuthProvider>
  )
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <Suspense
        fallback={
          <BetterAuthProvider {...fallbackBetterAuthContextProps}>
            <BetterAuthUIProvider>{children}</BetterAuthUIProvider>
          </BetterAuthProvider>
        }
      >
        <AuthTreeWithContext>{children}</AuthTreeWithContext>
      </Suspense>
      <Toaster />
    </ThemeProvider>
  )
}
