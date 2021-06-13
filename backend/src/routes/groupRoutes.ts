import { Request, Response, Router } from 'express';
import {
  addGamerToGroup,
  createGroup,
  deleteGroup,
  getGroups,
  removeGamerFromGroup,
} from '../controllers/groupController';
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
    const groups = await getGroups({ gamerId: payload.id });
    res.status(200).json(groups);
  } catch (e) {
    res.status(500).json({ error: `There isn't any existing group` });
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
    const group = await deleteGroup({ groupId: req.params.id });
    res.status(204).json(group);
  } catch (e) {
    res.status(500).json({ error: `The group could not be deleted: ${e.message}` });
  }
});

router.post(':id/addMember/:id', async (req: Request, res: Response) => {
  // TODO: how do I get the groupId and the member id from here
  try {
    await addGamerToGroup({ gamerId: req.params.id, groupId: '' });
  } catch (e) {
    res.status(500).json({ error: `An error occured` });
  }
});

router.post(':id/removeMember/:id', async (req: Request, res: Response) => {
  // TODO: how do I get the groupId and the member id from here
  try {
    await removeGamerFromGroup({ gamerId: req.params.id, groupId: '' });
  } catch (e) {
    res.status(500).json({ error: `An error occured` });
  }
});

export default router;
