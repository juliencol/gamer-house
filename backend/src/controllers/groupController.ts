import { IGroup } from '../schema/Group';
import { IGamer } from '../schema/Gamer';
import {
  createGroupDB,
  addGamerToGroupDB,
  removeGamerFromGroupDB,
  deleteGroupDB,
  getGroupsForGamerFromDB,
  addGroupToGamerDB,
  removeGroupFromGamerDB,
  getAllGroupsDB,
} from '../models/groupModel';

export async function createGroup(name: string, owner: string): Promise<IGroup> {
  const group = await createGroupDB({ name, owner, createdAt: new Date() });
  return group;
}

export async function deleteGroup(groupId: string) {
  return await deleteGroupDB(groupId);
}

export async function addGamerToGroup(gamerId: string, groupId: string): Promise<void> {
  await addGamerToGroupDB(gamerId, groupId);
  await addGroupToGamerDB(gamerId, groupId);
}

export async function removeGamerFromGroup(
  gamerId: string,
  groupId: string
): Promise<void> {
  await removeGamerFromGroupDB(gamerId, groupId);
  await removeGroupFromGamerDB(gamerId, groupId);
}

export async function getGroups(gamerId: string) {
  return await getGroupsForGamerFromDB(gamerId);
}

export async function getAllGroups() {
  return await getAllGroupsDB();
}
