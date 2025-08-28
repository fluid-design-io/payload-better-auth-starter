import Link from 'next/link'
import type React from 'react'

import { Button, type ButtonProps } from '@/components/ui/button'

import { cn } from '@/lib/utils'

import type { Blog } from '@/payload-types'

export type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'blog'
    value: Blog | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

type PageReference = {
  relationTo: 'pages'
  value: string
}

type BlogReference = {
  relationTo: 'blog'
  value: Blog | string
}

type Reference = PageReference | BlogReference | null

export type LinkType = 'custom' | 'reference' | null

type GenerateSlugType = {
  reference?: null | Reference
  type?: LinkType | null
  url?: null | string
}

const generateHref = (args: GenerateSlugType): string => {
  const { type, reference, url } = args

  if ((type === 'custom' || type === undefined) && url) {
    return url
  }

  if (type === 'reference' && reference?.value && typeof reference.value !== 'string') {
    return `/${reference.value.slug}`
  }

  return ''
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  // @ts-expect-error reference is not typed
  const href = generateHref({ type, reference, url })
  if (!href) return null

  const size = sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
