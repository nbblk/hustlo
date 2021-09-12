import express from "express";
import * as dotenv from "dotenv";
import { validationResult } from "express-validator";
import { create, fetch } from "../services/board";

dotenv.config({ path: "./.env" });

const fetchWorkspace = async (req: express.Request, res: express.Response) => {
  let list;
  try {
    list = await fetch(req.body._id);
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
      name: req.body.name.value,
      description: req.body.description.value,
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

export { fetchWorkspace, createWorkspace };
