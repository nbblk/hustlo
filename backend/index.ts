import express from 'express';
import { connect } from "./database/database";
import authRouter from "./routes/auth";
import cors from "cors";
//import * as dotenv from 'dotenv';

const app = express();
const PORT = 8080;
const allowedOrigins = ['http://localhost:3000'];

//const result = dotenv.config({ path: './sendgrid.env'});

connect();

app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', authRouter);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
 // console.log(process.env.SENDGRID_API_KEY);
});
