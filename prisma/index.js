import { PrismaClient } from "@prisma/client";

export let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    log: ["query", "info", "warn"],
  });
} else {
  if (!global.prisma) {
    console.log('generating new prisma client')
    global.prisma = new PrismaClient({
      log: ["query", "info", "warn"],
    });
  }
  prisma = global.prisma;
}
