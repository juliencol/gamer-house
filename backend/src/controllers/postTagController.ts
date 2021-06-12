import { IPostTag } from '../schema/PostTag';
import {
  createPostTagDB,
  deletePostTagDB,
  getPostTagByNameDB,
  getPostTagsDB,
} from '../models/postTagModel';

export async function createPostTag(data: { name: string }): Promise<IPostTag> {
  const postTag = await createPostTagDB(data);
  return postTag;
}

export async function getPostTags(): Promise<IPostTag[]> {
  const postTags = await getPostTagsDB();
  return postTags;
}

export async function getPostTagByName(name: string): Promise<IPostTag> {
  const postTag = await getPostTagByNameDB(name);
  if (!postTag) throw new Error('The request post tag does not exist');
  return postTag;
}

export async function deletePostTag(id: string): Promise<IPostTag> {
  const postTag = await deletePostTagDB(id);
  if (!postTag) throw new Error('The request post tag does not exist');
  return postTag;
}
