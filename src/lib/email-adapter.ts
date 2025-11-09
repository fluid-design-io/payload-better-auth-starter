import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { resendAdapter } from '@payloadcms/email-resend'

export function getEmailAdapter() {
  const isLocal = process.env.NEXT_PUBLIC_SERVER_URL?.includes('localhost')

  if (isLocal) {
    return nodemailerAdapter({
      defaultFromAddress: 'contact@acme.com',
      defaultFromName: 'Acme',
      transportOptions: {
        host: 'localhost',
        port: 2500,
        secure: false, // Inbucket doesn't use SSL in local dev
        auth: {
          user: 'test', // Inbucket doesn't require real auth
          pass: 'test',
        },
        // Disable TLS for local development
        tls: {
          rejectUnauthorized: false,
        },
      },
    })
  }

  // Use Resend for production
  return resendAdapter({
    defaultFromAddress: 'contact@acme.com',
    defaultFromName: 'Acme',
    apiKey: process.env.RESEND_API_KEY,
  })
}
