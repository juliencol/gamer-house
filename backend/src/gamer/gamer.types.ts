import { IGamer } from "../models/Gamer";

export interface CreateGamerArgs {
  pseudo: IGamer["pseudo"];
  email: IGamer["email"];
  password: IGamer["password"];
  birthDate: IGamer["birthDate"];
  createdAt: IGamer["createdAt"];
}

export interface UpdateGamerArgs {
  pseudo: IGamer["pseudo"];
  firstName?: IGamer["firstName"];
  lastName?: IGamer["lastName"];
  profilePicture?: IGamer["profilePicture"];
  email: IGamer["email"];
  birthDate: IGamer["birthDate"];
  country?: IGamer["country"];
  city?: IGamer["city"];
}
