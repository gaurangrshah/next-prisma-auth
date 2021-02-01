import { prisma } from "@/prisma";

export default async function handler(req, res) {
  const users = await prisma.user.findMany({})
  res.status(200).json({ name: users[0].name, users });
}
