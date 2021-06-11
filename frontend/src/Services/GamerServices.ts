import axios from 'axios';

const GAMER_BASE_URL = 'http://localhost:5000/gamers';

<<<<<<< HEAD
class GamerServices {}
=======
class GamerServices {
  createPost(data: { name: string; content: string }) {
    return axios.post(GAMER_BASE_URL + '/post', data);
  }

  getAuthenticatedGamer() {
    return axios.get(GAMER_BASE_URL + '/getAuthenticatedGamer');
  }

  updateGamer(data: any) {
    return axios.put(GAMER_BASE_URL + '/update', data);
  }

  searchGamers(pseudo: string) {
    return axios.get(GAMER_BASE_URL + '/search/' + pseudo);
  }

  followGamer(data: { idToFollow: string }) {
    return axios.put(GAMER_BASE_URL + '/follow', data);
  }

  unfollowGamer(idToUnfollow: string) {
    return axios.delete(GAMER_BASE_URL + '/unfollow/' + idToUnfollow);
  }
}
>>>>>>> 5281ac0 ( profile Page front + route back)

export default new GamerServices();
