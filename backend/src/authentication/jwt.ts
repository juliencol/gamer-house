import JWT from "jsonwebtoken";
import { SECRET_ACCESS_TOKEN } from "../constants";

export type jwtPlayloadKeys = "id";
export type PlayloadJWT = { [key in jwtPlayloadKeys]: string };

export function generateJWT(data: PlayloadJWT) {
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

export function readJWT(jwt: string) {
  return JWT.verify(jwt, SECRET_ACCESS_TOKEN);
}
