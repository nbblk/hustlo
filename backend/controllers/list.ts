import express from "express";
import { validationResult } from "express-validator";
import { updateTitle, modifyList, restore } from "../services/list";

const updateList = async (req: express.Request, res: express.Response) => {
  let data = {
    listId: req.params.listId,
    workspaceId: req.body.workspaceId,
    boardId: req.body.boardId,
    list: req.body.list,
  };
  try {
    await modifyList(data);
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

const updateListTitle = async (req: express.Request, res: express.Response) => {
  let data = {
    workspaceId: req.body.workspaceId,
    boardId: req.body.boardId,
    listId: req.body.listId,
    title: req.body.title,
  };
  try {
    await updateTitle(data);
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

const restoreList = async (req: express.Request, res: express.Response) => {
  let data = {
    workspaceId: req.body.workspaceId,
    boardId: req.body.boardId,
    listId: req.body.listId,
  };
  try {
    await restore(data);
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

export { updateList, updateListTitle, restoreList };
