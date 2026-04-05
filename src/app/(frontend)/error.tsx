'use client'

import { AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

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

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Main className="flex min-h-[50vh] items-center justify-center">
      <Empty className="max-w-md border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertCircle className="text-destructive size-8" />
          </EmptyMedia>
          <EmptyTitle>Something went wrong</EmptyTitle>
          <EmptyDescription>
            An unexpected error occurred. You can try again or return to the home page.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex flex-wrap justify-center gap-2">
          <Button type="button" onClick={() => reset()}>
            Try again
          </Button>
          <Button variant="outline" render={<Link href="/" />}>
            Home
          </Button>
        </EmptyContent>
      </Empty>
    </Main>
  )
}
