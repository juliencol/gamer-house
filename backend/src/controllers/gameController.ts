import { addGameToGamerDB, createGameDB } from '../models/gameModel';
import { getGamesDB } from '../models/gameModel';
import { IGame } from '../schema/Game';
import { IGamer } from '../schema/Gamer';

export async function createGame(args: {name: string, picture: string}): Promise<IGame> {
    const game = await createGameDB({ ...args });
    return game;
}

export async function getGames(): Promise<IGame[]>{
    const games = await getGamesDB();
    return games;
}

export async function addGameToGamer(id: string, gameWithRank: { game: string, rank: string }): Promise<IGamer> {
    const gamer = await addGameToGamerDB(id, gameWithRank);
    if (!gamer) throw new Error('The requested gamer could not be found');
    return gamer;
}