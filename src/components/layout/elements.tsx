import { ImageIcon } from 'lucide-react'
import Image, { type StaticImageData } from 'next/image'
import type { ReactNode } from 'react'

import { ImageZoom } from '@/components/core/image-zoom'
import { GlowEffect } from '@/components/motion-primitives/glow-effect'
import { InView } from '@/components/motion-primitives/in-view'
import { Badge } from '@/components/ui/badge'
import { H1, H2, H3, P } from '@/components/ui/typography'

import { inViewOptions } from '@/lib/animation'
import { CLASSNAMES, IMAGE_SIZES } from '@/lib/constants'
import { cn } from '@/lib/utils'

import { Slot as SlotPrimitive } from 'radix-ui'

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

type HeaderPrimitiveProps = {
  icon?: ReactNode
  badge?: string
  title: string
  description?: string | ReactNode
  align?: 'left' | 'center'
  variant?: 'layout' | 'section'
}

const HeaderPrimitive = ({
  icon,
  badge,
  title,
  description,
  align = 'left',
  variant = 'section',
}: HeaderPrimitiveProps) => {
  const slug = slugify(title)
  const Heading = variant === 'layout' ? H1 : H2
  return (
    <InView
      {...inViewOptions()}
      as="section"
      aria-labelledby={slug}
      className={cn(CLASSNAMES.containerClassName, align === 'center' && 'text-center')}
    >
      {badge && (
        <span className="text-primary" aria-hidden>
          {badge}
        </span>
      )}
      {icon && (
        <div className="mb-4" aria-hidden="true">
          {icon}
        </div>
      )}
      <Heading className={cn(!!badge && 'mt-4', !description && 'mb-6')} id={slug}>
        {title}
      </Heading>
      {description && typeof description === 'string' && (
        <P className={cn('mt-4 mb-6 max-w-2xl text-lg lg:mb-14', align === 'center' && 'mx-auto')}>
          {description}
        </P>
      )}
      {description && typeof description !== 'string' && description}
    </InView>
  )
}

type LayoutHeaderProps = Omit<HeaderPrimitiveProps, 'variant'>

/**
 * A layout header with a badge, h1 title, and description.
 */
const LayoutHeader = (props: LayoutHeaderProps) => {
  return <HeaderPrimitive {...props} variant="layout" />
}

type SectionHeaderProps = Omit<HeaderPrimitiveProps, 'variant'>

/**
 * A section header with a badge, h2 title, and description.
 */
const SectionHeader = (props: SectionHeaderProps) => {
  return <HeaderPrimitive {...props} variant="section" />
}

type SectionHorizontalProps = {
  badge?: string
  title: string
  description: string | ReactNode
  media: ReactNode
  /** Whether the media is on the left or right of the content */
  variant: 'left' | 'right'
  className?: string
  container?: boolean
}

/**
 * A row with content and media horizontally aligned.
 */
const SectionHorizontal = ({ container = true, ...props }: SectionHorizontalProps) => {
  const slug = slugify(
    `${props.title}-${props.description ? (typeof props.description === 'string' ? props.description.slice(0, 20) : '') : ''}`
  )
  if (props.variant === 'left') {
    return (
      <InView
        {...inViewOptions()}
        as="section"
        aria-labelledby={slug}
        className={cn(
          'grid items-start md:grid-cols-12',
          container && CLASSNAMES.containerClassName,
          props.className
        )}
      >
        <div className="py-6 md:col-span-6 md:pt-0 md:pl-6 lg:col-span-5 lg:pb-14 lg:pl-14">
          {props.badge && (
            <Badge variant="outline" className="-mt-px flex">
              {props.badge}
            </Badge>
          )}
          <H3 className={CLASSNAMES.sectionHeadingClassName} id={slug}>
            {props.title}
          </H3>
          {typeof props.description === 'string' ? (
            <P className="mt-4 max-w-md">{props.description}</P>
          ) : (
            props.description
          )}
        </div>
        <div className="order-first md:col-span-6 lg:col-span-7">{props.media}</div>
      </InView>
    )
  }
  return (
    <InView
      {...inViewOptions()}
      as="section"
      aria-labelledby={slug}
      className={cn(
        'grid items-start md:grid-cols-12',
        container && CLASSNAMES.containerClassName,
        props.className
      )}
    >
      <div className="py-6 md:col-span-6 md:pt-0 md:pr-6 lg:col-span-5 lg:pr-14 lg:pb-14">
        {props.badge && (
          <Badge variant="outline" className="-mt-px flex">
            {props.badge}
          </Badge>
        )}
        <H3 className={CLASSNAMES.sectionHeadingClassName} id={slug}>
          {props.title}
        </H3>
        {typeof props.description === 'string' ? (
          <P className="mt-4 max-w-md">{props.description}</P>
        ) : (
          props.description
        )}
      </div>
      <div className="row-start-1 flex items-center justify-center md:col-span-6 md:row-start-auto md:pt-0 lg:col-span-7">
        {props.media}
      </div>
    </InView>
  )
}

