import express from "express";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import {
  fetchCardInfo,
  updateDescription as modifyDescription,
  updateLabel as updateLabels,
  updateComment as upsertComment,
  uploadAttachment as uploadFile,
  deleteFile,
  getArchivedCards,
  archive,
  restore,
} from "../services/card";

const fetchCard = async (req: express.Request, res: express.Response) => {
  let data = {
    workspaceId: req.header("workspaceId"),
    boardId: req.header("boardId"),
    listId: req.header("listId"),
    cardId: req.params.cardId,
  };
  try {
    let card = await fetchCardInfo(data);
    res.send(card).status(200);
  } catch (error: any) {
    console.error(error);
    const errors = validationResult(req);
    let status, message;
    if (!errors.isEmpty()) {
      status = 400;
      message = errors.array();
    } else {
      status = 500;
      message = error.message;
    }
    res.status(status).send(message);
  }
};

const updateDescription = async (
  req: express.Request,
  res: express.Response
) => {
  let data = {
    workspaceId: req.body.workspaceId,
    boardId: req.body.boardId,
    listId: req.body.listId,
    cardId: req.body.cardId,
    description: req.body.description,
  };
  try {
    await modifyDescription(data);
    res.sendStatus(201);
  } catch (error: any) {
    console.error(error);
    const errors = validationResult(req);
    let status, message;
    if (!errors.isEmpty()) {
      status = 400;
      message = errors.array();
    } else {
      status = 500;
      message = error.message;
    }
    res.status(status).send(message);
  }
};

const updateLabel = async (req: express.Request, res: express.Response) => {
  let data = {
    workspaceId: req.body.workspaceId,
    boardId: req.body.boardId,
    listId: req.body.listId,
    cardId: req.body.cardId,
    labels: req.body.labels,
  };
  try {
    await updateLabels(data);
    res.sendStatus(201);
  } catch (error: any) {
    console.error(error);
    const errors = validationResult(req);
    let status, message;
    if (!errors.isEmpty()) {
      status = 400;
      message = errors.array();
    } else {
      status = 500;
      message = error.message;
    }
    res.status(status).send(message);
  }
};

const updateComment = async (req: express.Request, res: express.Response) => {
  let data = {
    workspaceId: req.body.workspaceId,
    boardId: req.body.boardId,
    listId: req.body.listId,
    cardId: req.body.cardId,
    comment: req.body.comment,
  };
  try {
    await upsertComment(data);
    res.sendStatus(201);
  } catch (error: any) {
    console.error(error);
    const errors = validationResult(req);
    let status, message;
    if (!errors.isEmpty()) {
      status = 400;
      message = errors.array();
    } else {
      status = 500;
      message = error.message;
    }
    res.status(status).send(message);
  }
};

const uploadAttachment = async (
  req: express.Request,
  res: express.Response
) => {
  const data = {
    workspaceId: req.header("workspaceId")!,
    boardId: req.header("boardId")!,
    listId: req.header("listId")!,
    cardId: req.header("cardId")!,
    file: {
      fileId: req.file!.id,
      filename: req.file!.originalname,
      mimetype: req.file!.mimetype,
      size: req.file!.size,
    },
  };
  try {
    await uploadFile(data);
    res.sendStatus(201);
  } catch (error: any) {
    console.error(error);
    const errors = validationResult(req);
    let status, message;
    if (!errors.isEmpty()) {
      status = 400;
      message = errors.array();
    } else {
      status = 500;
      message = error.message;
    }
    res.status(status).send(message);
  }
};

const downloadAttachment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const gridFsBucket = new mongoose.mongo.GridFSBucket(
      mongoose.connection.db
    );
    await gridFsBucket
      .openDownloadStream(new mongoose.Types.ObjectId(req.params.fileId))
      .pipe(res);
  } catch (error: any) {
    console.error(error);
    const errors = validationResult(req);
    let status, message;
    if (!errors.isEmpty()) {
      status = 400;
      message = errors.array();
    } else {
      status = 500;
      message = error.message;
    }
    res.status(status).send(message);
  }
};

const deleteAttachment = async (
  req: express.Request,
  res: express.Response
) => {
  const data = {
    workspaceId: req.header("workspaceId")!,
    boardId: req.header("boardId")!,
    listId: req.header("listId")!,
    cardId: req.header("cardId")!,
    fileId: req.params.fileId!,
  };

  let fileId = new mongoose.Types.ObjectId(data.fileId);

  try {
    const gridFsBucket = new mongoose.mongo.GridFSBucket(
      mongoose.connection.db
    );
    await gridFsBucket.delete(fileId);
    await deleteFile({ ...data, fileId: fileId });
    res.sendStatus(200);
  } catch (error: any) {
    console.error(error);
    const errors = validationResult(req);
    let status, message;
    if (!errors.isEmpty()) {
      status = 400;
      message = errors.array();
    } else {
      status = 500;
      message = error.message;
    }
    res.status(status).send(message);
  }
};

const fetchArchivedCards = async (
  req: express.Request,
  res: express.Response
) => {
  const data = {
    workspaceId: req.header("workspaceId")!,
    boardId: req.header("boardId")!,
  };
  try {
    let cards = await getArchivedCards(data);
    res.send(cards).status(200);
  } catch (error: any) {
    console.error(error);
    const errors = validationResult(req);
    let status, message;
    if (!errors.isEmpty()) {
      status = 400;
      message = errors.array();
    } else {
      status = 500;
      message = error.message;
    }
    res.status(status).send(message);
  }
};

const archiveCard = async (req: express.Request, res: express.Response) => {
  const data = {
    workspaceId: req.body.workspaceId,
    boardId: req.body.boardId,
    listId: req.body.listId,
    cardId: req.body.cardId,
  };
  try {
    await archive(data);
    res.sendStatus(200);
  } catch (error: any) {
    console.error(error);
    const errors = validationResult(req);
    let status, message;
    if (!errors.isEmpty()) {
      status = 400;
      message = errors.array();
    } else {
      status = 500;
      message = error.message;
    }
    res.status(status).send(message);
  }
};

const restoreCard = async (req: express.Request, res: express.Response) => {
  const data = {
    workspaceId: req.body.workspaceId,
    boardId: req.body.boardId,
    listId: req.body.listId,
    cardId: req.body.cardId,
  };
  try {
    await restore(data);
    res.sendStatus(200);
  } catch (error: any) {
    console.error(error);
    const errors = validationResult(req);
    let status, message;
    if (!errors.isEmpty()) {
      status = 400;
      message = errors.array();
    } else {
      status = 500;
      message = error.message;
    }
    res.status(status).send(message);
  }
};

export {
  fetchCard,
  updateDescription,
  updateLabel,
  updateComment,
  uploadAttachment,
  downloadAttachment,
  deleteAttachment,
  fetchArchivedCards,
  archiveCard,
  restoreCard,
};
