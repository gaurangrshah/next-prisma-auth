import nextConnect from "next-connect";
import morgan from "morgan";

const middleware = nextConnect();

middleware.use(morgan("tiny"));

export default middleware;
