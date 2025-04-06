import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import strategy from "./routes/validators/strategies.js";
import userRouter from "./routes/user.js";
import actionRouter from "./routes/actions.js";
import messageRouter from "./routes/messages.js";
import contactRouter from "./routes/contacts.js";
import profileRouter from "./routes/profile.js";

const app: express.Express = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport.use("jwtStrategy", strategy);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", userRouter);
app.use("/action", actionRouter);
app.use("/messages", messageRouter);
app.use("/contacts", contactRouter);
app.use("/profile", profileRouter);
const port = process.env.PORT || 3000;
console.log("process.env.NODE_ENV", process.env.NODE_ENV, port);
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}

export default app;
