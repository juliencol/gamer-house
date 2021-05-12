import { Schema, model, Model, Document } from "mongoose";

export const postTagSchemaName = "PostTag";
const postTagCollectionName = "posts";

export const PostTagSchema = new Schema({
  name: { type: String, required: true },
});

PostTagSchema.methods.getID = function () {
  return this._id ? this._id.toString() : null;
};

interface IPostTagSchema extends Document {
  name: { type: string; required: true };
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
