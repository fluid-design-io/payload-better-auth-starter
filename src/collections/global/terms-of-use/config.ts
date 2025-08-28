import type { GlobalConfig } from 'payload'
import { defaultLexical } from '@/fields/default-lexical'
import { revalidateGlobal } from '../hooks/revalidate-global'

export const GlobalTerms: GlobalConfig<'global-terms'> = {
  slug: 'global-terms',
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
    afterChange: [(args) => revalidateGlobal(args, 'global-terms')],
  },
}
