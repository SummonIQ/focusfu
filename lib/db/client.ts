import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var cachedDb: PrismaClient | undefined;
}

function createPrismaClient() {
  let connectionString = process.env.DATABASE_URL;
  const usesSsl = connectionString?.includes('sslmode=');
  if (connectionString && usesSsl) {
    connectionString = connectionString.replace(
      /sslmode=(prefer|require|verify-ca)/,
      'sslmode=verify-full',
    );
  }
  const adapter = new PrismaPg({
    connectionString,
    ...(usesSsl && { ssl: { rejectUnauthorized: true } }),
  });
  return new PrismaClient({ adapter });
}

let db: PrismaClient;
if (process.env.NODE_ENV === 'production') {
  db = createPrismaClient();
} else {
  if (!globalThis.cachedDb) globalThis.cachedDb = createPrismaClient();
  db = globalThis.cachedDb;
}

export { db };
