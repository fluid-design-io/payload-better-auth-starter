import { getServerSideURL } from '@/lib/payload'

import { seoPlugin as seoPluginConfig } from '@payloadcms/plugin-seo'
import type { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import type { Plugin } from 'payload'
import type { Blog } from '@/payload-types'

const generateTitle: GenerateTitle<Blog> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Acme` : 'Acme'
}

const generateURL: GenerateURL<Blog> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const seoPlugin: Plugin = seoPluginConfig({
  generateTitle,
  generateURL,
})
