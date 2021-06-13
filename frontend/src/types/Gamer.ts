import { Game } from './Game';
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
  gamesWithRank: [GameWithRank];
  group: [Group];
}

export interface GameWithRank {
  game: Game;
  rank: string;
}
