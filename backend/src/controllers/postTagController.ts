<<<<<<< HEAD
import { Category, IPostTag } from '../schema/PostTag';
=======
import { IPostTag } from '../schema/PostTag';
>>>>>>> 09fa6fe (Solved import issues)
import {
  createPostTagDB,
  deletePostTagDB,
  getPostTagByNameDB,
  getPostTagsDB,
} from '../models/postTagModel';

export async function createPostTag(data: {
  name: string;
  category: Category;
}): Promise<IPostTag> {
  const postTag = await createPostTagDB(data);
  return postTag;
}

export async function getPostTags(): Promise<IPostTag[]> {
  const postTags = await getPostTagsDB();
  return postTags;
}

export async function getPostTagByName(name: string): Promise<IPostTag> {
  const postTag = await getPostTagByNameDB(name);
<<<<<<< HEAD
  if (!postTag) throw new Error('The requested post tag does not exist');
=======
  if (!postTag) throw new Error('The request post tag does not exist');
>>>>>>> 09fa6fe (Solved import issues)
  return postTag;
}

export async function deletePostTag(id: string): Promise<IPostTag> {
  const postTag = await deletePostTagDB(id);
  if (!postTag) throw new Error('The requested post tag does not exist');
  return postTag;
}
