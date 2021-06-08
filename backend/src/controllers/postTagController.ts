<<<<<<< HEAD
<<<<<<< HEAD
import { Category, IPostTag } from '../schema/PostTag';
=======
import { IPostTag } from '../schema/PostTag';
>>>>>>> 09fa6fe (Solved import issues)
=======
import { IPostTag } from "../models/PostTag";
>>>>>>> c86750e (Post, post tag back, feed updated)
import {
  createPostTagDB,
  deletePostTagDB,
  getPostTagByNameDB,
  getPostTagsDB,
<<<<<<< HEAD
} from '../models/postTagModel';
=======
} from "./postTagModel";
>>>>>>> c86750e (Post, post tag back, feed updated)

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
<<<<<<< HEAD
  if (!postTag) throw new Error('The requested post tag does not exist');
=======
  if (!postTag) throw new Error('The request post tag does not exist');
>>>>>>> 09fa6fe (Solved import issues)
=======
  if (!postTag) throw new Error("The request post tag does not exist");
>>>>>>> c86750e (Post, post tag back, feed updated)
  return postTag;
}

export async function deletePostTag(id: string): Promise<IPostTag> {
  const postTag = await deletePostTagDB(id);
  if (!postTag) throw new Error('The requested post tag does not exist');
  return postTag;
}
