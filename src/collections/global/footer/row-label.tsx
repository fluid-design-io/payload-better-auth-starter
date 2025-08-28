'use client'

import { type RowLabelProps, useRowLabel } from '@payloadcms/ui'
import type { GlobalFooter } from '@/payload-types'

export const RowLabel: React.FC<RowLabelProps> = (_props) => {
  const data = useRowLabel<NonNullable<GlobalFooter['navItems']>[number]>()

  const label = data?.data?.link?.label
    ? `Nav item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.link?.label}`
    : 'Row'

  return <div>{label}</div>
}
