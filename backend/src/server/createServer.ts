import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authenticationRouter from '../routes/authenticationRoutes';
import userInfoRouter from '../routes/userInfoRoutes';
import { DEFAULT_APP_URL } from '../constants';
import gamerRoutes from '../routes/gamerRoutes';
import mustBeAuthenticated from '../middleware/authenticationMiddleware';
import postRoutes from '../routes/postRoutes';
import postTagRoutes from '../routes/postTagRoutes';
import commentRouter from '../routes/postCommentRoutes';

/** Create express app and open backend endpoints */
export function createServer() {
  const app: express.Application = express();
  app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));
  app.use(cors({ origin: DEFAULT_APP_URL, credentials: true }));

  // Backend endpoints
  app.use('/authentication', authenticationRouter);
  app.use('/comment', mustBeAuthenticated, commentRouter);
  app.use('/gamers', mustBeAuthenticated, gamerRoutes);
  app.use('/user', mustBeAuthenticated, userInfoRouter);
  app.use('/posts', mustBeAuthenticated, postRoutes);
  app.use('/postTags', mustBeAuthenticated, postTagRoutes);
  return app;
}
