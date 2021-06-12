import { Request, Response, Router } from 'express';
import { addGameToGamer, createGame, getGames } from '../controllers/gameController';
import { getPayload, PayloadJWT } from '../services/authenticationService';

const router = Router();

router.post(
    '/',
    async (req: Request, res: Response) => {
      try {
        const game = await createGame(req.body);
        res.status(201).json(game);
      } catch (e) {
        res.status(500).json({ error: `The game could not be created: ${e.message}` });
      }
    }
);

router.put('/', async (req: Request, res: Response) => {
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
        const game = await addGameToGamer(payload.id, req.body);
        res.status(201).json(game);
    } catch (e) {
        res.status(500).json({ error: `The game could not be created: ${e.message}` });
    }
}
);

router.get(
    '/',
    async (req: Request, res: Response) => {
      try {
        const games = await getGames();
        res.status(201).json(games);
      } catch (e) {
        res.status(500).json({ error: `The game could not be created: ${e.message}` });
      }
    }
);

export default router;