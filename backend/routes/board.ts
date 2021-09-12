import express from "express";
import { body } from "express-validator";
import { createWorkspace, fetchWorkspace } from "../controllers/board";
import { checkAuthToken } from "../middlewares/authorize";

const boardRouter = express.Router();

boardRouter.get("/workspace", checkAuthToken, fetchWorkspace)
boardRouter.post(
  "/workspace",
  checkAuthToken,
  body("name").notEmpty(),
  body("description").notEmpty(),
  createWorkspace
);

export default boardRouter;
