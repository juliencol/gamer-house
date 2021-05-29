import Router, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateJWT, isValidJWT } from "../../authentication/jwt";
import {
  emailValidation,
  passwordVerification,
  usernameVerification,
  birthDateVerification,
} from "../../authentication/verifications";
import { getGamerByEmail, createGamer } from "../../gamer/gamer";
import { CreateGamerArgs } from "../../gamer/gamer.types";

const authenticationRouter = Router();

authenticationRouter.post("/login", async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!emailValidation(email) || !passwordVerification(password, password)) {
    return res.status(500).json("Bad input");
  }

  getGamerByEmail(email)
    .then((gamer) => {
      bcrypt
        .compare(password, gamer.password)
        .then(() => {
          const accessToken = generateJWT({
            id: gamer.id,
          });

          res.status(200).json({ accessToken });
        })
        .catch(() => {
          res.status(500).json("Bad input");
        });
    })
    .catch(() => res.status(500).json("Bad input"));
});

authenticationRouter.post("/register", async (req: Request, res: Response) => {
  const gamerData: CreateGamerArgs = {
    email: req.body.email,
    password: req.body.password,
    pseudo: req.body.username,
    birthDate: new Date(req.body.birthDate),
  };

  const confirmPassword = req.body.confirmPassword;
  if (
    !emailValidation(gamerData.email) ||
    !passwordVerification(gamerData.password, confirmPassword) ||
    !usernameVerification(gamerData.pseudo) ||
    !birthDateVerification(gamerData.birthDate)
  ) {
    return res.status(500).json("Bad input");
  }
  createGamer(gamerData)
    .then((gamer) => {
      const accessToken = generateJWT({ id: gamer.id });
      res.status(200).json({ accessToken });
    })
    .catch(() => res.status(500).json("Bad input"));
});

authenticationRouter.get("/isAuthenticated", (req: Request, res: Response) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(500).json("No authorization header");
  }
  const accessToken = authorization.replace("AccessToken ", "");
  if (!accessToken) {
    return res.status(500).send("No access token");
  }
  return res.status(200).send(isValidJWT(accessToken));
});

export default authenticationRouter;
