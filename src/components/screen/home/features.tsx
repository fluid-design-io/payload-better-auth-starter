import { FileText, Lock, Mail, Palette, Settings, Shield, Ship, User, Zap } from 'lucide-react'

import { Container } from '@/components/layout/elements'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { Card } from '@/components/ui/card'
import { H3, Muted } from '@/components/ui/typography'

const features = [
  {
    icon: Shield,
    title: 'Better Auth UI',
    description:
      'PayloadAuth provides out-of-the-box authentication with Payload with Better Auth.',
  },
  {
    icon: Lock,
    title: 'Access Control',
    description:
      'Pre-configured collections with robust access control for public and private uploads.',
  },
  {
    icon: User,
    title: 'Account Management',
    description: 'Advanced account management UI for seamless user experience.',
  },
  {
    icon: Mail,
    title: 'Email Templates',
    description: 'Built-in email templates for consistent and professional communication.',
  },
  {
    icon: Palette,
    title: 'Refined UI Components',
    description:
      'Enhanced Shadcn UI components with additional components useful for building content-rich websites.',
  },
  {
    icon: Settings,
    title: 'Admin UI',
    description: 'Prettified Payload Admin UI for a better content management experience.',
  },
  {
    icon: Zap,
    title: 'Motion Primitives',
    description: 'Smooth animations and transitions to enhance user interactions.',
  },
  {
    icon: FileText,
    title: 'Form Plugin',
    description: 'Optional Payload Form Plugin Renderer for rendering forms in the frontend.',
  },
  {
    icon: Ship,
    title: 'Docker Development',
    description: 'Full-suite local development with S3, inbucket, and postgres in one command.',
  },
]

export const Features = () => {
  return (
    <Container asChild>
      <AnimatedGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card variant="muted" className="overflow-hidden p-6 h-full" key={feature.title}>
            <feature.icon className="text-primary size-5" />
            <H3 className="font-medium">{feature.title}</H3>
            <Muted className="text-balance">{feature.description}</Muted>
          </Card>
        ))}
      </AnimatedGroup>
    </Container>
  )
}
