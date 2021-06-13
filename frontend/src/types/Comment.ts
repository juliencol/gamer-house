import { Gamer } from './Gamer';

export interface CreateCommentArgs {
  content: string;
  post: string;
}

export interface Comment {
  commentId: string;
  writer: Gamer;
  postId: string;
  content: string;
}
