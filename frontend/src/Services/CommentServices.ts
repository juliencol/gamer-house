import axios, { AxiosPromise } from 'axios';
import { CreateCommentArgs, Comment } from 'types/Comment';

const POST_BASE_URL = 'http://localhost:5000/comment';

class CommentServices {
  createComment(data: CreateCommentArgs) {
    return axios.post(POST_BASE_URL, data);
  }

  getComments(postId: string): AxiosPromise<Array<Comment>> {
    return axios.get(`${POST_BASE_URL}/`);
  }
}

export default new CommentServices();
