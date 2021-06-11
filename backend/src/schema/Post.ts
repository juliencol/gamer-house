import { Schema, model, Model, Document } from 'mongoose';
import { IGamer } from './Gamer';
import { IGame } from './Game';
import { IPostTag } from './PostTag';
import { IComment } from './Comment';

export const postSchemaName = 'Post';
const postCollectionName = 'posts';

export const PostSchema = new Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  writer: { type: Schema.Types.ObjectId, ref: 'Gamer', required: true },
  createdAt: { type: Date, required: false },
  game: [{ type: Schema.Types.ObjectId, ref: 'Game', required: true }],
  tags: [{ type: Schema.Types.ObjectId, ref: 'PostTag', required: true }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', required: true }],
});

PostSchema.methods.getID = function () {
  return this._id ? this._id.toString() : null;
};

interface IPostSchema extends Document {
  name: string;
  content: string;
  writer: IGamer['id'];
  createdAt: Date;
  game: IGame['id'];
  tags: Array<IPostTag['id']>;
  comments: Array<IComment['id']>;
}

interface IPostBase extends IPostSchema {
  getID(): string;
}

export interface IPost extends IPostBase {}

export interface IPostModel extends Model<IPost> {}

export default model<IPost, IPostModel>(postSchemaName, PostSchema, postCollectionName);
