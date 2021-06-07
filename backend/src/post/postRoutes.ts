import { Request, Response, Router } from "express";
import { getPosts, getWriters } from "./post";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const posts = await getPosts();
    res.status(201).json(posts);
  } catch (e) {
    res
      .status(500)
      .json({ error: `There aren't any existing posts: ${e.message}` });
  }
});

router.get("/writers", async (req: Request, res: Response) => {
  try {
    const posts = await getWriters();
    res.status(201).json(posts);
  } catch (e) {
    res
      .status(500)
      .json({ error: `There aren't any existing posts: ${e.message}` });
  }
});

export default router;
