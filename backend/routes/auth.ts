import express from "express";
import { signup, redirect, addPassword, login } from "../controllers/auth";

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.send("Hello world!");
});

authRouter.post("/login", login);

authRouter.get("/confirm-email", redirect);

authRouter.post("/confirm-email", signup);

authRouter.post("/complete-signup", addPassword);

export default authRouter;
