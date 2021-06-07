import Group, { IGroup } from "../models/Group";

export async function createGroupDB(data: {
  name: string;
  createdAt: Date;
}): Promise<IGroup> {
  const group = new Group(data);
  return group.save();
}
