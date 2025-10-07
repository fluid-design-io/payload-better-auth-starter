import { ArrowRight, User2 } from 'lucide-react'
import Link from 'next/link'

import { Main } from '@/components/layout/main'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { P } from '@/components/ui/typography'

import { AuthView } from '@daveyplate/better-auth-ui'
import { authViewPaths } from '@daveyplate/better-auth-ui/server'

export const generateMetadata = async ({ params }: { params: Promise<{ authView: string }> }) => {
  const viewPaths = {
    callback: 'Callback',
    'email-otp': 'Email OTP',
    'forgot-password': 'Forgot Password',
    'magic-link': 'Magic Link',
    'recover-account': 'Recover Account',
    'reset-password': 'Reset Password',
    'sign-in': 'Sign In',
    'sign-out': 'Sign Out',
    'sign-up': 'Sign Up',
    'two-factor': 'Two Factor',
  }
  const { authView } = await params
  return {
    title: viewPaths[authView as keyof typeof viewPaths] || 'Auth',
  }
}

export function generateStaticParams() {
  return Object.values(authViewPaths).map((authView) => ({ authView }))
}

export default async function AuthPage({ params }: { params: Promise<{ authView: string }> }) {
  const { authView } = await params
  return (
    <Main className="container mx-auto flex grow flex-col items-center justify-center gap-3 self-center p-4 md:p-6">
      {(authView === 'sign-up' || authView === 'sign-in') && (
        <Alert className="max-w-sm" variant="accent">
          <User2 />
          <AlertTitle>Demo Mode</AlertTitle>
          <AlertDescription>
            <P>
              You can use <strong>john_doe@uing.dev</strong> as the email and{' '}
              <strong>Password123!</strong> as the password to sign in.
            </P>
            {authView === 'sign-up' && (
              <Button asChild>
                <Link href="/sign-in">
                  Go to sign in <ArrowRight />
                </Link>
              </Button>
            )}
          </AlertDescription>
        </Alert>
      )}
      <AuthView pathname={authView} />
    </Main>
  )
}
