import { IPost } from '../schema/Post';

export interface CreatePostArgs {
  name: IPost['name'];
  content: IPost['content'];
  writer: IPost['writer'];
  tags: IPost['tags'];
}
