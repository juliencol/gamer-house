import Router, { Request, Response } from 'express';
import { getPayload, PayloadJWT } from '../services/authenticationService';

const userInfoRouter = Router();

userInfoRouter.get('/pseudo', (req: Request, res: Response) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(500).json('No authorization header');
  }
  const accessToken = authorization.replace('AccessToken ', '');
  if (!accessToken) {
    return res.status(500).send('No access token');
  }
  const playload: PayloadJWT = getPayload(accessToken);
  return res.status(200).json({ pseudo: playload.pseudo });
});

export default userInfoRouter;
