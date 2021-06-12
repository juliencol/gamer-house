import { Request, Response, Router } from 'express';
import {
  createPost,
  deletePost,
  filterPosts,
  getPosts,
} from '../controllers/postController';
import { getPayload, PayloadJWT } from '../services/authenticationService';
import { CreatePostArgs } from '../types/post.types';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(500).json('No authorization header');
    }
    const accessToken = authorization.replace('AccessToken ', '');
    if (!accessToken) {
      return res.status(500).send('No access token');
    }
    const payload: PayloadJWT = getPayload(accessToken);

    const postArgs: CreatePostArgs = {
      writer: payload.id,
      ...req.body,
    };

    const post = await createPost(postArgs);
    res.status(201).json(post);
  } catch (e) {
    res.status(500).json({ error: `The post could not be created: ${e.message}` });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const posts = await getPosts();
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({ error: `There isn't any existing post` });
  }
});

router.post('/filter', async (req: Request, res: Response) => {
  try {
    const posts = await filterPosts(req.body);
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({ error: `There isn't any matching post` });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const post = await deletePost(req.params.id);
    res.status(204).json(post);
  } catch (e) {
    res.status(500).json({ error: `The post could not be deleted: ${e.message}` });
  }
});

export default router;
