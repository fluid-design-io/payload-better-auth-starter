import { createSearchParamsCache, parseAsInteger, parseAsString } from 'nuqs/server'
import type { Blog } from '@/payload-types'

// Define the available categories from the blog collection
export const BLOG_CATEGORIES: NonNullable<Blog['category']>[] = [
  'company',
  'marketing',
  'newsroom',
  'partners',
  'engineering',
  'press',
] as const

export type BlogCategory = (typeof BLOG_CATEGORIES)[number]

// Search params parsers for blog filtering and pagination
export const blogSearchParams = {
  category: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
}

// Create search params cache for server-side usage
export const blogSearchParamsCache = createSearchParamsCache(blogSearchParams)

// Helper function to validate category
export function isValidCategory(category: string | null | undefined): category is BlogCategory {
  return BLOG_CATEGORIES.includes(category as BlogCategory)
}
