import Group, { IGroup } from '../schema/Group';
import Gamer, { IGamer } from '../schema/Gamer';

export async function createGroupDB(data: {
  name: string;
  owner: IGamer;
  createdAt: Date;
}): Promise<IGroup> {
  const group = new Group(data);
  return group.save();
}

export async function deleteGroupDB(data: { groupId: string }) {
  return await Group.deleteOne({ id: data.groupId });
}

export async function addGamerToGroupDB(data: {
  gamer: IGamer;
  group: IGroup;
}): Promise<void> {
  const { gamer, group } = data;
  group.members.push(gamer);
  await group.save();
  gamer.groups.push(group);
  await gamer.save();
}

export async function removeGamerFromGroupDB(data: {
  gamer: IGamer;
  group: IGroup;
}): Promise<void> {
  const { gamer, group } = data;
  group.members.splice(group.members.indexOf(gamer), 1);
  await group.save();
  gamer.groups.splice(gamer.groups.indexOf(group), 1);
  await gamer.save();
}

export async function getGroupsFromDB(data: { gamerId: string }) {
  return await Gamer.find({ id: data.gamerId }).populate('groups');
}
