import { Request, Response, Router } from 'express';
import {
  addGamerToGroup,
  createGroup,
  getAllGroups,
  getGroups,
  removeGamerFromGroup,
} from '../controllers/groupController';
import { getPayload } from '../services/authenticationService';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const gamerId = getPayload(req.accessToken).id;

  getGroups(gamerId)
    .then((gamer) => res.status(200).json(gamer))
    .catch((e) => res.status(500).json({ error: `There isn't any existing group` }));
});

router.get('/all', async (req: Request, res: Response) => {
  getAllGroups()
    .then((groups) => res.status(200).json(groups))
    .catch((e) => res.status(500).json({ error: `There isn't any existing group` }));
});

router.post('/', async (req: Request, res: Response) => {
  const name: string = req.body.name;
  if (!name || name.length < 1) {
    return res.status(500).json({ error: 'The name is empty!' });
  }
  const owner = getPayload(req.accessToken).id;

  createGroup(name, owner)
    .then((group) => res.status(201).json(group))
    .catch((e) =>
      res.status(500).json({ error: `The group could not be created: ${e.message}` })
    );
});

router.post('/join', async (req: Request, res: Response) => {
  const groupId: string = req.body.groupId;
  if (!groupId) {
    return res.status(500).json({ error: 'The group id is undefined!' });
  }
  const gamerId = getPayload(req.accessToken).id;
  addGamerToGroup(gamerId, groupId)
    .then(() => res.status(200).send(true))
    .catch((e) => res.status(500).json({ error: `An error occured: ${e.message}` }));
});

router.delete('/leave/:groupId', async (req: Request, res: Response) => {
  const groupId: string = req.params.groupId;
  if (!groupId) {
    return res.status(500).json({ error: 'The group id is undefined!' });
  }
  const gamerId = getPayload(req.accessToken).id;
  removeGamerFromGroup(gamerId, groupId)
    .then(() => res.status(200).send(true))
    .catch((e) => res.status(500).json({ error: `An error occured` }));
});

export default router;
