'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import type { Blog } from '@/payload-types'

export const revalidatePost: CollectionAfterChangeHook<Blog> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/blog/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
      revalidateTag(`blog-${doc.slug}`, 'max')
      revalidateTag('blog-sitemap', 'max')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/blog/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag(`blog-${previousDoc.slug}`, 'max')
      revalidateTag('blog-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Blog> = async ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/blog/${doc?.slug}`

    revalidatePath(path)
    revalidateTag(`blog-${doc.slug}`, 'max')
    revalidateTag('blog-sitemap', 'max')
  }

  return doc
}
