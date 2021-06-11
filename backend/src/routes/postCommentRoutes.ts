import { Request, Response, Router } from 'express';
import {
  getComment,
  createComment,
  deleteComment,
  getCommentWriter,
} from '../controllers/commentController';
import { getPayload } from '../services/authenticationService';
import { CreateCommentArgs } from '../types/comment.types';

const commentRouter = Router();

commentRouter.post('/', async (req: Request, res: Response) => {
  const writer = getPayload(req.accessToken);
  const commentArgs: CreateCommentArgs = {
    writer,
    ...req.body,
  };
  createComment(commentArgs)
    .then((comment) => res.status(201).json(comment))
    .catch((e: Error) =>
      res.status(500).json({ error: `The comment could not be created: ${e.message}` })
    );
});

commentRouter.get('/:id/user', async (req: Request, res: Response) => {
  const commentId: string = req.params.id;
  const comment = await getComment(commentId);
  if (!comment) {
    return res.status(500).json({ error: `The comment was not found` });
  }

  getCommentWriter(comment)
    .then((commentWritter) => res.status(200).json({ id: commentWritter.id }))
    .catch((e: Error) =>
      res.status(500).json({ error: `The writer was not found: ${e.message}` })
    );
});

commentRouter.delete('/', async (req: Request, res: Response) => {
  const writerId: string = req.body.writerId;
  const postId: string = req.body.postId;
  const commentId: string = req.body.commentId;

  deleteComment(writerId, postId, commentId)
    .then(() => res.status(200).send('Comment deleted'))
    .catch((e: Error) =>
      res.status(500).json({ error: `The comment does not exist: ${e.message}` })
    );
});

export default commentRouter;
