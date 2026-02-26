import { getPayload } from '@/lib/payload/get-payload'

import { FormBlock } from '@/blocks/form/component'

export default async function ContactForm() {
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

  return <FormBlock form={form} rootClassName="p-0" className="border-none p-0 lg:p-0" />
}
