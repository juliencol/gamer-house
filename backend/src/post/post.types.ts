import { IPost } from "../models/Post";

export interface CreatePostArgs {
  name: IPost["name"];
  content: IPost["content"];
  writer: IPost["writer"];
}
