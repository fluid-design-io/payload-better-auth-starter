import type { CollectionConfig } from 'payload'
import { defaultLexical } from '@/fields/default-lexical'
import { generateBlurDataURL } from './hooks/generate-blur-data-url'

/** All media uploaded from Payload Admin*/
export const PayloadUploads: CollectionConfig = {
  slug: 'payload-uploads',
  folders: true,
  labels: {
    singular: 'Payload Media',
    plural: 'Payload Media',
  },
  access: {
    read: () => true,
  },
  admin: {
    group: 'Acme',
    description: 'All media uploaded from Payload Admin',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: defaultLexical,
    },
    {
      name: 'blurDataURL',
      type: 'text',
      admin: {
        hidden: true,
        description: 'Blur data URL for the image',
      },
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
  hooks: {
    beforeChange: [generateBlurDataURL],
  },
}
