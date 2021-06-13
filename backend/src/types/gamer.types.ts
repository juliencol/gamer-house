import { IGame } from '../schema/Game';
import { IGamer } from '../schema/Gamer';

export interface CreateGamerArgs {
  pseudo: IGamer['pseudo'];
  email: IGamer['email'];
  password: IGamer['password'];
  birthDate: IGamer['birthDate'];
}

export interface TestDataForLogin {
  email: IGamer['email'];
  password: IGamer['password'];
}

export interface TestDataForRegister extends TestDataForLogin {
  pseudo: IGamer['pseudo'];
  birthDate: string;
}

export interface UpdateGamerArgs {
  pseudo: IGamer['pseudo'];
  firstName?: IGamer['firstName'];
  lastName?: IGamer['lastName'];
  profilePicture?: IGamer['profilePicture'];
  email: IGamer['email'];
  birthDate: IGamer['birthDate'];
  country?: IGamer['country'];
  city?: IGamer['city'];
  gamesWithRank?: Array<{
    game: IGame['id'];
    rank: string;
  }>;
  statusMessage?: IGamer['statusMessage'];
  description?: IGamer['description'];
}
