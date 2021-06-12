import axios from 'axios';

const GAME_BASE_URL = 'http://localhost:5000/games';

class GameServices {
  getGames() {
    return axios.get(GAME_BASE_URL);
  }

  addGameToGamer(data: { game: string; rank: string }) {
    return axios.put(GAME_BASE_URL, data);
  }
}

export default new GameServices();
