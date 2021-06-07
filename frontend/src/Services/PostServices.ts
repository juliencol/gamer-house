import axios from 'axios';

const POST_BASE_URL = 'http://localhost:5000/posts';

class PostServices {
  getPosts() {
    return axios.get(POST_BASE_URL);
  }

  getWriters() {
    return axios.get(POST_BASE_URL + '/writers');
  }
}

export default new PostServices();
