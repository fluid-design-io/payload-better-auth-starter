export function getTestDatabaseUri(): string {
  const env = process.env;
  if (env.TEST_DATABASE_URI) {
    return env.TEST_DATABASE_URI;
  }
  if (env.DATABASE_URI) {
    const match = env.DATABASE_URI.match(/^(.*\/)([^/]+)(\?.*)?$/);
    if (match) {
      const [, base, dbName, query] = match;
      const testName = dbName.replace(/_test$/, "") + "_test";
      return `${base}${testName}${query ?? ""}`;
    }
  }
  throw new Error(
    "DATABASE_URI or TEST_DATABASE_URI must be set to derive the test database URI",
  );
}
