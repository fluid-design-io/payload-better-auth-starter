import type { Metadata } from 'next'
import { Suspense } from 'react'

import { LayoutHeader } from '@/components/layout/elements'
import { Main } from '@/components/layout/main'
import { InView } from '@/components/motion-primitives/in-view'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { inViewOptions } from '@/lib/animation'

import ContactForm from './contact-form'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact us for any questions or inquiries',
}

export default async function ContactPage() {
  return (
    <Main>
      <LayoutHeader
        title="Contact Us"
        description="Find answers to your questions and get support for our services."
        align="center"
      />

      <InView {...inViewOptions()} as="section" className="mb-16">
        <Card className="p-6 lg:p-12 mx-auto w-full max-w-[44rem]">
          <CardHeader className="px-0">
            <CardTitle>Talk to our team</CardTitle>
            <CardDescription>
              Fill out the form and we'll be in touch within 24 hours.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <Suspense fallback={<Skeleton className="w-full h-[400px]" />}>
              <ContactForm />
            </Suspense>
          </CardContent>
        </Card>
      </InView>
    </Main>
  )
}
