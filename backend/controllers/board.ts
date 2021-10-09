import express from "express";
import * as dotenv from "dotenv";
import { validationResult } from "express-validator";
import { create, fetchByKeyword } from "../services/board";
import { create as addList, archive, fetch } from "../services/list";
import { create as addCard } from "../services/card";

dotenv.config({ path: "./.env" });

const clientOrigin = process.env.CLIENT_ORIGIN;

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

const fetchLists = async (req: express.Request, res: express.Response) => {
  try {
    let lists = await fetch(req.params.boardId);
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
    await addCard({ workspaceId: req.body.workspaceId, boardId: req.body.boardId, listId: req.params.listId, title: req.body.title });
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
  createBoard,
  fetchBoard,
  createList,
  fetchLists,
  archiveList,
  createCard,
};
