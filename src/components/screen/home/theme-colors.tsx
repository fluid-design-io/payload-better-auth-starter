import Link from 'next/link'

import { Container } from '@/components/layout/elements'
import { InView } from '@/components/motion-primitives/in-view'
import { H2, Muted } from '@/components/ui/typography'

import { inViewOptions } from '@/lib/animation'

const colors = [
  'foreground',
  'card',
  'popover',
  'primary',
  'secondary',
  'muted',
  'accent',
  'destructive',
  'card-foreground',
  'popover-foreground',
  'primary-foreground',
  'secondary-foreground',
  'muted-foreground',
  'accent-foreground',
  'destructive-foreground',
  'border',
  'input',
  'ring',
]

export const ThemeColors = () => {
  return (
    <Container asChild>
      <InView {...inViewOptions()} as="section" className="mb-16">
        <H2>Theme Colors</H2>
        <Muted className="mt-4 mb-8">
          Visit{' '}
          <Link
            href="https://tweakcn.com/editor/theme"
            className="underline font-medium text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            TweakCN
          </Link>{' '}
          to create new theme colors. Paste the colors into the{' '}
          <code className="bg-primary/15 px-1 py-0.5 rounded-md">
            src/app/(frontend)/globals.css
          </code>{' '}
          file.
        </Muted>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 border rounded-3xl px-4 py-8">
          {colors.map((color) => (
            <ColorPalette key={color} color={color} />
          ))}
        </div>
      </InView>
    </Container>
  )
}

const ColorPalette = ({ color }: { color: string }) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div
        className="size-16 border rounded-full"
        style={{
          backgroundColor: `var(--${color})`,
        }}
      />
      <Muted className="text-xs font-mono uppercase whitespace-pre-wrap text-center ">
        {color.replace(/-/g, '\n')}
      </Muted>
    </div>
  )
}
