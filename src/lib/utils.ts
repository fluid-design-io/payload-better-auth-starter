import type { AnimatedGroupProps } from '@/components/motion-primitives/animated-group'

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const transitionVariants: NonNullable<AnimatedGroupProps['variants']> = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
}

export const staggerVariants: NonNullable<AnimatedGroupProps['variants']> = {
  container: {
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 1,
      },
    },
  },
}
