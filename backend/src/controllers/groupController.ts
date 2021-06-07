import { IGroup } from '../schema/Group';
import { createGroupDB } from '../models/groupModel';

export async function createGroup(data: { name: string }): Promise<IGroup> {
  const group = await createGroupDB({ ...data, createdAt: new Date() });
  return group;
}
