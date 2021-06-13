import axios from 'axios';

const GAME_BASE_URL = 'http://localhost:5000/games';

class GameServices {
  getGames() {
    return axios.get(GAME_BASE_URL);
  }

  addGameToGamer(data: { game: string; rank: string }) {
    return axios.put(GAME_BASE_URL, data);
  }

  removeGameFromGamer(game: string) {
    return axios.delete(GAME_BASE_URL + '/' + game);
  }
}

export default new GameServices();
