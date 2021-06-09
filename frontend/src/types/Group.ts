import { Gamer } from './Gamer';

export interface Group {
  name: string;
  createdAt: Date;
  members: [Gamer];
  banner: string;
}
