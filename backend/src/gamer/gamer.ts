import { CreateGamerArgs, Gamer } from "./gamer.types";
import bcrypt from "bcrypt";
import {
  createGamerDB,
  deleteGamerDB,
  getGamerDB,
  getGamerByEmailDB,
  getGamersDB,
} from "./gamerModel";
import { parseGamer } from "../models/mongoParser";

export async function createGamer(args: CreateGamerArgs): Promise<Gamer> {
  const hashedPassword = await hashPassword(args.password);
  const gamer = await createGamerDB({
    ...args,
    password: hashedPassword,
  });
  return parseGamer(gamer);
}

export async function getGamers(): Promise<Gamer[]> {
  const gamers = await getGamersDB();
  return gamers.map((gamer) => parseGamer(gamer));
}

export async function getGamer(id: string): Promise<Gamer> {
  const gamer = await getGamerDB(id);
  if (!gamer) throw new Error("The requested gamer does not exist");
  return parseGamer(gamer);
}

export async function getGamerByEmail(email: string): Promise<Gamer> {
  const gamer = await getGamerByEmailDB(email);
  if (!gamer) throw new Error("The requested gamer does not exist");
  return parseGamer(gamer);
}

export async function deleteGamer(id: string): Promise<Gamer> {
  const gamer = await deleteGamerDB(id);
  if (!gamer) throw new Error("The requested gamer does not exist");
  return parseGamer(gamer);
}

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};
