import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Container } from '@/components/layout/elements'
import { Main } from '@/components/layout/main'

import { generateMeta } from '@/lib/payload/generate-meta'
import { getDocument } from '@/lib/payload/get-cached-document'
import { getPayload } from '@/lib/payload/get-payload'

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
        <BlogSidebar post={post} />
        <BlogContent post={post} draft={draft === 'true'} />
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
