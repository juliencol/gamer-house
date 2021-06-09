import dotenv from 'dotenv';

// load environment variables from .env file
dotenv.config();

/** Connection string to connect our backend to our mongo database */
export const DB_CONNECTION_STRING: string = process.env.DB_CONNECTION_STRING!;

/** Secret token to sign JWT */
export const SECRET_ACCESS_TOKEN: string = process.env.SECRET_ACCESS_TOKEN!;

/** Default App URL */
export const DEFAULT_APP_URL: string = process.env.DEFAULT_APP_URL!;

/** Default port */
export const DEFAULT_PORT: number = 5000;

/** Default running environment */
export const DEFAULT_ENVIRONMENT: string = 'local';
