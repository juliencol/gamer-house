import { NextFunction, Request, Response } from 'express';
import { isValidJWT } from '../services/authenticationService';

export type ExtendedRequest = Request & { accessToken: string };

function mustBeAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(500).json('No authorization header');
  }
  const accessToken = authorization.replace('AccessToken ', '');
  if (!accessToken) {
    return res.status(500).send('No access token');
  }
  if (!isValidJWT(accessToken)) {
    return res.status(500).send('No access token');
  }
  req.accessToken = accessToken;
  next();
}

export default mustBeAuthenticated;
