import type React from 'react'

import { CollectionCard } from '@/components/payload/collection-card'
import RichText from '@/components/payload/rich-text'

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import clsx from 'clsx'
import type { Blog } from '@/payload-types'

export type RelatedBlogPostsProps = {
  className?: string
  docs?: Blog[]
  introContent?: DefaultTypedEditorState
}

export const RelatedBlogPosts: React.FC<RelatedBlogPostsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('lg:container lg:mx-auto', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
        {docs?.map((doc) => {
          if (typeof doc === 'string') return null

          return <CollectionCard key={doc.id} doc={doc} relationTo="blog" />
        })}
      </div>
    </div>
  )
}
