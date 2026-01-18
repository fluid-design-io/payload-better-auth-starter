import { SquareDashedIcon } from 'lucide-react'
import Link from 'next/link'

import { Main } from '@/components/layout/main'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'

import { SignedIn } from '@daveyplate/better-auth-ui'

export default function DashboardPage() {
  return (
    <Main className="h-full w-full flex items-center justify-center">
      <Empty className="border border-dashed w-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SquareDashedIcon />
          </EmptyMedia>
          <EmptyTitle>Dashboard</EmptyTitle>
          <EmptyDescription>Welcome to the dashboard.</EmptyDescription>
        </EmptyHeader>
        <SignedIn>
          <EmptyContent>
            <Button variant="outline" size="sm" render={<Link href="/admin" />}>
              Admin Dashboard
            </Button>
          </EmptyContent>
        </SignedIn>
      </Empty>
    </Main>
  )
}
