import { Container } from '@/components/layout/elements'
import { Main } from '@/components/layout/main'

import { AccountView } from '@daveyplate/better-auth-ui'
import { accountViewPaths } from '@daveyplate/better-auth-ui/server'

export const metadata = {
  title: 'Account Settings',
  description: 'Account Settings',
}

export function generateStaticParams() {
  return Object.values(accountViewPaths).map((accountView) => ({
    accountView,
  }))
}

export default async function AccountPage({
  params,
}: {
  params: Promise<{ accountView: string }>
}) {
  const { accountView } = await params
  return (
    <Main className="flex grow flex-col items-center justify-center gap-3 self-center">
      <Container>
        <AccountView pathname={accountView} />
      </Container>
    </Main>
  )
}
