import { Request, Response, Router } from 'express';
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
  getGamersByPseudo,
  followGamer,
  unfollowGamer,
  updateGamer,
  changePassword,
} from '../controllers/gamerController';
import { CreateGamerArgs } from '../types/gamer.types';

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

<<<<<<< HEAD
<<<<<<< HEAD
router.get('/getAuthenticatedGamer', async (req: Request, res: Response) => {
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
    const gamer = await getGamer(payload.id);
    res.status(200).json(gamer);
=======
router.get("/getAuthenticatedGamer", async (req: Request, res: Response) => {
=======
router.get('/getAuthenticatedGamer', async (req: Request, res: Response) => {
>>>>>>> cce8a4a (follow + recherche user + description relié au back + refonte front)
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
    const gamer = await getGamer(payload.id);
    res.status(200).json(gamer);
<<<<<<< HEAD

>>>>>>> 8b4e604 ( profile Page front + route back)
=======
>>>>>>> cce8a4a (follow + recherche user + description relié au back + refonte front)
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

router.put('/update', async (req: Request, res: Response) => {
  try {
    delete req.body.password;
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(500).json('No authorization header');
    }
    const accessToken = authorization.replace('AccessToken ', '');
    if (!accessToken) {
      return res.status(500).send('No access token');
    }
    const payload: PayloadJWT = getPayload(accessToken);
    const gamer = await updateGamer(payload.id, req.body);
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

router.put('/follow', async (req: Request, res: Response) => {
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
    const gamer = await followGamer(payload.id, req.body.idToFollow);
    res.status(201).json(gamer);
  } catch (e) {
    res.status(500).json({ error: `The gamer could not be followed: ${e.message}` });
  }
});

router.delete('/unfollow/:id', async (req: Request, res: Response) => {
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
    const gamer = await unfollowGamer(payload.id, req.params.id);
    res.status(201).json(gamer);
  } catch (e) {
    res.status(500).json({ error: `The gamer could not be unfollowed: ${e.message}` });
  }
});

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
=======
>>>>>>> cce8a4a (follow + recherche user + description relié au back + refonte front)
// Search System

router.get('/search/:pseudo', async (req: Request, res: Response) => {
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
    const gamers = await getGamersByPseudo(payload.id, req.params.pseudo);
    res.status(201).json(gamers);
  } catch (e) {
    res
      .status(500)
      .json({ error: `No gamer using this pseudo could be found: ${e.message}` });
  }
});

<<<<<<< HEAD
>>>>>>> 91e3dc5 (follow + recherche user + description relié au back + refonte front)
=======
>>>>>>> cce8a4a (follow + recherche user + description relié au back + refonte front)
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

<<<<<<< HEAD
<<<<<<< HEAD
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

=======
<<<<<<< HEAD:backend/src/routes/gamerRoutes.ts
>>>>>>> c86750e (Post, post tag back, feed updated)
router.delete('/:id/post', async (req: Request, res: Response) => {
=======
router.post("/post/:id/", async (req: Request, res: Response) => {
=======
router.post('/post/:id/', async (req: Request, res: Response) => {
>>>>>>> be4fedc (Solved import issues)
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

>>>>>>> 09fa6fe (Solved import issues)
// Group System

export default router;
