import type { UseInViewOptions } from 'motion/react'

export const inViewOptions = (
  margin: UseInViewOptions['margin'] = '0px 0px -300px 0px',
  delay?: number
) =>
  ({
    variants: {
      visible: {
        opacity: 1,
      },
      hidden: {
        opacity: 0,
      },
    },
    transition: {
      type: 'spring',
      bounce: 0.3,
      duration: 1.5,
      delay,
    },
    viewOptions: {
      once: true,
      margin,
    },
  }) as const
