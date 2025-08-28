import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BlogHero } from '@/components/payload/blog-hero'
import { LivePreviewListener } from '@/components/payload/live-preview-listener'
import RichText from '@/components/payload/rich-text'

import { generateMeta } from '@/lib/payload/generate-meta'
import { getDocument } from '@/lib/payload/get-cached-document'
import { getPayload } from '@/lib/payload/get-payload'

import { RelatedBlogPosts } from '@/blocks/related-blog-posts'
import { queryPostsBySlug } from './data'
import ScrollProgress from './scroll-progress'

export async function generateStaticParams() {
  const payload = await getPayload()
  const blogPosts = await payload.find({
    collection: 'blog',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = blogPosts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
  searchParams: Promise<{ draft: string }>
}

export default async function Post({ params: paramsPromise, searchParams }: Args) {
  const { slug = '' } = await paramsPromise
  const { draft } = await searchParams

  const post = await getDocument('blog', slug, 1, draft === 'true')
  if (!post) notFound()

  return (
    <>
      <ScrollProgress />
      <article className="pt-16 pb-16">
        {draft && <LivePreviewListener />}

        <BlogHero blog={post} />

        <div className="flex flex-col items-center gap-4 pt-8">
          <div className="container mx-auto">
            <RichText className="max-w-[48rem] mx-auto" data={post.content} enableGutter={false} />
            {post.relatedBlogPosts && post.relatedBlogPosts.length > 0 && (
              <RelatedBlogPosts
                className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
                docs={post.relatedBlogPosts.filter((post) => typeof post === 'object')}
              />
            )}
          </div>
        </div>
      </article>
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostsBySlug({ slug })
  if (!post) return {}

  return generateMeta({ doc: post })
}
