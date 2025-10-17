import type React from 'react'

import { Media } from '@/components/payload/media'
import { H1 } from '@/components/ui/typography'

import { formatDate } from 'date-fns'
import type { Blog } from '@/payload-types'

export const BlogHeader: React.FC<{
  blog: Blog
}> = ({ blog }) => {
  const { meta, publishedAt, title } = blog

  const heroImage = meta?.image

  return (
    <>
      {heroImage && typeof heroImage === 'object' && (
        <div className="mb-10">
          <Media
            priority
            imgClassName="relative w-full overflow-auto rounded-lg border object-cover object-center"
            resource={heroImage}
          />
        </div>
      )}
      <H1>{title}</H1>

      {publishedAt && (
        <time
          dateTime={new Date(publishedAt).toISOString()}
          className="mt-2 mb-4 text-muted-foreground block"
        >
          {formatDate(publishedAt, 'MMM d, yyyy')}
        </time>
      )}
    </>
  )
}
