import express from "express";
import { body, header, param } from "express-validator";
import multer from "multer";
import * as dotenv from "dotenv";
import { checkAuthToken } from "../middlewares/authorize";
import {
  fetchCard,
  updateDescription,
  updateLabel,
  updateComment,
  uploadAttachment,
  downloadAttachment,
  deleteAttachment,
  fetchArchivedCards,
  archiveCard,
  restoreCard
} from "../controllers/card";
import { GridFsStorage } from "multer-gridfs-storage";


dotenv.config({ path: "./.env" });

const cardRouter = express.Router();
const url = process.env.MONGO_URI!;
const storage = new GridFsStorage({ url });
const upload = multer({ storage });

cardRouter.get(
  "/:cardId",
  checkAuthToken,
  param("cardId").notEmpty(),
  header("workspaceId").notEmpty(),
  header("boardId").notEmpty(),
  header("listId").notEmpty(),
  fetchCard
);
cardRouter.post(
  "/description",
  checkAuthToken,
  body("workspaceId").notEmpty(),
  body("boardId").notEmpty(),
  body("listId").notEmpty(),
  body("cardId").notEmpty(),
  body("description").notEmpty(),
  updateDescription
);

cardRouter.post(
  "/labels",
  checkAuthToken,
  body("workspaceId").notEmpty(),
  body("boardId").notEmpty(),
  body("listId").notEmpty(),
  body("cardId").notEmpty(),
  body("labels").notEmpty(),
  updateLabel
);

cardRouter.post(
  "/comment",
  checkAuthToken,
  body("workspaceId").notEmpty(),
  body("boardId").notEmpty(),
  body("listId").notEmpty(),
  body("cardId").notEmpty(),
  body("comment").notEmpty(),
  updateComment
);

cardRouter.post(
  "/attachment",
  checkAuthToken,
  header("cardId").notEmpty(),
  header("workspaceId").notEmpty(),
  header("boardId").notEmpty(),
  header("listId").notEmpty(),
  header("filename").notEmpty(),
  upload.single("File"),
  uploadAttachment
);

cardRouter.get(
  "/attachment/:fileId",
  checkAuthToken,
  param("fileId").notEmpty(),
  body("filename").notEmpty(),
  downloadAttachment
);

cardRouter.delete(
  "/attachment/:fileId",
  checkAuthToken,
  param("fileId").notEmpty(),
  header("workspaceId").notEmpty(),
  header("boardId").notEmpty(),
  header("listId").notEmpty(),
  header("cardId").notEmpty(),
  deleteAttachment
);

cardRouter.get(
  "/archived/items",
  checkAuthToken,
  header("workspaceId").notEmpty(),
  header("boardId").notEmpty(),
  fetchArchivedCards
)

cardRouter.patch(
  "/archive",
  checkAuthToken,
  body("workspaceId").notEmpty(),
  body("boardId").notEmpty(),
  body("listId").notEmpty(),
  body("cardId").notEmpty(),
  archiveCard
);

cardRouter.patch(
  "/restore",
  checkAuthToken,
  body("workspaceId").notEmpty(),
  body("boardId").notEmpty(),
  body("listId").notEmpty(),
  body("cardId").notEmpty(),
  restoreCard
);

export default cardRouter;
