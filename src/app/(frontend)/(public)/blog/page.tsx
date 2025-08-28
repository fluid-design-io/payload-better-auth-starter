import type { Metadata } from 'next/types'

import { Container } from '@/components/layout/elements'
import { Main } from '@/components/layout/main'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { CollectionCard } from '@/components/payload/collection-card'
import { PageRange } from '@/components/payload/page-range'
import { Muted } from '@/components/ui/typography'

import { getPayload } from '@/lib/payload/get-payload'

import { BlogHeader } from './blog-header'
import { Pagination } from './pagination'

// export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload()

  const blogPosts = await payload.find({
    collection: 'blog',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <>
      <BlogHeader title="Blog">
        <PageRange
          collection="blog"
          currentPage={blogPosts.page}
          limit={12}
          totalDocs={blogPosts.totalDocs}
        />
      </BlogHeader>
      <Main className="my-24">
        <Container className="w-full" asChild>
          <AnimatedGroup
            className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8"
            childrenClassName="col-span-4"
          >
            {blogPosts.docs.map((result, index) => (
              <CollectionCard
                key={`${result.slug}-${index}`}
                className="h-full"
                doc={result}
                relationTo="blog"
              />
            ))}
            {blogPosts.docs.length === 0 && (
              <div className="col-span-full">
                <Muted>No blog posts found</Muted>
              </div>
            )}
          </AnimatedGroup>
        </Container>
      </Main>

      <div className="container mx-auto">
        {blogPosts.totalPages > 1 && blogPosts.page && (
          <Pagination page={blogPosts.page} totalPages={blogPosts.totalPages} />
        )}
      </div>
    </>
  )
}

export const metadata: Metadata = {
  title: `Acme Blog`,
}
