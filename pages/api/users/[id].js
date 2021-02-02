import nc from "next-connect";
import { prisma } from "@/prisma";
import { getUserById, updateUser, deleteUser } from "@/controllers/user";
const handler = nc()
  // .use(someMiddleware())
  .get(async (req, res) => {
    const user = await getUserById(Number(req.query.id));

    if (!user) return res.status(400).json({ error: "cannot find user" });

    return res.status(200).json({ user });
  })
  .put(async (req, res) => {
    const user = await updateUser(Number(req.query.id), req.body);

    if (!user) return res.status(400).json({ error: "cannot update user" });
    return res.status(200).json({ user });
  })
  .delete(async (req, res) => {

    const user = await deleteUser(Number(req.query.id))

    if (!user) return res.status(400).json({ error: "cannot delete user" });
    return res.status(200).json({ message: 'success' });
  });

export default handler;
