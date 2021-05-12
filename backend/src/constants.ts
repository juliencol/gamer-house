import dotenv from 'dotenv';

// load environment variables from .env file
dotenv.config();

/** Connection string to connect our backend to our mongo database */
export const DB_CONNECTION_STRING: string = process.env.DB_CONNECTION_STRING!;
