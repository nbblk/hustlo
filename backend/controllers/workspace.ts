import express from "express";
import * as dotenv from "dotenv";
import { validationResult } from "express-validator";
import {
  create,
  fetch,
  deleteWorkspace as remove,
  update,
} from "../services/workspace";

dotenv.config({ path: "./.env" });

const fetchWorkspace = async (req: express.Request, res: express.Response) => {
  let list;
  let _id = req.headers["_id"]!.toString();
  try {
    list = await fetch(_id);
    res.send(list).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const createWorkspace = async (req: express.Request, res: express.Response) => {
  let created;
  try {
    created = await create({
      userId: req.headers["_id"]!.toString(),
      name: req.body.name.value,
      description: req.body.description.value,
      boards: [],
    });
    res.send(created).status(201);
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

const updateWorkspace = async (req: express.Request, res: express.Response) => {
  let workspaceId = req.query.mod?.toString();
  if (!workspaceId) {
    throw new Error("Invalid request");
  }
  try {
    await update(workspaceId, req.body.name.value, req.body.description.value);
    res.sendStatus(204);
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

const deleteWorkspace = async (req: express.Request, res: express.Response) => {
  let workspaceId = req.query.del?.toString();
  if (!workspaceId) {
    throw new Error("Invalid request");
  }
  try {
    await remove(workspaceId);
    res.sendStatus(204);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

export { fetchWorkspace, createWorkspace, updateWorkspace, deleteWorkspace };
