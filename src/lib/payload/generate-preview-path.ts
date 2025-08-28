import type { CollectionSlug, PayloadRequest } from 'payload'

/**
 * Maps collection slugs to their corresponding URL prefixes.
 * This determines the URL structure for different content types.
 */
const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

/**
 * Generates a preview URL for Payload CMS content.
 * This allows editors to preview unpublished or draft content.
 *
 * @param {Props} options - Options for generating the preview path
 * @param {keyof typeof collectionPrefixMap} options.collection - The collection the document belongs to
 * @param {string} options.slug - The slug of the document
 * @param {PayloadRequest} options.req - The Payload request object
 * @returns {string} The complete preview URL
 *
 * ## When to use:
 *
 * 1. **CMS Preview Functionality**:
 *    - When implementing preview functionality in Payload CMS
 *    - For "View Preview" buttons in the admin panel
 *
 * 2. **Draft Content**:
 *    - For previewing unpublished or draft content
 *    - When content needs review before publishing
 *
 * 3. **Admin Hooks**:
 *    - In Payload hooks for collections with preview support
 *    - For custom admin components that need preview links
 *
 * 4. **Content Workflow**:
 *    - As part of content approval workflows
 *    - For editorial review processes
 *
 * ## Example usage:
 *
 * ```typescript
 * // In a Payload collection config
 * export const Posts = {
 *   slug: 'posts',
 *   admin: {
 *     preview: (doc, { req }) => {
 *       if (!doc?.slug) return '';
 *
 *       return generatePreviewPath({
 *         collection: 'posts',
 *         slug: doc.slug,
 *         req
 *       });
 *     }
 *   },
 *   // rest of collection config
 * };
 * ```
 */
export const generatePreviewPath = ({ collection, slug, req }: Props) => {
  const path = `${collectionPrefixMap[collection]}/${slug}`

  const params = {
    slug,
    collection,
    path,
  }

  const encodedParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    encodedParams.append(key, value)
  })

  const isProduction =
    process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL_PROJECT_PRODUCTION_URL)
  const protocol = isProduction ? 'https:' : req.protocol

  const url = `${protocol}//${req.host}/next/preview?${encodedParams.toString()}`
  console.log('🔥PREVIEW URL', url)

  return url
}
