import type React from 'react'

import { cn } from '@/lib/utils'

export const Width = ({
  children,
  width,
  className,
}: {
  children: React.ReactNode
  width: string // full, 3/4, 2/3, 1/2, 1/3, 1/4
  className?: string
}) => {
  let calSpan: number
  switch (width) {
    case 'full':
      calSpan = 12
      break
    case '3/4':
      calSpan = (3 * 12) / 4
      break
    case '2/3':
      calSpan = (2 * 12) / 3
      break
    case '1/2':
      calSpan = 12 / 2
      break
    default:
      calSpan = 12
      break
  }
  return (
    <div style={{ gridColumn: `span ${calSpan}` }} className={cn('flex flex-col gap-2', className)}>
      {children}
    </div>
  )
}
