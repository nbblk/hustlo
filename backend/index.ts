import express from "express";
import fs from "fs";
import https from "https";
import { connect } from "./database/database";
import cors from "cors";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth";
import workspaceRouter from "./routes/workspace";
import boardRouter from "./routes/board";
import listRouter from "./routes/list";
import cardRouter from "./routes/card";

dotenv.config({ path: "./.env" });

const SCHEME = process.env.SERVER_SCHEME;
const HOSTNAME = process.env.SERVER_HOSTNAME;
const PORT = process.env.SERVER_PORT;
const app = express();

connect();

app.use(cors({ origin: true, credentials: true })); //process.env.CLIENT_ORIGIN
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/workspace", workspaceRouter);
app.use("/board", boardRouter);
app.use("/list", listRouter);
app.use("/card", cardRouter);

https
  .createServer(
    {
      key: fs.readFileSync(`${process.env.CERT_KEY_PATH}`),
      cert: fs.readFileSync(`${process.env.CERT_PATH}`),
    },
    app
  )
  .listen(PORT, () => {
    console.log(
      `[server]: Server is running at ${SCHEME}://${HOSTNAME}:${PORT}`
    );
  });
