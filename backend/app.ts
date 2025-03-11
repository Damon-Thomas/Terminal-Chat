import "dotenv/config";
import express from "express";
import routes from "./routes/user.ts";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import strategy from "./routes/validators/strategies.ts";
import userRouter from "./routes/user.ts";

const app: express.Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport.use("jwtStrategy", strategy);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", userRouter);

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
}

export default app;
