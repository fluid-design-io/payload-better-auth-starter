import Link from 'next/link'
import type React from 'react'

import { Media } from '@/components/payload/media'

import { cn } from '@/lib/utils'

import type { Blog } from '@/payload-types'

type CollectionCardProps = {
  alignItems?: 'center'
  className?: string
  doc?: Blog
  relationTo?:
    | string
    | {
        /** The collection to link to */
        collection: string
        /** The slug to link to that will appear in the url path */
        slug: string
      }
  title?: string
}

export const CollectionCard: React.FC<CollectionCardProps> = (props) => {
  const { className, doc, relationTo, title: titleFromProps } = props
  const { slug, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  let href = ''
  if (typeof relationTo === 'object') {
    href = `/${relationTo.slug}/${slug}`
  } else if (typeof relationTo === 'string') {
    href = `/${relationTo}/${slug}`
  }

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointe relative',
        className
      )}
    >
      <div className="relative w-full ">
        {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="33vw" />}
      </div>
      <div className="p-4">
        {titleToUse && (
          <Link href={href}>
            <h3 className="mb-0 text-lg font-bold md:text-xl">{titleToUse}</h3>
            <span className="absolute inset-0"></span>
          </Link>
        )}
        {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
      </div>
    </article>
  )
}
