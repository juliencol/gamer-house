import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDatabase } from "./database/connectDatabase";

import authenticationRouter from "./routes/authentication/authentication";
import { FRONT_URL } from "./constants";

// Create express app
export const app = express();
app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: FRONT_URL, credentials: true }));

/** Start backend server **/
connectDatabase().then(() => {
  app.listen(5000, () => {
    console.log("Running GamerHouse API on http://localhost:5000");
  });
});

app.get("/", (req: Request, res: Response) =>
  res.json({ message: "Welcome to the GamerHouse API!" })
);

app.use("/authentication", authenticationRouter);
