import { Schema, model, Model, Document } from "mongoose";
import { IGamer } from "./Gamer";

export const groupSchemaName = "Group";
const groupCollectionName = "groups";

export const GroupSchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, required: false },
  members: [{ type: Schema.Types.ObjectId, ref: "Gamer", require: false }],
  banner: { type: String, required: true },
});

GroupSchema.methods.getID = function () {
  return this._id ? this._id.toString() : null;
};

interface IGroupSchema extends Document {
  name: { type: string; required: true };
  createdAt: { type: Date; required: true };
  members: Array<IGamer["id"]>;
  banner: { type: string; required: false };
}

interface IGroupBase extends IGroupSchema {
  getID(): string;
}

export interface IGroup extends IGroupBase {}

export interface IGroupModel extends Model<IGroup> {}

export default model<IGroup, IGroupModel>(
  groupSchemaName,
  GroupSchema,
  groupCollectionName
);
