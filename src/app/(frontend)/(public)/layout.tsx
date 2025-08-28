import '../globals.css'

import type { Metadata } from 'next'

import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'

import { getServerSideURL } from '@/lib/payload'
import { mergeOpenGraph } from '@/lib/payload/merge-open-graph'

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  title: {
    template: '%s | Acme',
    default: 'Acme',
  },
  description: 'Acme',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  )
}
