import { notFound } from 'next/navigation'
import type { Metadata } from 'next/types'

import { CollectionCard } from '@/components/payload/collection-card'
import { PageRange } from '@/components/payload/page-range'

import { getPayload } from '@/lib/payload/get-payload'

import { BlogHeader } from '@/app/(frontend)/(public)/blog/blog-header'
import { Pagination } from '@/app/(frontend)/(public)/blog/pagination'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload()

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const blogPosts = await payload.find({
    collection: 'blog',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
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

      <div className="my-24 container mx-auto">
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {blogPosts.docs.map((result, index) => (
            <div className="col-span-4" key={`${result.slug}-${index}`}>
              <CollectionCard className="h-full" doc={result} relationTo="blog" />
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto">
        {blogPosts?.page && blogPosts?.totalPages > 1 && (
          <Pagination page={blogPosts.page} totalPages={blogPosts.totalPages} />
        )}
      </div>
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Acme Blog Page ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload()
  const { totalDocs } = await payload.count({
    collection: 'blog',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
