"use client";

import type { StaticImageData } from "next/image";

import RichText from "@/components/payload/rich-text";
import { cn } from "@/lib/utils";

import type { GalleryBlock as GalleryBlockProps } from "@/payload-types";

import { Media } from "@/components/payload/media";
import { useMediaQuery } from "@/hooks/use-media-query";

type GridCols =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12";

type Props = Omit<
  GalleryBlockProps,
  "perRowMobile" | "perRowTablet" | "perRowDesktop"
> & {
  breakout?: boolean;
  captionClassName?: string;
  className?: string;
  enableGutter?: boolean;
  imgClassName?: string;
  staticImage?: StaticImageData;
  disableInnerContainer?: boolean;
  perRowMobile: GridCols;
  perRowTablet: GridCols;
  perRowDesktop: GridCols;
};

export const GalleryBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    images,
    staticImage,
    disableInnerContainer,
    perRowMobile,
    perRowTablet,
    perRowDesktop,
  } = props;

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1440px)");

  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8",
    9: "grid-cols-9",
    10: "grid-cols-10",
    11: "grid-cols-11",
    12: "grid-cols-12",
  };

  const columsClassName = {
    mobile: gridCols[perRowMobile],
    tablet: gridCols[perRowTablet],
    desktop: gridCols[perRowDesktop],
  };
  if (!images) return null;

  return (
    <div
      className={cn(
        "grid gap-4",
        columsClassName[isMobile ? "mobile" : isTablet ? "tablet" : "desktop"],
        {
          container: enableGutter,
        },
        className
      )}
    >
      {images.map((image) => {
        let caption;
        if (image && typeof image === "object") caption = image.caption;
        if (typeof image === "number") return null;
        return (
          <div key={`image-${typeof image === "object" ? image.id : image}`}>
            <Media
              imgClassName={cn(
                "border border-border rounded-[0.8rem] aspect-square object-cover",
                imgClassName
              )}
              resource={image}
              src={staticImage}
              alt={typeof image === "object" ? image.alt || "" : ""}
              size={isMobile ? "100vw" : isTablet ? "50vw" : "33vw"}
              zoom={true}
            />
            {caption && (
              <div
                className={cn(
                  "mt-4 mb-4",
                  {
                    container: !disableInnerContainer,
                  },
                  captionClassName
                )}
              >
                <RichText
                  data={caption}
                  className='text-sm text-muted-foreground'
                  enableGutter={false}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
