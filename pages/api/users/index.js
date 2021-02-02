import nc from "next-connect";
import { getUsers, createUser, deleletAllUsers } from "@/controllers/user";

const handler = nc()
  // .use(someMiddleware())
  .get(async (req, res) => {
    const users = await getUsers();

    if (!users.length) {
      return res.status(404).json({ error: "cannot find any users" });
    }

    return res.json({ users });
  })
  .post(async (req, res) => {
    const user = await createUser(req.body);

    if (!user) return res.status(404).json({ error: "cannot create user" });

    return res.json({ user });
  })
  .delete(async (req, res) => {
    const response = await deleletAllUsers();

    if (!response) return res.status(404).json({ error: "cannot create user" });

    return res.json({ response });
  });

export default handler;