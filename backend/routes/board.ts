import express from "express";
import { body, param, header } from "express-validator";
import { checkAuthToken } from "../middlewares/authorize";
import {
  fetchLists,
  createList,
  fetchArchivedList,
  archiveList,
  createCard,
  updateTitle,
  changeWorkspace,
  fetchWorkspaceList,
  fetchBoardTitles,
} from "../controllers/board";

const boardRouter = express.Router();

boardRouter.get(
  "/:boardId",
  param("boardId").notEmpty(),
  header("workspaceId").notEmpty(),
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

boardRouter.put(
  "/title",
  checkAuthToken,
  body("workspaceId").notEmpty(),
  body("boardId").notEmpty(),
  body("title").notEmpty(),
  updateTitle
);

boardRouter.get(
  "/:boardId/archived",
  checkAuthToken,
  param("boardId").notEmpty(),
  header("workspaceId").notEmpty(),
  fetchArchivedList
);

boardRouter.put(
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

boardRouter.patch(
  "/workspace/change",
  checkAuthToken,
  body("workspaceId").notEmpty(),
  body("boardId").notEmpty(),
  body("newWorkspaceId").notEmpty(),
  changeWorkspace
);

boardRouter.get(
  "/workspace/list",
  checkAuthToken,
  header("_id").notEmpty(),
  fetchWorkspaceList
);

boardRouter.get(
  "/list/titles",
  checkAuthToken,
  header("workspaceId").notEmpty(),
  fetchBoardTitles
)
export default boardRouter;
