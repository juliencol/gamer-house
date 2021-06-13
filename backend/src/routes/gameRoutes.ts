import { Request, Response, Router } from 'express';
import { addGameToGamer, createGame, getGames, removeGameFromGamer } from '../controllers/gameController';
import mustBeAuthenticated from '../middleware/authenticationMiddleware';
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

router.put('/',mustBeAuthenticated, async (req: Request, res: Response) => {
    try {
        const payload: PayloadJWT = getPayload(req.accessToken);
        const game = await addGameToGamer(payload.id, req.body);
        res.status(201).json(game);
    } catch (e) {
        res.status(500).json({ error: `The game could not be added to the user list: ${e.message}` });
    }
});

router.delete('/:id', mustBeAuthenticated, async (req: Request, res: Response) => {
    try {
      const payload: PayloadJWT = getPayload(req.accessToken);
        const game = await removeGameFromGamer(payload.id, req.params.id);
        res.status(201).json(game);
    } catch (e) {
        res.status(500).json({ error: `The game could not be added to the user list: ${e.message}` });
    }
});

router.get(
    '/',
    async (req: Request, res: Response) => {
      try {
        const games = await getGames();
        res.status(200).json(games);
      } catch (e) {
        res.status(500).json({ error: `The games could not be found: ${e.message}` });
      }
    }
);

export default router;