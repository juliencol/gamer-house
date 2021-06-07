import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authenticationRouter from './routes/authenticationRoutes';
import userInfoRouter from './routes/userInfoRoutes';
import { FRONT_URL } from './constants';
import gamerRoutes from './routes/gamerRoutes';
import mustBeAuthenticated from './middleware/authenticationMiddleware';
import postRoutes from './routes/postRoutes';
import postTagRoutes from './routes/postTagRoutes';

export async function createServer() {
  const app = express();
  app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));
  app.use(cors({ origin: FRONT_URL, credentials: true }));

  // Backend endpoints
  app.use('/authentication', authenticationRouter);
  app.use('/gamers', mustBeAuthenticated, gamerRoutes);
  app.use('/user', userInfoRouter);
  app.use('/gamers', gamerRoutes);
  app.use('/posts', postRoutes);
  app.use('/postTags', postTagRoutes);
  return app;
}
