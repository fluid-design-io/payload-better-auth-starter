import type React from 'react'

import { cn } from '@/lib/utils'

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {}

const H1: React.FC<Props> = ({ className, ...props }) => {
  return (
    <h1
      className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)}
      {...props}
    />
  )
}

const H2: React.FC<Props> = ({ className, ...props }) => {
  return (
    <h2
      className={cn(
        'scroll-m-20 text-3xl font-bold tracking-tight text-foreground/90 sm:text-4xl',
        className
      )}
      {...props}
    />
  )
}

const H3: React.FC<Props> = ({ className, ...props }) => {
  return (
    <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)} {...props} />
  )
}

const H4: React.FC<Props> = ({ className, ...props }) => {
  return (
    <h4 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)} {...props} />
  )
}

const P: React.FC<Props> = ({ className, ...props }) => {
  return (
    <p
      className={cn(
        'text-base/7 sm:text-base/7 [&:not(:first-child)]:mt-6 text-foreground/90 dark:text-foreground/95',
        className
      )}
      {...props}
    />
  )
}

const Blockquote: React.FC<React.ComponentProps<'blockquote'>> = ({ className, ...props }) => {
  return <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)} {...props} />
}

const InlineCode: React.FC<Props> = ({ className, ...props }) => {
  return (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className
      )}
      {...props}
    />
  )
}

const Lead: React.FC<Props> = ({ className, ...props }) => {
  return <p className={cn('text-xl text-muted-foreground', className)} {...props} />
}

const Large: React.FC<Props> = ({ className, ...props }) => {
  return <div className={cn('text-lg font-semibold', className)} {...props} />
}

const Muted: React.FC<Props> = ({ className, children }) => {
  return <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>
}

export { Blockquote, H1, H2, H3, H4, InlineCode, Large, Lead, Muted, P }
