import canUseDOM from './can-use-dom'

export const getServerSideURL = () => {
  let url = process.env.NEXT_PUBLIC_SERVER_URL

  if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (!url) {
    url = 'http://localhost:3000'
  }

  // Normalize the URL: remove trailing slashes and ensure it's a valid base URL
  url = url.trim().replace(/\/+$/, '')

  // If the URL already contains a full URL with a path (like http://localhost:3000/admin),
  // extract just the base URL
  try {
    const urlObj = new URL(url)
    // Return only the origin (protocol + hostname + port)
    return urlObj.origin
  } catch {
    // If URL parsing fails, return as-is (shouldn't happen with valid URLs)
    return url
  }
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  return process.env.NEXT_PUBLIC_SERVER_URL || ''
}
