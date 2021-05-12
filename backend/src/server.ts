import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { connectDatabase } from './database/connectDatabase';

// Create express app
export const app = express();
app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));

/** Start backend server **/
const startBackendServer = async (): Promise<void> => {
  await connectDatabase().then(() => {
    app
      .get('/', (req: Request, res: Response) =>
        res.json({ message: 'Welcome to the GamerHouse API!' })
      )
      .listen(5000, () => {
        console.log('Running GamerHouse API on http://localhost:5000');
      });
  });
};

startBackendServer();
