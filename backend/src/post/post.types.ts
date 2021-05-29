import { Game } from "../game/game.types";
import { Gamer } from "../gamer/gamer.types";
import { PostTag } from "../postTag/postTag.types";

export interface Post {
  id: string;
  name: string;
  writer: Gamer["id"];
  createdAt?: Date;
  game: Game["id"][];
  tags: PostTag["id"][];
}
