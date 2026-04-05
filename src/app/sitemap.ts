import type { MetadataRoute } from 'next'
import { cacheLife, cacheTag } from 'next/cache'

import { getPayload } from '@/lib/payload/get-payload'
import { getServerSideURL } from '@/lib/payload/get-url'

import type { Blog } from '@/payload-types'

async function getCachedBlogSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  'use cache'
  cacheLife('hours')
  cacheTag('blog-sitemap')

  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'blog',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
      publishedAt: true,
      updatedAt: true,
    },
  })

  const base = getServerSideURL()

  return docs.map((doc): MetadataRoute.Sitemap[number] => {
    const post = doc as Pick<Blog, 'slug' | 'publishedAt' | 'updatedAt'>
    const lastModified = post.updatedAt ?? post.publishedAt
    return {
      url: `${base}/blog/${post.slug}`,
      lastModified: lastModified ? new Date(lastModified) : undefined,
      changeFrequency: 'weekly',
      priority: 0.7,
    }
  })
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getServerSideURL()

  const staticPaths = ['', '/features', '/about', '/blog', '/terms', '/privacy']

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }))

  const blogEntries = await getCachedBlogSitemapEntries()

  return [...staticEntries, ...blogEntries]
}
