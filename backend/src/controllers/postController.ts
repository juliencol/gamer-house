<<<<<<< HEAD
<<<<<<< HEAD
=======
import { IGamer } from '../schema/Gamer';
>>>>>>> 09fa6fe (Solved import issues)
import { IPost } from '../schema/Post';
import { getPostTagByName } from '../controllers/postTagController';
import { CreatePostArgs } from '../types/post.types';
=======
import { IGamer } from "../models/Gamer";
import { IPost } from "../models/Post";
import { getPostTagByName } from "../postTag/postTag";
import { CreatePostArgs } from "./post.types";
>>>>>>> c86750e (Post, post tag back, feed updated)
import {
  addPostToGamerDB,
  createPostDB,
  deletePostDB,
  deletePostFromGamerDB,
  getPostsDB,
} from '../models/postModel';

<<<<<<< HEAD
export async function createPost(createPostArgs: CreatePostArgs): Promise<IPost> {
<<<<<<< HEAD
  const postTagsIds = await Promise.all(
    createPostArgs.tags.map(async (tagName) => (await getPostTagByName(tagName)).id)
  );
  const post = await createPostDB({
    ...createPostArgs,
    tags: postTagsIds,
    createdAt: new Date(),
  });
  await addPostToGamer(createPostArgs.writer, post.id);
=======
=======
export async function createPost(
  createPostArgs: CreatePostArgs
): Promise<IPost> {
>>>>>>> c86750e (Post, post tag back, feed updated)
  for (let i = 0; i < createPostArgs.tags.length; i++) {
    console.log(await getPostTagByName(createPostArgs.tags[i]));
  }
  const post = await createPostDB({ ...createPostArgs, createdAt: new Date() });
  const test = await addPostToGamer(createPostArgs.writer, post.id);
>>>>>>> 09fa6fe (Solved import issues)
  return post;
}

export async function deletePost(postId: string): Promise<IPost> {
  const post = await deletePostDB(postId);
  if (!post) throw new Error('The requested post does not exist');
  await deletePostFromGamer(post.writer, post.id);
  return post;
}

export async function getPosts(): Promise<IPost[]> {
  const posts = await getPostsDB();
  return posts;
}

export async function filterPosts(tagsNames: string[]): Promise<IPost[]> {
  const posts = await getPostsDB();
  if (tagsNames.length > 0) {
    const filteredPosts = await Promise.all(
      posts.filter((post) => {
        let match = false;
        for (let i = 0; i < post.tags.length; i++) {
          if (tagsNames.includes(post.tags[i].name)) {
            match = true;
          }
        }
        return match;
      })
    );
    return filteredPosts;
  }
  return posts;
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
