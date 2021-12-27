import mongoose from "mongoose";
import { WorkspaceModel } from "../models/workspace";

export const fetchCardInfo = async (data: {
  workspaceId?: string;
  boardId?: string;
  listId?: string;
  cardId?: string;
}) => {
  let doc;
  try {
    doc = await WorkspaceModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(data.workspaceId) } },
      { $unwind: "$boards" },
      { $unwind: "$boards.lists" },
      { $unwind: "$boards.lists.cards" },
      {
        $match: {
          "boards._id": mongoose.Types.ObjectId(data.boardId),
          "boards.lists._id": mongoose.Types.ObjectId(data.listId),
          "boards.lists.cards._id": mongoose.Types.ObjectId(data.cardId),
        },
      },
      {
        $project: {
          "boards.lists.cards": 1,
          _id: 0,
        },
      },
    ]).exec();
    return doc;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

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

export const updateDescription = async (data: {
  workspaceId: string;
  boardId: string;
  listId: string;
  cardId: string;
  description: string;
}) => {
  try {
    await WorkspaceModel.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(data.workspaceId),
      },
      {
        $set: {
          "boards.$[board].lists.$[list].cards.$[card].description":
            data.description,
        },
      },
      {
        arrayFilters: [
          { "board._id": mongoose.Types.ObjectId(data.boardId) },
          { "list._id": mongoose.Types.ObjectId(data.listId) },
          { "card._id": mongoose.Types.ObjectId(data.cardId) },
        ],
        useFindAndModify: true,
      }
    );
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export const updateLabel = async (data: {
  workspaceId: string;
  boardId: string;
  listId: string;
  cardId: string;
  labels: [];
}) => {
  let labelsSelected: { color: string; title: string }[] = [];
  data.labels.map((label: any) => {
    if (label.checked) {
      labelsSelected.push({
        color: label.color,
        title: label.title ? label.title : "",
      });
    }
  });
  try {
    await WorkspaceModel.updateOne(
      {
        _id: mongoose.Types.ObjectId(data.workspaceId),
      },
      {
        $set: {
          "boards.$[board].labels": data.labels,
          "boards.$[board].lists.$[list].cards.$[card].labelsSelected":
            labelsSelected,
        },
      },
      {
        arrayFilters: [
          { "board._id": mongoose.Types.ObjectId(data.boardId) },
          { "list._id": mongoose.Types.ObjectId(data.listId) },
          { "card._id": mongoose.Types.ObjectId(data.cardId) },
        ],
        useFindAndModify: true,
      }
    );
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export const updateComment = async (data: {
  workspaceId: string;
  boardId: string;
  listId: string;
  cardId: string;
  comment: string;
}) => {
  try {
    await WorkspaceModel.updateOne(
      {
        _id: mongoose.Types.ObjectId(data.workspaceId),
      },
      {
        $push: {
          "boards.$[board].lists.$[list].cards.$[card].comments": {
            comment: data.comment,
          },
        },
      },
      {
        arrayFilters: [
          { "board._id": mongoose.Types.ObjectId(data.boardId) },
          { "list._id": mongoose.Types.ObjectId(data.listId) },
          { "card._id": mongoose.Types.ObjectId(data.cardId) },
        ],
        useFindAndModify: true,
        upsert: true,
      }
    );
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export const uploadAttachment = async (data: {
  workspaceId: string;
  boardId: string;
  listId: string;
  cardId: string;
  file: {
    fileId: mongoose.Types.ObjectId;
    filename: string;
    mimetype: string;
    size: number;
  };
}) => {
  try {
    await WorkspaceModel.updateOne(
      {
        _id: mongoose.Types.ObjectId(data.workspaceId),
      },
      {
        $push: {
          "boards.$[board].lists.$[list].cards.$[card].attachments": data.file,
        },
      },
      {
        arrayFilters: [
          { "board._id": mongoose.Types.ObjectId(data.boardId) },
          { "list._id": mongoose.Types.ObjectId(data.listId) },
          { "card._id": mongoose.Types.ObjectId(data.cardId) },
        ],
        useFindAndModify: true,
        upsert: true,
      }
    );
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export const deleteFile = async (data: {
  workspaceId: string;
  boardId: string;
  listId: string;
  cardId: string;
  fileId: mongoose.Types.ObjectId;
}) => {
  try {
    await WorkspaceModel.updateOne(
      {
        _id: mongoose.Types.ObjectId(data.workspaceId),
      },
      {
        $pull: {
          "boards.$[board].lists.$[list].cards.$[card].attachments": {
            fileId: data.fileId,
          },
        },
      },
      {
        arrayFilters: [
          { "board._id": mongoose.Types.ObjectId(data.boardId) },
          { "list._id": mongoose.Types.ObjectId(data.listId) },
          { "card._id": mongoose.Types.ObjectId(data.cardId) },
        ],
        useFindAndModify: true,
        upsert: true,
      }
    );
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export const getArchivedCards = async (data: {
  workspaceId: string;
  boardId: string;
}) => {
  let docs;
  try {
    docs = await WorkspaceModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(data.workspaceId) } },
      { $unwind: "$boards" },
      { $match: { "boards._id": mongoose.Types.ObjectId(data.boardId) } },
      { $replaceRoot: { newRoot: "$boards" } },
      {
        $set: {
          lists: {
            $map: {
              input: {
                $filter: {
                  input: "$lists",
                  as: "list",
                  cond: { $ne: [{ $size: "$$list.cards" }, 0] },
                },
              },
              as: "nonEmptyList",
              in: {
                _id: "$$nonEmptyList._id",
                title: "$$nonEmptyList.title",
                cards: {
                  $filter: {
                    input: "$$nonEmptyList.cards",
                    as: "card",
                    cond: { $eq: ["$$card.archived", true] },
                  },
                },
              },
            },
          },
        },
      },
      {
        $set: {
          lists: {
            $filter: {
              input: "$lists",
              cond: { $ne: [{ $size: "$$this.cards" }, 0] },
            },
          },
        },
      },
      { $project: { lists: 1, _id: 0 } },
    ]);

    return docs;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};

export const archive = async (data: {
  workspaceId: string;
  boardId: string;
  listId: string;
  cardId: string;
}) => {
  try {
    await WorkspaceModel.updateOne(
      {
        _id: mongoose.Types.ObjectId(data.workspaceId),
      },
      {
        $set: {
          "boards.$[board].lists.$[list].cards.$[card].archived": true,
        },
      },
      {
        arrayFilters: [
          { "board._id": mongoose.Types.ObjectId(data.boardId) },
          { "list._id": mongoose.Types.ObjectId(data.listId) },
          { "card._id": mongoose.Types.ObjectId(data.cardId) },
        ],
        useFindAndModify: true,
        upsert: true,
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
  cardId: string;
}) => {
  try {
    await WorkspaceModel.updateOne(
      {
        _id: mongoose.Types.ObjectId(data.workspaceId),
      },
      {
        $set: {
          "boards.$[board].lists.$[list].cards.$[card].archived": false,
        },
      },
      {
        arrayFilters: [
          { "board._id": mongoose.Types.ObjectId(data.boardId) },
          { "list._id": mongoose.Types.ObjectId(data.listId) },
          { "card._id": mongoose.Types.ObjectId(data.cardId) },
        ],
        useFindAndModify: true,
        upsert: true,
      }
    );
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};
