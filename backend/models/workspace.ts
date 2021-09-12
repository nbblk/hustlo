import { Schema, model } from "mongoose";

export interface Workspace {
  name: string;
  description: string;
}

const schema = new Schema<Workspace>({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

export const WorkspaceModel = model<Workspace>("Workspace", schema);
