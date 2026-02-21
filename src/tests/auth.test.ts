/**
 * Auth helper test: asUser creates a user via Better Auth signUpEmail (user + account),
 * signs in, and the returned headers are accepted by payload.auth({ headers }).
 */
import { getPayload } from "@/lib/payload/get-payload";
import { clearTestDb } from "./helper/clear-test-db";
import { asUser } from "./helper/auth-helper";
import { afterEach, beforeAll, expect, test } from "bun:test";

let payload: Awaited<ReturnType<typeof getPayload>>;

beforeAll(async () => {
  payload = await getPayload();
});

afterEach(async () => {
  await clearTestDb(payload);
});

test("asUser returns user and headers; payload.auth({ headers }) recognises session", async () => {
  const { user, headers } = await asUser(payload, "admin");
  expect(user.id).toBeTruthy();
  expect(user.email).toBeTruthy();
  expect(headers.get("cookie")).toBeTruthy(); // headers should contain session cookie

  const { user: authUser } = await payload.auth({ headers });
  expect(authUser).toBeTruthy(); // payload.auth({ headers }) should return the logged-in user

  expect(authUser?.id).toBe(user.id);
  expect(authUser?.email).toBe(user.email);
});
