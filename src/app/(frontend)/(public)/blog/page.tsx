import { ChevronRight, Newspaper } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next/types'

import { Container, LayoutHeader } from '@/components/layout/elements'
import { Main } from '@/components/layout/main'
import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'

import { getPayload } from '@/lib/payload/get-payload'

import { formatDate } from 'date-fns'
import type { SearchParams } from 'nuqs/server'
import type { Blog } from '@/payload-types'
import { BlogFilters } from './blog-filters'
import { Pagination } from './pagination'
import { blogSearchParamsCache, isValidCategory } from './search-params'

// export const dynamic = 'force-static'
export const revalidate = 600

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function Page({ searchParams }: PageProps) {
  const payload = await getPayload()

  // Parse search params using nuqs
  const { category, page } = await blogSearchParamsCache.parse(searchParams)

  // Validate category
  const validCategory: Blog['category'] =
    category && isValidCategory(category) ? category : undefined

  const blogPosts = await payload.find({
    collection: 'blog',
    depth: 1,
    limit: 12,
    page,
    select: {
      title: true,
      slug: true,
      category: true,
      publishedAt: true,
      authors: true,
      meta: true,
    },
    where: validCategory
      ? {
          category: {
            equals: validCategory,
          },
        }
      : undefined,
  })

  return (
    <>
      <Main className="my-24">
        <LayoutHeader title="News, insights and more from Acme" badge="Blog" />
        <Container className="w-full">
          <BlogFilters />
          <AnimatedGroup className="">
            {blogPosts.docs.map((article, index) => {
              const blogPost = article as Blog
              return (
                <div key={`${blogPost.title}-${blogPost.publishedAt}-${index}`}>
                  <div
                    aria-hidden
                    className="h-px bg-[length:4px_1px] bg-repeat-x opacity-20 [background-image:linear-gradient(90deg,var(--color-foreground)_1px,transparent_1px)]"
                  />
                  <article className="group relative grid gap-4 py-6 duration-200 md:grid-cols-[1fr_auto]">
                    <div className="grid gap-4 md:grid-cols-[auto_1fr_auto]">
                      <div className="flex gap-4 max-md:justify-between">
                        <span className="text-muted-foreground text-sm capitalize md:hidden">
                          {blogPost?.category || ''}
                        </span>
                        {blogPost.publishedAt && (
                          <time
                            className="text-muted-foreground text-sm md:w-24"
                            dateTime={new Date(blogPost.publishedAt).toISOString()}
                          >
                            {formatDate(blogPost.publishedAt, 'MM/dd/yyyy')}
                          </time>
                        )}
                      </div>
                      <h2 className="text-foreground font-semibold transition duration-200 group-hover:underline group-hover:underline-offset-4">
                        {blogPost.title}
                      </h2>
                      <div className="flex h-6 w-24 items-center max-md:hidden">
                        <span className="text-muted-foreground text-sm capitalize">
                          {blogPost?.category || ''}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-4 max-md:justify-between md:grid md:w-40 md:grid-cols-[1fr_auto]">
                      <div className="flex justify-end gap-2">
                        {blogPost.authors?.map((author, authorIndex) => (
                          <Avatar
                            key={authorIndex}
                            className="ring-border bg-card aspect-square size-6 overflow-hidden rounded-md border border-transparent shadow-md shadow-black/15 ring-1"
                          >
                            <AvatarImage
                              src={typeof author === 'object' && author?.image ? author.image : ''}
                              alt={typeof author === 'object' && author?.name ? author.name : ''}
                              width={460}
                              height={460}
                              className="size-full object-cover"
                              loading="lazy"
                              decoding="async"
                            />
                            <AvatarFallback>
                              {typeof author === 'object' && author?.name
                                ? author.name.charAt(0)
                                : ''}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <div className="flex h-6 items-center">
                        <Link
                          href={`/blog/${blogPost.slug}`}
                          aria-label={`Read ${blogPost.title}`}
                          className="text-primary hover:text-foreground flex items-center gap-1 text-sm font-medium transition-colors duration-200 before:absolute before:inset-0"
                        >
                          Read
                          <ChevronRight
                            strokeWidth={2.5}
                            aria-hidden="true"
                            className="size-3.5 translate-y-px duration-200 group-hover:translate-x-0.5"
                          />
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              )
            })}
            {blogPosts.docs.length === 0 && (
              <Empty className="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Newspaper />
                  </EmptyMedia>
                  <EmptyTitle>No Blog Posts</EmptyTitle>
                  <EmptyDescription>No blog posts found for {category}.</EmptyDescription>
                </EmptyHeader>
              </Empty>
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
