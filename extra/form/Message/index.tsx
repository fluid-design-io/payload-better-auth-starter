import type React from 'react'

import RichText from '@/components/payload/rich-text'

import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Width } from '../Width'

// @ts-expect-error - message is required
export const Message: React.FC = ({ message }: { message: SerializedEditorState }) => {
  return (
    <Width className="my-12" width="full">
      {message && <RichText data={message} />}
    </Width>
  )
}
