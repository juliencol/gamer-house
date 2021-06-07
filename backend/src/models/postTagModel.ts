import PostTag, { IPostTag } from '../schema/PostTag';

export async function createPostTagDB(data: { name: string }): Promise<IPostTag> {
  const postTag = new PostTag(data);
  return postTag.save();
}

export async function getPostTagsDB(): Promise<IPostTag[]> {
  return PostTag.find();
}

export async function deletePostTagDB(id: string): Promise<IPostTag | null> {
  return PostTag.findByIdAndDelete(id);
}
