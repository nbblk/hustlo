import express from "express";
import { body, param } from "express-validator";
import { checkAuthToken } from "../middlewares/authorize";
import {
  fetchLists,
  createList,
  archiveList,
  createCard,
} from "../controllers/board";

const boardRouter = express.Router();

boardRouter.get(
  "/:boardId",
  param("boardId").notEmpty(),
  checkAuthToken,
  fetchLists
);

boardRouter.post(
  "/new",
  checkAuthToken,
  body("workspaceId").notEmpty(),
  body("boardId").notEmpty(),
  createList
);

boardRouter.post(
  "/archive",
  checkAuthToken,
  body("workspaceId").notEmpty(),
  body("boardId").notEmpty(),
  body("listId").notEmpty(),
  archiveList
);

boardRouter.post(
  "/list/:listId",
  param("listId").notEmpty(),
  body("workspaceId").notEmpty(),
  body("boardId").notEmpty(),
  body("title").notEmpty(),
  checkAuthToken,
  createCard
);

export default boardRouter;
