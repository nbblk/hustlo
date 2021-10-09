import mongoose from "mongoose";
import { WorkspaceModel } from "../models/workspace";

export const fetch = async (boardId: string) => {
  let docs;
  try {
    docs = await WorkspaceModel.find(
      { "boards._id": mongoose.Types.ObjectId(boardId),  "boards.lists.archived": { $eq: false } },
      { "boards.lists.$": 1, "_id": 0 },
    ).exec();
    console.log(docs[0]);
    return docs;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export const create = async (workspaceId: string, boardId: string) => {
  let doc;
  try {
    doc = await WorkspaceModel.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(workspaceId),
        "boards._id": mongoose.Types.ObjectId(boardId),
      },
      {
        $push: {
          "boards.$.lists": {
            _id: mongoose.Types.ObjectId(),
            title: "",
            active: false,
            cards: [],
            archived: false,
          },
        },
      },
      { useFindAndModify: true }
    ).exec();
    return doc;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export const archive = async (data: {
  workspaceId: string;
  boardId: string;
  listId: string;
}) => {
  try {
    await WorkspaceModel.updateOne(
      {
        _id: mongoose.Types.ObjectId(data.workspaceId),
      },
      {
        $set: { "boards.$[board].lists.$[list].archived": true },
      },
      {
        arrayFilters: [
          { "board._id": mongoose.Types.ObjectId(data.boardId) },
          { "list._id": mongoose.Types.ObjectId(data.listId) },
        ],
      }
    );
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};