type SectionGridChildProps = {
  badge?: string
  title: string
  description: string | ReactNode
  media?: ReactNode
}

/**
 * A grid layout with multiple content items.
 *
 * @example
 * // You can override the default grid-cols-2 with a custom class
 * <SectionGrid className='lg:grid-cols-4'>
 *   <SectionGridItem
 *     title='Title 1'
 *     description='Description 1'
 *     media={<ImageMedia src={image} alt={title} />}
 *   />
 *   <SectionGridItem
 *     title='Title 2'
 *     description='Description 2'
 *     media={<ImageMedia src={image} alt={title} />}
 *   />
 * </SectionGrid>
 */
const SectionGrid = ({
  children,
  className,
  container = true,
}: {
  children: ReactNode
  className?: string
  container?: boolean
}) => {
  return (
    <InView {...inViewOptions()}>
      <div
        className={cn(
          'grid gap-12 md:grid-cols-2 lg:gap-16',
          container && CLASSNAMES.containerClassName,
          className
        )}
      >
        {children}
      </div>
    </InView>
  )
}

/**
 * Individual content item for vertical row layout.
 */
const SectionGridItem = ({ badge, title, description, media }: SectionGridChildProps) => {
  const slug = slugify(title)
  return (
    <section aria-labelledby={slug} className="grid grid-rows-[auto_1fr]">
      <div className="order-last">
        <H3 id={slug} className={cn(CLASSNAMES.sectionHeadingClassName, { 'mt-8': !badge })}>
          {title}
        </H3>
        {typeof description === 'string' ? <P>{description}</P> : description}
      </div>
      {media ? media : null}
      {badge && (
        <Badge variant="outline" className="-mt-px flex">
          {badge}
        </Badge>
      )}
    </section>
  )
}

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'muted'
  asChild?: boolean
  /** Only applied if variant is "muted" */
  rootClassName?: string
}

const Container = ({
  className,
  variant = 'default',
  asChild,
  rootClassName,
  ...props
}: ContainerProps) => {
  const Comp = asChild ? SlotPrimitive.Slot : 'div'

  if (variant === 'muted') {
    return (
      <div
        className={cn(
          CLASSNAMES.fullMainWidth,
          'bg-muted/50 py-12 sm:py-16 lg:py-28',
          rootClassName
        )}
      >
        <Comp className={cn(CLASSNAMES.containerClassName, className)} {...props} />
      </div>
    )
  }

  return <Comp className={cn(CLASSNAMES.containerClassName, className)} {...props} />
}

type SectionSpacingProps = {
  children: ReactNode
  className?: string
}

const SectionSpacing = ({ className, ...props }: SectionSpacingProps) => {
  return <div className={cn(CLASSNAMES.sectionSpacing, className)} {...props} />
}

type FullWidthImageProps = {
  image?: StaticImageData
  alt?: string
  glowEffectColors?: string[]
  /** Defaults to the alt text */
  caption?: false | string
  /**
   * Whether to show the caption as visible text below the image.
   * If false, the caption is only visible in Reader Mode.
   */
  showCaption?: boolean
  zoom?: boolean
}

/**
 * A large full-width image section with a glow effect.
 */
