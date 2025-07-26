import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import type * as React from "react";

import { cn } from "../../../lib/utils";
import { LOGO_URL } from "../constants";

export interface LayoutClassNames {
  body?: string;
  button?: string;
  container?: string;
  image?: string;
  content?: string;
  footer?: string;
  heading?: string;
  hr?: string;
  link?: string;
}

interface LayoutProps {
  children: React.ReactNode;
  heading: string;
  subTitle?: string;
  preview?: string;
  classNames?: LayoutClassNames;
  action?: string;
  url?: string;
  baseUrl?: string;
}

function Layout({
  children,
  heading,
  subTitle,
  preview = heading,
  classNames,
  action,
  url,
  baseUrl = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL,
}: LayoutProps) {
  return (
    <Html>
      <Head>
        <meta name='x-apple-disable-message-reformatting' />
        <meta content='light dark' name='color-scheme' />
        <meta content='light dark' name='supported-color-schemes' />

        <style type='text/css'>
          {`
            :root {
              color-scheme: light dark;
              supported-color-schemes: light dark;
            }
          `}
        </style>

        <style type='text/css'>
          {`      
            html, body {
              background-color: #ffffff;
              color: #000000;
            }

            a {
              color: #000000;
            }

            .border-color {
              border-color: #eaeaea;
            }

            .action-button {
              background-color: #000000 !important;
              color: #ffffff !important;
            }

            @media (prefers-color-scheme: dark) {
              html, body {
                background-color: #000000 !important;
                color: #ffffff !important;
              }

              a {
                color: #ffffff;
              }

              .border-color {
                border-color: #333333 !important;
              }

              .action-button {
                background-color: rgb(38, 38, 38) !important;
                color: #ffffff !important;
              }
            }
          `}
        </style>
      </Head>

      <Preview>{preview}</Preview>

      <Tailwind>
        <Body
          className={cn("mx-auto my-auto px-2 font-sans", classNames?.body)}
        >
          <Container className='mx-auto my-[40px] max-w-[465px] rounded border border-color border-solid p-[20px]'>
            <Section className='mt-[32px]'>
              <Img
                src={LOGO_URL}
                width={140}
                height={36}
                alt='Acme'
                className={cn("mx-auto my-0", classNames?.image)}
              />
            </Section>

            {subTitle && (
              <Text
                className={cn(
                  "text-[#0a85ea] text-[11px] font-semibold mt-[48px] mb-0",
                  classNames?.content
                )}
              >
                {subTitle}
              </Text>
            )}

            <Heading
              className={cn(
                "mx-0 my-[30px] p-0 text-center font-bold text-[24px]",
                classNames?.heading
              )}
            >
              {heading}
            </Heading>

            <Section
              className={cn(
                "mt-[24px] mb-[24px] p-[16px] rounded-[8px] border border-color border-solid",
                classNames?.content
              )}
            >
              {children}
            </Section>

            {action && url && (
              <Section className='mt-[32px] mb-[32px] text-center'>
                <Button
                  className={cn(
                    "action-button rounded px-5 py-3 text-center font-semibold text-[12px] no-underline",
                    classNames?.button
                  )}
                  href={url}
                >
                  {action}
                </Button>
              </Section>
            )}

            <Hr
              className={cn(
                "mx-0 my-[26px] w-full border border-color border-solid",
                classNames?.hr
              )}
            />

            <Text
              className={cn(
                "text-[#666666] text-[12px] leading-[24px]",
                classNames?.footer
              )}
            >
              Acme, Inc.
              <br />
              100 Main St, Anytown, USA
              {baseUrl && (
                <>
                  <br />
                  <Link
                    className={cn("no-underline", classNames?.link)}
                    href={baseUrl}
                  >
                    {baseUrl?.replace("https://", "").replace("http://", "")}
                  </Link>
                </>
              )}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default Layout;
