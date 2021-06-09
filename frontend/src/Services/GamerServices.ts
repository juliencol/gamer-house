import axios from 'axios';

const GAMER_BASE_URL = 'http://localhost:5000/gamers';

<<<<<<< HEAD
class GamerServices {}
=======
class GamerServices {
  createPost(data: { name: string; content: string }) {
    return axios.post(USER_BASE_URL + '/post', data);
  }

  getAuthenticatedGamer(){
    return axios.get(USER_BASE_URL + '/getAuthenticatedGamer');
  }
}
>>>>>>> 5281ac0 ( profile Page front + route back)

export default new GamerServices();
