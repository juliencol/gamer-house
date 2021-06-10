import { Schema, model, Model, Document } from 'mongoose';

export const postTagSchemaName = 'PostTag';
const postTagCollectionName = 'postsTags';

export const PostTagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  category: {
    type: String,
    enum: ['#f50', '#2db7f5'],
    required: true,
  },
});

export enum Category {
  Game = '#f50',
  Event = '#2db7f5',
}

PostTagSchema.methods.getID = function () {
  return this._id ? this._id.toString() : null;
};

interface IPostTagSchema extends Document {
  name: string;
  color: string;
  category: Category;
}

interface IPostTagBase extends IPostTagSchema {
  getID(): string;
}

export interface IPostTag extends IPostTagBase {}

export interface IPostTagModel extends Model<IPostTag> {}

export default model<IPostTag, IPostTagModel>(
  postTagSchemaName,
  PostTagSchema,
  postTagCollectionName
);
