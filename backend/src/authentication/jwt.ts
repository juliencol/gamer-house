import JWT from "jsonwebtoken";
import { SECRET_ACCESS_TOKEN } from "../constants";

export function generateJWT(data: { id: string }) {
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
