import { Schema, model, Model, Document } from 'mongoose';
import { IPost } from './Post';
import { IGame } from './Game';
import { IGroup } from './Group';
import { IComment } from './Comment';

export const gamerSchemaName = 'Gamer';
const gamerCollectionName = 'gamers';

export const GamerSchema = new Schema({
  pseudo: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  profilePicture: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthDate: { type: Date, required: true },
  country: { type: String, required: false },
  city: { type: String, required: false },
  statusMessage: { type: String, required: false },
  description: { type: String, required: false },
  createdAt: { type: Date, required: false },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post', required: false }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'Gamer', required: true }],
  following: [{ type: Schema.Types.ObjectId, ref: 'Gamer', required: true }],
  gamesWithRanks: [{ type: Object, required: false }],
  groups: [{ type: Schema.Types.ObjectId, ref: 'Game', required: true }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', required: true }],
});

GamerSchema.methods.getID = function () {
  return this._id ? this._id.toString() : null;
};

interface IGamerSchema extends Document {
  pseudo: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  email: string;
  password: string;
  birthDate: Date;
  country: string;
  city: string;
  statusMessage: string;
  description: string;
  createdAt: Date;
  posts: Array<IPost['id']>;
  followers: Array<IGamer['id']>;
  following: Array<IGamer['id']>;
  gamesWithRanks: Array<{
    game: IGame['id'];
    rank: string;
  }>;
  groups: Array<IGroup['id']>;
  comments: Array<IComment['id']>;
}

interface IGamerBase extends IGamerSchema {
  getID(): string;
}

export interface IGamer extends IGamerBase {}

export interface IGamerModel extends Model<IGamer> {}

export default model<IGamer, IGamerModel>(
  gamerSchemaName,
  GamerSchema,
  gamerCollectionName
);
