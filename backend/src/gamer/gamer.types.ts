import { IGamer } from "../models/Gamer";

export interface CreateGamerArgs {
  pseudo: IGamer["pseudo"];
  email: IGamer["email"];
  password: IGamer["password"];
  birthDate: IGamer["birthDate"];
}

export interface TestDataForLogin {
  email: IGamer["email"];
  password: IGamer["password"];
}

export interface TestDataForRegister extends TestDataForLogin {
  pseudo: IGamer["pseudo"];
  birthDate: string;
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
  statusMessage?: IGamer["statusMessage"];
  description?: IGamer["description"];
}
