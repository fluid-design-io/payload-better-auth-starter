import type { Block } from 'payload'

/**
 * A simple block that displays a legal disclaimer upto the current year.
 */
export const CopyRightInlineBlock: Block = {
  slug: 'copyRightInlineBlock',
  interfaceName: 'CopyRightInlineBlock',
  labels: {
    singular: 'Copyright',
    plural: 'Copyrights',
  },
  imageURL: '/images/blocks/copyright-inline-block.png',
  fields: [
    {
      name: 'fromYear',
      type: 'number',
      label: 'From Year',
      defaultValue: new Date().getFullYear() - 10,
      admin: {
        width: '50%',
        description: 'The year to start the copyright from. e.g. 2021',
      },
    },
    {
      name: 'toYearType',
      type: 'select',
      label: 'To Year',
      options: [
        {
          label: 'Current Year',
          value: 'current',
        },
        {
          label: 'Fixed',
          value: 'fixed',
        },
      ],
      defaultValue: 'current',
      admin: {
        description: 'Whether to use the current year or a fixed year',
      },
    },
    {
      name: 'toYearFixed',
      type: 'number',
      label: 'To Year Fixed',
      admin: {
        condition: (_, siblingData) => {
          return siblingData.toYearType === 'fixed'
        },
      },
    },
    {
      name: 'text',
      type: 'text',
      label: 'Text',
      defaultValue: 'Acme. All rights reserved.',
      admin: {
        description: "Text to display after the years. e.g. 'Acme. All rights reserved.'",
      },
    },
  ],
}
