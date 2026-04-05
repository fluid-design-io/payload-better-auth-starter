'use client'

// credits: https://github.com/fuma-nama/fumadocs/blob/dev/packages/ui/src/components/image-zoom.tsx

import dynamic from 'next/dynamic'
import Image, { type ImageProps } from 'next/image'
import type { ImgHTMLAttributes } from 'react'

import type { UncontrolledProps } from 'react-medium-image-zoom'

import './image-zoom.css'

/**
 * `react-medium-image-zoom` uses `instanceof Element` during render; `Element` is not defined in Node
 * during SSG/SSR. `next/dynamic` with `ssr: false` defers the module to the client only (see
 * https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#nextdynamic ).
 */
const Zoom = dynamic(() => import('react-medium-image-zoom').then((mod) => mod.default), {
  ssr: false,
})

export type ImageZoomProps = ImageProps & {
  /**
   * Image props when zoom in
   */
  zoomInProps?: ImgHTMLAttributes<HTMLImageElement>

  /**
   * Props for `react-medium-image-zoom`
   */
  rmiz?: UncontrolledProps
}

function getImageSrc(src: ImageProps['src']): string {
  if (typeof src === 'string') return src

  if (typeof src === 'object') {
    // Next.js
    if ('default' in src) return (src as { default: { src: string } }).default.src
    return src.src
  }

  return ''
}

export function ImageZoom({ zoomInProps, children, rmiz, ...props }: ImageZoomProps) {
  const inner = children ?? (
    <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px" {...props} />
  )

  return (
    <Zoom
      zoomMargin={20}
      wrapElement="span"
      {...rmiz}
      zoomImg={{
        src: getImageSrc(props.src),
        sizes: undefined,
        ...zoomInProps,
      }}
    >
      {inner}
    </Zoom>
  )
}
