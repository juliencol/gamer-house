import { IGroup } from '../schema/Group';

export interface CreateGroupArgs {
  name: IGroup['name'];
  owner: IGroup['owner'];
}
