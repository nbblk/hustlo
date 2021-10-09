import mongoose from "mongoose";
import { Workspace, WorkspaceModel } from "../models/workspace";

export const create = async (workspace: Workspace) => {
  const newWorkspace = new WorkspaceModel({
    userId: workspace.userId,
    name: workspace.name,
    description: workspace.description,
    boards: [],
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
    docs = await WorkspaceModel.find().where({ userId: objectId });
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
  return docs;
};

export const update = async (
  worskspaceId: string,
  name: string,
  description: string
) => {
  let objectId = new mongoose.Types.ObjectId(worskspaceId);
  try {
    await WorkspaceModel.findByIdAndUpdate(objectId, {
      $set: { name: name, description: description },
    });
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const deleteWorkspace = async (workspaceId: string) => {
  let objectId = new mongoose.Types.ObjectId(workspaceId);
  try {
    await WorkspaceModel.findByIdAndDelete(objectId);
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};
