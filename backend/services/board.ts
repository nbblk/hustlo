import mongoose from "mongoose";
import { WorkspaceModel } from "../models/workspace";

export const create = async (data: any) => {
  try {
    let objectId = mongoose.Types.ObjectId(data.workspaceId);
    await WorkspaceModel.updateOne({ _id: objectId }, {
      $push: { "boards": { name: data.name, color: data.color } },
    });
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export const fetchByKeyword = async (keyword: string) => {
  try {
    let docs = await WorkspaceModel.find({ "board.$.name": keyword }, { "board.$": 1 }).exec();
    return docs;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};