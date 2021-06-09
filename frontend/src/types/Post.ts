import { Game } from './Game';
import { Gamer } from './Gamer';
import { PostTag } from './PostTag';

export interface Post {
  name: string;
  content: string;
  writer: Gamer;
  createdAt: Date;
  game: [Game];
  tags: [PostTag];
}
