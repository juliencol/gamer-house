import { Schema, model, Model, Document } from 'mongoose';
import { IGamer } from './Gamer';
import { IPost } from './Post';

export const commentSchemaName = 'Comment';
const commentCollectionName = 'comments';

export const CommentSchema = new Schema({
  content: { type: String, required: true },
  writer: { type: Schema.Types.ObjectId, ref: 'Gamer', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  createdAt: { type: Date, required: false },
});

CommentSchema.methods.getID = function () {
  return this._id ? this._id.toString() : null;
};

interface ICommentSchema extends Document {
  content: string;
  writer: IGamer['id'];
  post: IPost['id'];
  createdAt: Date;
}

interface ICommentBase extends ICommentSchema {
  getID(): string;
}

export interface IComment extends ICommentBase {}

export interface ICommentmodel extends Model<IComment> {}

export default model<IComment, ICommentmodel>(
  commentSchemaName,
  CommentSchema,
  commentCollectionName
);
