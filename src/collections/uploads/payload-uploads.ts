import type { CollectionConfig } from 'payload'
import { defaultLexical } from '@/fields/default-lexical'

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
        name: 'square',
        width: 500,
        height: 500,
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
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
