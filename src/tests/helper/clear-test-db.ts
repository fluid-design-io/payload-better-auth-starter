/**
 * Shared helper: clear the whole test DB (TRUNCATE all tables) or fall back to migrateFresh.
 * Import and call after your test logic (e.g. in afterEach/after) so it runs whether tests pass or fail.
 * Uses payload.db.pool when available for fast TRUNCATE ... CASCADE; falls back to migrateFresh otherwise.
 */
type PoolLike = {
  query: (text: string, values?: unknown[]) => Promise<{ rows: unknown[] }>;
};

type PayloadLike = {
  db: {
    migrateFresh: (args: { forceAcceptWarning?: boolean }) => Promise<void>;
    pool?: PoolLike;
  };
};

export async function clearTestDb(payload: PayloadLike): Promise<void> {
  if (process.env.NODE_ENV !== "test") {
    throw new Error("clearTestDb can only be used in test environment");
  }

  const dbUri = process.env.DATABASE_URI;
  if (!dbUri || !/_test\b/.test(dbUri)) {
    throw new Error(
      "clearTestDb can only be used with a _test database (check DATABASE_URI)",
    );
  }
  const pool = payload.db.pool;
  if (!pool?.query) {
    await payload.db.migrateFresh({ forceAcceptWarning: true });
    return;
  }

  const result = await pool.query(
    `SELECT tablename FROM pg_tables WHERE schemaname = $1`,
    ["public"],
  );
  const tables = (result.rows ?? [])
    .map((r) => (r as { tablename?: string }).tablename)
    .filter(Boolean) as string[];
  if (tables.length === 0) {
    return;
  }

  const quoted = tables.map((t) => `"${t.replace(/"/g, '""')}"`).join(", ");
  await pool.query(`TRUNCATE ${quoted} RESTART IDENTITY CASCADE`, []);
}
