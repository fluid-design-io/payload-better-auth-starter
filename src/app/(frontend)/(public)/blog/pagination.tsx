'use client'
import type React from 'react'

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

import { cn } from '@/lib/utils'

import { useQueryStates } from 'nuqs'
import { blogSearchParams } from './search-params'

export const Pagination: React.FC<{
  className?: string
  page: number
  totalPages: number
}> = (props) => {
  const [, setQuery] = useQueryStates(blogSearchParams)

  const { className, page, totalPages } = props
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  const hasExtraPrevPages = page - 1 > 1
  const hasExtraNextPages = page + 1 < totalPages

  const navigateToPage = (newPage: number) => {
    setQuery({ page: newPage }, { shallow: false })
  }

  return (
    <div className={cn('my-12', className)}>
      <PaginationComponent>
        <PaginationContent>
          {hasPrevPage && (
            <PaginationItem>
              <PaginationPrevious onClick={() => navigateToPage(page - 1)} />
            </PaginationItem>
          )}

          {hasExtraPrevPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {hasPrevPage && (
            <PaginationItem>
              <PaginationLink onClick={() => navigateToPage(page - 1)}>{page - 1}</PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink isActive onClick={() => navigateToPage(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>

          {hasNextPage && (
            <PaginationItem>
              <PaginationLink onClick={() => navigateToPage(page + 1)}>{page + 1}</PaginationLink>
            </PaginationItem>
          )}

          {hasExtraNextPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {hasNextPage && (
            <PaginationItem>
              <PaginationNext onClick={() => navigateToPage(page + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </PaginationComponent>
    </div>
  )
}
