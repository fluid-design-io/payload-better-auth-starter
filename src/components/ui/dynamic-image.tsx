import type { StaticImageData } from 'next/image'
import Image from 'next/image'

import { cn } from '@/lib/utils'

export const DynamicImage = ({
  src: { light, dark },
  alt,
  className = '',
  ...props
}: DynamicImageProps) => {
  const lightClass = 'dark:hidden'
  const darkClass = 'hidden dark:block'
  const placeholder = typeof light === 'string' ? undefined : 'blur'
  return (
    <>
      {[light, dark].map((src, index) => (
        <Image
          alt={alt}
          key={`${typeof src === 'string' ? src : src.src}-${index}`}
          src={src}
          className={cn(className, index === 0 ? lightClass : darkClass)}
          placeholder={placeholder}
          {...props}
        />
      ))}
    </>
  )
}

export interface DynamicImageProps {
  src: {
    light: string | StaticImageData
    dark: string | StaticImageData
  }
  alt: string
  className?: string
  width?: number
  height?: number
  [key: string]: unknown
}
