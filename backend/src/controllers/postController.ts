import { IGamer } from '../schema/Gamer';
import { IPost } from '../schema/Post';
import { getPostTagByName } from '../controllers/postTagController';
import { CreatePostArgs } from '../types/post.types';
import {
  addPostToGamerDB,
  createPostDB,
  deletePostDB,
  deletePostFromGamerDB,
  getPostsDB,
  getWriterDB,
} from '../models/postModel';

export async function createPost(createPostArgs: CreatePostArgs): Promise<IPost> {
  const postTagsIds = await Promise.all(
    createPostArgs.tags.map(async (tagName) => (await getPostTagByName(tagName)).id)
  );
  const post = await createPostDB({
    ...createPostArgs,
    tags: postTagsIds,
    createdAt: new Date(),
  });
  await addPostToGamer(createPostArgs.writer, post.id);
  return post;
}

export async function deletePost(writerId: string, postId: string): Promise<IPost> {
  const post = await deletePostDB(postId);
  await deletePostFromGamer(writerId, postId);
  if (!post) throw new Error('The requested post does not exist');
  return post;
}

export async function getPosts(): Promise<IPost[]> {
  const posts = await getPostsDB();
  return posts;
}

export async function getWriters(): Promise<IGamer[]> {
  const posts = await getPosts();
  const writers = Promise.all(posts.map((post) => getWriter(post)));
  return writers;
}

export async function getWriter(post: IPost): Promise<IGamer> {
  const writer = await getWriterDB(post);
  if (!writer) throw new Error('The requested post does not exist');
  return writer;
}

async function addPostToGamer(writerId: string, postId: string) {
  const gamer = await addPostToGamerDB(writerId, postId);
  if (!gamer) throw new Error('The requested gamer does not exist');
  return gamer;
}

export async function deletePostFromGamer(writerId: string, postId: string) {
  const gamer = await deletePostFromGamerDB(writerId, postId);
  if (!gamer) throw new Error('The requested gamer does not exist');
  return gamer;
}
