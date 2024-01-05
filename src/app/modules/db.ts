import { PrismaClient } from "@prisma/client";

// Caching prisma instances globally.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") {
  // If the is not in production, cache the prisma as an instance.
  globalForPrisma.prisma = prisma;
  // Otherwise, it will return the prisma client.
}
