import { PrismaClient } from "@prisma/client";
import logging from "./middleware/logging";

export let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({});
  prisma.$use(logging);
} else {
  if (!global.prisma) {
    console.log("generating new prisma client");
    global.prisma = new PrismaClient({
      // log: ["query", "info", "warn"],
    });
    global.prisma.$use(logging);
  }
  prisma = global.prisma;
  prisma.$use(logging);
}
