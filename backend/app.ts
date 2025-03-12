import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import strategy from "./routes/validators/strategies";
import userRouter from "./routes/user";
import actionRouter from "./routes/actions";
import messageRouter from "./routes/messages";
import contactRouter from "./routes/contacts";
import profileRouter from "./routes/profile";

const app: express.Express = express();

app.use(cors());
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

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
}

export default app;
