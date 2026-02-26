import type { Metadata } from 'next'

import { LayoutHeader } from '@/components/layout/elements'
import { Main } from '@/components/layout/main'
import { InView } from '@/components/motion-primitives/in-view'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { inViewOptions } from '@/lib/animation'
import { getPayload } from '@/lib/payload/get-payload'

import { FormBlock } from '@/blocks/form/component'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact us for any questions or inquiries',
}

export default async function ContactPage() {
  const payload = await getPayload()

  const { docs } = await payload.find({
    collection: 'forms',
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: 'example-form',
      },
    },
  })

  const form = docs?.[0]
  if (!form) return <div>notFound</div>

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
            <FormBlock form={form} rootClassName="p-0" className="border-none p-0 lg:p-0" />
          </CardContent>
        </Card>
      </InView>
    </Main>
  )
}
