import { Schema, model, Model, Document } from 'mongoose';
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
  name: string;
  picture: string;
}

interface IGameBase extends IGameSchema {
  getID(): string;
}

export interface IGame extends IGameBase {}

export interface IGameModel extends Model<IGame> {}

export default model<IGame, IGameModel>(gameSchemaName, GameSchema, gameCollectionName);
