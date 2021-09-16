import express from "express";
import * as dotenv from "dotenv";
import { validationResult } from "express-validator";
import { create, fetchByKeyword } from "../services/board";

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

export { createBoard, fetchBoard };
