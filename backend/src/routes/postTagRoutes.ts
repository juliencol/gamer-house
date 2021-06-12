import { Request, Response, Router } from 'express';
import {
  createPostTag,
  deletePostTag,
  getPostTags,
} from '../controllers/postTagController';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const postTag = await createPostTag(req.body);
    res.status(201).json(postTag);
  } catch (e) {
    res.status(500).json({ error: `The post tag could not be created: ${e.message}` });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const postTags = await getPostTags();
    res.status(201).json(postTags);
  } catch (e) {
    res.status(500).json({ error: `The post tag could not be created: ${e.message}` });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const postTag = await deletePostTag(req.params.id);
    res.status(201).json(postTag);
  } catch (e) {
    res.status(500).json({ error: `The post tag could not be created: ${e.message}` });
  }
});

export default router;
