import Post, { IPost } from "../models/Post";
import Gamer, { IGamer } from "../models/Gamer";
import { CreatePostArgs } from "./post.types";

export async function createPostDB(
  createPostArgs: CreatePostArgs & { createdAt: Date }
): Promise<IPost> {
  const post = new Post({
    ...createPostArgs,
  });
  return post.save();
}

export async function deletePostDB(postId: string): Promise<IPost | null> {
  return Post.findByIdAndDelete(postId);
}

export async function getPostsDB(): Promise<IPost[]> {
  return Post.find();
}

export async function getWriterDB(post: IPost): Promise<IGamer | null> {
  return Gamer.findById(post.writer);
}

export async function addPostToGamerDB(
  writerId: string,
  postId: string
): Promise<IGamer | null> {
  return Gamer.findByIdAndUpdate(writerId, { $push: { posts: postId } });
}

export async function deletePostFromGamerDB(
  writerId: string,
  postId: string
): Promise<IGamer | null> {
  return Gamer.findByIdAndUpdate(writerId, { $pull: { posts: postId } });
}
