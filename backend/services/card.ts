import mongoose from "mongoose";
import { WorkspaceModel } from "../models/workspace";

export const create = async (data: {
  workspaceId: string;
  boardId: string;
  listId: string;
  title: string;
}) => {
  try {
    await WorkspaceModel.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(data.workspaceId),
      },
      {
        $push: {
          "boards.$[board].lists.$[list].cards": {
            _id: mongoose.Types.ObjectId(),
            title: data.title,
            description: "",
            archived: false,
          },
        },
      },
      {
        arrayFilters: [
          { "board._id": mongoose.Types.ObjectId(data.boardId) },
          { "list._id": mongoose.Types.ObjectId(data.listId) },
        ],
        useFindAndModify: true,
      }
    );
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export const archive = async () => {};
