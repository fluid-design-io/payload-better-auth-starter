import { FileQuestion } from 'lucide-react'
import Link from 'next/link'

import { Container } from '@/components/layout/elements'
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

export default function NotFound() {
  return (
    <Main className="flex min-h-[50vh] items-center justify-center">
      <Container className="flex justify-center">
        <Empty className="max-w-md border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileQuestion className="size-8" />
            </EmptyMedia>
            <EmptyTitle>Page not found</EmptyTitle>
            <EmptyDescription>
              The page you are looking for does not exist or may have been moved.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex flex-wrap justify-center gap-2">
            <Button render={<Link href="/" />}>Home</Button>
            <Button variant="outline" render={<Link href="/blog" />}>
              Blog
            </Button>
          </EmptyContent>
        </Empty>
      </Container>
    </Main>
  )
}
