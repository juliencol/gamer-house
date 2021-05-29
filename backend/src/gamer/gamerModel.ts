import Gamer, { IGamer } from "../models/Gamer";
import { CreateGamerArgs } from "./gamer.types";

export function createGamerDB(gamerArgs: CreateGamerArgs): Promise<IGamer> {
  const gamer = new Gamer({
    ...gamerArgs,
  });
  return gamer.save();
}

export async function getGamersDB(): Promise<IGamer[]> {
  return Gamer.find();
}

export async function getGamerDB(id: string): Promise<IGamer | null> {
  return Gamer.findById(id);
}

export async function getGamerByEmailDB(email: string): Promise<IGamer | null> {
  return Gamer.findOne({
    email: email,
  });
}

export async function deleteGamerDB(id: string): Promise<IGamer | null> {
  return Gamer.findByIdAndDelete(id);
}
