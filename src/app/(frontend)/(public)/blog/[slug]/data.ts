import { cache } from 'react'

import { getPayload } from '@/lib/payload/get-payload'

export const queryPostsBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'blog',
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
