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
  followGamer,
  unfollowGamer,
  updateGamer,
  changePassword,
  getGamersByPseudo,
  changeAvatar,
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

router.get('/getAuthenticatedGamer', async (req: Request, res: Response) => {
  try {
    const payload: PayloadJWT = getPayload(req.accessToken);
    const gamer = await getGamer(payload.id);
    res.status(200).json(gamer);
  } catch (e) {
    res.status(500).json({ error: `Could not find any gamer: ${e.message}` });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const gamers = await getGamers();
    res.status(200).json(gamers);
  } catch (e) {
    res.status(500).json({ error: `Could not find any gamer: ${e.message}` });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const gamer = await getGamer(req.params.id);
    res.status(200).json(gamer);
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
    const payload: PayloadJWT = getPayload(req.accessToken);
    const gamer = await updateGamer(payload.id, req.body);
    res.status(201).json(gamer);
  } catch (e) {
    res.status(500).json({ error: `The user could not be updated: ${e.message}` });
  }
});

router.patch('/avatar', async (req: Request, res: Response) => {
  try {
    const payload: PayloadJWT = getPayload(req.accessToken);
    const gamer = await changeAvatar(payload.id, req.body.avatarToChange);
    res.status(201).json(gamer);
  } catch (e) {
    res.status(500).json({ error: `The avatar could not be updated: ${e.message}` });
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
      res.status(500).json({ error: `The password could not be updated: ${e.message}` });
    }
  }
);

// Search System

router.get('/search/:pseudo', async (req: Request, res: Response) => {
  try {
    const payload: PayloadJWT = getPayload(req.accessToken);
    const gamers = await getGamersByPseudo(payload.id, req.params.pseudo);
    res.status(200).json(gamers);
  } catch (e) {
    res
      .status(500)
      .json({ error: `No gamer using this pseudo could be found: ${e.message}` });
  }
});

// Following System

router.put('/follow', async (req: Request, res: Response) => {
  try {
    const payload: PayloadJWT = getPayload(req.accessToken);
    const gamer = await followGamer(payload.id, req.body.idToFollow);
    res.status(201).json(gamer);
  } catch (e) {
    res.status(500).json({ error: `The gamer could not be followed: ${e.message}` });
  }
});

router.delete('/unfollow/:id', async (req: Request, res: Response) => {
  try {
    const payload: PayloadJWT = getPayload(req.accessToken);
    const gamer = await unfollowGamer(payload.id, req.params.id);
    res.status(201).json(gamer);
  } catch (e) {
    res.status(500).json({ error: `The gamer could not be unfollowed: ${e.message}` });
  }
});

// Group System

export default router;
