import express from "express";
import { create, fetchByKeyword, modifyTitle, updateWorkspace, getWorkspaceList, getBoardTitles } from "../services/board";
import * as dotenv from "dotenv";
import { validationResult } from "express-validator";
import { create as addList, archive, fetch, fetchArchived } from "../services/list";
import {
  create as addCard,
  fetchCardInfo,
  updateDescription,
} from "../services/card";

dotenv.config({ path: "./.env" });

const createBoard = async (req: express.Request, res: express.Response) => {
  let data = {
    workspaceId: req.body.workspaceId,
    name: req.body.name,
    color: req.body.color,
  };
  try {
    await create(data);
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

const fetchBoard = async (req: express.Request, res: express.Response) => {
  let keyword = req.params.q;
  try {
    let found = await fetchByKeyword(keyword);
    res.send(found).status(200);
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

const updateTitle = async (req: express.Request, res: express.Response) => {
  let data = {
    workspaceId: req.body.workspaceId,
    boardId: req.body.boardId,
    title: req.body.title,
  };

  try {
    await modifyTitle(data);
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

const fetchLists = async (req: express.Request, res: express.Response) => {
  try {
    let lists = await fetch(req.params.boardId, req.header('workspaceId')!);
    res.send(lists).status(200);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error);
  }
};

const createList = async (req: express.Request, res: express.Response) => {
  try {
    let updated = await addList(req.body.workspaceId, req.body.boardId);
    res.send(updated).status(201);
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

const fetchArchivedList = async (req: express.Request, res: express.Response) => {
  try {
    let result = await fetchArchived(req.params.boardId!, req.header('workspaceId')!);
    res.send(result).status(200);
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

const archiveList = async (req: express.Request, res: express.Response) => {
  try {
    await archive({
      workspaceId: req.body.workspaceId,
      boardId: req.body.boardId,
      listId: req.body.listId,
    });
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

const createCard = async (req: express.Request, res: express.Response) => {
  try {
    await addCard({
      workspaceId: req.body.workspaceId,
      boardId: req.body.boardId,
      listId: req.params.listId,
      title: req.body.title,
    });
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

const fetchCard = async (req: express.Request, res: express.Response) => {
  try {
    let card = await fetchCardInfo({
      cardId: req.params.cardId,
      workspaceId: req.body.workspaceId,
      boardId: req.body.boardId,
      listId: req.params.listId,
    }); 
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

const updateCardDescription = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    await updateDescription({
      cardId: req.params.cardId,
      workspaceId: req.body.workspaceId,
      boardId: req.body.boardId,
      listId: req.body.listId,
      description: req.body.description,
    });
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

const changeWorkspace = async (req: express.Request, res: express.Response) => {
  try {
    await updateWorkspace({
      workspaceId: req.body.workspaceId,
      boardId: req.body.boardId,
      newWorkspaceId: req.body.newWorkspaceId
    });
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

const fetchWorkspaceList = async (req: express.Request, res: express.Response) => {
  try {
    let list = await getWorkspaceList(req.header("_id")!);
    res.send(list).status(200);
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

const fetchBoardTitles = async (req: express.Request, res: express.Response) => {
  try {
    let list = await getBoardTitles(req.header("workspaceId")!);
    res.send(list).status(200);
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
  createBoard,
  fetchBoard,
  updateTitle,
  createList,
  fetchLists,
  fetchArchivedList,
  archiveList,
  createCard,
  fetchCard,
  updateCardDescription,
  changeWorkspace,
  fetchWorkspaceList,
  fetchBoardTitles
};
