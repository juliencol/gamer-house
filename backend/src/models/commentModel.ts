import Gamer, { IGamer } from '../schema/Gamer';
import Post, { IPost } from '../schema/Post';
import Comment, { IComment } from '../schema/Comment';
import { CreateCommentArgs } from '../types/comment.types';

export async function getCommentDB(commentId: string): Promise<IComment | null> {
  return Comment.findById(commentId);
}

export async function createCommentDB(
  createCommentArgs: CreateCommentArgs & { createdAt: Date }
): Promise<IComment> {
  const comment = new Comment({
    ...createCommentArgs,
  });
  return comment.save();
}

export async function deleteCommentDB(commentId: string): Promise<IComment | null> {
  return Comment.findByIdAndDelete(commentId);
}

export async function addCommentToPostDB(
  postId: string,
  commentId: string
): Promise<IPost | null> {
  return Post.findByIdAndUpdate(postId, { $push: { comments: commentId } });
}

export async function deleteCommentFromPostDB(
  postId: string,
  commentId: string
): Promise<IPost | null> {
  return Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
}

export async function getCommentWriterDB(comment: IComment): Promise<IGamer | null> {
  return Gamer.findById(comment.writer);
}

export async function addCommentToGamerDB(
  writerId: string,
  commentId: string
): Promise<IGamer | null> {
  return Gamer.findByIdAndUpdate(writerId, { $push: { comments: commentId } });
}

export async function deleteCommentFromGamerDB(
  writerId: string,
  commentId: string
): Promise<IGamer | null> {
  return Gamer.findByIdAndUpdate(writerId, { $pull: { comments: commentId } });
}

export async function getCommentsOfPostDB(
  postId: string
): Promise<Array<IComment> | null> {
  return Comment.find().populate('writer').where('post').equals(postId);
}
