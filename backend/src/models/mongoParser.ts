import { IGamer } from "./Gamer";
import { Gamer } from "../gamer/gamer.types";
import { IPost } from "./Post";

export function parseGamer(gamer: IGamer): Gamer {
  return {
    id: gamer._id,
    pseudo: gamer.pseudo,
    firstName: gamer.firstName,
    lastName: gamer.lastName,
    profilePicture: gamer.profilePicture,
    email: gamer.email,
    password: gamer.password,
    birthDate: gamer.birthDate,
    country: gamer.country,
    city: gamer.city,
    createdAt: gamer.createdAt,
    posts: gamer.posts?.map((post: IPost) => post._id),
    followers: gamer.followers?.map((gamer: IGamer) => gamer._id),
    following: gamer.following?.map((gamer: IGamer) => gamer._id),
    //gamesWithRanks: gamer.gamesWithRanks,
    group: gamer.following?.map((gamer: IGamer) => gamer._id),
  };
}
