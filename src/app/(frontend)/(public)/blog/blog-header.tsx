import Link from "next/link";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { Container } from "@/components/layout/elements";
import Highlightborder from "@/components/ui/highlight-border";
import { H1 } from "@/components/ui/typography";

export const BlogHeader = ({
  title,
  goBack,
  children,
}: {
  title: string;
  goBack?:
    | false
    | {
        href: string;
        label: string;
      };
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "-mt-16 border-b pb-8 text-lg text-foreground sm:pb-12 sm:text-2xl md:text-3xl",
        "relative bg-background",
        {
          "pt-32": !goBack,
          "pt-[5.5rem]": !!goBack,
        }
      )}
    >
      {!!goBack && (
        <div className='container mx-auto'>
          <Button variant='link' size='sm' className='px-0' asChild>
            <Link href={goBack.href}>← {goBack.label}</Link>
          </Button>
        </div>
      )}
      <Container>
        <H1 className='mb-4'>{title}</H1>
        <div>{children}</div>
      </Container>
      <Highlightborder position='bottom' />
    </div>
  );
};
