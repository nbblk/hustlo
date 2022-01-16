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

app.use("/api/", authRouter);
app.use("/api/workspace", workspaceRouter);
app.use("/api/board", boardRouter);
app.use("/api/list", listRouter);
app.use("/api/card", cardRouter);

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
      console.log(
        `[server]: Server is running at ${SCHEME}://${HOSTNAME}:${PORT}`
      );
    });
} else if (env.NODE_ENV === "prod" || env.NODE_ENV === "production") {
  http.createServer(app);
} else {
  console.error("NODE_ENV", env.NODE_ENV);
}
