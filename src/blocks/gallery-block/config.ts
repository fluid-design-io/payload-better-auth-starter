import type { Block } from 'payload'

export const GalleryBlock: Block = {
  slug: 'galleryBlock',
  interfaceName: 'GalleryBlock',
  imageURL: '/images/blocks/gallery-block.png',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'perRowMobile',
          type: 'number',
          label: 'Columns on mobile (375px)',
          defaultValue: 1,
          min: 1,
          max: 12,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'perRowTablet',
          type: 'number',
          label: 'Columns on tablet (768px)',
          defaultValue: 2,
          min: 1,
          max: 12,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'perRowDesktop',
          type: 'number',
          label: 'Columns on desktop (1440px)',
          defaultValue: 3,
          min: 1,
          max: 12,
          admin: {
            width: '33%',
          },
        },
      ],
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'payload-uploads',
      required: true,
      hasMany: true,
    },
  ],
}
