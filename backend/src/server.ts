import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authenticationRouter from "./routes/authentication/authentication";
import { FRONT_URL } from "./constants";

export function createServer() {
  const app = express();

  app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));

  app.use(cors({ origin: FRONT_URL, credentials: true }));

  app.get("/", (req: Request, res: Response) =>
    res.json({ message: "Welcome to the GamerHouse API!" })
  );

  app.use("/authentication", authenticationRouter);
  return app;
}
