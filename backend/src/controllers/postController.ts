import { IPost } from '../schema/Post';
import { getPostTagByName } from '../controllers/postTagController';
import { CreatePostArgs } from '../types/post.types';
import {
  addPostToGamerDB,
  createPostDB,
  deletePostDB,
  deletePostFromGamerDB,
  getPostsDB,
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
  console.log(tagsNames);
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
    console.log(filteredPosts);
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
