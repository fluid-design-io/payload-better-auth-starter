import type { Metadata } from 'next/types'
import { Suspense } from 'react'

import { Container, LayoutHeader } from '@/components/layout/elements'
import { Main } from '@/components/layout/main'

import type { SearchParams } from 'nuqs/server'
import { BlogFilters, BlogFiltersSkeleton } from './blog-filters'
import { BlogPosts, BlogPostsSkeleton } from './blog-posts'
import { blogSearchParamsCache, isValidCategory } from './search-params'

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function Page({ searchParams }: PageProps) {
  return (
    <Main className="my-24">
      <LayoutHeader title="News, insights and more from Acme" badge="Blog" />
      <Container className="w-full">
        <Suspense fallback={<BlogFiltersSkeleton />}>
          <BlogFilters />
        </Suspense>
        <Suspense fallback={<BlogPostsSkeleton />}>
          <BlogPosts searchParams={searchParams} />
        </Suspense>
      </Container>
    </Main>
  )
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { category, page } = await blogSearchParamsCache.parse(searchParams)

  let title = 'Acme Blog'

  if (category && isValidCategory(category)) {
    title = `Acme Blog - ${category.charAt(0).toUpperCase() + category.slice(1)}`
  }

  if (page > 1) {
    title += ` - Page ${page}`
  }

  return {
    title,
  }
}
