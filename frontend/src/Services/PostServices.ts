import axios from 'axios';

const POST_BASE_URL = 'http://localhost:5000/posts';

class PostServices {
  createPost(data: { name: string; content: string; tags: string[] }) {
    return axios.post(POST_BASE_URL, data);
  }

  getPosts() {
    return axios.get(POST_BASE_URL);
  }

  filterPosts(tagsNames: string[]) {
    return axios.post(POST_BASE_URL + '/filter', tagsNames);
  }
}

export default new PostServices();
