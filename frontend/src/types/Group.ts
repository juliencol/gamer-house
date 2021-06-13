import { Gamer } from './Gamer';

export interface Group {
  _id: string;
  name: string;
  createdAt: Date;
  members: [Gamer];
  banner: string;
}
