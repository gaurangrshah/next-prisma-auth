import nc from "next-connect";
import middleware from "@/middleware/index";
// ❌ import { getUserById, updateUser, deleteUser } from "@/controllers/user";
import { tryCatch } from "@/helpers";

const handler = nc()
  .use(middleware)
  .get(async (req, res) => {
    // ❌ const user = await getUserById(Number(req.query.id));
    const user = await tryCatch(
      req.prisma.user.findUnique({
        where: { id: Number(req.query.id) },
      })
    );

    if (!user) return res.status(400).json({ error: "cannot find user" });

    return res.status(200).json({ user });
  })
  .put(async (req, res) => {
    // ❌ const user = await updateUser(Number(req.query.id), req.body);
    const user = await tryCatch(
      req.prisma.user.update({
        where: { id: Number(req.query.id) },
        data: req.body,
      })
    );

    if (!user) return res.status(400).json({ error: "cannot update user" });
    return res.status(200).json({ user });
  })
  .delete(async (req, res) => {
    // ❌ const user = await deleteUser(Number(req.query.id));
    const user = await tryCatch(
      prisma.user.delete({
        where: { id: Number(req.query.id) },
      })
    );

    if (!user) return res.status(400).json({ error: "cannot delete user" });
    return res.status(200).json({ message: "success" });
  });

export default handler;
