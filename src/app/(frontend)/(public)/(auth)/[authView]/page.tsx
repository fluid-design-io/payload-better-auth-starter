import { Main } from '@/components/layout/main'

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
      <AuthView pathname={authView} />
    </Main>
  )
}
