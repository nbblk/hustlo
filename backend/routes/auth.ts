import express from "express";
import {
  signup,
  redirect,
  addPassword,
  basicLogin,
  OAuthLogin,
  sendRecoveryLink,
} from "../controllers/auth";
import { body } from "express-validator";
import { customPasswordValidator as pwdRegex } from "../validations/custom-validator";

const clientOrigin = process.env.CLIENT_ORIGIN;

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

authRouter.get(
  "/confirm-email",
  (req: express.Request, res: express.Response) => {
    let hash = req.query.h?.toString();
    if (!hash) {
      res.status(401).send("Invalid access");
    } else {
      redirect(req, res, {
        url: `${clientOrigin}/password-setup?h=${hash}`,
        type: "hash",
      });
    }
  }
);

authRouter.post("/confirm-email", body("email").isEmail(), signup);

authRouter.post(
  "/complete-signup",
  body("email").isEmail(),
  body("password").isLength({ min: 8, max: 20 }).custom(pwdRegex),
  addPassword
);

authRouter.post("/oauth", OAuthLogin);

authRouter.post("/recovery-email", body("email").isEmail(), sendRecoveryLink);

authRouter.get(
  "/reset-password",
  (req: express.Request, res: express.Response) => {
    let hash = req.query.h?.toString();
    if (!hash) {
      res.status(401).send("Invalid access");
    } else {
      redirect(req, res, {
        url: `${clientOrigin}/reset-password?h=${hash}`,
        type: "resetHash",
      });
    }
  }
);

export default authRouter;
