import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { Blog } from './collections/blog'
import { GlobalFooter, GlobalPrivacy, GlobalTerms } from './collections/global'
import { PayloadUploads } from './collections/uploads/payload-uploads'
import { PrivateUploads } from './collections/uploads/private-uploads'
import { Users } from './collections/users'
import { defaultLexical } from './fields/default-lexical'
import { getEmailAdapter } from './lib/email-adapter'
import { getServerSideURL } from './lib/payload'
import { plugins } from './plugins'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
    components: {
      graphics: {
        Icon: {
          path: '@/components/payload/admin-icon.tsx',
        },
        Logo: {
          path: '@/components/payload/admin-logo.tsx',
        },
      },
    },
  },
  email: getEmailAdapter(),
  collections: [Users, Blog, PayloadUploads, PrivateUploads],
  editor: defaultLexical,
  secret: process.env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  cors: [getServerSideURL()].filter(Boolean),
  sharp,
  plugins,
  globals: [GlobalFooter, GlobalTerms, GlobalPrivacy],
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
})
