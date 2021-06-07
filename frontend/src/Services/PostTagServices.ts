import axios from 'axios';

const POST_TAG_BASE_URL = 'http://localhost:5000/postTags';

class PostTagServices {
  getPostTags() {
    return axios.get(POST_TAG_BASE_URL);
  }
}

export default new PostTagServices();
