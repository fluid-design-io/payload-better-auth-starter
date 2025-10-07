import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Container } from '@/components/layout/elements'
import { Main } from '@/components/layout/main'
import { LivePreviewListener } from '@/components/payload/live-preview-listener'
import RichText from '@/components/payload/rich-text'
import { Muted } from '@/components/ui/typography'

import { formatAuthors } from '@/lib/payload'
import { generateMeta } from '@/lib/payload/generate-meta'
import { getDocument } from '@/lib/payload/get-cached-document'
import { getPayload } from '@/lib/payload/get-payload'

import { BlogHeader } from './blog-header'

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
    <Main className="md:pt-16 pb-16">
      <Container className="w-full lg:grid lg:grid-cols-[1fr_44rem_1fr]">
        <div className="hidden lg:block">
          <div className="sticky top-8 z-10">
            <Link
              href="/blog"
              className="text-muted-foreground hover:text-primary transition duration-200"
            >
              Blog
            </Link>
            &nbsp;
            <span className="text-muted-foreground">/</span>
            &nbsp;
            <Link
              href={`/blog?category=${post.category}`}
              className="text-muted-foreground hover:text-primary transition duration-200 capitalize"
            >
              {post.category}
            </Link>
          </div>
        </div>
        <article className="col-start-1 col-span-1 md:col-start-2">
          {draft && <LivePreviewListener />}
          <BlogHeader blog={post} />
          <div className="flex flex-col items-center gap-4">
            <RichText data={post.content} enableGutter={false} />
            <div className="w-full my-16">
              <Muted className="text-left">
                Author: {formatAuthors(post.populatedAuthors || [])}
              </Muted>
            </div>
          </div>
        </article>
      </Container>
    </Main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await getDocument('blog', slug, 1, false)
  if (!post) return {}

  return generateMeta({ doc: post })
}
