import bcrypt from 'bcrypt';
import { IGamer } from '../schema/Gamer';
import { CreateGamerArgs, UpdateGamerArgs } from '../types/gamer.types';
import {
  addToFollowersDB,
  addToFollowingDB,
  changePasswordDB,
  createGamerDB,
  deleteFromFollowersDB,
  deleteFromFollowingDB,
  deleteGamerDB,
  getGamerDB,
  getGamerByEmailDB,
  getGamersDB,
  updateGamerDB,
} from '../models/gamerModel';

export async function createGamer(args: CreateGamerArgs): Promise<IGamer> {
  const hashedPassword = await hashPassword(args.password);
  const gamer = await createGamerDB({
    ...args,
    password: hashedPassword,
    createdAt: new Date(),
  });
  return gamer;
}

export async function getGamers(): Promise<IGamer[]> {
  const gamers = await getGamersDB();
  return gamers;
}

export async function getGamer(id: string): Promise<IGamer> {
  const gamer = await getGamerDB(id);
  if (!gamer) throw new Error('The requested gamer does not exist');
  return gamer;
}

export async function getGamerByEmail(email: string): Promise<IGamer> {
  const gamer = await getGamerByEmailDB(email);
  if (!gamer) throw new Error('The requested gamer does not exist');
  return gamer;
}

export async function deleteGamer(id: string): Promise<IGamer> {
  const gamer = await deleteGamerDB(id);
  if (!gamer) throw new Error('The requested gamer does not exist');
  return gamer;
}

export async function updateGamer(id: string, args: UpdateGamerArgs): Promise<IGamer> {
  if (args.email != null && !regexEmail.test(args.email)) {
    throw new Error('This email is not valid');
  }
  const gamer = await updateGamerDB(id, args);
  if (!gamer) throw new Error('The requested gamer does not exist');
  return gamer;
}

export async function changePassword(id: string, password: string): Promise<IGamer> {
  const hashedPassword = await hashPassword(password);
  const gamer = await changePasswordDB(id, hashedPassword);
  if (!gamer) throw new Error('The requested gamer does not exist');
  return gamer;
}

export async function followGamer(id: string, idToFollow: string): Promise<IGamer> {
  await getGamer(idToFollow); // checks if the gamer to follow exists
  await isFollowable(id, idToFollow);
  await addToFollowersDB(idToFollow, id);
  const gamer = await addToFollowingDB(id, idToFollow);
  if (!gamer) throw new Error('The requested gamer does not exist');
  return gamer;
}

export async function unfollowGamer(id: string, idToUnfollow: string): Promise<IGamer> {
  await deleteFromFollowersDB(idToUnfollow, id);
  const gamer = await deleteFromFollowingDB(id, idToUnfollow);
  if (!gamer) throw new Error('The requested gamer does not exist');
  return gamer;
}

const isFollowable = async (id: string, idToFollow: string) => {
  if (id === idToFollow) {
    throw new Error("One can't follow themselves");
  }
  const gamer = await getGamer(id);
  if (gamer.following.find(() => idToFollow)) {
    throw new Error('The gamer is already being followed');
  }
};

const regexEmail = new RegExp('[a-zA-Z0-9]*[^@]@{1}[a-zA-Z0-9]*[.][a-zA-Z]+');

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};
