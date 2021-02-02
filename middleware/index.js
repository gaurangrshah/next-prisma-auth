import nextConnect from "next-connect";
import morgan from "morgan";
import { prisma } from "./prisma";

const middleware = nextConnect();

middleware.use(morgan("tiny"));
middleware.use(prisma());
export default middleware;
