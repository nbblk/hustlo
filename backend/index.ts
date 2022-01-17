import express from "express";
import fs from "fs";
import http from "http";
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
import { env } from "process";

dotenv.config({ path: `./.env.${env.NODE_ENV}` });

const SCHEME = env.SERVER_SCHEME;
const HOSTNAME = env.SERVER_HOSTNAME;
const PORT = env.PORT;
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

if (env.NODE_ENV === "dev") {
  // to use https connection with self-signed tls cert
  https
    .createServer(
      {
        key: fs.readFileSync(env.CERT_KEY_PATH!),
        cert: fs.readFileSync(env.CERT_PATH!),
      },
      app
    )
    .listen(PORT, () => {
      console.log(`Server is running at ${SCHEME}://${HOSTNAME}:${PORT}`);
    });
} else if (env.NODE_ENV === "prod" || env.NODE_ENV === "production") {
  http.createServer(app).listen(PORT, () => {
    console.log(`Server is running at ${env.SERVER_ORIGIN}`);
  });
} else {
  console.error("NODE_ENV", env.NODE_ENV);
}
