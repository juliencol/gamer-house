import { IGroup } from "../models/Group";
import { createGroupDB } from "./groupModel";

export async function createGroup(data: { name: string }): Promise<IGroup> {
  const group = await createGroupDB({ ...data, createdAt: new Date() });
  return group;
}
