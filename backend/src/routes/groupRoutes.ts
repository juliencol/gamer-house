import { Request, Response, Router } from 'express';
import { createGroup, deleteGroup, getGroups } from '../controllers/groupController';
import { PayloadJWT, getPayload } from '../services/authenticationService';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
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
    const posts = await getGroups({ gamerId: payload.id });
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({ error: `There isn't any existing post` });
  }
});

router.post('/new', async (req: Request, res: Response) => {
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
    const groupArgs = {
      owner: payload.id,
      ...req.body,
    };

    const group = await createGroup(groupArgs);
    res.status(201).json(group);
  } catch (e) {
    res.status(500).json({ error: `The group could not be created: ${e.message}` });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const post = await deleteGroup({ groupId: req.params.id });
    res.status(204).json(post);
  } catch (e) {
    res.status(500).json({ error: `The group could not be deleted: ${e.message}` });
  }
});

export default router;
