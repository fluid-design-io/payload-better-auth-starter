import {
  BlocksFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  lexicalEditor,
  ParagraphFeature,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'
import type { Config } from 'payload'
import { CopyRightInlineBlock } from '@/blocks/copyright-inline-block/config'
import { MediaBlock } from '@/blocks/media-block/config'

/**
 * Default Lexical editor configuration
 *
 * Render in the frontend:
 * @example
 *
 * ```tsx
 * import RichText from "@/components/payload/rich-text";
 *
 * <RichText
 *   className='max-w-[48rem] mx-auto'
 *   data={post.content}
 *   enableGutter={false}
 * />
 * ```
 */
export const defaultLexical: Config['editor'] = lexicalEditor({
  features: ({ defaultFeatures, rootFeatures }) => {
    return [
      ...defaultFeatures,
      ...rootFeatures,
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      ParagraphFeature(),
      UnderlineFeature(),
      HeadingFeature({
        enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'],
      }),
      BoldFeature(),
      ItalicFeature(),
      BlocksFeature({
        blocks: [MediaBlock],
        inlineBlocks: [CopyRightInlineBlock],
      }),
      LinkFeature({
        enabledCollections: ['blog'],
        fields: ({ defaultFields }) => {
          const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
            if ('name' in field && field.name === 'url') return false
            return true
          })

          return [
            ...defaultFieldsWithoutUrl,
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: ({ linkType }) => linkType !== 'internal',
              },
              label: ({ t }) => t('fields:enterURL'),
              required: true,
            },
          ]
        },
      }),
    ]
  },
})
