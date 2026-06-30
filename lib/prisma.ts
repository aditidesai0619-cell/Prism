import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// Cache in all environments — prevents new connections on every hot-reload (dev)
// and reuses the connection across requests on the same server instance (production)
globalForPrisma.prisma = prisma;
