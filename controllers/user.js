import { prisma } from "@/prisma";
import { tryCatch } from "@/helpers";

export async function getUserById(id) {
  return await tryCatch(
    prisma.user.findUnique({
      where: { id },
    })
  );
}

export async function updateUser(id, updates) {
  return await tryCatch(
    prisma.user.update({
      where: { id },
      data: updates,
    })
  );
}

export async function deleteUser(id) {
  return await tryCatch(
    prisma.user.delete({
      where: { id: id },
    })
  );
}

export async function getUsers() {
  return await tryCatch(prisma.user.findMany({}));
}

export async function createUser(user) {
  return await tryCatch(
    prisma.user.create({
      data: user,
    })
  );
}

export async function deleletAllUsers() {
  return await tryCatch(prisma.user.deleteMany({}));
}
