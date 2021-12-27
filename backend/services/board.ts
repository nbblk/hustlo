import mongoose from "mongoose";
import { WorkspaceModel } from "../models/workspace";

export const create = async (data: any) => {
  try {
    let objectId = mongoose.Types.ObjectId(data.workspaceId);
    await WorkspaceModel.updateOne(
      { _id: objectId },
      {
        $push: {
          boards: {
            _id: mongoose.Types.ObjectId(),
            name: data.name,
            color: data.color,
            labels: [
              { color: "green", title: "", checked: false },
              { color: "blue", title: "", checked: false },
              { color: "red", title: "", checked: false },
              { color: "emerald", title: "", checked: false },
              { color: "pink", title: "", checked: false },
              { color: "gray", title: "", checked: false },
              { color: "gray-regular", title: "", checked: false },
            ],
            lists: [
              {
                _id: mongoose.Types.ObjectId(),
                title: "",
                active: false,
                cards: [],
              },
            ],
          },
        },
      }
    );
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export const fetchByKeyword = async (keyword: string) => {
  try {
    let docs = await WorkspaceModel.find(
      { "board.$.name": keyword },
      { "board.$": 1 }
    ).exec();
    return docs;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export const modifyTitle = async (data: {
  workspaceId: string;
  boardId: string;
  title: string;
}) => {
  try {
    await WorkspaceModel.updateOne(
      {
        _id: mongoose.Types.ObjectId(data.workspaceId),
      },
      {
        $set: { "boards.$[board].name": data.title },
      },
      {
        arrayFilters: [{ "board._id": mongoose.Types.ObjectId(data.boardId) }],
      }
    );
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export const updateWorkspace = async (data: {
  workspaceId: string;
  boardId: string;
  newWorkspaceId: string;
}) => {
  try {
    let tobeRemoved: any = await WorkspaceModel.findOne(
      {
        _id: mongoose.Types.ObjectId(data.workspaceId),
        "boards._id": mongoose.Types.ObjectId(data.boardId),
      },
      {
        boards: 1,
        _id: 0,
      }
    ).exec();

    await WorkspaceModel.updateOne(
      {
        _id: mongoose.Types.ObjectId(data.workspaceId),
      },
      {
        $pull: { boards: { _id: mongoose.Types.ObjectId(data.boardId) } },
      },
      {
        new: false,
      }
    );
    await WorkspaceModel.updateOne(
      {
        _id: mongoose.Types.ObjectId(data.newWorkspaceId),
      },
      {
        $push: { boards: tobeRemoved.boards[0] },
      }
    );
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export const getWorkspaceList = async (userId: string) => {
  try {
    let docs = await WorkspaceModel.find({ userId: userId }, "_id name").exec();
    return docs;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export const getBoardTitles = async (workspaceId: string) => {
  try {
    let docs = await WorkspaceModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(workspaceId) } },
      {
        $project: {
          boards: {
            $map: {
              input: "$boards",
              in: { _id: "$$this._id", name: "$$this.name" },
            },
          },
          _id: 0,
        },
      },
    ]).exec();
    return docs;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export const updateLists = async (data: {
  workspaceId: string;
  boardId: string;
  oldListId: string;
  newListId: string;
  newListIndex: number;
  cardId: string;
}) => {
  try {
    let cardToPush = await WorkspaceModel.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(data.workspaceId) },
      },
      {
        $unwind: "$boards",
      },
      {
        $match: { "boards._id": mongoose.Types.ObjectId(data.boardId) },
      },
      {
        $project: { boards: 1, _id: 0 },
      },
      {
        $match: { "boards.lists._id": mongoose.Types.ObjectId(data.oldListId) },
      },
      {
        $replaceRoot: { newRoot: "$boards" },
      },
      {
        $unwind: "$lists",
      },
      {
        $match: { "lists.cards._id": mongoose.Types.ObjectId(data.cardId) },
      },
      {
        $project: { lists: 1, _id: 0 },
      },
      {
        $replaceRoot: { newRoot: "$lists" },
      },
      {
        $unwind: "$cards",
      },
      {
        $match: { "cards._id": mongoose.Types.ObjectId(data.cardId) },
      },
      {
        $project: { cards: 1, _id: 0 },
      },
      {
        $replaceRoot: { newRoot: "$cards" },
      },
    ]).exec();

    await WorkspaceModel.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(data.workspaceId) },
      {
        $pull: {
          "boards.$[board].lists.$[list].cards": {
            _id: mongoose.Types.ObjectId(data.cardId),
          },
        },
      },
      {
        arrayFilters: [
          { "board._id": mongoose.Types.ObjectId(data.boardId) },
          { "list._id": mongoose.Types.ObjectId(data.oldListId) },
        ],
      }
    ).exec();

    await WorkspaceModel.updateOne(
      {
        _id: mongoose.Types.ObjectId(data.workspaceId),
      },
      {
        $push: {
          "boards.$[board].lists.$[list].cards": {
            $each: cardToPush,
            $position: data.newListIndex,
          },
        },
      },
      {
        arrayFilters: [
          { "board._id": mongoose.Types.ObjectId(data.boardId) },
          { "list._id": mongoose.Types.ObjectId(data.newListId) },
        ],
      }
    );
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};
