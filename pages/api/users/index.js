import nc from "next-connect";
import middleware from "@/middleware/index";

import { tryCatch } from "@/helpers";

const handler = nc()
  .use(middleware)
  .get(async (req, res) => {

    const users = await tryCatch(req.prisma.user.findMany({}));

    if (!users.length) {
      return res.status(404).json({ error: "cannot find any users" });
    }

    return res.json({ users });
  })
  .post(async (req, res) => {

    const user = await tryCatch(
      req.prisma.user.create({
        data: req.body,
      })
    );

    if (!user) return res.status(404).json({ error: "cannot create user" });

    return res.json({ user });
  })
  .delete(async (req, res) => {

    const response = tryCatch(req.prisma.user.deleteMany({}));

    if (!response) return res.status(404).json({ error: "cannot create user" });

    return res.json({ response });
  });

export default handler;
