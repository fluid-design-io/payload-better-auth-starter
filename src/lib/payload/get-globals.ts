import { cacheLife, cacheTag } from 'next/cache'

import type { Config } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

type Global = keyof Config['globals']

export async function getGlobal(slug: Global, depth = 0) {
  'use cache'
  cacheLife('hours')
  cacheTag(slug)

  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
  })

  return global
}
