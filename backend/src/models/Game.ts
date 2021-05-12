import { Schema, model, Model, Document } from 'mongoose';
import { IPost } from './Post';

export const gameSchemaName = 'Game';
const gameCollectionName = 'games';

export const GameSchema = new Schema({
  name: { type: String, required: true },
  picture: { type: String, required: true },
});

GameSchema.methods.getID = function () {
  return this._id ? this._id.toString() : null;
};

interface IGameSchema extends Document {
  name: { type: string; required: true };
  picture: { type: string; required: true };
}

interface IGameBase extends IGameSchema {
  getID(): string;
}

export interface IGame extends IGameBase {}

export interface IGameModel extends Model<IGame> {}

export default model<IGame, IGameModel>(gameSchemaName, GameSchema, gameCollectionName);
