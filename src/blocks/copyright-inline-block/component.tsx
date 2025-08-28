import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

import type { CopyRightInlineBlock as CopyRightInlineBlockProps } from '@/payload-types'

type Props = CopyRightInlineBlockProps & HTMLAttributes<HTMLSpanElement>

/**
 * A simple block that displays a legal disclaimer upto the current year.
 */
export const CopyRightInlineBlock: React.FC<Props> = ({
  className,
  fromYear,
  toYearType,
  toYearFixed,
  text,
}: Props) => {
  return (
    <span className={cn(className)}>
      {`© Copyright ${fromYear}~${toYearType === 'current' ? new Date().getFullYear() : toYearFixed}, ${text}.`}
    </span>
  )
}
