import { Container } from '@/components/layout/elements'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { UserCard } from '@/components/screen/home/user-card'

export const SignedInContent = () => {
  return (
    <Container>
      <AnimatedGroup preset="fade" className="flex flex-col gap-12">
        <UserCard />
      </AnimatedGroup>
    </Container>
  )
}
