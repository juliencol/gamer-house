import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authenticationRouter from "./routes/authentication/authentication";
import userInfoRouter from "./routes/userInfo/userInfoRouter";
import { FRONT_URL } from "./constants";
import gamerRoutes from "./gamer/gamerRoutes";
import mustBeAuthenticated from "./authentication/authenticationMiddleware";
import postRoutes from "./post/postRoutes";
import postTagRoutes from "./postTag/postTagRoutes";

export async function createServer() {
  const app = express();
  app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));
  app.use(cors({ origin: FRONT_URL, credentials: true }));

  // Backend endpoints
  app.use("/authentication", authenticationRouter);
  app.use("/gamers", mustBeAuthenticated, gamerRoutes);
  app.use("/user", userInfoRouter);
  app.use("/gamers", gamerRoutes);
  app.use("/posts", postRoutes);
  app.use("/postTags", postTagRoutes);
  return app;
}
