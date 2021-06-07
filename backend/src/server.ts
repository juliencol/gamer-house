import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authenticationRouter from "./routes/authentication/authentication";
import userInfoRouter from "./routes/userInfo/userInfoRouter";
import { FRONT_URL } from "./constants";
import gamerRoutes from "./gamer/gamerRoutes";
import postRoutes from "./post/postRoutes";
import postTagRoutes from "./postTag/postTagRoutes";

export function createServer() {
  const app = express();

  app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));

  app.use(cors({ origin: FRONT_URL, credentials: true }));

  app.get("/", (req: Request, res: Response) =>
    res.json({ message: "Welcome to the GamerHouse API!" })
  );

  app.use("/authentication", authenticationRouter);
  app.use("/user", userInfoRouter);
  app.use("/gamers", gamerRoutes);
  app.use("/posts", postRoutes);
  app.use("/postTags", postTagRoutes);
  return app;
}
