import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  imageURL: '/images/blocks/media-block.png',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'payload-uploads',
      required: true,
    },
    {
      name: 'zoom',
      type: 'checkbox',
      label: 'Enable Zoom',
      defaultValue: false,
      admin: {
        description: 'When enabled, the image will be zoomed to full screen when clicked.',
      },
    },
  ],
}
