import { Request, Response, Router } from 'express';
import { filterPosts, getPosts } from '../controllers/postController';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const posts = await getPosts();
    res.status(201).json(posts);
  } catch (e) {
    res.status(500).json({ error: `There aren't any existing posts: ${e.message}` });
  }
});

router.post('/filter', async (req: Request, res: Response) => {
  try {
    const posts = await filterPosts(req.body);
    res.status(201).json(posts);
  } catch (e) {
    res.status(500).json({ error: `There aren't any matching posts: ${e.message}` });
  }
});

export default router;
