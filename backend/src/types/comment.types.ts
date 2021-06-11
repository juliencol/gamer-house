import { IComment } from '../schema/Comment';

export interface CreateCommentArgs {
  content: IComment['content'];
  writer: IComment['writer'];
  post: IComment['post'];
}
