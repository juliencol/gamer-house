import { Request, Response, Router } from 'express';
import { createPost, deletePost } from '../controllers/postController';
import { CreatePostArgs } from '../types/post.types';
import {
  changePasswordArgumentsValidator,
  registerGamerArgumentsValidator,
} from '../validators/gamerArgumentsValidator';
import { validate } from '../validators/validator';
import {
  createGamer,
  deleteGamer,
  getGamer,
  getGamers,
  followGamer,
  unfollowGamer,
  updateGamer,
  changePassword,
} from '../controllers/gamerController';
import { CreateGamerArgs } from '../types/gamer.types';
import { getPayload, PayloadJWT } from '../services/authenticationService';

const router = Router();

// Gamer management

router.post(
  '/',
  registerGamerArgumentsValidator(),
  validate,
  async (req: Request, res: Response) => {
    try {
      const gamerArgs: CreateGamerArgs = {
        password: req.body.password,
        pseudo: req.body.pseudo,
        email: req.body.email.toLowerCase(),
        birthDate: req.body.birthDate,
      };
      const gamer = await createGamer(gamerArgs);
      res.status(201).json(gamer);
    } catch (e) {
      res.status(500).json({ error: `The gamer could not be created: ${e.message}` });
    }
  }
);

router.get('/', async (req: Request, res: Response) => {
  try {
    const gamers = await getGamers();
    res.status(201).json(gamers);
  } catch (e) {
    res.status(500).json({ error: `Could not find any gamer: ${e.message}` });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const gamer = await getGamer(req.params.id);
    res.status(201).json(gamer);
  } catch (e) {
    res.status(500).json({ error: `The gamer could not be found: ${e.message}` });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const gamer = await deleteGamer(req.params.id);
    res.status(201).json(gamer);
  } catch (e) {
    res.status(500).json({ error: `The gamer could not be deleted: ${e.message}` });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    delete req.body.password;
    const gamer = await updateGamer(req.params.id, req.body);
    res.status(201).json(gamer);
  } catch (e) {
    res.status(500).json({ error: `The gamer could not be updated: ${e.message}` });
  }
});

router.patch(
  '/:id/password',
  changePasswordArgumentsValidator(),
  validate,
  async (req: Request, res: Response) => {
    try {
      const gamer = await changePassword(req.params.id, req.body.password);
      res.status(201).json(gamer);
    } catch (e) {
      res.status(500).json({ error: `The gamer could not be updated: ${e.message}` });
    }
  }
);

// Following System

router.put('/:id/follow', async (req: Request, res: Response) => {
  try {
    const gamer = await followGamer(req.params.id, req.body.idToFollow);
    res.status(201).json(gamer);
  } catch (e) {
    res.status(500).json({ error: `The gamer could not be followed: ${e.message}` });
  }
});

router.delete('/:id/unfollow', async (req: Request, res: Response) => {
  try {
    const gamer = await unfollowGamer(req.params.id, req.body.idToUnfollow);
    res.status(201).json(gamer);
  } catch (e) {
    res.status(500).json({ error: `The gamer could not be followed: ${e.message}` });
  }
});

// Post System

router.post('/post', async (req: Request, res: Response) => {
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

router.post('/post/:id/', async (req: Request, res: Response) => {
  try {
    const postArgs: CreatePostArgs = {
      writer: req.params.id,
      ...req.body,
    };
    const post = await createPost(postArgs);
    res.status(201).json(post);
  } catch (e) {
    res.status(500).json({ error: `The post could not be created: ${e.message}` });
  }
});

router.delete('/:id/post', async (req: Request, res: Response) => {
  try {
    const post = await deletePost(req.params.id, req.body.postId);
    res.status(201).json(post);
  } catch (e) {
    res.status(500).json({ error: `The post could not be deleted: ${e.message}` });
  }
});

// Group System

export default router;
