import express from 'express';
import { connect } from "./database/database";
import authRouter from "./routes/auth";

const app = express();
const PORT = 8000;

connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', authRouter);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
