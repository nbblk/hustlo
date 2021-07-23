import express from "express";
import { signup, redirect, addPassword } from "../controllers/auth";

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.send("Hello world!");
});

authRouter.post("/login", (req, res) => {
  res.send("/login POST");
});

authRouter.post("/confirm-email", signup);

authRouter.get("/confirm-email/:h", redirect);

authRouter.post("/complete-signup", addPassword);

export default authRouter;
