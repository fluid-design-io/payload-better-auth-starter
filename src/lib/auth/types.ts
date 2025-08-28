import type { getPayload } from '@/lib/payload/get-payload'

import type { betterAuthPlugins } from './options'

type PayloadWithBetterAuth = Awaited<ReturnType<typeof getPayload>>

export type Session = PayloadWithBetterAuth['betterAuth']['$Infer']['Session']
export type Account = Awaited<
  ReturnType<PayloadWithBetterAuth['betterAuth']['api']['listUserAccounts']>
>[number]
export type DeviceSession = Awaited<
  ReturnType<PayloadWithBetterAuth['betterAuth']['api']['listSessions']>
>[number]
export type BetterAuthPlugins = typeof betterAuthPlugins
