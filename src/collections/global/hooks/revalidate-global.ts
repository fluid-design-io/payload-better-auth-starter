/* eslint-disable @typescript-eslint/no-explicit-any */

import { updateTag } from 'next/cache'

import type { PayloadRequest, RequestContext, SanitizedGlobalConfig } from 'payload'

export const revalidateGlobal = (
  {
    doc,
    req: { payload, context },
  }: {
    context: RequestContext
    data: any
    doc: any
    /** The global which this hook is being run on */
    global: SanitizedGlobalConfig
    previousDoc: any
    req: PayloadRequest
  },
  tag: string
) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`✨ Revalidating ${tag}`)

    updateTag(tag)
  }

  return doc
}
