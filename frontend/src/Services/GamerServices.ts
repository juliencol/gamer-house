import axios from 'axios';

const GAMER_BASE_URL = 'http://localhost:5000/gamers';

class GamerServices {
  getAuthenticatedGamer() {
    return axios.get(GAMER_BASE_URL + '/getAuthenticatedGamer');
  }

  getGamer(id: string) {
    return axios.get(GAMER_BASE_URL + '/' + id);
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

  changeAvatar(data: { avatarToChange: string }) {
    return axios.patch(GAMER_BASE_URL + '/avatar', data);
  }

  changePassword(data: { currentPassword: string; password: string }) {
    return axios.patch(GAMER_BASE_URL + '/password', data);
  }
}

export default new GamerServices();
