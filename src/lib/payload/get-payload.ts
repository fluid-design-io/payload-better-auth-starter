import configPromise from '@payload-config'
import { type BetterAuthPluginOptions, getPayloadAuth } from 'payload-auth/better-auth'

export const getPayload = async () => getPayloadAuth<BetterAuthPluginOptions>(configPromise)
