import z from 'zod'

export const envSchema = z.object({
  DATABASE_URI: z.string(),
  PAYLOAD_SECRET: z.string(),
  NEXT_PUBLIC_SERVER_URL: z.string(),
  CRON_SECRET: z.string(),
  PREVIEW_SECRET: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  NEXT_PUBLIC_BETTER_AUTH_URL: z.string(),
  S3_BUCKET: z.string(),
  S3_ACCESS_KEY_ID: z.string(),
  S3_SECRET_ACCESS_KEY: z.string(),
  S3_REGION: z.string(),
  S3_ENDPOINT: z.string(),
  RESEND_API_KEY: z.string(),
  NEXT_PUBLIC_HCAPTCHA_SITE_KEY: z.string(),
})

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
