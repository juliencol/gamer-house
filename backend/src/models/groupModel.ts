import Group, { IGroup } from '../schema/Group';
import Gamer, { IGamer } from '../schema/Gamer';

export async function createGroupDB(data: {
  name: string;
  owner: string;
  createdAt: Date;
}): Promise<IGroup> {
  const group = new Group(data);
  return group.save();
}

export async function deleteGroupDB(groupId: string) {
  return await Group.deleteOne({ id: groupId });
}

export async function addGamerToGroupDB(
  gamerId: string,
  groupId: string
): Promise<IGroup | null> {
  return Group.findByIdAndUpdate(groupId, { $push: { members: gamerId } });
}

export async function addGroupToGamerDB(
  gamerId: string,
  groupId: string
): Promise<IGamer | null> {
  return Gamer.findByIdAndUpdate(gamerId, { $push: { groups: groupId } });
}

export async function removeGroupFromGamerDB(
  gamerId: string,
  groupId: string
): Promise<IGamer | null> {
  return Gamer.findByIdAndUpdate(gamerId, { $pull: { groups: groupId } });
}

export async function removeGamerFromGroupDB(
  gamerId: string,
  groupId: string
): Promise<IGroup | null> {
  return Group.findByIdAndUpdate(groupId, { $pull: { members: gamerId } });
}

export async function getGroupsForGamerFromDB(gamerId: string) {
  const gamer = await Group.find().where('members').equals(gamerId);
  if (!gamer) {
    throw new Error("Gamer doesn't exist");
  }
  return gamer;
}

export async function getAllGroupsDB() {
  return await Group.find();
}
