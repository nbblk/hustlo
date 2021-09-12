import mongoose from "mongoose";
import { Workspace, WorkspaceModel } from "../models/workspace";

export const create = async (workspace: Workspace) => {
  const newWorkspace = new WorkspaceModel({
    name: workspace.name,
    description: workspace.description,
  });

  let createdDoc;
  try {
    createdDoc = await newWorkspace.save();
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
  return createdDoc;
};

export const fetch = async (_id: string) => {
  let docs;
  let objectId = new mongoose.Types.ObjectId(_id); 
  try {
    docs = await WorkspaceModel.findById(objectId);
  } catch (error: any) {
    console.error(error);
  }
  return docs;
};
