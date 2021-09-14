import { Schema, model } from "mongoose";

type Board = {
  name: string,
  lists: []
}

export interface Workspace {
  userId: string,
  name: string,
  description: string,
  boards: Board[]
}

const schema = new Schema<Workspace>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    boards: { type: Array, required: false }
});

export const WorkspaceModel = model<Workspace>("Workspace", schema);
