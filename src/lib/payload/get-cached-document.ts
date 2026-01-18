import { cacheTag } from 'next/cache'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Config } from '@/payload-types'

type Collection = keyof Config['collections']

/**
 * Fetches a document from a Payload CMS collection by slug.
 *
 * @param {Collection} collection - The collection to fetch from
 * @param {string} slug - The slug of the document to fetch
 * @param {number} depth - The depth of relationships to populate
 * @returns {Promise<any>} The document or undefined if not found
 */
export async function getDocument<T extends Collection>(collection: T, slug: string, depth = 0) {
  'use cache'
  cacheTag(`${collection}-${slug}`)

  const payload = await getPayload({ config: configPromise })

  const page = await payload.find({
    collection,
    depth,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return page.docs[0]
}
