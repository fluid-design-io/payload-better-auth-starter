import type React from 'react'

import { Media } from '@/components/payload/media'

import { formatAuthors } from '@/lib/payload/format-authors'
import { formatDateTime } from '@/lib/payload/format-date-time'

import type { Blog } from '@/payload-types'

export const BlogHero: React.FC<{
  blog: Blog
}> = ({ blog }) => {
  const { heroImage, populatedAuthors, publishedAt, title } = blog

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="relative flex items-end">
      <div className="container mx-auto z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-center pb-8">
        <div className="col-start-1 col-span-1 md:col-start-2">
          <h1 className="mb-4 text-2xl md:text-4xl font-bold">{title}</h1>

          <div className="mb-4 text-muted-foreground">
            {publishedAt && <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>}
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16 justify-center items-center">
            {hasAuthors && (
              <div className="mb-4 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Author</p>

                  <p>{formatAuthors(populatedAuthors)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-3">
          <div className="max-w-[77rem] mx-auto">
            {heroImage && typeof heroImage === 'object' && (
              <Media
                priority
                imgClassName="relative w-full overflow-auto rounded-lg border object-cover object-center"
                resource={{ ...heroImage, width: 1200, height: 630 }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
