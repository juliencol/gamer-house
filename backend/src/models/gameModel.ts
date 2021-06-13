import Game, { IGame } from '../schema/Game';
import Gamer, { IGamer } from '../schema/Gamer';

export async function createGameDB(
    args: { name: string, picture : string }
  ): Promise<IGame> {
    const game = new Game({
      ...args
    });
    return game.save();
}

export async function getGamesDB(): Promise <IGame[]> {
    return Game.find();
}

export async function addGameToGamerDB(id: string, gameWithRank: { game: string, rank: string }): Promise<IGamer | null>{
    return Gamer.findByIdAndUpdate(id, { $push: { gamesWithRank: gameWithRank } });
}


export async function removeGameFromGamerDB(id: string, gameId: string): Promise<IGamer | null>{
  return Gamer.findByIdAndUpdate(id, { $pull: { gamesWithRank: { game: gameId} }} );
}