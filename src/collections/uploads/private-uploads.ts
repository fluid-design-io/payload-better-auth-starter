import type { CollectionConfig } from 'payload'

/** All media uploaded from Payload Admin */
export const PrivateUploads: CollectionConfig = {
  slug: 'private-uploads',
  folders: true,
  labels: {
    singular: 'Private Uploads',
    plural: 'Private Uploads',
  },
  admin: {
    group: 'Acme',
    description: 'Private uploads that require authentication to access',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      required: false,
      admin: {
        position: 'sidebar',
        description:
          'Specific users who have access to this upload. If not assigned, it will respect the access level of the upload.',
        condition: (_, siblingData) => {
          return siblingData.fileAccessType === 'byAssignedUsers'
        },
      },
    },
  ],
}
