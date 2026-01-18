import RichText from '@/components/payload/rich-text'
import { Muted } from '@/components/ui/typography'

import { formatAuthors } from '@/lib/payload'

import type { Blog } from '@/payload-types'
import { BlogHeader } from './blog-header'

export const BlogContent = ({ post }: { post: Blog }) => {
  return (
    <article className="col-start-1 col-span-1 md:col-start-2">
      <BlogHeader blog={post} />
      <div className="flex flex-col items-center gap-4">
        <RichText data={post.content} enableGutter={false} />
        <div className="w-full my-16">
          <Muted className="text-left">Author: {formatAuthors(post.populatedAuthors || [])}</Muted>
        </div>
      </div>
    </article>
  )
}
