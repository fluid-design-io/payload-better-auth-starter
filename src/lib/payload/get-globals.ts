import { cacheTag } from 'next/cache'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Config } from 'src/payload-types'

type Global = keyof Config['globals']

export async function getGlobal(slug: Global, depth = 0) {
  'use cache'
  cacheTag(`global-${slug}`)

  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
  })

  return global
}
