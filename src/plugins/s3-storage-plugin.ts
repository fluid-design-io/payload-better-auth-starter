import { s3Storage } from '@payloadcms/storage-s3'
import type { Plugin } from 'payload'

export const s3StoragePluginPublic: Plugin = s3Storage({
  collections: {
    'payload-uploads': {
      prefix: 'payload-uploads',
    },
  },
  bucket: process.env.S3_BUCKET || '',
  config: {
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
    region: process.env.S3_REGION || '',
    endpoint: process.env.S3_ENDPOINT || '',
  },
})

export const s3StoragePluginPrivate: Plugin = s3Storage({
  collections: {
    'private-uploads': {
      prefix: 'private-uploads',
    },
  },
  bucket: process.env.S3_PRIVATE_BUCKET || '',
  config: {
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
    region: process.env.S3_REGION || '',
    endpoint: process.env.S3_ENDPOINT || '',
  },
})
