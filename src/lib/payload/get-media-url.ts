import { getClientSideURL } from '@/lib/payload/get-url';

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
	if (!url) return ''

	const hasProtocol = url.startsWith('http://') || url.startsWith('https://')
	const mediaUrl = hasProtocol ? url : `${getClientSideURL()}${url}`

	if (!cacheTag || cacheTag === '') {
		return mediaUrl
	}

	try {
		const parsedUrl = new URL(mediaUrl)
		parsedUrl.searchParams.set('v', cacheTag)
		return parsedUrl.toString()
	} catch {
		const separator = mediaUrl.includes('?') ? '&' : '?'
		return `${mediaUrl}${separator}v=${encodeURIComponent(cacheTag)}`
	}
}
