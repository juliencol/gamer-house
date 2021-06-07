import Router, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getGamerByEmail, createGamer } from '../controllers/gamerController';
import {
  loginGamerArgumentsValidator,
  registerGamerArgumentsValidator,
} from '../validators/gamerArgumentsValidator';
import { validate } from '../validators/validator';
import { generateJWT, isValidJWT } from '../services/authenticationService';
import { CreateGamerArgs } from '../types/gamer.types';

const authenticationRouter = Router();

authenticationRouter.post(
  '/login',
  loginGamerArgumentsValidator(),
  validate,
  (req: Request, res: Response) => {
    getGamerByEmail(req.body.email)
      .then((gamer) => {
        if (!bcrypt.compareSync(req.body.password, gamer.password)) {
          throw Error('Wrong password and email combination');
        }
        const accessToken = generateJWT({
          id: gamer.id,
          pseudo: gamer.pseudo,
        });

        res.status(200).json({ accessToken });
      })
      .catch((e) => res.status(500).send(`The gamer could not be logged`));
  }
);

authenticationRouter.post(
  '/register',
  registerGamerArgumentsValidator(),
  validate,
  async (req: Request, res: Response) => {
    const gamerData: CreateGamerArgs = {
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      pseudo: req.body.pseudo,
      birthDate: new Date(req.body.birthDate),
    };
    createGamer(gamerData)
      .then((gamer) => {
        const accessToken = generateJWT({ id: gamer.id, pseudo: gamer.pseudo });
        res.status(200).json({ accessToken });
      })
      .catch((e) => res.status(500).send(`The gamer could not be registered`));
  }
);

authenticationRouter.get('/isAuthenticated', (req: Request, res: Response) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(500).json('No authorization header');
  }
  const accessToken = authorization.replace('AccessToken ', '');
  if (!accessToken) {
    return res.status(500).send('No access token');
  }
  return res.status(200).send(isValidJWT(accessToken));
});

export default authenticationRouter;
