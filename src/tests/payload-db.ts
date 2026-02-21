import { getPayload } from "@/lib/payload/get-payload";
import { clearTestDb } from "./helper/clear-test-db";
import assert from "node:assert/strict";
import { afterEach, before, test } from "node:test";

let payload: Awaited<ReturnType<typeof getPayload>>;

before(async () => {
  payload = await getPayload();
  await payload.create({
    collection: "blog",
    data: { title: "Test Blog Post" },
    draft: true,
  });
});

afterEach(async () => {
  await clearTestDb(payload);
});

test("Payload DB check", async () => {
  const result = await payload.find({ collection: "blog", limit: 1 });
  assert.ok(Array.isArray(result.docs));
});
