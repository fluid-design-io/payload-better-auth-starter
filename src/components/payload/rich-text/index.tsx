import { cn } from '@/lib/utils'

import type {
  DefaultNodeTypes,
  DefaultTypedEditorState,
  SerializedBlockNode,
  SerializedInlineBlockNode,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import {
  BlockquoteJSXConverter,
  RichText as ConvertRichText,
  defaultJSXConverters,
  type JSXConvertersFunction,
  LinkJSXConverter,
} from '@payloadcms/richtext-lexical/react'
import { CopyRightInlineBlock } from '@/blocks/copyright-inline-block/component'
import { GalleryBlock } from '@/blocks/gallery-block/component'
import { MediaBlock } from '@/blocks/media-block/component'
import type {
  CopyRightInlineBlock as CopyRightInlineBlockProps,
  GalleryBlock as GalleryBlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<MediaBlockProps | GalleryBlockProps>
  | SerializedInlineBlockNode<CopyRightInlineBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'blog' ? `/blog/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...defaultJSXConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  ...BlockquoteJSXConverter,
  blocks: {
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        zoom={node.fields.zoom ?? false}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    galleryBlock: ({ node }) => <GalleryBlock {...node.fields} />,
  },
  inlineBlocks: {
    copyRightInlineBlock: ({ node }) => <CopyRightInlineBlock {...node.fields} />,
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext w-full',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className
      )}
      {...rest}
    />
  )
}
