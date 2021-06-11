import { Group } from './Group';
import { Post } from './Post';

export interface Gamer {
  _id: string;
  pseudo: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  email: string;
  password: string;
  birthDate: Date;
  country: string;
  city: string;
  statusMessage: string;
  description: string;
  createdAt: Date;
  posts: [Post];
  followers: [Gamer];
  following: [Gamer];
  gamesWithRanks: [Object];
  group: [Group];
}
