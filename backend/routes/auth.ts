import express from "express";
import {
  signup,
  redirect,
  addPassword,
  basicLogin,
  OAuthLogin,
} from "../controllers/auth";
import { body } from "express-validator";
import { customPasswordValidator as pwdRegex } from "../validations/custom-validator";

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.send("Hello world!");
});

authRouter.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 8, max: 20 }).custom(pwdRegex),
  basicLogin
);

authRouter.get("/confirm-email", redirect);

authRouter.post("/confirm-email", body("email").isEmail(), signup);

authRouter.post(
  "/complete-signup",
  body("email").isEmail(),
  body("password").isLength({ min: 8, max: 20 }).custom(pwdRegex),
  addPassword
);

authRouter.post("/oauth", OAuthLogin);

export default authRouter;
