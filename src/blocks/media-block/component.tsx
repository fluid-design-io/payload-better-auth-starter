import type { StaticImageData } from 'next/image'
import type React from 'react'

import { Media } from '@/components/payload/media'
import RichText from '@/components/payload/rich-text'

import { cn } from '@/lib/utils'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
  zoom?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
    zoom = true,
  } = props

  let caption: any
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className
      )}
    >
      {(media || staticImage) && (
        <Media
          imgClassName={cn('border border-border rounded-md', imgClassName)}
          resource={media}
          src={staticImage}
          zoom={zoom}
        />
      )}
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
