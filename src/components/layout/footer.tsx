import Link from 'next/link'

import { AcmeLogoIcon } from '@/components/icons'
import { ThemeSelector } from '@/components/layout/theme-switch'
import { CMSLink } from '@/components/payload/cms-link'

import { CLASSNAMES } from '@/lib/constants'
import { getCachedGlobal } from '@/lib/payload/get-globals'

import type { GlobalFooter } from '@/payload-types'
import RichText from '../payload/rich-text'
import Highlightborder from '../ui/highlight-border'
import { P } from '../ui/typography'
import { Container } from './elements'

export default async function Footer() {
  const footerData = (await getCachedGlobal('global-footer', 1)()) as GlobalFooter

  const navItems = footerData?.navItems || []
  const footerText = footerData.footerText
  return (
    <footer className="bg-background relative border-t">
      <Highlightborder position="top" />
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className={CLASSNAMES.layoutPadding}>
        <Container className="py-16 sm:pt-24">
          <div className="flex items-center justify-between gap-8">
            <AcmeLogoIcon className="h-7 w-auto text-muted-foreground" />
            <ThemeSelector />
          </div>

          <div className="mt-6 md:grid md:grid-cols-3 md:gap-8">
            <div className="flex gap-4">
              {/* <Youtube className="size-4 text-foreground/80" /> */}
            </div>
            <ul className="mt-16 grid w-full max-w-2xl grid-cols-2 gap-6 place-self-end sm:grid-cols-3 md:col-span-2 md:mt-0 md:flex md:justify-between md:gap-8">
              {navItems.map((item) => (
                <li key={item.id}>
                  <CMSLink
                    {...item.link}
                    className="text-sm leading-6 text-muted-foreground hover:text-foreground"
                  />
                </li>
              ))}
            </ul>
          </div>
          {!footerText && (
            <P className="mt-6 text-center leading-5 text-xs text-muted-foreground/60 md:text-left [&_a]:underline">
              Please add the footer text in the{' '}
              <Link href="/admin/globals/global-footer">Admin Panel</Link>.
            </P>
          )}
          <RichText
            data={footerText}
            className="text-muted-foreground/60 mt-6 text-center text-xs leading-5 md:text-left [&_a]:underline"
            enableProse={false}
          />
        </Container>
      </div>
    </footer>
  )
}
