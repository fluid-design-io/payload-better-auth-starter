import Link from 'next/link'

import { Container } from '@/components/layout/elements'
import { InView } from '@/components/motion-primitives/in-view'
import { Button } from '@/components/ui/button'
import Highlightborder from '@/components/ui/highlight-border'
import { H1 } from '@/components/ui/typography'

import { inViewOptions } from '@/lib/animation'
import { CLASSNAMES } from '@/lib/constants'
import { cn } from '@/lib/utils'

export const BlogHeader = ({
  title,
  goBack,
  children,
}: {
  title: string
  goBack?:
    | false
    | {
        href: string
        label: string
      }
  children?: React.ReactNode
}) => {
  return (
    <InView
      {...inViewOptions()}
      className={cn(
        '-mt-16 border-b pb-8 text-lg text-foreground sm:pb-12 sm:text-2xl md:text-3xl',
        'relative bg-background',
        {
          'pt-32': !goBack,
          'pt-[5.5rem]': !!goBack,
        }
      )}
    >
      {!!goBack && (
        <Container>
          <Button variant="link" size="sm" className="px-0" asChild>
            <Link href={goBack.href}>← {goBack.label}</Link>
          </Button>
        </Container>
      )}
      <div className={CLASSNAMES.layoutPadding}>
        <Container>
          <H1 className="mb-4">{title}</H1>
          <div>{children}</div>
        </Container>
      </div>
      <Highlightborder position="bottom" />
    </InView>
  )
}
