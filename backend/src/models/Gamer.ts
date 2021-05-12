import { Schema, model, Model, Document } from 'mongoose';
import { IPost } from './Post';

export const gamerSchemaName = 'Gamer';
const gamerCollectionName = 'gamers';

export const GamerSchema = new Schema({
  pseudo: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  profilePicture: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  birthDate: { type: Date, required: true },
  country: { type: String, required: false },
  city: { type: String, required: false },
  createdAt: { type: Date, required: false },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post', require: false }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'Gamer', require: true }],
  following: [{ type: Schema.Types.ObjectId, ref: 'Gamer', require: true }],

  // TODO for David
  // add gamesWithRanks field after defined Game model (this one is a bit tricky to define)
  // add group field after defined Group model
});

GamerSchema.methods.getID = function () {
  return this._id ? this._id.toString() : null;
};

interface IGamerSchema extends Document {
  pseudo: { type: string; required: true };
  firstName: { type: string; required: false };
  lastName: { type: string; required: false };
  profilePicture: { type: string; required: false };
  email: { type: string; required: true };
  password: { type: string; required: true };
  birthDate: { type: Date; required: true };
  country: { type: string; required: false };
  city: { type: string; required: false };
  createdAt: { type: Date; required: false };
  posts: Array<IPost['id']>;
  followers: Array<IGamer['id']>;
  following: Array<IGamer['id']>;
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
