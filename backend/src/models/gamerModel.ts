import Gamer, { IGamer } from '../schema/Gamer';
import { CreateGamerArgs, UpdateGamerArgs } from '../types/gamer.types';

export function createGamerDB(
  gamerArgs: CreateGamerArgs & { createdAt: Date }
): Promise<IGamer> {
  const gamer = new Gamer({
    ...gamerArgs,
  });
  return gamer.save();
}

export async function getGamersDB(): Promise<IGamer[]> {
  return Gamer.find();
}

export async function getGamerDB(id: string): Promise<IGamer | null> {
  return Gamer.findById(id)
    .populate('following')
    .populate('followers')
    .populate('gamesWithRank.game');
}

export async function getSimpleGamerDB(id: string): Promise<IGamer | null> {
  return Gamer.findById(id);
}

export async function getGamerByEmailDB(email: string): Promise<IGamer | null> {
  return Gamer.findOne({
    email: email,
  });
}

export async function getGamersByPseudoDB(
  userId: string,
  pseudo: string
): Promise<IGamer[] | null> {
  return Gamer.find({
    pseudo: { $regex: pseudo, $options: 'i' },
    _id: { $ne: userId },
  }).populate('following');
}

export async function deleteGamerDB(id: string): Promise<IGamer | null> {
  return Gamer.findByIdAndDelete(id);
}

export async function updateGamerDB(
  id: string,
  args: UpdateGamerArgs
): Promise<IGamer | null> {
  return Gamer.findByIdAndUpdate(id, { $set: { ...args } }, { new: true });
}

export async function changePasswordDB(
  id: string,
  password: string
): Promise<IGamer | null> {
  return Gamer.findByIdAndUpdate(id, { $set: { password: password } }, { new: true });
}

export async function changeAvatarDB(id: string, avatar: string): Promise<IGamer | null> {
  return Gamer.findByIdAndUpdate(id, { $set: { profilePicture: avatar } });
}

// Following system

export async function addToFollowingDB(
  id: string,
  idToFollow: string
): Promise<IGamer | null> {
  return Gamer.findByIdAndUpdate(id, { $push: { following: idToFollow } }, { new: true });
}

export async function addToFollowersDB(
  id: string,
  followerId: string
): Promise<IGamer | null> {
  return Gamer.findByIdAndUpdate(id, { $push: { followers: followerId } }, { new: true });
}

export async function deleteFromFollowingDB(
  id: string,
  idToUnfollow: string
): Promise<IGamer | null> {
  return Gamer.findByIdAndUpdate(
    id,
    { $pull: { following: idToUnfollow } },
    { new: true }
  );
}

export async function deleteFromFollowersDB(
  id: string,
  followerId: string
): Promise<IGamer | null> {
  return Gamer.findByIdAndUpdate(id, { $pull: { followers: followerId } }, { new: true });
}
