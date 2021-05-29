import dotenv from "dotenv";

// load environment variables from .env file
dotenv.config();

/** Connection string to connect our backend to our mongo database */
export const DB_CONNECTION_STRING: string = process.env.DB_CONNECTION_STRING!;

/** Secret token to sign JWT */
export const SECRET_ACCESS_TOKEN: string = process.env.SECRET_ACCESS_TOKEN!;

/** Secret token to sign JWT */
export const FRONT_URL: string = process.env.FRONT_URL!;
