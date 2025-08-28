import type { GlobalConfig } from 'payload'
import { defaultLexical } from '@/fields/default-lexical'
import { revalidateGlobal } from '../hooks/revalidate-global'

export const GlobalPrivacy: GlobalConfig<'global-privacy'> = {
  slug: 'global-privacy',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: defaultLexical,
    },
  ],
  hooks: {
    afterChange: [(args) => revalidateGlobal(args, 'global-privacy')],
  },
}
