import Link from "next/link";
import { Container } from "@/components/layout/elements";
import { InView } from "@/components/motion-primitives/in-view";
import { H2, Muted } from "@/components/ui/typography";
import { inViewOptions } from "@/lib/animation";

const colors = [
  "foreground",
  "background",
  "card",
  "popover",
  "primary",
  "secondary",
  "muted",
  "accent",
  "destructive",
  "card-foreground",
  "popover-foreground",
  "primary-foreground",
  "secondary-foreground",
  "muted-foreground",
  "accent-foreground",
  "destructive-foreground",
  "border",
  "input",
  "ring",
];

export const ThemeColors = () => {
  return (
    <Container asChild>
      <InView {...inViewOptions()} as='section'>
        <H2>Theme Colors</H2>
        <Muted className='mt-4 mb-8'>
          Visit{" "}
          <Link
            href='https://tweakcn.com/editor/theme'
            className='underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            TweakCN
          </Link>{" "}
          to edit the theme colors.
        </Muted>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
          {colors.map((color) => (
            <ColorPalette key={color} color={color} />
          ))}
        </div>
      </InView>
    </Container>
  );
};

const ColorPalette = ({ color }: { color: string }) => {
  return (
    <div className='flex flex-col gap-2'>
      <div
        className='size-16 border rounded-md'
        style={{
          backgroundColor: `var(--${color})`,
        }}
      />
      <Muted className='text-xs font-mono uppercase'>
        {color.replace("-", " ")}
      </Muted>
    </div>
  );
};
