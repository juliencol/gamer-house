import { Schema, model, Model, Document } from "mongoose";

export const postTagSchemaName = "PostTag";
const postTagCollectionName = "postsTags";

export const PostTagSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

PostTagSchema.methods.getID = function () {
  return this._id ? this._id.toString() : null;
};

interface IPostTagSchema extends Document {
  name: string;
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
