import { PrismaClient } from "@prisma/client";

export let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    console.log('generating new prisma client')
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}
