/**
 * Poll a URL until the server responds (or max attempts). Used to wait for Next.js
 * to be ready after spawning `next dev`.
 */
export async function waitForServer(
  url: string,
  options?: { maxAttempts?: number; intervalMs?: number },
): Promise<void> {
  const maxAttempts = options?.maxAttempts ?? 60
  const intervalMs = options?.intervalMs ?? 1000

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(
        `Waiting for server at ${url}... (${attempt}/${maxAttempts})`,
      )
      const res = await fetch(url, { method: 'GET' })
      if (res.ok || res.status === 404 || res.status === 405) {
        return
      }
    } catch {
      // Connection refused or timeout; keep trying
    }
    if (attempt < maxAttempts) {
      await new Promise((r) => setTimeout(r, intervalMs))
    }
  }

  throw new Error(
    `Server at ${url} did not respond after ${maxAttempts} attempts`,
  )
}
