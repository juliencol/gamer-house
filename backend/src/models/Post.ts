import { Schema, model, Model, Document } from 'mongoose';
import { IGamer } from './Gamer';

export const postSchemaName = 'Post';
const postCollectionName = 'posts';

export const PostSchema = new Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  writer: { type: Schema.Types.ObjectId, ref: 'Gamer', require: true },
  createdAt: { type: Date, required: false },

  // TODO for David
  // add game field after defined Game model
  // add tag field after defined Tag model
});

PostSchema.methods.getID = function () {
  return this._id ? this._id.toString() : null;
};

interface IPostSchema extends Document {
  name: string;
  content: string;
  writer: IGamer['id'];
  createdAt: Date;
}

interface IPostBase extends IPostSchema {
  getID(): string;
}

export interface IPost extends IPostBase {}

export interface IPostModel extends Model<IPost> {}

export default model<IPost, IPostModel>(postSchemaName, PostSchema, postCollectionName);
