import { getPayload } from '@/lib/payload/get-payload'
import { clearTestDb } from './helper/clear-test-db'
import { afterEach, beforeAll, expect, test } from 'bun:test'

let payload: Awaited<ReturnType<typeof getPayload>>

beforeAll(async () => {
  payload = await getPayload()
  await payload.create({
    collection: 'blog',
    data: { title: 'Test Blog Post' },
    draft: true,
  })
})

afterEach(async () => {
  await clearTestDb(payload)
})

test('Payload DB check', async () => {
  const result = await payload.find({ collection: 'blog', limit: 1 })
  expect(result.docs).toBeInstanceOf(Array)
})
