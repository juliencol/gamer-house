import { IGroup } from '../schema/Group';
import {
  createGroupDB,
  addGamerToGroupDB,
  removeGamerFromGroupDB,
  deleteGroupDB,
  getGroupsFromDB,
} from '../models/groupModel';
import { IGamer } from '../schema/Gamer';

export async function createGroup(data: {
  name: string;
  owner: IGamer;
}): Promise<IGroup> {
  const group = await createGroupDB({ ...data, createdAt: new Date() });
  return group;
}

export async function deleteGroup(data: { groupId: string }) {
  return await deleteGroupDB({ ...data });
}

export async function addGamerToGroup(data: {
  gamer: IGamer;
  group: IGroup;
}): Promise<void> {
  await addGamerToGroupDB({ ...data });
}

export async function removeGamerFromGroup(data: {
  gamer: IGamer;
  group: IGroup;
}): Promise<void> {
  await removeGamerFromGroupDB({ ...data });
}

export async function getGroups(data: { gamerId: string }) {
  return await getGroupsFromDB({ ...data });
}
