import type { GlobalConfig } from 'payload'
import { defaultLexical } from '@/fields/default-lexical'
import { link } from '@/fields/link'
import { revalidateGlobal } from '../hooks/revalidate-global'

export const GlobalFooter: GlobalConfig<'global-footer'> = {
  slug: 'global-footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/collections/global/footer/row-label#RowLabel',
        },
      },
      defaultValue: [
        {
          link: {
            type: 'custom',
            newTab: null,
            url: '/terms',
            label: 'Terms',
          },
        },
        {
          link: {
            type: 'custom',
            newTab: null,
            url: '/privacy',
            label: 'Privacy',
          },
        },
      ],
    },
    {
      name: 'footerText',
      type: 'richText',
      required: true,
      editor: defaultLexical,
      admin: {
        position: 'sidebar',
        description: 'The text that appears in the footer, such as copyright, etc.',
      },
    },
  ],
  hooks: {
    afterChange: [(args) => revalidateGlobal(args, 'global-footer')],
  },
}
