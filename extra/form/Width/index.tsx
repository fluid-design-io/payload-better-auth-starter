import type React from 'react'

import { cn } from '@/lib/utils'

export const Width = ({
  children,
  width,
  className,
}: {
  children: React.ReactNode
  width: string
  className?: string
}) => {
  let calcWidth: string
  switch (width) {
    case 'full':
      calcWidth = `100%`
      break
    default:
      calcWidth = `calc(${width} * 100% - 0.5rem)`
      break
  }
  return (
    <div style={{ flexBasis: calcWidth }} className={cn('gap-2 flex flex-col', className)}>
      {children}
    </div>
  )
}
