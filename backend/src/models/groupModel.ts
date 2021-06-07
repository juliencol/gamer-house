import Group, { IGroup } from '../schema/Group';

export async function createGroupDB(data: {
  name: string;
  createdAt: Date;
}): Promise<IGroup> {
  const group = new Group(data);
  return group.save();
}
