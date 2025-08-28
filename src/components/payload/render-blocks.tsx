import type React from 'react'
import { Fragment } from 'react'

import { ContentBlock } from '@/blocks/content-block/component'
import { GalleryBlock } from '@/blocks/gallery-block/component'
import { MediaBlock } from '@/blocks/media-block/component'

const blockComponents = {
  //* [Extra] Form Block *//
  // formBlock: FormBlock,
  mediaBlock: MediaBlock,
  galleryBlock: GalleryBlock,
  contentBlock: ContentBlock,
}

export const RenderBlocks: React.FC<{
  blocks: any[]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              return (
                <section className="my-16" key={index}>
                  <Block {...block} disableInnerContainer />
                </section>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
