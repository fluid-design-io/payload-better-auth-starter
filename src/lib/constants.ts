export const CLASSNAMES = {
  /** Padding for <Main> or layout components */
  layoutPadding: 'px-4 md:px-8',
  /** Force content to have full width in <Main> */
  fullMainWidth: '-mx-4 md:-mx-8 px-4 md:px-8',
  /** Spacing for sections */
  sectionSpacing: 'space-y-12 sm:space-y-16 lg:space-y-28',
  /** Centered container */
  containerClassName: 'container mx-auto',
  /** Heading styles for sections */
  sectionHeadingClassName: 'text-foreground font-semibold mt-4 tracking-wide',
} as const

/**
 * Advanced image options for Next.js Image component.
 */
export const IMAGE_SIZES = {
  /** Full viewport width - image takes up the entire screen width */
  full: '100vw',

  /** Mobile full width, desktop half width */
  mobileFullDesktopHalf: '(max-width: 768px) 100vw, 50vw',

  /** Mobile full width, tablet half width, desktop third width */
  mobileFullTabletHalfDesktopThird: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',

  /** Mobile full width, tablet half width */
  mobileFullTabletHalf: '(max-width: 768px) 100vw, 50vw',

  /** Mobile full width, desktop third width */
  mobileFullDesktopThird: '(max-width: 768px) 100vw, 33vw',

  /** Mobile full width, tablet third, desktop quarter width */
  mobileFullTabletThirdDesktopQuarter: '(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw',
} as const

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@acme.com'
