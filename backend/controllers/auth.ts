import express from "express";
import * as dotenv from "dotenv";
import {
  sendConfirmationEmail,
  verifyUser,
  addPassword as updatePassword,
  authenticate,
  authenticateUsingOAuth,
} from "../services/auth";
import { validationResult } from "express-validator";

dotenv.config({ path: "./.env" });

const clientOrigin = process.env.CLIENT_ORIGIN;

const signup = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  await sendConfirmationEmail(req.body.email)
    .then(() => {
      res.status(201).send("Created");
    })
    .catch((error) => {
      const errors = validationResult(req);
      let status, message;
      if (!errors.isEmpty()) {
        status = 400;
        message = errors.array();
      } else {
        status = 500;
        message = error.message;
      }
      res.status(status).send(error.message);
    });
};

const redirect = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const hash = req.query.h?.toString();
  if (!hash) {
    res.status(400).send("Invalid access");
  } else {
    await verifyUser(hash).catch((error) => {
      res.send(error).redirect(`${clientOrigin}/signup/error`);
    });
    res.redirect(`${clientOrigin}/password-setup?h=${hash}`);
  }
};

const addPassword = async (req: any, res: any, next: any) => {
  await updatePassword(req.body.email, req.body.password)
    .then(() => {
      res.status(200).send("Updated");
    })
    .catch((error) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).send({ errors: errors.array() });
      } else {
        res.status(500).send(error);
      }
    });
};

const basicLogin = async (req: any, res: any, next: any) => {
  await authenticate(req.body.email, req.body.password)
    .then((token) => {
      if (token) {
        res.setHeader("Set-Cookie", [
          `token=${token}`,
          "Max-Age=1800",
          "Secure",
          "HttpOnly",
        ]);
        res.sendStatus(200);
      } else {
        throw Error("Email or Password is incorrect. Try again.");
      }
    })
    .catch((error) => {
      const errors = validationResult(req);
      let status, message;
      if (!errors.isEmpty()) {
        status = 400;
        message = errors.array();
      } else {
        status = 401;
        message = error.message;
      }
      res.status(status).send(error.message);
    });
};

const OAuthLogin = async (req: any, res: any, next: any) => {
  await authenticateUsingOAuth({ ...req.body })
    .then((token) => {
      res.setHeader("Set-Cookie", [
        `token=${token}`,
        "Max-Age=1800",
        "Secure",
        "HttpOnly",
      ]);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(error);
      res.status(401).send(error);
    });
};

const logout = async (req: any, res: any, next: any) => {
  res.clearCookie("token");
  res.sendStatus(200);
};

export { signup, redirect, addPassword, basicLogin, OAuthLogin, logout };
