import { Gamer } from './Gamer';

export interface CreateCommentArgs {
  content: string;
  postId: string;
}

export interface Comment {
  commentId: string;
  writer: Gamer;
  postId: string;
  content: string;
}
