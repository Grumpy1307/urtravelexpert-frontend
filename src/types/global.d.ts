import { PrismaClient } from '@prisma/client';

declare global {
  // allow global `var prisma` in dev
  // (undefined in first run; assigned once)
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export {};