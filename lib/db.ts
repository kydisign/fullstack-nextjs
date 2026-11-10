// import prisma adapter mariadb
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// import prisma client
import { PrismaClient } from "./generated/prisma/client";

// ensure only a single instance of prisma client is created
const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

// initialize prisma adapter
const adapter = new PrismaMariaDb(process.env.DATABASE_URL as string);

// initialize prisma client
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

export { prisma };
