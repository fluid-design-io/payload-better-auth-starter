import { getPayload } from '@/lib/payload/get-payload'

import { toNextJsHandler } from 'better-auth/next-js'

const payload = await getPayload()

export const { POST, GET } = toNextJsHandler(payload.betterAuth)