const FullWidthImage = ({
  image,
  glowEffectColors = ['#0894FF', '#C959DD', '#FF2E54', '#0894FF'],
  alt = '',
  caption = alt,
  showCaption = false,
  zoom = false,
}: FullWidthImageProps) => {
  const Comp = zoom ? ImageZoom : Image
  return (
    <Container variant="muted" className="px-0 md:px-8 lg:px-12">
      <InView {...inViewOptions('0px 0px -35% 0px')} className="max-w-[120rem] mx-auto">
        <div className="relative">
          <GlowEffect
            colors={glowEffectColors}
            mode="static"
            blur="stronger"
            className="opacity-30"
            aria-hidden="true"
          />
          <div className="bg-background dark:bg-muted relative rounded-4xl p-4 shadow-2xl">
            {image ? (
              <figure className="relative overflow-hidden">
                <Comp
                  src={image}
                  alt={alt ?? ''}
                  className="h-full w-full overflow-hidden rounded-2xl object-cover"
                />
                {caption && (
                  <figcaption
                    className={cn(
                      showCaption && 'mt-4 text-center text-sm text-muted-foreground',
                      !showCaption &&
                        'absolute -bottom-8 text-sm text-muted-foreground opacity-0 pointer-events-none'
                    )}
                  >
                    {caption}
                  </figcaption>
                )}
              </figure>
            ) : (
              <div
                className="bg-foreground/15 aspect-[4/2.5] w-full rounded-2xl"
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </InView>
    </Container>
  )
}

type VideoMediaProps = {
  src: string
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
  background?: boolean
  autopause?: boolean
  title?: string
}

/**
 * Vimeo video media element with configurable playback options.
 */
const VideoMedia = ({
  src,
  autoplay = true,
  loop = true,
  muted = true,
  controls = false,
  background = true,
  autopause = true,
  title = 'Video content',
}: VideoMediaProps) => {
  // Build query parameters based on props
  const queryParams = new URLSearchParams()
  if (autoplay) queryParams.append('autoplay', '1')
  if (loop) queryParams.append('loop', '1')
  if (muted) queryParams.append('muted', '1')
  if (!controls) queryParams.append('controls', '0')
  if (background) queryParams.append('background', '1')
  if (autopause) queryParams.append('autopause', '1')

  // throw if is not a valid url
  if (!src.startsWith('https://')) {
    throw new Error('Invalid video URL')
  }

  const videoUrl = `${src}?${queryParams.toString()}`

  return (
    <div
      className="bg-muted/50 relative aspect-video w-full overflow-hidden rounded-4xl"
      role="application"
      aria-label={title}
    >
      <div className="absolute inset-0 z-[1] flex items-center justify-center" aria-hidden="true">
        <ImageIcon className="text-muted h-10 w-10" />
      </div>
      <iframe
        src={videoUrl}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        title={title}
        className="absolute top-0 left-0 z-[2] h-full w-full"
        aria-label={title}
      ></iframe>
    </div>
  )
}

type ImageMediaProps = {
  src: StaticImageData
  alt: string
  className?: string
  imgClassName?: string
  sizes?: string
  aspectRatio?: `aspect-${string}`
  gradientColors?:
    | [`from-${string}`, `via-${string}`, `to-${string}`]
    | [`from-${string}`, `to-${string}`]
  children?: ReactNode
  /** Whether to show a zoomable image via `react-medium-image-zoom` */
  zoom?: boolean
}

/**
 * A reusable image media component with customizable gradients and styling.
 *
 * @example
 * <ImageMedia src={image} alt={title} zoom />
 */
const ImageMedia = ({
  src,
  alt,
  className,
  imgClassName,
  sizes = IMAGE_SIZES.mobileFullDesktopHalf,
  aspectRatio = 'aspect-video',
  gradientColors = ['from-muted-200/20', 'via-muted-300/20', 'to-muted-500/20'],
  children,
  zoom = false,
  ...imageProps
}: ImageMediaProps) => {
  const Comp = zoom ? ImageZoom : Image
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-4xl',
        'bg-gradient-to-br',
        // zoom && '[&>span]:h-full',
        aspectRatio,
        gradientColors,
        className
      )}
      role="img"
      aria-label={alt}
    >
      <Comp
        src={src}
        alt={alt}
        className={cn('size-full object-cover', imgClassName)}
        sizes={sizes}
        {...imageProps}
      />
      {children}
    </div>
  )
}

export {
  LayoutHeader,
  Container,
  FullWidthImage,
  ImageMedia,
  SectionGrid,
  SectionGridItem,
  SectionHeader,
  SectionHorizontal,
  SectionSpacing,
  VideoMedia,
}
