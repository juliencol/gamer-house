import { Post } from "../post/post.types";
import { Game } from "../game/game.types";

export interface Gamer {
  id: string;
  pseudo: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  email: string;
  password: string;
  birthDate: Date;
  country?: string;
  city?: string;
  createdAt?: Date;
  posts?: Post["id"][];
  followers: Gamer["id"][];
  following: Gamer["id"][];
  //gamesWithRanks: [Game["id"], string][];
  group: Game["id"][];
}

export interface CreateGamerArgs {
  pseudo: string;
  email: string;
  password: string;
  birthDate: Date;
}
