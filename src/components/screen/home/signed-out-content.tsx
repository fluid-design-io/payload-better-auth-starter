import Link from 'next/link'

import { Container } from '@/components/layout/elements'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { P } from '@/components/ui/typography'

export const SignedOutContent = () => {
  return (
    <Container>
      <AnimatedGroup preset="fade" className="flex flex-col gap-12">
        <Card variant="mixed" className="max-w-md backdrop-blur-xs">
          <CardContent className="flex justify-between items-center">
            <P>Authentication</P>
            <Button asChild>
              <Link href="/sign-in?redirectTo=/">Sign in</Link>
            </Button>
          </CardContent>
        </Card>
      </AnimatedGroup>
    </Container>
  )
}
