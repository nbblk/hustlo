import express from "express";
import { body, param } from "express-validator";
import { checkAuthToken } from "../middlewares/authorize";
import { updateListTitle, restoreList } from "../controllers/list";

const listRouter = express.Router();

// listRouter.put(
//   "/:listId",
//   checkAuthToken,
//   param("listId").notEmpty(),
//   body("workspaceId").notEmpty(),
//   body("boardId").notEmpty(),
//   body("list").notEmpty(),
//   updateList
// );

listRouter.patch(
  "/restore",
  checkAuthToken,
  body("workspaceId").notEmpty(),
  body("boardId").notEmpty(),
  body("listId").notEmpty(),
  restoreList
);

listRouter.put(
  "/title",
  checkAuthToken,
  body("workspaceId").notEmpty(),
  body("boardId").notEmpty(),
  body("listId").notEmpty(),
  body("title").notEmpty(),
  updateListTitle
);

export default listRouter;
