import JWT from 'jsonwebtoken';
import { SECRET_ACCESS_TOKEN } from '../constants';

export type jwtPayloadKeys = 'id' | 'pseudo';
export type PayloadJWT = { [key in jwtPayloadKeys]: string };

export function generateJWT(data: PayloadJWT) {
  return JWT.sign(data, SECRET_ACCESS_TOKEN, { expiresIn: 60 * 60 });
}

export function isValidJWT(jwt: string) {
  try {
    JWT.verify(jwt, SECRET_ACCESS_TOKEN);
    return true;
  } catch (err) {
    return false;
  }
}

export function getPayload(jwt: string) {
  const fullPayload = JWT.verify(jwt, SECRET_ACCESS_TOKEN);
  const jwtPayload = Object.entries(fullPayload).reduce(
    (prev, curr) => {
      const key = curr[0] as string;
      if (key !== 'exp' && key !== 'iat') {
        prev[key as jwtPayloadKeys] = curr[1];
      }
      return prev;
    },
    { id: '', pseudo: '' }
  );
  return jwtPayload;
}
