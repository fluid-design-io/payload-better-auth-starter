'use client'

import { InView } from '@/components/motion-primitives/in-view'
import { Skeleton } from '@/components/ui/skeleton'

import { inViewOptions } from '@/lib/animation'
import { cn } from '@/lib/utils'

import { useQueryStates } from 'nuqs'
import { BLOG_CATEGORIES, type BlogCategory, blogSearchParams } from './search-params'

export function BlogFilters() {
  const [{ category }, setQuery] = useQueryStates(blogSearchParams)

  const setActiveFilter = (newCategory: BlogCategory | '') => {
    setQuery(
      {
        category: newCategory,
        page: 1, // Reset to first page when changing category
      },
      {
        shallow: false,
      }
    )
  }

  return (
    <InView {...inViewOptions()}>
      <div className="-ml-0.5 mb-6 mt-12 flex justify-between gap-4 max-md:-mx-6 md:mt-16">
        <div
          className="-ml-0.5 flex snap-x snap-mandatory overflow-x-auto py-3 max-md:px-6"
          role="tablist"
          aria-label="Blog categories"
        >
          {/* All categories button */}
          <button
            type="button"
            onClick={() => setActiveFilter('')}
            role="tab"
            aria-selected={category === ''}
            className="text-muted-foreground group snap-center px-1"
          >
            <span
              className={cn(
                'flex w-fit items-center gap-2 rounded-md px-3 py-1 text-sm transition-colors [&>svg]:size-4',
                category === ''
                  ? 'bg-card ring-foreground/5 text-primary font-medium shadow-sm ring-1'
                  : 'hover:text-foreground group-hover:bg-foreground/5'
              )}
            >
              <span>All</span>
            </span>
          </button>

          {/* Category filter buttons */}
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat as BlogCategory)}
              role="tab"
              aria-selected={category === cat}
              className="text-muted-foreground group snap-center px-1 disabled:pointer-events-none disabled:opacity-50"
            >
              <span
                className={cn(
                  'flex w-fit items-center gap-2 rounded-md px-3 py-1 text-sm transition-colors [&>svg]:size-4',
                  category === cat
                    ? 'bg-card ring-foreground/5 text-primary font-medium shadow-sm ring-1'
                    : 'hover:text-foreground group-hover:bg-foreground/5'
                )}
              >
                <span className="capitalize">{cat}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </InView>
  )
}

export function BlogFiltersSkeleton() {
  return <Skeleton className="h-10 w-full rounded-md" />
}
