import "dotenv/config";
import express from "express";
import routes from "./routes/routes.ts";
import cors from "cors";

const app: express.Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes.router);
app.use("/comments", routes.comments);
app.use("/users", routes.user);
app.use("/posts", routes.posts);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
