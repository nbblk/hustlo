import express from "express";
import { body, param } from "express-validator";
import {
  createWorkspace,
  fetchWorkspace,
  updateWorkspace,
  deleteWorkspace,
} from "../controllers/workspace";
import { createBoard, fetchBoard } from "../controllers/board";
import { checkAuthToken } from "../middlewares/authorize";

const workspaceRouter = express.Router();

workspaceRouter.get("/", checkAuthToken, fetchWorkspace);
workspaceRouter.post(
  "/",
  checkAuthToken,
  body("name").notEmpty(),
  body("description").notEmpty(),
  createWorkspace
);
workspaceRouter.patch(
  "/",
  checkAuthToken,
  body("name").notEmpty(),
  body("description").notEmpty(),
  updateWorkspace
);
workspaceRouter.delete("/", checkAuthToken, deleteWorkspace);

workspaceRouter.post(
  "/board",
  checkAuthToken,
  body("name").notEmpty(),
  body("color").notEmpty(),
  body("workspaceId").notEmpty(),
  createBoard
);

workspaceRouter.get(
  "/board",
  param("q").notEmpty().isString(),
  checkAuthToken,
  fetchBoard
);

export default workspaceRouter;
