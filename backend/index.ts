import express from "express";
import { connect } from "./database/database";
import authRouter from "./routes/auth";
import cors from "cors";
<<<<<<< HEAD
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });
=======
>>>>>>> 1cebba18d6238dba53c02be1ed17b7574f99ef07

const app = express();
const PORT = 8080;
const allowedOrigins = ["http://localhost:3000"];

connect();

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", authRouter);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
