'use client'
import { AppWindowMac, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

import { cn } from '@/lib/utils'

import { useMediaQuery } from '@/hooks/use-media-query'
import { SignedIn, SignedOut, UserButton } from '@daveyplate/better-auth-ui'
import { AnimatePresence, motion } from 'motion/react'
import { AcmeLogoIcon } from '../icons'
import { Button } from '../ui/button'
import { Container } from './elements'

const navigationLinks = [
  { href: '/', label: 'Home', active: true },
  { href: '/features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#about', label: 'About' },
  { href: '/blog', label: 'Blog' },
]

export default function Header() {
  const isLarge = useMediaQuery('(min-width: 64rem)')
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 75)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      data-theme="dark"
      {...(isScrolled && { 'data-scrolled': true })}
      data-state={isMobileMenuOpen ? 'active' : 'inactive'}
      className={cn(
        'bg-background [--color-popover:color-mix(in_oklch,var(--color-muted)_25%,var(--color-background))] px-4 md:px-8',
        !isLarge && 'sticky top-0 h-16 z-50'
      )}
    >
      <div
        className={cn(
          'relative',
          'not-in-data-scrolled:has-data-[state=open]:[--viewport-translate:-4rem]',
          !isLarge &&
            'in-data-scrolled:border-b in-data-scrolled:border-foreground/5 in-data-scrolled:backdrop-blur in-data-scrolled:bg-card/50 absolute inset-x-0 px-4 md:px-8 top-0 z-50 h-16 overflow-hidden',
          'max-lg:in-data-[state=active]:bg-card/50 max-lg:in-data-[state=active]:h-screen max-lg:in-data-[state=active]:backdrop-blur'
        )}
      >
        <Container>
          <div className="max-lg:not-in-data-[state=active]:h-16 relative flex flex-wrap items-center justify-between py-1.5 lg:py-5">
            <div className="max-lg:in-data-[state=active]:border-foreground/5 max-lg:in-data-[state=active]:border-b flex items-center justify-between gap-8 max-lg:h-14 max-lg:w-full">
              <Link href="/" aria-label="home">
                <AcmeLogoIcon className="h-5" />
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen === true ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-3 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-5 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-5 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            {isLarge && (
              <motion.div
                animate={{ width: 'fit-content', gap: 8 }}
                className="bg-popover/50 ring-background/75 inset-shadow-sm inset-shadow-white/[0.02] border-foreground/5 fixed inset-x-0 z-50 mx-auto size-fit max-w-xl rounded-xl border p-1.5 shadow-xl shadow-black/25 ring-1 backdrop-blur-xl"
              >
                <div className="flex items-center">
                  <AnimatePresence>
                    {isScrolled && (
                      <motion.div
                        key="logo"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: '3rem' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="before:bg-foreground/10 before:border-background/75 relative before:absolute before:inset-y-1 before:right-2 before:w-0.5 before:rounded before:border-r"
                      >
                        <Link
                          href="/"
                          aria-label="home"
                          className="hover:bg-foreground/5 flex size-7 rounded-md"
                        >
                          <AcmeLogoIcon className="m-auto size-4" />
                        </Link>
                      </motion.div>
                    )}
                    <NavMenu key="nav-menu" />
                    {isScrolled && (
                      <motion.div
                        key="sign-in-button"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="overflow-hidden h-7"
                      >
                        <SignedIn>
                          <UserButton
                            size="icon"
                            variant="ghost"
                            classNames={{
                              trigger: {
                                base: 'ml-4',
                                avatar: {
                                  base: 'border-foreground/10 border size-7 ring-0',
                                },
                              },
                            }}
                            additionalLinks={[
                              {
                                signedIn: true,
                                icon: <AppWindowMac />,
                                label: 'Dashboard',
                                href: '/dashboard',
                              },
                            ]}
                          />
                        </SignedIn>
                        <SignedOut>
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="border-foreground/10 ml-2 h-7 ring-0"
                          >
                            <Link href={`/sign-in?redirectTo=${pathname}`}>
                              <span>Sign In</span>
                            </Link>
                          </Button>
                        </SignedOut>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
            {!isLarge && isMobileMenuOpen && (
              <MobileMenu closeMenu={() => setIsMobileMenuOpen(false)} />
            )}

            <div className="max-lg:in-data-[state=active]:mt-6 in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <SignedOut>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/sign-in?redirectTo=${pathname}`}>
                      <span>Sign In</span>
                    </Link>
                  </Button>
                </SignedOut>
                <SignedIn>
                  <UserButton
                    size={isLarge ? 'icon' : 'default'}
                    variant="ghost"
                    additionalLinks={[
                      {
                        signedIn: true,
                        icon: <AppWindowMac />,
                        label: 'Dashboard',
                        href: '/dashboard',
                      },
                    ]}
                  />
                </SignedIn>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  )
}

const MobileMenu = ({ closeMenu }: { closeMenu: () => void }) => {
  return (
    <nav className="w-full [--color-border:--alpha(var(--color-foreground)/5%)] [--color-muted:--alpha(var(--color-foreground)/5%)]">
      {navigationLinks.map((link, index) => {
        return (
          <Link
            key={index}
            href={link.href}
            onClick={closeMenu}
            className="group relative block border-0 border-b py-4 text-lg"
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}

const NavMenu = () => {
  return (
    <NavigationMenu className="**:data-[slot=navigation-menu-viewport]:translate-x-(--viewport-translate) **:data-[slot=navigation-menu-viewport]:transition-all **:data-[slot=navigation-menu-viewport]:min-w-lg **:data-[slot=navigation-menu-viewport]:max-w-2xl **:data-[slot=navigation-menu-viewport]:bg-[color-mix(in_oklch,var(--color-muted)_25%,var(--color-background))] max-lg:hidden">
      <NavigationMenuList className="**:data-[slot=navigation-menu-trigger]:h-7 **:data-[slot=navigation-menu-trigger]:text-foreground/75 **:data-[slot=navigation-menu-trigger]:px-3 **:data-[slot=navigation-menu-trigger]:text-sm gap-1">
        {navigationLinks.map((link, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle({
                className: 'text-foreground/75 h-7 px-3 text-sm',
              })}
            >
              <Link href={link.href}>{link.label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
