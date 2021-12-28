import mongoose from "mongoose";
import { WorkspaceModel } from "../models/workspace";

export const fetch = async (boardId: string, workspaceId: string) => {
  let docs;
  try {
    docs = await WorkspaceModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(workspaceId) } },
      { $unwind: "$boards" },
      { $match: { "boards._id": new mongoose.Types.ObjectId(boardId) } },
      { $replaceRoot: { newRoot: "$boards" } },
      {
        $set: {
          lists: {
            $map: {
              input: {
                $filter: {
                  input: "$lists",
                  as: "list",
                  cond: {
                    $eq: ["$$list.archived", false],
                  },
                },
              },
              as: "filteredList",
              in: {
                _id: "$$filteredList._id",
                title: "$$filteredList.title",
                cards: {
                  $filter: {
                    input: "$$filteredList.cards",
                    as: "card",
                    cond: {
                      $or: [
                        { $eq: ["$$card", []] },
                        { $eq: ["$$card.archived", false] },
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      },
    ]).exec();

    return docs;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export const fetchArchived = async (boardId: string, workspaceId: string) => {
  let docs;
  try {
    docs = await WorkspaceModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(workspaceId) } },
      { $unwind: "$boards" },
      { $match: { "boards._id": new mongoose.Types.ObjectId(boardId) } },
      { $unwind: "$boards.lists" },
      { $match: { "boards.lists.archived": true } },
      { $project: { boards: 1, _id: 0 } },
      {
        $group: {
          _id: "$boards._id",
          name: { $first: "$boards.name" },
          color: { $first: "$boards.color" },
          labels: { $first: "$boards.labels" },
          lists: { $addToSet: "$boards.lists" },
        },
      },
    ]).exec();
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
        _id: new mongoose.Types.ObjectId(workspaceId),
        "boards._id": new mongoose.Types.ObjectId(boardId),
      },
      {
        $push: {
          "boards.$.lists": {
            _id: new mongoose.Types.ObjectId(),
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

export const modifyList = async (data: {
  workspaceId: string;
  boardId: string;
  listId: string;
  list: any;
}) => {
  try {
    await WorkspaceModel.updateOne(
      {
        _id: new mongoose.Types.ObjectId(data.workspaceId),
      },
      {
        $set: { "boards.$[board].lists.$[list]": data.list },
      },
      {
        arrayFilters: [
          { "board._id": new mongoose.Types.ObjectId(data.boardId) },
          { "list._id": new mongoose.Types.ObjectId(data.listId) },
        ],
      }
    );
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export const updateTitle = async (data: {
  workspaceId: string;
  boardId: string;
  listId: string;
  title: string;
}) => {
  try {
    await WorkspaceModel.updateOne(
      {
        _id: new mongoose.Types.ObjectId(data.workspaceId),
      },
      {
        $set: { "boards.$[board].lists.$[list].title": data.title },
      },
      {
        arrayFilters: [
          { "board._id": new mongoose.Types.ObjectId(data.boardId) },
          { "list._id": new mongoose.Types.ObjectId(data.listId) },
        ],
      }
    );
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
        _id: new mongoose.Types.ObjectId(data.workspaceId),
      },
      {
        $set: { "boards.$[board].lists.$[list].archived": true },
      },
      {
        arrayFilters: [
          { "board._id": new mongoose.Types.ObjectId(data.boardId) },
          { "list._id": new mongoose.Types.ObjectId(data.listId) },
        ],
      }
    );
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export const restore = async (data: {
  workspaceId: string;
  boardId: string;
  listId: string;
}) => {
  try {
    await WorkspaceModel.updateOne(
      {
        _id: new mongoose.Types.ObjectId(data.workspaceId),
      },
      {
        $set: { "boards.$[board].lists.$[list].archived": false },
      },
      {
        arrayFilters: [
          { "board._id": new mongoose.Types.ObjectId(data.boardId) },
          { "list._id": new mongoose.Types.ObjectId(data.listId) },
        ],
      }
    );
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};
