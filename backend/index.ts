import express from 'express';
import { connect } from "./database/database";

const app = express();
const PORT = 8000;

connect();

app.get("/", (req, res) => res.send("Express + Typescript server"));

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
