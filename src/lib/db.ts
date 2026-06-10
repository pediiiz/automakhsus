import { Pool } from "pg";

declare global {
  var automakhsusPool: Pool | undefined;
}

export function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }

  if (!globalThis.automakhsusPool) {
    globalThis.automakhsusPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 4,
    });
  }

  return globalThis.automakhsusPool;
}
