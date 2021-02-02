import { prisma as adapter } from "@/prisma";

export function prisma() {
  return async (req, res, next) => {
    req.prisma = adapter;
    next();
  };
}
