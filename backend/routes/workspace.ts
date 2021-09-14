import express from "express";
import { body } from "express-validator";
import {
  createWorkspace,
  fetchWorkspace,
  updateWorkspace,
  deleteWorkspace,
} from "../controllers/workspace";
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
export default workspaceRouter;
