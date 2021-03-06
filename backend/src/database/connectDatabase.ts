import mongoose from 'mongoose';
import { DB_CONNECTION_STRING } from '../constants';

// Declare database object
export let database: mongoose.Connection;

/** Connect database to our backend **/
export const connectDatabase = async (): Promise<mongoose.Connection> => {
  return await mongoose
    .connect(DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => (database = mongoose.connection))
    .then((database: mongoose.Connection) => database)
    .catch((error: Error) => {
      console.error('Could not connect to the database. Exiting now...', error);
      process.exit();
    });
};
