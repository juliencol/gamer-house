import { IGamer } from '../schema/Gamer';
import { IComment } from '../schema/Comment';
import { CreateCommentArgs } from '../types/comment.types';
import {
  createCommentDB,
  deleteCommentDB,
  addCommentToPostDB,
  deleteCommentFromPostDB,
  getCommentWriterDB,
  addCommentToGamerDB,
  deleteCommentFromGamerDB,
  getCommentDB,
  getCommentsOfPostDB,
} from '../models/commentModel';

export async function createComment(
  createCommentArgs: CreateCommentArgs
): Promise<IComment> {
  const comment = await createCommentDB({ ...createCommentArgs, createdAt: new Date() });
  await addCommentToGamer(createCommentArgs.writer, comment.id);
  await addCommentToPost(createCommentArgs.post, comment.id);
  return comment;
}

export async function getComment(commentId: string): Promise<IComment | null> {
  const comment = await getCommentDB(commentId);
  return comment;
}

export async function deleteComment(
  writerId: string,
  postId: string,
  commentId: string
): Promise<IComment> {
  const comment = await deleteCommentDB(commentId);
  await deleteCommentFromGamer(writerId, commentId);
  await deleteCommentFromPost(postId, commentId);
  if (!comment) throw new Error('The requested comment does not exist');
  return comment;
}

async function addCommentToPost(postId: string, commentId: string) {
  const post = await addCommentToPostDB(postId, commentId);
  if (!post) throw new Error('The requested post does not exist');
  return post;
}

async function deleteCommentFromPost(postId: string, commentId: string) {
  const post = await deleteCommentFromPostDB(postId, commentId);
  if (!post) throw new Error('The requested post does not exist');
  return post;
}

export async function getCommentWriter(comment: IComment): Promise<IGamer> {
  const writer = await getCommentWriterDB(comment);
  if (!writer) throw new Error('The requested gamer does not exist');
  return writer;
}

async function addCommentToGamer(writerId: string, commentId: string) {
  const gamer = await addCommentToGamerDB(writerId, commentId);
  if (!gamer) throw new Error('The requested gamer does not exist');
  return gamer;
}

async function deleteCommentFromGamer(writerId: string, commentId: string) {
  const gamer = await deleteCommentFromGamerDB(writerId, commentId);
  if (!gamer) throw new Error('The requested gamer does not exist');
  return gamer;
}

export async function getCommentsOfPost(postId: string) {
  const comments = await getCommentsOfPostDB(postId);
  if (!comments) throw new Error('The requested gamer does not exist');
  return comments;
}
