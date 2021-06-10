import axios from 'axios';

const USER_BASE_URL = 'http://localhost:5000/gamers';

class GamerServices {
  createPost(data: { name: string; content: string }) {
    return axios.post(USER_BASE_URL + '/post', data);
  }
}

export default new GamerServices();
