import axios from 'axios';

const GROUP_BASE_URL = 'http://localhost:5000/groups';

class GroupServices {
  getAllGroups() {
    return axios.get(GROUP_BASE_URL + '/all');
  }

  createGroup(data: { name: string }) {
    return axios.post(GROUP_BASE_URL, data);
  }

  getGroups() {
    return axios.get(GROUP_BASE_URL);
  }

  joinGroup(data: { groupId: string }) {
    return axios.post(GROUP_BASE_URL + '/join', data);
  }

  leaveGroup(groupId: string) {
    return axios.delete(GROUP_BASE_URL + '/leave/' + groupId);
  }
}

export default new GroupServices();
