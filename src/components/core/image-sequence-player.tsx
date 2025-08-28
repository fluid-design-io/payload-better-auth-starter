'use client'

import Image, { type StaticImageData } from 'next/image'
import { useEffect, useState } from 'react'

import { IMAGE_SIZES } from '@/lib/constants'
import { cn } from '@/lib/utils'

import { AnimatePresence, motion } from 'motion/react'

interface ImageSequencePlayerProps {
  images: StaticImageData[]
  alt: string
  /**
   * The interval between images in milliseconds.
   * @default 4000
   */
  interval?: number
  className?: string
  imageClassName?: string
  sizes?: string
  /**
   * The delay before the animation starts in seconds.
   * @default 0.4
   */
  delay?: number
}

export default function ImageSequencePlayer({
  images,
  alt,
  interval = 4000,
  className,
  imageClassName,
  sizes = IMAGE_SIZES.mobileFullDesktopHalf,
  delay = 0.4,
}: ImageSequencePlayerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
    }, interval)

    return () => clearInterval(intervalId)
  }, [images.length, interval])

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={`image-sequence-${currentImageIndex}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { delay: delay } }}
        transition={{ duration: 0.5 }}
        className={cn('absolute inset-0', className)}
      >
        <Image
          src={images[currentImageIndex]}
          alt={`${alt} - Frame ${currentImageIndex + 1}`}
          className={cn('w-full h-full', imageClassName)}
          sizes={sizes}
          fill
        />
      </motion.div>
    </AnimatePresence>
  )
}
