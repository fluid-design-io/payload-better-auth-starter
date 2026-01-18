import type { Metadata } from 'next'
import { cacheTag } from 'next/cache'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { Container } from '@/components/layout/elements'
import { Main } from '@/components/layout/main'
import { LivePreviewListener } from '@/components/payload/live-preview-listener'

import { generateMeta } from '@/lib/payload/generate-meta'
import { getDocument } from '@/lib/payload/get-cached-document'
import { getPayload } from '@/lib/payload/get-payload'

import { BlogPostsSkeleton } from '../blog-posts'
import { BlogContent } from './blog-content'
import { BlogSidebar } from './blog-sidebar'

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

  if (params.length === 0) {
    return ['__placeholder__']
  }

  return params
}
export default async function Post({ params, searchParams }: PageProps<'/blog/[slug]'>) {
  const { slug = '' } = await params

  // Handle placeholder case
  if (slug === '__placeholder__') {
    notFound()
  }

  return (
    <Main className="md:pt-16 pb-16">
      <Container className="w-full lg:grid lg:grid-cols-[1fr_44rem_1fr]">
        <Suspense fallback={<BlogPostsSkeleton />}>
          <BlogSection slug={slug} searchParams={searchParams} />
        </Suspense>
      </Container>
    </Main>
  )
}

const BlogSection = async ({
  slug,
  searchParams,
}: {
  slug: string
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) => {
  const { draft } = await searchParams
  if (draft) {
    return (
      <DraftBlogSection slug={slug} draft={typeof draft === 'string' ? draft === 'true' : false} />
    )
  }
  return <CachedBlogSection slug={slug} />
}

const CachedBlogSection = async ({ slug }: { slug: string }) => {
  'use cache'
  cacheTag(`blog-${slug}`)

  const post = await getDocument('blog', slug, 1)
  if (!post) notFound()

  return (
    <>
      <BlogSidebar post={post} />
      <BlogContent post={post} />
    </>
  )
}

const DraftBlogSection = async ({ slug, draft }: { slug: string; draft: boolean }) => {
  const payload = await getPayload()

  const postDocs = await payload.find({
    collection: 'blog',
    where: {
      slug: {
        equals: slug,
      },
    },
    draft,
  })
  if (!postDocs.docs.length) notFound()

  const post = postDocs.docs[0]

  return (
    <>
      <LivePreviewListener />
      <BlogSidebar post={post} />
      <BlogContent post={post} />
    </>
  )
}

export async function generateMetadata({ params }: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { slug = '' } = await params
  const post = await getDocument('blog', slug, 1)
  if (!post) return {}

  return generateMeta({ doc: post })
}
