import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    read: () => true,
    create: () => process.env.NODE_ENV === 'development',
    delete: () => process.env.NODE_ENV === 'development',
    update: () => process.env.NODE_ENV === 'development',
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
